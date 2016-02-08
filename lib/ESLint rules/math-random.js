'use strict';

module.exports = function (context) {
  return {
    'MemberExpression': function (node) {
      if ( node.object.name === 'Math'
        && node.property.name === 'random')
        context.report({
          node: node,
          message:
            "Math.random() always returns the same pseudo-random sequence."
        });
    }
  };
};
