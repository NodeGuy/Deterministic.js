module.exports = function () {
  return {
    files: [
      { pattern: 'lib/**/*.js', instrument: true }
    ],

    tests: [
      '!test/index.js',
      'test/*.js'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'mocha'
  }
}
