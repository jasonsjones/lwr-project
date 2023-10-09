import * as UserService from './user-service.mjs';

export async function getUsers(_, res) {
    const users = await UserService.getUsers();
    return res.json({ users });
}
