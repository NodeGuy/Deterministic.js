'use strict'

var name = 'math-tan'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.tan()',
      errors: [{
        message: 'Math.tan() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
