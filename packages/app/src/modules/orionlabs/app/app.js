import { createRouter } from 'lwr/router';
import AuthContextProvider from 'orion/authContextProvider';
import eventEmitter from 'orion/eventEmitter';
import { EVENTS } from 'orionlabs/common';

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

const routes = [
    {
        id: 'home',
        uri: '/',
        handler: () => import('orionlabs/homePageHandler'),
        page: {
            type: 'home'
        }
    },
    {
        id: 'namedPage',
        uri: '/:pageName',
        handler: () => import('orionlabs/namedPageHandler'),
        page: {
            type: 'namedPage',
            attributes: {
                pageName: ':pageName'
            }
        }
    }
];

export default class App extends AuthContextProvider {
    router = createRouter({ routes });

    get usersPageRef() {
        return {
            type: 'namedPage',
            attributes: {
                pageName: 'users'
            }
        };
    }

    connectedCallback() {
        eventEmitter.subscribe(EVENTS.USER_LOGIN, (data) => {
            const { accessToken, user } = data;
            this.updateContext({
                value: {
                    accessToken,
                    user
                }
            });
        });

        eventEmitter.subscribe(EVENTS.USER_LOGOUT, () => {
            this.updateContext({
                value: {
                    accessToken: null,
                    user: null
                }
            });
        });

        const host = window?.location?.host;
        // one-time fetch of the context user, returns user if
        // refresh token in cookie is valid
        fetchContextUser(host).then((data) => {
            const { accessToken, user } = data;
            this.updateContext({
                value: {
                    accessToken,
                    user
                }
            });
        });
    }
}
