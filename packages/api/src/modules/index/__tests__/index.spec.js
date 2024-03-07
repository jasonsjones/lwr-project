import { describe, expect, it } from 'vitest';
import { getAppInstance } from '../../../server';

describe('Index route (GET /)', () => {
    it('returns json with message property', async () => {
        const app = await getAppInstance();
        const response = await app.inject({
            method: 'GET',
            url: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toHaveProperty('message');
    });
});

describe('Healthcheck route (GET /healthcheck)', () => {
    it('returns json with status property', async () => {
        const app = await getAppInstance();
        const response = await app.inject({
            method: 'GET',
            url: '/healthcheck'
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toHaveProperty('status');
    });
});
