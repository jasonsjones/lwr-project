import fastifyPassport from '@fastify/passport';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from './service.js';
import { getUserByEmail } from '../user/service.js';
import { REFRESH_TOKEN_KEY } from './constants.js';

export function authenticateLocal() {
    return fastifyPassport.authenticate(
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
    );
}

export async function getMePreHandler(req) {
    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];
    if (refreshToken) {
        try {
            const payload = verifyRefreshToken(refreshToken);

            if (payload.email) {
                const user = await getUserByEmail(payload.email);
                if (user) {
                    // TODO: verify user refresh token version
                    // with payload version
                    req.user = user;
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    }
}

export async function authUserTokensHandler(req, reply) {
    const [route, ..._rest] = req.url.split('/').reverse();

    const successMessage =
        route === 'login' ? 'user login successful' : 'context user tokens updated';
    const failureMessage =
        route === 'login' ? 'invalid users credentials' : 'invalid refresh token provided';

    const user = req.user;
    const isFromPostman = req.headers['user-agent'].includes('Postman');

    if (user) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        reply.setCookie(REFRESH_TOKEN_KEY, refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: !isFromPostman
        });

        return {
            success: true,
            message: successMessage,
            results: {
                accessToken,
                user
            }
        };
    }

    // only send a 401 on failed logins
    if (req.url.split('/').includes('login')) {
        reply.statusCode = 401;
    }

    return reply.send({
        success: false,
        message: failureMessage,
        results: {
            accessToken: null,
            user: null
        }
    });
}

export function authUserLogoutHandler(_req, reply) {
    reply.clearCookie(REFRESH_TOKEN_KEY, {
        path: '/api/v1/auth'
    });

    return reply.send({
        success: true,
        message: 'user logout successful',
        results: {
            accessToken: null,
            user: null
        }
    });
}
