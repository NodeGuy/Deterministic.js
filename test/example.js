/*eslint-disable no-eval */

'use strict'

var assert = require('assert')
var deterministic = require('deterministic')

it('is like magic', function () {
  var compiled

  function magicTrick () {
    // The first random number will be 0.5945264333859086!
    assert.equal(Math.random(), 0.5945264333859086)

    // How about time travel?  The year is 1970 again:
    assert.equal((new Date()).getUTCFullYear(), 1970)
  }

  compiled = deterministic.compile('(' + String(magicTrick) + ')()')
  console.log('Helpful compilation warnings:\n', compiled.warnings)
  eval(compiled.code)
})
