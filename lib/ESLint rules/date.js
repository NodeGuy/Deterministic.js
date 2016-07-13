'use strict'

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      if (node.callee.name === 'Date') {
        context.report({
          node: node,

          message: 'When Date() is called as a function it always returns the epoch.'
        })
      }
    }
  }
}
