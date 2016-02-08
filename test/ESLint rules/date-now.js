'use strict';

var
  name = "date-now",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  ruleTester = new RuleTester();

ruleTester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Date.now()",
      errors: [{
        message: "Date.now() always returns 0.",
        type: 'CallExpression'
      }]
    }
  ]
});
