'use strict'

var name = 'math-random'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar'
  ],
  invalid: [
    {
      code: 'Math.random',
      errors: [{
        message: 'Math.random() always returns the same pseudo-random sequence.',
        type: 'MemberExpression'
      }]
    }
  ]
})
