var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};

// Fibonacci/Index.fs.js
__markAsModule(exports);
__export(exports, {
  default: () => Index_fs_default
});

// Fibonacci/.fable/fable-library.3.1.5/Int32.js
var NumberStyles;
(function(NumberStyles2) {
  NumberStyles2[NumberStyles2["AllowHexSpecifier"] = 512] = "AllowHexSpecifier";
})(NumberStyles || (NumberStyles = {}));
function validResponse(regexMatch, radix) {
  const [, sign, prefix, digits] = regexMatch;
  return {
    sign: sign || "",
    prefix: prefix || "",
    digits,
    radix
  };
}
function getRange(unsigned, bitsize) {
  switch (bitsize) {
    case 8:
      return unsigned ? [0, 255] : [-128, 127];
    case 16:
      return unsigned ? [0, 65535] : [-32768, 32767];
    case 32:
      return unsigned ? [0, 4294967295] : [-2147483648, 2147483647];
    default:
      throw new Error("Invalid bit size.");
  }
}
function getInvalidDigits(radix) {
  switch (radix) {
    case 2:
      return /[^0-1]/;
    case 8:
      return /[^0-7]/;
    case 10:
      return /[^0-9]/;
    case 16:
      return /[^0-9a-fA-F]/;
    default:
      throw new Error("Invalid Base.");
  }
}
function getRadix(prefix, style) {
  if (style & NumberStyles.AllowHexSpecifier) {
    return 16;
  } else {
    switch (prefix) {
      case "0b":
      case "0B":
        return 2;
      case "0o":
      case "0O":
        return 8;
      case "0x":
      case "0X":
        return 16;
      default:
        return 10;
    }
  }
}
function isValid(str, style, radix) {
  const integerRegex = /^\s*([\+\-])?(0[xXoObB])?([0-9a-fA-F]+)\s*$/;
  const res = integerRegex.exec(str.replace(/_/g, ""));
  if (res != null) {
    const [, , prefix, digits] = res;
    radix = radix || getRadix(prefix, style);
    const invalidDigits = getInvalidDigits(radix);
    if (!invalidDigits.test(digits)) {
      return validResponse(res, radix);
    }
  }
  return null;
}
function parse(str, style, unsigned, bitsize, radix) {
  const res = isValid(str, style, radix);
  if (res != null) {
    let v = Number.parseInt(res.sign + res.digits, res.radix);
    if (!Number.isNaN(v)) {
      const [umin, umax] = getRange(true, bitsize);
      if (!unsigned && res.radix !== 10 && v >= umin && v <= umax) {
        v = v << 32 - bitsize >> 32 - bitsize;
      }
      const [min2, max2] = getRange(unsigned, bitsize);
      if (v >= min2 && v <= max2) {
        return v;
      }
    }
  }
  throw new Error("Input string was not in a correct format.");
}
function tryParse(str, style, unsigned, bitsize, defValue) {
  try {
    defValue.contents = parse(str, style, unsigned, bitsize);
    return true;
  } catch (_a) {
    return false;
  }
}

