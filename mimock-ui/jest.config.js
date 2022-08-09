module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['/node_modules/', '/src/.aux/'],
	coverageProvider: 'babel',
	coverageReporters: ['json', 'lcov', 'clover'],
	errorOnDeprecated: true,
	rootDir: 'src',
	roots: ['<rootDir>'],
	runner: 'jest-runner',
	setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
	slowTestThreshold: 10,
	testEnvironment: 'jest-environment-jsdom',
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	testPathIgnorePatterns: ['/node_modules/'],
	timers: 'fake',
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 85,
			lines: 85,
			statements: 85,
		},
	},
	moduleNameMapper: {
		'\\.(css|jpg|png|svg)$': '<rootDir>/__mocks__/assetMock.js',
	},
	// watchman: true,
	// testURL: "http://localhost",
	// maxWorkers: "50%",
};
