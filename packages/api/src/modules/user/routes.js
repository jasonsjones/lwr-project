import fastifyPassport from '@fastify/passport';
import { createUser, getUsers } from './service.js';
import { createUserSchema } from './schema.js';

function authJwt() {
    return fastifyPassport.authenticate(
        'jwt',
        { session: false },
        async (req, reply, err, user, info, _status) => {
            if (err !== null) {
                req.log.warn(err);
            } else if (user) {
                req.user = user;
            }

            if (info) {
                req.log.warn(info.message);
            }
        }
    );
}

/**
 * Defines endpoints for the user resource
 *
 * @param {import('fastify').FastifyInstance} app - the fastify instance
 */
async function userRoutes(app) {
    app.get(
        '/',
        {
            preValidation: authJwt()
        },
        async function handler(req, reply) {
            if (req.user) {
                const users = await getUsers();
                return { users };
            }

            reply.statusCode = 401;
            return { users: null };
        }
    );

    app.post(
        '/',
        {
            schema: createUserSchema
        },
        async function handler(req, reply) {
            const user = await createUser(req.body);
            reply.statusCode = 201;
            return { user };
        }
    );
}

export default userRoutes;
