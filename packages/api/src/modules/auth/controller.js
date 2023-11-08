import { generateAccessToken, generateRefreshToken } from './service.js';
import { REFRESH_TOKEN_KEY } from './constants.js';

export async function authUserTokens(req, reply) {
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

export function authUserLogout(_req, reply) {
    reply.clearCookie(REFRESH_TOKEN_KEY, {
        path: '/api/v1/auth'
    });

    return reply.send({
        accessToken: null,
        user: null
    });
}
