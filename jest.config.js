export default {
    preset: '@lwc/jest-preset',
    moduleNameMapper: {
        '^orionlabs/(.+)$': '<rootDir>/src/modules/orionlabs/$1/$1'
    },
    coverageDirectory: './coverage/jest/',
    coveragePathIgnorePatterns: ['/node_modules/', '.html', '/__tests__/']
};
