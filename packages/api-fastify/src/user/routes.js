import { getUsers } from './service.js';

async function userRoutes(app) {
    app.get('/', async function handler() {
        const users = await getUsers();
        return { users };
    });
}

export default userRoutes;
