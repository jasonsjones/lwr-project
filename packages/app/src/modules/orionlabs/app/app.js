import { api, LightningElement } from 'lwc';
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
    }
];

export default class App extends LightningElement {
    router = createRouter({ routes });

    @api message = 'Hello World!';

    get usersPageRef() {
        return {
            type: 'namedPage',
            attributes: {
                pageName: 'users'
            }
        };
    }
}
