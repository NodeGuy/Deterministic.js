# eslint-plugin-deterministic

allow only deterministic JavaScript

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-deterministic`:

```
$ npm install eslint-plugin-deterministic --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-deterministic` globally.

## Usage

Add `deterministic` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "deterministic"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "deterministic/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
