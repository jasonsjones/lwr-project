import fastifyPassport from '@fastify/passport';
import { getUsers } from './service.js';

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
}

export default userRoutes;
