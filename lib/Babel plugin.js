'use strict'

module.exports = function (babel) {
  var t

  t = babel.types

  return {
    visitor: {
      // Replace:
      //   for (LeftHandSideExpression in Expression)
      // with:
      //   for (var _index = 0; _index < _keys.length; _index++)
      ForInStatement: function (path) {
        var node, scope, index, keys, indexDeclaration, declarations, left, body

        node = path.node
        scope = path.scope
        index = scope.generateUidIdentifier('index')
        keys = scope.generateUidIdentifier('keys')
        indexDeclaration = t.variableDeclarator(index, t.numericLiteral(0))

        // Handle: for ( var VariableDeclarationNoIn in Expression )
        if (node.left.type === 'VariableDeclaration') {
          declarations = node.left.declarations.concat(indexDeclaration)
          left = node.left.declarations[0].id
        } else {
          declarations = [indexDeclaration]
          left = node.left
        }

        // If the for-in body isn't a block statement then make it one so that
        // we can add an additional statement to it.
        body = node.body.type === 'BlockStatement'
          ? node.body
          : t.blockStatement([node.body])

        path.replaceWith(t.callExpression(
          t.functionExpression(null, [keys],
            t.blockStatement([
              t.forStatement(
                t.variableDeclaration('var', declarations),
                t.binaryExpression(
                  '<',
                  index,
                  t.memberExpression(keys, t.identifier('length'))
                ),
                t.updateExpression('++', index),
                body
              )
            ])
          ),
          [t.callExpression(
            t.memberExpression(t.identifier('Object'), t.identifier('keys')),
            [node.right]
          )]
        ))

        // Add 'property = _keys[_index];' as the first statement in the 'for'
        // body.
        body.body.unshift(t.expressionStatement(
          t.assignmentExpression(
            '=',
            left,
            t.memberExpression(keys, index, true))
        ))
      }
    }
  }
}
