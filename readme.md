# Javascript Readable SetTimeout

Create setTimeouts using readable timeout strings.

### Example

Imagine we could declare timeouts like this

```javascript
setTimeout(() => false, "next 10 seconds");
// or
setTimeout(() => false, "30 seconds from now");
//
setTimeout(() => false, "in 1 hour 30 minutes from now");
```

Well, thanks to [chrono-node](https://npmjs.org/package/chrono-node) and some **magic lines of voodoo** this package is
able to achieve that but of course not with same default `setTimeout` function.

## Installation

```shell
npm i readable-timeout
# OR
yarn add readable-timeout
```

## Usage

```javascript
const Timeout = require('readable-timeout');

Timeout.define(() => false, "next 30 seconds");
// is equivalent to
Timeout.run(() => false, "next 30 seconds"); // allias of define
// is equivalent to
setTimeout(() => false, 30000) //
// is equivalent to
Timeout.run(() => false, 30000) 
// milliseconds can also be used but defeats the purpose of this pacakge
```

Notes:

- All setTimeouts returns the timeout as the default `setTimeout` would.

### .in

The `.in` method gives you the freedom of declaring timeouts first if you find it easier to read.

```javascript
const Timeout = require('readable-timeout');

Timeout.in("30 seconds", () => false);
```

## Utils

The class also includes functions that converts strings to milliseconds

### .ms

This function converts a string to milliseconds or throws an error if it can't.

```javascript
const Timeout = require('readable-timeout');

Timeout.ms("next 5 seconds"); // 5000±1000
```

### .msIn

Same as `ms` but used in `.in`, Adds `from now` to the end of your text. This is because `chrono-node` needs it to
understand simple non-sentence strings like "30 seconds"

```javascript
const Timeout = require('readable-timeout');

Timeout.msIn("5 seconds"); // 5000±1000
// is transformed to
Timeout.ms("5 seconds from now");
```

## Performance

If you are **extremely** Performance conscious then you should use the `default` because it would take a **very tiny
millisecond** to understand your string and convert to milliseconds.


## Accuracy

Returned milliseconds is not exactly the number you are expecting, most times maybe ±1000ms. You can Run tests to see
what we mean. E.g

```javascript
const Timeout = require('readable-timeout');

// you would expect this to return 10000
Timeout.msIn("10 seconds");
// what maybe returned
// Between [9000-11000]
```

But this only means alot when you want the exact `second`

