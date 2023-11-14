import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { getUserByEmail } from '../../user/service.js';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
};

async function verifyFn(payload, done) {
    const user = await getUserByEmail(payload.email);

    if (!user) {
        return done(null, false, { message: 'Unable to find user' });
    }

    done(null, user);
}

export default new JwtStrategy(options, verifyFn);
