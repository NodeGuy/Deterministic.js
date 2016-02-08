'use strict';

var
  name = "math-asin",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.asin()",
      errors: [{
        message: "Math.asin() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
