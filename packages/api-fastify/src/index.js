import { buildServer } from './server.js';
const port = process.env.PORT || 3001;

async function registerCleanUpActions(fastify) {
    ['SIGINT', 'SIGTERM'].forEach((signal) => {
        process.on(signal, async () => {
            await fastify.close();
            process.exit(0);
        });
    });
}

async function main() {
    const fastify = await buildServer();
    await registerCleanUpActions(fastify);

    try {
        await fastify.listen({ port, host: '0.0.0.0' });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

main();
