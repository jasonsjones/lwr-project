/**
 * Defines endpoints on the index route that are not otherwise contained
 * in other modules (e.g., auth, user, etc)
 *
 * @param {import('fastify').FastifyInstance} app - the fastify instance
 */
async function indexRoutes(app) {
    app.get('/', async function handler() {
        return { message: 'Fastify API root, visit /api/v1/{resource} for more' };
    });

    app.get('/healthcheck', async function handler() {
        return { status: 'OK' };
    });
}

export default indexRoutes;
