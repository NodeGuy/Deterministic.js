'use strict';

var
  name = "math-pow",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.pow()",
      errors: [{
        message: "Math.pow() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
