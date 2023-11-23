/* eslint-disable @typescript-eslint/no-unused-vars */

import LocalStrategy from 'passport-local';
import { getUserByEmailIncludeAuthData } from '../../user/service.js';
import { verifyPassword } from '../service.js';

const options = {
    usernameField: 'email'
};

async function verifyFn(email, password, done) {
    const user = await getUserByEmailIncludeAuthData(email);

    if (!user) {
        return done(null, false, { message: 'Unable to find user' });
    }

    if (user.authData && verifyPassword(user, password)) {
        // eslint-disable-next-line no-unused-vars
        const { authData, ...sanitizedUserInfo } = user;
        return done(null, sanitizedUserInfo);
    }
    return done(null, false, { message: 'Invalid email or password' });
}

export default new LocalStrategy(options, verifyFn);
