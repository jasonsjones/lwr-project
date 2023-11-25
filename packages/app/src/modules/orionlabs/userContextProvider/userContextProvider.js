import AuthContextProvider from 'orion/authContextProvider';
import eventEmitter from 'orion/eventEmitter';
import { EVENTS } from 'orionlabs/common';
import { setTokenInfo, fetchContextUser } from '@lwr-project/data-service';

export default class UserContextProvider extends AuthContextProvider {
    timeOfToken;
    refreshIntervalId;

    dispatchAuthUpdate(accessToken) {
        this.dispatchEvent(new CustomEvent(EVENTS.AUTH_UPDATE, { detail: { accessToken } }));
    }

    setupEvents() {
        eventEmitter.subscribe(EVENTS.USER_LOGIN, (data) => {
            const { accessToken, user } = data;
            this.timeOfToken = Date.now();
            setTokenInfo({ accessToken, timeOfToken: this.timeOfToken });
            this.updateContext({
                value: {
                    accessToken,
                    user
                }
            });
            this.dispatchAuthUpdate(accessToken);
        });

        eventEmitter.subscribe(EVENTS.USER_LOGOUT, () => {
            this.timeOfToken = null;
            setTokenInfo({ accessToken: null, timeOfToken: this.timeOfToken });
            this.updateContext({
                value: {
                    accessToken: null,
                    user: null
                }
            });
            this.dispatchAuthUpdate(null);
        });
    }

    refreshContextUser() {
        const host = window?.location?.host;
        // one-time fetch of the context user, returns user if
        // refresh token in cookie is valid
        fetchContextUser(host).then((data) => {
            const { accessToken, user } = data;
            this.timeOfToken = accessToken ? Date.now() : null;
            setTokenInfo({ accessToken, timeOfToken: this.timeOfToken });
            this.updateContext({
                value: {
                    accessToken,
                    user
                }
            });
            this.dispatchAuthUpdate(accessToken);

            // if auth'd and loading /login, redirect to home page
            const url = new URL(location.href);
            if (accessToken && url.pathname === '/login') {
                location.href = '/';
            }
        });
    }

    connectedCallback() {
        this.setupEvents();
        this.refreshContextUser();

        // refresh every 2 minutes
        this.refreshIntervalId = setInterval(
            () => {
                if (this.timeOfToken) {
                    const timeElapsedInSec = (Date.now() - this.timeOfToken) / 1000;
                    // when over 8 minutes, make a call to refresh the ctx user
                    if (timeElapsedInSec > 60 * 8) {
                        this.refreshContextUser();
                    }
                }
            },
            1000 * 60 * 2
        );
    }

    disconnectedCallback() {
        clearInterval(this.refreshIntervalId);
    }
}
