import { LOCAL_URLS } from './constants';

export function resolveApiBaseUrl(host) {
    let apiBaseUrl;

    switch (host) {
        case LOCAL_URLS.CLIENT:
            apiBaseUrl = `http://${LOCAL_URLS.API}`;
            break;
        default:
            break;
    }

    return apiBaseUrl;
}
