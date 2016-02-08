'use strict';

var
  babel = require('babel-core'),
  fs = require('fs'),
  glob = require('glob'),
  ESLint = require('eslint'),
  path = require('path'),
  UglifyJS = require('uglify-js'),
  _ = require('lodash'),

  rulePath, ruleNames, lint;

rulePath = __dirname + '/ESLint rules';

ruleNames = fs.readdirSync(rulePath).map(
  _.unary(_.curryRight(path.basename)('.js'))
);

lint = new ESLint.CLIEngine({
  useEslintrc: false,
  rulePaths: [rulePath],

  // Treat all rules as warnings.
  rules: _.zipObject(ruleNames, ruleNames.map(_.constant(1)))
});

exports.compile = function (source) {
  var
    header, transformed;

  // Create a minified header with some standard library functions
  // re-implemented.
  header = UglifyJS.minify(glob.sync(__dirname + '/overrides/*')).code;

  // Transform the source code.
  transformed = babel.transform(
    source,
    {plugins: [__dirname + '/Babel plugin']}
  ).code;

  // Return the header combined with the transformed code.
  return {
    warnings: lint.executeOnText(source).results[0].messages,
    code: header + transformed
  };
};
