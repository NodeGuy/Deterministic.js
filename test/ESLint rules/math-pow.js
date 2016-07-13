'use strict'

var name = 'math-pow'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var tester = new RuleTester()

tester.run(name, rule, {
  valid: [
    'foo.bar()'
  ],
  invalid: [
    {
      code: 'Math.pow()',
      errors: [{
        message: 'Math.pow() is not yet deterministic.',
        type: 'CallExpression'
      }]
    }
  ]
})
