import { generateAccessToken } from './auth-service.mjs';

export async function loginLocal(req, res) {
    const user = req.user;
    if (user) {
        const accessToken = generateAccessToken(user);

        return res.json({
            success: true,
            accessToken,
            user
        });
    }

    return res.json({
        success: false,
        accessToken: null,
        user: null
    });
}