// Fibonacci/.fable/fable-library.3.1.5/Util.js
function isArrayLike(x) {
  return Array.isArray(x) || ArrayBuffer.isView(x);
}
function isComparable(x) {
  return typeof x.CompareTo === "function";
}
function isEquatable(x) {
  return typeof x.Equals === "function";
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
function int32ToString(i, radix) {
  i = i < 0 && radix != null && radix !== 10 ? 4294967295 + i + 1 : i;
  return i.toString(radix);
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
function equalArraysWith(x, y, eq) {
  if (x == null) {
    return y == null;
  }
  if (y == null) {
    return false;
  }
  if (x.length !== y.length) {
    return false;
  }
  for (let i = 0; i < x.length; i++) {
    if (!eq(x[i], y[i])) {
      return false;
    }
  }
  return true;
}
function equalArrays(x, y) {
  return equalArraysWith(x, y, equals);
}
function equalObjects(x, y) {
  const xKeys = Object.keys(x);
  const yKeys = Object.keys(y);
  if (xKeys.length !== yKeys.length) {
    return false;
  }
  xKeys.sort();
  yKeys.sort();
  for (let i = 0; i < xKeys.length; i++) {
    if (xKeys[i] !== yKeys[i] || !equals(x[xKeys[i]], y[yKeys[i]])) {
      return false;
    }
  }
  return true;
}
function equals(x, y) {
  if (x === y) {
    return true;
  } else if (x == null) {
    return y == null;
  } else if (y == null) {
    return false;
  } else if (typeof x !== "object") {
    return false;
  } else if (isEquatable(x)) {
    return x.Equals(y);
  } else if (isArrayLike(x)) {
    return isArrayLike(y) && equalArrays(x, y);
  } else if (x instanceof Date) {
    return y instanceof Date && compareDates(x, y) === 0;
  } else {
    return Object.getPrototypeOf(x).constructor === Object && equalObjects(x, y);
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
  return compareArraysWith(x, y, compare);
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
      j = compare(x[key], y[key]);
      if (j !== 0) {
        return j;
      }
    }
  }
  return 0;
}
function compare(x, y) {
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

// Fibonacci/.fable/fable-library.3.1.5/Types.js
function seqToString(self) {
  let count2 = 0;
  let str = "[";
  for (const x of self) {
    if (count2 === 0) {
      str += toString(x);
    } else if (count2 === 100) {
      str += "; ...";
      break;
    } else {
      str += "; " + toString(x);
    }
    count2++;
  }
  return str + "]";
}
function toString(x, callStack = 0) {
  if (x != null && typeof x === "object") {
    if (typeof x.toString === "function") {
      return x.toString();
    } else if (Symbol.iterator in x) {
      return seqToString(x);
    } else {
      const cons2 = Object.getPrototypeOf(x).constructor;
      return cons2 === Object && callStack < 10 ? "{ " + Object.entries(x).map(([k, v]) => k + " = " + toString(v, callStack + 1)).join("\n  ") + " }" : cons2.name;
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
      const res = compare(self.head, other.head);
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
  constructor(head2, tail) {
    this.head = head2;
    this.tail = tail;
  }
  [Symbol.iterator]() {
    let cur = this;
    return {
      next: () => {
        const value2 = cur === null || cur === void 0 ? void 0 : cur.head;
        const done = (cur === null || cur === void 0 ? void 0 : cur.tail) == null;
        cur = cur === null || cur === void 0 ? void 0 : cur.tail;
        return {done, value: value2};
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

// Fibonacci/.fable/fable-library.3.1.5/Option.js
var Some = class {
  constructor(value2) {
    this.value = value2;
  }
  toJSON() {
    return this.value;
  }
  toString() {
    return String(this.value);
  }
  GetHashCode() {
    return structuralHash(this.value);
  }
  Equals(other) {
    if (other == null) {
      return false;
    } else {
      return equals(this.value, other instanceof Some ? other.value : other);
    }
  }
  CompareTo(other) {
    if (other == null) {
      return 1;
    } else {
      return compare(this.value, other instanceof Some ? other.value : other);
    }
  }
};
function value(x) {
  if (x == null) {
    throw new Error("Option has no value");
  } else {
    return x instanceof Some ? x.value : x;
  }
}

// Fibonacci/.fable/fable-library.3.1.5/Numeric.js
var symbol = Symbol("numeric");
function isNumeric(x) {
  return typeof x === "number" || (x === null || x === void 0 ? void 0 : x[symbol]);
}
function compare2(x, y) {
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

// Fibonacci/.fable/fable-library.3.1.5/lib/big.js
var P = {
  GetHashCode() {
    return combineHashCodes([this.s, this.e].concat(this.c));
  },
  Equals(x) {
    return !this.cmp(x);
  },
  CompareTo(x) {
    return this.cmp(x);
  },
  [symbol]() {
    const _this = this;
    return {
      multiply: (y) => _this.mul(y),
      toPrecision: (sd) => _this.toPrecision(sd),
      toExponential: (dp) => _this.toExponential(dp),
      toFixed: (dp) => _this.toFixed(dp),
      toHex: () => (Number(_this) >>> 0).toString(16)
    };
  }
};
var DP = 28;
var RM = 1;
var MAX_DP = 1e6;
var MAX_POWER = 1e6;
var NE = -29;
var PE = 29;
var NAME = "[big.js] ";
var INVALID = NAME + "Invalid ";
var INVALID_DP = INVALID + "decimal places";
var INVALID_RM = INVALID + "rounding mode";
var DIV_BY_ZERO = NAME + "Division by zero";
var UNDEFINED = void 0;
var NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
function _Big_() {
  function Big2(n) {
    var x = this;
    if (!(x instanceof Big2))
      return n === UNDEFINED ? _Big_() : new Big2(n);
    if (n instanceof Big2) {
      x.s = n.s;
      x.e = n.e;
      x.c = n.c.slice();
      normalize(x);
    } else {
      parse2(x, n);
    }
    x.constructor = Big2;
  }
  Big2.prototype = P;
  Big2.DP = DP;
  Big2.RM = RM;
  Big2.NE = NE;
  Big2.PE = PE;
  Big2.version = "5.2.2";
  return Big2;
}
function normalize(x) {
  x = round(x, DP, 0);
  if (x.c.length > 1 && !x.c[0]) {
    let i = x.c.findIndex((x2) => x2);
    x.c = x.c.slice(i);
    x.e = x.e - i;
  }
}
function parse2(x, n) {
  var e, i, nl;
  if (n === 0 && 1 / n < 0)
    n = "-0";
  else if (!NUMERIC.test(n += ""))
    throw Error(INVALID + "number");
  x.s = n.charAt(0) == "-" ? (n = n.slice(1), -1) : 1;
  if ((e = n.indexOf(".")) > -1)
    n = n.replace(".", "");
  if ((i = n.search(/e/i)) > 0) {
    if (e < 0)
      e = i;
    e += +n.slice(i + 1);
    n = n.substring(0, i);
  } else if (e < 0) {
    e = n.length;
  }
  nl = n.length;
  for (i = 0; i < e && i < nl && n.charAt(i) == "0"; )
    ++i;
  if (i == nl) {
    x.c = [x.e = 0];
  } else {
    x.e = e - i - 1;
    x.c = [];
    for (e = 0; i < nl; )
      x.c[e++] = +n.charAt(i++);
  }
  x = round(x, Big.DP, Big.RM);
  return x;
}
function round(x, dp, rm, more) {
  var xc = x.c, i = x.e + dp + 1;
  if (i < xc.length) {
    if (rm === 1) {
      more = xc[i] >= 5;
    } else if (rm === 2) {
      more = xc[i] > 5 || xc[i] == 5 && (more || i < 0 || xc[i + 1] !== UNDEFINED || xc[i - 1] & 1);
    } else if (rm === 3) {
      const isZero2 = xc.findIndex((xci, idx) => idx >= i && xci > 0) < 0;
      more = more || !isZero2;
    } else {
      more = false;
      if (rm !== 0)
        throw Error(INVALID_RM);
    }
    if (i < 1) {
      xc.length = 1;
      if (more) {
        x.e = -dp;
        xc[0] = 1;
      } else {
        xc[0] = x.e = 0;
      }
    } else {
      xc.length = i--;
      if (more) {
        for (; ++xc[i] > 9; ) {
          xc[i] = 0;
          if (!i--) {
            ++x.e;
            xc.unshift(1);
          }
        }
      }
      for (i = xc.length; !xc[--i]; )
        xc.pop();
    }
  } else if (rm < 0 || rm > 3 || rm !== ~~rm) {
    throw Error(INVALID_RM);
  }
  return x;
}
function stringify(x, id, n, k) {
  var e, s, Big2 = x.constructor, z = !x.c[0];
  if (n !== UNDEFINED) {
    if (n !== ~~n || n < (id == 3) || n > MAX_DP) {
      throw Error(id == 3 ? INVALID + "precision" : INVALID_DP);
    }
    x = new Big2(x);
    n = k - x.e;
    if (x.c.length > ++k)
      round(x, n, Big2.RM);
    if (id == 2)
      k = x.e + n + 1;
    for (; x.c.length < k; )
      x.c.push(0);
  }
  e = x.e;
  s = x.c.join("");
  n = s.length;
  if (id != 2 && (id == 1 || id == 3 && k <= e || e <= Big2.NE || e >= Big2.PE)) {
    s = s.charAt(0) + (n > 1 ? "." + s.slice(1) : "") + (e < 0 ? "e" : "e+") + e;
  } else if (e < 0) {
    for (; ++e; )
      s = "0" + s;
    s = "0." + s;
  } else if (e > 0) {
    if (++e > n)
      for (e -= n; e--; )
        s += "0";
    else if (e < n)
      s = s.slice(0, e) + "." + s.slice(e);
  } else if (n > 1) {
    s = s.charAt(0) + "." + s.slice(1);
  }
  return x.s < 0 && (!z || id == 4) ? "-" + s : s;
}
P.abs = function() {
  var x = new this.constructor(this);
  x.s = 1;
  return x;
};
P.cmp = function(y) {
  var isneg, Big2 = this.constructor, x = new Big2(this), y = new Big2(y), xc = x.c, yc = y.c, i = x.s, j = y.s, k = x.e, l = y.e;
  if (!xc[0] || !yc[0])
    return !xc[0] ? !yc[0] ? 0 : -j : i;
  if (i != j)
    return i;
  isneg = i < 0;
  if (k != l)
    return k > l ^ isneg ? 1 : -1;
  j = Math.max(xc.length, yc.length);
  for (i = 0; i < j; i++) {
    k = i < xc.length ? xc[i] : 0;
    l = i < yc.length ? yc[i] : 0;
    if (k != l)
      return k > l ^ isneg ? 1 : -1;
  }
  return 0;
};
P.div = function(y) {
  var Big2 = this.constructor, x = new Big2(this), y = new Big2(y), a = x.c, b = y.c, k = x.s == y.s ? 1 : -1, dp = Big2.DP;
  if (dp !== ~~dp || dp < 0 || dp > MAX_DP)
    throw Error(INVALID_DP);
  if (!b[0])
    throw Error(DIV_BY_ZERO);
  if (!a[0])
    return new Big2(k * 0);
  var bl, bt, n, cmp, ri, bz = b.slice(), ai = bl = b.length, al = a.length, r = a.slice(0, bl), rl = r.length, q = y, qc = q.c = [], qi = 0, d = dp + (q.e = x.e - y.e) + 1;
  q.s = k;
  k = d < 0 ? 0 : d;
  bz.unshift(0);
  for (; rl++ < bl; )
    r.push(0);
  do {
    for (n = 0; n < 10; n++) {
      if (bl != (rl = r.length)) {
        cmp = bl > rl ? 1 : -1;
      } else {
        for (ri = -1, cmp = 0; ++ri < bl; ) {
          if (b[ri] != r[ri]) {
            cmp = b[ri] > r[ri] ? 1 : -1;
            break;
          }
        }
      }
      if (cmp < 0) {
        for (bt = rl == bl ? b : bz; rl; ) {
          if (r[--rl] < bt[rl]) {
            ri = rl;
            for (; ri && !r[--ri]; )
              r[ri] = 9;
            --r[ri];
            r[rl] += 10;
          }
          r[rl] -= bt[rl];
        }
        for (; !r[0]; )
          r.shift();
      } else {
        break;
      }
    }
    qc[qi++] = cmp ? n : ++n;
    if (r[0] && cmp)
      r[rl] = a[ai] || 0;
    else
      r = [a[ai]];
  } while ((ai++ < al || r[0] !== UNDEFINED) && k--);
  if (!qc[0] && qi != 1) {
    qc.shift();
    q.e--;
  }
  if (qi > d)
    round(q, dp, Big2.RM, r[0] !== UNDEFINED);
  return q;
};
P.eq = function(y) {
  return !this.cmp(y);
};
P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.gte = function(y) {
  return this.cmp(y) > -1;
};
P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.minus = P.sub = function(y) {
  var i, j, t, xlty, Big2 = this.constructor, x = new Big2(this), y = new Big2(y), a = x.s, b = y.s;
  if (a != b) {
    y.s = -b;
    return x.plus(y);
  }
  var xc = x.c.slice(), xe = x.e, yc = y.c, ye = y.e;
  if (!xc[0] || !yc[0]) {
    return yc[0] ? (y.s = -b, y) : new Big2(xc[0] ? x : 0);
  }
  if (a = xe - ye) {
    if (xlty = a < 0) {
      a = -a;
      t = xc;
    } else {
      ye = xe;
      t = yc;
    }
    t.reverse();
    for (b = a; b--; )
      t.push(0);
    t.reverse();
  } else {
    j = ((xlty = xc.length < yc.length) ? xc : yc).length;
    for (a = b = 0; b < j; b++) {
      if (xc[b] != yc[b]) {
        xlty = xc[b] < yc[b];
        break;
      }
    }
  }
  if (xlty) {
    t = xc;
    xc = yc;
    yc = t;
    y.s = -y.s;
  }
  if ((b = (j = yc.length) - (i = xc.length)) > 0)
    for (; b--; )
      xc[i++] = 0;
  for (b = i; j > a; ) {
    if (xc[--j] < yc[j]) {
      for (i = j; i && !xc[--i]; )
        xc[i] = 9;
      --xc[i];
      xc[j] += 10;
    }
    xc[j] -= yc[j];
  }
  for (; xc[--b] === 0; )
    xc.pop();
  for (; xc[0] === 0; ) {
    xc.shift();
    --ye;
  }
  if (!xc[0]) {
    y.s = 1;
    xc = [ye = 0];
  }
  y.c = xc;
  y.e = ye;
  return y;
};
P.mod = function(y) {
  var ygtx, Big2 = this.constructor, x = new Big2(this), y = new Big2(y), a = x.s, b = y.s;
  if (!y.c[0])
    throw Error(DIV_BY_ZERO);
  x.s = y.s = 1;
  ygtx = y.cmp(x) == 1;
  x.s = a;
  y.s = b;
  if (ygtx)
    return new Big2(x);
  a = Big2.DP;
  b = Big2.RM;
  Big2.DP = Big2.RM = 0;
  x = x.div(y);
  Big2.DP = a;
  Big2.RM = b;
  return this.minus(x.times(y));
};
P.plus = P.add = function(y) {
  var t, Big2 = this.constructor, x = new Big2(this), y = new Big2(y), a = x.s, b = y.s;
  if (a != b) {
    y.s = -b;
    return x.minus(y);
  }
  var xe = x.e, xc = x.c, ye = y.e, yc = y.c;
  if (!xc[0] || !yc[0])
    return yc[0] ? y : new Big2(xc[0] ? x : a * 0);
  xc = xc.slice();
  if (a = xe - ye) {
    if (a > 0) {
      ye = xe;
      t = yc;
    } else {
      a = -a;
      t = xc;
    }
    t.reverse();
    for (; a--; )
      t.push(0);
    t.reverse();
  }
  if (xc.length - yc.length < 0) {
    t = yc;
    yc = xc;
    xc = t;
  }
  a = yc.length;
  for (b = 0; a; xc[a] %= 10)
    b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;
  if (b) {
    xc.unshift(b);
    ++ye;
  }
  for (a = xc.length; xc[--a] === 0; )
    xc.pop();
  y.c = xc;
  y.e = ye;
  return y;
};
P.pow = function(n) {
  var Big2 = this.constructor, x = new Big2(this), y = new Big2(1), one = new Big2(1), isneg = n < 0;
  if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER)
    throw Error(INVALID + "exponent");
  if (isneg)
    n = -n;
  for (; ; ) {
    if (n & 1)
      y = y.times(x);
    n >>= 1;
    if (!n)
      break;
    x = x.times(x);
  }
  return isneg ? one.div(y) : y;
};
P.round = function(dp, rm) {
  var Big2 = this.constructor;
  if (dp === UNDEFINED)
    dp = 0;
  else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP)
    throw Error(INVALID_DP);
  return round(new Big2(this), dp, rm === UNDEFINED ? Big2.RM : rm);
};
P.sqrt = function() {
  var r, c, t, Big2 = this.constructor, x = new Big2(this), s = x.s, e = x.e, half = new Big2(0.5);
  if (!x.c[0])
    return new Big2(x);
  if (s < 0)
    throw Error(NAME + "No square root");
  s = Math.sqrt(x + "");
  if (s === 0 || s === 1 / 0) {
    c = x.c.join("");
    if (!(c.length + e & 1))
      c += "0";
    s = Math.sqrt(c);
    e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
    r = new Big2((s == 1 / 0 ? "1e" : (s = s.toExponential()).slice(0, s.indexOf("e") + 1)) + e);
  } else {
    r = new Big2(s);
  }
  e = r.e + (Big2.DP += 4);
  do {
    t = r;
    r = half.times(t.plus(x.div(t)));
  } while (t.c.slice(0, e).join("") !== r.c.slice(0, e).join(""));
  return round(r, Big2.DP -= 4, Big2.RM);
};
P.times = P.mul = function(y) {
  var c, Big2 = this.constructor, x = new Big2(this), y = new Big2(y), xc = x.c, yc = y.c, a = xc.length, b = yc.length, i = x.e, j = y.e;
  y.s = x.s == y.s ? 1 : -1;
  if (!xc[0] || !yc[0])
    return new Big2(y.s * 0);
  y.e = i + j;
  if (a < b) {
    c = xc;
    xc = yc;
    yc = c;
    j = a;
    a = b;
    b = j;
  }
  for (c = new Array(j = a + b); j--; )
    c[j] = 0;
  for (i = b; i--; ) {
    b = 0;
    for (j = a + i; j > i; ) {
      b = c[j] + yc[i] * xc[j - i - 1] + b;
      c[j--] = b % 10;
      b = b / 10 | 0;
    }
    c[j] = (c[j] + b) % 10;
  }
  if (b)
    ++y.e;
  else
    c.shift();
  for (i = c.length; !c[--i]; )
    c.pop();
  y.c = c;
  return y;
};
P.toExponential = function(dp) {
  return stringify(this, 1, dp, dp);
};
P.toFixed = function(dp) {
  return stringify(this, 2, dp, this.e + dp);
};
P.toPrecision = function(sd) {
  return stringify(this, 3, sd, sd - 1);
};
P.toString = function() {
  return stringify(this);
};
P.valueOf = P.toJSON = function() {
  return stringify(this, 4);
};
var Big = _Big_();
var big_default = Big;

// Fibonacci/.fable/fable-library.3.1.5/Decimal.js
var get_Zero = new big_default(0);
var get_One = new big_default(1);
var get_MinusOne = new big_default(-1);
var get_MaxValue = new big_default("79228162514264337593543950335");
var get_MinValue = new big_default("-79228162514264337593543950335");

// Fibonacci/.fable/fable-library.3.1.5/lib/long.js
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
  return equals2(this, x);
};
Long.prototype.CompareTo = function(x) {
  return compare3(this, x);
};
Long.prototype.toString = function(radix) {
  return toString2(this, radix);
};
Long.prototype.toJSON = function() {
  return toString2(this);
};
Long.prototype[symbol] = function() {
  const x = this;
  return {
    multiply: (y) => multiply2(x, y),
    toPrecision: (sd) => String(x) + 0 .toPrecision(sd).substr(1),
    toExponential: (dp) => String(x) + 0 .toExponential(dp).substr(1),
    toFixed: (dp) => String(x) + 0 .toFixed(dp).substr(1),
    toHex: () => toString2(x.unsigned ? x : fromBytes(toBytes(x), true), 16)
  };
};
Long.prototype.__isLong__;
Object.defineProperty(Long.prototype, "__isLong__", {value: true});
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}
var INT_CACHE = {};
var UINT_CACHE = {};
function fromInt(value2, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value2 >>>= 0;
    if (cache = 0 <= value2 && value2 < 256) {
      cachedObj = UINT_CACHE[value2];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value2, (value2 | 0) < 0 ? -1 : 0, true);
    if (cache)
      UINT_CACHE[value2] = obj;
    return obj;
  } else {
    value2 |= 0;
    if (cache = -128 <= value2 && value2 < 128) {
      cachedObj = INT_CACHE[value2];
      if (cachedObj)
        return cachedObj;
    }
    obj = fromBits(value2, value2 < 0 ? -1 : 0, false);
    if (cache)
      INT_CACHE[value2] = obj;
    return obj;
  }
}
function fromNumber(value2, unsigned) {
  if (isNaN(value2))
    return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value2 < 0)
      return UZERO;
    if (value2 >= TWO_PWR_64_DBL)
      return MAX_UNSIGNED_VALUE;
  } else {
    if (value2 <= -TWO_PWR_63_DBL)
      return MIN_VALUE;
    if (value2 + 1 >= TWO_PWR_63_DBL)
      return MAX_VALUE;
  }
  if (value2 < 0)
    return negate(fromNumber(-value2, unsigned));
  return fromBits(value2 % TWO_PWR_32_DBL | 0, value2 / TWO_PWR_32_DBL | 0, unsigned);
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
    var size = Math.min(8, str.length - i), value2 = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = add(multiply2(result, power), fromNumber(value2));
    } else {
      result = multiply2(result, radixToPower);
      result = add(result, fromNumber(value2));
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
function toString2($this, radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
    throw RangeError("radix");
  if (isZero($this))
    return "0";
  if (isNegative($this)) {
    if (equals2($this, MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = divide($this, radixLong), rem1 = subtract(multiply2(div, radixLong), $this);
      return toString2(div, radix) + toInt(rem1).toString(radix);
    } else
      return "-" + toString2(negate($this), radix);
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
function equals2($this, other) {
  if (!isLong(other))
    other = fromValue(other);
  if ($this.unsigned !== other.unsigned && $this.high >>> 31 === 1 && other.high >>> 31 === 1)
    return false;
  return $this.high === other.high && $this.low === other.low;
}
function lessThan($this, other) {
  return compare3($this, other) < 0;
}
function greaterThan($this, other) {
  return compare3($this, other) > 0;
}
function greaterThanOrEqual($this, other) {
  return compare3($this, other) >= 0;
}
function compare3($this, other) {
  if (!isLong(other))
    other = fromValue(other);
  if (equals2($this, other))
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
  if (!$this.unsigned && equals2($this, MIN_VALUE))
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
  if (equals2($this, MIN_VALUE))
    return isOdd(multiplier) ? MIN_VALUE : ZERO;
  if (equals2(multiplier, MIN_VALUE))
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
    if (equals2($this, MIN_VALUE)) {
      if (equals2(divisor, ONE) || equals2(divisor, NEG_ONE))
        return MIN_VALUE;
      else if (equals2(divisor, MIN_VALUE))
        return ONE;
      else {
        var halfThis = shiftRight($this, 1);
        approx = shiftLeft(divide(halfThis, divisor), 1);
        if (equals2(approx, ZERO)) {
          return isNegative(divisor) ? ONE : NEG_ONE;
        } else {
          rem = subtract($this, multiply2(divisor, approx));
          res = add(approx, divide(rem, divisor));
          return res;
        }
      }
    } else if (equals2(divisor, MIN_VALUE))
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

// Fibonacci/.fable/fable-library.3.1.5/Seq.js
var Enumerator = class {
  constructor(iter) {
    this.iter = iter;
  }
  ["System.Collections.Generic.IEnumerator`1.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.get_Current"]() {
    return this.current;
  }
  ["System.Collections.IEnumerator.MoveNext"]() {
    const cur = this.iter.next();
    this.current = cur.value;
    return !cur.done;
  }
  ["System.Collections.IEnumerator.Reset"]() {
    throw new Error("JS iterators cannot be reset");
  }
  Dispose() {
    return;
  }
};
function getEnumerator(o) {
  return typeof o.GetEnumerator === "function" ? o.GetEnumerator() : new Enumerator(o[Symbol.iterator]());
}
function toIterator(en) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      const hasNext = en["System.Collections.IEnumerator.MoveNext"]();
      const current = hasNext ? en["System.Collections.IEnumerator.get_Current"]() : void 0;
      return {done: !hasNext, value: current};
    }
  };
}
var Seq = class {
  constructor(f) {
    this.f = f;
  }
  [Symbol.iterator]() {
    return new Seq(this.f);
  }
  next() {
    var _a;
    this.iter = (_a = this.iter) !== null && _a !== void 0 ? _a : this.f();
    return this.iter.next();
  }
  toString() {
    return "seq [" + Array.from(this).join("; ") + "]";
  }
};
function makeSeq(f) {
  return new Seq(f);
}
function isArrayOrBufferView(xs) {
  return Array.isArray(xs) || ArrayBuffer.isView(xs);
}
function concat(xs) {
  return delay(() => {
    const iter = xs[Symbol.iterator]();
    let output;
    return unfold((innerIter) => {
      let hasFinished = false;
      while (!hasFinished) {
        if (innerIter == null) {
          const cur = iter.next();
          if (!cur.done) {
            innerIter = cur.value[Symbol.iterator]();
          } else {
            hasFinished = true;
          }
        } else {
          const cur = innerIter.next();
          if (!cur.done) {
            output = cur.value;
            hasFinished = true;
          } else {
            innerIter = void 0;
          }
        }
      }
      return innerIter != null ? [output, innerIter] : void 0;
    }, void 0);
  });
}
function delay(f) {
  return makeSeq(() => f()[Symbol.iterator]());
}
function fold(f, acc, xs) {
  if (isArrayOrBufferView(xs)) {
    return xs.reduce(f, acc);
  } else {
    let cur;
    for (let i = 0, iter = xs[Symbol.iterator](); ; i++) {
      cur = iter.next();
      if (cur.done) {
        break;
      }
      acc = f(acc, cur.value, i);
    }
    return acc;
  }
}
function iterate(f, xs) {
  fold((_, x) => (f(x), void 0), void 0, xs);
}
function iterateIndexed(f, xs) {
  fold((_, x, i) => (f(i !== null && i !== void 0 ? i : 0, x), void 0), void 0, xs);
}
function map(f, xs) {
  return delay(() => unfold((iter) => {
    const cur = iter.next();
    return !cur.done ? [f(cur.value), iter] : void 0;
  }, xs[Symbol.iterator]()));
}
function rangeNumber(first, step, last) {
  if (step === 0) {
    throw new Error("Step cannot be 0");
  }
  return delay(() => unfold((x) => step > 0 && x <= last || step < 0 && x >= last ? [x, x + step] : void 0, first));
}
function sumBy(f, xs, adder) {
  return fold((acc, x) => adder.Add(acc, f(x)), adder.GetZero(), xs);
}
function unfold(f, fst) {
  return makeSeq(() => {
    let acc = fst;
    const iter = {
      next() {
        const res = f(acc);
        if (res != null) {
          const v = value(res);
          if (v != null) {
            acc = v[1];
            return {done: false, value: v[0]};
          }
        }
        return {done: true, value: void 0};
      }
    };
    return iter;
  });
}

// Fibonacci/.fable/fable-library.3.1.5/Reflection.js
var TypeInfo = class {
  constructor(fullname, generics, construct, parent, fields, cases, enumCases) {
    this.fullname = fullname;
    this.generics = generics;
    this.construct = construct;
    this.parent = parent;
    this.fields = fields;
    this.cases = cases;
    this.enumCases = enumCases;
  }
  toString() {
    return fullName(this);
  }
  GetHashCode() {
    return getHashCode(this);
  }
  Equals(other) {
    return equals3(this, other);
  }
};
function getGenerics(t) {
  return t.generics != null ? t.generics : [];
}
function getHashCode(t) {
  const fullnameHash = stringHash(t.fullname);
  const genHashes = getGenerics(t).map(getHashCode);
  return combineHashCodes([fullnameHash, ...genHashes]);
}
function equals3(t1, t2) {
  if (t1.fullname === "") {
    return t2.fullname === "" && equalArraysWith(getRecordElements(t1), getRecordElements(t2), ([k1, v1], [k2, v2]) => k1 === k2 && equals3(v1, v2));
  } else {
    return t1.fullname === t2.fullname && equalArraysWith(getGenerics(t1), getGenerics(t2), equals3);
  }
}
var obj_type = new TypeInfo("System.Object");
var unit_type = new TypeInfo("Microsoft.FSharp.Core.Unit");
var char_type = new TypeInfo("System.Char");
var string_type = new TypeInfo("System.String");
var bool_type = new TypeInfo("System.Boolean");
var int8_type = new TypeInfo("System.SByte");
var uint8_type = new TypeInfo("System.Byte");
var int16_type = new TypeInfo("System.Int16");
var uint16_type = new TypeInfo("System.UInt16");
var int32_type = new TypeInfo("System.Int32");
var uint32_type = new TypeInfo("System.UInt32");
var float32_type = new TypeInfo("System.Single");
var float64_type = new TypeInfo("System.Double");
var decimal_type = new TypeInfo("System.Decimal");
function fullName(t) {
  const gen = t.generics != null && !isArray(t) ? t.generics : [];
  if (gen.length > 0) {
    return t.fullname + "[" + gen.map((x) => fullName(x)).join(",") + "]";
  } else {
    return t.fullname;
  }
}
function isArray(t) {
  return t.fullname.endsWith("[]");
}
function getRecordElements(t) {
  if (t.fields != null) {
    return t.fields();
  } else {
    throw new Error(`${t.fullname} is not an F# record type`);
  }
}

// Fibonacci/.fable/fable-library.3.1.5/MapUtil.js
function tryGetValue(map2, key, defaultValue) {
  if (map2.has(key)) {
    defaultValue.contents = map2.get(key);
    return true;
  }
  return false;
}
function getItemFromDict(map2, key) {
  if (map2.has(key)) {
    return map2.get(key);
  } else {
    throw new Error(`The given key '${key}' was not present in the dictionary.`);
  }
}

// Fibonacci/.fable/fable-library.3.1.5/Date.js
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
function dateToStringWithCustomFormat(date, format2, utc) {
  return format2.replace(/(\w)\1*/g, (match) => {
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
function dateToStringWithOffset(date, format2) {
  var _a, _b, _c;
  const d = new Date(date.getTime() + ((_a = date.offset) !== null && _a !== void 0 ? _a : 0));
  if (typeof format2 !== "string") {
    return d.toISOString().replace(/\.\d+/, "").replace(/[A-Z]|\.\d+/g, " ") + dateOffsetToString((_b = date.offset) !== null && _b !== void 0 ? _b : 0);
  } else if (format2.length === 1) {
    switch (format2) {
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
    return dateToStringWithCustomFormat(d, format2, true);
  }
}
function dateToStringWithKind(date, format2) {
  const utc = date.kind === 1;
  if (typeof format2 !== "string") {
    return utc ? date.toUTCString() : date.toLocaleString();
  } else if (format2.length === 1) {
    switch (format2) {
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
    return dateToStringWithCustomFormat(date, format2, utc);
  }
}
function toString3(date, format2, _provider) {
  return date.offset != null ? dateToStringWithOffset(date, format2) : dateToStringWithKind(date, format2);
}

// Fibonacci/.fable/fable-library.3.1.5/String.js
var interpolateRegExp = /(?:(^|[^%])%([0+\- ]*)(\d+)?(?:\.(\d+))?(\w))?%P\(\)/g;
var formatRegExp = /\{(\d+)(,-?\d+)?(?:\:([a-zA-Z])(\d{0,2})|\:(.+?))?\}/g;
function isLessThan(x, y) {
  return compare2(x, y) < 0;
}
function interpolate(input, values) {
  let i = 0;
  return input.replace(interpolateRegExp, (_, prefix, flags, padLength, precision, format2) => {
    return formatReplacement(values[i++], prefix, flags, padLength, precision, format2);
  });
}
function continuePrint(cont, arg) {
  return typeof arg === "string" ? cont(arg) : arg.cont(cont);
}
function toText(arg) {
  return continuePrint((x) => x, arg);
}
function formatReplacement(rep, prefix, flags, padLength, precision, format2) {
  let sign = "";
  flags = flags || "";
  format2 = format2 || "";
  if (isNumeric(rep)) {
    if (format2.toLowerCase() !== "x") {
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
    switch (format2) {
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
    rep = toString3(rep);
  } else {
    rep = toString(rep);
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
function format(str, ...args) {
  if (typeof str === "object" && args.length > 0) {
    str = args[0];
    args.shift();
  }
  return str.replace(formatRegExp, (_, idx, padLength, format2, precision, pattern) => {
    let rep = args[idx];
    if (isNumeric(rep)) {
      precision = precision == null ? null : parseInt(precision, 10);
      switch (format2) {
        case "f":
        case "F":
          precision = precision != null ? precision : 2;
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
        case "p":
        case "P":
          precision = precision != null ? precision : 2;
          rep = toFixed(multiply(rep, 100), precision) + " %";
          break;
        case "d":
        case "D":
          rep = precision != null ? padLeft(String(rep), precision, "0") : String(rep);
          break;
        case "x":
        case "X":
          rep = precision != null ? padLeft(toHex(rep), precision, "0") : toHex(rep);
          if (format2 === "X") {
            rep = rep.toUpperCase();
          }
          break;
        default:
          if (pattern) {
            let sign = "";
            rep = pattern.replace(/(0+)(\.0+)?/, (_2, intPart, decimalPart) => {
              if (isLessThan(rep, 0)) {
                rep = multiply(rep, -1);
                sign = "-";
              }
              rep = toFixed(rep, decimalPart != null ? decimalPart.length - 1 : 0);
              return padLeft(rep, (intPart || "").length - sign.length + (decimalPart != null ? decimalPart.length : 0), "0");
            });
            rep = sign + rep;
          }
      }
    } else if (rep instanceof Date) {
      rep = toString3(rep, pattern || format2);
    } else {
      rep = toString(rep);
    }
    padLength = parseInt((padLength || " ").substring(1), 10);
    if (!isNaN(padLength)) {
      rep = padLeft(String(rep), Math.abs(padLength), " ", padLength < 0);
    }
    return rep;
  });
}
function padLeft(str, len, ch, isRight) {
  ch = ch || " ";
  len = len - str.length;
  for (let i = 0; i < len; i++) {
    str = isRight ? str + ch : ch + str;
  }
  return str;
}

// Fibonacci/.fable/fable-library.3.1.5/MutableMap.js
var Dictionary = class {
  constructor(pairs, comparer) {
    const this$ = new FSharpRef(null);
    this.comparer = comparer;
    this$.contents = this;
    this.hashMap = new Map([]);
    this["init@8-1"] = 1;
    const enumerator = getEnumerator(pairs);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        const pair = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
        Dictionary__Add_5BDDA1(this$.contents, pair[0], pair[1]);
      }
    } finally {
      enumerator.Dispose();
    }
  }
  get [Symbol.toStringTag]() {
    return "Dictionary";
  }
  ["System.Collections.IEnumerable.GetEnumerator"]() {
    const this$ = this;
    return getEnumerator(this$);
  }
  GetEnumerator() {
    const this$ = this;
    return getEnumerator(concat(this$.hashMap.values()));
  }
  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }
  ["System.Collections.Generic.ICollection`1.Add2B595"](item) {
    const this$ = this;
    Dictionary__Add_5BDDA1(this$, item[0], item[1]);
  }
  ["System.Collections.Generic.ICollection`1.Clear"]() {
    const this$ = this;
    Dictionary__Clear(this$);
  }
  ["System.Collections.Generic.ICollection`1.Contains2B595"](item) {
    const this$ = this;
    const matchValue = Dictionary__TryFind_2B595(this$, item[0]);
    let pattern_matching_result;
    if (matchValue != null) {
      if (equals(matchValue[1], item[1])) {
        pattern_matching_result = 0;
      } else {
        pattern_matching_result = 1;
      }
    } else {
      pattern_matching_result = 1;
    }
    switch (pattern_matching_result) {
      case 0: {
        return true;
      }
      case 1: {
        return false;
      }
    }
  }
  ["System.Collections.Generic.ICollection`1.CopyToZ2E171D71"](array, arrayIndex) {
    const this$ = this;
    iterateIndexed((i, e) => {
      array[arrayIndex + i] = e;
    }, this$);
  }
  ["System.Collections.Generic.ICollection`1.get_Count"]() {
    const this$ = this;
    return Dictionary__get_Count(this$) | 0;
  }
  ["System.Collections.Generic.ICollection`1.get_IsReadOnly"]() {
    return false;
  }
  ["System.Collections.Generic.ICollection`1.Remove2B595"](item) {
    const this$ = this;
    const matchValue = Dictionary__TryFind_2B595(this$, item[0]);
    if (matchValue != null) {
      if (equals(matchValue[1], item[1])) {
        void Dictionary__Remove_2B595(this$, item[0]);
      }
      return true;
    } else {
      return false;
    }
  }
  get size() {
    const this$ = this;
    return Dictionary__get_Count(this$) | 0;
  }
  clear() {
    const this$ = this;
    Dictionary__Clear(this$);
  }
  delete(k) {
    const this$ = this;
    return Dictionary__Remove_2B595(this$, k);
  }
  entries() {
    const this$ = this;
    return map((p) => [p[0], p[1]], this$);
  }
  get(k) {
    const this$ = this;
    return Dictionary__get_Item_2B595(this$, k);
  }
  has(k) {
    const this$ = this;
    return Dictionary__ContainsKey_2B595(this$, k);
  }
  keys() {
    const this$ = this;
    return map((p) => p[0], this$);
  }
  set(k, v) {
    const this$ = this;
    Dictionary__set_Item_5BDDA1(this$, k, v);
    return this$;
  }
  values() {
    const this$ = this;
    return map((p) => p[1], this$);
  }
  forEach(f, thisArg) {
    const this$ = this;
    iterate((p) => {
      f(p[1], p[0], this$);
    }, this$);
  }
};
function Dictionary__TryFindIndex_2B595(this$, k) {
  const h = this$.comparer.GetHashCode(k) | 0;
  let matchValue;
  let outArg = null;
  matchValue = [tryGetValue(this$.hashMap, h, new FSharpRef(() => outArg, (v) => {
    outArg = v;
  })), outArg];
  if (matchValue[0]) {
    return [true, h, matchValue[1].findIndex((pair) => this$.comparer.Equals(k, pair[0]))];
  } else {
    return [false, h, -1];
  }
}
function Dictionary__TryFind_2B595(this$, k) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      return getItemFromDict(this$.hashMap, matchValue[1])[matchValue[2]];
    }
    case 1: {
      return void 0;
    }
  }
}
function Dictionary__Clear(this$) {
  this$.hashMap.clear();
}
function Dictionary__get_Count(this$) {
  return sumBy((pairs) => pairs.length, this$.hashMap.values(), {
    GetZero: () => 0,
    Add: (x, y) => x + y
  });
}
function Dictionary__get_Item_2B595(this$, k) {
  const matchValue = Dictionary__TryFind_2B595(this$, k);
  if (matchValue != null) {
    return matchValue[1];
  } else {
    throw new Error("The item was not found in collection");
  }
}
function Dictionary__set_Item_5BDDA1(this$, k, v) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      getItemFromDict(this$.hashMap, matchValue[1])[matchValue[2]] = [k, v];
      break;
    }
    case 1: {
      if (matchValue[0]) {
        const value2 = void getItemFromDict(this$.hashMap, matchValue[1]).push([k, v]);
      } else {
        this$.hashMap.set(matchValue[1], [[k, v]]);
      }
      break;
    }
  }
}
function Dictionary__Add_5BDDA1(this$, k, v) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      const msg = format("An item with the same key has already been added. Key: {0}", k);
      throw new Error(msg);
      break;
    }
    case 1: {
      if (matchValue[0]) {
        const value2 = void getItemFromDict(this$.hashMap, matchValue[1]).push([k, v]);
      } else {
        this$.hashMap.set(matchValue[1], [[k, v]]);
      }
      break;
    }
  }
}
function Dictionary__ContainsKey_2B595(this$, k) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      return true;
    }
    case 1: {
      return false;
    }
  }
}
function Dictionary__Remove_2B595(this$, k) {
  const matchValue = Dictionary__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      getItemFromDict(this$.hashMap, matchValue[1]).splice(matchValue[2], 1);
      return true;
    }
    case 1: {
      return false;
    }
  }
}

