import { getAppInstance } from '../../../server';
import passportForceDotCom from 'passport-forcedotcom';

const ForceDotComStrategy = passportForceDotCom.Strategy;

const strategyOptions = {
    clientID: process.env.SFDC_CLIENT_ID,
    clientSecret: process.env.SFDC_CLIENT_SECRET,
    scope: ['id', 'api'],
    callbackURL: `/api/v1/auth/sfdc/callback`
};

async function verifyCallback(token, _refreshToken, profile, done) {
    const app = await getAppInstance();

    app.log.info(`[Server] Token params:`);
    app.log.info(JSON.stringify(token.params, null, 4));

    // eslint-disable-next-line no-unused-vars
    const { _raw, ...profileInfo } = profile;
    app.log.info(`[Server] SFDC profile info:`);
    app.log.info(JSON.stringify(profileInfo, null, 4));

    const { id } = profileInfo;

    // TODO: find user or create new user based on provider and id
    // return hard-coded user in the meantime
    return done(null, { id, firstName: 'Ed', lastName: 'Baldwin', email: 'ed@nasa.gov' });
}

const forcedotcomStrategy = new ForceDotComStrategy(strategyOptions, verifyCallback);

export default forcedotcomStrategy;
