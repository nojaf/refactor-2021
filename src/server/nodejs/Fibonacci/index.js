var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// Prime/Index.fs.js
__markAsModule(exports);
__export(exports, {
  default: () => Index_fs_default
});

// Prime/.fable/fable-library.3.1.5/Int32.js
var NumberStyles;
(function(NumberStyles2) {
  NumberStyles2[NumberStyles2["AllowHexSpecifier"] = 512] = "AllowHexSpecifier";
})(NumberStyles || (NumberStyles = {}));

// Prime/.fable/fable-library.3.1.5/Numeric.js
var symbol = Symbol("numeric");
function isNumeric(x) {
  return typeof x === "number" || (x === null || x === void 0 ? void 0 : x[symbol]);
}
function compare(x, y) {
  if (typeof x === "number") {
    return x < y ? -1 : x > y ? 1 : 0;
  } else {
    return x.CompareTo(y);
  }
}
function multiply(x, y) {
  if (typeof x === "number") {
    return x * y;
  } else {
    return x[symbol]().multiply(y);
  }
}
function toFixed(x, dp) {
  if (typeof x === "number") {
    return x.toFixed(dp);
  } else {
    return x[symbol]().toFixed(dp);
  }
}
function toPrecision(x, sd) {
  if (typeof x === "number") {
    return x.toPrecision(sd);
  } else {
    return x[symbol]().toPrecision(sd);
  }
}
function toExponential(x, dp) {
  if (typeof x === "number") {
    return x.toExponential(dp);
  } else {
    return x[symbol]().toExponential(dp);
  }
}
function toHex(x) {
  if (typeof x === "number") {
    return (Number(x) >>> 0).toString(16);
  } else {
    return x[symbol]().toHex();
  }
}

// Prime/.fable/fable-library.3.1.5/lib/long.js
var wasm = null;
try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    13,
    2,
    96,
    0,
    1,
    127,
    96,
    4,
    127,
    127,
    127,
    127,
    1,
    127,
    3,
    7,
    6,
    0,
    1,
    1,
    1,
    1,
    1,
    6,
    6,
    1,
    127,
    1,
    65,
    0,
    11,
    7,
    50,
    6,
    3,
    109,
    117,
    108,
    0,
    1,
    5,
    100,
    105,
    118,
    95,
    115,
    0,
    2,
    5,
    100,
    105,
    118,
    95,
    117,
    0,
    3,
    5,
    114,
    101,
    109,
    95,
    115,
    0,
    4,
    5,
    114,
    101,
    109,
    95,
    117,
    0,
    5,
    8,
    103,
    101,
    116,
    95,
    104,
    105,
    103,
    104,
    0,
    0,
    10,
    191,
    1,
    6,
    4,
    0,
    35,
    0,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    126,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    127,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    128,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    129,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11,
    36,
    1,
    1,
    126,
    32,
    0,
    173,
    32,
    1,
    173,
    66,
    32,
    134,
    132,
    32,
    2,
    173,
    32,
    3,
    173,
    66,
    32,
    134,
    132,
    130,
    34,
    4,
    66,
    32,
    135,
    167,
    36,
    0,
    32,
    4,
    167,
    11
  ])), {}).exports;
} catch (e) {
}
function Long(low, high, unsigned) {
  this.low = low | 0;
  this.high = high | 0;
  this.unsigned = !!unsigned;
}
Long.prototype.GetHashCode = function() {
  let h1 = this.unsigned ? 1 : 0;
  h1 = (h1 << 5) + h1 ^ this.high;
  h1 = (h1 << 5) + h1 ^ this.low;
  return h1;
};
Long.prototype.Equals = function(x) {
  return equals(this, x);
};
Long.prototype.CompareTo = function(x) {
  return compare2(this, x);
};
Long.prototype.toString = function(radix) {
  return toString(this, radix);
};
Long.prototype.toJSON = function() {
  return toString(this);
};
Long.prototype[symbol] = function() {
  const x = this;
  return {
    multiply: (y) => multiply2(x, y),
    toPrecision: (sd) => String(x) + 0 .toPrecision(sd).substr(1),
    toExponential: (dp) => String(x) + 0 .toExponential(dp).substr(1),
    toFixed: (dp) => String(x) + 0 .toFixed(dp).substr(1),
    toHex: () => toString(x.unsigned ? x : fromBytes(toBytes(x), true), 16)
  };
};
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", {value: true});
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value >>>= 0;
    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
    if (cache)
      UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;
    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache)
      INT_CACHE[value] = obj;
    return obj;
  }
}
function fromNumber(value, unsigned) {
  if (isNaN(value))
    return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0)
      return UZERO;
    if (value >= TWO_PWR_64_DBL)
      return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL)
      return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL)
      return MAX_VALUE;
  }
  if (value < 0)
    return negate(fromNumber(-value, unsigned));
  return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}
