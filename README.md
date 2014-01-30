exah
===
simple irc bot that execute Haxe snippet.

it doesn't consider any security issues.
please do not abuse it :)

Prerequisite: Haxe (with NekoVM), node.js

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
<you> exah, trace("Hello, World!");
<exah> Exah.hx:3: Hello, World!
```

Hacks exaH
---
print without debug info:
```irc
<you> exah, neko.Lib.print("Haxe, World!");
<exah> Haxe, World!
```

define a class:
```irc
<you> exah, new A();}} class A { public function new() { neko.Lib.print('$A');
<exah> { __name__ => [A], __construct__ => #function:0, prototype => { __class__ => { __name__ => [A], __construct__ => #function:0, prototype => { __class__ => { __name__ => [A], __construct__ => #function:0, prototype => { __class__ => <...>, __serialize => <...> }, __ct__ => #abstract, new => #function:0 }, __serialize => #function:0 }, __ct__ => #abstract, new => #function:0 }, __serialize => #function:0 }, __ct__ => #abstract, new => #function:0 }
```
