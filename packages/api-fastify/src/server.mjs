import Fastify from 'fastify';

const BASE_URL_V1 = '/api/v1';

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty'
        }
    },
    test: false
};

export async function buildServer() {
    const fastify = Fastify({
        logger: envToLogger[process.env.NODE_ENV] ?? true
    });

    fastify.get('/', async function handler() {
        return { message: 'Fastify API root, visit /api/v1/{resource} for more' };
    });

    fastify.get(BASE_URL_V1, async function handler() {
        return { message: 'Fastify API', version: 1 };
    });

    fastify.get('/healthcheck', async function handler() {
        return { status: 'OK' };
    });

    return fastify;
}