function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}
var pow_dbl = Math.pow;
function fromString(str, unsigned, radix) {
  if (str.length === 0)
    throw Error("empty string");
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
    return ZERO;
  if (typeof unsigned === "number") {
    radix = unsigned, unsigned = false;
  } else {
    unsigned = !!unsigned;
  }
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  var p = str.indexOf("-");
  if (p > 0)
    throw Error("interior hyphen");
  else if (p === 0) {
    return negate(fromString(str.substring(1), unsigned, radix));
  }
  var radixToPower = fromNumber(pow_dbl(radix, 8));
  var result = ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = add(multiply2(result, power), fromNumber(value));
    } else {
      result = multiply2(result, radixToPower);
      result = add(result, fromNumber(value));
    }
  }
  result.unsigned = unsigned;
  return result;
}
function fromValue(val, unsigned) {
  if (typeof val === "number")
    return fromNumber(val, unsigned);
  if (typeof val === "string")
    return fromString(val, unsigned);
  return fromBits(val.low, val.high, typeof unsigned === "boolean" ? unsigned : val.unsigned);
}
var TWO_PWR_16_DBL = 1 << 16;
var TWO_PWR_24_DBL = 1 << 24;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);
var ZERO = fromInt(0);
var UZERO = fromInt(0, true);
var ONE = fromInt(1);
var UONE = fromInt(1, true);
var NEG_ONE = fromInt(-1);
var MAX_VALUE = fromBits(4294967295 | 0, 2147483647 | 0, false);
var MAX_UNSIGNED_VALUE = fromBits(4294967295 | 0, 4294967295 | 0, true);
var MIN_VALUE = fromBits(0, 2147483648 | 0, false);
function toInt($this) {
  return $this.unsigned ? $this.low >>> 0 : $this.low;
}
function toNumber($this) {
  if ($this.unsigned)
    return ($this.high >>> 0) * TWO_PWR_32_DBL + ($this.low >>> 0);
  return $this.high * TWO_PWR_32_DBL + ($this.low >>> 0);
}
function toString($this, radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  if (isZero($this))
    return "0";
  if (isNegative($this)) {
    if (equals($this, MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = divide($this, radixLong), rem1 = subtract(multiply2(div, radixLong), $this);
      return toString(div, radix) + toInt(rem1).toString(radix);
    } else
      return "-" + toString(negate($this), radix);
  }
  var radixToPower = fromNumber(pow_dbl(radix, 6), $this.unsigned), rem = $this;
  var result = "";
  while (true) {
    var remDiv = divide(rem, radixToPower), intval = toInt(subtract(rem, multiply2(remDiv, radixToPower))) >>> 0, digits = intval.toString(radix);
    rem = remDiv;
    if (isZero(rem))
      return digits + result;
    else {
      while (digits.length < 6)
        digits = "0" + digits;
      result = "" + digits + result;
    }
  }
}
function isZero($this) {
  return $this.high === 0 && $this.low === 0;
}
function isNegative($this) {
  return !$this.unsigned && $this.high < 0;
}
function isOdd($this) {
  return ($this.low & 1) === 1;
}
function equals($this, other) {
  if (!isLong(other))
    other = fromValue(other);
  if ($this.unsigned !== other.unsigned && $this.high >>> 31 === 1 && other.high >>> 31 === 1)
    return false;
  return $this.high === other.high && $this.low === other.low;
}
function lessThan($this, other) {
  return compare2($this, other) < 0;
}
function greaterThan($this, other) {
  return compare2($this, other) > 0;
}
function greaterThanOrEqual($this, other) {
  return compare2($this, other) >= 0;
}
function compare2($this, other) {
  if (!isLong(other))
    other = fromValue(other);
  if (equals($this, other))
    return 0;
  var thisNeg = isNegative($this), otherNeg = isNegative(other);
  if (thisNeg && !otherNeg)
    return -1;
  if (!thisNeg && otherNeg)
    return 1;
  if (!$this.unsigned)
    return isNegative(subtract($this, other)) ? -1 : 1;
  return other.high >>> 0 > $this.high >>> 0 || other.high === $this.high && other.low >>> 0 > $this.low >>> 0 ? -1 : 1;
}
function negate($this) {
  if (!$this.unsigned && equals($this, MIN_VALUE))
    return MIN_VALUE;
  return add(not($this), ONE);
}
function add($this, addend) {
  if (!isLong(addend))
    addend = fromValue(addend);
  var a48 = $this.high >>> 16;
  var a32 = $this.high & 65535;
  var a16 = $this.low >>> 16;
  var a00 = $this.low & 65535;
  var b48 = addend.high >>> 16;
  var b32 = addend.high & 65535;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 + b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, $this.unsigned);
}
function subtract($this, subtrahend) {
  if (!isLong(subtrahend))
    subtrahend = fromValue(subtrahend);
  return add($this, negate(subtrahend));
}
function multiply2($this, multiplier) {
  if (isZero($this))
    return $this.unsigned ? UZERO : ZERO;
  if (!isLong(multiplier))
    multiplier = fromValue(multiplier);
  if (wasm) {
    var low = wasm.mul($this.low, $this.high, multiplier.low, multiplier.high);
    return fromBits(low, wasm.get_high(), $this.unsigned);
  }
  if (isZero(multiplier))
    return $this.unsigned ? UZERO : ZERO;
  if (equals($this, MIN_VALUE))
    return isOdd(multiplier) ? MIN_VALUE : ZERO;
  if (equals(multiplier, MIN_VALUE))
    return isOdd($this) ? MIN_VALUE : ZERO;
  if (isNegative($this)) {
    if (isNegative(multiplier))
      return multiply2(negate($this), negate(multiplier));
    else
      return negate(multiply2(negate($this), multiplier));
  } else if (isNegative(multiplier))
    return negate(multiply2($this, negate(multiplier)));
  if (lessThan($this, TWO_PWR_24) && lessThan(multiplier, TWO_PWR_24))
    return fromNumber(toNumber($this) * toNumber(multiplier), $this.unsigned);
  var a48 = $this.high >>> 16;
  var a32 = $this.high & 65535;
  var a16 = $this.low >>> 16;
  var a00 = $this.low & 65535;
  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 65535;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 65535;
  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 65535;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 65535;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 65535;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 65535;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, $this.unsigned);
}
function divide($this, divisor) {
  if (!isLong(divisor))
    divisor = fromValue(divisor);
  if (isZero(divisor))
    throw Error("division by zero");
  if (wasm) {
    if (!$this.unsigned && $this.high === -2147483648 && divisor.low === -1 && divisor.high === -1) {
      return $this;
    }
    var low = ($this.unsigned ? wasm.div_u : wasm.div_s)($this.low, $this.high, divisor.low, divisor.high);
    return fromBits(low, wasm.get_high(), $this.unsigned);
  }
  if (isZero($this))
    return $this.unsigned ? UZERO : ZERO;
  var approx, rem, res;
  if (!$this.unsigned) {
    if (equals($this, MIN_VALUE)) {
      if (equals(divisor, ONE) || equals(divisor, NEG_ONE))
        return MIN_VALUE;
      else if (equals(divisor, MIN_VALUE))
        return ONE;
      else {
        var halfThis = shiftRight($this, 1);
        approx = shiftLeft(divide(halfThis, divisor), 1);
        if (equals(approx, ZERO)) {
          return isNegative(divisor) ? ONE : NEG_ONE;
        } else {
          rem = subtract($this, multiply2(divisor, approx));
          res = add(approx, divide(rem, divisor));
          return res;
        }
      }
    } else if (equals(divisor, MIN_VALUE))
      return $this.unsigned ? UZERO : ZERO;
    if (isNegative($this)) {
      if (isNegative(divisor))
        return divide(negate($this), negate(divisor));
      return negate(divide(negate($this), divisor));
    } else if (isNegative(divisor))
      return negate(divide($this, negate(divisor)));
    res = ZERO;
  } else {
    if (!divisor.unsigned)
      divisor = toUnsigned(divisor);
    if (greaterThan(divisor, $this))
      return UZERO;
    if (greaterThan(divisor, shiftRightUnsigned($this, 1)))
      return UONE;
    res = UZERO;
  }
  rem = $this;
  while (greaterThanOrEqual(rem, divisor)) {
    approx = Math.max(1, Math.floor(toNumber(rem) / toNumber(divisor)));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = multiply2(approxRes, divisor);
    while (isNegative(approxRem) || greaterThan(approxRem, rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, $this.unsigned);
      approxRem = multiply2(approxRes, divisor);
    }
    if (isZero(approxRes))
      approxRes = ONE;
    res = add(res, approxRes);
    rem = subtract(rem, approxRem);
  }
  return res;
}
function not($this) {
  return fromBits(~$this.low, ~$this.high, $this.unsigned);
}
function shiftLeft($this, numBits) {
  if (isLong(numBits))
    numBits = toInt(numBits);
  if ((numBits &= 63) === 0)
    return $this;
  else if (numBits < 32)
    return fromBits($this.low << numBits, $this.high << numBits | $this.low >>> 32 - numBits, $this.unsigned);
  else
    return fromBits(0, $this.low << numBits - 32, $this.unsigned);
}
function shiftRight($this, numBits) {
  if (isLong(numBits))
    numBits = toInt(numBits);
  if ((numBits &= 63) === 0)
    return $this;
  else if (numBits < 32)
    return fromBits($this.low >>> numBits | $this.high << 32 - numBits, $this.high >> numBits, $this.unsigned);
  else
    return fromBits($this.high >> numBits - 32, $this.high >= 0 ? 0 : -1, $this.unsigned);
}
function shiftRightUnsigned($this, numBits) {
  if (isLong(numBits))
    numBits = toInt(numBits);
  numBits &= 63;
  if (numBits === 0)
    return $this;
  else {
    var high = $this.high;
    if (numBits < 32) {
      var low = $this.low;
      return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, $this.unsigned);
    } else if (numBits === 32)
      return fromBits(high, 0, $this.unsigned);
    else
      return fromBits(high >>> numBits - 32, 0, $this.unsigned);
  }
}
function toUnsigned($this) {
  if ($this.unsigned)
    return $this;
  return fromBits($this.low, $this.high, true);
}
function toBytes($this, le) {
  return le ? toBytesLE($this) : toBytesBE($this);
}
function toBytesLE($this) {
  var hi = $this.high, lo = $this.low;
  return [
    lo & 255,
    lo >>> 8 & 255,
    lo >>> 16 & 255,
    lo >>> 24,
    hi & 255,
    hi >>> 8 & 255,
    hi >>> 16 & 255,
    hi >>> 24
  ];
}
function toBytesBE($this) {
  var hi = $this.high, lo = $this.low;
  return [
    hi >>> 24,
    hi >>> 16 & 255,
    hi >>> 8 & 255,
    hi & 255,
    lo >>> 24,
    lo >>> 16 & 255,
    lo >>> 8 & 255,
    lo & 255
  ];
}
function fromBytes(bytes, unsigned, le) {
  return le ? fromBytesLE(bytes, unsigned) : fromBytesBE(bytes, unsigned);
}
function fromBytesLE(bytes, unsigned) {
  return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
}
function fromBytesBE(bytes, unsigned) {
  return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
}

