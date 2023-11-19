const userSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        roles: { type: 'array', items: { type: 'string' } },
        createdAt: { typs: 'string' },
        updatedAt: { typs: 'string' }
    }
};

export const createUserSchema = {
    body: {
        type: 'object',
        properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['firstName', 'lastName', 'email', 'password']
    },
    response: {
        201: {
            type: 'object',
            properties: {
                user: userSchema
            }
        }
    }
};
