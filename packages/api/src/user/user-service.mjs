import prisma from '../db/client.mjs';

export async function getUsers() {
    return prisma.user.findMany();
}

export async function getUserByEmailIncludePassword(email) {
    return await prisma.user.findUnique({ where: { email }, include: { password: true } });
}
