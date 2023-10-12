import localStategy from '../auth/strategies/local.mjs';

export function configurePassport(passport) {
    passport.serializeUser((user, done) => {
        console.log(`[API] Serializing user: ${JSON.stringify(user)}`);
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        console.log(`[API] Deserializing user: ${JSON.stringify(user)}`);
        done(null, user);
    });

    passport.use(localStategy);
}
