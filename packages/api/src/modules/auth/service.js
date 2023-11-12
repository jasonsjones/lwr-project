import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export function verifyPassword(user, password) {
    if (!user?.authData) {
        return false;
    }
    return bcrypt.compareSync(password, user.authData.passwordHash);
}

export function generateRefreshToken(user) {
    // TODO: add refresh token version number to verify on new request
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export function generateAccessToken(user) {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
}
