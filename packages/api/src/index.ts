import 'dotenv/config';
import { FastifyInstance } from 'fastify';
import { getAppInstance } from './server';

const port = parseInt(process.env.PORT) || 3000;

/**
 * Registers clean-up actions for app shutdown
 */
async function registerCleanUpActions(fastify: FastifyInstance): Promise<void> {
    ['SIGINT', 'SIGTERM'].forEach((signal) => {
        process.on(signal, async () => {
            await fastify.close();
            process.exit(0);
        });
    });
}

async function main(): Promise<void> {
    const fastify: FastifyInstance = await getAppInstance();
    await registerCleanUpActions(fastify);

    try {
        await fastify.listen({ port, host: '0.0.0.0' });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

main();
