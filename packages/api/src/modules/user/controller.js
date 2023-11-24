import fastifyPassport from '@fastify/passport';
import { createUser, getUsers } from './service.js';

export async function createUserHandler(req, reply) {
    const user = await createUser(req.body);
    reply.statusCode = 201;
    return { user };
}

export async function getUsersHandler(req, reply) {
    if (req.user) {
        const users = await getUsers();
        return { users };
    }

    reply.statusCode = 401;
    return { users: null };
}

export function authJwt() {
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
