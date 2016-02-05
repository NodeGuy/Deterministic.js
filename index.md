---
layout: default
---
# Introduction

This is a compiler which takes a program written in ordinary JavaScript (ECMAScript®) and rewrites it so that it always produces the same outputs for given inputs.

## Why is this interesting?

It's useful for writing distributed applications in which the same code executes simultaneously on multiple computers.  If the code is deterministic then its state can be synchronized across different computers without requiring network communication.  Two examples which make use of this property  are [smart contract applications](https://erisindustries.com/) and multiplayer games.

## Why isn't JavaScript already deterministic?

There are a few obvious reasons, such as the random number generator and the ability to get the current time.  Less obvious are areas of JavaScript that were underspecified in order to allow for improved performance.

# Status

First we're targeting a fully deterministic version of [ECMAScript® Edition 5.1](http://www.ecma-international.org/ecma-262/5.1/).  Once we complete that we'll look at supporting the new features of [ECMAScript® 2015](http://www.ecma-international.org/ecma-262/6.0/index.html).

The compiler is usable today but the following possible sources of non-determinism still need to be ironed out:

* the `Math` functions `acos`, `asin`, `atan`, `atan2`, `cos`, `log`, `pow`, `sin`, `sqrt`, and `tan`
* semantics of modifying a list that is being iterated over
* several aspects of the behaviour of `Array.sort` (stability of the sort, ordering of calls to accessors and `valueOf`, behaviour when the comparison function is inconsistent, and a few other edge cases—see ES5 section 15.4.4.11)
* implementation-defined behaviour of standard library functions (for example, `String.prototype.localeCompare`; any function called with extra arguments)
* Non-deterministic exceptions like out of memory and stack overflow are catchable.
* non-determinism as a result of floating point operations [(This may no longer be an issue since 2005.)](http://stackoverflow.com/questions/3206101/extended-80-bit-double-floating-point-in-x87-not-sse2-we-dont-miss-it)
* The whole spec should be gone over with a fine-tooth comb.

# Usage

## Installation

`npm install deterministic`

## Example

~~~ javascript
'use strict';

var
  assert = require('assert'),
  deterministic = require('deterministic');

it("is like magic", function () {
  var
    compiled;

  function magicTrick() {
    // The first random number will be 0.5945264333859086!
    assert.equal(Math.random(), 0.5945264333859086);

    // How about time travel?  The year is 1970 again:
    assert.equal((new Date()).getUTCFullYear(), 1970);
  }

  compiled = deterministic.compile('(' + String(magicTrick) + ')()');
  console.log("Helpful compilation warnings:\n", compiled.warnings);
  eval(compiled.code);
});
~~~

Execution produces:

~~~ javascript
$ mocha test/example.js 


Helpful compilation warnings:
 [ { ruleId: 'math-random',
    severity: 1,
    message: 'Math.random() always returns the same pseudo-random sequence.',
    line: 3,
    column: 18,
    nodeType: 'MemberExpression',
    source: '    assert.equal(Math.random(), 0.5945264333859086);' },
  { ruleId: 'date-new',
    severity: 1,
    message: 'new Date() always returns the epoch.',
    line: 6,
    column: 19,
    nodeType: 'NewExpression',
    source: '    assert.equal((new Date()).getUTCFullYear(), 1970);' } ]
  ✓ is like magic (154ms)

  1 passing (158ms)
~~~

## API

See the full [API documentation](API).

# We are now held within un- sub- or super-natural forces.

<iframe width="420" height="315" src="https://www.youtube.com/embed/NbInZ5oJ0bc" frameborder="0" allowfullscreen></iframe>

# Copyright

Copyright 2016 [David Braun](http://www.NodeGuy.com/)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with the License.  You may obtain a copy of the License at `http://www.apache.org/licenses/LICENSE-2.0`.  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the License for the specific language governing permissions and limitations under the License.
