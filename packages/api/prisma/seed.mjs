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
        firstName: 'Oliver',
        lastName: 'Queen',
        email: 'ollie@qc.com',
        roles: ['ADMIN']
    },
    {
        firstName: 'Barry',
        lastName: 'Allen',
        email: 'barry@starlabs.com',
        roles: ['USER']
    },
    {
        firstName: 'William',
        lastName: 'Riker',
        email: 'xo@ncc1701d.mil',
        roles: ['USER']
    }
];

async function seed() {
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);

    console.log('Start seeding db...');
    await prisma.user.upsert({
        where: { email: 'jasonjones@salesforce.com' },
        update: {},
        create: {
            firstName: 'Jason',
            lastName: 'Jones',
            email: 'jasonjones@salesforce.com',
            roles: ['ADMIN'],
            authData: {
                create: {
                    passwordHash: '',
                    oauthProvider: {
                        create: {
                            name: 'forcedotcom',
                            providerId: '00DB0000000TbqOMAS/005B0000004qvVUIAY'
                        }
                    }
                }
            }
        }
    });

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
