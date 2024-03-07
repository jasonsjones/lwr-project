import passportForceDotCom from 'passport-forcedotcom';

const ForceDotComStrategy = passportForceDotCom.Strategy;

const strategyOptions = {
    clientID: process.env.SFDC_CLIENT_ID,
    clientSecret: process.env.SFDC_CLIENT_SECRET,
    scope: ['id', 'api'],
    callbackURL: `/api/v1/auth/sfdc/callback`
};

async function verifyCallback(token, _refreshToken, profile, done) {
    console.log(`[Server] Token params:`);
    console.log(token.params);

    // eslint-disable-next-line no-unused-vars
    const { _raw, ...profileInfo } = profile;
    console.log(`[Server] SFDC profile info:`);
    console.log(profileInfo);

    const { id } = profile;

    // TODO: find user or create new user based on provider and id
    // return hard-coded user in the meantime
    return done(null, { id, firstName: 'Ed', lastName: 'Baldwin', email: 'ed@nasa.gov' });
}

const forcedotcomStrategy = new ForceDotComStrategy(strategyOptions, verifyCallback);

export default forcedotcomStrategy;
