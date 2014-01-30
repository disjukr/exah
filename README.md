exah
===
simple irc bot that execute haxe snippet.

Prerequisite: node.js

How to run it
---
```sh
npm install .
node exah.js
```
modify `config.cson` to set the server, nick, etc...

Run haxe code on irc
---
```irc
<me> exah, trace("Hello, World!");
<exah> Exah.hx:3: Hello, World!
```
