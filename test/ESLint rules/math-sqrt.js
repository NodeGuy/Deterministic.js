'use strict';

var
  name = "math-sqrt",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.sqrt()",
      errors: [{
        message: "Math.sqrt() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
