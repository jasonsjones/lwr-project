import prisma from '../db/client.mjs';

export async function getUsers() {
    return prisma.user.findMany();
}
