export default class OAuthCallbackHander {
    callback;

    constructor(cb) {
        this.callback = cb;
    }

    dispose() {
        /* noop */
    }

    update({ attributes }) {
        let viewGetter;

        // Get the "provider" from the incoming page reference
        switch (attributes.provider) {
            case 'sfdc':
                viewGetter = () => import('orionlabs/oAuthHandlerSfdc');
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
