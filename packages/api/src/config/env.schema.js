export const envSchema = {
    type: 'object',
    required: ['PORT', 'SESSION_SECRET', 'ACCESS_TOKEN_SECRET', 'REFRESH_TOKEN_SECRET'],
    properties: {
        PORT: {
            type: 'string',
            default: 3000
        },
        SESSION_SECRET: {
            type: 'string'
        },
        ACCESS_TOKEN_SECRET: {
            type: 'string'
        },
        REFRESH_TOKEN_SECRET: {
            type: 'string'
        }
    }
};
