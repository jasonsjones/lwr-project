import LocalStrategy from 'passport-local';
import { getUserByEmailIncludePassword } from '../../user/user-service.mjs';
import { verifyPassword } from '../auth-service.mjs';

const options = {
    usernameField: 'email'
};

async function verifyFn(email, password, done) {
    const user = await getUserByEmailIncludePassword(email);

    if (!user) {
        return done(null, false, { message: 'Unable to find user' });
    }

    if (user.password && verifyPassword(user, password)) {
        // eslint-disable-next-line no-unused-vars
        const { password, ...sanitizedUserInfo } = user;
        return done(null, sanitizedUserInfo);
    }
    return done(null, false, { message: 'Invalid email or password' });
}

export default new LocalStrategy(options, verifyFn);
