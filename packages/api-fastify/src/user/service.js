import prisma from '../db/client.js';

export async function getUsers() {
    return await prisma.user.findMany();
}
