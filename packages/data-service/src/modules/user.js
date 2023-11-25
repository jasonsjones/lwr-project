import { resolveApiBaseUrl } from '../services/utils.js';

export async function fetchContextUser(clientHost) {
    const apiBaseUrl = resolveApiBaseUrl(clientHost);
    const res = await fetch(`${apiBaseUrl}/api/v1/auth/me`, { credentials: 'include' });
    return res.json();
}
