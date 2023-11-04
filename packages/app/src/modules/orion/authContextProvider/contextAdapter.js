import { readonly } from 'lwc';

export default class ContextAdapter {
    static contextSchema = { value: 'required' /* could be 'optional' */ };

    contextValue = null;
    dataCallback;

    constructor(dataCallback) {
        this.contextValue = readonly({ data: {} });
        this.dataCallback = dataCallback;
        this.dataCallback(this.contextValue);
    }

    update(_config, context) {
        if (context) {
            this.contextValue = context.value ?? { data: {} };
            this.dataCallback(this.contextValue);
        }
    }

    connect() {
        // noop
    }

    disconnect() {
        // noop
    }
}
