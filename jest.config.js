module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(t|j)sx$": "babel-jest",
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest'
  },
  collectCoverageFrom: [
    "lib/**/*.{js,tsx,ts,vue}",
  ],
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
