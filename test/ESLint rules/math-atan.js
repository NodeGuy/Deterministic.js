'use strict';

var
  name = "math-atan",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.atan()",
      errors: [{
        message: "Math.atan() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
