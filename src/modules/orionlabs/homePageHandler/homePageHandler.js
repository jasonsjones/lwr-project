export default class HomePageHandler {
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
                default: () => import('orionlabs/home')
            }
        });
    }
}
