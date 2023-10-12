import bcrypt from 'bcryptjs';

export function verifyPassword(user, password) {
    if (user.password) {
        return bcrypt.compareSync(password, user.password.hash);
    }
    return false;
}
