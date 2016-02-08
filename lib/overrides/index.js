'use strict';

Object.keys = (function (unsortedKeys) {
  return function (object) {
    var
      keys;

    keys = unsortedKeys(object);
    keys.sort();
    return keys;
  };
})(Object.keys);