// Prime/.fable/fable-library.3.1.5/Util.js
function isArrayLike(x) {
  return Array.isArray(x) || ArrayBuffer.isView(x);
}
function isComparable(x) {
  return typeof x.CompareTo === "function";
}
function isHashable(x) {
  return typeof x.GetHashCode === "function";
}
function padWithZeros(i, length) {
  let str = i.toString(10);
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}
function dateOffset(date) {
  const date1 = date;
  return typeof date1.offset === "number" ? date1.offset : date.kind === 1 ? 0 : date.getTimezoneOffset() * -6e4;
}
var ObjectRef = class {
  static id(o) {
    if (!ObjectRef.idMap.has(o)) {
      ObjectRef.idMap.set(o, ++ObjectRef.count);
    }
    return ObjectRef.idMap.get(o);
  }
};
ObjectRef.idMap = new WeakMap();
ObjectRef.count = 0;
function stringHash(s) {
  let i = 0;
  let h = 5381;
  const len = s.length;
  while (i < len) {
    h = h * 33 ^ s.charCodeAt(i++);
  }
  return h;
}
function numberHash(x) {
  return x * 2654435761 | 0;
}
function combineHashCodes(hashes) {
  if (hashes.length === 0) {
    return 0;
  }
  return hashes.reduce((h1, h2) => {
    return (h1 << 5) + h1 ^ h2;
  });
}
function dateHash(x) {
  return x.getTime();
}
function arrayHash(x) {
  const len = x.length;
  const hashes = new Array(len);
  for (let i = 0; i < len; i++) {
    hashes[i] = structuralHash(x[i]);
  }
  return combineHashCodes(hashes);
}
function structuralHash(x) {
  if (x == null) {
    return 0;
  }
  switch (typeof x) {
    case "boolean":
      return x ? 1 : 0;
    case "number":
      return numberHash(x);
    case "string":
      return stringHash(x);
    default: {
      if (isHashable(x)) {
        return x.GetHashCode();
      } else if (isArrayLike(x)) {
        return arrayHash(x);
      } else if (x instanceof Date) {
        return dateHash(x);
      } else if (Object.getPrototypeOf(x).constructor === Object) {
        const hashes = Object.values(x).map((v) => structuralHash(v));
        return combineHashCodes(hashes);
      } else {
        return numberHash(ObjectRef.id(x));
      }
    }
  }
}
function compareDates(x, y) {
  let xtime;
  let ytime;
  if ("offset" in x && "offset" in y) {
    xtime = x.getTime();
    ytime = y.getTime();
  } else {
    xtime = x.getTime() + dateOffset(x);
    ytime = y.getTime() + dateOffset(y);
  }
  return xtime === ytime ? 0 : xtime < ytime ? -1 : 1;
}
function compareArraysWith(x, y, comp) {
  if (x == null) {
    return y == null ? 0 : 1;
  }
  if (y == null) {
    return -1;
  }
  if (x.length !== y.length) {
    return x.length < y.length ? -1 : 1;
  }
  for (let i = 0, j = 0; i < x.length; i++) {
    j = comp(x[i], y[i]);
    if (j !== 0) {
      return j;
    }
  }
  return 0;
}
function compareArrays(x, y) {
  return compareArraysWith(x, y, compare3);
}
function compareObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return xKeys.length < yKeys.length ? -1 : 1;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0, j = 0; i < xKeys.length; i++) {
    const key = xKeys[i];
    if (key !== yKeys[i]) {
      return key < yKeys[i] ? -1 : 1;
    } else {
      j = compare3(x[key], y[key]);
      if (j !== 0) {
        return j;
      }
    }
  }
  return 0;
}
function compare3(x, y) {
  if (x === y) {
    return 0;
  } else if (x == null) {
    return y == null ? 0 : -1;
  } else if (y == null) {
    return 1;
  } else if (typeof x !== "object") {
    return x < y ? -1 : 1;
  } else if (isComparable(x)) {
    return x.CompareTo(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) ? compareArrays(x, y) : -1;
  } else if (x instanceof Date) {
    return y instanceof Date ? compareDates(x, y) : -1;
  } else {
    return Object.getPrototypeOf(x).constructor === Object ? compareObjects(x, y) : -1;
  }
}

