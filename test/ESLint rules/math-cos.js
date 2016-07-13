'use strict'

var name = 'math-cos'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.cos()',
      errors: [{
        message: 'Math.cos() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
