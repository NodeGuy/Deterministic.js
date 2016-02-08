'use strict';

var
  name = "math-log",
  rule = require('../../lib/ESLint rules/' + name),
  RuleTester = require('eslint/lib/testers/rule-tester'),

  tester = new RuleTester();

tester.run(name, rule, {
  valid: [
    "foo.bar()"
  ],
  invalid: [
    {
      code: "Math.log()",
      errors: [{
        message: "Math.log() is not yet deterministic.",
        type: 'CallExpression'
      }]
    }
  ]
});
