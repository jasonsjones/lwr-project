import { Environment, InMemoryStore, Luvio } from '@luvio/engine';

const store = new InMemoryStore();

async function networkAdapter(resourceRequest) {
    const { baseUri, basePath, body, method } = resourceRequest;
    const path = `${baseUri}${basePath}`;
    const isBodyNull = body === null;
    const headers = isBodyNull ? undefined : { 'Content-Type': 'application/json' };

    const response = await fetch(path, {
        method: method.toUpperCase(),
        credentials: 'include',
        headers,
        body: isBodyNull ? null : JSON.stringify(body)
    });

    const resBody = await response.json();

    return {
        body: resBody,
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: {}
    };
}

const luvio = new Luvio(new Environment(store, networkAdapter));

export { networkAdapter, luvio };
