import { getAppInstance } from '../../../server';
import passportForceDotCom from 'passport-forcedotcom';
import { getUserById, getUserByProviderId } from '../../user/service';

const ForceDotComStrategy = passportForceDotCom.Strategy;

const strategyOptions = {
    clientID: process.env.SFDC_CLIENT_ID,
    clientSecret: process.env.SFDC_CLIENT_SECRET,
    scope: ['id', 'api'],
    callbackURL: `/api/v1/auth/sfdc/callback`
};

async function verifyCallback(token, _refreshToken, profile, done) {
    const app = await getAppInstance();

    // eslint-disable-next-line no-unused-vars
    const { _raw, ...profileInfo } = profile;

    const {
        id,
        provider,
        name: { givenName: firstName, familyName: lastName },
        emails
    } = profileInfo;
    const { value: email } = emails[0];

    const user = await getUserByProviderId(id, provider);
    if (user) {
        return done(null, user);
    }

    app.log.info('Salesforce user does not exist; creating now...');
    // TODO: create user from sfdc profile data, but just return in the meantime
    return done(null, { id, firstName, lastName, email });
}

const forcedotcomStrategy = new ForceDotComStrategy(strategyOptions, verifyCallback);

export default forcedotcomStrategy;
