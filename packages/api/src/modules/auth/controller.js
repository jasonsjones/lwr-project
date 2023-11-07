import { generateAccessToken, generateRefreshToken } from './service.js';
import { REFRESH_TOKEN_KEY } from './constants.js';

export async function authUserTokens(req, reply) {
    const user = req.user;

    if (user) {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        reply.setCookie(REFRESH_TOKEN_KEY, refreshToken, {
            httpOnly: true,
            sameSite: 'none'
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
