import { authJwt, createUserHandler, deleteUserHandler, getUsersHandler } from './controller.js';
import { createUserSchema, deleteUserSchema, getUsersSchema } from './schema.js';

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

    app.delete('/:id', { schema: deleteUserSchema }, deleteUserHandler);
}

export default userRoutes;
