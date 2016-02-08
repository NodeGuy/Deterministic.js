'use strict';

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var
        callee;

      callee = node.callee;

      if ( callee.type === 'MemberExpression'
        && callee.object.name === 'Math'
        && callee.property.name === 'asin')
        context.report({
          node: node,
          message: "Math.asin() is not yet deterministic."
        });
    }
  };
};
