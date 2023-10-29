import { describe, expect, it } from 'vitest';
import { buildServer } from '../server.js';

describe('Index route', () => {
    it('returns json with message property', async () => {
        const app = await buildServer();
        const response = await app.inject({
            method: 'GET',
            url: '/'
        });

        expect(response.statusCode).toBe(200);
        expect(response.json()).toHaveProperty('message');
    });
});
