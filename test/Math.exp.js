/*eslint-disable no-eval */

'use strict'

var assert = require('assert')
var fs = require('fs')

eval(fs.readFileSync('lib/overrides/Math.exp.js', 'utf8'))

// fdlibm-util.js

function _ConstructDouble (high, low) {
  var buf = new ArrayBuffer(8)
  // This following is for a little-endian machine.  For a
  // big-endian machine reverse the indices.
  ;(new Uint32Array(buf))[1] = high
  ;(new Uint32Array(buf))[0] = low
  return new Float64Array(buf)[0]
}

describe('Math.exp', function () {
  describe('Tests of exp for exceptional values', function () {
    it('Math.exp(Infinity) = Infinity', function () {
      var y = Math.exp(Infinity)
      assert.equal(y, Infinity)
    })

    it('Math.exp(-Infinity) = 0', function () {
      var y = Math.exp(-Infinity)
      // Check for +0
      assert.equal(1 / y, Infinity)
    })

    it('Math.exp(NaN) = NaN', function () {
      var x = Infinity - Infinity
      var y = Math.exp(x)
      assert(isNaN(y))
    })
  })

  describe('Tests exp basic functionality', function () {
    it('Math.exp(709.7822265625e0), no overflow', function () {
      var x = _ConstructDouble(0x40862e42, 0)
      var y = Math.exp(x)
      assert.equal(y, 1.7968190737295725e308)
    })

    it('Math.exp(-709.7822265625e0), no underflow', function () {
      var x = -_ConstructDouble(0x40862e42, 0)
      var y = Math.exp(x)
      // The expected value is 5.565382338080107e-309, but V8
      // apparently doesn't quite read this value correctly.
      // Explicitly construct the number.
      // expect(y).toBe(_ConstructDouble(262271, 2232219626))
      assert.equal(y, _ConstructDouble(262271, 2232219626))
    })

    it('Math.exp(7.09782712893383973096e+02), no overflow', function () {
      var x = 7.09782712893383973096e+02
      var y = Math.exp(x)
      assert.equal(y, 1.7976931348622732e308)
    })

    it('Math.exp(-7.45133219101941108420e+02), no underflow', function () {
      var x = -7.45133219101941108420e+02
      var y = Math.exp(x)
      assert.equal(y, 4.9406564584124654e-324)
    })

    it('Math.exp(709.7827128933841e0), overflow', function () {
      var x = _ConstructDouble(0x40862E42, 0xFEFA39EF + 1)
      var y = Math.exp(x)
      assert.equal(y, Infinity)
    })

    it('Math.exp(-7.45133219101941108420e+02), underflow', function () {
      var x = _ConstructDouble(0xc0874910, 0xD52D3051 + 1)
      var y = Math.exp(x)
      assert.equal(y, 0)
    })

    it('Math.exp(2^-29) = 1 + 2^-29, case |x| < 2^-28', function () {
      var x = Math.pow(2, -29)
      var y = Math.exp(x)
      assert.equal(y, 1 + x)
    })

    it('Math.exp(-2^-29) = 1 - 2^-29, case |x| < 2^-28', function () {
      var x = -Math.pow(2, -29)
      var y = Math.exp(x)
      assert.equal(y, 1 + x)
    })

    it('Math.exp(0.5), case 0.5*log(2) < |x| < 1.5*log(2)', function () {
      assert.equal(Math.exp(0.5), 1.6487212707001282e0)
    })

    it('Math.exp(-0.5), case 0.5*log(2) < |x| < 1.5*log(2)', function () {
      assert.equal(Math.exp(-0.5), 0.6065306597126334e0)
    })

    it('Math.exp(2), case |x| > 1.5*log(2)', function () {
      assert.equal(Math.exp(2), 7.38905609893065e0)
    })

    it('Math.exp(-2), case |x| > 1.5*log(2)', function () {
      assert.equal(Math.exp(-2), 0.1353352832366127e0)
    })

    it('Math.exp(2^-1022), case k < -1021', function () {
      var x = Math.pow(2, -1022)
      var y = Math.exp(x)
      assert.equal(y, 1)
    })

    it('Math.exp(2^-1021), case k >= -1021', function () {
      var x = Math.pow(2, -1021)
      var y = Math.exp(x)
      assert.equal(y, 1)
    })

    it('Math.exp(7.09782712893383973096e+02), no overflow', function () {
      var y = Math.exp(7.09782712893383973096e+02)
      assert.equal(y, 1.7976931348622732e308)
    })

    it('Math.exp(709.7827128933841d0), overflows', function () {
      // This constant is 1 bit more tha o_threshold:
      var x = _ConstructDouble(0x40862E42, 1 + 0xFEFA39EF)
      var y = Math.exp(x)
      assert.equal(y, Infinity)
    })

    it('Math.exp(-7.45133219101941108420e+02), no underflow', function () {
      var x = -7.45133219101941108420e+02
      var y = Math.exp(x)
      assert.equal(y, 4.9406564584124654e-324)
    })

    it('Math.exp(-745.1332191019412), underflows', function () {
      var x = _ConstructDouble(0xc0874910, 0xD52D3051 + 1)
      var y = Math.exp(x)
      assert.equal(y, 0)
    })

    it('Math.exp(1000) = Infinity, overflow case', function () {
      var y = Math.exp(1000)
      assert.equal(y, Infinity)
    })

    it('Math.exp(-1000) = 0, underflow case', function () {
      var y = Math.exp(-1000)
      assert.equal(y, 0)
    })
  })

  describe('Test that Math.exp(x) is still monotonic near x = 1', function () {
    // Our implementation of Math.exp(x) added a special case for x = 1 so
    // that Math.exp(1) = Math.E. Without that, Math.exp(1) was different from
    // Math.E, which is bad.
    //
    // The following tests verify that Math.exp(x) is still monotonic at x
    // = 1. This is a very important to maintain in floating point.
    it('Math.exp(1) = Math.E', function () {
      var y = Math.exp(1)
      assert.equal(y, Math.E)
    })

    it('Math.exp(1-negeps) <= Math.E', function () {
      // negeps is the smallest value for x such that 1 - x differs from 1.
      var negeps = _ConstructDouble(0x3c900000, 1)
      var y = Math.exp(1 - negeps)
      assert(y <= Math.E)
    })

    it('Math.E <= Math.exp(1+eps)', function () {
      // eps is the smallest value for x such that 1 + x differs from 1.
      var eps = _ConstructDouble(0x3CA00000, 1)
      var y = Math.exp(1 + eps)
      assert(Math.E <= y)
    })
  })
})