// Prime/.fable/fable-library.3.1.5/Date.js
function dateOffsetToString(offset) {
  const isMinus = offset < 0;
  offset = Math.abs(offset);
  const hours = ~~(offset / 36e5);
  const minutes = offset % 36e5 / 6e4;
  return (isMinus ? "-" : "+") + padWithZeros(hours, 2) + ":" + padWithZeros(minutes, 2);
}
function dateToHalfUTCString(date, half) {
  const str = date.toISOString();
  return half === "first" ? str.substring(0, str.indexOf("T")) : str.substring(str.indexOf("T") + 1, str.length - 1);
}
function dateToISOString(d, utc) {
  if (utc) {
    return d.toISOString();
  } else {
    const printOffset = d.kind == null ? true : d.kind === 2;
    return padWithZeros(d.getFullYear(), 4) + "-" + padWithZeros(d.getMonth() + 1, 2) + "-" + padWithZeros(d.getDate(), 2) + "T" + padWithZeros(d.getHours(), 2) + ":" + padWithZeros(d.getMinutes(), 2) + ":" + padWithZeros(d.getSeconds(), 2) + "." + padWithZeros(d.getMilliseconds(), 3) + (printOffset ? dateOffsetToString(d.getTimezoneOffset() * -6e4) : "");
  }
}
function dateToISOStringWithOffset(dateWithOffset, offset) {
  const str = dateWithOffset.toISOString();
  return str.substring(0, str.length - 1) + dateOffsetToString(offset);
}
function dateToStringWithCustomFormat(date, format, utc) {
  return format.replace(/(\w)\1*/g, (match) => {
    let rep = Number.NaN;
    switch (match.substring(0, 1)) {
      case "y":
        const y = utc ? date.getUTCFullYear() : date.getFullYear();
        rep = match.length < 4 ? y % 100 : y;
        break;
      case "M":
        rep = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        break;
      case "d":
        rep = utc ? date.getUTCDate() : date.getDate();
        break;
      case "H":
        rep = utc ? date.getUTCHours() : date.getHours();
        break;
      case "h":
        const h = utc ? date.getUTCHours() : date.getHours();
        rep = h > 12 ? h % 12 : h;
        break;
      case "m":
        rep = utc ? date.getUTCMinutes() : date.getMinutes();
        break;
      case "s":
        rep = utc ? date.getUTCSeconds() : date.getSeconds();
        break;
      case "f":
        rep = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        break;
    }
    if (Number.isNaN(rep)) {
      return match;
    } else {
      return rep < 10 && match.length > 1 ? "0" + rep : "" + rep;
    }
  });
}
function dateToStringWithOffset(date, format) {
  var _a, _b, _c;
  const d = new Date(date.getTime() + ((_a = date.offset) !== null && _a !== void 0 ? _a : 0));
  if (typeof format !== "string") {
    return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + dateOffsetToString((_b = date.offset) !== null && _b !== void 0 ? _b : 0);
  } else if (format.length === 1) {
    switch (format) {
      case "D":
      case "d":
        return dateToHalfUTCString(d, "first");
      case "T":
      case "t":
        return dateToHalfUTCString(d, "second");
      case "O":
      case "o":
        return dateToISOStringWithOffset(d, (_c = date.offset) !== null && _c !== void 0 ? _c : 0);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(d, format, true);
  }
}
function dateToStringWithKind(date, format) {
  const utc = date.kind === 1;
  if (typeof format !== "string") {
    return utc ? date.toUTCString() : date.toLocaleString();
  } else if (format.length === 1) {
    switch (format) {
      case "D":
      case "d":
        return utc ? dateToHalfUTCString(date, "first") : date.toLocaleDateString();
      case "T":
      case "t":
        return utc ? dateToHalfUTCString(date, "second") : date.toLocaleTimeString();
      case "O":
      case "o":
        return dateToISOString(date, utc);
      default:
        throw new Error("Unrecognized Date print format");
    }
  } else {
    return dateToStringWithCustomFormat(date, format, utc);
  }
}
function toString2(date, format, _provider) {
  return date.offset != null ? dateToStringWithOffset(date, format) : dateToStringWithKind(date, format);
}

// Prime/.fable/fable-library.3.1.5/Types.js
function seqToString(self) {
  let count = 0;
  let str = "[";
  for (const x of self) {
    if (count === 0) {
      str += toString3(x);
    } else if (count === 100) {
      str += "; ...";
      break;
    } else {
      str += "; " + toString3(x);
    }
    count++;
  }
  return str + "]";
}
function toString3(x, callStack = 0) {
  if (x != null && typeof x === "object") {
    if (typeof x.toString === "function") {
      return x.toString();
    } else if (Symbol.iterator in x) {
      return seqToString(x);
    } else {
      const cons = Object.getPrototypeOf(x).constructor;
      return cons === Object && callStack < 10 ? "{ " + Object.entries(x).map(([k, v]) => k + " = " + toString3(v, callStack + 1)).join("\n  ") + " }" : cons.name;
    }
  }
  return String(x);
}
function compareList(self, other) {
  if (self === other) {
    return 0;
  } else {
    if (other == null) {
      return -1;
    }
    while (self.tail != null) {
      if (other.tail == null) {
        return 1;
      }
      const res = compare3(self.head, other.head);
      if (res !== 0) {
        return res;
      }
      self = self.tail;
      other = other.tail;
    }
    return other.tail == null ? 0 : -1;
  }
}
var List = class {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
  }
  [Symbol.iterator]() {
    let cur = this;
    return {
      next: () => {
        const value = cur === null || cur === void 0 ? void 0 : cur.head;
        const done = (cur === null || cur === void 0 ? void 0 : cur.tail) == null;
        cur = cur === null || cur === void 0 ? void 0 : cur.tail;
        return {done, value};
      }
    };
  }
  toJSON() {
    return Array.from(this);
  }
  toString() {
    return seqToString(this);
  }
  GetHashCode() {
    return combineHashCodes(Array.from(this).map(structuralHash));
  }
  Equals(other) {
    return compareList(this, other) === 0;
  }
  CompareTo(other) {
    return compareList(this, other);
  }
};
var FSharpRef = class {
  constructor(contentsOrGetter, setter) {
    if (typeof setter === "function") {
      this.getter = contentsOrGetter;
      this.setter = setter;
    } else {
      this.getter = () => contentsOrGetter;
      this.setter = (v) => {
        contentsOrGetter = v;
      };
    }
  }
  get contents() {
    return this.getter();
  }
  set contents(v) {
    this.setter(v);
  }
};

