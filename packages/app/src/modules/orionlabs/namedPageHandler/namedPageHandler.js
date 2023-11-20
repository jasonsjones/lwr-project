export default class NamedPageHandler {
    callback;

    constructor(cb) {
        this.callback = cb;
    }

    dispose() {
        /* noop */
    }

    update({ attributes }) {
        let viewGetter;

        // Get the "pageName" from the incoming page reference
        switch (attributes.pageName) {
            case 'about':
                viewGetter = () => import('orionlabs/about');
                break;
            case 'login':
                viewGetter = () => import('orionlabs/login');
                break;
            case 'signup':
                viewGetter = () => import('orionlabs/signup');
                break;
            case 'users':
                viewGetter = () => import('orionlabs/userList');
                break;
            default:
                return;
        }

        this.callback({
            viewset: {
                default: viewGetter
            }
        });
    }
}
