import fastifyPassport from '@fastify/passport';
import { verifyRefreshToken } from './service.js';
import { getUserByEmail } from '../user/service.js';
import { authUserTokens } from './controller.js';
import { REFRESH_TOKEN_KEY } from './constants.js';

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
        authUserTokens
    );

    app.get(
        '/me',
        {
            preHandler: async function (req) {
                const refreshToken = req.cookies[REFRESH_TOKEN_KEY];
                if (refreshToken) {
                    try {
                        const payload = verifyRefreshToken(refreshToken);

                        if (payload.email) {
                            const user = await getUserByEmail(payload.email);
                            if (user) req.user = user;
                        }
                    } catch (err) {
                        console.log(err.message);
                    }
                }
            }
        },
        authUserTokens
    );
}

export default authRoutes;
