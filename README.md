# lua-console-syntax-highlighter [![NPM monthly downloads](https://img.shields.io/npm/dm/lua-console-syntax-highlighter.svg?style=flat)](https://npmjs.org/package/lua-console-syntax-highlighter) [![NPM total downloads](https://img.shields.io/npm/dt/lua-console-syntax-highlighter.svg?style=flat)](https://npmjs.org/package/lua-console-syntax-highlighter)

> Console syntax highlighter for Lua 5.1 and Luau.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install lua-console-syntax-highlighter
```

## Usage

```js
const{highlight}=require('./main');
// You don't have to read a file, you can also just
const inp=require('fs').readFileSync('input.lua','ascii');

console.log(highlight(inp,'onedarkpro'));
console.log(highlight(inp,'monokaipro'));
```

![image](https://user-images.githubusercontent.com/46553887/226221541-4d993c41-7e2c-4fb4-b62a-e834dcfa8fee.png)

## Themes
* onedarkpro
* monokaipro
