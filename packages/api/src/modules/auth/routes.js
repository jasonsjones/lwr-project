import {
    authUserLogoutHandler,
    authUserTokensHandler,
    authenticateLocal,
    getMePreHandler
} from './controller.js';
import { getMeSchema, loginSchema, logoutSchema } from './schema.js';

/**
 * Defines endpoints for the auth resource
 *
 * @param {import('fastify').FastifyInstance} app - the fastify instance
 */
async function authRoutes(app) {
    app.post(
        '/login',
        {
            schema: loginSchema,
            preValidation: authenticateLocal()
        },
        authUserTokensHandler
    );

    app.post('/logout', { schema: logoutSchema }, authUserLogoutHandler);

    app.get(
        '/me',
        {
            schema: getMeSchema,
            preHandler: getMePreHandler
        },
        authUserTokensHandler
    );
}

export default authRoutes;
