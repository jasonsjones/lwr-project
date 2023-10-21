export default {
    preset: '@lwc/jest-preset',
    moduleNameMapper: {
        '^orion/(.+)$': '<rootDir>/src/modules/orion/$1/$1',
        '^orionlabs/(.+)$': '<rootDir>/src/modules/orionlabs/$1/$1',
        '^lwr/(.+)$': '<rootDir>/jest_modules/lwr/$1/$1'
    },
    coverageDirectory: './coverage/jest/',
    coveragePathIgnorePatterns: ['/node_modules/', '.html', '/__tests__/']
};
