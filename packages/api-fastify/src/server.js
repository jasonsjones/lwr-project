import Fastify from 'fastify';
import indexRoutes from './index/routes.js';

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

    return app;
}
