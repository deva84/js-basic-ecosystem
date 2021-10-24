module.exports = {
    transform: {'^.+\\.(js|ts)$': '<rootDir>/node_modules/babel-jest'},
    transformIgnorePatterns: [
        '<rootDir>/node_modules/',
    ]
};
