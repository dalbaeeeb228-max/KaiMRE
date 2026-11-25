// KaiMRE engine (MRE/VXP runtime, unminified).
// This file is plain, formatted JavaScript so it can be read and reviewed.
// It runs inside a Web Worker and is loaded by index.html.
// Compatible with KaiOS 2.5 (Gecko 48): ES2015 syntax only, no optional chaining,
// no nullish coalescing, no BigInt, no async/await, no trailing commas in calls.
function __mulS64(D, O) {
  var Z = D < 0 != O < 0,
    ve = D < 0 ? -D : D,
    me = O < 0 ? -O : O,
    Pe = Math.floor(ve / 65536),
    pe = ve % 65536,
    Ne = Math.floor(me / 65536),
    Ie = me % 65536,
    Ye = pe * Ie,
    Je = pe * Ne,
    et = Pe * Ie,
    Fe = Pe * Ne,
    Oe = Je + et,
    xe = Ye + (Oe % 65536) * 65536,
    _e = xe % 4294967296,
    tt = Math.floor(xe / 4294967296),
    ce = Fe + Math.floor(Oe / 65536) + tt;
  if (Z) {
    var rt = _e === 0 ? 0 : 1;
    ((_e = -_e >>> 0), (ce = (-ce - rt) >>> 0));
  }
  return [ce >>> 0, _e >>> 0];
}
var __defProp = Object.defineProperty,
  __defProps = Object.defineProperties,
  __getOwnPropDescs = Object.getOwnPropertyDescriptors,
  __getOwnPropSymbols = Object.getOwnPropertySymbols,
  __hasOwnProp = Object.prototype.hasOwnProperty,
  __propIsEnum = Object.prototype.propertyIsEnumerable,
  __pow = Math.pow,
  __defNormalProp = (D, O, Z) =>
    O in D
      ? __defProp(D, O, { enumerable: !0, configurable: !0, writable: !0, value: Z })
      : (D[O] = Z),
  __spreadValues = (D, O) => {
    for (var Z in O || (O = {})) __hasOwnProp.call(O, Z) && __defNormalProp(D, Z, O[Z]);
    if (__getOwnPropSymbols)
      for (var Z of __getOwnPropSymbols(O)) __propIsEnum.call(O, Z) && __defNormalProp(D, Z, O[Z]);
    return D;
  },
  __spreadProps = (D, O) => __defProps(D, __getOwnPropDescs(O)),
  __publicField = (D, O, Z) => __defNormalProp(D, typeof O != "symbol" ? O + "" : O, Z);
