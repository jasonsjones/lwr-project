import 'dotenv/config.js';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import fastifyCors from '@fastify/cors';
import LocalStrategy from './modules/auth/strategies/local';
import JwtStrategy from './modules/auth/strategies/jwt';
import indexRoutes from './modules/index/routes';
import userRoutes from './modules/user/routes';
import authRoutes from './modules/auth/routes';

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

/**
 * Builds the fastify server
 */
export async function buildServer(): Promise<FastifyInstance> {
    const app = Fastify({
        logger: envToLogger[process.env.NODE_ENV] ?? true
    });

    app.register(fastifyCors, {
        origin: [LOCAL_APP_URL],
        credentials: true
    });
    app.register(fastifyCookie);
    app.register(fastifySession, { secret: process.env.SESSION_SECRET });
    app.register(fastifyPassport.initialize());
    app.register(fastifyPassport.secureSession());
    fastifyPassport.use('local', LocalStrategy);
    fastifyPassport.use('jwt', JwtStrategy);

    app.register(indexRoutes);
    app.register(userRoutes, { prefix: `${BASE_URL_V1}/users` });
    app.register(authRoutes, { prefix: `${BASE_URL_V1}/auth` });

    return app;
}
