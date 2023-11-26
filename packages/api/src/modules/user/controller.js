import fastifyPassport from '@fastify/passport';
import { createUser, deleteUserById, getUsers, getUserById } from './service.js';

export async function createUserHandler(req, reply) {
    const user = await createUser(req.body);
    reply.statusCode = 201;
    return { user };
}

export async function deleteUserHandler(req) {
    const { id } = req.params;
    try {
        const user = await deleteUserById(id);
        return { user };
    } catch (err) {
        return { user: null };
    }
}

export async function getUserHandler(req) {
    const { id } = req.params;
    try {
        const user = await getUserById(id);
        return { user };
    } catch (err) {
        return { user: null };
    }
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
