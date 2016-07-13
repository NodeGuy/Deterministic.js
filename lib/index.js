'use strict'

var babel = require('babel-core')
var fs = require('fs')
var glob = require('glob')
var ESLint = require('eslint')
var path = require('path')
var UglifyJS = require('uglify-js')
var _ = require('lodash')

var rulePath
var ruleNames
var lint

rulePath = path.join(__dirname, '/ESLint rules')

ruleNames = fs.readdirSync(rulePath).map(
  _.unary(_.curryRight(path.basename)('.js'))
)

lint = new ESLint.CLIEngine({
  useEslintrc: false,
  rulePaths: [rulePath],

  // Treat all rules as warnings.
  rules: _.zipObject(ruleNames, ruleNames.map(_.constant(1)))
})

exports.compile = function (source) {
  var header, transformed

  // Create a minified header with some standard library functions
  // re-implemented.
  header = UglifyJS.minify(glob.sync(path.join(__dirname, '/overrides/*'))).code

  // Transform the source code.
  transformed = babel.transform(
    source,
    {plugins: [path.join(__dirname, '/Babel plugin')]}
  ).code

  // Return the header combined with the transformed code.
  return {
    warnings: lint.executeOnText(source).results[0].messages,
    code: header + transformed
  }
}
