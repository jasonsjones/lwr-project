export const getUsersSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                users: {
                    type: 'array',
                    items: { $ref: 'userSchema#' }
                }
            }
        }
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
                user: { $ref: 'userSchema#' }
            }
        }
    }
};

export const getUserSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                user: { $ref: 'userSchema#' }
            }
        }
    }
};

export const deleteUserSchema = getUserSchema;
