/* eslint-disable no-eval */

'use strict'

var assert = require('assert')
var deterministic = require('../lib')
var _ = require('lodash')

function compile (fixture) {
  return deterministic.compile('(' + String(fixture) + ')()')
}

function evaluate (fixture) {
  return eval(compile(fixture).code)
}

/*
12.6.4 The for-in Statement

The mechanics and order of enumerating the properties (step 6.a in the first
algorithm, step 7.a in the second) is not specified. Properties of the object
being enumerated may be deleted during enumeration. If a property that has not
yet been visited during enumeration is deleted, then it will not be visited.
If new properties are added to the object being enumerated during enumeration,
the newly added properties are not guaranteed to be visited in the active
enumeration. A property name must not be visited more than once in any
enumeration.
*/
describe('for-in enumerates object properties in sorted order.', function () {
  it('with single statement', function () {
    function fixture () {
      var object, properties, property

      object = {}
      object.b = true
      object.a = true
      properties = []

      /* eslint-disable */
      for (property in object)
        properties.push(property)
      /* eslint-enable */

      return properties
    }

    assert.deepEqual(evaluate(fixture), ['a', 'b'])
  })

  it('with block statement', function () {
    function fixture () {
      var object, properties, property

      object = {}
      object.b = true
      object.a = true
      properties = []

      for (property in object) {
        properties.push(property)
      }

      return properties
    }

    assert.deepEqual(evaluate(fixture), ['a', 'b'])
  })

  it('with variable declaration', function () {
    function fixture () {
      var object, properties

      object = {}
      object.b = true
      object.a = true
      properties = []

      for (var property in object) {
        properties.push(property)
      }

      return properties
    }

    assert.deepEqual(evaluate(fixture), ['a', 'b'])
  })
})

/*
5.2.3.14 Object.keys ( O )

If an implementation defines a specific order of enumeration for the for-in
statement, that same enumeration order must be used in step 5 of this
algorithm.
*/
it("Object.keys ( O ) returns the object's keys in sorted order.", function () {
  function fixture () {
    var object

    object = {}
    object.b = true
    object.a = true
    return Object.keys(object)
  }

  assert.deepEqual(evaluate(fixture), ['a', 'b'])
})

/*
15.8.2.14 random ( )

Returns a Number value with positive sign, greater than or equal to 0 but less
than 1, chosen randomly or pseudo randomly with approximately uniform
distribution over that range, using an implementation-dependent algorithm or
strategy. This function takes no arguments.
*/
it('Math.random() returns a predictable sequence of numbers.', function () {
  var compiled

  compiled = deterministic.compile('_.times(10, Math.random)')

  assert(_.isMatch(compiled.warnings[0], {
    message: 'Math.random() always returns the same pseudo-random sequence.',
    source: '_.times(10, Math.random)'
  }))

  assert.deepEqual(
    eval(compiled.code),
    [0.5945264333859086, 0.8065849216654897, 0.12979769078083336,
      0.6747123580425978, 0.47925701597705483, 0.912539936369285,
      0.6819270721171051, 0.6659698141738772, 0.12020091176964343,
      0.259640354430303]
  )
})

describe('Date', function () {
  /*
  15.9.2 The Date Constructor Called as a Function

  When Date is called as a function rather than as a constructor, it returns a
  String representing the current time (UTC).
  */
  it('Date() always returns a string representing the epoch.', function () {
    var compiled

    compiled = deterministic.compile('Date()')

    assert(_.isMatch(compiled.warnings[0], {
      message: 'When Date() is called as a function it always returns the epoch.',

      source: 'Date()'
    }))

    assert.equal(eval(compiled.code), String(new Date(0)))
  })

  /*
  15.9.3.3 new Date ( )

  The [[PrimitiveValue]] internal property of the newly constructed object is
  set to the time value (UTC) identifying the current time.
  */
  it('new Date() always returns the epoch.', function () {
    var compiled

    compiled = deterministic.compile('new Date().getTime()')

    assert(_.isMatch(compiled.warnings[0], {
      message: 'new Date() always returns the epoch.',
      source: 'new Date().getTime()'
    }))

    assert.equal(eval(compiled.code), 0)
  })

  /*
  15.9.4.4 Date.now ( )

  The now function return a Number value that is the time value designating the
  UTC date and time of the occurrence of the call to now.
  */
  it('Date.now() always returns 0.', function () {
    var compiled

    compiled = deterministic.compile('Date.now()')

    assert(_.isMatch(compiled.warnings[0], {
      message: 'Date.now() always returns 0.',
      source: 'Date.now()'
    }))

    assert.equal(eval(compiled.code), 0)
  })
})
