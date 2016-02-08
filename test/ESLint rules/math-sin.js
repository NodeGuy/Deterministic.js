'use strict';

var
  name = "math-sin",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.sin()",
      errors: [{
        message: "Math.sin() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
