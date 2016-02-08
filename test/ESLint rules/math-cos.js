'use strict';

var
  name = "math-cos",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.cos()",
      errors: [{
        message: "Math.cos() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
