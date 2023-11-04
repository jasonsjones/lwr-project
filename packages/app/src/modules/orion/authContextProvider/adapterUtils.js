import { readonly, createContextProvider } from 'lwc';
import ContextAdapter from './contextAdapter';

const ContextDataMap = new WeakMap();

function getContextData(target) {
    let contextData = ContextDataMap.get(target);

    if (contextData === undefined) {
        contextData = {
            consumers: [],
            value: null
        };
        ContextDataMap.set(target, contextData);
    }
    return contextData;
}

export function setup(target) {
    const authContext = createContextProvider(ContextAdapter);

    authContext(target, {
        consumerConnectedCallback(consumer) {
            // once the first consumer gets connected, then we create the contextData object
            const contextData = getContextData(target);
            // registering the new consumer
            contextData.consumers.push(consumer);
            // push the current value
            consumer.provide({ value: contextData.value });
        },

        consumerDisconnectedCallback(consumer) {
            const contextData = getContextData(target);
            const i = contextData.consumers.indexOf(consumer);
            if (i >= 0) {
                contextData.consumers.splice(i, 1);
            } else {
                throw new TypeError(`Invalid context operation in ${target}.`);
            }
        }
    });
}

/**
 * Emit new value to consumers
 *
 * @param {*} target target object which is the context
 * @param {*} newValue new value for the context
 */
export function emit(target, newValue) {
    const contextData = getContextData(target);
    contextData.value = readonly(newValue ?? defaultValue);
    contextData.consumers.forEach((consumer) => consumer.provide({ value: readonly(newValue) }));
}
