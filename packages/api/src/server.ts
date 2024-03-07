import 'dotenv/config.js';
import Fastify, { FastifyInstance } from 'fastify';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import fastifyCors from '@fastify/cors';
import LocalStrategy from './modules/auth/strategies/local';
import JwtStrategy from './modules/auth/strategies/jwt';
import ForceDotComStrategy from './modules/auth/strategies/forcedotcom';
import indexRoutes from './modules/index/routes';
import userRoutes from './modules/user/routes';
import authRoutes from './modules/auth/routes';

let app: FastifyInstance;

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

function addCommonSchemas(app) {
    app.addSchema({
        $id: 'userSchema',
        type: 'object',
        nullable: true,
        properties: {
            id: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            roles: { type: 'array', items: { type: 'string' } },
            createdAt: { typs: 'string' },
            updatedAt: { typs: 'string' }
        }
    });
}

/**
 * Builds the fastify server
 */
async function buildApp(): Promise<FastifyInstance> {
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
    fastifyPassport.use('forcedotcom', ForceDotComStrategy);

    addCommonSchemas(app);

    app.register(indexRoutes);
    app.register(userRoutes, { prefix: `${BASE_URL_V1}/users` });
    app.register(authRoutes, { prefix: `${BASE_URL_V1}/auth` });

    return app;
}

export async function getAppInstance() {
    if (!app) {
        app = await buildApp();
    }
    return app;
}
