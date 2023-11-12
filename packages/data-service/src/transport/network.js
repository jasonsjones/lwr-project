import { Environment, InMemoryStore, Luvio } from '@luvio/engine';
import { getTokenInfo } from '../store/tokenStore';

const store = new InMemoryStore();

function generateHeaders(body) {
    const { accessToken } = getTokenInfo();

    let headers = {};
    if (body) {
        headers['Content-Type'] = 'application/json';
    }

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return headers;
}

async function networkAdapter(resourceRequest) {
    const { baseUri, basePath, body, method } = resourceRequest;
    const path = `${baseUri}${basePath}`;
    const isBodyNull = body === null;

    const response = await fetch(path, {
        method: method.toUpperCase(),
        credentials: 'include',
        headers: generateHeaders(body),
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
