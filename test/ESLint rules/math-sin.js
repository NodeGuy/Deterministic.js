'use strict'

var name = 'math-sin'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.sin()',
      errors: [{
        message: 'Math.sin() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