// Fibonacci/.fable/fable-library.3.1.5/MutableSet.js
var HashSet = class {
  constructor(items, comparer) {
    const this$ = new FSharpRef(null);
    this.comparer = comparer;
    this$.contents = this;
    this.hashMap = new Map([]);
    this["init@8-2"] = 1;
    const enumerator = getEnumerator(items);
    try {
      while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
        void HashSet__Add_2B595(this$.contents, enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
      }
    } finally {
      enumerator.Dispose();
    }
  }
  get [Symbol.toStringTag]() {
    return "HashSet";
  }
  ["System.Collections.IEnumerable.GetEnumerator"]() {
    const this$ = this;
    return getEnumerator(this$);
  }
  GetEnumerator() {
    const this$ = this;
    return getEnumerator(concat(this$.hashMap.values()));
  }
  [Symbol.iterator]() {
    return toIterator(this.GetEnumerator());
  }
  ["System.Collections.Generic.ICollection`1.Add2B595"](item) {
    const this$ = this;
    void HashSet__Add_2B595(this$, item);
  }
  ["System.Collections.Generic.ICollection`1.Clear"]() {
    const this$ = this;
    HashSet__Clear(this$);
  }
  ["System.Collections.Generic.ICollection`1.Contains2B595"](item) {
    const this$ = this;
    return HashSet__Contains_2B595(this$, item);
  }
  ["System.Collections.Generic.ICollection`1.CopyToZ2E171D71"](array, arrayIndex) {
    const this$ = this;
    iterateIndexed((i, e) => {
      array[arrayIndex + i] = e;
    }, this$);
  }
  ["System.Collections.Generic.ICollection`1.get_Count"]() {
    const this$ = this;
    return HashSet__get_Count(this$) | 0;
  }
  ["System.Collections.Generic.ICollection`1.get_IsReadOnly"]() {
    return false;
  }
  ["System.Collections.Generic.ICollection`1.Remove2B595"](item) {
    const this$ = this;
    return HashSet__Remove_2B595(this$, item);
  }
  get size() {
    const this$ = this;
    return HashSet__get_Count(this$) | 0;
  }
  add(k) {
    const this$ = this;
    void HashSet__Add_2B595(this$, k);
    return this$;
  }
  clear() {
    const this$ = this;
    HashSet__Clear(this$);
  }
  delete(k) {
    const this$ = this;
    return HashSet__Remove_2B595(this$, k);
  }
  has(k) {
    const this$ = this;
    return HashSet__Contains_2B595(this$, k);
  }
  keys() {
    const this$ = this;
    return map((x) => x, this$);
  }
  values() {
    const this$ = this;
    return map((x) => x, this$);
  }
  entries() {
    const this$ = this;
    return map((v) => [v, v], this$);
  }
  forEach(f, thisArg) {
    const this$ = this;
    iterate((x) => {
      f(x, x, this$);
    }, this$);
  }
};
function HashSet__TryFindIndex_2B595(this$, k) {
  const h = this$.comparer.GetHashCode(k) | 0;
  let matchValue;
  let outArg = null;
  matchValue = [tryGetValue(this$.hashMap, h, new FSharpRef(() => outArg, (v) => {
    outArg = v;
  })), outArg];
  if (matchValue[0]) {
    return [true, h, matchValue[1].findIndex((v_1) => this$.comparer.Equals(k, v_1))];
  } else {
    return [false, h, -1];
  }
}
function HashSet__Clear(this$) {
  this$.hashMap.clear();
}
function HashSet__get_Count(this$) {
  return sumBy((pairs) => pairs.length, this$.hashMap.values(), {
    GetZero: () => 0,
    Add: (x, y) => x + y
  });
}
function HashSet__Add_2B595(this$, k) {
  const matchValue = HashSet__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      return false;
    }
    case 1: {
      if (matchValue[0]) {
        const value2 = void getItemFromDict(this$.hashMap, matchValue[1]).push(k);
        return true;
      } else {
        this$.hashMap.set(matchValue[1], [k]);
        return true;
      }
    }
  }
}
function HashSet__Contains_2B595(this$, k) {
  const matchValue = HashSet__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      return true;
    }
    case 1: {
      return false;
    }
  }
}
function HashSet__Remove_2B595(this$, k) {
  const matchValue = HashSet__TryFindIndex_2B595(this$, k);
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[2] > -1) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      getItemFromDict(this$.hashMap, matchValue[1]).splice(matchValue[2], 1);
      return true;
    }
    case 1: {
      return false;
    }
  }
}

