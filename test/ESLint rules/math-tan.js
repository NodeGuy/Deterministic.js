'use strict';

var
  name = "math-tan",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.tan()",
      errors: [{
        message: "Math.tan() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
