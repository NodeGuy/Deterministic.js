'use strict';

var
  name = "date-new",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  ruleTester = new RuleTester();

ruleTester.run(name, rule, {
  valid: [
    "new Date(0)"
  ],
  invalid: [
    {
      code: "new Date()",
      errors: [{
        message: "new Date() always returns the epoch.",
        type: 'NewExpression'
      }]
    }
  ]
});
