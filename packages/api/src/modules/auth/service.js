import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export function verifyPassword(user, password) {
    if (!user?.password) {
        return false;
    }
    return bcrypt.compareSync(password, user.password.hash);
}

export function generateAccessToken(user) {
    const payload = { sub: user.id, email: user.email };
    return jwt.sign(payload, 'secret', { expiresIn: '10m' });
}
