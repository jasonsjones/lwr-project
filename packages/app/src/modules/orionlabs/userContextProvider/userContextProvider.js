import AuthContextProvider from 'orion/authContextProvider';
import eventEmitter from 'orion/eventEmitter';
import { EVENTS } from 'orionlabs/common';
import { setAccessToken } from '@lwr-project/data-service';

function fetchContextUser(clientHost) {
    let apiBaseUrl;
    // update api base url based on client host
    // TODO: refactor out at a later time ;-)
    switch (clientHost) {
        case 'localhost:4200':
            apiBaseUrl = 'http://localhost:3000';
            break;
        default:
            break;
    }

    return fetch(`${apiBaseUrl}/api/v1/auth/me`, { credentials: 'include' }).then((res) =>
        res.json()
    );
}

export default class UserContextProvider extends AuthContextProvider {
    dispatchAuthUpdate(accessToken) {
        this.dispatchEvent(new CustomEvent(EVENTS.AUTH_UPDATE, { detail: { accessToken } }));
    }

    setupEvents() {
        eventEmitter.subscribe(EVENTS.USER_LOGIN, (data) => {
            const { accessToken, user } = data;
            setAccessToken(accessToken);
            this.updateContext({
                value: {
                    accessToken,
                    user
                }
            });
            this.dispatchAuthUpdate(accessToken);
        });

        eventEmitter.subscribe(EVENTS.USER_LOGOUT, () => {
            setAccessToken(undefined);
            this.updateContext({
                value: {
                    accessToken: null,
                    user: null
                }
            });
            this.dispatchAuthUpdate(null);
        });
    }

    fetchContextUserOnPageLoad() {
        const host = window?.location?.host;
        // one-time fetch of the context user, returns user if
        // refresh token in cookie is valid
        fetchContextUser(host).then((data) => {
            const { accessToken, user } = data;
            setAccessToken(accessToken);
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
        this.fetchContextUserOnPageLoad();
    }
}
