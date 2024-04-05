import { LightningElement } from 'lwc';
import { createRouter } from 'lwr/router';

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
    },
    {
        id: 'userDetails',
        uri: '/users/:userId',
        patterns: {
            userId: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ABab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$'
        },
        handler: () => import('orionlabs/userDetailsHandler'),
        page: {
            type: 'userDetails',
            attributes: {
                userId: ':userId'
            }
        }
    },
    {
        id: 'oAuthCallback',
        uri: '/api/v1/auth/:provider/callback',
        handler: () => import('orionlabs/oAuthCallbackHandler'),
        page: {
            type: 'oauth',
            attributes: {
                provider: ':provider'
            }
        }
    }
];

export default class App extends LightningElement {
    router = createRouter({ routes });

    accessToken;

    handleAuthUpdate(event) {
        this.accessToken = event?.detail?.accessToken;
    }

    get isAuthenticated() {
        return !!this.accessToken;
    }

    get usersPageRef() {
        return {
            type: 'namedPage',
            attributes: {
                pageName: 'users'
            }
        };
    }

    preNavigate(event) {
        const {
            next: {
                route: { pageReference }
            }
        } = event.detail;
        const {
            attributes: { pageName }
        } = pageReference;

        // don't navigate to login route if user is already authenticated
        if (this.isAuthenticated && pageName === 'login') {
            event.preventDefault();
        }
    }
}
