import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import fastifyCors from '@fastify/cors';
import LocalStrategy from './modules/auth/strategies/local.js';
import indexRoutes from './modules/index/routes.js';
import userRoutes from './modules/user/routes.js';
import authRoutes from './modules/auth/routes.js';

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

    app.register(fastifyCors);
    app.register(fastifyCookie);
    app.register(fastifySession, { secret: 'super secret session secret ksjkdjoiiiwbnviwuruiowh' });
    app.register(fastifyPassport.initialize());
    app.register(fastifyPassport.secureSession());
    fastifyPassport.use('local', LocalStrategy);

    app.register(indexRoutes);
    app.register(userRoutes, { prefix: `${BASE_URL_V1}/users` });
    app.register(authRoutes, { prefix: `${BASE_URL_V1}/auth` });

    return app;
}
