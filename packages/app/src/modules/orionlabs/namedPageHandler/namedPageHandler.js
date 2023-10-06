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
