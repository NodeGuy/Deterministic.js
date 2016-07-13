'use strict'

var name = 'math-acos'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.acos()',
      errors: [{
        message: 'Math.acos() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
