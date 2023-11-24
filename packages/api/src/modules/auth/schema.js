const authResponseNull = {
    type: 'object',
    properties: {
        accessToken: { nullable: true },
        user: { $ref: 'userSchema#' }
    }
};

export const loginSchema = {
    body: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' }
        },
        required: ['email', 'password']
    },
    response: {
        200: {
            type: 'object',
            properties: {
                accessToken: { type: 'string' },
                user: { $ref: 'userSchema#' }
            }
        },
        401: authResponseNull
    }
};

export const logoutSchema = {
    response: {
        200: authResponseNull
    }
};

export const getMeSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                accessToken: { nullable: true, type: 'string' },
                user: { $ref: 'userSchema#' }
            }
        }
    }
};
