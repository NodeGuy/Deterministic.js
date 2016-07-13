'use strict'

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var callee

      callee = node.callee

      if (callee.type === 'MemberExpression' &&
        callee.object.name === 'Math' &&
        callee.property.name === 'tan') {
        context.report({
          node: node,
          message: 'Math.tan() is not yet deterministic.'
        })
      }
    }
  }
}
