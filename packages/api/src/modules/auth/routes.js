import fastifyPassport from '@fastify/passport';
import { generateAccessToken, generateRefreshToken } from './service.js';

const REFRESH_TOKEN_KEY = 'r-token';

async function authRoutes(app) {
    app.post(
        '/login',
        {
            schema: {
                body: {
                    type: 'object',
                    properties: {
                        email: { type: 'string' },
                        password: { type: 'string' }
                    },
                    required: ['email', 'password']
                }
            },
            preValidation: fastifyPassport.authenticate(
                'local',
                {
                    session: false
                },
                // Note from the docs:
                // If a callback is supplied, it becomes the application's responsibility
                // to log-in the user, establish a session, and otherwise perform the desired operations.
                //
                // This is added to have more control over the type and shape of the payload returned
                // when the user is unauthorized, basically sonething other than 401 UNAUTHORIZED.
                async (req, reply, err, user, _info, _status) => {
                    if (err !== null) {
                        console.warn(err);
                    } else if (user) {
                        req.user = user;
                    }
                }
            )
        },
        async function handler(req, reply) {
            const user = req.user;
            if (user) {
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);

                reply.setCookie(REFRESH_TOKEN_KEY, refreshToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });

                return {
                    accessToken,
                    user
                };
            }
            reply.statusCode = 401;
            return reply.send({
                accessToken: null,
                user: null
            });
        }
    );
}

export default authRoutes;
