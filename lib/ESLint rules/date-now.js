'use strict'

module.exports = function (context) {
  return {
    'CallExpression': function (node) {
      var callee

      callee = node.callee

      if (callee.type === 'MemberExpression' &&
        callee.object.name === 'Date' &&
        callee.property.name === 'now') {
        context.report({
          node: node,
          message: 'Date.now() always returns 0.'
        })
      }
    }
  }
}
