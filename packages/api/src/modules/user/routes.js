import { authJwt, createUserHandler, getUsersHandler } from './controller.js';
import { createUserSchema, getUsersSchema } from './schema.js';

/**
 * Defines endpoints for the user resource
 *
 * @param {import('fastify').FastifyInstance} app - the fastify instance
 */
async function userRoutes(app) {
    app.get(
        '/',
        {
            schema: getUsersSchema,
            preValidation: authJwt()
        },
        getUsersHandler
    );

    app.post(
        '/',
        {
            schema: createUserSchema
        },
        createUserHandler
    );
}

export default userRoutes;
