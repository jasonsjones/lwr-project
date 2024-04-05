export default class UserDetailHandler {
    callback;

    constructor(cb) {
        this.callback = cb;
    }

    dispose() {
        /* noop */
    }

    update() {
        this.callback({
            viewset: {
                default: () => import('orionlabs/userDetails')
            }
        });
    }
}
