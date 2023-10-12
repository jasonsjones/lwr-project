import passport from 'passport';

export async function authenticateLocal(req, res, next) {
    return passport.authenticate('local', { session: false }, (error, user) => {
        if (error) {
            return next(error);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                accessToken: null,
                user: null
            });
        }

        req.user = user;
        next();
    })(req, res, next);
}
