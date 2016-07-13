'use strict'

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var callee

      callee = node.callee

      if (callee.type === 'MemberExpression' &&
        callee.object.name === 'Math' &&
        callee.property.name === 'atan2') {
        context.report({
          node: node,
          message: 'Math.atan2() is not yet deterministic.'
        })
      }
    }
  }
}
