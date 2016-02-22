/*
https://github.com/nquinlan/better-random-numbers-for-javascript-mirror#alea

Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// Alea
Math.random = (function () {
  var
    stored, state;

  try {
    stored = localStorage.getItem('Math.random');
  }
  catch (exception) {
    stored = null;
  }

  state = stored === null
    ? {
      s0: 0.8725217853207141,
      s1: 0.520505596883595,
      s2: 0.22893249243497849,
      c: 1
    }
    : JSON.parse(stored);

  return function () {
    var
      t = 2091639 * state.s0 + state.c * 2.3283064365386963e-10; // 2^-32

    state.s0 = state.s1;
    state.s1 = state.s2;
    state.c = t | 0;
    state.s2 = t - state.c;

    try {
      localStorage.setItem('Math.random', JSON.stringify(state));
    }
    catch (exception) {
      // Do nothing.
    }

    return state.s2;
  };
})();
