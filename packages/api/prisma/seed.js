import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DEFAULT_PASSWORD = 'test1234';

const users = [
    {
        firstName: 'Ed',
        lastName: 'Baldwin',
        email: 'ed@nasa.gov',
        roles: ['USER']
    },
    {
        firstName: 'William',
        lastName: 'Riker',
        email: 'xo@ncc1701d.mil',
        roles: ['ADMIN']
    }
];

async function seed() {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);

    console.log('Start seeding db...');
    for (const u of users) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                ...u,
                authData: {
                    create: {
                        passwordHash: hashedPassword
                    }
                }
            }
        });
        console.log(`Created ${user.firstName} with id: ${user.id}`);
    }
    console.log('Seeding finished');
}

seed()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