// Prime/.fable/fable-library.3.1.5/String.js
var fsFormatRegExp = /(^|[^%])%([0+\- ]*)(\*|\d+)?(?:\.(\d+))?(\w)/;
var interpolateRegExp = /(?:(^|[^%])%([0+\- ]*)(\d+)?(?:\.(\d+))?(\w))?%P\(\)/g;
function isLessThan(x, y) {
  return compare(x, y) < 0;
}
function printf(input) {
  return {
    input,
    cont: fsFormat(input)
  };
}
function interpolate(input, values) {
  let i = 0;
  return input.replace(interpolateRegExp, (_, prefix, flags, padLength, precision, format) => {
    return formatReplacement(values[i++], prefix, flags, padLength, precision, format);
  });
}
function continuePrint(cont, arg) {
  return typeof arg === "string" ? cont(arg) : arg.cont(cont);
}
function toConsole(arg) {
  return continuePrint((x) => console.log(x), arg);
}
function toText(arg) {
  return continuePrint((x) => x, arg);
}
function formatReplacement(rep, prefix, flags, padLength, precision, format) {
  let sign = "";
  flags = flags || "";
  format = format || "";
  if (isNumeric(rep)) {
    if (format.toLowerCase() !== "x") {
      if (isLessThan(rep, 0)) {
        rep = multiply(rep, -1);
        sign = "-";
      } else {
        if (flags.indexOf(" ") >= 0) {
          sign = " ";
        } else if (flags.indexOf("+") >= 0) {
          sign = "+";
        }
      }
    }
    precision = precision == null ? null : parseInt(precision, 10);
    switch (format) {
      case "f":
      case "F":
        precision = precision != null ? precision : 6;
        rep = toFixed(rep, precision);
        break;
      case "g":
      case "G":
        rep = precision != null ? toPrecision(rep, precision) : toPrecision(rep);
        break;
      case "e":
      case "E":
        rep = precision != null ? toExponential(rep, precision) : toExponential(rep);
        break;
      case "x":
        rep = toHex(rep);
        break;
      case "X":
        rep = toHex(rep).toUpperCase();
        break;
      default:
        rep = String(rep);
        break;
    }
  } else if (rep instanceof Date) {
    rep = toString2(rep);
  } else {
    rep = toString3(rep);
  }
  padLength = typeof padLength === "number" ? padLength : parseInt(padLength, 10);
  if (!isNaN(padLength)) {
    const zeroFlag = flags.indexOf("0") >= 0;
    const minusFlag = flags.indexOf("-") >= 0;
    const ch = minusFlag || !zeroFlag ? " " : "0";
    if (ch === "0") {
      rep = padLeft(rep, padLength - sign.length, ch, minusFlag);
      rep = sign + rep;
    } else {
      rep = padLeft(sign + rep, padLength, ch, minusFlag);
    }
  } else {
    rep = sign + rep;
  }
  return prefix ? prefix + rep : rep;
}
function formatOnce(str2, rep, padRef) {
  return str2.replace(fsFormatRegExp, (match, prefix, flags, padLength, precision, format) => {
    if (padRef.contents != null) {
      padLength = padRef.contents;
      padRef.contents = null;
    } else if (padLength === "*") {
      if (rep < 0) {
        throw new Error("Non-negative number required");
      }
      padRef.contents = rep;
      return match;
    }
    const once = formatReplacement(rep, prefix, flags, padLength, precision, format);
    return once.replace(/%/g, "%%");
  });
}
function createPrinter(str, cont, padRef = new FSharpRef(null)) {
  return (...args) => {
    let strCopy = str;
    for (const arg of args) {
      strCopy = formatOnce(strCopy, arg, padRef);
    }
    return fsFormatRegExp.test(strCopy) ? createPrinter(strCopy, cont, padRef) : cont(strCopy.replace(/%%/g, "%"));
  };
}
function fsFormat(str) {
  return (cont) => {
    return fsFormatRegExp.test(str) ? createPrinter(str, cont) : cont(str);
  };
}
function padLeft(str, len, ch, isRight) {
  ch = ch || " ";
  len = len - str.length;
  for (let i = 0; i < len; i++) {
    str = isRight ? str + ch : ch + str;
  }
  return str;
}

// Prime/.fable/fable-library.3.1.5/Option.js
function ofNullable(x) {
  return x == null ? void 0 : x;
}

// Prime/Index.fs.js
function fn(context, req) {
  toConsole(printf("JavaScript HTTP trigger function processed a request."));
  const name = ofNullable(req.query["name"]);
  const responseMessage = name == null ? "This HTTP triggered function executed successfully. Trigger Pass a name in the query string or in the request body for a personalized response." : toText(interpolate("Hello, %P(). This HTTP triggered function executed successfully.", [name]));
  const c = {};
  c.status = 200;
  c.body = responseMessage;
  context.res = c;
  context.done();
}
var Index_fs_default = (delegateArg0, delegateArg1) => {
  fn(delegateArg0, delegateArg1);
};
