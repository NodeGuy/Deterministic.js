'use strict';

var
  name = "date",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  ruleTester = new RuleTester();

ruleTester.run(name, rule, {
  valid: [
    "foobar()"
  ],
  invalid: [
    {
      code: "Date()",
      errors: [{
        message:
          "When Date() is called as a function it always returns the epoch.",

        type: 'CallExpression'
      }]
    }
  ]
});
