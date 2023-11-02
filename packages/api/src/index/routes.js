async function indexRoutes(app) {
    app.get('/', async function handler() {
        return { message: 'Fastify API root, visit /api/v1/{resource} for more' };
    });

    app.get('/healthcheck', async function handler() {
        return { status: 'OK' };
    });
}

export default indexRoutes;
