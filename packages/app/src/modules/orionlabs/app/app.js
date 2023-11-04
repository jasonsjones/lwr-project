import { createRouter } from 'lwr/router';
import AuthContextProvider from 'orion/authContextProvider';
import eventEmitter from 'orion/eventEmitter';

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
        eventEmitter.subscribe('user-login', (data) => {
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
