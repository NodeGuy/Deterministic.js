'use strict';

module.exports = function (context) {
  return {
    'NewExpression': function (node) {
      if ( node.callee.name === 'Date'
        && node.arguments.length === 0)
        context.report({
          node: node,
          message: "new Date() always returns the epoch."
        });
    }
  };
};
