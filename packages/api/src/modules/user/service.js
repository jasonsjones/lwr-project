import prisma from '../../config/db/client.js';

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function getUserByEmailIncludePassword(email) {
    return await prisma.user.findUnique({ where: { email }, include: { password: true } });
}

export async function getUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
}
