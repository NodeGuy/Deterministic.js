Math.exp = (function () {
  // fdlibm-util.js

  function _DoubleHi(f) {
    // Return the most significant 32 bits of a double float number.
    // This contains the sign, exponent, and 21 bits of the mantissa.
    var buf = new ArrayBuffer(8);
    (new Float64Array(buf))[0] = f;
    // Index 1 if the machine is little-endian.  Use index 0 for big-endian.
    var hi = (new Uint32Array(buf))[1];

    // Return as a signed integer
    return hi | 0;
  }

  function _DoubleLo(f) {
    // Return the least significant 32 bits of a double float number.
    // This contains the lower 32 bits of the mantissa.
    var buf = new ArrayBuffer(8);
    (new Float64Array(buf))[0] = f;
    // Index 1 if the machine is little-endian.  Use index 1 for big-endian.
    var lo = (new Uint32Array(buf))[0];

    return lo;
  }

  function _ConstructDouble(high, low)
  {
    var buf = new ArrayBuffer(8);
    // This following is for a little-endian machine.  For a
    // big-endian machine reverse the indices.
    (new Uint32Array(buf))[1] = high;
    (new Uint32Array(buf))[0] = low;
    return new Float64Array(buf)[0];
  }

  // exp.js

  //
  // ====================================================
  // Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
  //
  // Permission to use, copy, modify, and distribute this
  // software is freely granted, provided that this notice
  // is preserved.
  // ====================================================
  //

  // __ieee754_exp(x)
  // Returns the exponential of x.
  //
  // Method
  //   1. Argument reduction:
  //      Reduce x to an r so that |r| <= 0.5*ln2 ~ 0.34658.
  //      Given x, find r and integer k such that
  //
  //               x = k*ln2 + r,  |r| <= 0.5*ln2.
  //
  //      Here r will be represented as r = hi-lo for better
  //      accuracy.
  //
  //   2. Approximation of exp(r) by a special rational function on
  //      the interval [0,0.34658]:
  //      Write
  //          R(r**2) = r*(exp(r)+1)/(exp(r)-1) = 2 + r*r/6 - r**4/360 + ...
  //      We use a special Remes algorithm on [0,0.34658] to generate
  //      a polynomial of degree 5 to approximate R. The maximum error
  //      of this polynomial approximation is bounded by 2**-59. In
  //      other words,
  //          R(z) ~ 2.0 + P1*z + P2*z**2 + P3*z**3 + P4*z**4 + P5*z**5
  //      (where z=r*r, and the values of P1 to P5 are listed below)
  //      and
  //          |                  5          |     -59
  //          | 2.0+P1*z+...+P5*z   -  R(z) | <= 2
  //          |                             |
  //      The computation of exp(r) thus becomes
  //                             2*r
  //              exp(r) = 1 + -------
  //                            R - r
  //                                 r*R1(r)
  //                     = 1 + r + ----------- (for better accuracy)
  //                                2 - R1(r)
  //      where
  //                               2       4             10
  //              R1(r) = r - (P1*r  + P2*r  + ... + P5*r   ).
  //
  //   3. Scale back to obtain exp(x):
  //      From step 1, we have
  //         exp(x) = 2^k * exp(r)
  //
  // Special cases:
  //      exp(INF) is INF, exp(NaN) is NaN;
  //      exp(-INF) is 0, and
  //      for finite argument, only exp(0)=1 is exact.
  //
  // Accuracy:
  //      according to an error analysis, the error is always less than
  //      1 ulp (unit in the last place).
  //
  // Misc. info.
  //      For IEEE double
  //          if x >  7.09782712893383973096e+02 then exp(x) overflow
  //          if x < -7.45133219101941108420e+02 then exp(x) underflow
  //
  // Constants:
  // The hexadecimal values are the intended ones for the following
  // constants. The decimal values may be used, provided that the
  // compiler will convert from decimal to binary accurately enough
  // to produce the hexadecimal values shown.
  //

  var half = [0.5, -0.5];
  var twom1000= 9.33263618503218878990e-302;      // 2**-1000=0x01700000,0
  var o_threshold=  7.09782712893383973096e+02;   //  0x40862E42, 0xFEFA39EF
  var u_threshold= -7.45133219101941108420e+02;   //  0xc0874910, 0xD52D3051
  var ln2hi   =[ 6.93147180369123816490e-01,      //  0x3fe62e42, 0xfee00000
                    -6.93147180369123816490e-01]; //  0xbfe62e42, 0xfee00000
  var ln2lo   =[ 1.90821492927058770002e-10,      //  0x3dea39ef, 0x35793c76
                    -1.90821492927058770002e-10]; //  0xbdea39ef, 0x35793c76
  var invln2 =  1.44269504088896338700e+00;       //  0x3ff71547, 0x652b82fe
  var P1   =  1.66666666666666019037e-01;         //  0x3FC55555, 0x5555553E
  var P2   = -2.77777777770155933842e-03;         //  0xBF66C16C, 0x16BEBD93
  var P3   =  6.61375632143793436117e-05;         //  0x3F11566A, 0xAF25DE2C
  var P4   = -1.65339022054652515390e-06;         //  0xBEBBBD41, 0xC5D26BF1
  var P5   =  4.13813679705723846039e-08;         //  0x3E663769, 0x72BEA4D0

  return function (x) {
    var t;
    var k = 0;
    var hi = 0;
    var lo = 0;

    var hx = _DoubleHi(x);
    var xsb = (hx >> 31) & 1;   // sign bit of x
    hx &= 0x7fffffff;           // High word of |x|

    // Filter out non-finite argument
    if (hx >= 0x40862e42) {
      // \x| >= 709.78...
      if (hx >= 0x7ff00000) {
        if (isNaN(x)) {
          // exp(NaN) = NaN. (Should we create a new NaN?)
          return x;
        }
        // exp(-inf) = 0, exp(inf) = inf
        return (xsb == 0) ? x : 0;
      }
      // x > threshold so overflow to infinity
      if (x > o_threshold)
        return Infinity;
      // x < threshold so underflow to 0.
      if (x < u_threshold) {
        return 0;
      }
    }

    // Argument reduction
    if (hx > 0x3fd62e42) {
      // |x| > 0.5 ln2
      if (hx < 0x3ff0a2b2) {
        // New case not in fdlibm. Check for x = 1 and return
        // Math.E There should be tests that exp(x) is still
        // monotonic with this change!
        if (x == 1) {
          return Math.E;
        }
        // |x| < 1.5*ln2
        hi = x - ln2hi[xsb];
        lo = ln2lo[xsb];
        k = 1 - xsb - xsb;
      } else {
        k = (invln2 * x + half[xsb]) | 0;
        //console.log("x > 1.5*ln2, k = " + k);
        t = k;
        // t*ln2hi is exact here
        hi = x - t * ln2hi[0];
        lo = t * ln2lo[0];
      }
      x = hi - lo;
    } else if (hx < 0x3e300000) {
      // |x| < 2^-28
      return 1 + x;
    } else {
      k = 0;
    }

    // x is now in primary range
    t = x * x;
    var c = x - t*(P1+t*(P2+t*(P3+t*(P4+t*P5))));

    //console.log("exp(" + x + "), k = " + k);
    //console.log("c = " + c);
    if (k == 0) {
      return 1 - ((x*c)/(c - 2) - x);
    }
    var y = 1 - ((lo-(x*c)/(2.0-c))-hi);

    //console.log("y = " + y);
    if (k >= -1021) {
      // add k to y's exponent
      y = _ConstructDouble((k << 20) + _DoubleHi(y), _DoubleLo(y));
      return y;
    } else {
      // add k to y's exponent
      y = _ConstructDouble(((k + 1000) << 20) + _DoubleHi(y), _DoubleLo(y));
      //console.log("new y = " + y);
      //console.log(" y parts = " + _DoubleHi(y) + ", " + _DoubleLo(y));
      y = y * twom1000;
      //console.log("scaled y = " + y);
      //console.log(" y parts = " + _DoubleHi(y) + ", " + _DoubleLo(y));

      return y;
    }
  };
})();
