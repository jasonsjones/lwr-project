import {
    authJwt,
    createUserHandler,
    deleteUserHandler,
    getUserHandler,
    getUsersHandler
} from './controller.js';
import { createUserSchema, deleteUserSchema, getUserSchema, getUsersSchema } from './schema.js';

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

    app.get('/:id', { schema: getUserSchema }, getUserHandler);
    app.delete('/:id', { schema: deleteUserSchema }, deleteUserHandler);
}

export default userRoutes;
