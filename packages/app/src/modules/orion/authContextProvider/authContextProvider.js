import { LightningElement } from 'lwc';
import { emit, setup } from './adapterUtils';
import ContextAdapter from './contextAdapter';

export const getAuthContext = ContextAdapter;
export const PROVIDER_STATE = Object.freeze({
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    UPDATE: 'update'
});

const SetContext = Symbol('SetContext');
const Data = Symbol('Data');

export default class AuthContextProvider extends LightningElement {
    [Data] = {};

    constructor() {
        super();
        setup(this);
    }

    connectedCallback() {
        this[SetContext]({
            data: this[Data],
            state: PROVIDER_STATE.CONNECTED
        });
    }

    disconnectedCallback() {
        this[SetContext]({
            data: this[Data],
            state: PROVIDER_STATE.DISCONNECTED
        });
    }

    updateContext(data) {
        this[Data] = data;
        this[SetContext]({
            data: this[Data],
            state: PROVIDER_STATE.UPDATE
        });
    }

    [SetContext](newValue) {
        emit(this, newValue);
    }
}
