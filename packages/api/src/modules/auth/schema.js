const nullPayload = {
    type: 'object',
    properties: {
        accessToken: { nullable: true },
        user: { $ref: 'userSchema#' }
    }
};

const nullResponse = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        message: { type: 'string' },
        results: nullPayload
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
                success: { type: 'boolean' },
                message: { type: 'string' },
                results: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string' },
                        user: { $ref: 'userSchema#' }
                    }
                }
            }
        },

        401: nullResponse
    }
};

export const logoutSchema = {
    response: {
        200: nullResponse
    }
};

export const getMeSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                results: {
                    type: 'object',
                    properties: {
                        accessToken: { type: 'string' },
                        user: { $ref: 'userSchema#' }
                    }
                }
            }
        }
    }
};
