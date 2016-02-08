/**
 * @fileoverview Tests for Date.now() rule.
 * @author David Braun
 * @copyright 2016 David Braun. All rights reserved.
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../lib/rules/Date.now()"),
    RuleTester = require("eslint/lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("Date.now()", rule, {
    valid: [
        "foo.bar()"
    ],
    invalid: [
        {
            code: "Date.now()",
            errors: [{ message: "Unexpected use of 'with' statement.", type: "WithStatement"}]
        }
    ]
});
