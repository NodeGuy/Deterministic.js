'use strict'

var name = 'math-atan'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.atan()',
      errors: [{
        message: 'Math.atan() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