(() => {
  var D = {
      DEV: 1,
      APP_ID: 2,
      CERT_ID: 3,
      NAME: 4,
      VER: 5,
      MEM_REQ: 15,
      RESOLUTION_REQ: 16,
      COMPILER: 21,
      NAME_LIST: 25,
      FILE_TYPE: 33,
      RO_RW_ZIP: 34,
      CHARSET: 35,
    },
    O = 800,
    Z = 240,
    ve = 320;
  function me(e, t) {
    return (e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24)) >>> 0;
  }
  function Pe(e) {
    let t = { offset: 0, map: new Map(), error: "" },
      r = e.length;
    if (r < 12) return ((t.error = "too-small"), t);
    let s = me(e, r - 12);
    t.offset = s;
    let i = s,
      a = 4294967295,
      n = 0;
    for (; a !== 0 && n++ < 64; ) {
      if (i + 8 > r) return ((t.error = `truncated@0x${i.toString(16)}`), t);
      a = me(e, i);
      let h = me(e, i + 4);
      if (((i += 8), a === 0)) break;
      if (i + h > r) return ((t.error = `oversize id=${a} @0x${i.toString(16)}`), t);
      (t.map.set(a, e.slice(i, i + h)), (i += h));
    }
    return (a !== 0 && (t.error = "no-terminator"), t);
  }
  function pe(e, t) {
    let r = e.map.get(t);
    return r && r.length === 4 ? me(r, 0) : 0;
  }
  function Ne(e) {
    let t = pe(e, D.MEM_REQ);
    return t === 0 ? O : t;
  }
  function Ie(e) {
    let t = pe(e, D.RESOLUTION_REQ);
    if (t === 0) return { w: Z, h: ve };
    let r = (t >>> 16) & 65535,
      s = t & 65535;
    return r === 0 || s === 0 || r > 2048 || s > 2048 ? { w: Z, h: ve } : { w: r, h: s };
  }
  function Ye(e) {
    return pe(e, D.FILE_TYPE);
  }
  function Je(e) {
    return pe(e, D.RO_RW_ZIP);
  }
  function et(e, t, r) {
    if (e.error) return "TAGERR";
    let s = Ye(e);
    return e.map.has(D.FILE_TYPE) && (s === 0 || s === 1 || s === 5)
      ? Je(e) !== 0
        ? "ADS_ZIPPED"
        : t
          ? "ADS_ELF"
          : r
            ? "ADS_RAW_ZLIB"
            : "ADS_RAW"
      : t
        ? "GCC_ELF"
        : r
          ? "GCC_ZLIB_ELF"
          : "OTHER";
  }
  var Fe = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131,
      163, 195, 227, 258,
    ],
    Oe = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
    xe = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537,
      2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
    ],
    _e = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13,
      13,
    ],
    tt = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  function ce(e, t) {
    if (t < 0 || t + 2 > e.length) return !1;
    let r = e[t],
      s = e[t + 1];
    return (r & 15) === 8 && ((r << 8) + s) % 31 === 0;
  }
  function rt(e) {
    let t = 1,
      r = 0,
      s = 0;
    for (; s < e.length; ) {
      let i = Math.min(5552, e.length - s),
        a = s + i;
      for (; s < a; s++) ((t += e[s]), (r += t));
      ((t %= 65521), (r %= 65521));
    }
    return ((r << 16) | t) >>> 0;
  }
  var Me = class {
      constructor(e, t) {
        (__publicField(this, "counts", new Int32Array(16)), __publicField(this, "symbols"));
        for (let i = 0; i < t; i++) this.counts[e[i]]++;
        this.counts[0] = 0;
        let r = new Int32Array(16),
          s = 0;
        for (let i = 1; i < 16; i++) ((r[i] = s), (s += this.counts[i]));
        this.symbols = new Int32Array(s);
        for (let i = 0; i < t; i++) e[i] !== 0 && (this.symbols[r[e[i]]++] = i);
      }
    },
    Cr = class {
      constructor(e, t) {
        (__publicField(this, "acc", 0),
          __publicField(this, "nbits", 0),
          (this.src = e),
          (this.pos = t));
      }
      bits(e) {
        for (; this.nbits < e; ) {
          if (this.pos >= this.src.length) throw new Error("inflate: input truncated");
          ((this.acc |= this.src[this.pos++] << this.nbits), (this.nbits += 8));
        }
        let t = this.acc & ((1 << e) - 1);
        return ((this.acc >>>= e), (this.nbits -= e), t);
      }
      alignByte() {
        ((this.acc = 0), (this.nbits = 0));
      }
      byte() {
        if (this.pos >= this.src.length) throw new Error("inflate: input truncated");
        return this.src[this.pos++];
      }
    };
  function it(e, t) {
    let r = 0,
      s = 0,
      i = 0;
    for (let a = 1; a <= 15; a++) {
      r |= e.bits(1);
      let n = t.counts[a];
      if (r - n < s) return t.symbols[i + (r - s)];
      ((i += n), (s += n), (s <<= 1), (r <<= 1));
    }
    return -1;
  }
  function Ct(e, t = 0, r = 64 * 1024 * 1024) {
    if (!ce(e, t) || (e[t + 1] & 32) !== 0) return null;
    try {
      let s = new Cr(e, t + 2),
        i = new Uint8Array(Math.min(r, 65536)),
        a = 0,
        n = (d) => {
          if (a + d <= i.length) return;
          let c = i.length;
          for (; c < a + d; ) c *= 2;
          if (c > r) throw new Error("inflate: output exceeds safety limit");
          let _ = new Uint8Array(c);
          (_.set(i.subarray(0, a)), (i = _));
        },
        h = 0;
      do {
        h = s.bits(1);
        let d = s.bits(2);
        if (d === 0) {
          s.alignByte();
          let m = s.byte() | (s.byte() << 8),
            y = s.byte() | (s.byte() << 8);
          if (((m ^ 65535) & 65535) !== y) throw new Error("inflate: bad stored block length");
          n(m);
          for (let w = 0; w < m; w++) i[a++] = s.byte();
          continue;
        }
        if (d === 3) throw new Error("inflate: bad block type");
        let c, _;
        if (d === 1) {
          let m = new Uint8Array(288),
            y = new Uint8Array(30);
          for (let w = 0; w < 144; w++) m[w] = 8;
          for (let w = 144; w < 256; w++) m[w] = 9;
          for (let w = 256; w < 280; w++) m[w] = 7;
          for (let w = 280; w < 288; w++) m[w] = 8;
          (y.fill(5), (c = new Me(m, 288)), (_ = new Me(y, 30)));
        } else {
          let m = s.bits(5) + 257,
            y = s.bits(5) + 1,
            w = s.bits(4) + 4,
            g = new Uint8Array(19);
          for (let z = 0; z < w; z++) g[tt[z]] = s.bits(3);
          let b = new Me(g, 19),
            x = new Uint8Array(m + y),
            k = m + y,
            C = 0;
          for (; C < k; ) {
            let z = it(s, b);
            if (z < 0) throw new Error("inflate: bad code-length symbol");
            if (z < 16) {
              x[C++] = z;
              continue;
            }
            if (z === 16) {
              if (C === 0) throw new Error("inflate: repeat with no prior length");
              let E = x[C - 1],
                B = 3 + s.bits(2);
              for (let S = 0; S < B && C < k; S++) x[C++] = E;
            } else if (z === 17) {
              let E = 3 + s.bits(3);
              for (let B = 0; B < E && C < k; B++) x[C++] = 0;
            } else {
              let E = 11 + s.bits(7);
              for (let B = 0; B < E && C < k; B++) x[C++] = 0;
            }
          }
          if (x[256] === 0) throw new Error("inflate: no end-of-block code");
          ((c = new Me(x.subarray(0, m), m)), (_ = new Me(x.subarray(m), y)));
        }
        for (;;) {
          let m = it(s, c);
          if (m < 0) throw new Error("inflate: bad literal symbol");
          if (m < 256) {
            (n(1), (i[a++] = m));
            continue;
          }
          if (m === 256) break;
          let y = m - 257;
          if (y >= Fe.length) throw new Error("inflate: bad length symbol");
          let w = Fe[y] + s.bits(Oe[y]),
            g = it(s, _);
          if (g < 0 || g >= xe.length) throw new Error("inflate: bad distance symbol");
          let b = xe[g] + s.bits(_e[g]);
          if (b > a) throw new Error("inflate: distance beyond output");
          n(w);
          for (let x = 0; x < w; x++) ((i[a] = i[a - b]), a++);
        }
      } while (!h);
      s.alignByte();
      let u = i.subarray(0, a);
      if (s.pos + 4 > e.length) throw new Error("inflate: missing adler32");
      if (
        ((e[s.pos] << 24) | (e[s.pos + 1] << 16) | (e[s.pos + 2] << 8) | e[s.pos + 3]) >>> 0 !==
        rt(u)
      )
        throw new Error("inflate: adler32 mismatch");
      let f = s.pos + 4;
      return { compressedOffset: t, compressedSize: f - t, bytes: u.slice() };
    } catch (s) {
      return null;
    }
  }
  function Et(e, t) {
    return e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24) | 0;
  }
  function At(e, t = 0) {
    if (t < 0 || t + 6 > e.length) return !1;
    let r = e[t];
    if (r >= 225 || r % 9 > 8 || Math.floor(r / 9) % 5 > 4 || Math.floor(r / 45) > 4) return !1;
    let s = Et(e, t + 1) >>> 0;
    return s >= 1 && s <= 67108864;
  }
  function St(e, t) {
    let r = Math.max(0, Math.min(t, e.length));
    for (; r < e.length && e[r] === 0; ) r++;
    return r;
  }
  function Bt(e, t = 0, r = 134217728) {
    if (!At(e, t)) return null;
    let s = Rt(e, t, t + 5, r);
    if (s !== null) return s;
    if (t + 14 > e.length) return null;
    let i = 0;
    for (let n = 0; n < 8; n++) i += e[t + 5 + n] * __pow(2, 8 * n);
    let a = i <= 0 || i > r ? -1 : i;
    return Rt(e, t, t + 13, r, a);
  }
  function Rt(e, t, r, s, i = -1) {
    if (r < 0 || r + 6 > e.length) return null;
    try {
      let a = e[t],
        n = a % 9,
        h = Math.floor(a / 9) % 5,
        u = Math.floor(a / 45);
      if (u > 4 || h > 4 || n > 8) throw new Error("LZMA bad properties");
      let f = Et(e, t + 1) >>> 0;
      if (f < 1 || f > 67108864) throw new Error("LZMA bad dictionary size");
      let d = new Br(n, h, u, f, s);
      return { bytes: d.decode(e, r, i), nextInputOffset: d.inputConsumed };
    } catch (a) {
      return null;
    }
  }
  var Er = class {
      constructor(e) {
        (__publicField(this, "buf"),
          __publicField(this, "n", 0),
          (this.buf = new Uint8Array(Math.max(1024, Math.min(e, 65536)))));
      }
      get size() {
        return this.n;
      }
      write(e) {
        if (this.n === this.buf.length) {
          let t = new Uint8Array(this.buf.length * 2);
          (t.set(this.buf), (this.buf = t));
        }
        this.buf[this.n++] = e & 255;
      }
      toBytes() {
        return this.buf.slice(0, this.n);
      }
    },
    Ar = class {
      constructor(e, t) {
        (__publicField(this, "pos"),
          __publicField(this, "range", -1),
          __publicField(this, "code", 0),
          (this.input = e),
          (this.pos = t));
      }
      init() {
        if (this.input[this.pos] !== 0)
          throw new Error("LZMA range coder must start with zero byte");
        (this.pos++, (this.code = 0));
        for (let e = 0; e < 4; e++) {
          if (this.pos >= this.input.length) throw new Error("LZMA header truncated");
          this.code = (this.code << 8) | this.input[this.pos++] | 0;
        }
      }
      normalize() {
        if ((this.range & 4278190080) === 0) {
          if (this.pos >= this.input.length) throw new Error("LZMA stream truncated");
          ((this.range = (this.range << 8) | 0),
            (this.code = (this.code << 8) | this.input[this.pos++] | 0));
        }
      }
      decodeBit(e, t) {
        let r = e[t] & 65535,
          s = (((this.range >>> 11) * r) >>> 0) | 0;
        return this.code >>> 0 < s >>> 0
          ? ((this.range = s), (e[t] = (r + ((2048 - r) >>> 5)) & 65535), this.normalize(), 0)
          : ((this.range = (this.range - s) | 0),
            (this.code = (this.code - s) | 0),
            (e[t] = (r - (r >>> 5)) & 65535),
            this.normalize(),
            1);
      }
      decodeDirectBits(e) {
        let t = 0;
        for (let r = 0; r < e; r++) {
          this.range = this.range >>> 1;
          let s = (this.code - this.range) >>> 31;
          ((this.code = (this.code - (this.range & (s - 1))) | 0),
            (t = (t << 1) | (1 - s) | 0),
            this.normalize());
        }
        return t;
      }
    },
    ke = class {
      constructor(e) {
        (__publicField(this, "probs"),
          (this.numBitLevels = e),
          (this.probs = new Int32Array(1 << e).fill(1024)));
      }
      decode(e) {
        let t = 1;
        for (let r = 0; r < this.numBitLevels; r++) t = (t << 1) | e.decodeBit(this.probs, t);
        return t - (1 << this.numBitLevels);
      }
      reverseDecode(e) {
        let t = 1,
          r = 0;
        for (let s = 0; s < this.numBitLevels; s++) {
          let i = e.decodeBit(this.probs, t);
          ((t = (t << 1) | i), (r |= i << s));
        }
        return r;
      }
    },
    zt = class {
      constructor() {
        (__publicField(this, "choice", new Int32Array(2).fill(1024)),
          __publicField(this, "lowCoder", []),
          __publicField(this, "midCoder", []),
          __publicField(this, "highCoder", new ke(8)));
        for (let e = 0; e < 16; e++) (this.lowCoder.push(new ke(3)), this.midCoder.push(new ke(3)));
      }
      decode(e, t) {
        return e.decodeBit(this.choice, 0) === 0
          ? this.lowCoder[t].decode(e)
          : e.decodeBit(this.choice, 1) === 0
            ? 8 + this.midCoder[t].decode(e)
            : 16 + this.highCoder.decode(e);
      }
    },
    Sr = class {
      constructor(e, t) {
        (__publicField(this, "posMask"),
          __publicField(this, "lc"),
          __publicField(this, "coders", []),
          (this.posMask = (1 << e) - 1),
          (this.lc = t));
        let r = 1 << (e + t);
        for (let s = 0; s < r; s++) this.coders.push(new Int32Array(768).fill(1024));
      }
      probsFor(e, t) {
        return this.coders[((e & this.posMask) << this.lc) + ((t & 255) >>> (8 - this.lc))];
      }
      decodeNormal(e, t, r) {
        let s = this.probsFor(t, r),
          i = 1;
        for (let a = 0; a < 8; a++) i = (i << 1) | e.decodeBit(s, i);
        return i & 255;
      }
      decodeWithMatchByte(e, t, r, s) {
        let i = this.probsFor(t, r),
          a = 1,
          n = s;
        for (let h = 7; h >= 0; h--) {
          let u = (n >> 7) & 1;
          n <<= 1;
          let f = e.decodeBit(i, ((1 + u) << 8) + a);
          if (((a = (a << 1) | f), f !== u)) {
            for (; a < 256; ) a = (a << 1) | e.decodeBit(i, a);
            break;
          }
        }
        return a & 255;
      }
    },
    Br = class {
      constructor(e, t, r, s, i) {
        (__publicField(this, "inputConsumed", -1),
          __publicField(this, "posStateMask"),
          __publicField(this, "isMatch", new Int32Array(192).fill(1024)),
          __publicField(this, "isRep", new Int32Array(12).fill(1024)),
          __publicField(this, "isRepG0", new Int32Array(12).fill(1024)),
          __publicField(this, "isRepG1", new Int32Array(12).fill(1024)),
          __publicField(this, "isRepG2", new Int32Array(12).fill(1024)),
          __publicField(this, "isRep0Long", new Int32Array(192).fill(1024)),
          __publicField(this, "posSlotDecoder", []),
          __publicField(this, "posDecoders", new Int32Array(114).fill(1024)),
          __publicField(this, "alignDecoder", new ke(4)),
          __publicField(this, "lenDecoder", new zt()),
          __publicField(this, "repLenDecoder", new zt()),
          __publicField(this, "literalDecoder"),
          __publicField(this, "dict"),
          __publicField(this, "dictPos", 0),
          __publicField(this, "out"),
          __publicField(this, "maxOutput"),
          (this.posStateMask = (1 << r) - 1));
        for (let a = 0; a < 4; a++) this.posSlotDecoder.push(new ke(6));
        ((this.literalDecoder = new Sr(t, e)),
          (this.dict = new Uint8Array(s)),
          (this.out = new Er(i)),
          (this.maxOutput = i));
      }
      dictGet(e) {
        let t = this.dict.length;
        return this.dict[(this.dictPos - e - 1 + t) % t];
      }
      reverseDecode(e, t, r, s) {
        let i = 1,
          a = 0;
        for (let n = 0; n < s; n++) {
          let h = r.decodeBit(e, t + i);
          ((i = (i << 1) | h), (a |= h << n));
        }
        return a;
      }
      dictPut(e) {
        ((this.dict[this.dictPos] = e & 255),
          this.dictPos++,
          this.dictPos === this.dict.length && (this.dictPos = 0),
          this.out.write(e));
      }
      decode(e, t, r) {
        let s = new Ar(e, t);
        s.init();
        let i = this.dict.length,
          a = 0,
          n = 0,
          h = 0,
          u = 0,
          f = 0,
          d = 0;
        for (; r < 0 || d < r; ) {
          if (this.out.size > this.maxOutput) throw new Error("LZMA output exceeds cap");
          let c = d & this.posStateMask;
          if (s.decodeBit(this.isMatch, (a << 4) + c) === 0) {
            let _ = d === 0 ? 0 : this.dict[(this.dictPos - 1 + i) % i],
              m =
                a >= 7
                  ? this.literalDecoder.decodeWithMatchByte(
                      s,
                      d,
                      _,
                      this.dict[(this.dictPos - n - 1 + i) % i]
                    )
                  : this.literalDecoder.decodeNormal(s, d, _);
            (this.dictPut(m), d++, (a = a < 4 ? 0 : a < 10 ? a - 3 : a - 6));
          } else {
            let _;
            if (s.decodeBit(this.isRep, a) === 1) {
              if (((_ = 0), s.decodeBit(this.isRepG0, a) === 0))
                s.decodeBit(this.isRep0Long, (a << 4) + c) === 0 && ((a = a < 7 ? 9 : 11), (_ = 1));
              else {
                let m;
                (s.decodeBit(this.isRepG1, a) === 0
                  ? (m = h)
                  : (s.decodeBit(this.isRepG2, a) === 0 ? (m = u) : ((m = f), (f = u)), (u = h)),
                  (h = n),
                  (n = m));
              }
              _ === 0 && ((_ = 2 + this.repLenDecoder.decode(s, c)), (a = a < 7 ? 8 : 11));
            } else {
              ((f = u),
                (u = h),
                (h = n),
                (_ = 2 + this.lenDecoder.decode(s, c)),
                (a = a < 7 ? 7 : 10));
              let m = this.posSlotDecoder[_ < 6 ? _ - 2 : 3].decode(s);
              if (m >= 4) {
                let y = (m >> 1) - 1;
                ((n = ((2 | (m & 1)) << y) | 0),
                  m < 14
                    ? (n = (n + this.reverseDecode(this.posDecoders, n - m - 1, s, y)) | 0)
                    : ((n = (n + ((s.decodeDirectBits(y - 4) << 4) | 0)) | 0),
                      (n = (n + this.alignDecoder.reverseDecode(s)) | 0)));
              } else n = m;
              if (n >>> 0 === 4294967295) {
                if (r >= 0) throw new Error("LZMA EOS marker with known size");
                break;
              }
            }
            if (r >= 0 && d + _ > r) throw new Error("LZMA length overrun");
            if (n < 0 || n >= i || n >= d) throw new Error("LZMA invalid distance");
            for (let m = 0; m < _; m++) (this.dictPut(this.dictGet(n)), d++);
          }
        }
        return ((this.inputConsumed = s.pos), this.out.toBytes());
      }
    },
    st = class Le {
      constructor() {
        (__publicField(this, "regions", []),
          __publicField(this, "lowPage", new Uint8Array(4096)),
          __publicField(this, "mappedBytesTotal", 0),
          __publicField(this, "last", null));
      }
      map(t, r, s, i, a) {
        if (r <= 0) throw new Error("size must be > 0");
        if (r > 33554432) throw new Error("guest mapping exceeds region limit");
        if (this.mappedBytesTotal + r > 134217728)
          throw new Error("guest mappings exceed total limit");
        let n = t >>> 0,
          h = n + r;
        if (h > 4294967296) throw new Error("guest mapping wraps address space");
        for (let f of this.regions) {
          let d = f.start >>> 0,
            c = d + f.size;
          if (!(h <= d || n >= c))
            throw new Error(
              `guest mapping overlaps @0x${n.toString(16)} size=${r} with @0x${d.toString(16)} size=${f.size}`
            );
        }
        let u = {
          start: t | 0,
          size: r,
          readable: s,
          writable: i,
          executable: a,
          data: new Uint8Array(r),
        };
        return (
          this.regions.push(u),
          this.regions.sort((f, d) => (f.start >>> 0) - (d.start >>> 0)),
          (this.mappedBytesTotal += r),
          u
        );
      }
      static contains(t, r, s) {
        return s < 0 || s > t.size ? !1 : (r - t.start) >>> 0 <= (t.size - s) >>> 0;
      }
      find(t, r) {
        if (r < 0) return null;
        let s = this.last;
        if (s !== null && Le.contains(s, t, r)) return s;
        for (let i of this.regions) if (Le.contains(i, t, r)) return ((this.last = i), i);
        return null;
      }
      hasRealMapping(t, r) {
        let s = this.last;
        if (s !== null && Le.contains(s, t, r)) return !0;
        for (let i of this.regions) if (Le.contains(i, t, r)) return !0;
        return !1;
      }
      isMapped(t, r = 1) {
        if (this.hasRealMapping(t, r)) return !0;
        let s = t >>> 0;
        return r >= 0 && s + r <= 4096;
      }
      off(t, r) {
        return (r - t.start) | 0;
      }
      read8(t) {
        let r = this.find(t, 1);
        if (r !== null) {
          if (!r.readable) throw new Error(`Read protect @0x${(t >>> 0).toString(16)}`);
          return r.data[this.off(r, t)];
        }
        let s = t >>> 0;
        if (s < 4096) return this.lowPage[s];
        throw new Error(`Unmapped read @0x${s.toString(16)}`);
      }
      read16(t) {
        let r = this.find(t, 2);
        if (r !== null) {
          if (!r.readable) throw new Error(`Read protect @0x${(t >>> 0).toString(16)}`);
          let s = this.off(r, t);
          return r.data[s] | (r.data[s + 1] << 8);
        }
        return this.read8(t) | (this.read8(t + 1) << 8);
      }
      read32(t) {
        let r = this.find(t, 4);
        if (r !== null) {
          if (!r.readable) throw new Error(`Read protect @0x${(t >>> 0).toString(16)}`);
          let s = this.off(r, t),
            i = r.data;
          return i[s] | (i[s + 1] << 8) | (i[s + 2] << 16) | (i[s + 3] << 24) | 0;
        }
        return (
          this.read8(t) |
          (this.read8(t + 1) << 8) |
          (this.read8(t + 2) << 16) |
          (this.read8(t + 3) << 24) |
          0
        );
      }
      write8(t, r, s = !1) {
        let i = this.find(t, 1);
        if (i !== null) {
          if (!s && !i.writable) throw new Error(`Write protect @0x${(t >>> 0).toString(16)}`);
          i.data[this.off(i, t)] = r & 255;
          return;
        }
        let a = t >>> 0;
        if (a < 4096) {
          this.lowPage[a] = r & 255;
          return;
        }
        throw new Error(`Unmapped write @0x${a.toString(16)}`);
      }
      write16(t, r, s = !1) {
        let i = this.find(t, 2);
        if (i !== null) {
          if (!s && !i.writable) throw new Error(`Write protect @0x${(t >>> 0).toString(16)}`);
          let a = this.off(i, t);
          ((i.data[a] = r & 255), (i.data[a + 1] = (r >>> 8) & 255));
          return;
        }
        (this.write8(t, r, s), this.write8(t + 1, r >>> 8, s));
      }
      write32(t, r, s = !1) {
        let i = this.find(t, 4);
        if (i !== null) {
          if (!s && !i.writable) throw new Error(`Write protect @0x${(t >>> 0).toString(16)}`);
          let a = this.off(i, t),
            n = i.data;
          ((n[a] = r & 255),
            (n[a + 1] = (r >>> 8) & 255),
            (n[a + 2] = (r >>> 16) & 255),
            (n[a + 3] = (r >>> 24) & 255));
          return;
        }
        (this.write8(t, r, s),
          this.write8(t + 1, r >>> 8, s),
          this.write8(t + 2, r >>> 16, s),
          this.write8(t + 3, r >>> 24, s));
      }
      readBytes(t, r) {
        let s = this.find(t, r);
        if (s !== null) return s.data.subarray(this.off(s, t), this.off(s, t) + r).slice();
        let i = new Uint8Array(r);
        for (let a = 0; a < r; a++) i[a] = this.read8(t + a);
        return i;
      }
      writeBytes(t, r, s = 0, i = r.length - s, a = !1) {
        let n = this.find(t, i);
        if (n === null)
          throw new Error(`Unmapped guest memory @0x${(t >>> 0).toString(16)} size=${i}`);
        if (!a && !n.writable)
          throw new Error(`Write protection fault @0x${(t >>> 0).toString(16)}`);
        n.data.set(r.subarray(s, s + i), this.off(n, t));
      }
      readCString(t, r = 256) {
        let s = "";
        for (let i = 0; i < r; i++) {
          let a = this.read8(t + i);
          if (a === 0) break;
          s += String.fromCharCode(a);
        }
        return s;
      }
      fillBytes(t, r, s, i = !1) {
        if (s <= 0) return;
        let a = this.find(t, s);
        if (a !== null) {
          if (!i && !a.writable)
            throw new Error(`Write protection fault @0x${(t >>> 0).toString(16)}`);
          a.data.fill(r & 255, this.off(a, t), this.off(a, t) + s);
          return;
        }
        for (let n = 0; n < s; n++) this.write8(t + n, r, i);
      }
      copyBytes(t, r, s, i = !1) {
        s <= 0 || this.writeBytes(r, this.readBytes(t, s), 0, s, i);
      }
    };
  function lt(e, t) {
    return (e + t - 1) & -t;
  }
  var Rr = 2e7,
    zr = 8e7,
    Lt = 8e3;
  function at(e, t) {
    let r = t & 31,
      s = e >>> 0;
    return r === 0 ? s : ((s >>> r) | (s << (32 - r))) >>> 0;
  }
  var Lr = class {
      constructor(e) {
        (__publicField(this, "r", new Int32Array(16)),
          __publicField(this, "n", !1),
          __publicField(this, "z", !1),
          __publicField(this, "c", !1),
          __publicField(this, "v", !1),
          __publicField(this, "thumb", !0),
          __publicField(this, "halted", !1),
          __publicField(this, "instructions", 0),
          __publicField(this, "apiCalls", 0),
          __publicField(this, "exitRequested", !1),
          __publicField(this, "maxIns", 2e6),
          __publicField(this, "haltAddr", 16842748),
          __publicField(this, "apiBase", 16777216),
          __publicField(this, "apiEnd", 16842748),
          __publicField(this, "onApiCall", null),
          __publicField(this, "fault", null),
          __publicField(this, "unknownCount", 0),
          __publicField(this, "semihostingExitAsReturn", !1),
          __publicField(this, "onExit", null),
          (this.mem = e));
      }
      reset(e) {
        (this.r.fill(0),
          this.jump(e),
          (this.r[13] = 68157424),
          (this.r[14] = 0),
          (this.halted = !1),
          (this.exitRequested = !1),
          (this.instructions = 0),
          (this.apiCalls = 0),
          (this.fault = null),
          (this.unknownCount = 0),
          (this.n = this.z = this.c = this.v = !1));
      }
      jump(e) {
        ((this.thumb = (e & 1) === 1), (this.r[15] = (e & -2) | 0));
      }
      setPc(e) {
        this.r[15] = (e & -2) | 0;
      }
      isApi(e) {
        let t = e >>> 0;
        return t >= this.apiBase >>> 0 && t < this.apiEnd >>> 0 && (t & 3) === 0;
      }
      setNZ(e) {
        ((this.n = (e | 0) < 0), (this.z = (e | 0) === 0));
      }
      addWithCarry(e, t, r) {
        let s = (e >>> 0) + (t >>> 0) + (r & 1),
          i = s | 0;
        return (
          (this.c = s > 4294967295),
          (this.v = (((e ^ i) & (t ^ i)) | 0) < 0),
          this.setNZ(i),
          i
        );
      }
      subWithCarry(e, t, r) {
        return this.addWithCarry(e, (~t | 0) >>> 0, r & 1);
      }
      arg(e) {
        return e < 4 ? this.r[e] | 0 : this.mem.read32((this.r[13] | 0) + ((e - 4) << 2));
      }
      callGuest(e, t, r, s, i = 0) {
        if ((e | 0) === 0) throw new Error("Guest function address is null");
        let a = this.r[15] | 0,
          n = this.r[14] | 0,
          h = this.thumb,
          u = this.halted,
          f = this.instructions,
          d = this.fault;
        for (let b = 0; b < 4; b++) this.r[b] = (b < t.length ? t[b] : 0) | 0;
        ((this.r[14] = this.haltAddr),
          (this.thumb = (e & 1) === 1),
          (this.r[15] = (e & -2) | 0),
          (this.halted = !1),
          (this.fault = null));
        let c = r >= Rr,
          _ = c ? Math.min(zr, r * 4) : r,
          m = r,
          y = 0,
          w = f;
        for (
          ;
          !this.halted && !this.exitRequested && ((this.r[15] | 0) & -2) !== (this.haltAddr | 0);
        ) {
          if (this.instructions - f >= m) {
            if (!c || m >= _) {
              ((this.fault = {
                kind: "budget",
                pc: this.r[15] | 0,
                word: 0,
                detail: `callback limit ${m} function=0x${(e >>> 0).toString(16)}`,
              }),
                (this.exitRequested = !0));
              break;
            }
            let b = Date.now();
            if (y === 0) y = b + Lt;
            else if (b >= y) {
              ((this.fault = {
                kind: "budget",
                pc: this.r[15] | 0,
                word: 0,
                detail: `callback wall watchdog ${Lt}ms after soft limit function=0x${(e >>> 0).toString(16)}`,
              }),
                (this.exitRequested = !0));
              break;
            }
            m = Math.min(_, m + r);
            continue;
          }
          if (s && i > 0 && this.instructions - w >= i && ((w = this.instructions), s(this))) break;
          this.step();
        }
        let g = this.r[0] | 0;
        return (
          this.exitRequested
            ? this.instructions === f && !this.fault && (this.fault = d)
            : ((this.r[15] = a),
              (this.r[14] = n),
              (this.thumb = h),
              (this.halted = u),
              this.fault || (this.fault = d)),
          g
        );
      }
      run(e = this.maxIns) {
        for (this.maxIns = e; !this.halted && !this.exitRequested && this.instructions < e; )
          this.step();
        !this.halted &&
          !this.exitRequested &&
          !this.fault &&
          ((this.fault = { kind: "budget", pc: this.r[15] | 0, word: 0, detail: `maxIns=${e}` }),
          (this.exitRequested = !0));
      }
      step() {
        if (this.exitRequested) return !1;
        let e = this.r[15] | 0;
        if (e >>> 0 === this.haltAddr >>> 0) return ((this.exitRequested = !0), !1);
        if (this.isApi(e))
          return (
            (!this.onApiCall || !this.onApiCall(e)) && (this.r[0] = 0),
            this.apiCalls++,
            this.instructions++,
            this.halted || this.jump(this.r[14] | 0),
            !0
          );
        if (e >= 0 && e < 65536 && !this.mem.hasRealMapping(e & -2, 4)) {
          let t = this.r[14] | 0,
            r = (t & -2) | 0;
          return (
            r >= 0 && r < 65536 && !this.mem.hasRealMapping(r, 4)
              ? (this.halted = !0)
              : ((this.thumb = (t & 1) === 1), (this.r[15] = r)),
            this.instructions++,
            !0
          );
        }
        try {
          this.thumb ? this.stepThumb(e) : this.stepArm(e);
        } catch (t) {
          return (
            (this.fault = {
              kind: "unmapped",
              pc: e,
              word: 0,
              detail: t instanceof Error ? t.message : String(t),
            }),
            (this.exitRequested = !0),
            !1
          );
        }
        return (this.instructions++, !0);
      }
      condOk(e) {
        switch (e) {
          case 0:
            return this.z;
          case 1:
            return !this.z;
          case 2:
            return this.c;
          case 3:
            return !this.c;
          case 4:
            return this.n;
          case 5:
            return !this.n;
          case 6:
            return this.v;
          case 7:
            return !this.v;
          case 8:
            return this.c && !this.z;
          case 9:
            return !this.c || this.z;
          case 10:
            return this.n === this.v;
          case 11:
            return this.n !== this.v;
          case 12:
            return !this.z && this.n === this.v;
          case 13:
            return this.z || this.n !== this.v;
          default:
            return !0;
        }
      }
      fail(e, t, r) {
        (this.unknownCount++,
          (this.fault = { kind: "undefined", pc: e, word: t, detail: r }),
          (this.exitRequested = !0));
      }
      read32Safe(e, t) {
        try {
          return this.mem.read32(e) | 0;
        } catch (r) {
          return t;
        }
      }
      semihosting() {
        let e = this.r[0] | 0,
          t = this.r[1] | 0;
        switch (e) {
          case 1: {
            let r = this.read32Safe(t, 0),
              s = Math.min(Math.max(this.read32Safe(t + 8, 0), 0), 256),
              i = "";
            if (r !== 0 && s > 0)
              try {
                for (let a = 0; a < s; a++) i += String.fromCharCode(this.mem.read8(r + a));
              } catch (a) {
                i = "";
              }
            this.r[0] = i === ":tt" ? 1 : -1;
            return;
          }
          case 2:
            this.r[0] = 0;
            return;
          case 3:
          case 4:
            this.r[0] = 0;
            return;
          case 5: {
            let r = this.read32Safe(t, -1),
              s = Math.max(this.read32Safe(t + 8, 0), 0);
            this.r[0] = r === 1 || r === 2 ? 0 : s;
            return;
          }
          case 6:
            this.r[0] = Math.max(this.read32Safe(t + 8, 0), 0);
            return;
          case 7:
            this.r[0] = -1;
            return;
          case 8:
            this.r[0] = t < 0 ? 1 : 0;
            return;
          case 9:
            this.r[0] = t === 1 || t === 2 ? 1 : 0;
            return;
          case 10:
          case 12:
          case 14:
          case 15:
          case 18:
            this.r[0] = -1;
            return;
          case 16:
            this.r[0] = (Math.floor(Date.now() / 10) & 2147483647) | 0;
            return;
          case 17:
            this.r[0] = Math.min(Math.floor(Date.now() / 1e3), 2147483647) | 0;
            return;
          case 19:
            this.r[0] = 0;
            return;
          case 21: {
            let r = this.read32Safe(t, 0);
            try {
              r !== 0 && this.mem.write8(r, 0);
            } catch (s) {}
            try {
              this.mem.write32(t + 4, 0);
            } catch (s) {}
            this.r[0] = 0;
            return;
          }
          case 24:
          case 32:
            (this.semihostingExitAsReturn
              ? (this.halted = !0)
              : this.onExit
                ? this.onExit(0)
                : (this.exitRequested = !0),
              (this.r[0] = 0));
            return;
          case 48: {
            let r = Date.now();
            try {
              (this.mem.write32(t, r | 0), this.mem.write32(t + 4, Math.floor(r / 4294967296) | 0));
            } catch (s) {}
            this.r[0] = 0;
            return;
          }
          case 49:
            this.r[0] = 1e3;
            return;
          default:
            this.r[0] = -1;
            return;
        }
      }
      stepArm(e) {
        if ((e & 3) !== 0) {
          ((this.fault = { kind: "align", pc: e, word: 0, detail: "arm-fetch-unaligned" }),
            (this.exitRequested = !0));
          return;
        }
        let t = this.mem.read32(e) | 0,
          r = (e + 4) | 0,
          s = (t >>> 28) & 15;
        if (!this.condOk(s)) {
          this.r[15] = r;
          return;
        }
        let i = (t >>> 25) & 7;
        if (i === 5) {
          if (s === 15) {
            let h = ((t & 16777215) << 8) >> 8,
              u = (e + 8 + (h << 2) + (((t >>> 24) & 1) << 1)) | 0;
            ((this.r[14] = r), (this.thumb = !0), this.setPc(u));
            return;
          }
          let a = ((t & 16777215) << 8) >> 8,
            n = (e + 8 + (a << 2)) | 0;
          if (((t >>> 24) & 1) === 0) {
            this.r[15] = n;
            return;
          }
          ((this.r[14] = r | (this.thumb ? 1 : 0)), (this.r[15] = n));
          return;
        }
        if (i === 7) {
          if (((t >>> 24) & 15) === 15) {
            if ((t | 0) === -284019626) {
              (this.semihosting(), (this.r[15] = r));
              return;
            }
            ((this.fault = {
              kind: "swi",
              pc: e,
              word: t,
              detail: `swi 0x${(t & 16777215).toString(16)}`,
            }),
              (this.exitRequested = !0));
            return;
          }
          this.r[15] = r;
          return;
        }
        if (i === 6) {
          this.r[15] = r;
          return;
        }
        if (i === 4) {
          this.blockArm(e, t, r);
          return;
        }
        if (i === 2 || i === 3) {
          this.ldstArm(e, t, i === 3, r);
          return;
        }
        if (i === 0 || i === 1) {
          this.miscArm(e, t, r);
          return;
        }
        this.fail(e, t, `arm-class${i}`);
      }
      blockArm(e, t, r) {
        let s = (t >>> 24) & 1,
          i = (t >>> 23) & 1,
          a = (t >>> 21) & 1,
          n = (t >>> 20) & 1,
          h = (t >>> 16) & 15,
          u = [];
        for (let m = 0; m < 16; m++) (t >>> m) & 1 && u.push(m);
        if (u.length === 0) {
          this.r[15] = r;
          return;
        }
        let f = this.r[h] | 0,
          d = u.length * 4,
          c = (i === 1 ? (s === 1 ? f + 4 : f) : f - d) | 0;
        if (n)
          for (let m of u) {
            let y = this.mem.read32(c);
            (m === 15
              ? ((this.thumb = (y & 1) === 1), (this.r[15] = (y & -2) | 0))
              : (this.r[m] = y | 0),
              (c = (c + 4) | 0));
          }
        else
          for (let m of u)
            (this.mem.write32(c, m === 15 ? (e + 12) & -4 : this.r[m] | 0), (c = (c + 4) | 0));
        let _ = n === 1 && ((t >>> h) & 1) === 1;
        (a === 1 && !_ && (this.r[h] = (i === 1 ? f + d : f - d) | 0),
          (n === 1 && ((t >>> 15) & 1) === 1) || (this.r[15] = r));
      }
      ldstArm(e, t, r, s) {
        let i = (t >>> 24) & 1,
          a = (t >>> 23) & 1,
          n = (t >>> 22) & 1,
          h = (t >>> 21) & 1,
          u = (t >>> 20) & 1,
          f = (t >>> 16) & 15,
          d = (t >>> 12) & 15,
          c;
        r ? (c = this.decodeShiftedRegister(e, t & 4095).v >>> 0) : (c = t & 4095);
        let _ = (a === 1 ? c : -c) | 0,
          m = f === 15 ? (e + 8) | 0 : this.r[f] | 0,
          y = (i === 1 ? (m + _) | 0 : m) | 0;
        if (((i === 0 || h === 1) && (this.r[f] = (m + _) | 0), u)) {
          let w = n ? this.mem.read8(y) : this.mem.read32(y);
          if (d === 15) {
            ((this.thumb = (w & 1) === 1), this.setPc(w));
            return;
          }
          this.r[d] = w | 0;
        } else
          n
            ? this.mem.write8(y, this.r[d])
            : this.mem.write32(y, d === 15 ? (e + 12) & -4 : this.r[d]);
        this.r[15] = s;
      }
      dataProcessing(e, t, r) {
        let s = (t >>> 21) & 15,
          i = (t & 1048576) !== 0,
          a = (t >>> 16) & 15,
          n = (t >>> 12) & 15,
          h = { n: this.n, z: this.z, c: this.c, v: this.v },
          u = this.c,
          f = a === 15 ? (e + 8) | 0 : this.r[a] | 0,
          d = this.operand2(e, t),
          c = d.v;
        d.c !== null && (this.c = d.c);
        let _ = u ? 1 : 0,
          m = 0,
          y = !0;
        switch (s) {
          case 0:
            ((m = (f & c) | 0), this.setNZ(m));
            break;
          case 1:
            ((m = (f ^ c) | 0), this.setNZ(m));
            break;
          case 2:
            m = this.subWithCarry(f, c, 1);
            break;
          case 3:
            m = this.subWithCarry(c, f, 1);
            break;
          case 4:
            m = this.addWithCarry(f, c, 0);
            break;
          case 5:
            m = this.addWithCarry(f, c, _);
            break;
          case 6:
            m = this.subWithCarry(f, c, _ ? 0 : 1);
            break;
          case 7:
            m = this.subWithCarry(c, f, _ ? 0 : 1);
            break;
          case 8:
            ((m = (f & c) | 0), this.setNZ(m), (y = !1));
            break;
          case 9:
            ((m = (f ^ c) | 0), this.setNZ(m), (y = !1));
            break;
          case 10:
            ((m = this.subWithCarry(f, c, 1)), (y = !1));
            break;
          case 11:
            ((m = this.addWithCarry(f, c, 0)), (y = !1));
            break;
          case 12:
            ((m = f | c | 0), this.setNZ(m));
            break;
          case 13:
            ((m = c | 0), this.setNZ(m));
            break;
          case 14:
            ((m = (f & ~c) | 0), this.setNZ(m));
            break;
          default:
            ((m = ~c | 0), this.setNZ(m));
            break;
        }
        if ((i || ((this.n = h.n), (this.z = h.z), (this.c = h.c), (this.v = h.v)), !y)) {
          this.r[15] = r;
          return;
        }
        if (n === 15) {
          this.r[15] = (m & -4) | 0;
          return;
        }
        ((this.r[n] = m | 0), (this.r[15] = r));
      }
      miscArm(e, t, r) {
        let s = (t >>> 16) & 15,
          i = (t >>> 12) & 15,
          a = (t >>> 8) & 15,
          n = t & 15,
          h = (t >>> 4) & 15;
        if ((t & 268435440) === 19922704) {
          this.jump(this.r[n] | 0);
          return;
        }
        if ((t & 268435440) === 19922736) {
          ((this.r[14] = r | (this.thumb ? 1 : 0)), this.jump(this.r[n] | 0));
          return;
        }
        if ((t & 263254016) === 16838656) {
          ((this.r[s] = this.cpsr() | 0), (this.r[15] = r));
          return;
        }
        if ((t & 263254016) === 18935808 || (t & 263254016) === 52490240) {
          let m = (t & 33554432) !== 0,
            y;
          if (m) {
            let w = ((t >>> 8) & 15) * 2;
            y = w === 0 ? t & 255 : at(t & 255, w) | 0;
          } else y = this.r[n] | 0;
          (this.setCpsr(y, s), (this.r[15] = r));
          return;
        }
        if ((t & 268374e3) === 24055568) {
          let m = this.r[n] | 0;
          ((this.r[i] = (m === 0 ? 32 : Math.clz32(m)) | 0), (this.r[15] = r));
          return;
        }
        if ((t & 33554432) !== 0) {
          this.dataProcessing(e, t, r);
          return;
        }
        {
          let m = t & 267387024;
          if (m === 16777344 || m === 20971648 || m === 23068800 || m === 18874496) {
            let y = (k, C) => (C ? k >> 16 : (k << 16) >> 16) | 0,
              w = t & 15,
              g = (t >>> 8) & 15,
              b = (t & 32) !== 0,
              x = (t & 64) !== 0;
            if (m === 16777344) {
              let k = (t >>> 16) & 15,
                C = (t >>> 12) & 15;
              this.r[k] = (y(this.r[w], b) * y(this.r[g], x) + (this.r[C] | 0)) | 0;
            } else if (m === 20971648) {
              let k = (t >>> 16) & 15,
                C = (t >>> 12) & 15,
                z = __mulS64(y(this.r[w], b), y(this.r[g], x)),
                E = (this.r[C] >>> 0) + z[1],
                B = (this.r[k] | 0) + z[0] + (E >= 4294967296 ? 1 : 0);
              ((this.r[C] = E | 0), (this.r[k] = B | 0));
            } else if (m === 23068800) {
              let k = (t >>> 16) & 15;
              this.r[k] = (y(this.r[w], b) * y(this.r[g], x)) | 0;
            } else {
              let k = (t >>> 16) & 15,
                C = (t >>> 12) & 15,
                z = __mulS64(this.r[w] | 0, y(this.r[g], x)),
                E = (z[1] >>> 16) | (z[0] << 16) | 0;
              this.r[k] = (t & 32) !== 0 ? E : (E + (this.r[C] | 0)) | 0;
            }
            this.r[15] = r;
            return;
          }
        }
        let u = (t >>> 24) & 1,
          f = (t >>> 23) & 1,
          d = (t >>> 22) & 1,
          c = (t >>> 21) & 1,
          _ = (t >>> 20) & 1;
        if (h === 9) {
          if (u === 1) {
            let k = this.r[s] | 0,
              C = d === 1 ? this.mem.read8(k) : this.mem.read32(k);
            (d === 1 ? this.mem.write8(k, this.r[n]) : this.mem.write32(k, this.r[n]),
              (this.r[i] = C | 0),
              (this.r[15] = r));
            return;
          }
          let m = (t >>> 21) & 7;
          if (m <= 1) {
            let k = Math.imul(this.r[n] | 0, this.r[a] | 0) | 0,
              C = m === 1 ? (k + (this.r[i] | 0)) | 0 : k;
            (s === 15 ? (this.r[15] = (C & -4) | 0) : (this.r[s] = C | 0),
              _ === 1 && this.setNZ(C),
              (this.r[15] = r));
            return;
          }
          if (m < 4) {
            this.fail(e, t, "arm-mul-undefined");
            return;
          }
          let y = (m & 2) !== 0,
            w = (m & 1) !== 0,
            g = __mulS64(y ? this.r[n] | 0 : this.r[n] >>> 0, y ? this.r[a] | 0 : this.r[a] >>> 0),
            b = g[1] >>> 0,
            x = g[0] >>> 0;
          if (w) {
            let k = (this.r[i] >>> 0) + b;
            ((b = k >>> 0), (x = ((this.r[s] >>> 0) + x + (k > 4294967295 ? 1 : 0)) >>> 0));
          }
          ((this.r[i] = b | 0),
            (this.r[s] = x | 0),
            _ === 1 && ((this.n = (x | 0) < 0), (this.z = b === 0 && x === 0)),
            (this.r[15] = r));
          return;
        }
        if ((h & 9) === 9) {
          let m = (t >>> 5) & 3,
            y = d === 1 ? (((t >>> 8) & 15) << 4) | (t & 15) : this.r[n] | 0,
            w = s === 15 ? (e + 8) | 0 : this.r[s] | 0,
            g = (f === 1 ? y : -y) | 0,
            b = (u === 1 ? (w + g) | 0 : w) | 0;
          if (
            (s !== 15 && (u === 0 ? (this.r[s] = (w + g) | 0) : c === 1 && (this.r[s] = b | 0)), _)
          ) {
            let x;
            if (
              (m === 1
                ? (x = this.mem.read16(b))
                : m === 2
                  ? (x = (this.mem.read8(b) << 24) >> 24)
                  : m === 3
                    ? (x = (this.mem.read16(b) << 16) >> 16)
                    : (x = 0),
              i === 15)
            ) {
              ((this.thumb = (x & 1) === 1), this.setPc(x));
              return;
            }
            this.r[i] = x | 0;
          } else if (m === 1) this.mem.write16(b, this.r[i]);
          else if (m === 2 || m === 3) {
            if (i >= 15) {
              this.fail(e, t, m === 2 ? "LDRD invalid Rd" : "STRD invalid Rd");
              return;
            }
            m === 2
              ? ((this.r[i] = this.mem.read32(b) | 0), (this.r[i + 1] = this.mem.read32(b + 4) | 0))
              : (this.mem.write32(b, this.r[i]), this.mem.write32(b + 4, this.r[i + 1]));
          } else {
            this.fail(e, t, "arm-half-undefined");
            return;
          }
          this.r[15] = r;
          return;
        }
        if ((t & 16) === 0 || (h & 8) === 0) {
          this.dataProcessing(e, t, r);
          return;
        }
        this.fail(e, t, "arm-undefined");
      }
      cpsr() {
        return (
          (this.n ? 2147483648 : 0) |
          (this.z ? 1073741824 : 0) |
          (this.c ? 536870912 : 0) |
          (this.v ? 268435456 : 0) |
          (this.thumb ? 32 : 0) |
          0
        );
      }
      setCpsr(e, t) {
        ((t & 8) !== 0 && (this.n = (e & 2147483648) !== 0),
          (t & 4) !== 0 && (this.z = (e & 1073741824) !== 0),
          (t & 2) !== 0 && (this.c = (e & 536870912) !== 0),
          (t & 1) !== 0 && (this.v = (e & 268435456) !== 0));
      }
      barrel(e, t, r, s) {
        let i = e >>> 0;
        switch ((!s && (t === 1 || t === 2) && r === 0 && (r = 32), t)) {
          case 0:
            return r === 0
              ? { v: e | 0, c: null }
              : r >= 32
                ? { v: 0, c: r === 32 ? (i & 1) !== 0 : !1 }
                : { v: (i << r) | 0, c: ((i >>> (32 - r)) & 1) !== 0 };
          case 1:
            return r === 0
              ? { v: e | 0, c: null }
              : r >= 32
                ? { v: 0, c: r === 32 ? i >>> 31 !== 0 : !1 }
                : { v: (i >>> r) | 0, c: ((i >>> (r - 1)) & 1) !== 0 };
          case 2:
            return r === 0
              ? { v: e | 0, c: null }
              : r >= 32
                ? { v: (i | 0) >> 31, c: i >>> 31 !== 0 }
                : { v: (i | 0) >> r, c: ((i >>> (r - 1)) & 1) !== 0 };
          default: {
            if (!s && r === 0)
              return { v: ((this.c ? 1 : 0) << 31) | (i >>> 1) | 0, c: (i & 1) !== 0 };
            let a = r & 31;
            return a === 0
              ? { v: e | 0, c: null }
              : { v: at(i, a) | 0, c: ((i >>> (a - 1)) & 1) !== 0 };
          }
        }
      }
      operand2(e, t) {
        if ((t & 33554432) !== 0) {
          let r = ((t >>> 8) & 15) * 2,
            s = t & 255;
          if (r === 0) return { v: s, c: null };
          let i = at(s, r);
          return { v: i | 0, c: i >>> 31 !== 0 };
        }
        return this.decodeShiftedRegister(e, t & 4095);
      }
      decodeShiftedRegister(e, t) {
        let r = t & 15,
          s = r === 15 ? (e + 8) | 0 : this.r[r] | 0,
          i = (t >>> 5) & 3;
        if ((t & 16) === 0) return this.barrel(s, i, (t >>> 7) & 31, !1);
        let a = (t >>> 8) & 15,
          n = a === 15 ? (e + 8) | 0 : this.r[a] | 0;
        return this.barrel(s, i, n & 255, !0);
      }
      stepThumb(e) {
        if ((e & 1) !== 0) {
          ((this.fault = { kind: "align", pc: e, word: 0, detail: "thumb-fetch-odd" }),
            (this.exitRequested = !0));
          return;
        }
        let t = this.mem.read16(e),
          r = this.r,
          s = (e + 2) | 0;
        if ((t & 63488) <= 4096) {
          let i = (t >>> 11) & 3,
            a = (t >>> 6) & 31,
            n = this.barrel(r[(t >>> 3) & 7] | 0, i, i === 0 ? a : a === 0 ? 32 : a, !1);
          ((r[t & 7] = n.v | 0), n.c !== null && (this.c = n.c), this.setNZ(n.v), (r[15] = s));
          return;
        }
        if ((t & 63488) === 6144) {
          let i = (t >>> 9) & 1,
            a = (t >>> 6) & 7,
            n = (t >>> 3) & 7,
            h = t & 7,
            u = ((t >>> 10) & 1) === 1 ? a : r[a] | 0;
          ((r[h] = i === 1 ? this.subWithCarry(r[n] | 0, u, 1) : this.addWithCarry(r[n] | 0, u, 0)),
            (r[15] = s));
          return;
        }
        if ((t & 57344) === 8192) {
          let i = (t >>> 11) & 3,
            a = (t >>> 8) & 7,
            n = t & 255;
          (i === 0
            ? ((r[a] = n), this.setNZ(n))
            : i === 1
              ? this.subWithCarry(r[a] | 0, n, 1)
              : i === 2
                ? (r[a] = this.addWithCarry(r[a] | 0, n, 0))
                : (r[a] = this.subWithCarry(r[a] | 0, n, 1)),
            (r[15] = s));
          return;
        }
        if ((t & 64512) === 16384) {
          this.aluThumb(t, s);
          return;
        }
        if ((t & 64512) === 17408) {
          let i = (t >>> 8) & 3,
            a = (t >>> 7) & 1,
            n = (t >>> 3) & 15,
            h = (a << 3) | (t & 7),
            u = (e + 4) | 0,
            f = n === 15 ? u : r[n] | 0,
            d = h === 15 ? u : r[h] | 0,
            c = { n: this.n, z: this.z, c: this.c, v: this.v };
          if (i === 0) {
            let _ = this.addWithCarry(d, f, 0);
            if (h === 15) {
              ((this.thumb = !0), (this.r[15] = (_ & -2) | 0));
              return;
            }
            ((r[h] = _), (r[15] = s));
          } else if (i === 1) {
            (this.subWithCarry(d, f, 1), (r[15] = s));
            return;
          } else if (i === 2) {
            if (h === 15) {
              ((this.thumb = !0), (this.r[15] = (f & -2) | 0));
              return;
            }
            ((r[h] = f), (r[15] = s));
          } else {
            (a === 1 && (this.r[14] = s | 1), this.jump(f));
            return;
          }
          ((this.n = c.n), (this.z = c.z), (this.c = c.c), (this.v = c.v));
          return;
        }
        if ((t & 63488) === 18432) {
          ((r[(t >>> 8) & 7] = this.mem.read32(((e & -3) + 4 + ((t & 255) << 2)) | 0) | 0),
            (r[15] = s));
          return;
        }
        if ((t & 61440) === 20480) {
          let i = (t >>> 9) & 7,
            a = ((r[(t >>> 3) & 7] | 0) + (r[(t >>> 6) & 7] | 0)) | 0;
          this.memAccess(t & 7, i, a, s);
          return;
        }
        if ((t & 57344) === 24576) {
          let i = (t >>> 11) & 3,
            a = [0, 4, 2, 6],
            n = ((r[(t >>> 3) & 7] | 0) + ((t >>> 6) & 31) * (i >= 2 ? 1 : 4)) | 0;
          this.memAccess(t & 7, a[i], n, s);
          return;
        }
        if ((t & 61440) === 32768) {
          let i = ((r[(t >>> 3) & 7] | 0) + ((t >>> 6) & 31) * 2) | 0;
          this.memAccess(t & 7, ((t >>> 11) & 1) === 1 ? 5 : 1, i, s);
          return;
        }
        if ((t & 61440) === 36864) {
          let i = (t >>> 8) & 7,
            a = ((r[13] | 0) + ((t & 255) << 2)) | 0;
          (((t >>> 11) & 1) === 1 ? (r[i] = this.mem.read32(a) | 0) : this.mem.write32(a, r[i]),
            (r[15] = s));
          return;
        }
        if ((t & 61440) === 40960) {
          let i = ((t >>> 11) & 1) === 1 ? r[13] | 0 : ((e & -3) + 4) | 0;
          ((r[(t >>> 8) & 7] = (i + ((t & 255) << 2)) | 0), (r[15] = s));
          return;
        }
        if ((t & 65280) === 45056) {
          let i = (t & 127) << 2;
          ((r[13] = (((t >>> 7) & 1) === 1 ? (r[13] | 0) - i : (r[13] | 0) + i) | 0), (r[15] = s));
          return;
        }
        if ((t & 65280) === 48640) {
          ((this.fault = { kind: "breakpoint", pc: e, word: t, detail: `bkpt #${t & 255}` }),
            (this.exitRequested = !0));
          return;
        }
        if ((t & 65024) === 46080 || (t & 65024) === 48128) {
          this.pushPop(t) || (r[15] = s);
          return;
        }
        if ((t & 61440) === 49152) {
          let i = ((t >>> 11) & 1) === 1,
            a = (t >>> 8) & 7,
            n = t & 255,
            h = r[a] | 0;
          for (let u = 0; u < 8; u++)
            ((n >>> u) & 1) !== 0 &&
              (i ? (r[u] = this.mem.read32(h)) : this.mem.write32(h, r[u]), (h = (h + 4) | 0));
          (n !== 0 && !(i && ((n >>> a) & 1) === 1) && (r[a] = h | 0), (r[15] = s));
          return;
        }
        if ((t & 61440) === 53248) {
          let i = (t >>> 8) & 15;
          if (i === 15) {
            if ((t & 255) === 171) {
              (this.semihosting(), (r[15] = s));
              return;
            }
            ((this.fault = { kind: "swi", pc: e, word: t, detail: `svc #${t & 255}` }),
              (this.exitRequested = !0));
            return;
          }
          if (i === 14) {
            this.fail(e, t, "thumb-undefined-branch");
            return;
          }
          let a = ((t & 255) << 24) >> 23;
          r[15] = this.condOk(i) ? ((e + 4 + a) & -2) | 0 : s;
          return;
        }
        if ((t & 63488) === 57344) {
          let i = ((t & 2047) << 21) >> 20;
          r[15] = ((e + 4 + i) & -2) | 0;
          return;
        }
        if ((t & 63488) === 61440) {
          let i = this.mem.read16((e + 2) | 0),
            a = (i >>> 11) & 31,
            n = a === 29;
          if (a !== 31 && !n) {
            this.fail(e, i, "thumb-bl-second-word");
            return;
          }
          let h = ((((t & 2047) << 12) | ((i & 2047) << 1)) << 9) >> 9;
          ((r[14] = (e + 4) | 1),
            (this.thumb = !n),
            (r[15] = n ? ((e + 4 + h) & -4) | 0 : ((e + 4 + h) & -2) | 0));
          return;
        }
        this.fail(e, t, "thumb-undefined");
      }
      aluThumb(e, t) {
        let r = this.r,
          s = (e >>> 6) & 15,
          i = (e >>> 3) & 7,
          a = e & 7,
          n = r[a] | 0,
          h = r[i] | 0,
          u;
        switch (s) {
          case 0:
            ((u = (n & h) | 0), this.setNZ(u), (r[a] = u));
            break;
          case 1:
            ((u = (n ^ h) | 0), this.setNZ(u), (r[a] = u));
            break;
          case 2:
          case 3:
          case 4:
          case 7: {
            let f = this.barrel(n, s === 2 ? 0 : s === 3 ? 1 : s === 4 ? 2 : 3, h & 255, !0);
            (f.c !== null && (this.c = f.c), (u = f.v | 0), this.setNZ(u), (r[a] = u));
            break;
          }
          case 5:
            r[a] = this.addWithCarry(n, h, this.c ? 1 : 0);
            break;
          case 6:
            r[a] = this.subWithCarry(n, h, this.c ? 1 : 0);
            break;
          case 8:
            ((u = (n & h) | 0), this.setNZ(u));
            break;
          case 9:
            r[a] = this.subWithCarry(0, h, 1);
            break;
          case 10:
            this.subWithCarry(n, h, 1);
            break;
          case 11:
            this.addWithCarry(n, h, 0);
            break;
          case 12:
            ((u = n | h | 0), this.setNZ(u), (r[a] = u));
            break;
          case 13:
            ((u = Math.imul(n, h) | 0), this.setNZ(u), (this.c = !1), (r[a] = u));
            break;
          case 14:
            ((u = (n & ~h) | 0), this.setNZ(u), (r[a] = u));
            break;
          default:
            ((u = ~h | 0), this.setNZ(u), (r[a] = u));
            break;
        }
        r[15] = t;
      }
      memAccess(e, t, r, s) {
        let i = this.r;
        switch (t) {
          case 0:
            this.mem.write32(r, i[e]);
            break;
          case 1:
            this.mem.write16(r, i[e]);
            break;
          case 2:
            this.mem.write8(r, i[e]);
            break;
          case 3:
            i[e] = (this.mem.read8(r) << 24) >> 24;
            break;
          case 4:
          case 5: {
            let a = t === 4 ? this.mem.read32(r) : this.mem.read16(r);
            if (e === 15) {
              ((this.thumb = (a & 1) === 1), this.setPc(a));
              return;
            }
            i[e] = a | 0;
            break;
          }
          case 6:
            i[e] = this.mem.read8(r);
            break;
          default:
            i[e] = (this.mem.read16(r) << 16) >> 16;
            break;
        }
        i[15] = s;
      }
      pushPop(e) {
        let t = this.r,
          r = ((e >>> 11) & 1) === 1,
          s = ((e >>> 8) & 1) === 1,
          i = e & 255;
        if (!r) {
          let n = t[13] | 0;
          s && ((n = (n - 4) | 0), this.mem.write32(n, t[14]));
          for (let h = 7; h >= 0; h--)
            ((i >>> h) & 1) === 1 && ((n = (n - 4) | 0), this.mem.write32(n, t[h]));
          return ((t[13] = n | 0), !1);
        }
        let a = t[13] | 0;
        for (let n = 0; n < 8; n++)
          ((i >>> n) & 1) !== 0 && ((t[n] = this.mem.read32(a)), (a = (a + 4) | 0));
        if (s) {
          let n = this.mem.read32(a);
          return ((t[13] = (a + 4) | 0), (this.thumb = (n & 1) === 1), (t[15] = (n & -2) | 0), !0);
        }
        return ((t[13] = a | 0), !1);
      }
    },
    Pt = {
      " ": [0, 0, 0, 0, 0, 0, 0],
      "!": [4, 4, 4, 4, 4, 0, 4],
      '"': [10, 10, 0, 0, 0, 0, 0],
      "#": [10, 10, 31, 10, 31, 10, 10],
      $: [4, 15, 20, 14, 5, 30, 4],
      "%": [25, 26, 2, 4, 8, 19, 25],
      "&": [12, 18, 20, 8, 21, 18, 13],
      "'": [4, 4, 0, 0, 0, 0, 0],
      "(": [2, 4, 4, 4, 4, 4, 2],
      ")": [8, 4, 4, 4, 4, 4, 8],
      "*": [4, 21, 4, 21, 4, 0, 0],
      "+": [0, 4, 4, 31, 4, 4, 0],
      ",": [0, 0, 0, 0, 0, 12, 8],
      "-": [0, 0, 0, 31, 0, 0, 0],
      ".": [0, 0, 0, 0, 0, 12, 12],
      "/": [1, 2, 4, 8, 16, 0, 0],
      ":": [0, 12, 12, 0, 12, 12, 0],
      ";": [0, 12, 12, 0, 12, 8, 0],
      "<": [2, 4, 8, 16, 8, 4, 2],
      "=": [0, 0, 31, 0, 31, 0, 0],
      ">": [8, 4, 2, 1, 2, 4, 8],
      "?": [14, 17, 1, 6, 4, 0, 4],
      "@": [14, 17, 23, 21, 23, 16, 14],
      "[": [14, 16, 16, 16, 16, 16, 14],
      "\\": [16, 8, 4, 2, 1, 0, 0],
      "]": [7, 1, 1, 1, 1, 1, 7],
      "^": [4, 10, 17, 0, 0, 0, 0],
      _: [0, 0, 0, 0, 0, 0, 31],
      "`": [8, 4, 2, 0, 0, 0, 0],
      "{": [6, 8, 8, 16, 8, 8, 6],
      "|": [4, 4, 4, 4, 4, 4, 4],
      "}": [12, 2, 2, 1, 2, 2, 12],
      "~": [0, 0, 8, 25, 2, 0, 0],
      0: [14, 17, 19, 21, 25, 17, 14],
      1: [4, 12, 4, 4, 4, 4, 14],
      2: [14, 17, 1, 2, 4, 8, 31],
      3: [30, 1, 1, 14, 1, 1, 30],
      4: [2, 6, 10, 18, 31, 2, 2],
      5: [31, 16, 16, 30, 1, 1, 30],
      6: [14, 16, 16, 30, 17, 17, 14],
      7: [31, 1, 2, 4, 8, 8, 8],
      8: [14, 17, 17, 14, 17, 17, 14],
      9: [14, 17, 17, 15, 1, 1, 14],
      A: [14, 17, 17, 31, 17, 17, 17],
      B: [30, 17, 17, 30, 17, 17, 30],
      C: [14, 17, 16, 16, 16, 17, 14],
      D: [30, 17, 17, 17, 17, 17, 30],
      E: [31, 16, 16, 30, 16, 16, 31],
      F: [31, 16, 16, 30, 16, 16, 16],
      G: [14, 17, 16, 23, 17, 17, 15],
      H: [17, 17, 17, 31, 17, 17, 17],
      I: [14, 4, 4, 4, 4, 4, 14],
      J: [7, 2, 2, 2, 18, 18, 12],
      K: [17, 18, 20, 24, 20, 18, 17],
      L: [16, 16, 16, 16, 16, 16, 31],
      M: [17, 27, 21, 21, 17, 17, 17],
      N: [17, 25, 21, 19, 17, 17, 17],
      O: [14, 17, 17, 17, 17, 17, 14],
      P: [30, 17, 17, 30, 16, 16, 16],
      Q: [14, 17, 17, 17, 21, 18, 13],
      R: [30, 17, 17, 30, 20, 18, 17],
      S: [15, 16, 16, 14, 1, 1, 30],
      T: [31, 4, 4, 4, 4, 4, 4],
      U: [17, 17, 17, 17, 17, 17, 14],
      V: [17, 17, 17, 17, 17, 10, 4],
      W: [17, 17, 17, 17, 21, 27, 17],
      X: [17, 17, 10, 4, 10, 17, 17],
      Y: [17, 17, 10, 4, 4, 4, 4],
      Z: [31, 1, 2, 4, 8, 16, 31],
    },
    Pr = [31, 17, 17, 17, 17, 17, 31];
  function Ce(e, t, r) {
    return e < t ? t : e > r ? r : e;
  }
  var Nr = class kr {
    constructor() {
      (__publicField(this, "fontId", 0), __publicField(this, "explicitSize", 0));
    }
    setFont(t) {
      ((this.fontId = t & 255), (this.explicitSize = 0));
    }
    setFontSize(t) {
      this.explicitSize = Ce(t, 0, 64);
    }
    currentFontId() {
      return this.fontId;
    }
    scale() {
      if (this.explicitSize > 0) return Ce(Math.floor((this.explicitSize + 7) / 8), 1, 8);
      switch (this.fontId) {
        case 0:
        case 7:
          return 1;
        case 1:
        case 2:
        case 3:
          return 2;
        case 4:
        case 5:
        case 6:
          return 3;
        default:
          return Ce(Math.floor((Ce(this.fontId, 8, 32) + 7) / 8), 1, 4);
      }
    }
    measure(t) {
      let r = this.scale();
      return t.length === 0 ? [0, 8 * r] : [t.length * 6 * r, 8 * r];
    }
    charWidth(t) {
      return 6 * this.scale();
    }
    height() {
      return 8 * this.scale();
    }
    scaleFor(t) {
      return t <= 0 ? this.scale() : Ce(Math.floor((t + 7) / 8), 1, 8);
    }
    baseline(t) {
      return 7 * this.scaleFor(t);
    }
    inkWidth(t) {
      return 5 * this.scaleFor(t);
    }
    cellHeight(t) {
      return 8 * this.scaleFor(t);
    }
    advance(t) {
      return 6 * this.scaleFor(t);
    }
    rasterize(t, r = Number.MAX_SAFE_INTEGER) {
      let s = this.scale(),
        i = Math.max(t.length * 6 * s, 1),
        a = Math.min(i, Math.max(r, 1)),
        n = 8 * s,
        h = new Int32Array(a * n),
        u = 0;
      for (let f = 0; f < t.length && !(u >= a); f++) {
        let d = kr.glyph(t.charCodeAt(f));
        for (let c = 0; c < 7; c++) {
          let _ = d[c];
          for (let m = 0; m < 5; m++)
            if ((_ & (1 << (4 - m))) !== 0)
              for (let y = 0; y < s; y++)
                for (let w = 0; w < s; w++) {
                  let g = u + m * s + w,
                    b = c * s + y;
                  g >= 0 && g < a && b >= 0 && b < n && (h[b * a + g] = 255);
                }
        }
        u += 6 * s;
      }
      return { width: a, height: n, baseline: 7 * s, alpha: h };
    }
    static glyph(t) {
      var r;
      let s = String.fromCharCode(t).toUpperCase();
      return t < 32 || t === 127 ? Pt[" "] : (r = Pt[s]) != null ? r : Pr;
    }
  };
  function nt(e) {
    return e < 0 ? 0 : e > 255 ? 255 : e | 0;
  }
  function V(e, t, r) {
    let s = nt(e),
      i = nt(t),
      a = nt(r),
      n = ((s * 31 + 127) / 255) | 0,
      h = ((i * 63 + 127) / 255) | 0,
      u = ((a * 31 + 127) / 255) | 0;
    return ((n << 11) | (h << 5) | u) & 65535;
  }
  function Te(e) {
    let t = e & 65535,
      r = (t >>> 11) & 31,
      s = (t >>> 5) & 63,
      i = t & 31;
    return [(r << 3) | (r >>> 2), (s << 2) | (s >>> 4), (i << 3) | (i >>> 2)];
  }
  function te(e) {
    return (((e < 0 ? 0 : e > 65535 ? 65535 : e) * 255 + 32767) / 65535) | 0;
  }
  function ht(e, t, r) {
    let s = r < 0 ? 0 : r > 255 ? 255 : r | 0;
    if (s <= 0) return e & 65535;
    if (s >= 255) return t & 65535;
    let i = 255 - s,
      [a, n, h] = Te(t),
      [u, f, d] = Te(e);
    return V(
      ((a * s + u * i + 127) / 255) | 0,
      ((n * s + f * i + 127) / 255) | 0,
      ((h * s + d * i + 127) / 255) | 0
    );
  }
  function Ir(e) {
    var t, r;
    return (r = (t = Ur(e)) != null ? t : Zr(e)) != null ? r : jr(e);
  }
  var Fr = [{ x0: 0, y0: 0, dx: 1, dy: 1 }],
    Or = [
      { x0: 0, y0: 0, dx: 8, dy: 8 },
      { x0: 4, y0: 0, dx: 8, dy: 8 },
      { x0: 0, y0: 4, dx: 4, dy: 8 },
      { x0: 2, y0: 0, dx: 4, dy: 4 },
      { x0: 0, y0: 2, dx: 2, dy: 4 },
      { x0: 1, y0: 0, dx: 2, dy: 2 },
      { x0: 0, y0: 1, dx: 1, dy: 2 },
    ];
  function De(e, t, r) {
    return e <= t ? 0 : Math.floor((e - t + r - 1) / r);
  }
  function Tr(e, t, r) {
    let s = e + t - r,
      i = Math.abs(s - e),
      a = Math.abs(s - t),
      n = Math.abs(s - r);
    return i <= a && i <= n ? e : a <= n ? t : r;
  }
  function Nt(e, t, r, s) {
    if (s === 8) return e[t + r];
    if (s !== 1 && s !== 2 && s !== 4) throw new Error(`sample depth ${s}`);
    let i = 8 / s,
      a = e[t + Math.floor(r / i)],
      n = (i - 1 - (r % i)) * s;
    return (a >>> n) & ((1 << s) - 1);
  }
  function Dr(e, t) {
    switch (t) {
      case 1:
        return e === 0 ? 0 : 255;
      case 2:
        return e * 85;
      case 4:
        return e * 17;
      case 8:
        return e;
      case 16:
        return te(e);
      default:
        throw new Error(`sample depth ${t}`);
    }
  }
  function $r(e, t, r, s, i, a, n) {
    let h = (u, f) => ((f & 255) << 16) | (u & 65535);
    switch (i) {
      case 3: {
        let u = Nt(e, t, r, s),
          f = a !== null && u < a.length ? a[u] : 0,
          d = n !== null && u < n.length ? n[u] : 255;
        return h(f, d);
      }
      case 0: {
        let u = s === 16 ? j(e, t + r * 2) : Nt(e, t, r, s),
          f = Dr(u, s),
          d = n !== null && n.length >= 2 ? j(n, 0) : -1;
        return h(V(f, f, f), u === d ? 0 : 255);
      }
      case 2: {
        let u, f, d, c, _, m;
        if (s === 16) {
          let w = t + r * 6;
          ((u = j(e, w)),
            (f = j(e, w + 2)),
            (d = j(e, w + 4)),
            (c = te(u)),
            (_ = te(f)),
            (m = te(d)));
        } else {
          let w = t + r * 3;
          ((u = e[w]), (f = e[w + 1]), (d = e[w + 2]), (c = u), (_ = f), (m = d));
        }
        let y = n !== null && n.length >= 6 && u === j(n, 0) && f === j(n, 2) && d === j(n, 4);
        return h(V(c, _, m), y ? 0 : 255);
      }
      case 4: {
        if (s === 16) {
          let f = t + r * 4;
          return h(V(te(j(e, f)), te(j(e, f)), te(j(e, f))), te(j(e, f + 2)));
        }
        let u = t + r * 2;
        return h(V(e[u], e[u], e[u]), e[u + 1]);
      }
      case 6: {
        if (s === 16) {
          let f = t + r * 8;
          return h(V(te(j(e, f)), te(j(e, f + 2)), te(j(e, f + 4))), te(j(e, f + 6)));
        }
        let u = t + r * 4;
        return h(V(e[u], e[u + 1], e[u + 2]), e[u + 3]);
      }
      default:
        throw new Error(`PNG color type ${i}`);
    }
  }
  function Wr(e, t, r, s, i) {
    let a = new Uint8Array(r * s),
      n = t,
      h = -1;
    for (let u = 0; u < r; u++) {
      let f = e[n++],
        d = u * s;
      for (let c = 0; c < s; c++) {
        let _ = e[n++],
          m = c >= i ? a[d + c - i] : 0,
          y = h >= 0 ? a[h + c] : 0,
          w = h >= 0 && c >= i ? a[h + c - i] : 0,
          g;
        switch (f) {
          case 0:
            g = _;
            break;
          case 1:
            g = _ + m;
            break;
          case 2:
            g = _ + y;
            break;
          case 3:
            g = _ + ((m + y) >>> 1);
            break;
          case 4:
            g = _ + Tr(m, y, w);
            break;
          default:
            throw new Error(`PNG filter ${f}`);
        }
        a[d + c] = g & 255;
      }
      h = d;
    }
    return a;
  }
  function Hr(e) {
    let t = [63519, 2016, 31, 0, 65535, 65504, 2047];
    for (let r of t) if (e[r] === 0) return r;
    for (let r = 0; r <= 65535; r++) if (e[r] === 0) return r;
    return 63519;
  }
  function Ur(e) {
    try {
      return Gr(e);
    } catch (t) {
      return null;
    }
  }
  function Gr(e) {
    let t = [137, 80, 78, 71, 13, 10, 26, 10];
    if (e.length < 33) throw new Error("Not PNG");
    for (let E = 0; E < 8; E++) if (e[E] !== t[E]) throw new Error("Not PNG");
    let r = 8,
      s = null,
      i = null,
      a = null,
      n = [],
      h = 0;
    e: for (; r + 12 <= e.length; ) {
      let E = ft(e, r);
      if (((r += 4), E < 0 || r + 4 + E + 4 > e.length)) throw new Error("Bad PNG chunk");
      let B = String.fromCharCode(e[r], e[r + 1], e[r + 2], e[r + 3]);
      r += 4;
      let S = r;
      switch (B) {
        case "IHDR": {
          if (E !== 13) throw new Error("IHDR len");
          let P = ft(e, S),
            T = ft(e, S + 4);
          if (e[S + 10] !== 0) throw new Error("Unsupported PNG compression");
          if (e[S + 11] !== 0) throw new Error("Unsupported PNG filter method");
          s = {
            width: P,
            height: T,
            bitDepth: e[S + 8],
            colorType: e[S + 9],
            interlace: e[S + 12],
          };
          break;
        }
        case "PLTE": {
          if (E % 3 !== 0) throw new Error("PLTE len");
          i = new Uint16Array(E / 3);
          for (let P = 0; P < i.length; P++)
            i[P] = V(e[S + P * 3], e[S + P * 3 + 1], e[S + P * 3 + 2]);
          break;
        }
        case "tRNS":
          a = e.slice(S, S + E);
          break;
        case "IDAT": {
          if (h + E > 33554432) throw new Error("PNG IDAT exceeds compressed-data safety limit");
          (n.push(e.slice(S, S + E)), (h += E));
          break;
        }
        case "IEND":
          break e;
      }
      r += E + 4;
    }
    let u = s;
    if (u === null) throw new Error("PNG missing IHDR");
    if (!(u.width >= 1 && u.width <= 4096 && u.height >= 1 && u.height <= 4096))
      throw new Error("PNG size");
    if (u.width * u.height > 4194304) throw new Error("PNG pixel count exceeds safety limit");
    if (u.interlace !== 0 && u.interlace !== 1) throw new Error(`PNG interlace=${u.interlace}`);
    let f =
      u.colorType === 0
        ? 1
        : u.colorType === 2
          ? 3
          : u.colorType === 3
            ? 1
            : u.colorType === 4
              ? 2
              : u.colorType === 6
                ? 4
                : -1;
    if (f < 0) throw new Error(`PNG color type ${u.colorType}`);
    if (
      !(u.colorType === 3
        ? u.bitDepth === 1 || u.bitDepth === 2 || u.bitDepth === 4 || u.bitDepth === 8
        : u.colorType === 0
          ? u.bitDepth === 1 ||
            u.bitDepth === 2 ||
            u.bitDepth === 4 ||
            u.bitDepth === 8 ||
            u.bitDepth === 16
          : u.bitDepth === 8 || u.bitDepth === 16)
    )
      throw new Error(`PNG bit depth ${u.bitDepth} type=${u.colorType}`);
    if (u.colorType === 3 && i === null) throw new Error("Indexed PNG missing PLTE");
    let d = u.interlace === 0 ? Fr : Or,
      c = 0;
    for (let E of d) {
      let B = De(u.width, E.x0, E.dx),
        S = De(u.height, E.y0, E.dy);
      if (B <= 0 || S <= 0) continue;
      let P = Math.floor((B * f * u.bitDepth + 7) / 8);
      if (((c += S * (P + 1)), c > 67108864))
        throw new Error("PNG inflated scanlines exceed safety limit");
    }
    let _ = new Uint8Array(h),
      m = 0;
    for (let E of n) (_.set(E, m), (m += E.length));
    let y = Ct(_, 0, c);
    if (y === null || y.bytes.length !== c) throw new Error(`PNG inflated size != expected ${c}`);
    let w = y.bytes,
      g = new Uint16Array(u.width * u.height),
      b = { plane: null },
      x = (E, B, S, P) => {
        let T = B * u.width + E;
        ((g[T] = S & 65535),
          P !== 255 &&
            (b.plane === null && (b.plane = new Uint8Array(g.length).fill(255)),
            (b.plane[T] = P < 0 ? 0 : P > 255 ? 255 : P)));
      },
      k = 0;
    for (let E of d) {
      let B = De(u.width, E.x0, E.dx),
        S = De(u.height, E.y0, E.dy);
      if (B <= 0 || S <= 0) continue;
      let P = Math.floor((B * f * u.bitDepth + 7) / 8),
        T = Math.max(1, Math.floor((f * u.bitDepth + 7) / 8)),
        L = S * (P + 1);
      if (k + L > w.length) throw new Error("PNG data short pass");
      let se = Wr(w, k, S, P, T);
      k += L;
      for (let q = 0; q < S; q++) {
        let K = E.y0 + q * E.dy,
          le = q * P;
        for (let Q = 0; Q < B; Q++) {
          let xt = E.x0 + Q * E.dx,
            Be = $r(se, le, Q, u.bitDepth, u.colorType, i, a);
          x(xt, K, Be & 65535, (Be >>> 16) & 255);
        }
      }
    }
    let C = -1,
      z = b.plane;
    if (z !== null && z.includes(0)) {
      let E = new Uint8Array(65536);
      for (let B = 0; B < g.length; B++) z[B] !== 0 && (E[g[B]] = 1);
      C = Hr(E);
      for (let B = 0; B < g.length; B++) z[B] === 0 && (g[B] = C);
    }
    return { width: u.width, height: u.height, pixels: g, alpha: z, transparentColor565: C };
  }
  function Zr(e) {
    if (e.length < 13) return null;
    let t = String.fromCharCode(e[0], e[1], e[2], e[3], e[4], e[5]);
    if (t !== "GIF87a" && t !== "GIF89a") return null;
    let r = 6,
      s = re(e, r);
    r += 2;
    let i = re(e, r);
    if (((r += 2), s <= 0 || i <= 0 || s > 4096 || i > 4096 || s * i > 4194304)) return null;
    let a = e[r++],
      n = (a & 128) !== 0,
      h = 1 << ((a & 7) + 1);
    r += 2;
    let u = n ? It(e, r, h) : null;
    if (n && u === null) return null;
    n && (r += h * 3);
    let f = -1;
    for (; r < e.length; ) {
      let d = e[r++];
      if (d === 59) return null;
      if (d === 33) {
        if (r >= e.length) return null;
        if (e[r++] === 249) {
          if (r >= e.length) return null;
          let L = e[r++];
          if (
            L < 4 ||
            r + L > e.length ||
            ((f = (e[r] & 1) !== 0 ? e[r + 3] : -1), (r += L), r >= e.length || e[r++] !== 0)
          )
            return null;
        } else {
          let L = Xr(e, r);
          if (L === null) return null;
          r = L;
        }
        continue;
      }
      if (d === 0) continue;
      if (d !== 44 || r + 9 > e.length) return null;
      let c = re(e, r);
      r += 2;
      let _ = re(e, r);
      r += 2;
      let m = re(e, r);
      r += 2;
      let y = re(e, r);
      r += 2;
      let w = e[r++];
      if (m <= 0 || y <= 0 || c < 0 || _ < 0 || c + m > s || _ + y > i) return null;
      let g = (w & 128) !== 0,
        b = (w & 64) !== 0,
        x = 1 << ((w & 7) + 1),
        k = g ? It(e, r, x) : u;
      if (k === null || (g && (r += x * 3), r >= e.length)) return null;
      let C = e[r++];
      if (C < 2 || C > 8) return null;
      let z = Kr(e, r);
      if (z === null) return null;
      let E = qr(z, C, m * y);
      if (E === null) return null;
      let B = new Uint16Array(s * i),
        S = f >= 0 ? new Uint8Array(s * i) : null,
        P = 0,
        T = (L) => {
          if (L < 0 || L >= y) return;
          let se = (_ + L) * s + c;
          for (let q = 0; q < m; q++) {
            if (P >= E.length) return;
            let K = E[P++],
              le = K < k.length ? k[K] : 0,
              Q = se + q;
            ((B[Q] = $e(le)), S !== null && (S[Q] = K === f ? 0 : 255));
          }
        };
      if (b) {
        for (let L = 0; L < y; L += 8) T(L);
        for (let L = 4; L < y; L += 8) T(L);
        for (let L = 2; L < y; L += 4) T(L);
        for (let L = 1; L < y; L += 2) T(L);
      } else for (let L = 0; L < y; L++) T(L);
      if (P < m * y)
        for (; P < m * y; ) {
          let L = (_ + Math.floor(P / m)) * s + c + (P % m);
          (L >= 0 && L < B.length && (B[L] = $e(k.length > 0 ? k[0] : 0)), P++);
        }
      return (
        S !== null && !S.includes(0) && (S = null),
        { width: s, height: i, pixels: B, alpha: S, transparentColor565: -1 }
      );
    }
    return null;
  }
  function qr(e, t, r) {
    let s = 1 << t,
      i = s + 1,
      a = new Int32Array(4096),
      n = new Uint8Array(4096),
      h = new Uint8Array(4097);
    for (let g = 0; g < s; g++) ((a[g] = -1), (n[g] = g));
    let u = t + 1,
      f = i + 1,
      d = 0,
      c = -1,
      _ = 0,
      m = new Uint8Array(r),
      y = 0,
      w = (g) => {
        if (d + g > e.length * 8) return -1;
        let b = 0;
        for (let x = 0; x < g; x++) {
          let k = e[(d + x) >>> 3];
          b |= ((k >>> ((d + x) & 7)) & 1) << x;
        }
        return ((d += g), b);
      };
    for (; y < r; ) {
      let g = w(u);
      if (g < 0) break;
      if (g === s) {
        ((u = t + 1), (f = i + 1), (c = -1));
        continue;
      }
      if (g === i) break;
      if (c < 0) {
        if (g >= s) return null;
        ((m[y++] = n[g]), (_ = n[g]), (c = g));
        continue;
      }
      let b = g,
        x = g,
        k = 0;
      if (x >= f) {
        if (x !== f) return null;
        ((h[k++] = _), (x = c));
      }
      let C = 0;
      for (; x >= s; ) {
        if (x >= 4096 || C++ > 4096) return null;
        ((h[k++] = n[x]), (x = a[x]));
      }
      if (x < 0 || x >= s) return null;
      for (_ = n[x], h[k++] = _; k > 0 && y < r; ) m[y++] = h[--k];
      (f < 4096 && ((a[f] = c), (n[f] = _), f++, f === 1 << u && u < 12 && u++), (c = b));
    }
    return y === r ? m : null;
  }
  function It(e, t, r) {
    if (t < 0 || r <= 0 || t + r * 3 > e.length) return null;
    let s = new Int32Array(r),
      i = t;
    for (let a = 0; a < r; a++) {
      let n = e[i++],
        h = e[i++],
        u = e[i++];
      s[a] = (n << 16) | (h << 8) | u;
    }
    return s;
  }
  function Kr(e, t) {
    let r = t,
      s = 0,
      i = [];
    for (;;) {
      if (r >= e.length) return null;
      let h = e[r++];
      if (h === 0) break;
      if (r + h > e.length || s > 33554432 - h) return null;
      (i.push([r, h]), (s += h), (r += h));
    }
    let a = new Uint8Array(s),
      n = 0;
    for (let [h, u] of i) (a.set(e.subarray(h, h + u), n), (n += u));
    return a;
  }
  function Xr(e, t) {
    let r = t;
    for (;;) {
      if (r >= e.length) return null;
      let s = e[r++];
      if (s === 0) return r;
      if (r + s > e.length) return null;
      r += s;
    }
  }
  function jr(e) {
    try {
      return Vr(e);
    } catch (t) {
      return null;
    }
  }
  function Vr(e) {
    if (e.length < 26 || e[0] !== 66 || e[1] !== 77) return null;
    let t = ot(e, 14),
      r,
      s,
      i,
      a,
      n,
      h = ot(e, 10);
    if (t === 12) ((r = re(e, 18)), (s = re(e, 20)), (i = re(e, 22)), (a = re(e, 24)), (n = 0));
    else if (t >= 40)
      ((r = ut(e, 18)), (s = ut(e, 22)), (i = re(e, 26)), (a = re(e, 28)), (n = ot(e, 30)));
    else return null;
    if (i !== 1 || (n !== 0 && !(a === 8 && n === 1)) || r <= 0 || r > 4096) return null;
    let u = Math.abs(s);
    if (
      u <= 0 ||
      u > 4096 ||
      r * u > 4194304 ||
      (a !== 1 && a !== 4 && a !== 8 && a !== 24 && a !== 32)
    )
      return null;
    let f = a === 1 ? 2 : a === 4 ? 16 : a === 8 ? 256 : 0,
      d = 14 + t,
      c = Math.floor((r * a + 31) / 32) * 4,
      _ = s > 0,
      m = new Uint16Array(r * u);
    if (f > 0) {
      let y = t === 12 ? 3 : 4;
      if (e.length < d + f * y) return null;
      let w = new Int32Array(f);
      for (let g = 0; g < f; g++) {
        let b = d + g * y;
        w[g] = (e[b + 2] << 16) | (e[b + 1] << 8) | e[b];
      }
      if (h < 0 || h + c * u > e.length) return null;
      for (let g = 0; g < u; g++) {
        let b = _ ? u - 1 - g : g,
          x = h + b * c,
          k = g * r;
        for (let C = 0; C < r; C++) {
          let z;
          if (a === 8) z = e[x + C];
          else if (a === 4) {
            let E = e[x + Math.floor(C / 2)];
            z = (C & 1) === 0 ? E >>> 4 : E & 15;
          } else z = (e[x + Math.floor(C / 8)] >>> (7 - (C & 7))) & 1;
          m[k + C] = $e(z < f ? w[z] : 0);
        }
      }
    } else {
      let y = a / 8;
      if (h < 0 || h + c * u > e.length) return null;
      for (let w = 0; w < u; w++) {
        let g = _ ? u - 1 - w : w,
          b = h + g * c,
          x = w * r;
        for (let k = 0; k < r; k++) {
          let C = b + k * y;
          m[x + k] = $e((e[C + 2] << 16) | (e[C + 1] << 8) | e[C]);
        }
      }
    }
    return { width: r, height: u, pixels: m, alpha: null, transparentColor565: -1 };
  }
  function $e(e) {
    return V((e >>> 16) & 255, (e >>> 8) & 255, e & 255);
  }
  function re(e, t) {
    return e[t] | (e[t + 1] << 8);
  }
  function ut(e, t) {
    return e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24) | 0;
  }
  function ot(e, t) {
    return ut(e, t) >>> 0;
  }
  function j(e, t) {
    return (e[t] << 8) | e[t + 1];
  }
  function ft(e, t) {
    return (e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3] | 0;
  }
  var We = 1610612736,
    He = 8 * 1024 * 1024,
    W = -1,
    Ft = 0,
    Qr = 48,
    Ot = 32,
    Yr = class {
      constructor(e, t, r) {
        (__publicField(this, "fb565"),
          __publicField(this, "layers", new Map()),
          __publicField(this, "surfacesByAddr", new Map()),
          __publicField(this, "surfacesByHandle", new Map()),
          __publicField(this, "active", W),
          __publicField(this, "pendingBlt", null),
          __publicField(this, "nextHandle", 1),
          __publicField(this, "arenaTop", We),
          __publicField(this, "freeArenaBlocks", []),
          __publicField(this, "decodedImageCache", new Map()),
          __publicField(this, "dirty", !1),
          __publicField(this, "flushCount", 0),
          __publicField(this, "currentColor", 65535),
          __publicField(this, "text", new Nr()),
          __publicField(this, "screenLayerHandle", W),
          (this.mem = e),
          (this.sw = t),
          (this.sh = r),
          (this.fb565 = new Uint16Array(t * r)),
          e.map(We, He, !0, !0, !1));
      }
      get screenWidth() {
        return this.sw;
      }
      get screenHeight() {
        return this.sh;
      }
      get activeLayerHandle() {
        return this.active;
      }
      allocBytes(e) {
        let t = (e + 3) & -4;
        if (t <= 0) throw new Error("graphics arena exhausted");
        let r = -1,
          s = Number.MAX_SAFE_INTEGER;
        for (let n = 0; n < this.freeArenaBlocks.length; n++) {
          let h = this.freeArenaBlocks[n];
          h.bytes >= t && h.bytes < s && ((r = n), (s = h.bytes));
        }
        if (r >= 0) return this.freeArenaBlocks.splice(r, 1)[0].addr;
        let i = this.arenaTop,
          a = i + t;
        if (a - We > He) throw new Error("graphics arena exhausted");
        return ((this.arenaTop = a), i);
      }
      releaseBytes(e, t) {
        t <= 0 || e < We || this.freeArenaBlocks.push({ addr: e, bytes: t });
      }
      createLayer(e, t, r, s, i = -1, a = -1) {
        if (r <= 0 || s <= 0 || r > 4096 || s > 4096 || r * s * 2 > He) return W;
        let n = (r * s * 2 + 3) & -4,
          h = a < 0,
          u = h ? this.allocBytes(n) : a,
          f = this.nextHandle++,
          d = {
            handle: f,
            x: e,
            y: t,
            w: r,
            h: s,
            buf: u,
            transparentColor: i,
            clip: { x: 0, y: 0, w: r, h: s },
            bytes: h ? n : 0,
            opacity: 100,
          };
        return (
          this.layers.set(f, d),
          this.surfacesByAddr.set(u, d),
          this.active === W && (this.active = f),
          f
        );
      }
      createCanvas(e, t, r = -1) {
        if (e <= 0 || t <= 0 || (e * t + 16) * 2 > He) return W;
        let s = (Ot + e * t * 2 + 3) & -4,
          i = this.allocBytes(s),
          a = {
            buf: i + Ot,
            w: e,
            h: t,
            transparentColor: r,
            clip: null,
            bytes: s,
            header: i,
            alpha: null,
          };
        return (
          this.surfacesByHandle.set(i, a),
          this.surfacesByAddr.set(i, a),
          this.surfacesByAddr.set(a.buf, a),
          i
        );
      }
      releaseCanvas(e) {
        var t, r, s, i, a;
        let n = (t = this.surfacesByHandle.get(e)) != null ? t : this.surfacesByAddr.get(e);
        return n
          ? (this.surfacesByHandle.delete((r = n.header) != null ? r : n.buf),
            this.surfacesByAddr.delete((s = n.header) != null ? s : n.buf),
            this.surfacesByAddr.delete(n.buf),
            this.releaseBytes((i = n.header) != null ? i : n.buf, (a = n.bytes) != null ? a : 0),
            0)
          : -1;
      }
      deleteLayer(e) {
        let t = this.layers.get(e);
        return t
          ? (this.layers.delete(e),
            this.surfacesByAddr.delete(t.buf),
            this.releaseBytes(t.buf, t.bytes),
            this.screenLayerHandle === e && (this.screenLayerHandle = W),
            this.active === e &&
              (this.active = this.layers.size > 0 ? this.layers.keys().next().value : W),
            0)
          : -1;
      }
      layer(e) {
        return this.layers.get(e);
      }
      layerBuf(e) {
        return this.layers.get(e);
      }
      getLayerBuffer(e) {
        let t = this.layers.get(e);
        if (t) return t.buf;
        if (e === Ft) {
          let r = this.drawTarget(),
            s = this.layers.get(r);
          if (s) return s.buf;
        }
        return 0;
      }
      activeLayer(e) {
        return e !== W && !this.layers.has(e) ? W : ((this.active = e), 0);
      }
      drawTarget() {
        return this.layers.has(this.active) ? this.active : this.screenLayerHandle;
      }
      ensureScreenLayer() {
        if (this.screenLayerHandle !== W) return this.screenLayerHandle;
        let e = this.active;
        if (this.layers.has(e)) return ((this.screenLayerHandle = e), this.screenLayerHandle);
        let t = this.createLayer(0, 0, this.sw, this.sh, -1);
        return (t !== W && ((this.screenLayerHandle = t), e === W && (this.active = W)), t);
      }
      screenBufferAddress() {
        let e = this.layers.get(this.screenLayerHandle);
        return e ? e.buf : 0;
      }
      resolveLayerHandle(e) {
        return e === 0 || e === -1 || e === W ? this.drawTarget() : e;
      }
      canvasBuffer(e) {
        var t, r;
        let s = (t = this.surfacesByHandle.get(e)) != null ? t : this.surfacesByAddr.get(e);
        return s ? ((r = s.header) != null ? r : s.buf) : 0;
      }
      loadImage(e) {
        let t = this.decodeCached(e);
        if (t === null) return 0;
        let r = this.createCanvas(t.width, t.height);
        if (r === W) return 0;
        let s = this.surfacesByHandle.get(r);
        return s
          ? (this.uploadRgb565(s.buf, t.pixels),
            t.transparentColor565 >= 0 && (s.transparentColor = t.transparentColor565),
            (s.alpha = t.alpha !== null ? t.alpha.slice() : null),
            r)
          : 0;
      }
      getImageBuffer(e) {
        let t = this.surfacesByHandle.get(e);
        if (t) return t.buf;
        let r = this.layers.get(e);
        return r ? r.buf : 0;
      }
      releaseImage(e) {
        return this.releaseCanvas(e);
      }
      imageWidth(e) {
        var t;
        let r = (t = this.surfacesByHandle.get(e)) != null ? t : this.surfacesByAddr.get(e);
        if (r) return r.w;
        let s = this.layers.get(e);
        return s ? s.w : 0;
      }
      imageHeight(e) {
        var t;
        let r = (t = this.surfacesByHandle.get(e)) != null ? t : this.surfacesByAddr.get(e);
        if (r) return r.h;
        let s = this.layers.get(e);
        return s ? s.h : 0;
      }
      setCanvasTransparentColor(e, t) {
        var r;
        let s = (r = this.surfacesByHandle.get(e)) != null ? r : this.surfacesByAddr.get(e);
        return s ? ((s.transparentColor = t < 0 ? -1 : t & 65535), (s.alpha = null), 0) : -1;
      }
      canvasFrameCount(e) {
        let t = this.surfacesByAddr.get(e);
        return t !== void 0 && t.clip === null ? 1 : 0;
      }
      drawImageFromMemory(e, t, r, s) {
        if (s.length === 0) return -1;
        let i = this.loadImage(s);
        if (i === 0) return -1;
        try {
          let a = this.surfacesByHandle.get(i);
          return a ? this.blt(e, t, r, a.buf, 0, 0, a.w, a.h, 0) : -1;
        } finally {
          this.releaseImage(i);
        }
      }
      decodeCached(e) {
        if (e.length === 0) return null;
        let t = Jr(e),
          r = this.decodedImageCache.get(t);
        if (r !== void 0)
          return (this.decodedImageCache.delete(t), this.decodedImageCache.set(t, r), r);
        let s = Ir(e);
        if (s === null) return null;
        if ((this.decodedImageCache.set(t, s), this.decodedImageCache.size > Qr)) {
          let i = this.decodedImageCache.keys().next();
          i.done || this.decodedImageCache.delete(i.value);
        }
        return s;
      }
      uploadRgb565(e, t) {
        if (t.length === 0) return;
        let r = t.length * 2,
          s = this.mem.find(e, r);
        if (s !== null) {
          let a = new DataView(s.data.buffer, s.data.byteOffset + ((e - s.start) | 0), r);
          for (let n = 0; n < t.length; n++) a.setUint16(n * 2, t[n], !0);
          return;
        }
        let i = e;
        for (let a = 0; a < t.length; a++) (this.mem.write16(i, t[a], !0), (i += 2));
      }
      surface(e) {
        var t, r, s;
        return e === 0 || e === -1 || e === W
          ? (t = this.layers.get(this.drawTarget())) != null
            ? t
            : null
          : this.surfacesByAddr.get(e) ||
              ((s = (r = this.surfacesByHandle.get(e)) != null ? r : this.layers.get(e)) != null
                ? s
                : null);
      }
      setPixelOnSurface(e, t, r, s) {
        let i = this.surface(e);
        if (i === null || t < 0 || r < 0 || t >= i.w || r >= i.h) return -1;
        let a = i.clip;
        return (
          (a !== null && (t < a.x || r < a.y || t >= a.x + a.w || r >= a.y + a.h)) ||
            (this.mem.write16(i.buf + (r * i.w + t) * 2, s & 65535), (this.dirty = !0)),
          0
        );
      }
      getPixelFromSurface(e, t, r) {
        let s = this.surface(e);
        return s === null || t < 0 || r < 0 || t >= s.w || r >= s.h
          ? 0
          : this.mem.read16(s.buf + (r * s.w + t) * 2) & 65535;
      }
      clearLayerBg(e) {
        let t = this.layers.get(e);
        if (!t) return -1;
        let r = t.transparentColor >= 0 ? t.transparentColor & 65535 : 0,
          s = t.w * t.h,
          i = s * 2,
          a = this.mem.find(t.buf, i);
        if (a !== null) {
          let n = new DataView(a.data.buffer, a.data.byteOffset + ((t.buf - a.start) | 0), i);
          for (let h = 0; h < s; h++) n.setUint16(h * 2, r, !0);
        } else {
          let n = t.buf;
          for (let h = 0; h < s; h++) (this.mem.write16(n, r), (n += 2));
        }
        return ((this.dirty = !0), 0);
      }
      blt(e, t, r, s, i, a, n, h, u = 0) {
        var f, d;
        let c = this.surface(e),
          _ = this.surface(s);
        if (!c || !_ || n <= 0 || h <= 0) return -1;
        let m = (f = c.clip) != null ? f : { x: 0, y: 0, w: c.w, h: c.h },
          y = Math.max(0, -a, -r, m.y - r),
          w = Math.min(h, _.h - a, c.h - r, m.y + m.h - r),
          g = Math.max(0, -i, -t, m.x - t),
          b = Math.min(n, _.w - i, c.w - t, m.x + m.w - t);
        if (y >= w || g >= b) return 0;
        let x = _.transparentColor,
          k = (d = _.alpha) != null ? d : null,
          C = _.buf === c.buf,
          z = (b - g) * 2;
        if (!C && k === null && x < 0) {
          let S = this.mem.find(_.buf, _.w * _.h * 2),
            P = this.mem.find(c.buf, c.w * c.h * 2);
          if (S !== null && P !== null) {
            let T = S.data,
              L = P.data,
              se = (_.buf - S.start) | 0,
              q = (c.buf - P.start) | 0;
            for (let K = y; K < w; K++) {
              let le = se + ((a + K) * _.w + i + g) * 2;
              L.set(T.subarray(le, le + z), q + ((r + K) * c.w + t + g) * 2);
            }
            return 0;
          }
        }
        let E = C && r < a + (w - y) && a < r + (w - y),
          B = [];
        for (let S = y; S < w; S++) B.push(S);
        E && r > a && B.reverse();
        for (let S of B) {
          let P = (a + S) * _.w,
            T = (r + S) * c.w;
          for (let L = g; L < b; L++) {
            let se = P + i + L,
              q = this.mem.read16(_.buf + se * 2),
              K = k !== null ? k[se] : 255;
            if (k !== null) {
              if (K === 0) continue;
            } else if (x >= 0 && q === (x & 65535)) continue;
            let le = c.buf + (T + t + L) * 2;
            this.mem.write16(le, K >= 255 ? q : ht(this.mem.read16(le), q, K), !0);
          }
        }
        return 0;
      }
      fillRect(e, t, r, s, i, a) {
        var n;
        let h = this.surface(e);
        if (!h || s <= 0 || i <= 0) return -1;
        let u = (n = h.clip) != null ? n : { x: 0, y: 0, w: h.w, h: h.h },
          f = Math.max(t, 0, u.x),
          d = Math.max(r, 0, u.y),
          c = Math.min(h.w, t + s, u.x + u.w),
          _ = Math.min(h.h, r + i, u.y + u.h),
          m = a & 65535;
        for (let y = d; y < _; y++) {
          let w = h.buf + (y * h.w + f) * 2;
          for (let g = f; g < c; g++) this.mem.write16(w + (g - f) * 2, m, !0);
        }
        return 0;
      }
      cleanSurface(e, t) {
        let r = this.surface(e);
        if (!r) return -1;
        let s = r.w * r.h,
          i = s * 2,
          a = t & 65535,
          n = this.mem.find(r.buf, i);
        if (n !== null) {
          let h = new DataView(n.data.buffer, n.data.byteOffset + ((r.buf - n.start) | 0), i);
          for (let u = 0; u < s; u++) h.setUint16(u * 2, a, !0);
        } else {
          let h = r.buf;
          for (let u = 0; u < s; u++) (this.mem.write16(h, a, !0), (h += 2));
        }
        return ((this.dirty = !0), 0);
      }
      gradientPaintRect(e, t, r, s, i, a, n, h) {
        var u;
        let f = this.surface(e);
        if (!f) return -1;
        let d = (u = f.clip) != null ? u : { x: 0, y: 0, w: f.w, h: f.h },
          c = Math.max(Math.min(t, s), 0, d.x),
          _ = Math.max(Math.min(r, i), 0, d.y),
          m = Math.min(Math.max(t, s), f.w - 1, d.x + d.w - 1),
          y = Math.min(Math.max(r, i), f.h - 1, d.y + d.h - 1);
        if (c > m || _ > y) return 0;
        let w = Te(a & 65535),
          g = Te(n & 65535),
          b = Math.max(m - c, 1),
          x = Math.max(y - _, 1);
        for (let k = _; k <= y; k++) {
          let C = f.buf + (k * f.w + c) * 2;
          for (let z = c; z <= m; z++) {
            let E = z - c,
              B = k - _,
              S =
                (h & 7) === 0
                  ? E / b
                  : (h & 7) === 1
                    ? B / x
                    : (h & 7) === 2
                      ? (E + B) / (b + x)
                      : (h & 7) === 3
                        ? (b - E + B) / (b + x)
                        : Math.max(Math.abs(E - b / 2), Math.abs(B - x / 2)) / Math.max(b, x) / 2;
            (S >= 0 ? S > 1 && (S = 1) : (S = 0),
              this.mem.write16(
                C + (z - c) * 2,
                V(w[0] + (g[0] - w[0]) * S, w[1] + (g[1] - w[1]) * S, w[2] + (g[2] - w[2]) * S),
                !0
              ));
          }
        }
        return ((this.dirty = !0), 0);
      }
      drawRoundRectBuffer(e, t, r, s, i, a, n = this.currentColor) {
        var h;
        if (s <= 0 || i <= 0) return 0;
        let u = this.surface(e);
        if (!u) return -1;
        let f = Math.min(Math.max(a, 0), Math.min(s, i) >> 1);
        if (f === 0) return this.drawRectBuffer(e, t, r, s, i, n);
        let d = (h = u.clip) != null ? h : { x: 0, y: 0, w: u.w, h: u.h },
          c = n & 65535,
          _ = (w, g) => {
            w < d.x ||
              g < d.y ||
              w >= d.x + d.w ||
              g >= d.y + d.h ||
              w < 0 ||
              g < 0 ||
              w >= u.w ||
              g >= u.h ||
              this.mem.write16(u.buf + (g * u.w + w) * 2, c, !0);
          };
        for (let w = t + f; w < t + s - f; w++) (_(w, r), _(w, r + i - 1));
        for (let w = r + f; w < r + i - f; w++) (_(t, w), _(t + s - 1, w));
        let m = f * f,
          y = (f - 1) * (f - 1);
        for (let w = 1; w <= f; w++)
          for (let g = 1; g <= f; g++) {
            let b = g * g + w * w;
            b > m ||
              b <= y ||
              (_(t + f - g, r + f - w),
              _(t + s - 1 - f + g, r + f - w),
              _(t + f - g, r + i - 1 - f + w),
              _(t + s - 1 - f + g, r + i - 1 - f + w));
          }
        return 0;
      }
      fillRoundRectBuffer(e, t, r, s, i, a, n = this.currentColor) {
        var h;
        if (s <= 0 || i <= 0) return 0;
        let u = this.surface(e);
        if (!u) return -1;
        let f = Math.min(Math.max(a, 0), Math.min(s, i) >> 1);
        if (f === 0) return this.fillRect(e, t, r, s, i, n);
        let d = (h = u.clip) != null ? h : { x: 0, y: 0, w: u.w, h: u.h },
          c = Math.min(t + s, d.x + d.w),
          _ = Math.min(r + i, d.y + d.h),
          m = n & 65535,
          y = f * f;
        for (let w = Math.max(r, d.y); w < _; w++)
          for (let g = Math.max(t, d.x); g < c; g++) {
            if (g < 0 || w < 0 || g >= u.w || w >= u.h) continue;
            let b = g < t + f ? t + f - g : g >= t + s - f ? g - (t + s - 1 - f) : 0,
              x = w < r + f ? r + f - w : w >= r + i - f ? w - (r + i - 1 - f) : 0;
            (b > 0 && x > 0 && b * b + x * x > y) ||
              this.mem.write16(u.buf + (w * u.w + g) * 2, m, !0);
          }
        return 0;
      }
      fillEllipseBuffer(e, t, r, s, i, a = this.currentColor) {
        var n;
        if (s <= 0 || i <= 0) return 0;
        let h = this.surface(e);
        if (!h) return -1;
        let u = (n = h.clip) != null ? n : { x: 0, y: 0, w: h.w, h: h.h },
          f = a & 65535,
          d = s / 2,
          c = i / 2;
        for (let _ = Math.max(r, u.y, 0); _ <= Math.min(r + i - 1, u.y + u.h - 1, h.h - 1); _++) {
          let m = _ + 0.5 - (r + c);
          for (let y = Math.max(t, u.x, 0); y <= Math.min(t + s - 1, u.x + u.w - 1, h.w - 1); y++) {
            let w = y + 0.5 - (t + d);
            (w * w) / (d * d) + (m * m) / (c * c) > 1 ||
              this.mem.write16(h.buf + (_ * h.w + y) * 2, f, !0);
          }
        }
        return 0;
      }
      setClip(e, t, r, s) {
        let i = this.layers.get(this.drawTarget());
        if (!i) return -1;
        if (r <= e || s <= t) return ((i.clip = { x: 0, y: 0, w: i.w, h: i.h }), 0);
        let a = Math.min(Math.max(e, 0), i.w - 1),
          n = Math.min(Math.max(t, 0), i.h - 1);
        return (
          (i.clip = {
            x: a,
            y: n,
            w: Math.min(Math.max(r - a + 1, 1), i.w - a),
            h: Math.min(Math.max(s - n + 1, 1), i.h - n),
          }),
          0
        );
      }
      resetClip() {
        let e = this.layers.get(this.drawTarget());
        return e ? ((e.clip = { x: 0, y: 0, w: e.w, h: e.h }), 0) : -1;
      }
      setLayerClip(e, t, r, s, i) {
        let a = this.layers.get(this.resolveLayerHandle(e));
        if (!a) return -1;
        if (s <= t || i <= r) return ((a.clip = { x: 0, y: 0, w: a.w, h: a.h }), 0);
        let n = Math.min(Math.max(t, 0), a.w - 1),
          h = Math.min(Math.max(r, 0), a.h - 1);
        return (
          (a.clip = {
            x: n,
            y: h,
            w: Math.min(Math.max(s - n + 1, 1), a.w - n),
            h: Math.min(Math.max(i - h + 1, 1), a.h - h),
          }),
          0
        );
      }
      resetLayerClip(e) {
        let t = this.layers.get(this.resolveLayerHandle(e));
        return t ? ((t.clip = { x: 0, y: 0, w: t.w, h: t.h }), 0) : -1;
      }
      setLayerTransColor(e, t) {
        let r = this.layers.get(this.resolveLayerHandle(e));
        return r ? ((r.transparentColor = t), 0) : -1;
      }
      setLayerOpacity(e, t) {
        let r = this.layers.get(this.resolveLayerHandle(e));
        return r ? ((r.opacity = Math.min(Math.max(t, 0), 100)), 0) : -1;
      }
      setFont(e) {
        return (this.text.setFont(e), 0);
      }
      setFontSize(e) {
        return e < 0 || e > 64 ? -1 : (this.text.setFontSize(e), 0);
      }
      characterWidth(e) {
        return this.text.charWidth(e & 65535);
      }
      characterHeight() {
        return this.text.height();
      }
      highestCharHeight() {
        return this.text.height();
      }
      charBaseline(e) {
        return this.text.baseline(e);
      }
      characterInfo() {
        let e = this.text.cellHeight(0),
          t = this.text.baseline(0);
        return {
          dwidth: this.text.advance(0),
          width: this.text.inkWidth(0),
          height: e,
          ascent: t,
          descent: e - t,
        };
      }
      stringWidth(e) {
        return this.text.measure(e)[0];
      }
      stringHeight(e) {
        return e.length === 0 ? this.text.height() : this.text.measure(e)[1];
      }
      drawTextBuffer(e, t, r, s, i = Number.MAX_SAFE_INTEGER, a = this.currentColor) {
        let n = this.surface(e);
        return n ? this.drawTextSurface(n, t, r, s, i, a) : -1;
      }
      drawTextLayer(e, t, r, s, i = Number.MAX_SAFE_INTEGER, a = this.currentColor) {
        let n = this.layers.get(this.resolveLayerHandle(e));
        return n ? this.drawTextSurface(n, t, r, s, i, a) : -1;
      }
      drawTextOnTarget(e, t, r, s = this.currentColor) {
        let i = this.drawTarget();
        return this.drawTextLayer(
          i !== W ? i : this.ensureScreenLayer(),
          e,
          t,
          r,
          Number.MAX_SAFE_INTEGER,
          s
        );
      }
      drawTextSurface(e, t, r, s, i, a) {
        var n;
        if (s.length === 0) return 0;
        let h = (n = e.clip) != null ? n : { x: 0, y: 0, w: e.w, h: e.h },
          u = this.text.rasterize(s, i),
          f = r - (((u.baseline * 2) / 3) | 0),
          d = f < h.y ? r : f,
          c = h.y + h.h - d,
          _ = u.height > c && c >= ((u.height / 2) | 0) ? c : u.height,
          m = a & 65535,
          y = h.y + h.h,
          w = h.x + h.w;
        for (let g = 0; g < _; g++) {
          let b = ((g * u.height) / _) | 0,
            x = d + g;
          if (x < 0 || x >= e.h || x < h.y || x >= y) continue;
          let k = e.buf + x * e.w * 2,
            C = b * u.width;
          for (let z = 0; z < u.width; z++) {
            let E = u.alpha[C + z];
            if (E === 0) continue;
            let B = t + z;
            if (B < 0 || B >= e.w || B < h.x || B >= w) continue;
            let S = k + B * 2;
            E >= 248
              ? this.mem.write16(S, m, !0)
              : this.mem.write16(S, ht(this.mem.read16(S), m, E), !0);
          }
        }
        return 0;
      }
      fillPolygonOnSurface(e, t, r, s) {
        var i;
        let a = this.surface(e);
        if (!a) return -1;
        let n = Math.min(t.length, r.length);
        if (n < 3) return 0;
        let h = (i = a.clip) != null ? i : { x: 0, y: 0, w: a.w, h: a.h },
          u = Number.MAX_SAFE_INTEGER,
          f = Number.MIN_SAFE_INTEGER;
        for (let m = 0; m < n; m++) (r[m] < u && (u = r[m]), r[m] > f && (f = r[m]));
        let d = Math.max(u, h.y),
          c = Math.min(f, h.y + h.h - 1, a.h - 1),
          _ = s & 65535;
        for (let m = d; m <= c; m++) {
          let y = m + 0.5,
            w = [];
          for (let g = 0; g < n; g++) {
            let b = (g + 1) % n,
              x = r[g],
              k = r[b];
            if ((x <= y && k > y) || (k <= y && x > y)) {
              let C = t[g],
                z = t[b];
              w.push(C + ((y - x) / (k - x)) * (z - C));
            }
          }
          w.sort((g, b) => g - b);
          for (let g = 0; g + 1 < w.length; g += 2) {
            let b = Math.max(w[g] | 0, h.x, 0),
              x = Math.min(w[g + 1] | 0, h.x + h.w, a.w);
            if (b < x) {
              let k = a.buf + (m * a.w + b) * 2;
              for (let C = b; C < x; C++) this.mem.write16(k + (C - b) * 2, _, !0);
            }
          }
        }
        return 0;
      }
      strokePolygonOnSurface(e, t, r, s) {
        let i = Math.min(t.length, r.length);
        if (i < 2) return 0;
        for (let a = 0; a < i; a++) {
          let n = (a + 1) % i;
          this.drawLineBuffer(e, t[a], r[a], t[n], r[n], s);
        }
        return 0;
      }
      drawRectBuffer(e, t, r, s, i, a = this.currentColor) {
        return (
          s <= 0 ||
            i <= 0 ||
            (this.fillRect(e, t, r, s, 1, a),
            this.fillRect(e, t, r + i - 1, s, 1, a),
            this.fillRect(e, t, r, 1, i, a),
            this.fillRect(e, t + s - 1, r, 1, i, a)),
          0
        );
      }
      drawLineBuffer(e, t, r, s, i, a = this.currentColor) {
        if (e === 0 || e === -1 || e === W) return this.drawLine(t, r, s, i, a);
        let n = this.surface(e);
        return n ? this.drawLineOnSurface(n, t, r, s, i, a) : -1;
      }
      drawLine(e, t, r, s, i = this.currentColor) {
        let a = this.layers.get(this.drawTarget());
        return a ? this.drawLineOnSurface(a, e, t, r, s, i) : -1;
      }
      drawLineOnSurface(e, t, r, s, i, a) {
        var n;
        let h = t,
          u = r,
          f = s,
          d = i,
          c = Math.abs(f - h),
          _ = h < f ? 1 : -1,
          m = -Math.abs(d - u),
          y = u < d ? 1 : -1,
          w = c + m,
          g = (n = e.clip) != null ? n : { x: 0, y: 0, w: e.w, h: e.h },
          b = a & 65535;
        for (
          ;
          h >= g.x &&
            u >= g.y &&
            h < g.x + g.w &&
            u < g.y + g.h &&
            h >= 0 &&
            u >= 0 &&
            h < e.w &&
            u < e.h &&
            this.mem.write16(e.buf + (u * e.w + h) * 2, b, !0),
            !(h === f && u === d);
        ) {
          let x = 2 * w;
          (x >= m && ((w += m), (h += _)), x <= c && ((w += c), (u += y)));
        }
        return 0;
      }
      flushLayers(e) {
        for (let t of e) this.flushLayer(t);
        return 0;
      }
      setBltLayers(e) {
        return ((this.pendingBlt = e.length > 0 ? e : null), 0);
      }
      flushActiveLayer() {
        if (this.pendingBlt !== null) {
          let t = this.pendingBlt;
          return ((this.pendingBlt = null), this.flushLayers(t));
        }
        let e = this.drawTarget();
        return e === W ? -1 : this.flushLayers([e]);
      }
      flushLayer(e) {
        let t = this.layers.get(e);
        if (!t) return;
        let r = t.w * t.h * 2,
          s = this.mem.find(t.buf, r),
          i = s !== null ? s.data : null,
          a = s !== null ? (t.buf - s.start) | 0 : 0,
          n = this.fb565,
          h = this.sw,
          u = this.sh,
          f = t.opacity >= 100 ? 255 : Math.round((t.opacity * 255) / 100),
          d = t.transparentColor;
        for (let c = 0; c < t.h; c++) {
          let _ = t.y + c;
          if (_ < 0 || _ >= u) continue;
          let m = _ * h;
          for (let y = 0; y < t.w; y++) {
            let w = t.x + y;
            if (w < 0 || w >= h) continue;
            let g = (c * t.w + y) * 2,
              b =
                i !== null
                  ? (i[a + g] | (i[a + g + 1] << 8)) & 65535
                  : (this.mem.read8(t.buf + g) | (this.mem.read8(t.buf + g + 1) << 8)) & 65535,
              x = m + w;
            if (!(d >= 0 && b === (d & 65535))) {
              if (f >= 255) {
                n[x] = b;
                continue;
              }
              n[x] = ht(n[x], b, f);
            }
          }
        }
        (this.flushCount++, (this.dirty = !0));
      }
      toRgba(e) {
        for (let t = 0; t < this.fb565.length; t++) {
          let r = this.fb565[t],
            s = (r >> 11) & 31,
            i = (r >> 5) & 63,
            a = r & 31;
          ((e[t * 4] = ((s * 255) / 31) | 0),
            (e[t * 4 + 1] = ((i * 255) / 63) | 0),
            (e[t * 4 + 2] = ((a * 255) / 31) | 0),
            (e[t * 4 + 3] = 255));
        }
      }
      clear(e = 0) {
        (this.fb565.fill(e & 65535), (this.dirty = !0));
      }
    };
  function Jr(e) {
    let t = e.length,
      r = 1;
    for (let n = 0; n < t; n++) r = (Math.imul(r, 31) + e[n]) | 0;
    let s = "",
      i = "",
      a = t < 8 ? t : 8;
    for (let n = 0; n < a; n++) s += e[n].toString(16);
    for (let n = t - 8 > 0 ? t - 8 : 0; n < t; n++) i += e[n].toString(16);
    return `${t}:${r}:${s}:${i}`;
  }
  var ei = class {
      constructor(e, t, r, s = 8) {
        (__publicField(this, "blocks", []),
          __publicField(this, "allocatedBytes", 0),
          __publicField(this, "peakAllocatedBytes", 0),
          __publicField(this, "allocationCalls", 0),
          __publicField(this, "freeCalls", 0),
          __publicField(this, "reallocCalls", 0),
          __publicField(this, "failedAllocations", 0),
          __publicField(this, "lastFailedRequest", 0),
          __publicField(this, "lastFailureReason", ""),
          (this.mem = e),
          (this.base = t),
          (this.capacity = r),
          (this.alignment = s),
          this.blocks.push({ start: t, size: r, free: !0 }));
      }
      search(e) {
        let t = 0,
          r = this.blocks.length;
        for (; t < r; ) {
          let s = (t + r) >>> 1,
            i = this.blocks[s].start;
          if (i === e) return s;
          i < e ? (t = s + 1) : (r = s);
        }
        return ~t;
      }
      indexOf(e) {
        let t = this.search(e);
        return t < 0 ? -1 : t;
      }
      insert(e) {
        let t = this.search(e.start);
        this.blocks.splice(t < 0 ? ~t : t, 0, e);
      }
      malloc(e) {
        if ((this.allocationCalls++, e === 0)) return 0;
        let t = this.alignedSize(e);
        if (t === 0) return this.fail(e, "invalid-size");
        for (let r of this.blocks) {
          if (!r.free || r.size < t) continue;
          let s = r.size - t;
          return (
            (r.free = !1),
            s >= 8 && ((r.size = t), this.insert({ start: (r.start + t) | 0, size: s, free: !0 })),
            (this.allocatedBytes += r.size),
            this.allocatedBytes > this.peakAllocatedBytes &&
              (this.peakAllocatedBytes = this.allocatedBytes),
            r.start
          );
        }
        return this.fail(e, "no-fit");
      }
      calloc(e) {
        let t = this.malloc(e);
        if (t !== 0) {
          let r = this.usableSize(t);
          r > 0 && this.mem.fillBytes(t, 0, r, !0);
        }
        return t;
      }
      free(e) {
        if ((this.freeCalls++, e === 0)) return !0;
        let t = this.indexOf(e);
        if (t < 0) return !1;
        let r = this.blocks[t];
        return r.free ? !1 : ((r.free = !0), (this.allocatedBytes -= r.size), this.coalesce(t), !0);
      }
      realloc(e, t) {
        if ((this.reallocCalls++, e === 0)) return this.malloc(t);
        if (t <= 0) return (this.free(e), 0);
        let r = this.alignedSize(t);
        if (r === 0) return this.fail(t, "invalid-size");
        let s = this.indexOf(e);
        if (s < 0) return 0;
        let i = this.blocks[s];
        if (i.free) return 0;
        let a = i.size;
        if (r <= a) {
          let f = a - r;
          if (f >= 8) {
            i.size = r;
            let d = (i.start + r) | 0;
            (this.insert({ start: d, size: f, free: !0 }),
              (this.allocatedBytes -= f),
              this.coalesce(this.indexOf(d)));
          }
          return e;
        }
        let n = this.blocks[s + 1];
        if (n && n.free && i.start + i.size === n.start && i.size + n.size >= r) {
          let f = r - i.size;
          this.blocks.splice(s + 1, 1);
          let d = n.size - f;
          return (
            (i.size = r),
            d >= 8 ? this.insert({ start: (i.start + r) | 0, size: d, free: !0 }) : (i.size += d),
            (this.allocatedBytes += i.size - a),
            this.allocatedBytes > this.peakAllocatedBytes &&
              (this.peakAllocatedBytes = this.allocatedBytes),
            e
          );
        }
        let h = this.malloc(t);
        if (h === 0) return 0;
        let u = Math.min(a, this.usableSize(h));
        return (u > 0 && this.mem.copyBytes(e, h, u), this.free(e), h);
      }
      usableSize(e) {
        let t = this.indexOf(e);
        if (t < 0) return 0;
        let r = this.blocks[t];
        return r.free ? 0 : r.size;
      }
      coalesce(e) {
        let t = e,
          r = this.blocks[t - 1];
        r &&
          r.free &&
          r.start + r.size === this.blocks[t].start &&
          ((r.size += this.blocks[t].size), this.blocks.splice(t, 1), t--);
        let s = this.blocks[t],
          i = this.blocks[t + 1];
        i &&
          i.free &&
          s.start + s.size === i.start &&
          ((s.size += i.size), this.blocks.splice(t + 1, 1));
      }
      alignedSize(e) {
        if (e <= 0 || e > this.capacity) return 0;
        let t = (e + this.alignment - 1) & -this.alignment;
        return t <= 0 || t > this.capacity ? 0 : t;
      }
      fail(e, t) {
        return (
          this.failedAllocations++,
          (this.lastFailedRequest = e),
          (this.lastFailureReason = t),
          0
        );
      }
      stats() {
        let e = 0,
          t = 0;
        for (let r of this.blocks) r.free ? (e += r.size) : t++;
        return {
          capacity: this.capacity,
          allocatedBytes: this.allocatedBytes,
          freeBytes: e,
          liveAllocations: t,
        };
      }
      largestFreeBlock() {
        let e = 0;
        for (let t of this.blocks) t.free && t.size > e && (e = t.size);
        return e;
      }
    },
    ti = 1,
    ri = 2,
    ct = 4,
    dt = 8,
    ne = 1,
    mt = 2,
    Tt = 4,
    Dt = 16,
    Ue = 32,
    ii = 2147483647;
  function he() {
    return Math.floor(Date.now() / 1e3);
  }
  function $t(e, t) {
    let r = e + t;
    return Number.isSafeInteger(r) ? r : null;
  }
  function Y(e) {
    return e.toLowerCase();
  }
  function si(e) {
    let t = "";
    for (let r of e) {
      let s = r.charCodeAt(0);
      t +=
        s < 32 ||
        r === "<" ||
        r === ">" ||
        r === ":" ||
        r === '"' ||
        r === "|" ||
        r === "?" ||
        r === "*"
          ? "_"
          : r;
    }
    return t;
  }
  function li(e) {
    let t = "^";
    for (let r of e)
      r === "*"
        ? (t += ".*")
        : r === "?"
          ? (t += ".")
          : ".()[]{}+^$|\\".includes(r)
            ? (t += `\\${r}`)
            : (t += r);
    return new RegExp(`${t}$`, "i");
  }
  function ai(e, t) {
    let r = e.toLowerCase(),
      s = t.toLowerCase();
    return r < s ? -1 : r > s ? 1 : e < t ? -1 : e > t ? 1 : 0;
  }
  var ni = class {
      constructor(e = ["C", "E"]) {
        (__publicField(this, "drives", new Map()),
          __publicField(this, "driveBytes", new Map()),
          __publicField(this, "handles", new Map()),
          __publicField(this, "findHandles", new Map()),
          __publicField(this, "attributeOverrides", new Map()),
          __publicField(this, "packageFiles", null),
          __publicField(this, "packageStamp", he()),
          __publicField(this, "nextHandle", 3),
          __publicField(this, "nextFindHandle", 65536),
          __publicField(this, "totalBytes", 0));
        for (let t of e) {
          let r = t.toUpperCase();
          (this.drives.set(r, {
            kind: "dir",
            name: `${r}:\\`,
            children: new Map(),
            modifiedSeconds: he(),
          }),
            this.driveBytes.set(r, 0));
        }
      }
      get storedBytes() {
        return this.totalBytes;
      }
      get openHandleCount() {
        return this.handles.size;
      }
      setPackageFiles(e, t = he()) {
        ((this.packageFiles = e), (this.packageStamp = t));
      }
      normalizeGuestPath(e) {
        let t = e.replace(/\//g, "\\").trim().replace(/\0+$/, "");
        if (t.length === 0 || t.length > 1024) return null;
        let r = t.length >= 2 && t[1] === ":",
          s = (r ? t[0] : "C").toUpperCase(),
          i = [];
        for (let a of (r ? t.slice(2) : t).split("\\"))
          if (!(a.length === 0 || a === ".")) {
            if (a === "..") return null;
            i.push(si(a));
          }
        return i.length === 0 ? `${s}:\\` : `${s}:\\${i.join("\\")}`;
      }
      defaultFolderPath(e = "C") {
        return e.toUpperCase() === "E" ? "E:\\" : "C:\\";
      }
      filename(e) {
        let t = this.normalizeGuestPath(e);
        return t === null ? null : t.length <= 3 ? "" : t.slice(t.lastIndexOf("\\") + 1);
      }
      parentPath(e) {
        let t = this.normalizeGuestPath(e);
        if (t === null) return null;
        if (t.length <= 3) return t;
        let r = t.lastIndexOf("\\");
        return r <= 2 ? t.slice(0, 3) : t.slice(0, r + 1);
      }
      resolve(e) {
        let t = this.normalizeGuestPath(e);
        if (t === null) return null;
        let r = this.walk(t);
        return r !== null ? r : this.materializePackageFile(t);
      }
      walk(e) {
        let t = this.rootOf(e[0]);
        if (t === null) return null;
        let r = t;
        if (e.length <= 3) return r;
        for (let s of e.slice(3).split("\\")) {
          if (r.kind !== "dir") return null;
          let i = r.children.get(Y(s));
          if (i === void 0) return null;
          r = i;
        }
        return r;
      }
      materializePackageFile(e) {
        let t = this.packageFiles;
        if (t === null || e.length <= 3) return null;
        let r = e.slice(e.lastIndexOf("\\") + 1);
        if (r.length === 0) return null;
        let s = t(r);
        if (s === null || s.length > 67108864) return null;
        let i = this.ensureParents(e);
        if (i === null) return null;
        let a = {
          kind: "file",
          name: r,
          drive: this.driveKey(e[0]),
          data: s,
          length: s.length,
          modifiedSeconds: this.packageStamp,
        };
        return this.chargeBytes(a) ? (i.children.set(Y(r), a), a) : null;
      }
      exists(e) {
        return this.resolve(e) !== null;
      }
      open(e, t) {
        if (this.handles.size >= 256) return -1;
        let r = this.normalizeGuestPath(e);
        if (r === null) return -1;
        let s = (t & (ri | ct | dt)) !== 0,
          i = (t & dt) !== 0;
        if (!s && (t & ti) === 0) return -1;
        let a = this.resolve(r);
        if (s) {
          if (
            (a !== null && a.kind !== "file") ||
            (a !== null && (this.attributes(r) & ne) !== 0) ||
            (a === null && (t & (ct | dt)) === 0)
          )
            return -1;
          let u = this.ensureParents(r);
          if (u === null) return -1;
          if (a === null) {
            let f = {
              kind: "file",
              name: r.slice(r.lastIndexOf("\\") + 1),
              drive: this.driveKey(r[0]),
              data: new Uint8Array(0),
              length: 0,
              modifiedSeconds: he(),
            };
            (u.children.set(Y(f.name), f), (a = f));
          }
        } else if (a === null || a.kind !== "file") return -1;
        let n = a;
        if ((t & ct) !== 0 && !this.setLength(n, 0)) return -1;
        let h = this.allocHandle();
        return (this.handles.set(h, { file: n, path: r, cursor: 0, writable: s, append: i }), h);
      }
      close(e) {
        return this.handles.delete(e) ? 0 : -1;
      }
      size(e) {
        let t = this.openFile(e);
        return t === null ? null : t.file.length;
      }
      sizeByPath(e) {
        let t = this.resolve(e);
        return t !== null && t.kind === "file" ? t.length : null;
      }
      truncate(e, t) {
        if (t < 0 || t > 67108864) return -1;
        let r = this.openFile(e);
        return r === null ||
          !r.writable ||
          (this.attributes(r.path) & ne) !== 0 ||
          !this.setLength(r.file, t)
          ? -1
          : (r.cursor > t && (r.cursor = t), 0);
      }
      freeSpace(e) {
        var t;
        let r = this.normalizeGuestPath(e);
        if (r === null) return 0;
        let s = (t = this.driveBytes.get(this.driveKey(r[0]))) != null ? t : 0,
          i = ii - s;
        return i > 0 ? Math.min(i, 2147483647) : 0;
      }
      read(e, t) {
        if (t < 0 || t > 33554432) return null;
        let r = this.openFile(e);
        if (r === null) return new Uint8Array(0);
        let s = Math.max(0, r.file.length - r.cursor),
          i = Math.min(t, s),
          a = r.file.data.slice(r.cursor, r.cursor + i);
        return ((r.cursor += i), a);
      }
      write(e, t) {
        var r;
        let s = this.openFile(e);
        if (
          s === null ||
          !s.writable ||
          t.length > 33554432 ||
          (this.attributes(s.path) & ne) !== 0
        )
          return -1;
        if (t.length === 0) return 0;
        s.append && (s.cursor = s.file.length);
        let i = $t(s.cursor, t.length);
        return i === null || i > 67108864 || !this.ensureCapacity(s.file, i)
          ? -1
          : (s.cursor > s.file.length && s.file.data.fill(0, s.file.length, s.cursor),
            s.file.data.set(t, s.cursor),
            i > s.file.length &&
              ((this.totalBytes += i - s.file.length),
              this.driveBytes.set(
                s.file.drive,
                ((r = this.driveBytes.get(s.file.drive)) != null ? r : 0) + (i - s.file.length)
              ),
              (s.file.length = i)),
            (s.cursor = i),
            (s.file.modifiedSeconds = he()),
            t.length);
      }
      seek(e, t, r) {
        let s = this.openFile(e);
        if (s === null) return null;
        let i = s.file.length,
          a;
        if (r === 0) a = 0;
        else if (r === 1) a = s.cursor;
        else if (r === 2 || r === 3) a = i;
        else return null;
        let n = $t(a, t);
        if (n === null) return null;
        if (s.writable) return n < 0 ? null : ((s.cursor = n), n);
        let h = n >= 0 && n <= i ? n : t >= 0 && t <= i ? t : null;
        return h === null ? null : ((s.cursor = h), h);
      }
      tell(e) {
        let t = this.openFile(e);
        return t === null ? null : t.cursor;
      }
      isEof(e) {
        let t = this.openFile(e);
        return t === null ? null : t.cursor >= t.file.length;
      }
      commit(e) {
        return this.openFile(e) === null ? -1 : 0;
      }
      attributes(e) {
        let t = this.normalizeGuestPath(e);
        return t === null ? -1 : this.attributesForNode(t);
      }
      setAttributes(e, t) {
        let r = this.normalizeGuestPath(e);
        if (r === null) return -1;
        let s = this.resolve(r);
        if (s === null) return -1;
        let i = s.kind === "dir" ? Dt : 0,
          a = t & (ne | mt | Tt | Ue),
          n = s.kind === "dir" ? a & ~Ue : a;
        return (this.attributeOverrides.set(this.metaKey(r), i | n), 0);
      }
      modifyTimeSeconds(e) {
        let t = this.resolve(e);
        return t === null ? null : t.modifiedSeconds;
      }
      setModifyTimeSeconds(e, t) {
        if (t < 0) return -1;
        let r = this.resolve(e);
        return r === null ? -1 : ((r.modifiedSeconds = Math.floor(t)), 0);
      }
      mkdir(e) {
        let t = this.normalizeGuestPath(e);
        if (t === null) return -1;
        let r = this.resolve(t);
        if (r !== null) return r.kind === "dir" ? 0 : -1;
        let s = this.ensureParents(t);
        return s === null
          ? -1
          : (s.children.set(Y(t.slice(t.lastIndexOf("\\") + 1)), {
              kind: "dir",
              name: t.slice(t.lastIndexOf("\\") + 1),
              children: new Map(),
              modifiedSeconds: he(),
            }),
            0);
      }
      delete(e) {
        let t = this.normalizeGuestPath(e);
        if (t === null) return -1;
        let r = this.resolve(t);
        if (r === null || r.kind !== "file" || (this.attributesForNode(t) & ne) !== 0) return -1;
        let s = this.parentOf(t);
        return s === null
          ? -1
          : (s.children.delete(Y(r.name)),
            this.releaseBytes(r),
            this.removeMetadataPrefix(this.metaKey(t)),
            0);
      }
      rmdir(e) {
        let t = this.normalizeGuestPath(e);
        if (t === null) return -1;
        let r = this.resolve(t);
        if (
          r === null ||
          r.kind !== "dir" ||
          r.children.size > 0 ||
          this.rootOf(t[0]) === r ||
          (this.attributesForNode(t) & ne) !== 0
        )
          return -1;
        let s = this.parentOf(t);
        return s === null
          ? -1
          : (s.children.delete(Y(r.name)), this.removeMetadataPrefix(this.metaKey(t)), 0);
      }
      rename(e, t) {
        let r = this.normalizeGuestPath(e),
          s = this.normalizeGuestPath(t);
        if (r === null || s === null) return -1;
        let i = this.resolve(r);
        if (i === null || (this.attributesForNode(r) & ne) !== 0) return -1;
        if (r === s) return 0;
        if (i.kind === "dir" && this.isInsideDir(i, s)) return -1;
        let a = this.resolve(s);
        if (
          (a !== null && (a.kind === "file") != (i.kind === "file")) ||
          (a !== null && a.kind === "file" && (this.attributesForNode(s) & ne) !== 0)
        )
          return -1;
        let n = this.parentOf(r),
          h = this.ensureParents(s);
        return n === null || h === null
          ? -1
          : (a !== null && a.kind === "file" && this.releaseBytes(a),
            n.children.delete(Y(i.name)),
            (i.name = s.slice(s.lastIndexOf("\\") + 1)),
            i.kind === "file"
              ? (i.drive = this.driveKey(s[0]))
              : this.retargetDrive(i, this.driveKey(s[0])),
            h.children.set(Y(i.name), i),
            (i.modifiedSeconds = he()),
            this.moveMetadataPrefix(this.metaKey(r), this.metaKey(s)),
            0);
      }
      copy(e, t) {
        let r = this.normalizeGuestPath(e),
          s = this.normalizeGuestPath(t);
        if (r === null || s === null) return -1;
        let i = this.resolve(r);
        if (i === null || i.kind !== "file" || i.length > 67108864) return -1;
        if (r === s) return 0;
        let a = this.resolve(s);
        if (
          (a !== null && a.kind !== "file") ||
          (a !== null && (this.attributesForNode(s) & ne) !== 0)
        )
          return -1;
        let n = this.ensureParents(s);
        if (n === null) return -1;
        let h = {
          kind: "file",
          name: s.slice(s.lastIndexOf("\\") + 1),
          drive: this.driveKey(s[0]),
          data: i.data.slice(0, i.length),
          length: i.length,
          modifiedSeconds: he(),
        };
        if (!this.chargeBytes(h)) return -1;
        (a !== null && this.releaseBytes(a), n.children.set(Y(h.name), h));
        let u = this.attributeOverrides.get(this.metaKey(r));
        return (u !== void 0 && this.attributeOverrides.set(this.metaKey(s), u), 0);
      }
      readAll(e, t = 33554432) {
        if (t < 0 || t > 33554432) return null;
        let r = this.resolve(e);
        return r === null || r.kind !== "file" || r.length > t ? null : r.data.slice(0, r.length);
      }
      readRange(e, t, r) {
        if (t < 0 || r < 0 || r > 33554432) return null;
        let s = this.resolve(e);
        return s === null || s.kind !== "file" || t > s.length || t + r > s.length
          ? null
          : s.data.slice(t, t + r);
      }
      findFirst(e) {
        if (this.findHandles.size >= 128) return null;
        let t = this.splitFindPattern(e);
        if (t === null) return null;
        let r = this.resolve(t.dir);
        if (r === null || r.kind !== "dir") return null;
        let s = li(t.mask),
          i = [];
        for (let n of r.children.values()) s.test(n.name) && i.push(n.name);
        if ((i.sort(ai), i.length === 0)) return null;
        let a = this.allocFindHandle();
        return (this.findHandles.set(a, { names: i, index: 0 }), { handle: a, name: i[0] });
      }
      findNext(e) {
        let t = this.findHandles.get(e);
        if (t === void 0) return null;
        let r = t.index + 1;
        return r >= t.names.length ? null : ((t.index = r), t.names[r]);
      }
      findClose(e) {
        return this.findHandles.delete(e) ? 0 : -1;
      }
      describeHandle(e) {
        var t, r;
        return (r = (t = this.handles.get(e)) == null ? void 0 : t.path) != null ? r : "?";
      }
      seedFile(e, t) {
        let r = this.normalizeGuestPath(e);
        if (r === null) return !1;
        let s = this.ensureParents(r);
        if (s === null) return !1;
        let i = s.children.get(Y(r.slice(r.lastIndexOf("\\") + 1)));
        i !== void 0 && i.kind === "file" && this.releaseBytes(i);
        let a = {
          kind: "file",
          name: r.slice(r.lastIndexOf("\\") + 1),
          drive: this.driveKey(r[0]),
          data: t.slice(),
          length: t.length,
          modifiedSeconds: he(),
        };
        return this.chargeBytes(a) ? (s.children.set(Y(a.name), a), !0) : !1;
      }
      closeAll() {
        (this.handles.clear(), this.findHandles.clear());
      }
      openFile(e) {
        var t;
        return (t = this.handles.get(e)) != null ? t : null;
      }
      allocHandle() {
        for (; this.nextHandle < 0 || this.handles.has(this.nextHandle); ) this.nextHandle++;
        return this.nextHandle++;
      }
      allocFindHandle() {
        for (; this.nextFindHandle < 0 || this.findHandles.has(this.nextFindHandle); )
          this.nextFindHandle++;
        return this.nextFindHandle++;
      }
      attributesForNode(e) {
        var t;
        let r = this.resolve(e);
        if (r === null) return -1;
        let s = r.kind === "dir" ? Dt : Ue,
          i = (t = this.attributeOverrides.get(this.metaKey(e))) != null ? t : 0,
          a = (s | (i & (ne | mt | Tt | Ue))) >>> 0;
        return (r.name.startsWith(".") && (a |= mt), a | 0);
      }
      metaKey(e) {
        return e.toLowerCase();
      }
      parentOf(e) {
        let t = this.parentPath(e);
        if (t === null || t === e) return null;
        let r = this.resolve(t.endsWith("\\") ? t.slice(0, -1) : t);
        return r !== null && r.kind === "dir" ? r : null;
      }
      ensureParents(e) {
        let t = this.rootOf(e[0]);
        if (t === null) return null;
        if (e.length <= 3) return t;
        let r = e.slice(3).split("\\");
        r.pop();
        let s = t;
        for (let i of r) {
          let a = Y(i),
            n = s.children.get(a);
          if (n === void 0) {
            let h = { kind: "dir", name: i, children: new Map(), modifiedSeconds: he() };
            (s.children.set(a, h), (s = h));
          } else {
            if (n.kind !== "dir") return null;
            s = n;
          }
        }
        return s;
      }
      ensureCapacity(e, t) {
        if (t > 67108864 || t > 134217728 - this.totalBytes + e.length) return !1;
        if (t <= e.data.length) return !0;
        let r = e.data.length + (e.data.length >> 1) + 64;
        if ((r < t && (r = t), r > 67108864 && (r = 67108864), r < t)) return !1;
        let s = new Uint8Array(r);
        return (s.set(e.data.subarray(0, e.length)), (e.data = s), !0);
      }
      setLength(e, t) {
        var r;
        if (t < 0 || t > 67108864) return !1;
        let s = t - e.length;
        return (s > 0 && this.totalBytes + s > 134217728) ||
          (t > e.data.length && !this.ensureCapacity(e, t))
          ? !1
          : (s > 0 && e.data.fill(0, e.length, t),
            (e.length = t),
            (this.totalBytes += s),
            this.driveBytes.set(
              e.drive,
              Math.max(0, ((r = this.driveBytes.get(e.drive)) != null ? r : 0) + s)
            ),
            !0);
      }
      chargeBytes(e) {
        var t;
        return this.totalBytes + e.length > 134217728
          ? !1
          : ((this.totalBytes += e.length),
            this.driveBytes.set(
              e.drive,
              ((t = this.driveBytes.get(e.drive)) != null ? t : 0) + e.length
            ),
            !0);
      }
      releaseBytes(e) {
        var t;
        ((this.totalBytes = Math.max(0, this.totalBytes - e.length)),
          this.driveBytes.set(
            e.drive,
            Math.max(0, ((t = this.driveBytes.get(e.drive)) != null ? t : 0) - e.length)
          ),
          (e.length = 0),
          (e.data = new Uint8Array(0)));
      }
      retargetDrive(e, t) {
        var r, s;
        if (e.kind === "file") {
          let i = e.length;
          (this.driveBytes.set(
            e.drive,
            Math.max(0, ((r = this.driveBytes.get(e.drive)) != null ? r : 0) - i)
          ),
            (e.drive = t),
            this.driveBytes.set(t, ((s = this.driveBytes.get(t)) != null ? s : 0) + i));
          return;
        }
        for (let i of e.children.values()) this.retargetDrive(i, t);
      }
      isInsideDir(e, t) {
        let r = this.rootOf(t[0]);
        if (r === null) return !1;
        let s = r;
        if (s === e) return !0;
        if (t.length <= 3) return !1;
        for (let i of t.slice(3).split("\\")) {
          if (s.kind !== "dir") return !1;
          let a = s.children.get(Y(i));
          if (a === void 0) return !1;
          if (((s = a), s === e)) return !0;
        }
        return !1;
      }
      driveKey(e) {
        return e.toUpperCase() === "E" ? "E" : "C";
      }
      rootOf(e) {
        var t;
        return (t = this.drives.get(this.driveKey(e))) != null ? t : null;
      }
      moveMetadataPrefix(e, t) {
        let r = [];
        for (let [s, i] of this.attributeOverrides)
          (s === e || s.startsWith(`${e}\\`)) && r.push([s, i]);
        for (let [s] of r) this.attributeOverrides.delete(s);
        for (let [s, i] of r) this.attributeOverrides.set(t + s.slice(e.length), i);
      }
      removeMetadataPrefix(e) {
        for (let t of Array.from(this.attributeOverrides.keys()))
          (t === e || t.startsWith(`${e}\\`)) && this.attributeOverrides.delete(t);
      }
      splitFindPattern(e) {
        let t = e.replace(/\//g, "\\").trim().replace(/\0+$/, "");
        if (t.trim().length === 0 || t.length > 1024) return null;
        let r = t.lastIndexOf("\\");
        if (r >= 0) {
          let s = t.slice(r + 1);
          return { dir: t.slice(0, r + 1), mask: s.length === 0 ? "*" : s };
        }
        if (t.length >= 2 && t[1] === ":") {
          let s = t.slice(2);
          return { dir: `${t.slice(0, 2)}\\`, mask: s.length === 0 ? "*" : s };
        }
        return { dir: "C:\\", mask: t };
      }
    },
    Wt = 4096,
    Ht = 8192;
  function pt(e, t, r) {
    return e < t ? t : e > r ? r : e;
  }
  var Ee;
  function hi() {
    if (Ee !== void 0) return Ee;
    try {
      Ee = new TextDecoder("gbk");
    } catch (e) {
      Ee = null;
    }
    return Ee;
  }
  function Ut(e, t, r) {
    let s = [],
      i = t;
    for (; s.length < r && e.isMapped(i, 1); ) {
      let a = 0;
      try {
        a = e.read8(i);
      } catch (n) {
        break;
      }
      if ((i++, a === 0)) break;
      s.push(a);
    }
    return Uint8Array.from(s);
  }
  function Gt(e, t) {
    let r = !1;
    for (let a = 0; a < e.length; a++)
      if (e[a] >= 128) {
        r = !0;
        break;
      }
    let s = t && r ? hi() : null;
    if (s !== null) return s.decode(e);
    let i = "";
    for (let a = 0; a < e.length; a++) i += String.fromCharCode(e[a]);
    return i;
  }
  var ui = class {
      constructor(e, t = 240, r = 320, s = 16777216, i = 67108864, a = 1048576) {
        (__publicField(this, "cpu"),
          __publicField(this, "gfx"),
          __publicField(this, "heap"),
          __publicField(this, "fs", new ni()),
          __publicField(this, "apis", new Map()),
          __publicField(this, "handlers", new Map()),
          __publicField(this, "systemCallback", 0),
          __publicField(this, "smCallback", 0),
          __publicField(this, "keyboardCallback", 0),
          __publicField(this, "penCallback", 0),
          __publicField(this, "timers", new Map()),
          __publicField(this, "nextTimerId", 1),
          __publicField(this, "events", []),
          __publicField(this, "inputEvents", []),
          __publicField(this, "eventsDispatched", 0),
          __publicField(this, "timerCallbacks", 0),
          __publicField(this, "exitCode", 0),
          __publicField(this, "resolvedNames", []),
          __publicField(this, "stubbedNames", []),
          __publicField(this, "namedResources", []),
          __publicField(this, "resourceBlobSize", 0),
          __publicField(this, "resourceMappedSize", 0),
          __publicField(this, "rawExecutableName", "app.vxp"),
          __publicField(this, "cRandState", 1),
          __publicField(this, "systemStrings", new Map()),
          __publicField(this, "ucs2Scratch", 0),
          __publicField(this, "exitReason", null),
          __publicField(this, "stubTrace", null),
          __publicField(this, "errorTrace", null),
          __publicField(this, "clockOffsetMs", 0),
          (this.mem = e),
          (this.sw = t),
          (this.sh = r),
          (this.heapSize = s),
          (this.stackBase = i),
          (this.stackSize = a),
          (this.cpu = new Lr(e)),
          e.map(16777216, 65536, !0, !1, !0),
          e.map(33554432, s, !0, !0, !1),
          e.map(i, a, !0, !0, !1),
          (this.heap = new ei(e, 33554432, s)),
          (this.gfx = new Yr(e, t, r)),
          (this.cpu.onApiCall = (n) => this.dispatch(n)),
          (this.cpu.onExit = (n) => this.requestExit(n)));
      }
      get bootstrapSemihostingExitAsReturn() {
        return this.cpu.semihostingExitAsReturn;
      }
      set bootstrapSemihostingExitAsReturn(e) {
        this.cpu.semihostingExitAsReturn = e;
      }
      get exitRequested() {
        return this.cpu.exitRequested;
      }
      get frames() {
        return this.gfx.flushCount;
      }
      requestExit(e = 0, t = "app") {
        ((this.exitCode = e), (this.exitReason = t), (this.cpu.exitRequested = !0));
      }
      api(e, t) {
        let r = this.apis.get(e);
        if (r !== void 0) return r;
        let s = (16777216 + this.apis.size * 4) | 0;
        if (s >= 16842748) throw new Error("MRE API table exhausted");
        return (this.apis.set(e, s), this.handlers.set(s, t), s);
      }
      get resolverAddress() {
        let e = this.apis.get("__vxp_resolver");
        if (e === void 0) throw new Error("__vxp_resolver not registered");
        return e;
      }
      get hasApiCapacity() {
        return this.apis.size * 4 < 65472;
      }
      addressOf(e) {
        let t = this.apis.get(e);
        return t === void 0 ? null : t;
      }
      resolveAddressOrStub(e) {
        if (!e) return 0;
        let t = this.apis.get(e);
        if (t !== void 0) return (this.resolvedNames.push(e), t);
        if (!this.hasApiCapacity) return 0;
        let r = this.api(e, this.compatibilityHandler(e));
        return (this.resolvedNames.push(e), this.stubbedNames.push(e), r);
      }
      compatibilityHandler(e) {
        let t = 0;
        return (r) => {
          (t++, t === 1 && this.stubTrace && this.stubTrace(e, r), (r.r[0] = 0));
        };
      }
      dispatch(e) {
        let t = this.handlers.get(e | 0);
        if (!t) return !1;
        try {
          t(this.cpu);
        } catch (r) {
          ((this.cpu.r[0] = 0), this.errorTrace && this.errorTrace(e, r));
        }
        return !0;
      }
      arg(e, t) {
        if (t < 0) throw new Error("negative arg index");
        if (t < 4) return e.r[t] | 0;
        try {
          return this.mem.read32((e.r[13] | 0) + ((t - 4) << 2)) | 0;
        } catch (r) {
          return 0;
        }
      }
      malloc(e) {
        return this.heap.malloc(e | 0);
      }
      hasEntryCallback() {
        return this.systemCallback !== 0 || this.smCallback !== 0;
      }
      entryCallback() {
        return this.systemCallback !== 0 ? this.systemCallback : this.smCallback;
      }
      timerCount() {
        return this.timers.size;
      }
      nowMs() {
        return Date.now() + this.clockOffsetMs;
      }
      registerTimer(e, t) {
        if (t === 0) return -1;
        let r = Math.max(1, e | 0);
        for (; this.nextTimerId === 0 || this.timers.has(this.nextTimerId); ) this.nextTimerId++;
        let s = this.nextTimerId++;
        return (
          this.timers.set(s, {
            id: s,
            intervalMs: r,
            callback: t,
            enabled: !0,
            nextFireMs: this.nowMs() + r,
          }),
          s
        );
      }
      deleteTimer(e) {
        return this.timers.delete(e);
      }
      postSystemEvent(e, t = 0) {
        this.events.push({ kind: "system", message: e, param: t });
      }
      postKeyboardEvent(e, t) {
        this.inputEvents.push({ kind: "keyboard", eventType: e, keyCode: t });
      }
      postPenEvent(e, t, r) {
        this.inputEvents.push({ kind: "pen", eventType: e, x: t, y: r });
      }
      postGuestCallback(e, ...t) {
        var r, s, i, a;
        e !== 0 &&
          this.events.push({
            kind: "callback",
            callback: e,
            argc: t.length,
            a0: (r = t[0]) != null ? r : 0,
            a1: (s = t[1]) != null ? s : 0,
            a2: (i = t[2]) != null ? i : 0,
            a3: (a = t[3]) != null ? a : 0,
          });
      }
      pollEvent() {
        var e;
        return (e = this.inputEvents.shift()) != null ? e : this.events.shift();
      }
      enqueueDueTimers(e = this.nowMs()) {
        if (this.timers.size !== 0) {
          for (let t of this.timers.values())
            if (!(!t.enabled || e < t.nextFireMs)) {
              do t.nextFireMs += t.intervalMs;
              while (t.nextFireMs <= e);
              this.events.push({ kind: "timer", timerId: t.id, callback: t.callback });
            }
        }
      }
      msUntilNextTimer(e = this.nowMs()) {
        let t = Number.MAX_SAFE_INTEGER;
        for (let r of this.timers.values()) r.enabled && r.nextFireMs < t && (t = r.nextFireMs);
        return t === Number.MAX_SAFE_INTEGER ? null : Math.max(0, t - e);
      }
      installElfVmResources(e, t) {
        if (e.length === 0) {
          ((this.namedResources = []), this.installPackageFiles());
          return;
        }
        let r = [],
          s = 0,
          i = e.length,
          a = 0;
        for (; a++ < 8192 && s < i && s < e.length; ) {
          let n = s;
          for (; n < e.length && n - s < 512 && e[n] !== 0; ) n++;
          if (n >= e.length || n === s || e[n] !== 0 || !Zt(e, s, n)) break;
          let h = qt(e, s, n);
          if (((s = n + 1), s + 8 > e.length)) break;
          let u = Ge(e, s);
          s += 4;
          let f = Ge(e, s);
          s += 4;
          let d = u - t;
          if (d < 0 || f < 0 || d + f > e.length) break;
          ((i = Math.min(i, d)),
            r.some((c) => c.name === h) || r.push({ name: h, offset: d, size: f }));
        }
        ((this.namedResources = r), this.mapResourceBlob(e), this.installPackageFiles());
      }
      installRawResources(e) {
        if (((this.namedResources = gt(e)), e.length === 0)) {
          (this.resourceBlobSize > 0 &&
            (this.mem.fillBytes(1342177280, 0, this.resourceBlobSize, !0),
            (this.resourceBlobSize = 0)),
            this.installPackageFiles());
          return;
        }
        (this.mapResourceBlob(e), this.installPackageFiles());
      }
      installPackageFiles() {
        let e = new Map();
        for (let t of this.namedResources) {
          if (t.offset < 0 || t.size < 0 || t.offset + t.size > this.resourceBlobSize) continue;
          let r = t.name
            .slice(Math.max(t.name.lastIndexOf("\\"), t.name.lastIndexOf("/")) + 1)
            .toLowerCase();
          r.length > 0 && !e.has(r) && e.set(r, t);
        }
        if (e.size === 0) {
          this.fs.setPackageFiles(null);
          return;
        }
        this.fs.setPackageFiles((t) => {
          let r = e.get(t.toLowerCase());
          if (r === void 0) return null;
          try {
            return this.mem.readBytes((1342177280 + r.offset) | 0, r.size);
          } catch (s) {
            return null;
          }
        });
      }
      mapResourceBlob(e) {
        if (e.length > oi) throw new Error(`VXP resource blob too large: ${e.length}`);
        if (this.resourceMappedSize === 0)
          ((this.resourceMappedSize = Math.max((e.length + 4095) & -4096, 4096)),
            this.mem.map(1342177280, this.resourceMappedSize, !0, !0, !1));
        else if (e.length > this.resourceMappedSize)
          throw new Error("Replacement resource blob exceeds mapped arena");
        (this.resourceBlobSize > e.length &&
          this.mem.fillBytes(1342177280 + e.length, 0, this.resourceBlobSize - e.length, !0),
          this.mem.writeBytes(1342177280, e, 0, e.length, !0),
          (this.resourceBlobSize = e.length));
      }
      resourceByName(e) {
        return this.namedResources.find((t) => t.name === e);
      }
      readUcs2Compat(e, t = 2048) {
        if (e === 0 || !this.mem.isMapped(e, 2)) return "";
        let r = "",
          s = e;
        for (let i = 0; i < t && this.mem.isMapped(s, 2); i++) {
          let a = 0;
          try {
            a = this.mem.read16(s);
          } catch (n) {
            break;
          }
          if (((s += 2), a === 0)) return r;
          r += String.fromCharCode(a);
        }
        return r;
      }
      readResourceNameCompat(e) {
        return this.readStringAuto(e, 256);
      }
      readStringAuto(e, t = 512) {
        if (e === 0 || !this.mem.isMapped(e, 1)) return "";
        let r = !1;
        if (this.mem.isMapped(e, 4))
          try {
            r =
              this.mem.read8(e) >= 32 &&
              this.mem.read8(e) <= 126 &&
              this.mem.read8(e + 1) === 0 &&
              this.mem.read8(e + 2) >= 32 &&
              this.mem.read8(e + 2) <= 126 &&
              this.mem.read8(e + 3) === 0;
          } catch (s) {
            r = !1;
          }
        if (r) return this.readUcs2Compat(e, t);
        try {
          return this.mem.readCString(e, t);
        } catch (s) {
          return "";
        }
      }
      writeUcs2(e, t) {
        if (e === 0 || !this.mem.isMapped(e, (t.length + 1) * 2)) return !1;
        let r = e;
        for (let s = 0; s < t.length; s++)
          (this.mem.write16(r, t.charCodeAt(s) & 65535, !0), (r += 2));
        return (this.mem.write16(r, 0, !0), !0);
      }
      asciiToUcs2Compat(e) {
        let t = e.r[0] | 0,
          r = pt(e.r[1] | 0, 0, 1 << 20),
          s = e.r[2] | 0;
        if (!this.mem.isMapped(t, 2) || !this.mem.isMapped(s, 1)) return 0;
        let i = r >= 2 ? Math.max((r / 2 - 1) | 0, 0) : 1023,
          a = s,
          n = t,
          h = 0;
        for (; h < i && this.mem.isMapped(a, 1) && this.mem.isMapped(n, 2); ) {
          let u = this.mem.read8(a);
          if ((a++, this.mem.write16(n, u), (n += 2), u === 0)) return h;
          h++;
        }
        return (this.mem.isMapped(n, 2) && this.mem.write16(n, 0), h);
      }
      gbToUcs2Compat(e) {
        let t = e.r[0] | 0,
          r = pt(e.r[1] | 0, 0, 1 << 20),
          s = e.r[2] | 0;
        if (!this.mem.isMapped(t, 2) || !this.mem.isMapped(s, 1)) return 0;
        let i = r >= 2 ? r : Wt,
          a = r >= 2 ? Math.max((r / 2 - 1) | 0, 0) : 1023,
          n = Ut(this.mem, s, i),
          h = Gt(n, !0),
          u = t,
          f = 0;
        for (let d = 0; d < h.length && !(f >= a || !this.mem.isMapped(u, 2)); d++)
          (this.mem.write16(u, h.charCodeAt(d) & 65535), (u += 2), f++);
        return (this.mem.isMapped(u, 2) && this.mem.write16(u, 0), f);
      }
      ucs2ToAsciiCompat(e) {
        let t = e.r[0] | 0,
          r = pt(e.r[1] | 0, 0, 1 << 20),
          s = e.r[2] | 0;
        if (!this.mem.isMapped(t, 1) || !this.mem.isMapped(s, 2)) return 0;
        let i = r > 0 ? Math.max(r - 1, 0) : 2047,
          a = s,
          n = t,
          h = 0;
        for (; h < i && this.mem.isMapped(a, 2) && this.mem.isMapped(n, 1); ) {
          let u = this.mem.read16(a);
          if (((a += 2), u === 0)) return (this.mem.write8(n, 0), h);
          (this.mem.write8(n, u >= 1 && u <= 255 ? u : 63), n++, h++);
        }
        return (this.mem.isMapped(n, 1) && this.mem.write8(n, 0), h);
      }
      narrowToUcs2Compat(e) {
        let t = this.arg(e, 0);
        if (
          t === 0 ||
          !this.mem.isMapped(t, 1) ||
          (this.ucs2Scratch === 0 &&
            ((this.ucs2Scratch = this.heap.malloc(Ht)), this.ucs2Scratch === 0))
        )
          return 0;
        let r = Ut(this.mem, t, Wt),
          s = Gt(r, !0),
          i = this.ucs2Scratch,
          a = this.ucs2Scratch + Ht - 2;
        for (let n = 0; n < s.length && !(i >= a); n++)
          (this.mem.write16(i, s.charCodeAt(n) & 65535, !0), (i += 2));
        return (this.mem.write16(i, 0, !0), this.ucs2Scratch);
      }
      charsetConvertCompat(e) {
        let t = e.r[0] | 0,
          r = e.r[1] | 0,
          s = e.r[2] | 0,
          i = e.r[3] | 0;
        if (!this.mem.isMapped(s, 1) || !this.mem.isMapped(i, 1)) return -1;
        let a =
            this.mem.isMapped(s, 4) && this.mem.read8(s + 1) === 0 && this.mem.read8(s + 3) === 0,
          n = r === 38 || (!a && r !== t),
          h = s,
          u = i,
          f = 0;
        if (n) {
          for (; f < 2047 && this.mem.isMapped(h, 1) && this.mem.isMapped(u, 2); ) {
            let c = this.mem.read8(h);
            if ((h++, this.mem.write16(u, c), (u += 2), c === 0)) break;
            f++;
          }
          let d = i + f * 2;
          this.mem.isMapped(d, 2) && this.mem.write16(d, 0);
        } else {
          for (; f < 2047 && this.mem.isMapped(h, 2) && this.mem.isMapped(u, 1); ) {
            let c = this.mem.read16(h);
            if (((h += 2), c === 0)) {
              this.mem.write8(u, 0);
              break;
            }
            (this.mem.write8(u, c >= 1 && c <= 255 ? c : 63), u++, f++);
          }
          let d = i + f;
          this.mem.isMapped(d, 1) && this.mem.write8(d, 0);
        }
        return 0;
      }
      systemAscii(e, t) {
        let r = this.systemStrings.get(e);
        if (r !== void 0) return r;
        let s = this.heap.malloc(t.length + 1);
        if (s === 0) return 0;
        for (let i = 0; i < t.length; i++) this.mem.write8(s + i, t.charCodeAt(i) & 127, !0);
        return (this.mem.write8(s + t.length, 0, !0), this.systemStrings.set(e, s), s);
      }
      normalizeGuestPath(e) {
        return this.fs.normalizeGuestPath(e);
      }
      guestFilename(e) {
        return this.fs.filename(e);
      }
      guestParentPath(e) {
        return this.fs.parentPath(e);
      }
      guestDefaultFolderPath(e) {
        return this.fs.defaultFolderPath(e);
      }
      loadNamedResource(e, t) {
        if (t !== 0 && !this.mem.isMapped(t, 4)) return 0;
        let r = this.readResourceNameCompat(e),
          s = this.namedResources.find(
            (i) =>
              i.name === r &&
              i.offset >= 0 &&
              i.size >= 0 &&
              i.offset + i.size <= this.resourceBlobSize
          );
        return s === void 0
          ? (t !== 0 && this.mem.write32(t, 0, !0), 0)
          : (t !== 0 && this.mem.write32(t, s.size, !0), (1342177280 + s.offset) | 0);
      }
      resourceDelete(e) {
        return (e >= 1342177280 && e < 1342177280 + this.resourceBlobSize) || this.heap.free(e)
          ? 0
          : -1;
      }
      resourceGetData(e) {
        let t = this.arg(e, 0),
          r = this.arg(e, 1),
          s = this.arg(e, 2),
          i = r >= 0 && s >= 0 && r + s <= this.resourceBlobSize,
          a = s === 0 || (t !== 0 && this.mem.isMapped(t, s));
        return !i || !a ? -1 : (s > 0 && this.mem.copyBytes(1342177280 + r, t, s), s);
      }
      resourceFind(e) {
        let t = this.resourceByName(e);
        return t ? t.offset : -1;
      }
    },
    oi = 64 * 1024 * 1024;
  function Ge(e, t) {
    return e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24) | 0;
  }
  function Zt(e, t, r) {
    for (let s = t; s < r; s++) if (e[s] < 32 || e[s] > 126) return !1;
    return !0;
  }
  function qt(e, t, r) {
    let s = "";
    for (let i = t; i < r; i++) s += String.fromCharCode(e[i]);
    return s;
  }
  function gt(e) {
    if (e.length === 0) return [];
    let t = [],
      r = new Set(),
      s = 0,
      i = e.length;
    for (; t.length < 8192 && !(s >= e.length || s >= i); ) {
      let a = s;
      for (; a < e.length && a - s < 255 && e[a] !== 0; ) a++;
      if (a >= e.length || e[a] !== 0 || a === s || !Zt(e, s, a)) break;
      let n = qt(e, s, a);
      if (((s = a + 1), s + 8 > e.length)) break;
      let h = Ge(e, s);
      s += 4;
      let u = Ge(e, s);
      if (((s += 4), h < 0 || u < 0 || h + u > e.length)) break;
      ((i = Math.min(i, h)), r.has(n) || (r.add(n), t.push({ name: n, offset: h, size: u })));
    }
    return t;
  }
  var Kt = 2060,
    fi = 1 << 20;
  function F(e, t) {
    return e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24) | 0;
  }
  function Xt(e) {
    let t = e & 255,
      r = ((e >>> 8) & 15) * 2;
    return r === 0 ? t : (t >>> r) | (t << (32 - r)) | 0;
  }
  function ci(e, t, r) {
    let s = Math.min(e.length, t + r),
      i = t;
    for (; i < s && e[i] !== 0; ) {
      let n = e[i];
      if (n < 32 || n > 126) return "";
      i++;
    }
    if (i === t) return "";
    let a = "";
    for (let n = t; n < i; n++) a += String.fromCharCode(e[n]);
    return a;
  }
  function jt(e, t) {
    let r = t.length;
    if (r === 0) return 0;
    e: for (let s = 0; s + r <= e.length; s++) {
      for (let i = 0; i < r; i++) if (e[s + i] !== t.charCodeAt(i)) continue e;
      return s;
    }
    return -1;
  }
  function Vt(e) {
    if (e.length < 256) return !1;
    let t = F(e, 0),
      r = F(e, 4),
      s =
        (t & 268431360) === 42958848 &&
        (r & 4293918720) === -393216e3 &&
        ((r >>> 20) & 1) === 1 &&
        ((r >>> 16) & 15) === 8,
      i = jt(e, "mre-") >= 0 || jt(e, "vm_reg_sysevt_callback") >= 0;
    return s || i;
  }
  function di(e) {
    if (!ce(e, 0)) throw new Error("Raw ARM VXP does not start with zlib");
    let t = [],
      r = 0,
      s = 0;
    for (let i = 0; i < 8 && ce(e, r); i++) {
      let a = Ct(e, r, 33554432);
      if (a === null) break;
      if (((s += a.bytes.length), s > 67108864))
        throw new Error("RAW streams exceed 67108864 byte total inflate safety limit");
      for (t.push(a), r += a.compressedSize; r < e.length && e[r] === 0; ) r++;
    }
    if (t.length === 0) throw new Error("No zlib stream decoded");
    return { streams: t, nextOffset: r };
  }
  function mi(e, t, r) {
    var s, i;
    let a = t[0].bytes;
    if (a.length < 256) throw new Error("Raw ARM code stream too small");
    let n = (i = (s = t[1]) == null ? void 0 : s.bytes) != null ? i : new Uint8Array(0),
      h = r < e.length ? e.slice(r) : new Uint8Array(0),
      u = Jt(a),
      f = Yt(a);
    return {
      code: a,
      initialData: n,
      resources: h,
      streams: t,
      imports: u,
      vmMainOffset: er(a, u),
      dataSizeHint: f.dataSize,
      bssSizeHint: f.bssSize,
      resolverSlotOffset: Qt(a, u),
    };
  }
  function pi(e) {
    let t = Bt(e, 0, 33554432);
    if (t === null || !Vt(t.bytes)) return null;
    let r = [{ compressedOffset: 0, compressedSize: t.nextInputOffset, bytes: t.bytes }],
      s = St(e, t.nextInputOffset),
      i = new Uint8Array(0),
      a = Math.min(Math.max(t.bytes.length, fi), 33554432),
      n = s < e.length ? Bt(e, s, a) : null;
    if (n !== null) {
      if (t.bytes.length + n.bytes.length > 67108864)
        throw new Error("LZMA streams exceed 67108864 byte total inflate safety limit");
      (r.push({ compressedOffset: s, compressedSize: n.nextInputOffset - s, bytes: n.bytes }),
        (i = n.bytes),
        (s = St(e, n.nextInputOffset)));
    }
    let h = r.length > 1 && s < e.length ? e.subarray(s) : null,
      u = h !== null && wi(h) > 0 ? e.slice(s) : new Uint8Array(0),
      f = Jt(t.bytes),
      d = Yt(t.bytes);
    return {
      code: t.bytes,
      initialData: i,
      resources: u,
      streams: r,
      imports: f,
      vmMainOffset: er(t.bytes, f),
      dataSizeHint: d.dataSize,
      bssSizeHint: d.bssSize,
      resolverSlotOffset: Qt(t.bytes, f),
    };
  }
  function Qt(e, t) {
    var r;
    let s = new Map();
    for (let n of t) {
      let h = Math.max(n.stubOffset, 0),
        u = Math.min(e.length, h + 96);
      for (let f = h; f + 4 <= u; f += 4) {
        let d = F(e, f);
        if ((d & 268435440) !== 19922736) continue;
        let c = d & 15,
          _ = Math.max(h, f - 32);
        for (let m = f - 4; m >= _; m -= 4) {
          let y = F(e, m),
            w = (y >>> 16) & 15,
            g = (y >>> 12) & 15;
          if (
            !(
              ((y >>> 26) & 3) === 1 &&
              ((y >>> 25) & 1) === 0 &&
              ((y >>> 24) & 1) === 1 &&
              ((y >>> 20) & 1) === 1
            ) ||
            w !== c ||
            g !== c
          )
            continue;
          let b = y & 4095,
            x = ((y >>> 23) & 1) !== 0;
          for (let k = m - 4; k >= Math.max(h, m - 24); k -= 4) {
            let C = F(e, k);
            if (
              ((C >>> 25) & 1) === 0 &&
              ((C >>> 21) & 15) === 4 &&
              ((C >>> 16) & 15) === c &&
              ((C >>> 12) & 15) === c &&
              (C & 4095) === 9
            ) {
              for (let z = k - 4; z >= Math.max(h, k - 24); z -= 4) {
                let E = F(e, z);
                if (
                  !(
                    ((E >>> 26) & 3) === 1 &&
                    ((E >>> 25) & 1) === 0 &&
                    ((E >>> 24) & 1) === 1 &&
                    ((E >>> 20) & 1) === 1 &&
                    ((E >>> 16) & 15) === 15 &&
                    ((E >>> 12) & 15) === c
                  )
                )
                  continue;
                let B = E & 4095,
                  S = ((E >>> 23) & 1) !== 0,
                  P = z + 8 + (S ? B : -B);
                if (P >= 0 && P + 4 <= e.length) {
                  let T = (F(e, P) + (x ? b : -b)) | 0;
                  T >= 0 && T < 16 * 1024 * 1024 && s.set(T, ((r = s.get(T)) != null ? r : 0) + 1);
                }
                break;
              }
              break;
            }
          }
          break;
        }
      }
    }
    let i = Kt,
      a = -1;
    for (let [n, h] of s) (h > a || (h === a && n < i)) && ((i = n), (a = h));
    return a < 0 ? Kt : i;
  }
  function Yt(e) {
    try {
      let t = F(e, 0),
        r = 8 + Xt(t);
      if (r < 0 || r + 16 > e.length) return { dataSize: 0, bssSize: 0 };
      let s = (r + F(e, r)) | 0,
        i = (r + F(e, r + 4)) | 0,
        a = (r + F(e, r + 8)) | 0,
        n = (r + F(e, r + 12)) | 0,
        h = 0;
      for (let f = s; f + 12 <= i && f + 12 <= e.length; f += 12) {
        let d = F(e, f),
          c = F(e, f + 4),
          _ = F(e, f + 8);
        d !== c && _ > h && _ < 64 * 1024 * 1024 && (h = _);
      }
      let u = 0;
      for (let f = a; f + 8 <= n && f + 8 <= e.length; f += 8) {
        let d = F(e, f),
          c = F(e, f + 4),
          _ = d & -4;
        c >= 0 && c < 64 * 1024 * 1024 && (u = Math.max(u, (_ + c) | 0));
      }
      return { dataSize: h, bssSize: Math.max(0, u - h) };
    } catch (t) {
      return { dataSize: 0, bssSize: 0 };
    }
  }
  function Jt(e) {
    let t = new Map(),
      r = (s, i) => {
        if (s < 0 || s >= e.length) return;
        let a = ci(e, s, 128);
        if (a !== "strtoi" && !a.startsWith("vm_")) return;
        let n = i & -4;
        for (let h = n; h >= Math.max(0, n - 96); h -= 4)
          if ((F(e, h) & 4294901760) === -382926848) {
            n = h;
            break;
          }
        t.has(a) || t.set(a, { name: a, stubOffset: n, nameOffset: s });
      };
    for (let s = 0; s + 4 <= e.length; s += 4) {
      let i = F(e, s);
      if (s >= 4 && i === -527499264) {
        let n = F(e, s - 4);
        if ((n & 4294963200) === -442564608) {
          let h = n & 4095,
            u = s + 4 + h;
          u >= 0 && u + 4 <= e.length && r((s + 8 + F(e, u)) | 0, s - 4);
        }
      }
      let a = i & 268369920;
      if (a === 42926080 || a === 38731776) {
        let n = Xt(i),
          h = a === 42926080 ? s + 8 + n : s + 8 - n,
          u = Math.min(e.length, s + 28),
          f = !1;
        for (let d = s + 4; d + 4 <= u; d += 4) {
          let c = F(e, d);
          if (
            (c & 234881024) === 167772160 ||
            (c & 268435440) === 19922704 ||
            (c & 268435440) === 19922736
          ) {
            f = !0;
            break;
          }
        }
        f && r(h, s);
      }
    }
    return [...t.values()];
  }
  function er(e, t) {
    var r, s, i;
    let a =
      (r = t.find((c) => c.name === "vm_reg_sysevt_callback")) == null ? void 0 : r.stubOffset;
    if (a === void 0) return null;
    let n =
        (s = t.find((c) => c.name === "vm_reg_keyboard_callback")) == null ? void 0 : s.stubOffset,
      h = (i = t.find((c) => c.name === "vm_reg_pen_callback")) == null ? void 0 : i.stubOffset,
      u = rr(e, a);
    if (u.length === 0) return null;
    let f = new Map();
    for (let c of u) {
      let _ = _i(e, c);
      if (f.has(_)) continue;
      let m = 10;
      (n !== void 0 && tr(e, _, Math.min(e.length, _ + 384), n) && (m += 4),
        h !== void 0 && tr(e, _, Math.min(e.length, _ + 384), h) && (m += 2));
      let y = rr(e, _)
        .filter((w) => w < 16384)
        .reduce((w, g) => Math.min(w, g), Number.MAX_SAFE_INTEGER);
      (y !== Number.MAX_SAFE_INTEGER && (m += 20),
        f.set(_, { start: _, score: m, earliestCaller: y }));
    }
    let d = [...f.values()].sort(
      (c, _) => _.score - c.score || c.earliestCaller - _.earliestCaller || c.start - _.start
    )[0];
    return d ? d.start : null;
  }
  function gi(e) {
    return (e & 4294901760) === -382926848 || (e & 4294963200) === -449978368;
  }
  function _i(e, t) {
    let r = Math.max(0, (t & -4) - 1024);
    for (let s = t & -4; s >= r; s -= 4)
      if (gi(F(e, s))) {
        for (let i = Math.max(0, s - 16); i < s; i += 4) if (yi(e, i)) return i;
        return s;
      }
    return t & -4;
  }
  function yi(e, t) {
    for (let r = 0; r + 4 <= e.length; r += 4) {
      let s = F(e, r);
      if ((s & 251658240) !== 184549376) continue;
      let i = s & 16777215;
      if (((i & 8388608) !== 0 && (i |= 4278190080), ((r + 8 + (i << 2)) | 0) === t)) return !0;
    }
    return !1;
  }
  function tr(e, t, r, s) {
    for (let i = t & -4; i + 4 <= r; i += 4) if (ir(e, i) === s) return !0;
    return !1;
  }
  function rr(e, t) {
    let r = [];
    for (let s = 0; s + 4 <= e.length; s += 4) ir(e, s) === t && r.push(s);
    return r;
  }
  function ir(e, t) {
    let r = F(e, t);
    if ((r & 234881024) !== 167772160) return null;
    let s = (r & 16777216) !== 0,
      i = (r >>> 28) & 15;
    if (!s && i !== 14) return null;
    let a = r & 16777215;
    return ((a & 8388608) !== 0 && (a |= 4278190080), (t + 8 + (a << 2)) | 0);
  }
  function wi(e) {
    return gt(e).length;
  }
  function _t(e, t) {
    return (
      t >= 0 &&
      t + 4 <= e.length &&
      e[t] === 127 &&
      e[t + 1] === 69 &&
      e[t + 2] === 76 &&
      e[t + 3] === 70
    );
  }
  function bi(e) {
    if (e.length < 8) return !1;
    let t = (e[0] << 16) | (e[1] << 8) | e[2];
    return t === 4609875 || t === 4413267 || t === 5920595;
  }
  function vi(e) {
    let t = Math.min(e.length - 4, 1048576);
    for (let r = 1; r <= t; r++) if (_t(e, r)) return r;
    return -1;
  }
  function xi(e) {
    try {
      return di(e);
    } catch (t) {
      return null;
    }
  }
  function Mi(e) {
    var t, r;
    let s = Pe(e),
      i = (h, u, f = "") => ({
        kind: h,
        backend: u,
        sourceSize: e.length,
        elf: null,
        raw: null,
        tags: s,
        detail: f,
      }),
      a = !1;
    if (e.length > 67108864)
      return __spreadProps(__spreadValues({}, i("UNKNOWN", "UNKNOWN")), {
        detail: "source exceeds 67108864 bytes",
      });
    if (bi(e))
      return __spreadProps(__spreadValues({}, i("FLASH_LITE_SWF", "FLASH_LITE")), {
        detail: "Flash Lite SWF \u2014 backend ch\u01B0a port",
      });
    if (_t(e, 0)) return __spreadProps(__spreadValues({}, i("ELF32_ARM", "ELF_ARM")), { elf: e });
    if (ce(e, 0)) {
      let h = xi(e),
        u =
          (r = (t = h == null ? void 0 : h.streams[0]) == null ? void 0 : t.bytes) != null
            ? r
            : null;
      if (h === null || u === null)
        return __spreadProps(__spreadValues({}, i("UNKNOWN", "UNKNOWN")), {
          detail: "zlib stream could not be inflated",
        });
      if (_t(u, 0))
        return u.length > 33554432
          ? __spreadProps(__spreadValues({}, i("ZLIB_ELF", "UNKNOWN")), {
              detail: "inflated executable exceeds safety limit",
            })
          : __spreadProps(__spreadValues({}, i("ZLIB_ELF", "ELF_ARM")), { elf: u });
      if (Vt(u)) {
        let f = mi(e, h.streams, h.nextOffset);
        return __spreadProps(__spreadValues({}, i("RAW_ARM_ZLIB", "RAW_ARM")), { raw: f });
      }
      return __spreadProps(__spreadValues({}, i("UNKNOWN", "UNKNOWN")), {
        detail: "zlib payload is neither ELF nor a RAW ARM MRE image",
      });
    }
    if (At(e, 0)) {
      a = !0;
      try {
        let h = pi(e);
        if (h !== null)
          return __spreadProps(__spreadValues({}, i("LZMA_RAW_ARM", "RAW_ARM")), { raw: h });
      } catch (h) {
        return __spreadProps(__spreadValues({}, i("LZMA_RAW_ARM", "UNKNOWN")), {
          detail: h instanceof Error ? h.message : String(h),
        });
      }
    }
    let n = vi(e);
    return n >= 0
      ? e.length - n > 33554432
        ? __spreadProps(__spreadValues({}, i("EMBEDDED_ELF", "UNKNOWN")), {
            detail: "embedded ELF exceeds safety limit",
          })
        : __spreadProps(__spreadValues({}, i("EMBEDDED_ELF", "ELF_ARM")), { elf: e.slice(n) })
      : a
        ? __spreadProps(__spreadValues({}, i("LZMA_RAW_ARM", "UNKNOWN")), {
            detail: "LZMA-alone payload is not a RAW ARM MRE image",
          })
        : __spreadProps(__spreadValues({}, i("UNKNOWN", "UNKNOWN")), {
            detail: "no executable ELF32 payload found",
          });
  }
  var Ae = {
      maxExecutableBytes: 33554432,
      maxProgramHeaders: 1024,
      maxSectionHeaders: 4096,
      maxRegionBytes: 33554432,
      maxMappedBytes: 134217728,
    },
    sr = 40,
    yt = 1,
    wt = 1,
    Ze = 2,
    ki = 3,
    Ci = 9,
    qe = 11,
    lr = 8,
    ye = 0,
    Ei = 2,
    Ai = 3,
    Si = 10,
    Bi = 21,
    Ri = 22,
    zi = 23,
    Li = 28,
    Pi = 29,
    Ni = 30,
    Ke = 1,
    we = 2,
    Ii = 4;
  function I(e, t) {
    return e[t] | (e[t + 1] << 8) | (e[t + 2] << 16) | (e[t + 3] << 24) | 0;
  }
  function oe(e, t) {
    return e[t] | (e[t + 1] << 8);
  }
  function ar(e) {
    return e & -4096;
  }
  function bt(e) {
    return (e + 4095) & -4096;
  }
  function nr(e, t, r, s) {
    return e < 0 || t <= 0 || r < 0 ? !1 : e + t * r <= s;
  }
  function hr(e, t, r) {
    return e < 0 || t < 0 ? !1 : e + t <= r;
  }
  var Fi = class fe {
      constructor(t, r, s, i, a) {
        (__publicField(this, "symbolCache", new Map()),
          __publicField(this, "relocErrors", []),
          (this.bytes = t),
          (this.type = r),
          (this.entry = s),
          (this.programHeaders = i),
          (this.sections = a));
      }
      static parse(t) {
        if (t.length < 52) throw new Error("ELF file too small");
        if (t.length > Ae.maxExecutableBytes) throw new Error("ELF exceeds safety limit");
        if (t[0] !== 127 || t[1] !== 69 || t[2] !== 76 || t[3] !== 70)
          throw new Error("Not an ELF file");
        if (t[4] !== 1) throw new Error("Only ELF32 is supported");
        if (t[5] !== 1) throw new Error("Only little-endian ELF is supported");
        let r = oe(t, 16),
          s = oe(t, 18),
          i = I(t, 36) & 251658240;
        if (s !== sr && !(s === 0 && i !== 0))
          throw new Error(`ELF machine=${s}, expected ARM (${sr})`);
        if (oe(t, 40) < 52) throw new Error("Invalid ELF header size");
        let a = I(t, 24),
          n = I(t, 28),
          h = I(t, 32),
          u = oe(t, 42),
          f = oe(t, 44),
          d = oe(t, 46),
          c = oe(t, 48),
          _ = oe(t, 50);
        if (f > Ae.maxProgramHeaders) throw new Error(`Too many ELF program headers: ${f}`);
        if (c > Ae.maxSectionHeaders) throw new Error(`Too many ELF section headers: ${c}`);
        if (f > 0) {
          if (u < 32 || u > 256) throw new Error(`Invalid ELF program-header entry size: ${u}`);
          if (!nr(n, u, f, t.length)) throw new Error("Broken ELF program-header table");
        }
        if (c > 0) {
          if (h === 0) throw new Error("ELF section count is nonzero but section table is absent");
          if (d < 40 || d > 256) throw new Error(`Invalid ELF section-header entry size: ${d}`);
          if (!nr(h, d, c, t.length)) throw new Error("Broken ELF section-header table");
        }
        let m = [],
          y = 0;
        for (let g = 0; g < f; g++) {
          let b = n + g * u,
            x = {
              type: I(t, b),
              offset: I(t, b + 4),
              vaddr: I(t, b + 8),
              filesz: I(t, b + 16),
              memsz: I(t, b + 20),
              flags: I(t, b + 24),
              align: I(t, b + 28),
            };
          if (x.type === yt) {
            if (x.filesz < 0 || x.memsz < x.filesz)
              throw new Error(`Invalid PT_LOAD sizes in header #${g}`);
            if (x.memsz > Ae.maxRegionBytes)
              throw new Error(`PT_LOAD #${g} exceeds guest-region limit`);
            if (!hr(x.offset, x.filesz, t.length)) throw new Error(`PT_LOAD #${g} outside file`);
            if ((x.vaddr >>> 0) + x.memsz > 4294967296)
              throw new Error(`PT_LOAD #${g} wraps guest address space`);
            if (((y += x.memsz), y > Ae.maxMappedBytes))
              throw new Error("ELF PT_LOAD total exceeds guest mapping limit");
          }
          m.push(x);
        }
        let w = [];
        if (c > 0) {
          for (let g = 0; g < c; g++) {
            let b = h + g * d,
              x = {
                nameOffset: I(t, b),
                type: I(t, b + 4),
                flags: I(t, b + 8),
                addr: I(t, b + 12),
                offset: I(t, b + 16),
                size: I(t, b + 20),
                link: I(t, b + 24),
                info: I(t, b + 28),
                addralign: I(t, b + 32),
                entsize: I(t, b + 36),
                name: "",
              };
            if (x.size < 0) throw new Error(`Negative ELF section size #${g}`);
            (x.type !== lr &&
              x.size > 0 &&
              !hr(x.offset, x.size, t.length) &&
              ((x.flags & we) !== 0 && x.offset >= 0
                ? (x.size = Math.min(Math.max(t.length - x.offset, 0), x.size))
                : (x.size = 0)),
              w.push(x));
          }
          if (_ !== 0 && (_ < 0 || _ >= w.length)) throw new Error(`Invalid ELF shstrndx=${_}`);
          if (_ > 0 && _ < w.length) {
            let g = w[_];
            if (g.type !== ki) throw new Error("ELF shstrndx does not reference a string table");
            for (let b of w)
              b.name =
                b.nameOffset < 0 || b.nameOffset >= g.size
                  ? ""
                  : fe.readZ(t, g.offset + b.nameOffset, g.offset + g.size);
          }
        }
        return new fe(t, r, a, m, w);
      }
      static readZ(t, r, s) {
        if (r < 0 || r >= t.length || r >= s) return "";
        let i = r,
          a = Math.min(s, t.length);
        for (; i < a && t[i] !== 0; ) i++;
        let n = "";
        for (let h = r; h < i; h++) n += String.fromCharCode(t[h]);
        return n;
      }
      armccRwpiImageSize() {
        let t = this.sections.find(
          (n) =>
            n.name === "ER_RO" &&
            n.type === wt &&
            (n.flags & we) !== 0 &&
            (n.flags & Ii) !== 0 &&
            n.size > 0
        );
        if (!t) return 0;
        let r = this.sections.find(
          (n) =>
            n.name === "ER_RW" &&
            n.type === wt &&
            (n.flags & we) !== 0 &&
            (n.flags & Ke) !== 0 &&
            n.addr === 0 &&
            n.size > 0
        );
        if (!r) return 0;
        let s = this.programHeaders.find(
          (n) => n.type === yt && n.vaddr === t.addr && n.filesz > 0
        );
        if (
          !s ||
          r.offset < t.offset + t.size ||
          r.offset + r.size > this.bytes.length ||
          s.filesz < t.size + r.size
        )
          return 0;
        let i = this.sections.filter(
          (n) =>
            (n.flags & we) !== 0 &&
            (n.flags & Ke) !== 0 &&
            n.size > 0 &&
            n.addr >= 0 &&
            n.addr < 16 * 1024 * 1024
        );
        if (i.length === 0) return 0;
        let a = Math.max(...i.map((n) => n.addr + n.size));
        return a <= 0 || a > 16 * 1024 * 1024 ? 0 : a;
      }
      correctedLoadOffset(t) {
        if (t.filesz <= 0 || this.sections.length === 0) return t.offset;
        let r = this.sections
            .map((h, u) => ({ s: h, i: u }))
            .filter(({ s: h }) => h.type === wt && (h.flags & we) !== 0 && h.size > 0)
            .sort((h, u) => h.s.offset - u.s.offset),
          s = r.findIndex(({ s: h }) => h.addr === t.vaddr);
        if (s < 0) return t.offset;
        let i = r[s],
          a = i.s.offset,
          n = 0;
        for (let h = 0; h < r.length; h++) {
          let u = r[h].s;
          if (u.offset !== a) {
            if (n > 0) break;
            continue;
          }
          if (!(n === 0 && h !== s) && ((n += u.size), (a += u.size), n >= t.filesz)) break;
        }
        return n === t.filesz && i.s.offset !== t.offset ? i.s.offset : t.offset;
      }
      load(t) {
        let r = this.programHeaders.filter((d) => d.type === yt && d.memsz > 0);
        if (r.length === 0) throw new Error("ELF has no PT_LOAD segment");
        let s = Math.min(...r.map((d) => d.vaddr >>> 0)),
          i = this.type === 3 && s < 65536 ? 65536 : 0,
          a = 2147483647,
          n = 0,
          h = this.armccRwpiImageSize(),
          u = h > 0 ? 8388608 : null;
        if (u !== null) {
          let d = u - 4096,
            c = bt(u + h);
          t.isMapped(d, c - d) || t.map(d, c - d, !0, !0, !1);
        } else {
          let d = this.sections.filter(
            (c) => (c.flags & we) !== 0 && (c.flags & Ke) !== 0 && c.size > 0
          );
          for (let c of d) {
            let _ = c.addr,
              m = _ + c.size;
            if (
              !r.some((y) => {
                let w = y.vaddr,
                  g = w + y.memsz;
                return _ >= w && m <= g;
              }) &&
              _ >= 0 &&
              m > _ &&
              m <= 16 * 1024 * 1024
            ) {
              let y = ar(c.addr + i),
                w = bt(c.addr + i + c.size);
              t.isMapped(y, w - y) || t.map(y, w - y, !0, !0, !1);
            }
          }
        }
        for (let d of r) {
          if (d.filesz < 0 || d.memsz < d.filesz) throw new Error("Invalid PT_LOAD sizes");
          let c = this.correctedLoadOffset(d);
          if (c < 0 || c + d.filesz > this.bytes.length) throw new Error("PT_LOAD outside file");
          let _ = ar(d.vaddr + i),
            m = bt(d.vaddr + i + d.memsz),
            y = m - _,
            w = (d.flags & 4) !== 0,
            g = (d.flags & 2) !== 0,
            b = (d.flags & 1) !== 0;
          (t.isMapped(_, y) || t.map(_, y, w || b, g, b),
            d.filesz > 0 && t.writeBytes(d.vaddr + i, this.bytes, c, d.filesz, !0),
            (a = Math.min(a, _)),
            (n = Math.max(n, m)));
        }
        let f = r.reduce((d, c) => (c.vaddr >>> 0 < d.vaddr >>> 0 ? c : d)).vaddr + i;
        return {
          entry: this.entry !== 0 ? (this.entry + i) | 0 : f | 0,
          loadBias: i,
          imageStart: a | 0,
          imageEnd: n | 0,
          staticBase: u,
          staticImageSize: h,
        };
      }
      readSymbols(t) {
        let r = this.symbolCache.get(t);
        if (r) return r;
        let s = this.sections[t];
        if (!s || s.entsize <= 0 || s.link < 0 || s.link >= this.sections.length)
          return (this.symbolCache.set(t, []), []);
        let i = this.sections[s.link],
          a = [],
          n = s.offset,
          h = Math.min(s.offset + s.size, this.bytes.length);
        for (; n + 16 <= h; ) {
          let u = I(this.bytes, n);
          (a.push({
            name: fe.readZ(this.bytes, i.offset + u, i.offset + i.size),
            value: I(this.bytes, n + 4),
            size: I(this.bytes, n + 8),
            info: this.bytes[n + 12],
            other: this.bytes[n + 13],
            shndx: oe(this.bytes, n + 14),
          }),
            (n += s.entsize));
        }
        return (this.symbolCache.set(t, a), a);
      }
      sectionAddress(t, r) {
        let s = this.sections.find((i) => i.name === t);
        return s ? (s.addr + r.loadBias) | 0 : null;
      }
      sectionSize(t) {
        var r, s;
        return (s = (r = this.sections.find((i) => i.name === t)) == null ? void 0 : r.size) != null
          ? s
          : 0;
      }
      vmResSection() {
        let t = this.sections.find((r) => r.name === ".vm_res" && r.size > 0);
        if (!t) return null;
        if (t.offset < 0 || t.size < 0 || t.offset + t.size > this.bytes.length)
          throw new Error(".vm_res section outside file");
        return { bytes: this.bytes.subarray(t.offset, this.bytes.length), offset: t.offset };
      }
      definedSymbolAddress(t, r) {
        for (let s = 0; s < this.sections.length; s++) {
          let i = this.sections[s];
          if (i.type !== Ze && i.type !== qe) continue;
          let a = this.readSymbols(s).find((n) => n.shndx !== ye && n.name === t);
          if (a) return (a.value + r.loadBias) | 0;
        }
        return null;
      }
      undefinedSymbols() {
        let t = new Set();
        for (let r = 0; r < this.sections.length; r++) {
          let s = this.sections[r];
          if (!(s.type !== Ze && s.type !== qe))
            for (let i of this.readSymbols(r)) i.shndx === ye && i.name && t.add(i.name);
        }
        return [...t];
      }
      functionSymbols(t) {
        let r = [],
          s = new Set();
        for (let i = 0; i < this.sections.length; i++) {
          let a = this.sections[i];
          if (!(a.type !== Ze && a.type !== qe))
            for (let n of this.readSymbols(i)) {
              if (n.shndx === ye || !n.name || (n.info & 15) !== 2) continue;
              let h = ((n.value & -2) + t.loadBias) | 0,
                u = `${n.name}@${h.toString(16)}`;
              s.has(u) || (s.add(u), r.push(__spreadProps(__spreadValues({}, n), { value: h })));
            }
        }
        return r.sort((i, a) => i.value - a.value || i.name.localeCompare(a.name));
      }
      applyRelocations(t, r, s) {
        let i = new Set();
        for (let a of this.sections) {
          if (a.type !== Ci || a.entsize <= 0 || a.link < 0 || a.link >= this.sections.length)
            continue;
          let n = this.readSymbols(a.link),
            h = a.offset,
            u = a.offset + a.size,
            f = Math.max(a.entsize, 8);
          for (; h + 8 <= u && h + 8 <= this.bytes.length; ) {
            let d = I(this.bytes, h),
              c = I(this.bytes, h + 4),
              _ = c & 255,
              m = c >>> 8,
              y = (d + r.loadBias) | 0,
              w = 0;
            try {
              w = t.read32(y);
            } catch (x) {
              h += f;
              continue;
            }
            if (_ === zi) {
              (t.write32(y, (r.loadBias + w) | 0, !0), (h += f));
              continue;
            }
            if (_ === 0) {
              h += f;
              continue;
            }
            let g = n[m],
              b = 0;
            if (g === void 0) b = 0;
            else if (g.shndx === ye) {
              let x = s.addressOf(g.name);
              x === null
                ? (g.name && i.add(g.name),
                  (b = g.name && s.hasApiCapacity ? s.resolveAddressOrStub(g.name) : 0))
                : (b = x);
            } else b = (g.value + r.loadBias) | 0;
            if (g === void 0 || g.shndx !== ye || b !== 0)
              switch (_) {
                case Ei:
                  t.write32(y, (b + w) | 0, !0);
                  break;
                case Ai:
                  t.write32(y, (b + w - y) | 0, !0);
                  break;
                case Bi:
                case Ri:
                  t.write32(y, b | 0, !0);
                  break;
                case Li:
                case Pi:
                  this.patchArmBranch(t, y, b);
                  break;
                case Si:
                case Ni:
                  this.patchThumbBranch(t, y, b);
                  break;
                default:
                  this.relocErrors.push(`unsupported type=${_}@0x${(y >>> 0).toString(16)}`);
                  break;
              }
            h += f;
          }
        }
        return [...i];
      }
      patchArmBranch(t, r, s) {
        let i = t.read32(r),
          a = s - (r + 8);
        if (a % 4 !== 0 || a < -33554432 || a > 33554428) {
          this.relocErrors.push(
            `arm-branch-range 0x${(r >>> 0).toString(16)}->0x${(s >>> 0).toString(16)}`
          );
          return;
        }
        let n = (a >> 2) & 16777215;
        t.write32(r, (i & 4278190080) | n, !0);
      }
      patchThumbBranch(t, r, s) {
        let i = s - (r + 4);
        if (i % 2 !== 0 || i < -4194304 || i > 4194302) {
          this.relocErrors.push(
            `thumb-bl-range 0x${(r >>> 0).toString(16)}->0x${(s >>> 0).toString(16)}`
          );
          return;
        }
        let a = (i >> 12) & 2047,
          n = (i >> 1) & 2047;
        (t.write16(r, 61440 | a, !0), t.write16(r + 2, 63488 | n, !0));
      }
      installImportResolvers(t, r, s, i) {
        let a = new Map(this.namedResolverSlots(t, r, s, i)),
          n = this.sections.find((d) => d.name === ".text" && d.size >= 16);
        if (!n) {
          for (let [d, c] of a) t.write32(d, c, !0);
          return [...a.keys()];
        }
        let h = (n.addr + r.loadBias) | 0,
          u = (h + n.size) | 0,
          f = 0;
        for (; f + 12 <= n.size; ) {
          let d = t.read32(h + f),
            c = (d >>> 12) & 15;
          if (fe.armAddPcReg(d) !== c || c === 15) {
            f += 4;
            continue;
          }
          let _ = t.read32(h + f + 4);
          if (
            !fe.isArmLdrWord(_) ||
            ((_ >>> 16) & 15) !== c ||
            ((_ >>> 12) & 15) !== c ||
            (_ & 4095) !== 0
          ) {
            f += 4;
            continue;
          }
          let m = t.read32(h + f + 8);
          if ((m & 268435440) !== 19922736 || (m & 15) !== c) {
            f += 4;
            continue;
          }
          if (!this.hasApiNameOperand(t, h, f)) {
            f += 4;
            continue;
          }
          let y = 0,
            w = !1;
          for (let g = Math.max(f - 24, 0); g < f; g += 4) {
            let b = t.read32(h + g);
            if (fe.isArmLdrWord(b) && ((b >>> 16) & 15) === 15 && ((b >>> 12) & 15) === c) {
              let x = b & 4095;
              ((y = (h + g + 8 + ((b & 8388608) !== 0 ? x : -x)) | 0), (w = !0));
              break;
            }
          }
          if (w && t.isMapped(y, 4)) {
            let g = (h + f + 8 + t.read32(y)) | 0,
              b = !1;
            try {
              b = t.read32(g) === 0;
            } catch (x) {
              b = !1;
            }
            g !== 0 && (g < h || g >= u) && t.isMapped(g, 4) && b && !a.has(g) && a.set(g, s);
          }
          f += 4;
        }
        for (let [d, c] of a) t.write32(d, c, !0);
        return [...a.keys()];
      }
      namedResolverSlots(t, r, s, i) {
        let a = [];
        for (let n = 0; n < this.sections.length; n++) {
          let h = this.sections[n];
          if (!(h.type !== Ze && h.type !== qe))
            for (let u of this.readSymbols(n)) {
              if (u.shndx === ye || u.size !== 4 || (u.info & 15) !== 1) continue;
              let f = this.sections[u.shndx];
              if (!f || f.type === lr || (f.flags & Ke) === 0) continue;
              let d = u.name,
                c = d === "vm_get_sym_entry" || d === "__vxp_resolver";
              if (!c && i.addressOf(d) === null) continue;
              let _ = (u.value + r.loadBias) | 0,
                m = !1;
              try {
                m = t.isMapped(_, 4) && t.read32(_) === 0;
              } catch (y) {
                m = !1;
              }
              m && a.push([_, c ? s : i.addressOf(d)]);
            }
        }
        return a;
      }
      static armAddPcReg(t) {
        if (((t >>> 20) & 255) !== 8 || ((t >>> 16) & 15) !== 15 || (t & 4080) !== 0) return null;
        let r = (t >>> 12) & 15;
        return (t & 15) === r ? r : null;
      }
      static isArmLdrWord(t) {
        return ((t >>> 20) & 255 & 247) === 81;
      }
      hasApiNameOperand(t, r, s) {
        for (let i = s - 24; i <= s + 8; i += 4) {
          if (i < 0) continue;
          let a = t.read32(r + i);
          if ((a & 268431360) === 42926080) {
            let n = fe.armRotatedImmediate(a & 255, (a >>> 8) & 15),
              h = (r + i + 8 + ((a & 8388608) !== 0 ? n : -n)) | 0;
            if (fe.isApiNameAt(t, h)) return !0;
          }
        }
        return !1;
      }
      static armRotatedImmediate(t, r) {
        let s = r * 2;
        return s === 0 ? t : ((t << s) | (t >>> (32 - s))) >>> 0;
      }
      static isApiNameAt(t, r) {
        if (r <= 0) return !1;
        let s = 0;
        for (let i = 0; i < 64; i++) {
          let a = -1;
          try {
            a = t.read8(r + i) & 255;
          } catch (n) {
            return !1;
          }
          if (!((a >= 97 && a <= 122) || (a >= 65 && a <= 90) || (a >= 48 && a <= 57) || a === 95))
            return s >= 4 && a === 0 && i > 0;
          if (i === 0 && !((a >= 97 && a <= 122) || (a >= 65 && a <= 90) || a === 95)) return !1;
          s++;
        }
        return !1;
      }
    },
    ur = 1,
    or = 4,
    Oi = 1024;
  function Ti(e) {
    let t = e.mem,
      r = e.gfx,
      s = e.fs,
      i = (l, o) => e.arg(l, o);
    (e.api("__vxp_resolver", (l) => {
      let o = "";
      try {
        o = t.readCString(l.r[0], 256);
      } catch (p) {
        o = "";
      }
      l.r[0] = e.resolveAddressOrStub(o);
    }),
      e.api("vm_get_sym_entry", (l) => {
        let o = "";
        try {
          o = t.readCString(i(l, 0), 256);
        } catch (p) {
          o = "";
        }
        l.r[0] = e.resolveAddressOrStub(o);
      }),
      e.api("vm_graphic_get_screen_width", (l) => {
        l.r[0] = r.screenWidth;
      }),
      e.api("vm_graphic_get_screen_height", (l) => {
        l.r[0] = r.screenHeight;
      }),
      e.api("vm_graphic_get_screen_w", (l) => {
        l.r[0] = r.screenWidth;
      }),
      e.api("vm_graphic_get_screen_h", (l) => {
        l.r[0] = r.screenHeight;
      }),
      e.api("vm_graphic_get_bits_per_pixel", (l) => {
        l.r[0] = 16;
      }),
      e.api("vm_graphic_create_layer", (l) => {
        l.r[0] = r.createLayer(i(l, 0), i(l, 1), i(l, 2), i(l, 3), Xe(i(l, 4)));
      }),
      e.api("vm_graphic_create_layer_ex", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = i(l, 3),
          A = i(l, 6),
          R = A !== 0 && t.isMapped(A, v * M * 2) ? A : -1;
        l.r[0] = r.createLayer(o, p, v, M, Xe(i(l, 4)), R);
      }),
      e.api("vm_graphic_get_layer_buffer", (l) => {
        l.r[0] = r.getLayerBuffer(i(l, 0));
      }),
      e.api("vm_graphic_get_buffer", (l) => {
        (r.ensureScreenLayer(), (l.r[0] = r.screenBufferAddress()));
      }),
      e.api("vm_initialize_screen_buffer", (l) => {
        l.r[0] = r.ensureScreenLayer() !== W ? 0 : -1;
      }),
      e.api("vm_dd_initialize_clip_rect", (l) => {
        l.r[0] = r.ensureScreenLayer() !== W ? 0 : -1;
      }),
      e.api("vm_graphic_active_layer", (l) => {
        l.r[0] = r.activeLayer(i(l, 0));
      }),
      e.api("vm_graphic_delete_layer", (l) => {
        l.r[0] = r.deleteLayer(i(l, 0));
      }),
      e.api("vm_graphic_create_canvas", (l) => {
        l.r[0] = r.createCanvas(i(l, 0), i(l, 1), Xe(i(l, 2)));
      }),
      e.api("vm_graphic_get_canvas_buffer", (l) => {
        l.r[0] = r.canvasBuffer(i(l, 0));
      }),
      e.api("vm_graphic_create_canvas_cf", (l) => {
        l.r[0] = r.createCanvas(i(l, 1), i(l, 2), -1);
      }),
      e.api("vm_graphic_create_layer_cf", (l) => {
        let o = i(l, 1),
          p = i(l, 2),
          v = i(l, 3),
          M = i(l, 4),
          A = i(l, 7),
          R = i(l, 8),
          H = A !== 0 && R >= v * M * 2 && t.isMapped(A, R) ? A : -1,
          U = i(l, 5),
          ae = U !== 0 && t.isMapped(U, 4) ? V(t.read8(U + 1), t.read8(U + 2), t.read8(U + 3)) : -1;
        l.r[0] = r.createLayer(o, p, v, M, ae, H);
      }));
    let a = new Map(),
      n = (l) => {
        let o = a.get(l);
        o !== void 0 && (a.delete(l), e.heap.free(o));
      };
    (e.api("vm_graphic_release_canvas", (l) => {
      let o = i(l, 0);
      (n(o), (l.r[0] = r.releaseCanvas(o)));
    }),
      e.api("vm_graphic_canvas_set_trans_color", (l) => {
        let o = i(l, 1);
        l.r[0] = r.setCanvasTransparentColor(i(l, 0), o < 0 ? -1 : cr(t, o));
      }));
    let h = (l) => {
      let o = i(l, 0),
        p = i(l, 1);
      return o === 0 || p <= 0 || p > 33554432 || !t.isMapped(o, p)
        ? 0
        : r.loadImage(t.readBytes(o, p));
    };
    (e.api("vm_graphic_load_image", (l) => {
      l.r[0] = h(l);
    }),
      e.api("vm_graphic_load_img", (l) => {
        l.r[0] = h(l);
      }),
      e.api("vm_graphic_get_image_buffer", (l) => {
        l.r[0] = r.getImageBuffer(i(l, 0));
      }),
      e.api("vm_graphic_get_img_buffer", (l) => {
        l.r[0] = r.getImageBuffer(i(l, 0));
      }),
      e.api("vm_graphic_release_image", (l) => {
        let o = i(l, 0);
        (n(o), (l.r[0] = r.releaseImage(o)));
      }));
    let u = (l) => {
      let o = i(l, 0),
        p = r.imageWidth(o),
        v = r.imageHeight(o);
      if (p <= 0 || v <= 0) {
        l.r[0] = 0;
        return;
      }
      let M = a.get(o);
      if (M === void 0) {
        if (((M = e.heap.calloc(24)), M === 0)) {
          l.r[0] = 0;
          return;
        }
        a.set(o, M);
      }
      (t.write8(M + 0, 1, !0),
        t.write16(M + 2, 0, !0),
        t.write16(M + 4, 0, !0),
        t.write16(M + 6, p, !0),
        t.write16(M + 8, v, !0),
        t.write16(M + 10, 0, !0),
        t.write8(M + 12, 0, !0),
        t.write16(M + 14, 0, !0),
        t.write32(M + 16, p * v * 2, !0),
        (l.r[0] = M));
    };
    (e.api("vm_graphic_get_img_property", u),
      e.api("vm_graphic_get_image_property", u),
      e.api("vm_graphic_get_img_property_ex", u),
      e.api("vm_dd_get_img_property", u),
      e.api("vm_graph_get_img_property", u),
      e.api("vm_dd_load_image", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v =
            o !== 0 && p > 0 && p <= 33554432 && t.isMapped(o, p)
              ? r.loadImage(t.readBytes(o, p))
              : 0;
        l.r[0] = r.getImageBuffer(v);
      }),
      e.api("vm_dd_get_frame_number", (l) => {
        l.r[0] = r.canvasFrameCount(i(l, 0));
      }));
    let f = (l) => {
      let o = i(l, 3),
        p = i(l, 4);
      if (o === 0 || p <= 0 || p > 33554432 || !t.isMapped(o, p)) {
        l.r[0] = -1;
        return;
      }
      l.r[0] = r.drawImageFromMemory(i(l, 0), i(l, 1), i(l, 2), t.readBytes(o, p));
    };
    (e.api("vm_graphic_draw_image_from_memory", f),
      e.api("vm_graphic_draw_image", f),
      e.api("vm_graphic_flush_layer", (l) => {
        l.r[0] = r.flushLayers(je(e, i(l, 0), i(l, 1)));
      }),
      e.api("vm_graphic_flush_screen", (l) => {
        l.r[0] = r.flushActiveLayer();
      }),
      e.api("vm_graphic_flush_buffer", (l) => {
        l.r[0] = r.flushActiveLayer();
      }),
      e.api("vm_graphic_flush_layer_non_block", (l) => {
        l.r[0] = r.flushLayers(je(e, i(l, 0), i(l, 1)));
      }),
      e.api("vm_graphic_blt", (l) => {
        let o = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((p) => i(l, p));
        l.r[0] = r.blt(o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], o[8]);
      }),
      e.api("vm_graphic_blt_ex", (l) => {
        let o = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((p) => i(l, p));
        l.r[0] = r.blt(o[0], o[1], o[2], o[3], o[4], o[5], o[6], o[7], o[8]);
      }));
    let d = (l) => {
      let o = i(l, 5),
        p = i(l, 6),
        v = p >= 0 && p <= 65535,
        M = o >= 0 && o <= 65535,
        A = v && (M || o === 0) ? p : o !== 0 ? o : r.currentColor;
      l.r[0] = r.fillRect(i(l, 0), i(l, 1), i(l, 2), i(l, 3), i(l, 4), A);
    };
    (e.api("vm_graphic_fill_rect", d),
      e.api("vm_graphic_fill_rect_ex", d),
      e.api("vm_graphic_setcolor", (l) => {
        let o = i(l, 0);
        (o >= 0 && o <= 65535 && (r.currentColor = o), (l.r[0] = 0));
      }),
      e.api("vm_graphic_set_clip", (l) => {
        l.r[0] = r.setClip(i(l, 0), i(l, 1), i(l, 2), i(l, 3));
      }),
      e.api("vm_graphic_reset_clip", (l) => {
        l.r[0] = r.resetClip();
      }),
      e.api("vm_graphic_set_layer_clip", (l) => {
        l.r[0] = r.setLayerClip(
          i(l, 0),
          (i(l, 1) << 16) >> 16,
          (i(l, 2) << 16) >> 16,
          (i(l, 3) << 16) >> 16,
          (i(l, 4) << 16) >> 16
        );
      }),
      e.api("vm_graphic_reset_layer_clip", (l) => {
        l.r[0] = r.resetLayerClip(i(l, 0));
      }),
      e.api("vm_graphic_layer_set_trans_color", (l) => {
        l.r[0] = r.setLayerTransColor(i(l, 0), Xe(i(l, 1)));
      }),
      e.api("vm_graphic_get_layer_position", (l) => {
        let o = r.layer(i(l, 0));
        if (!o) {
          l.r[0] = -1;
          return;
        }
        let p = [i(l, 1), i(l, 2), i(l, 3), i(l, 4)],
          v = [o.x, o.y, o.w, o.h];
        for (let M = 0; M < 4; M++) p[M] !== 0 && t.isMapped(p[M], 4) && t.write32(p[M], v[M], !0);
        l.r[0] = 0;
      }),
      e.api("vm_graphic_set_blt_layer", (l) => {
        l.r[0] = r.setBltLayers(je(e, i(l, 0), i(l, 1)));
      }),
      e.api("vm_graphic_set_alpha_blending_layer", (l) => {
        l.r[0] = 0;
      }));
    let c = (l) => {
      l.r[0] = r.flushLayers(je(e, i(l, 0), i(l, 1)));
    };
    (e.api("vm_graphic_flatten_layer", c),
      e.api("vm_graphic_flatten_layer_ex", c),
      e.api("vm_graphic_set_layer_opacity", (l) => {
        l.r[0] = r.setLayerOpacity(i(l, 0), i(l, 1));
      }),
      e.api("vm_dd_set_clip", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = i(l, 3);
        l.r[0] = r.setClip(o, p, o + v - 1, p + M - 1);
      }),
      e.api("vm_dd_reset_clip", (l) => {
        l.r[0] = r.resetClip();
      }),
      e.api("vm_dd_active_layer", (l) => {
        l.r[0] = r.activeLayer(i(l, 0));
      }),
      e.api("vm_dd_clean", (l) => {
        l.r[0] = r.cleanSurface(i(l, 0), ie(t, i(l, 1)));
      }),
      e.api("vm_graph_clean", (l) => {
        l.r[0] = r.cleanSurface(i(l, 0), ie(t, i(l, 1)));
      }),
      e.api("vm_graphic_fillrect", (l) => {
        l.r[0] = r.fillRect(Ft, i(l, 0), i(l, 1), i(l, 2), i(l, 3), ie(t, i(l, 4)));
      }));
    let _ = (l, o) => (p) => {
      let v = i(p, 0),
        M = i(p, 6),
        A = !o && M !== 0 ? ie(t, M) : r.currentColor;
      p.r[0] = l
        ? r.fillRoundRectBuffer(v, i(p, 1), i(p, 2), i(p, 3), i(p, 4), i(p, 5), A)
        : r.drawRoundRectBuffer(v, i(p, 1), i(p, 2), i(p, 3), i(p, 4), i(p, 5), A);
    };
    (e.api("vm_graphic_roundrect", _(!1, !1)), e.api("vm_graphic_fill_roundrect", _(!0, !1)));
    let m = (l) =>
      l !== 0 && t.isMapped(l, 4) ? V(t.read8(l + 1), t.read8(l + 2), t.read8(l + 3)) : 0;
    (e.api("vm_graphic_roundrect_cf", (l) => {
      l.r[0] = r.drawRoundRectBuffer(
        i(l, 0),
        i(l, 1),
        i(l, 2),
        i(l, 3),
        i(l, 4),
        i(l, 5),
        m(i(l, 6))
      );
    }),
      e.api("vm_graphic_fill_roundrect_cf", (l) => {
        l.r[0] = r.fillRoundRectBuffer(
          i(l, 0),
          i(l, 1),
          i(l, 2),
          i(l, 3),
          i(l, 4),
          i(l, 5),
          m(i(l, 6))
        );
      }));
    let y = (l) => (o) => {
      let p = i(o, 0);
      o.r[0] = l
        ? r.fillRoundRectBuffer(p, i(o, 1), i(o, 2), i(o, 3), i(o, 4), i(o, 5), r.currentColor)
        : r.drawRoundRectBuffer(p, i(o, 1), i(o, 2), i(o, 3), i(o, 4), i(o, 5), r.currentColor);
    };
    (e.api("vm_graphic_roundrect_ex", y(!1)), e.api("vm_graphic_fill_roundrect_ex", y(!0)));
    let w = (l) => {
      l.r[0] = r.fillEllipseBuffer(i(l, 0), i(l, 1), i(l, 2), i(l, 3), i(l, 4), ie(t, i(l, 5)));
    };
    (e.api("vm_graphic_fill_ellipse", w),
      e.api("vm_graphic_fill_ellipse_ex", (l) => {
        l.r[0] = r.fillEllipseBuffer(i(l, 0), i(l, 1), i(l, 2), i(l, 3), i(l, 4), r.currentColor);
      }));
    let g = (l, o) =>
      l !== 0 && l >= 0 && l <= 65535
        ? l & 65535
        : l > 65535
          ? ie(t, l)
          : V((o >>> 16) & 255, (o >>> 8) & 255, o & 255);
    (e.api("vm_graphic_gradient_paint_rect", (l) => {
      let o = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => i(l, p));
      l.r[0] = r.gradientPaintRect(
        o[0],
        o[1],
        o[2],
        o[3],
        o[4],
        g(o[5], o[6]),
        g(o[7], o[8]),
        o[9]
      );
    }),
      e.api("vm_graphic_line", (l) => {
        l.r[0] = r.drawLineBuffer(i(l, 0), i(l, 1), i(l, 2), i(l, 3), i(l, 4), ie(t, i(l, 5)));
      }),
      e.api("vm_graphic_line_ex", (l) => {
        let o = i(l, 5);
        l.r[0] = r.drawLineBuffer(
          i(l, 0),
          i(l, 1),
          i(l, 2),
          i(l, 3),
          i(l, 4),
          o !== 0 ? ie(t, o) : r.currentColor
        );
      }));
    let b = (l) => {
      let o = i(l, 5),
        p = o !== 0 ? ie(t, o) : r.currentColor;
      l.r[0] = r.drawRectBuffer(i(l, 0), i(l, 1), i(l, 2), i(l, 3), i(l, 4), p);
    };
    (e.api("vm_graphic_rect", b), e.api("vm_graphic_rect_ex", b));
    let x = (l) => (o) => {
      let p = i(o, 1),
        v = Math.min(Math.max(i(o, 2), 0), 4096);
      if (p === 0 || v < 3 || !t.isMapped(p, v * 4)) {
        o.r[0] = -1;
        return;
      }
      let M = [],
        A = [];
      for (let R = 0; R < v; R++)
        (M.push((t.read16(p + R * 4) << 16) >> 16), A.push((t.read16(p + R * 4 + 2) << 16) >> 16));
      o.r[0] = l
        ? r.fillPolygonOnSurface(i(o, 0), M, A, r.currentColor)
        : r.strokePolygonOnSurface(i(o, 0), M, A, r.currentColor);
    };
    (e.api("vm_graphic_fill_polygon", x(!0)),
      e.api("vm_graphic_polygon", x(!1)),
      e.api("vm_graphic_set_pixel", (l) => {
        l.r[0] = r.setPixelOnSurface(i(l, 0), i(l, 1), i(l, 2), ie(t, i(l, 3)));
      }),
      e.api("vm_graphic_set_pixel_ex", (l) => {
        let o = i(l, 3);
        l.r[0] = r.setPixelOnSurface(
          i(l, 0),
          i(l, 1),
          i(l, 2),
          o !== 0 ? ie(t, o) : r.currentColor
        );
      }),
      e.api("vm_graphic_get_pixel", (l) => {
        l.r[0] = r.getPixelFromSurface(i(l, 0), i(l, 1), i(l, 2));
      }),
      e.api("vm_graphic_lock", (l) => {
        l.r[0] = r.screenBufferAddress();
      }),
      e.api("vm_graphic_unlock", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_graphic_getcolor", (l) => {
        l.r[0] = r.currentColor;
      }),
      e.api("vm_graphic_clear_layer_bg", (l) => {
        l.r[0] = r.clearLayerBg(i(l, 0));
      }),
      e.api("vm_graphic_is_r2l_state", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_graphic_get_frame_number", (l) => {
        l.r[0] = r.flushCount;
      }),
      e.api("vm_graphic_get_string_baseline", (l) => {
        l.r[0] = Math.max(1, ((r.characterHeight() * 4) / 5) | 0);
      }),
      e.api("vm_font_set_font_style", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_graphic_set_font", (l) => {
        l.r[0] = r.setFont(i(l, 0));
      }),
      e.api("vm_font_set_font_size", (l) => {
        l.r[0] = r.setFontSize(i(l, 0));
      }),
      e.api("vm_graphic_get_character_width", (l) => {
        l.r[0] = r.characterWidth(i(l, 0));
      }),
      e.api("vm_graphic_get_character_height", (l) => {
        l.r[0] = r.characterHeight();
      }),
      e.api("vm_graphic_get_character_height_ex", (l) => {
        l.r[0] = r.characterHeight();
      }),
      e.api("vm_graphic_get_highest_char_height_of_all_language", (l) => {
        l.r[0] = r.highestCharHeight();
      }),
      e.api("vm_graphic_get_char_baseline_alllang", (l) => {
        l.r[0] = r.charBaseline(i(l, 0));
      }),
      e.api("vm_graphic_get_character_info", (l) => {
        let o = i(l, 1);
        if (o === 0 || !t.isMapped(o, 20)) {
          l.r[0] = -1;
          return;
        }
        let p = r.characterInfo();
        (t.write32(o + 0, p.dwidth, !0),
          t.write32(o + 4, p.width, !0),
          t.write32(o + 8, p.height, !0),
          t.write32(o + 12, p.ascent, !0),
          t.write32(o + 16, p.descent, !0),
          (l.r[0] = 0));
      }),
      e.api("vm_graphic_get_font_height", (l) => {
        l.r[0] = r.characterHeight();
      }),
      e.api("vm_graphic_measure_character", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = r.characterWidth(o);
        (p !== 0 && t.isMapped(p, 2) && t.write16(p, M),
          v !== 0 && t.isMapped(v, 2) && t.write16(v, r.characterHeight()),
          (l.r[0] = M));
      }),
      e.api("vm_graphic_get_string_width", (l) => {
        l.r[0] = r.stringWidth(Se(e.readUcs2Compat(i(l, 0))));
      }),
      e.api("vm_graphic_get_text_width", (l) => {
        l.r[0] = r.stringWidth(Se(e.readUcs2Compat(i(l, 0))));
      }),
      e.api("vm_graphic_get_string_height", (l) => {
        l.r[0] = r.stringHeight(Se(e.readUcs2Compat(i(l, 0))));
      }),
      e.api("vm_graphic_textout", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = i(l, 4),
          A = ie(t, i(l, 5)),
          R = fr(e.readUcs2Compat(i(l, 3)), M, r);
        l.r[0] = r.drawTextBuffer(o, p, v, R.value, R.maxWidth, A);
      }),
      e.api("vm_graphic_textout_to_layer", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = i(l, 4),
          A = fr(e.readUcs2Compat(i(l, 3)), M, r);
        l.r[0] = r.drawTextLayer(o, p, v, A.value, A.maxWidth);
      }),
      e.api("vm_graphic_drawtext", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = i(l, 3),
          A = i(l, 4),
          R = Se(e.readUcs2Compat(v, M >= 1 && M <= 256 ? M : 256)),
          H = A >= 0 && A <= 65535 ? A & 65535 : V((A >>> 16) & 255, (A >>> 8) & 255, A & 255);
        l.r[0] = r.drawTextOnTarget(o, p, R, H);
      }),
      e.api("vm_malloc", (l) => {
        l.r[0] = e.malloc(i(l, 0));
      }),
      e.api("vm_calloc", (l) => {
        l.r[0] = e.heap.calloc(i(l, 0));
      }),
      e.api("vm_realloc", (l) => {
        l.r[0] = e.heap.realloc(i(l, 0), i(l, 1));
      }),
      e.api("vm_free", (l) => {
        (e.heap.free(i(l, 0)), (l.r[0] = 0));
      }));
    let k = 28,
      C = 0;
    (e.api("vm_get_malloc_stat", (l) => {
      if (C === 0 && ((C = e.heap.calloc(k)), C === 0)) {
        l.r[0] = 0;
        return;
      }
      let o = e.heap,
        p = o.stats();
      (t.write32(C + 0, o.allocationCalls, !0),
        t.write32(C + 4, o.freeCalls, !0),
        t.write32(C + 8, p.allocatedBytes, !0),
        t.write32(C + 12, o.peakAllocatedBytes, !0),
        t.write32(C + 16, o.failedAllocations, !0),
        t.write32(C + 20, o.lastFailedRequest, !0),
        t.write32(C + 24, p.freeBytes, !0),
        (l.r[0] = C));
    }),
      e.api("vm_global_get_max_alloc_size", (l) => {
        l.r[0] = Math.min(e.heap.largestFreeBlock(), 2147483647);
      }),
      e.api("vm_get_mre_total_mem_size", (l) => {
        l.r[0] = Math.min(e.heap.capacity, 2147483647);
      }));
    let z = 65536,
      E = 8 * 1024 * 1024,
      B = (l) => l !== 0 && t.isMapped(l, 24);
    e.api("vm_create_dyn_array", (l) => {
      let o = i(l, 0) | 0,
        p = i(l, 1) | 0,
        v = i(l, 2) | 0,
        M = Math.max(o, 1);
      if (v <= 0 || v > z || M > E / v) {
        l.r[0] = 0;
        return;
      }
      let A = e.heap.calloc(M * v),
        R = e.heap.calloc(24);
      if (A === 0 || R === 0) {
        (e.heap.free(A), e.heap.free(R), (l.r[0] = 0));
        return;
      }
      (t.write32(R + 0, v),
        t.write32(R + 4, o),
        t.write32(R + 8, Math.max(p, 1)),
        t.write32(R + 12, 0),
        t.write32(R + 16, M),
        t.write32(R + 20, A),
        (l.r[0] = R));
    });
    let S = (l) => {
      let o = t.read32(l) | 0,
        p = t.read32(l + 16) | 0,
        v = t.read32(l + 20) | 0;
      if ((t.read32(l + 12) | 0) < p) return v;
      let M = p + Math.max(t.read32(l + 8) | 0, 1);
      if (M * o > E) return 0;
      let A = e.heap.realloc(v, M * o);
      return A === 0
        ? 0
        : (t.fillBytes(A + p * o, 0, (M - p) * o),
          (p = M),
          (v = A),
          t.write32(l + 16, p),
          t.write32(l + 20, v),
          v);
    };
    (e.api("vm_dyn_array_add", (l) => {
      let o = i(l, 0),
        p = i(l, 1);
      if (!B(o) || p === 0) {
        l.r[0] = -1;
        return;
      }
      let v = t.read32(o) | 0;
      if (!t.isMapped(p, v)) {
        l.r[0] = -1;
        return;
      }
      let M = S(o);
      if (M === 0) {
        l.r[0] = -1;
        return;
      }
      let A = t.read32(o + 12) | 0;
      (t.copyBytes(p, M + A * v, v), t.write32(o + 12, A + 1), (l.r[0] = 0));
    }),
      e.api("vm_dyn_array_del", (l) => {
        let o = i(l, 0),
          p = i(l, 1) | 0;
        if (!B(o)) {
          l.r[0] = -1;
          return;
        }
        let v = t.read32(o) | 0,
          M = t.read32(o + 12) | 0,
          A = t.read32(o + 20) | 0;
        if (p < 0 || p >= M) {
          l.r[0] = -1;
          return;
        }
        (p + 1 < M && t.copyBytes(A + (p + 1) * v, A + p * v, (M - p - 1) * v),
          t.write32(o + 12, M - 1),
          (l.r[0] = 0));
      }),
      e.api("vm_dyn_array_del_all", (l) => {
        let o = i(l, 0);
        if (!B(o)) {
          l.r[0] = -1;
          return;
        }
        (t.write32(o + 12, 0), (l.r[0] = 0));
      }),
      e.api("vm_free_dyn_array", (l) => {
        let o = i(l, 0);
        (B(o) && e.heap.free(t.read32(o + 20) | 0), e.heap.free(o), (l.r[0] = 0));
      }));
    let P = 1,
      T = 15,
      L = 1;
    (e.api("vm_pmng_get_current_handle", (l) => {
      l.r[0] = P;
    }),
      e.api("vm_pmng_get_app_handle", (l) => {
        l.r[0] = P;
      }),
      e.api("vm_pmng_state", (l) => {
        let o = i(l, 0) | 0;
        l.r[0] = o === P || o === T ? L : 0;
      }),
      e.api("vm_pmng_set_bg", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_pmng_get_handle", (l) => {
        var o;
        let p = e.readUcs2Compat(i(l, 0), 260).toLowerCase(),
          v = e.rawExecutableName.toLowerCase(),
          M = (o = p.split(/[\\/]/).pop()) != null ? o : p;
        l.r[0] = M.length > 0 && v.endsWith(M) ? P : 0;
      }));
    let se = (l) => (o) => {
      ((e[l] = i(o, 0)), (o.r[0] = 0));
    };
    (e.api("vm_reg_sysevt_callback", se("systemCallback")),
      e.api("vm_reg_system_event_callback", se("systemCallback")),
      e.api("vm_reg_sm_callback", se("smCallback")),
      e.api("vm_reg_keyboard_callback", (l) => {
        ((e.keyboardCallback = i(l, 0)), (l.r[0] = 0));
      }),
      e.api("vm_reg_key_callback", (l) => {
        ((e.keyboardCallback = i(l, 0)), (l.r[0] = 0));
      }),
      e.api("vm_reg_pen_callback", (l) => {
        ((e.penCallback = i(l, 0)), (l.r[0] = 0));
      }),
      e.api("vm_reg_touch_callback", (l) => {
        ((e.penCallback = i(l, 0)), (l.r[0] = 0));
      }),
      e.api("vm_exit_app", (l) => {
        (e.requestExit(i(l, 0)), (l.r[0] = 0));
      }));
    let q = (l) => {
      let o = i(l, 0),
        p = i(l, 1);
      if (p === 0 || e.timers.size >= Oi) {
        l.r[0] = -1;
        return;
      }
      l.r[0] = e.registerTimer(o, p);
    };
    (e.api("vm_create_timer", q), e.api("vm_create_timer_ex", q));
    let K = (l) => {
      l.r[0] = e.deleteTimer(i(l, 0)) ? 0 : -1;
    };
    (e.api("vm_delete_timer", K),
      e.api("vm_delete_timer_ex", K),
      e.api("vm_get_tick_count", (l) => {
        l.r[0] = (Date.now() & 2147483647) | 0;
      }),
      e.api("vm_get_tick", (l) => {
        l.r[0] = (Date.now() & 2147483647) | 0;
      }),
      e.api("vm_get_time", (l) => {
        let o = new Date(),
          p = i(l, 0);
        if (p !== 0 && t.isMapped(p, 28))
          try {
            (t.write32(p, o.getFullYear() - 1900),
              t.write32(p + 4, o.getMonth()),
              t.write32(p + 8, o.getDate()),
              t.write32(p + 12, o.getHours()),
              t.write32(p + 16, o.getMinutes()),
              t.write32(p + 20, o.getSeconds()),
              (l.r[0] = 0));
            return;
          } catch (v) {}
        l.r[0] = -1;
      }),
      e.api("vm_resource_get_data", (l) => {
        l.r[0] = e.resourceGetData(l);
      }),
      e.api("vm_resource_get_data_from_file", (l) => {
        l.r[0] = e.resourceGetData(l);
      }),
      e.api("vm_resource_init", (l) => {
        l.r[0] = e.resourceBlobSize > 0 ? 0 : -1;
      }),
      e.api("vm_res_init", (l) => {
        l.r[0] = e.resourceBlobSize > 0 ? 0 : -1;
      }),
      e.api("vm_load_resource", (l) => {
        l.r[0] = e.loadNamedResource(i(l, 0), i(l, 1));
      }),
      e.api("vm_res_load", (l) => {
        l.r[0] = e.loadNamedResource(i(l, 0), i(l, 1));
      }),
      e.api("vm_res_delete", (l) => {
        l.r[0] = e.resourceDelete(i(l, 0));
      }),
      e.api("vm_res_deinit", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_get_resource_offset", (l) => {
        l.r[0] = e.resourceFind(e.readResourceNameCompat(i(l, 0)));
      }),
      e.api("vm_get_res_header", (l) => {
        l.r[0] = 0;
      }));
    let le = (l) => {
      if (l === 0 || !t.isMapped(l, 6)) return !1;
      let o = e.readUcs2Compat(l, 260);
      return (
        o.length >= 2 &&
        o[1] === ":" &&
        (o[0] === "C" || o[0] === "E" || o[0] === "c" || o[0] === "e")
      );
    };
    (e.api("vm_get_resource_offset_from_file", (l) => {
      let o = i(l, 0),
        p = i(l, 1),
        v = le(o) ? o : le(p) ? p : 0;
      if (v === 0) {
        l.r[0] = -1;
        return;
      }
      let M = v === o ? p : o,
        A = s.readAll(e.readUcs2Compat(v, 512));
      if (A === null) {
        l.r[0] = -1;
        return;
      }
      let R = e.readResourceNameCompat(M),
        H = gt(A).find((U) => U.name === R);
      l.r[0] = H ? H.offset : -1;
    }),
      e.api("vm_is_support_wifi", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_wifi_is_connected", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_has_sim_card", (l) => {
        l.r[0] = 1;
      }),
      e.api("vm_get_sim_card_status", (l) => {
        l.r[0] = 1;
      }),
      e.api("vm_get_language", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_get_language_ssc", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_send_sms", (l) => {
        l.r[0] = -1;
      }),
      e.api("vm_vibrator_once", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_switch_power_saving_mode", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_get_exec_filename", (l) => {
        let o = i(l, 0),
          p = e.rawExecutableName;
        if (o === 0 || !t.isMapped(o, p.length + 1)) {
          l.r[0] = -1;
          return;
        }
        try {
          for (let v = 0; v < p.length; v++) t.write8(o + v, p.charCodeAt(v) & 127);
          (t.write8(o + p.length, 0), (l.r[0] = 0));
        } catch (v) {
          l.r[0] = -1;
        }
      }),
      e.api("vm_get_disk_free_space", (l) => {
        let o = i(l, 0),
          p = o !== 0 && t.isMapped(o, 2) ? e.readUcs2Compat(o, 260) : "C:\\";
        l.r[0] = Math.min(s.freeSpace(p), 2147483647) | 0;
      }),
      e.api("vm_get_vm_tag", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_log_info", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_log_error", (l) => {
        l.r[0] = 0;
      }),
      e.api("_vm_log_info", (l) => {
        l.r[0] = 0;
      }),
      e.api("_vm_log_error", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_app_log", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_get_sys_scene", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_get_system_driver", (l) => {
        l.r[0] = 67;
      }),
      e.api("vm_get_removeable_driver", (l) => {
        l.r[0] = 69;
      }),
      e.api("vm_get_removable_driver", (l) => {
        l.r[0] = 69;
      }),
      e.api("vm_get_imei", (l) => {
        l.r[0] = e.systemAscii("imei", "000000000000000");
      }),
      e.api("vm_get_imsi", (l) => {
        l.r[0] = e.systemAscii("imsi", "001010000000000");
      }),
      e.api("vm_query_operator_code", (l) => {
        let o = i(l, 0),
          p = "00101";
        if (o !== 0 && t.isMapped(o, p.length + 1)) {
          for (let v = 0; v < p.length; v++) t.write8(o + v, p.charCodeAt(v));
          (t.write8(o + p.length, 0), (l.r[0] = 0));
        } else l.r[0] = -1;
      }),
      e.api("vm_sim_get_active_sim_card", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_set_active_sim_card", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_is_support_pen_touch", (l) => {
        l.r[0] = 1;
      }),
      e.api("vm_is_finger_touch_version", (l) => {
        l.r[0] = 1;
      }),
      e.api("vm_is_figner_touch_version", (l) => {
        l.r[0] = 1;
      }),
      e.api("vm_is_support_keyborad", (l) => {
        l.r[0] = 1;
      }),
      e.api("vm_get_key_tone_state", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_appmgr_get_installed_list", (l) => {
        let o = i(l, 2);
        (o !== 0 && t.isMapped(o, 4) && t.write32(o, 0), (l.r[0] = 0));
      }),
      e.api("vm_appmgr_get_install_info", (l) => {
        let o = i(l, 1);
        if (o !== 0 && t.isMapped(o, 64)) for (let p = 0; p < 64; p++) t.write8(o + p, 0);
        l.r[0] = -1;
      }),
      e.api("vm_wstrcpy", (l) => {
        let o = i(l, 0),
          p = i(l, 1);
        if (o !== 0 && p !== 0) {
          let v = p,
            M = o;
          for (; t.isMapped(v, 2) && t.isMapped(M, 2); ) {
            let A = t.read16(v);
            if ((t.write16(M, A), (v += 2), (M += 2), A === 0)) break;
          }
        }
        l.r[0] = o;
      }),
      e.api("vm_wstrncpy", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = Math.min(Math.max(i(l, 2), 0), 4096);
        if (o !== 0 && p !== 0) {
          let M = 0;
          for (; M < v && t.isMapped(p + M * 2, 2) && t.isMapped(o + M * 2, 2); ) {
            let A = t.read16(p + M * 2);
            if ((t.write16(o + M * 2, A), A === 0)) break;
            M++;
          }
          for (; M < v && t.isMapped(o + M * 2, 2); ) (t.write16(o + M * 2, 0), M++);
        }
        l.r[0] = o;
      }),
      e.api("vm_wstrcat", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = p >= 4096 && t.isMapped(p, 2),
          A = M ? p : v,
          R = M ? 0 : p;
        if (o === 0 || A === 0) {
          l.r[0] = o;
          return;
        }
        let H = o,
          U = 0;
        for (; U < 4096 && t.isMapped(H, 2) && t.read16(H) !== 0; ) ((H += 2), U++);
        let ae = R > 0 ? o + R : Number.MAX_SAFE_INTEGER,
          Re = A,
          ee = H;
        for (; ee + 2 <= ae && t.isMapped(Re, 2) && t.isMapped(ee, 2); ) {
          let $ = t.read16(Re);
          if ((t.write16(ee, $), (Re += 2), (ee += 2), $ === 0)) break;
        }
        l.r[0] = o;
      }),
      e.api("vm_wstrcmp", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = 0;
        if (o !== 0 && p !== 0) {
          let M = 0;
          for (; M < 8192 && t.isMapped(o + M, 2) && t.isMapped(p + M, 2); ) {
            let A = t.read16(o + M),
              R = t.read16(p + M);
            if (A !== R) {
              v = A - R;
              break;
            }
            if (A === 0) break;
            M += 2;
          }
        }
        l.r[0] = v;
      }));
    let Q = 4096,
      xt = 65536,
      Be = new Float64Array(1),
      gr = new Uint32Array(Be.buffer),
      Mt = (l) => l.replace(/e([+-])(\d)$/, "e$10$2"),
      _r = (l) => {
        let o = l.indexOf("e");
        if (o < 0) return l;
        let p = l.slice(0, o),
          v = l.slice(o);
        return (p.includes(".") && (p = p.replace(/0+$/, "").replace(/\.$/, "")), p + v);
      },
      yr = (l) => (l.includes(".") ? l.replace(/0+$/, "").replace(/\.$/, "") : l),
      Gi = (l, o) => {
        if (!Number.isFinite(l)) return Number.isNaN(l) ? "NaN" : l > 0 ? "Infinity" : "-Infinity";
        if (l === 0) return yr(l.toPrecision(o));
        let p = Math.floor(Math.log10(Math.abs(l)));
        if (p < -4 || p >= o) return _r(Mt(l.toExponential(o - 1)));
        let v = l.toPrecision(o);
        return v.includes("e") ? _r(Mt(v)) : yr(v);
      };
    (e.api("vm_vsprintf", (l) => {
      let o = i(l, 0),
        p = i(l, 1),
        v = i(l, 2);
      if (o === 0 || p === 0 || !t.isMapped(o, 1) || !t.isMapped(p, 1)) {
        l.r[0] = -1;
        return;
      }
      let M = () => {
          try {
            return t.read8(p);
          } catch ($) {
            return 0;
          }
        },
        A = () => {
          let $ = M();
          return ((p += 1), $);
        },
        R = () => {
          let $ = 0;
          try {
            $ = t.read32(v);
          } catch (ge) {
            $ = 0;
          }
          return ((v += 4), $);
        },
        H = () => {
          (v & 7) !== 0 && (v += 4);
          let $ = 0,
            ge = 0;
          try {
            (($ = t.read32(v) >>> 0), (ge = t.read32(v + 4) >>> 0));
          } catch (kt) {
            (($ = 0), (ge = 0));
          }
          return ((v += 8), (gr[0] = $), (gr[1] = ge), Be[0]);
        },
        U = () => {
          let $ = 0;
          for (; M() >= 48 && M() <= 57; ) $ < Q ? ($ = $ * 10 + (A() - 48)) : A();
          return Math.min($, Q);
        },
        ae = "",
        Re = 0;
      for (; Re++ < Q && ae.length < xt; ) {
        let $ = A();
        if ($ === 0) break;
        if ($ !== 37) {
          ae += String.fromCharCode($);
          continue;
        }
        let ge = !1,
          kt = !1,
          br = !1,
          Ve = !1,
          vr = !1;
        for (;;) {
          let G = M();
          if (G === 45) ge = !0;
          else if (G === 43) kt = !0;
          else if (G === 32) br = !0;
          else if (G === 48) Ve = !0;
          else if (G === 35) vr = !0;
          else break;
          p += 1;
        }
        let Qe = -1;
        M() === 42
          ? ((p += 1), (Qe = Math.min(Math.max(R(), 0), Q)))
          : M() >= 48 && M() <= 57 && (Qe = U());
        let X = -1;
        for (
          M() === 46 &&
          ((p += 1),
          M() === 42
            ? ((p += 1), (X = Math.min(Math.max(R(), 0), Q)))
            : M() >= 48 && M() <= 57
              ? (X = U())
              : (X = 0));
          "lLhqztj".includes(String.fromCharCode(M()));
        )
          p += 1;
        let xr = A(),
          ue = String.fromCharCode(xr),
          Mr = "diuoxX".includes(ue),
          Zi = "fFeEgG".includes(ue),
          N;
        switch (ue) {
          case "d":
          case "i":
            N = String(R() | 0);
            break;
          case "u":
            N = String(R() >>> 0);
            break;
          case "x":
            N = (R() >>> 0).toString(16);
            break;
          case "X":
            N = (R() >>> 0).toString(16).toUpperCase();
            break;
          case "o":
            N = (R() >>> 0).toString(8);
            break;
          case "c":
            N = String.fromCharCode(R() & 255);
            break;
          case "s": {
            let G = R();
            G === 0
              ? (N = "(null)")
              : ((N = t.readCString(G, (X >= 0 ? X : Q) + 1)),
                X >= 0 && N.length > X && (N = N.slice(0, X)));
            break;
          }
          case "p":
            N = "0x" + (R() >>> 0).toString(16);
            break;
          case "f":
          case "F": {
            let G = X >= 0 ? X : 6;
            ((N = H().toFixed(Math.min(G, 100))), ue === "F" && (N = N.toUpperCase()));
            break;
          }
          case "e":
          case "E": {
            let G = X >= 0 ? X : 6;
            ((N = Mt(H().toExponential(Math.min(G, 100)))), ue === "E" && (N = N.toUpperCase()));
            break;
          }
          case "g":
          case "G": {
            let G = X >= 0 ? (X === 0 ? 1 : X) : 6;
            ((N = Gi(H(), G)), ue === "G" && (N = N.toUpperCase()));
            break;
          }
          case "%":
            N = "%";
            break;
          default:
            N = "%" + ue;
            break;
        }
        !Mr && !Zi && (Ve = !1);
        let ze = "";
        ((ue === "d" || ue === "i") &&
          (N.startsWith("-") ? ((N = N.slice(1)), (ze = "-")) : kt ? (ze = "+") : br && (ze = " ")),
          Mr &&
            X >= 0 &&
            ((N = (function (q, w, ch) {
              for (; q.length < w; ) q = ch + q;
              return q;
            })(N, X, "0")),
            (Ve = !1)),
          vr && N !== "" && N !== "0" && (N = xr === 111 ? "0" + N : "0" + ue + N));
        let de = ze + N;
        if (Qe > de.length) {
          let G = Qe - de.length;
          ge
            ? (de = de + " ".repeat(G))
            : Ve
              ? (de = ze + "0".repeat(G) + N)
              : (de = " ".repeat(G) + de);
        }
        ae += de;
      }
      let ee = 0;
      for (; ee < ae.length && t.isMapped(o + ee, 1); )
        (t.write8(o + ee, ae.charCodeAt(ee) & 255), (ee += 1));
      (t.isMapped(o + ee, 1) && t.write8(o + ee, 0), (l.r[0] = ee));
    }),
      e.api("vm_asyn_http_req", (l) => {
        l.r[0] = -1;
      }),
      e.api("vm_cancel_asyn_http_req", (l) => {
        l.r[0] = -1;
      }),
      e.api("vm_open_wap_url", (l) => {
        l.r[0] = -1;
      }),
      e.api("vm_get_filename", (l) => {
        let o = e.guestFilename(e.readUcs2Compat(i(l, 0), 512));
        l.r[0] = o !== null && e.writeUcs2(i(l, 1), o) ? 0 : -1;
      }),
      e.api("vm_get_path", (l) => {
        let o = e.guestParentPath(e.readUcs2Compat(i(l, 0), 512));
        l.r[0] = o !== null && e.writeUcs2(i(l, 1), o) ? 0 : -1;
      }),
      e.api("vm_get_default_folder_path", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = o !== 0 && t.isMapped(o, 2) ? o : p !== 0 && t.isMapped(p, 2) ? p : 0;
        if (v === 0) {
          l.r[0] = -1;
          return;
        }
        let M = (v === o ? p : o) & 255;
        l.r[0] = e.writeUcs2(v, e.guestDefaultFolderPath(M === 69 || M === 101 ? "E" : "C"))
          ? 0
          : -1;
      }));
    let J = (l, o = 512) => e.readUcs2Compat(l, o),
      be = (l, o) => {
        if (l === 0 || !t.isMapped(l, 4)) return !1;
        try {
          return (t.write32(l, o | 0), !0);
        } catch (p) {
          return !1;
        }
      },
      wr = (l, o) => (l === null || l > 4294967295 || !be(o, l) ? -1 : 0);
    (e.api("vm_file_open", (l) => {
      l.r[0] = s.open(J(i(l, 0)), i(l, 1));
    }),
      e.api("vm_file_close", (l) => {
        l.r[0] = s.close(i(l, 0));
      }),
      e.api("vm_file_commit", (l) => {
        l.r[0] = s.commit(i(l, 0));
      }),
      e.api("vm_file_getfilesize", (l) => {
        l.r[0] = wr(s.size(i(l, 0)), i(l, 1));
      }),
      e.api("vm_file_get_file_size", (l) => {
        let o = i(l, 0),
          p = s.size(o);
        if (p === null) {
          let v = J(o);
          p = v.trim().length === 0 ? null : s.sizeByPath(v);
        }
        l.r[0] = wr(p, i(l, 1));
      }),
      e.api("vm_file_read", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = i(l, 3),
          A =
            v >= 0 &&
            v <= 33554432 &&
            (v === 0 || (p !== 0 && t.isMapped(p, v))) &&
            (M === 0 || t.isMapped(M, 4)),
          R = null;
        if (A)
          try {
            R = s.read(o, v);
          } catch (H) {
            R = null;
          }
        if (R === null) {
          (be(M, 0), (l.r[0] = -1));
          return;
        }
        try {
          (R.length > 0 && t.writeBytes(p, R), be(M, R.length), (l.r[0] = 0));
        } catch (H) {
          (be(M, 0), (l.r[0] = -1));
        }
      }),
      e.api("vm_file_write", (l) => {
        let o = i(l, 0),
          p = i(l, 1),
          v = i(l, 2),
          M = i(l, 3),
          A =
            v >= 0 &&
            v <= 33554432 &&
            (v === 0 || (p !== 0 && t.isMapped(p, v))) &&
            (M === 0 || t.isMapped(M, 4)),
          R = -1;
        if (A)
          try {
            R = s.write(o, v === 0 ? new Uint8Array(0) : t.readBytes(p, v));
          } catch (H) {
            R = -1;
          }
        (be(M, Math.max(0, R)), (l.r[0] = R >= 0 ? 0 : -1));
      }),
      e.api("vm_file_seek", (l) => {
        l.r[0] = s.seek(i(l, 0), i(l, 1), i(l, 2)) !== null ? 0 : -1;
      }),
      e.api("vm_file_tell", (l) => {
        let o = s.tell(i(l, 0));
        l.r[0] = o !== null && o <= 2147483647 ? o | 0 : -1;
      }),
      e.api("vm_file_is_eof", (l) => {
        let o = s.isEof(i(l, 0));
        l.r[0] = o === null ? -1 : o ? 1 : 0;
      }),
      e.api("vm_file_get_attributes", (l) => {
        l.r[0] = s.attributes(J(i(l, 0)));
      }),
      e.api("vm_file_set_attributes", (l) => {
        l.r[0] = s.setAttributes(J(i(l, 0)), i(l, 1));
      }),
      e.api("vm_file_mkdir", (l) => {
        l.r[0] = s.mkdir(J(i(l, 0)));
      }),
      e.api("vm_file_delete", (l) => {
        l.r[0] = s.delete(J(i(l, 0)));
      }),
      e.api("vm_file_rmdir", (l) => {
        l.r[0] = s.rmdir(J(i(l, 0)));
      }),
      e.api("vm_file_rename", (l) => {
        l.r[0] = s.rename(J(i(l, 0)), J(i(l, 1)));
      }),
      e.api("vm_file_copy", (l) => {
        l.r[0] = s.copy(J(i(l, 0)), J(i(l, 1)));
      }),
      e.api("vm_file_copy_abort", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_file_get_modify_time", (l) => {
        let o = s.modifyTimeSeconds(J(i(l, 0))),
          p = i(l, 1);
        if (o === null || o > 4294967295) {
          l.r[0] = -1;
          return;
        }
        if (p === 0) {
          l.r[0] = o | 0;
          return;
        }
        l.r[0] = be(p, o) ? 0 : -1;
      }),
      e.api("vm_find_first", (l) => {
        let o = J(i(l, 0)),
          p = i(l, 1),
          v = s.findFirst(o);
        if (v === null || p === 0 || !e.writeUcs2(p, v.name)) {
          (v !== null && s.findClose(v.handle), (l.r[0] = -1));
          return;
        }
        l.r[0] = v.handle;
      }),
      e.api("vm_find_next", (l) => {
        let o = s.findNext(i(l, 0));
        l.r[0] = o !== null && e.writeUcs2(i(l, 1), o) ? 0 : -1;
      }),
      e.api("vm_find_close", (l) => {
        l.r[0] = s.findClose(i(l, 0));
      }),
      e.api("vm_sm_set_sb_by_ptr", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_sm_reset_sb", (l) => {
        l.r[0] = 0;
      }),
      e.api("vm_sm_set_sb_for_invoker", (l) => {
        l.r[0] = 0;
      }),
      e.api("srand", (l) => {
        ((e.cRandState = i(l, 0) >>> 0), (l.r[0] = 0));
      }),
      e.api("rand", (l) => {
        ((e.cRandState = ((Math.imul(1103515245, e.cRandState) >>> 0) + 12345) >>> 0),
          (l.r[0] = (e.cRandState >>> 16) & 32767));
      }),
      e.api("strtoi", (l) => {
        let o = i(l, 0),
          p = "";
        try {
          p = o !== 0 ? t.readCString(o, 128) : "";
        } catch (U) {
          p = "";
        }
        let v = p.replace(/^\s+/, ""),
          M = 1;
        v.startsWith("-") ? ((M = -1), (v = v.slice(1))) : v.startsWith("+") && (v = v.slice(1));
        let A = /^0x/i.test(v) ? 16 : 10;
        A === 16 && (v = v.slice(2));
        let R = 0,
          H = !1;
        for (let U = 0; U < v.length; U++) {
          let ae = Di(v[U], A);
          if (ae < 0) break;
          ((H = !0), (R = ((Math.imul(R, A) >>> 0) + ae) >>> 0));
        }
        l.r[0] = H ? (M === -1 ? -R : R) | 0 : 0;
      }),
      e.api("vm_ascii_to_ucs2", (l) => {
        l.r[0] = e.asciiToUcs2Compat(l);
      }),
      e.api("vm_gb2312_to_ucs2", (l) => {
        l.r[0] = e.gbToUcs2Compat(l);
      }),
      e.api("vm_ucs2_to_ascii", (l) => {
        l.r[0] = e.ucs2ToAsciiCompat(l);
      }),
      e.api("vm_ucs2_to_gb2312", (l) => {
        l.r[0] = e.ucs2ToAsciiCompat(l);
      }),
      e.api("vm_ucs2_string", (l) => {
        l.r[0] = e.narrowToUcs2Compat(l);
      }),
      e.api("vm_chset_convert", (l) => {
        l.r[0] = e.charsetConvertCompat(l);
      }),
      e.api("vm_wstrlen", (l) => {
        let o = i(l, 0);
        if (o === 0) {
          l.r[0] = 0;
          return;
        }
        let p = 0;
        try {
          for (; p < 4096 && t.read16(o + p * 2) !== 0; ) p++;
        } catch (v) {
          p = 0;
        }
        l.r[0] = p;
      }),
      e.api("vm_midi_play_by_bytes", (l) => {
        let o = i(l, 0) >>> 0,
          p = i(l, 1) >>> 0,
          v = i(l, 2) | 0,
          M = null;
        try {
          M = Array.prototype.slice.call(t.readBytes(o, Math.min(p, 1048576)));
        } catch (A) {
          M = null;
        }
        (M && M.length > 0 && self.postMessage({ type: "midi", bytes: M, loop: v !== 0 }),
          (l.r[0] = 0));
      }),
      e.api("vm_midi_stop", (l) => {
        (self.postMessage({ type: "midi-stop" }), (l.r[0] = 0));
      }),
      e.api("vm_midi_stop_all", (l) => {
        (self.postMessage({ type: "midi-stop" }), (l.r[0] = 0));
      }),
      e.api("vm_midi_pause", (l) => {
        (self.postMessage({ type: "midi-pause" }), (l.r[0] = 0));
      }),
      e.api("vm_midi_resume", (l) => {
        (self.postMessage({ type: "midi-resume" }), (l.r[0] = 0));
      }),
      e.api("vm_midi_play_by_bytes_ex", (l) => {
        let o = i(l, 0) >>> 0,
          p = i(l, 1) >>> 0,
          v = i(l, 2) | 0,
          M = null;
        try {
          M = Array.prototype.slice.call(t.readBytes(o, Math.min(p, 1048576)));
        } catch (A) {
          M = null;
        }
        (M && M.length > 0 && self.postMessage({ type: "midi", bytes: M, loop: v !== 0 }),
          (l.r[0] = 0));
      }));
    (e.api("vm_audio_play_bytes", (l) => {
      let o = i(l, 0) >>> 0,
        p = i(l, 1) >>> 0,
        M = null;
      try {
        M = Array.prototype.slice.call(t.readBytes(o, Math.min(p, 4194304)));
      } catch (A) {
        M = null;
      }
      (M && M.length > 0 && self.postMessage({ type: "audio", bytes: M, loop: !1 }), (l.r[0] = 0));
    }),
      e.api("vm_audio_play_bytes_no_block", (l) => {
        let o = i(l, 0) >>> 0,
          p = i(l, 1) >>> 0,
          M = null;
        try {
          M = Array.prototype.slice.call(t.readBytes(o, Math.min(p, 4194304)));
        } catch (A) {
          M = null;
        }
        (M && M.length > 0 && self.postMessage({ type: "audio", bytes: M, loop: !1 }),
          (l.r[0] = 0));
      }),
      e.api("vm_audio_stop", (l) => {
        (self.postMessage({ type: "audio-stop" }), (l.r[0] = 0));
      }),
      e.api("vm_audio_stop_all", (l) => {
        (self.postMessage({ type: "audio-stop" }), (l.r[0] = 0));
      }),
      e.api("vm_audio_pause", (l) => {
        (self.postMessage({ type: "audio-pause" }), (l.r[0] = 0));
      }),
      e.api("vm_audio_resume", (l) => {
        (self.postMessage({ type: "audio-resume" }), (l.r[0] = 0));
      }));
    for (let l of [
      "vm_audio_play_file",
      "vm_audio_play_file_ex",
      "vm_audio_duration",
      "vm_audio_bytes_duration",
      "vm_audio_get_time",
      "vm_audio_is_app_playing",
      "vm_audio_set_volume_type",
      "vm_audio_register_interrupt_callback",
      "vm_audio_clear_interrupt_callback",
      "vm_audio_resume_bg_play",
      "vm_audio_suspend_bg_play",
      "vm_audio_terminate_background_play",
      "vm_midi_get_time",
      "vm_set_volume",
    ])
      e.api(l, (o) => {
        o.r[0] = 0;
      });
  }
  function Di(e, t) {
    let r = e.charCodeAt(0),
      s =
        r >= 48 && r <= 57
          ? r - 48
          : r >= 97 && r <= 122
            ? r - 97 + 10
            : r >= 65 && r <= 90
              ? r - 65 + 10
              : -1;
    return s < t ? s : -1;
  }
  function Xe(e) {
    return e === -1 || e === 4294967295 ? -1 : e >= 0 && e <= 65535 ? e : -1;
  }
  function je(e, t, r) {
    let s = e.gfx;
    if (r <= 0) return s.activeLayerHandle === -1 ? [] : [s.activeLayerHandle];
    let i = Math.min(r, 64);
    if (i === 1 && s.layer(t)) return [t];
    if (!e.mem.isMapped(t, i * 4)) return s.layer(t) ? [t] : [];
    let a = [];
    for (let n = 0; n < i; n++) a.push(e.mem.read32(t + n * 4) | 0);
    return a;
  }
  function Se(e) {
    let t = e.length;
    for (; t > 0 && e.charCodeAt(t - 1) < 32; ) t--;
    return t === e.length ? e : e.slice(0, t);
  }
  function fr(e, t, r) {
    let s = Se(e);
    if (t <= 0) return { value: s, maxWidth: Number.MAX_SAFE_INTEGER };
    let i = r.stringWidth(s);
    return t <= s.length + 1 && t < i
      ? { value: s.slice(0, Math.min(t, s.length)), maxWidth: Number.MAX_SAFE_INTEGER }
      : { value: s, maxWidth: t };
  }
  function ie(e, t) {
    return t >= 0 && t <= 65535
      ? t & 65535
      : t >= 1048576 && e.isMapped(t, 2)
        ? cr(e, t)
        : t & 65535;
  }
  function cr(e, t) {
    if (!e.isMapped(t, 2)) return t & 65535;
    let r = e.read16(t);
    if (e.isMapped(t, 4) && e.read16(t + 2) !== 0) {
      let s = e.read8(t),
        i = e.read8(t + 1),
        a = e.read8(t + 2),
        n = e.read8(t + 3);
      if ((s === 255 || s === 0) && (i !== 0 || a !== 0 || n !== 0)) return V(i, a, n);
    }
    return r;
  }
  function dr(e, t) {
    if (t.staticBase === null) return;
    let r = e.mem,
      s = e.cpu,
      i = t.staticBase;
    ((s.r[9] = i), (s.r[13] = 68157184));
    let a = (s.r[13] - 8) | 0;
    (r.write32(a, 0, !0),
      r.write32(a + 4, 16842748, !0),
      r.write32(i - 128, a, !0),
      r.write32(i - 124, e.resolverAddress, !0));
  }
  function $i(e) {
    let t = e.mem,
      r = e.cpu,
      s = 805306624,
      i = (r.r[13] - 8) | 0;
    (t.write32(i, 0, !0),
      t.write32(i + 4, 16842748, !0),
      t.write32(s - 128, i, !0),
      t.write32(s - 124, e.resolverAddress, !0),
      t.write32(s - 120, 33554432, !0),
      t.write32(s - 116, 50331648, !0),
      t.write32(s - 112, 1048576, !0));
  }
  var mr = class {
      constructor(e, t, r = 2e7) {
        (__publicField(this, "eventsDispatched", 0),
          __publicField(this, "timerCallbacks", 0),
          __publicField(this, "warnings", []),
          __publicField(this, "createDelivered", !1),
          __publicField(this, "penDropReported", !1),
          (this.cpu = e),
          (this.rt = t),
          (this.maxInsPerCallback = r));
      }
      dispatchOne(e) {
        var t, r, s, i, a, n, h, u, f, d, c, _, m;
        let y = this.rt;
        if (!(y.exitRequested || this.cpu.halted))
          switch (e.kind) {
            case "system": {
              let w = y.entryCallback();
              if (w === 0) return;
              (this.cpu.callGuest(
                w,
                [(t = e.message) != null ? t : 0, (r = e.param) != null ? r : 0],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++);
              return;
            }
            case "timer": {
              if (!e.callback) return;
              (this.cpu.callGuest(
                e.callback,
                [(s = e.timerId) != null ? s : 0],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++,
                this.timerCallbacks++);
              return;
            }
            case "keyboard": {
              if (y.keyboardCallback === 0) return;
              (this.cpu.callGuest(
                y.keyboardCallback,
                [(i = e.eventType) != null ? i : 0, (a = e.keyCode) != null ? a : 0],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++);
              return;
            }
            case "pen": {
              if (y.penCallback === 0) {
                this.penDropReported ||
                  ((this.penDropReported = !0),
                  this.warnings.push("pen events dropped: guest registered no pen callback"));
                return;
              }
              (this.cpu.callGuest(
                y.penCallback,
                [
                  (n = e.eventType) != null ? n : 0,
                  (h = e.x) != null ? h : 0,
                  (u = e.y) != null ? u : 0,
                ],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++);
              return;
            }
            default: {
              if (!e.callback) return;
              let w = (f = e.argc) != null ? f : 0,
                g = [
                  (d = e.a0) != null ? d : 0,
                  (c = e.a1) != null ? c : 0,
                  (_ = e.a2) != null ? _ : 0,
                  (m = e.a3) != null ? m : 0,
                ].slice(0, w);
              (this.cpu.callGuest(e.callback, g, this.maxInsPerCallback), this.eventsDispatched++);
            }
          }
      }
      deliverCreatePaint() {
        this.createDelivered ||
          this.rt.entryCallback() === 0 ||
          ((this.createDelivered = !0),
          this.dispatchOne({ kind: "system", message: or, param: 0 }),
          this.dispatchOne({ kind: "system", message: ur, param: 0 }));
      }
      start(e, t = !0, r = 0) {
        if (e === 0) throw new Error("vm_main/entry address is null");
        if (!t) return;
        let s = () => {
            (this.rt.enqueueDueTimers(), this.deliverCreatePaint());
            let a = 0;
            for (; a < 4 && !this.rt.exitRequested && !this.cpu.halted; ) {
              let n = this.rt.pollEvent();
              if (!n) break;
              (this.dispatchOne(n), a++);
            }
            return this.rt.exitRequested || this.cpu.halted;
          },
          i = r !== 0 ? [r] : [];
        this.cpu.callGuest(e, i, this.maxInsPerCallback, s, 2e5);
      }
      begin() {
        if (this.rt.exitRequested) return !1;
        if (this.rt.hasEntryCallback())
          this.createDelivered || (this.rt.postSystemEvent(or, 0), this.rt.postSystemEvent(ur, 0));
        else if (
          (this.warnings.push(
            "vm_main returned without vm_reg_sysevt_callback(); no CREATE/PAINT callback can be delivered"
          ),
          this.rt.timerCount() === 0)
        )
          return !1;
        return !0;
      }
      pumpOnce(e = 4) {
        if (this.rt.exitRequested || this.cpu.halted) return 0;
        (this.rt.enqueueDueTimers(), this.deliverCreatePaint());
        let t = 0;
        for (; t < e && !this.rt.exitRequested && !this.cpu.halted; ) {
          let r = this.rt.pollEvent();
          if (!r) break;
          (this.dispatchOne(r), t++);
        }
        return t;
      }
      pumpFor(e, t = !1) {
        let r = e > 0 ? Date.now() + e : 0,
          s = e > 0 ? this.rt.nowMs() + e : 0,
          i = !1;
        for (; !this.rt.exitRequested && !this.cpu.halted; ) {
          if (e > 0 && Date.now() >= r) {
            i = !0;
            break;
          }
          if (this.pumpOnce() === 0) {
            let a = this.rt.msUntilNextTimer();
            if (a === null) break;
            if (a > 0) {
              if (!t) break;
              let n = a;
              if ((e > 0 && (n = Math.min(n, Math.max(0, s - this.rt.nowMs()))), n <= 0)) {
                i = !0;
                break;
              }
              this.rt.clockOffsetMs += n;
              continue;
            }
          }
        }
        return this.stats(i);
      }
      stats(e = !1) {
        return {
          eventsDispatched: this.eventsDispatched,
          timerCallbacks: this.timerCallbacks,
          timedOut: e,
          warnings: this.warnings.slice(),
        };
      }
    },
    Wi = class {
      constructor(e = 2e7, t = 4) {
        (__publicField(this, "mem", new st()),
          __publicField(this, "rt"),
          __publicField(this, "loop", null),
          __publicField(this, "backend", "UNKNOWN"),
          __publicField(this, "kind", "UNKNOWN"),
          __publicField(this, "pkg", "OTHER"),
          __publicField(this, "lcdW", 240),
          __publicField(this, "lcdH", 320),
          __publicField(this, "ramKb", 800),
          __publicField(this, "entry", 0),
          __publicField(this, "booted", !1),
          __publicField(this, "warnings", []),
          __publicField(this, "cpuHook", null),
          (this.maxInsPerCallback = e),
          (this.frameBudgetMs = t),
          (this.rt = this.newRuntime(this.mem, "app.vxp")));
      }
      newRuntime(e, t) {
        var r;
        let s = new ui(e, this.lcdW, this.lcdH);
        return (
          Ti(s),
          (s.rawExecutableName = t),
          (s.stubTrace = (i) => {
            this.warnings.push(`stub API called: ${i}`);
          }),
          (s.errorTrace = (i, a) => {
            this.warnings.push(`api handler threw: ${a instanceof Error ? a.message : String(a)}`);
          }),
          (this.mem = e),
          (this.rt = s),
          (r = this.cpuHook) == null || r.call(this, s.cpu),
          s
        );
      }
      load(e, t = "app.vxp") {
        ((this.warnings = []), (this.loop = null), (this.booted = !1), (this.entry = 0));
        let r = Mi(e);
        ((this.kind = r.kind), (this.backend = r.backend));
        let s = Ie(r.tags);
        if (
          ((this.lcdW = s.w),
          (this.lcdH = s.h),
          (this.ramKb = Ne(r.tags)),
          (this.pkg = et(r.tags, e[0] === 127 && e[1] === 69, e[0] === 120)),
          r.backend === "UNKNOWN")
        )
          return this.fail(
            0,
            r.detail ||
              "Container kh\xF4ng \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 \u2014 kh\xF4ng t\xECm th\u1EA5y ELF/RAW ARM."
          );
        try {
          if (r.backend === "RAW_ARM") {
            if (r.raw === null) throw new Error("RAW image was not prepared");
            return this.bootRaw(r.raw, t, !0);
          }
          if (r.backend === "FLASH_LITE")
            return this.fail(
              0,
              "Flash Lite SWF \u2014 backend ch\u01B0a port (ch\u1EC9 c\xF3 parser/probe)."
            );
          if (r.elf === null) throw new Error("ELF image was not prepared");
          return this.bootElf(r.elf, t);
        } catch (i) {
          return this.fail(
            this.entry,
            `Boot th\u1EADt l\u1ED7i: ${i instanceof Error ? i.message : String(i)}`
          );
        }
      }
      fail(e, t) {
        return this.result(!1, e, t);
      }
      result(e, t, r) {
        var s, i;
        let a = this.loop;
        return {
          ok: e,
          backend: this.backend,
          kind: this.kind,
          pkg: this.pkg,
          lcdW: this.lcdW,
          lcdH: this.lcdH,
          ramKb: this.ramKb,
          entry: t,
          instructions: this.rt.cpu.instructions,
          frames: this.rt.frames,
          events: (s = a == null ? void 0 : a.eventsDispatched) != null ? s : 0,
          timerCallbacks: (i = a == null ? void 0 : a.timerCallbacks) != null ? i : 0,
          resolved: this.rt.resolvedNames.length,
          stubbed: this.rt.stubbedNames.length,
          message: r,
          warnings: this.warnings.slice(0, 24),
        };
      }
      bootElf(e, t) {
        var r, s;
        let i = Fi.parse(e),
          a = new st(),
          n = i.load(a),
          h = this.newRuntime(a, t),
          u = h.cpu,
          f = i.vmResSection();
        f !== null && h.installElfVmResources(f.bytes, f.offset);
        let d = i.applyRelocations(a, n, h);
        d.length > 0 &&
          this.warnings.push(`unresolved imports (${d.length}): ${d.slice(0, 12).join(", ")}`);
        let c = i.installImportResolvers(a, n, h.resolverAddress, h);
        for (let S of d) h.stubbedNames.includes(S) || h.stubbedNames.push(S);
        let _ =
            (r = i.definedSymbolAddress("vm_main", n)) != null
              ? r
              : i.definedSymbolAddress("_vm_main", n),
          m = _ != null ? _ : n.entry,
          y = i.definedSymbolAddress("gcc_entry", n),
          w = (s = i.sectionAddress(".init_array", n)) != null ? s : 0,
          g = Math.floor(i.sectionSize(".init_array") / 4),
          b = _ === null && y === null && g > 0;
        this.entry = m | 0;
        let x = n.staticBase;
        x !== null &&
          (a.write32(x - 120, 33554432, !0),
          a.write32(x - 116, 50331648, !0),
          a.write32(x - 112, 1048576, !0));
        let k = y !== null || b;
        k
          ? (u.reset(n.entry),
            dr(h, n),
            u.callGuest(n.entry, [h.resolverAddress, w, g], this.maxInsPerCallback))
          : (u.reset(n.entry), dr(h, n));
        let C = !1;
        if (!k) {
          h.bootstrapSemihostingExitAsReturn = !0;
          try {
            let S = c.length > 0 ? [h.resolverAddress] : [];
            (u.callGuest(n.entry, S, this.maxInsPerCallback),
              (C = !h.exitRequested && (h.hasEntryCallback() || h.timerCount() > 0)));
          } catch (S) {
            this.warnings.push(
              `ELF entry bootstrap fault: ${S instanceof Error ? S.message : String(S)}`
            );
          } finally {
            h.bootstrapSemihostingExitAsReturn = !1;
          }
        }
        let z = new mr(u, h, this.maxInsPerCallback);
        ((this.loop = z), z.start(m, !(C || k), c.length > 0 ? h.resolverAddress : 0));
        let E = z.begin();
        this.booted = E;
        for (let S of z.warnings) this.warnings.push(S);
        i.relocErrors.length > 0 &&
          this.warnings.push(
            `reloc errors (${i.relocErrors.length}): ${i.relocErrors.slice(0, 8).join(", ")}`
          );
        let B = `bootstrap=${C ? "entry" : k ? "gcc_entry" : "vm_main"} sysCb=0x${(h.systemCallback >>> 0).toString(16)} keyCb=0x${(h.keyboardCallback >>> 0).toString(16)} penCb=0x${(h.penCallback >>> 0).toString(16)} timers=${h.timerCount()} slots=${c.length} exit=${h.exitRequested ? 1 : 0} halted=${u.halted ? 1 : 0}${pr(u)}`;
        return E
          ? this.result(
              !0,
              this.entry,
              `Boot th\u1EADt ELF_ARM: kind=${this.kind} pkg=${this.pkg} lcd=${this.lcdW}x${this.lcdH} entry=0x${(this.entry >>> 0).toString(16)} ins=${u.instructions} frames=${h.frames} ${B}`
            )
          : this.result(
              !1,
              this.entry,
              `ELF_ARM kh\xF4ng s\u1ED1ng sau bootstrap: ${B} ins=${u.instructions} frames=${h.frames}`
            );
      }
      bootRaw(e, t, r) {
        var s;
        let i = (s = e.vmMainOffset) != null ? s : 0,
          a = new st(),
          n = lt(r ? e.code.length + e.initialData.length + 4096 : e.code.length, 4096);
        (a.map(268435456, Math.max(n, 4096), !0, !0, !0),
          a.writeBytes(268435456, e.code, 0, e.code.length, !0),
          r &&
            e.initialData.length > 0 &&
            a.writeBytes(
              (268435456 + e.code.length) | 0,
              e.initialData,
              0,
              e.initialData.length,
              !0
            ));
        let h = Math.max(e.initialData.length, e.dataSizeHint),
          u = Math.max(e.bssSizeHint, 16384),
          f = lt(256 + h + u + 16384, 4096);
        (a.map(805306368, f, !0, !0, !1),
          e.initialData.length > 0 && a.writeBytes(805306624, e.initialData),
          a.write32(805306624, 805306624, !0));
        let d = this.newRuntime(a, t);
        (d.installRawResources(e.resources),
          a.write32((805306624 + e.resolverSlotOffset) | 0, d.resolverAddress, !0));
        let c = (268435456 + i) | 0;
        this.entry = c;
        let _ = d.cpu,
          m = !1;
        if (r)
          try {
            (_.reset(268435456),
              (_.r[9] = 805306624),
              $i(d),
              (d.bootstrapSemihostingExitAsReturn = !0));
            try {
              _.callGuest(268435456, [], this.maxInsPerCallback);
            } finally {
              d.bootstrapSemihostingExitAsReturn = !1;
            }
            m = !d.exitRequested && (d.hasEntryCallback() || d.timerCount() > 0);
          } catch (b) {
            this.warnings.push(
              `RAW ARMCC bootstrap fallback: ${b instanceof Error ? b.message : String(b)}`
            );
          } finally {
            d.bootstrapSemihostingExitAsReturn = !1;
          }
        if (r && !m)
          return (
            this.warnings.push(
              "RAW ARMCC bootstrap did not complete; retrying pristine legacy launch"
            ),
            this.bootRaw(e, t, !1)
          );
        let y = new mr(_, d, this.maxInsPerCallback);
        ((this.loop = y),
          m
            ? y.start(c, !1)
            : (e.initialData.length > 0 &&
                a.writeBytes(805306624, e.initialData, 0, e.initialData.length, !0),
              a.write32(805306624, 805306624, !0),
              a.write32((805306624 + e.resolverSlotOffset) | 0, d.resolverAddress, !0),
              _.reset(c),
              (_.r[9] = 805306624),
              y.start(c, !0)));
        let w = y.begin();
        this.booted = w;
        for (let b of y.warnings) this.warnings.push(b);
        let g = `bootstrap=${m} vmMain=0x${(c >>> 0).toString(16)} sysCb=0x${(d.systemCallback >>> 0).toString(16)} keyCb=0x${(d.keyboardCallback >>> 0).toString(16)} penCb=0x${(d.penCallback >>> 0).toString(16)} timers=${d.timerCount()} res=${d.namedResources.length} slot=0x${e.resolverSlotOffset.toString(16)} exit=${d.exitRequested ? 1 : 0} halted=${_.halted ? 1 : 0}${pr(_)}`;
        return w
          ? this.result(
              !0,
              this.entry,
              `Boot th\u1EADt RAW_ARM: kind=${this.kind} pkg=${this.pkg} lcd=${this.lcdW}x${this.lcdH} ${g} ins=${_.instructions} frames=${d.frames}`
            )
          : this.result(
              !1,
              this.entry,
              `RAW_ARM kh\xF4ng s\u1ED1ng sau bootstrap: ${g} ins=${_.instructions} frames=${d.frames}`
            );
      }
      present(e) {
        var t;
        ((t = this.loop) == null || t.pumpFor(this.frameBudgetMs), this.rt.gfx.toRgba(e));
      }
      present565(e) {
        var t;
        (t = this.loop) == null || t.pumpFor(this.frameBudgetMs);
        let r = this.rt.gfx.fb565;
        e.set(r.length <= e.length ? r : r.subarray(0, e.length));
      }
      pumpFor(e) {
        var t;
        (t = this.loop) == null || t.pumpFor(e, !0);
      }
      key(e, t) {
        this.rt.postKeyboardEvent(e, t);
      }
      pen(e, t, r) {
        this.rt.postPenEvent(e, t, r);
      }
      stop(e = 0) {
        this.rt.requestExit(e, "host");
      }
    };
  function pr(e) {
    let t = e.fault;
    return t === null ? "" : ` fault=${t.kind}@0x${(t.pc >>> 0).toString(16)} ${t.detail}`;
  }
  function Hi(e, t) {
    let r = null,
      s = !1,
      i = null,
      a = null,
      n = !1,
      h = [],
      u = (c, _) => {
        let m = c * _;
        for (let y = 0; y < h.length; y++) if (h[y].length >= m) return h.splice(y, 1)[0];
        return new Uint16Array(m);
      },
      f = () => {
        if (((i = null), n || !r || !s)) return;
        let c = u(r.lcdW, r.lcdH);
        r.present565(c);
        let _ = r.rt.cpu.fault;
        (_ &&
          _ !== a &&
          ((a = _),
          t({
            type: "log",
            level: "warn",
            text: `Guest dung lai: ${_.kind}@0x${(_.pc >>> 0).toString(16)}`,
          })),
          t(
            {
              type: "frame",
              px: c,
              w: r.lcdW,
              h: r.lcdH,
              frames: r.rt.frames,
              fault: _,
              exit: r.rt.exitReason,
            },
            [c.buffer]
          ),
          (i = setTimeout(f, 16)));
      },
      d = () => {
        i === null && !n && (i = setTimeout(f, 0));
      };
    return {
      handle(c) {
        var _, m, y, w, g, b, x, k;
        switch (c.type) {
          case "load": {
            let C = new Uint8Array((_ = c.bytes) != null ? _ : new ArrayBuffer(0));
            let z;
            try {
              ((r = new e()), (a = null));
              z = r.load(C, (m = c.name) != null ? m : "app.vxp");
            } catch (ex) {
              z = {
                ok: !1,
                message:
                  "engine error: " +
                  (ex && ex.message ? ex.message : String(ex)) +
                  (ex && ex.stack ? " | " + String(ex.stack).slice(0, 300) : ""),
              };
            }
            (t({ type: "boot", result: z }), z && z.ok && ((s = !0), d()));
            break;
          }
          case "key":
            r == null || r.key((y = c.ev) != null ? y : 0, (w = c.code) != null ? w : 0);
            break;
          case "pen":
            r == null ||
              r.pen(
                (g = c.ev) != null ? g : 0,
                (b = c.x) != null ? b : 0,
                (x = c.y) != null ? x : 0
              );
            break;
          case "running":
            ((s = !!c.value), s && d());
            break;
          case "recycle":
            c.px && h.push(c.px);
            break;
          case "stop":
            r == null || r.stop((k = c.code) != null ? k : 0);
            break;
          default:
            break;
        }
      },
      dispose() {
        ((n = !0), (s = !1), i !== null && clearTimeout(i), (i = null), (r = null), (h.length = 0));
      },
    };
  }
  var vt = self,
    Ui = Hi(Wi, (e, t) => vt.postMessage(e, t));
  ((vt.onmessage = (e) => Ui.handle(e.data)), vt.postMessage({ type: "ready" }));
})();
