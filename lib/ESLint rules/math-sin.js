'use strict'

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var callee

      callee = node.callee

      if (callee.type === 'MemberExpression' &&
        callee.object.name === 'Math' &&
        callee.property.name === 'sin') {
        context.report({
          node: node,
          message: 'Math.sin() is not yet deterministic.'
        })
      }
    }
  }
}
