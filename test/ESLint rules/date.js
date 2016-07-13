'use strict'

var name = 'date'
var rule = require('../../lib/ESLint rules/' + name)
var RuleTester = require('eslint/lib/testers/rule-tester')

var ruleTester = new RuleTester()

ruleTester.run(name, rule, {
  valid: [
    'foobar()'
  ],
  invalid: [
    {
      code: 'Date()',
      errors: [{
        message: 'When Date() is called as a function it always returns the epoch.',

        type: 'CallExpression'
      }]
    }
  ]
})
