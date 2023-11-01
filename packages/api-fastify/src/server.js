import Fastify from 'fastify';
import indexRoutes from './index/routes.js';
import userRoutes from './user/routes.js';

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
    const app = Fastify({
        logger: envToLogger[process.env.NODE_ENV] ?? true
    });

    app.register(indexRoutes);
    app.register(userRoutes, { prefix: `${BASE_URL_V1}/users` });

    return app;
}
