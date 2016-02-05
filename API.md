---
layout: page
title: API
---
## compile(_source_)

`source`: a string containing the source code to compile

### Returns

~~~ javascript
{
  warnings: [{
  	message: <string>
  	source: <string>
  }*],
  code: <string>
}
~~~

* `warnings` is an array of zero or more compiler warnings:
  * `message` is the text of the warning
  * `source` is an excerpt of the source code which triggered the warning
* `code` is the compiled code which can be evaluated like normal JavaScript
