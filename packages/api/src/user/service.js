import prisma from '../db/client.js';

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function getUserByEmailIncludePassword(email) {
    return await prisma.user.findUnique({ where: { email }, include: { password: true } });
}
