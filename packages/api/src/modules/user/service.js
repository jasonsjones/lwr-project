import bcrypt from 'bcryptjs';
import prisma from '../../config/db/client.js';

export async function createUser(userData) {
    const { password, ...createUserData } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
        data: {
            ...createUserData,
            authData: {
                create: {
                    passwordHash: hashedPassword
                }
            }
        }
    });

    return newUser;
}

export async function getUsers() {
    return await prisma.user.findMany();
}

export async function getUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
}

export async function getUserByProviderId(providerId, name) {
    const authInfo = await prisma.oauthProvider.findFirst({
        where: { providerId, name },
        include: { userAuthData: true }
    });
    if (authInfo) {
        return await getUserById(authInfo.userAuthData?.userId);
    }
    return null;
}

export async function getUserByEmailIncludeAuthData(email) {
    return await prisma.user.findUnique({ where: { email }, include: { authData: true } });
}

export async function deleteUserById(id) {
    return await prisma.user.delete({ where: { id } });
}