// Fibonacci/.fable/fable-library.3.1.5/List.js
function empty() {
  return new List();
}
function cons(x, xs) {
  return new List(x, xs);
}
function head(_arg1) {
  if (_arg1.tail != null) {
    return _arg1.head;
  } else {
    throw new Error("List was empty");
  }
}
function fold3(f_mut, state_mut, xs_mut) {
  fold:
    while (true) {
      const f = f_mut, state = state_mut, xs = xs_mut;
      if (xs.tail != null) {
        f_mut = f;
        state_mut = f(state, xs.head);
        xs_mut = xs.tail;
        continue fold;
      } else {
        return state;
      }
      break;
    }
}
function reverse(xs) {
  return fold3((acc, x) => new List(x, acc), new List(), xs);
}
function ofSeq(xs) {
  return reverse(fold((acc, x) => new List(x, acc), new List(), xs));
}

// ../Shared.fs.js
function fibonacci(n) {
  return head(fold3((acc, n_1) => {
    switch (n_1) {
      case 1:
      case 2: {
        return cons(1, acc);
      }
      default: {
        let pattern_matching_result, a, b;
        if (acc.tail != null) {
          if (acc.tail.tail != null) {
            pattern_matching_result = 0;
            a = acc.head;
            b = acc.tail.head;
          } else {
            pattern_matching_result = 1;
          }
        } else {
          pattern_matching_result = 1;
        }
        switch (pattern_matching_result) {
          case 0: {
            return cons(a + b, acc);
          }
          case 1: {
            return acc;
          }
        }
      }
    }
  }, empty(), ofSeq(rangeNumber(1, 1, n))));
}

