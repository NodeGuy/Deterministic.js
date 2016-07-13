'use strict'

var name = 'math-sqrt'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.sqrt()',
      errors: [{
        message: 'Math.sqrt() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
