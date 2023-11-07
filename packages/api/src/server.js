import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import fastifyCors from '@fastify/cors';
import fastifyEnv from '@fastify/env';
import { envSchema } from './config/env.schema.js';
import LocalStrategy from './modules/auth/strategies/local.js';
import indexRoutes from './modules/index/routes.js';
import userRoutes from './modules/user/routes.js';
import authRoutes from './modules/auth/routes.js';

const BASE_URL_V1 = '/api/v1';
const LOCAL_APP_URL = 'http://localhost:4200';

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

    app.register(fastifyEnv, { schema: envSchema, dotenv: true });
    app.register(fastifyCors, {
        origin: [LOCAL_APP_URL],
        credentials: true
    });
    app.register(fastifyCookie);
    app.register(fastifySession, { secret: process.env.SESSION_SECRET });
    app.register(fastifyPassport.initialize());
    app.register(fastifyPassport.secureSession());
    fastifyPassport.use('local', LocalStrategy);

    app.register(indexRoutes);
    app.register(userRoutes, { prefix: `${BASE_URL_V1}/users` });
    app.register(authRoutes, { prefix: `${BASE_URL_V1}/auth` });

    return app;
}
