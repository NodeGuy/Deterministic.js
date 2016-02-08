'use strict';

var
  name = "math-atan2",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.atan2()",
      errors: [{
        message: "Math.atan2() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
