'use strict'

var name = 'math-asin'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.asin()',
      errors: [{
        message: 'Math.asin() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