// Fibonacci/Index.fs.js
function $007CValidInput$007C_$007C(n) {
  let matchValue;
  let outArg = 0;
  matchValue = [tryParse(n, 511, false, 32, new FSharpRef(() => outArg, (v) => {
    outArg = v;
  })), outArg];
  let pattern_matching_result;
  if (matchValue[0]) {
    if (matchValue[1] > 0) {
      pattern_matching_result = 0;
    } else {
      pattern_matching_result = 1;
    }
  } else {
    pattern_matching_result = 1;
  }
  switch (pattern_matching_result) {
    case 0: {
      return matchValue[1];
    }
    case 1: {
      return void 0;
    }
  }
}
function fn(context, req) {
  const res = {};
  const nParam = req.params["n"];
  const activePatternResult111 = $007CValidInput$007C_$007C(nParam);
  if (activePatternResult111 != null) {
    const n = activePatternResult111 | 0;
    context.log.info("Calculating Fibonacci for {n}");
    res.status = 200;
    res.body = int32ToString(fibonacci(n));
  } else {
    context.log.warn(toText(interpolate("Invalid n: %P()", [nParam])));
    res.status = 400;
    res.body = toText(interpolate("Value for n ('%P()') could not be parsed", [nParam]));
  }
  context.res = res;
  context.done();
}
var Index_fs_default = (delegateArg0, delegateArg1) => {
  fn(delegateArg0, delegateArg1);
};
