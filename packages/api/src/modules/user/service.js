import prisma from '../../config/db/client.js';

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function getUserByEmailIncludeAuthData(email) {
    return await prisma.user.findUnique({ where: { email }, include: { authData: true } });
}

export async function getUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
}
