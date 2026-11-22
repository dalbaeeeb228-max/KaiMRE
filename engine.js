// KaiMRE engine: MRE/VXP ARM interpreter and runtime, running in a Web Worker.
// Plain ES2015 (KaiOS 2.5 / Gecko 48 compatible): no BigInt, no ?. or ??.
// The DA (STMDA/LDMDA) block-transfer address is ARM-spec correct.
function __mulS64(a, b) {
  var neg = a < 0 !== b < 0;
  var x = a < 0 ? -a : a, y = b < 0 ? -b : b;
  var x1 = Math.floor(x / 65536), x0 = x % 65536;
  var y1 = Math.floor(y / 65536), y0 = y % 65536;
  var p00 = x0 * y0, p01 = x0 * y1, p10 = x1 * y0, p11 = x1 * y1;
  var mid = p01 + p10;
  var low = p00 + mid % 65536 * 65536;
  var lo = low % 4294967296;
  var carry = Math.floor(low / 4294967296);
  var hi = p11 + Math.floor(mid / 65536) + carry;
  if (neg) {
    var borrow = lo === 0 ? 0 : 1;
    lo = -lo >>> 0;
    hi = -hi - borrow >>> 0;
  }
  return [hi >>> 0, lo >>> 0];
}
"use strict";
(() => {
  var Be = { DEV: 1, APP_ID: 2, CERT_ID: 3, NAME: 4, VER: 5, MEM_REQ: 15, RESOLUTION_REQ: 16, COMPILER: 21, NAME_LIST: 25, FILE_TYPE: 33, RO_RW_ZIP: 34, CHARSET: 35 }, an = 800, tr = 240, rr = 320;
  function We(i, e) {
    return (i[e] | i[e + 1] << 8 | i[e + 2] << 16 | i[e + 3] << 24) >>> 0;
  }
  function nr(i) {
    let e = { offset: 0, map: /* @__PURE__ */ new Map(), error: "" }, t = i.length;
    if (t < 12) return e.error = "too-small", e;
    let r = We(i, t - 12);
    e.offset = r;
    let n = r, a = 4294967295, o = 0;
    for (; a !== 0 && o++ < 64; ) {
      if (n + 8 > t) return e.error = `truncated@0x${n.toString(16)}`, e;
      a = We(i, n);
      let l = We(i, n + 4);
      if (n += 8, a === 0) break;
      if (n + l > t) return e.error = `oversize id=${a} @0x${n.toString(16)}`, e;
      e.map.set(a, i.slice(n, n + l)), n += l;
    }
    return a !== 0 && (e.error = "no-terminator"), e;
  }
  function $e(i, e) {
    let t = i.map.get(e);
    return t && t.length === 4 ? We(t, 0) : 0;
  }
  function ir(i) {
    let e = $e(i, Be.MEM_REQ);
    return e === 0 ? an : e;
  }
  function sr(i) {
    let e = $e(i, Be.RESOLUTION_REQ);
    if (e === 0) return { w: tr, h: rr };
    let t = e >>> 16 & 65535, r = e & 65535;
    return t === 0 || r === 0 || t > 2048 || r > 2048 ? { w: tr, h: rr } : { w: t, h: r };
  }
  function on(i) {
    return $e(i, Be.FILE_TYPE);
  }
  function ln(i) {
    return $e(i, Be.RO_RW_ZIP);
  }
  function ar(i, e, t) {
    if (i.error) return "TAGERR";
    let r = on(i);
    return i.map.has(Be.FILE_TYPE) && (r === 0 || r === 1 || r === 5) ? ln(i) !== 0 ? "ADS_ZIPPED" : e ? "ADS_ELF" : t ? "ADS_RAW_ZLIB" : "ADS_RAW" : e ? "GCC_ELF" : t ? "GCC_ZLIB_ELF" : "OTHER";
  }
  var or = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], un = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], lr = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577], fn = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], cn = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  function ve(i, e) {
    if (e < 0 || e + 2 > i.length) return false;
    let t = i[e], r = i[e + 1];
    return (t & 15) === 8 && ((t << 8) + r) % 31 === 0;
  }
  function hn(i) {
    let e = 1, t = 0, r = 0;
    for (; r < i.length; ) {
      let n = Math.min(5552, i.length - r), a = r + n;
      for (; r < a; r++) e += i[r], t += e;
      e %= 65521, t %= 65521;
    }
    return (t << 16 | e) >>> 0;
  }
  var de = class {
    constructor(e, t) {
      this.counts = new Int32Array(16);
      this.symbols = undefined;
      for (let a = 0; a < t; a++) this.counts[e[a]]++;
      this.counts[0] = 0;
      let r = new Int32Array(16), n = 0;
      for (let a = 1; a < 16; a++) r[a] = n, n += this.counts[a];
      this.symbols = new Int32Array(n);
      for (let a = 0; a < t; a++) e[a] !== 0 && (this.symbols[r[e[a]]++] = a);
    }
  }, gt = class {
    constructor(e, t) {
      this.acc = 0;
      this.nbits = 0;
      this.src = e;
      this.pos = t;
    }
    bits(e) {
      for (; this.nbits < e; ) {
        if (this.pos >= this.src.length) throw new Error("inflate: input truncated");
        this.acc |= this.src[this.pos++] << this.nbits, this.nbits += 8;
      }
      let t = this.acc & (1 << e) - 1;
      return this.acc >>>= e, this.nbits -= e, t;
    }
    alignByte() {
      this.acc = 0, this.nbits = 0;
    }
    byte() {
      if (this.pos >= this.src.length) throw new Error("inflate: input truncated");
      return this.src[this.pos++];
    }
  };
  function bt(i, e) {
    let t = 0, r = 0, n = 0;
    for (let a = 1; a <= 15; a++) {
      t |= i.bits(1);
      let o = e.counts[a];
      if (t - o < r) return e.symbols[n + (t - r)];
      n += o, r += o, r <<= 1, t <<= 1;
    }
    return -1;
  }
  function Ze(i, e = 0, t = 64 * 1024 * 1024) {
    if (!ve(i, e) || (i[e + 1] & 32) !== 0) return null;
    try {
      let r = new gt(i, e + 2), n = new Uint8Array(Math.min(t, 65536)), a = 0, o = (m) => {
        if (a + m <= n.length) return;
        let b = n.length;
        for (; b < a + m; ) b *= 2;
        if (b > t) throw new Error("inflate: output exceeds safety limit");
        let x = new Uint8Array(b);
        x.set(n.subarray(0, a)), n = x;
      }, l = 0;
      do {
        l = r.bits(1);
        let m = r.bits(2);
        if (m === 0) {
          r.alignByte();
          let p = r.byte() | r.byte() << 8, _ = r.byte() | r.byte() << 8;
          if (((p ^ 65535) & 65535) !== _) throw new Error("inflate: bad stored block length");
          o(p);
          for (let d = 0; d < p; d++) n[a++] = r.byte();
          continue;
        }
        if (m === 3) throw new Error("inflate: bad block type");
        let b, x;
        if (m === 1) {
          let p = new Uint8Array(288), _ = new Uint8Array(30);
          for (let d = 0; d < 144; d++) p[d] = 8;
          for (let d = 144; d < 256; d++) p[d] = 9;
          for (let d = 256; d < 280; d++) p[d] = 7;
          for (let d = 280; d < 288; d++) p[d] = 8;
          _.fill(5), b = new de(p, 288), x = new de(_, 30);
        } else {
          let p = r.bits(5) + 257, _ = r.bits(5) + 1, d = r.bits(4) + 4, y = new Uint8Array(19);
          for (let R = 0; R < d; R++) y[cn[R]] = r.bits(3);
          let v = new de(y, 19), M = new Uint8Array(p + _), S = p + _, T = 0;
          for (; T < S; ) {
            let R = bt(r, v);
            if (R < 0) throw new Error("inflate: bad code-length symbol");
            if (R < 16) {
              M[T++] = R;
              continue;
            }
            if (R === 16) {
              if (T === 0) throw new Error("inflate: repeat with no prior length");
              let E = M[T - 1], B = 3 + r.bits(2);
              for (let L = 0; L < B && T < S; L++) M[T++] = E;
            } else if (R === 17) {
              let E = 3 + r.bits(3);
              for (let B = 0; B < E && T < S; B++) M[T++] = 0;
            } else {
              let E = 11 + r.bits(7);
              for (let B = 0; B < E && T < S; B++) M[T++] = 0;
            }
          }
          if (M[256] === 0) throw new Error("inflate: no end-of-block code");
          b = new de(M.subarray(0, p), p), x = new de(M.subarray(p), _);
        }
        for (; ; ) {
          let p = bt(r, b);
          if (p < 0) throw new Error("inflate: bad literal symbol");
          if (p < 256) {
            o(1), n[a++] = p;
            continue;
          }
          if (p === 256) break;
          let _ = p - 257;
          if (_ >= or.length) throw new Error("inflate: bad length symbol");
          let d = or[_] + r.bits(un[_]), y = bt(r, x);
          if (y < 0 || y >= lr.length) throw new Error("inflate: bad distance symbol");
          let v = lr[y] + r.bits(fn[y]);
          if (v > a) throw new Error("inflate: distance beyond output");
          o(d);
          for (let M = 0; M < d; M++) n[a] = n[a - v], a++;
        }
      } while (!l);
      r.alignByte();
      let u = n.subarray(0, a);
      if (r.pos + 4 > i.length) throw new Error("inflate: missing adler32");
      if ((i[r.pos] << 24 | i[r.pos + 1] << 16 | i[r.pos + 2] << 8 | i[r.pos + 3]) >>> 0 !== hn(u)) throw new Error("inflate: adler32 mismatch");
      let h = r.pos + 4;
      return { compressedOffset: e, compressedSize: h - e, bytes: u.slice() };
    } catch (e2) {
      return null;
    }
  }
  function fr(i, e) {
    return i[e] | i[e + 1] << 8 | i[e + 2] << 16 | i[e + 3] << 24 | 0;
  }
  function wt(i, e = 0) {
    if (e < 0 || e + 6 > i.length) return false;
    let t = i[e];
    if (t >= 225 || t % 9 > 8 || Math.floor(t / 9) % 5 > 4 || Math.floor(t / 45) > 4) return false;
    let r = fr(i, e + 1) >>> 0;
    return r >= 1 && r <= 67108864;
  }
  function At(i, e) {
    let t = Math.max(0, Math.min(e, i.length));
    for (; t < i.length && i[t] === 0; ) t++;
    return t;
  }
  function Et(i, e = 0, t = 134217728) {
    if (!wt(i, e)) return null;
    let r = ur(i, e, e + 5, t);
    if (r !== null) return r;
    if (e + 14 > i.length) return null;
    let n = 0;
    for (let o = 0; o < 8; o++) n += i[e + 5 + o] * Math.pow(2, 8 * o);
    let a = n <= 0 || n > t ? -1 : n;
    return ur(i, e, e + 13, t, a);
  }
  function ur(i, e, t, r, n = -1) {
    if (t < 0 || t + 6 > i.length) return null;
    try {
      let a = i[e], o = a % 9, l = Math.floor(a / 9) % 5, u = Math.floor(a / 45);
      if (u > 4 || l > 4 || o > 8) throw new Error("LZMA bad properties");
      let c = fr(i, e + 1) >>> 0;
      if (c < 1 || c > 67108864) throw new Error("LZMA bad dictionary size");
      let h = new vt(o, l, u, c, r);
      return { bytes: h.decode(i, t, n), nextInputOffset: h.inputConsumed };
    } catch (e2) {
      return null;
    }
  }
  var _t = class {
    constructor(e) {
      this.buf = undefined;
      this.n = 0;
      this.buf = new Uint8Array(Math.max(1024, Math.min(e, 65536)));
    }
    get size() {
      return this.n;
    }
    write(e) {
      if (this.n === this.buf.length) {
        let t = new Uint8Array(this.buf.length * 2);
        t.set(this.buf), this.buf = t;
      }
      this.buf[this.n++] = e & 255;
    }
    toBytes() {
      return this.buf.slice(0, this.n);
    }
  }, xt = class {
    constructor(e, t) {
      this.pos = undefined;
      this.range = -1;
      this.code = 0;
      this.input = e;
      this.pos = t;
    }
    init() {
      if (this.input[this.pos] !== 0) throw new Error("LZMA range coder must start with zero byte");
      this.pos++, this.code = 0;
      for (let e = 0; e < 4; e++) {
        if (this.pos >= this.input.length) throw new Error("LZMA header truncated");
        this.code = this.code << 8 | this.input[this.pos++] | 0;
      }
    }
    normalize() {
      if ((this.range & 4278190080) === 0) {
        if (this.pos >= this.input.length) throw new Error("LZMA stream truncated");
        this.range = this.range << 8 | 0, this.code = this.code << 8 | this.input[this.pos++] | 0;
      }
    }
    decodeBit(e, t) {
      let r = e[t] & 65535, n = (this.range >>> 11) * r >>> 0 | 0;
      return this.code >>> 0 < n >>> 0 ? (this.range = n, e[t] = r + (2048 - r >>> 5) & 65535, this.normalize(), 0) : (this.range = this.range - n | 0, this.code = this.code - n | 0, e[t] = r - (r >>> 5) & 65535, this.normalize(), 1);
    }
    decodeDirectBits(e) {
      let t = 0;
      for (let r = 0; r < e; r++) {
        this.range = this.range >>> 1;
        let n = this.code - this.range >>> 31;
        this.code = this.code - (this.range & n - 1) | 0, t = t << 1 | 1 - n | 0, this.normalize();
      }
      return t;
    }
  }, pe = class {
    constructor(e) {
      this.probs = undefined;
      this.numBitLevels = e;
      this.probs = new Int32Array(1 << e).fill(1024);
    }
    decode(e) {
      let t = 1;
      for (let r = 0; r < this.numBitLevels; r++) t = t << 1 | e.decodeBit(this.probs, t);
      return t - (1 << this.numBitLevels);
    }
    reverseDecode(e) {
      let t = 1, r = 0;
      for (let n = 0; n < this.numBitLevels; n++) {
        let a = e.decodeBit(this.probs, t);
        t = t << 1 | a, r |= a << n;
      }
      return r;
    }
  }, Ve = class {
    constructor() {
      this.choice = new Int32Array(2).fill(1024);
      this.lowCoder = [];
      this.midCoder = [];
      this.highCoder = new pe(8);
      for (let e = 0; e < 16; e++) this.lowCoder.push(new pe(3)), this.midCoder.push(new pe(3));
    }
    decode(e, t) {
      return e.decodeBit(this.choice, 0) === 0 ? this.lowCoder[t].decode(e) : e.decodeBit(this.choice, 1) === 0 ? 8 + this.midCoder[t].decode(e) : 16 + this.highCoder.decode(e);
    }
  }, yt = class {
    constructor(e, t) {
      this.posMask = undefined;
      this.lc = undefined;
      this.coders = [];
      this.posMask = (1 << e) - 1, this.lc = t;
      let r = 1 << e + t;
      for (let n = 0; n < r; n++) this.coders.push(new Int32Array(768).fill(1024));
    }
    probsFor(e, t) {
      return this.coders[((e & this.posMask) << this.lc) + ((t & 255) >>> 8 - this.lc)];
    }
    decodeNormal(e, t, r) {
      let n = this.probsFor(t, r), a = 1;
      for (let o = 0; o < 8; o++) a = a << 1 | e.decodeBit(n, a);
      return a & 255;
    }
    decodeWithMatchByte(e, t, r, n) {
      let a = this.probsFor(t, r), o = 1, l = n;
      for (let u = 7; u >= 0; u--) {
        let c = l >> 7 & 1;
        l <<= 1;
        let h = e.decodeBit(a, (1 + c << 8) + o);
        if (o = o << 1 | h, h !== c) {
          for (; o < 256; ) o = o << 1 | e.decodeBit(a, o);
          break;
        }
      }
      return o & 255;
    }
  }, vt = class {
    constructor(e, t, r, n, a) {
      this.inputConsumed = -1;
      this.posStateMask = undefined;
      this.isMatch = new Int32Array(192).fill(1024);
      this.isRep = new Int32Array(12).fill(1024);
      this.isRepG0 = new Int32Array(12).fill(1024);
      this.isRepG1 = new Int32Array(12).fill(1024);
      this.isRepG2 = new Int32Array(12).fill(1024);
      this.isRep0Long = new Int32Array(192).fill(1024);
      this.posSlotDecoder = [];
      this.posDecoders = new Int32Array(114).fill(1024);
      this.alignDecoder = new pe(4);
      this.lenDecoder = new Ve();
      this.repLenDecoder = new Ve();
      this.literalDecoder = undefined;
      this.dict = undefined;
      this.dictPos = 0;
      this.out = undefined;
      this.maxOutput = undefined;
      this.posStateMask = (1 << r) - 1;
      for (let o = 0; o < 4; o++) this.posSlotDecoder.push(new pe(6));
      this.literalDecoder = new yt(t, e), this.dict = new Uint8Array(n), this.out = new _t(a), this.maxOutput = a;
    }
    dictGet(e) {
      let t = this.dict.length;
      return this.dict[(this.dictPos - e - 1 + t) % t];
    }
    reverseDecode(e, t, r, n) {
      let a = 1, o = 0;
      for (let l = 0; l < n; l++) {
        let u = r.decodeBit(e, t + a);
        a = a << 1 | u, o |= u << l;
      }
      return o;
    }
    dictPut(e) {
      this.dict[this.dictPos] = e & 255, this.dictPos++, this.dictPos === this.dict.length && (this.dictPos = 0), this.out.write(e);
    }
    decode(e, t, r) {
      let n = new xt(e, t);
      n.init();
      let a = this.dict.length, o = 0, l = 0, u = 0, c = 0, h = 0, m = 0;
      for (; r < 0 || m < r; ) {
        if (this.out.size > this.maxOutput) throw new Error("LZMA output exceeds cap");
        let b = m & this.posStateMask;
        if (n.decodeBit(this.isMatch, (o << 4) + b) === 0) {
          let x = m === 0 ? 0 : this.dict[(this.dictPos - 1 + a) % a], p = o >= 7 ? this.literalDecoder.decodeWithMatchByte(n, m, x, this.dict[(this.dictPos - l - 1 + a) % a]) : this.literalDecoder.decodeNormal(n, m, x);
          this.dictPut(p), m++, o = o < 4 ? 0 : o < 10 ? o - 3 : o - 6;
        } else {
          let x;
          if (n.decodeBit(this.isRep, o) === 1) {
            if (x = 0, n.decodeBit(this.isRepG0, o) === 0) n.decodeBit(this.isRep0Long, (o << 4) + b) === 0 && (o = o < 7 ? 9 : 11, x = 1);
            else {
              let p;
              n.decodeBit(this.isRepG1, o) === 0 ? p = u : (n.decodeBit(this.isRepG2, o) === 0 ? p = c : (p = h, h = c), c = u), u = l, l = p;
            }
            x === 0 && (x = 2 + this.repLenDecoder.decode(n, b), o = o < 7 ? 8 : 11);
          } else {
            h = c, c = u, u = l, x = 2 + this.lenDecoder.decode(n, b), o = o < 7 ? 7 : 10;
            let p = this.posSlotDecoder[x < 6 ? x - 2 : 3].decode(n);
            if (p >= 4) {
              let _ = (p >> 1) - 1;
              l = (2 | p & 1) << _ | 0, p < 14 ? l = l + this.reverseDecode(this.posDecoders, l - p - 1, n, _) | 0 : (l = l + (n.decodeDirectBits(_ - 4) << 4 | 0) | 0, l = l + this.alignDecoder.reverseDecode(n) | 0);
            } else l = p;
            if (l >>> 0 === 4294967295) {
              if (r >= 0) throw new Error("LZMA EOS marker with known size");
              break;
            }
          }
          if (r >= 0 && m + x > r) throw new Error("LZMA length overrun");
          if (l < 0 || l >= a || l >= m) throw new Error("LZMA invalid distance");
          for (let p = 0; p < x; p++) this.dictPut(this.dictGet(l)), m++;
        }
      }
      return this.inputConsumed = n.pos, this.out.toBytes();
    }
  };
  var we = class i {
    constructor() {
      this.regions = [];
      this.lowPage = new Uint8Array(4096);
      this.mappedBytesTotal = 0;
      this.last = null;
    }
    map(e, t, r, n, a) {
      if (t <= 0) throw new Error("size must be > 0");
      if (t > 33554432) throw new Error("guest mapping exceeds region limit");
      if (this.mappedBytesTotal + t > 134217728) throw new Error("guest mappings exceed total limit");
      let o = e >>> 0, l = o + t;
      if (l > 4294967296) throw new Error("guest mapping wraps address space");
      for (let c of this.regions) {
        let h = c.start >>> 0, m = h + c.size;
        if (!(l <= h || o >= m)) throw new Error(`guest mapping overlaps @0x${o.toString(16)} size=${t} with @0x${h.toString(16)} size=${c.size}`);
      }
      let u = { start: e | 0, size: t, readable: r, writable: n, executable: a, data: new Uint8Array(t) };
      return this.regions.push(u), this.regions.sort((c, h) => (c.start >>> 0) - (h.start >>> 0)), this.mappedBytesTotal += t, u;
    }
    static contains(e, t, r) {
      return r < 0 || r > e.size ? false : t - e.start >>> 0 <= e.size - r >>> 0;
    }
    find(e, t) {
      if (t < 0) return null;
      let r = this.last;
      if (r !== null && i.contains(r, e, t)) return r;
      for (let n of this.regions) if (i.contains(n, e, t)) return this.last = n, n;
      return null;
    }
    hasRealMapping(e, t) {
      let r = this.last;
      if (r !== null && i.contains(r, e, t)) return true;
      for (let n of this.regions) if (i.contains(n, e, t)) return true;
      return false;
    }
    isMapped(e, t = 1) {
      if (this.hasRealMapping(e, t)) return true;
      let r = e >>> 0;
      return t >= 0 && r + t <= 4096;
    }
    off(e, t) {
      return t - e.start | 0;
    }
    read8(e) {
      let t = this.find(e, 1);
      if (t !== null) {
        if (!t.readable) throw new Error(`Read protect @0x${(e >>> 0).toString(16)}`);
        return t.data[this.off(t, e)];
      }
      let r = e >>> 0;
      if (r < 4096) return this.lowPage[r];
      throw new Error(`Unmapped read @0x${r.toString(16)}`);
    }
    read16(e) {
      let t = this.find(e, 2);
      if (t !== null) {
        if (!t.readable) throw new Error(`Read protect @0x${(e >>> 0).toString(16)}`);
        let r = this.off(t, e);
        return t.data[r] | t.data[r + 1] << 8;
      }
      return this.read8(e) | this.read8(e + 1) << 8;
    }
    read32(e) {
      let t = this.find(e, 4);
      if (t !== null) {
        if (!t.readable) throw new Error(`Read protect @0x${(e >>> 0).toString(16)}`);
        let r = this.off(t, e), n = t.data;
        return n[r] | n[r + 1] << 8 | n[r + 2] << 16 | n[r + 3] << 24 | 0;
      }
      return this.read8(e) | this.read8(e + 1) << 8 | this.read8(e + 2) << 16 | this.read8(e + 3) << 24 | 0;
    }
    write8(e, t, r = false) {
      let n = this.find(e, 1);
      if (n !== null) {
        if (!r && !n.writable) throw new Error(`Write protect @0x${(e >>> 0).toString(16)}`);
        n.data[this.off(n, e)] = t & 255;
        return;
      }
      let a = e >>> 0;
      if (a < 4096) {
        this.lowPage[a] = t & 255;
        return;
      }
      throw new Error(`Unmapped write @0x${a.toString(16)}`);
    }
    write16(e, t, r = false) {
      let n = this.find(e, 2);
      if (n !== null) {
        if (!r && !n.writable) throw new Error(`Write protect @0x${(e >>> 0).toString(16)}`);
        let a = this.off(n, e);
        n.data[a] = t & 255, n.data[a + 1] = t >>> 8 & 255;
        return;
      }
      this.write8(e, t, r), this.write8(e + 1, t >>> 8, r);
    }
    write32(e, t, r = false) {
      let n = this.find(e, 4);
      if (n !== null) {
        if (!r && !n.writable) throw new Error(`Write protect @0x${(e >>> 0).toString(16)}`);
        let a = this.off(n, e), o = n.data;
        o[a] = t & 255, o[a + 1] = t >>> 8 & 255, o[a + 2] = t >>> 16 & 255, o[a + 3] = t >>> 24 & 255;
        return;
      }
      this.write8(e, t, r), this.write8(e + 1, t >>> 8, r), this.write8(e + 2, t >>> 16, r), this.write8(e + 3, t >>> 24, r);
    }
    readBytes(e, t) {
      let r = this.find(e, t);
      if (r !== null) return r.data.subarray(this.off(r, e), this.off(r, e) + t).slice();
      let n = new Uint8Array(t);
      for (let a = 0; a < t; a++) n[a] = this.read8(e + a);
      return n;
    }
    writeBytes(e, t, r = 0, n = t.length - r, a = false) {
      let o = this.find(e, n);
      if (o === null) throw new Error(`Unmapped guest memory @0x${(e >>> 0).toString(16)} size=${n}`);
      if (!a && !o.writable) throw new Error(`Write protection fault @0x${(e >>> 0).toString(16)}`);
      o.data.set(t.subarray(r, r + n), this.off(o, e));
    }
    readCString(e, t = 256) {
      let r = "";
      for (let n = 0; n < t; n++) {
        let a = this.read8(e + n);
        if (a === 0) break;
        r += String.fromCharCode(a);
      }
      return r;
    }
    fillBytes(e, t, r, n = false) {
      if (r <= 0) return;
      let a = this.find(e, r);
      if (a !== null) {
        if (!n && !a.writable) throw new Error(`Write protection fault @0x${(e >>> 0).toString(16)}`);
        a.data.fill(t & 255, this.off(a, e), this.off(a, e) + r);
        return;
      }
      for (let o = 0; o < r; o++) this.write8(e + o, t, n);
    }
    copyBytes(e, t, r, n = false) {
      r <= 0 || this.writeBytes(t, this.readBytes(e, r), 0, r, n);
    }
  };
  function Xe(i, e) {
    return i + e - 1 & -e;
  }
  var mn = 2e7, dn = 8e7, hr = 8e3;
  function Mt(i, e) {
    let t = e & 31, r = i >>> 0;
    return t === 0 ? r : (r >>> t | r << 32 - t) >>> 0;
  }
  var Ke = class {
    constructor(e) {
      this.r = new Int32Array(16);
      this.n = false;
      this.z = false;
      this.c = false;
      this.v = false;
      this.thumb = true;
      this.halted = false;
      this.instructions = 0;
      this.apiCalls = 0;
      this.exitRequested = false;
      this.maxIns = 2e6;
      this.haltAddr = 16842748;
      this.apiBase = 16777216;
      this.apiEnd = 16842748;
      this.onApiCall = null;
      this.fault = null;
      this.unknownCount = 0;
      this.semihostingExitAsReturn = false;
      this.onExit = null;
      this.mem = e;
    }
    reset(e) {
      this.r.fill(0), this.jump(e), this.r[13] = 68157424, this.r[14] = 0, this.halted = false, this.exitRequested = false, this.instructions = 0, this.apiCalls = 0, this.fault = null, this.unknownCount = 0, this.n = this.z = this.c = this.v = false;
    }
    jump(e) {
      this.thumb = (e & 1) === 1, this.r[15] = e & -2 | 0;
    }
    setPc(e) {
      this.r[15] = e & -2 | 0;
    }
    isApi(e) {
      let t = e >>> 0;
      return t >= this.apiBase >>> 0 && t < this.apiEnd >>> 0 && (t & 3) === 0;
    }
    setNZ(e) {
      this.n = (e | 0) < 0, this.z = (e | 0) === 0;
    }
    addWithCarry(e, t, r) {
      let n = (e >>> 0) + (t >>> 0) + (r & 1), a = n | 0;
      return this.c = n > 4294967295, this.v = ((e ^ a) & (t ^ a) | 0) < 0, this.setNZ(a), a;
    }
    subWithCarry(e, t, r) {
      return this.addWithCarry(e, (~t | 0) >>> 0, r & 1);
    }
    arg(e) {
      return e < 4 ? this.r[e] | 0 : this.mem.read32((this.r[13] | 0) + (e - 4 << 2));
    }
    callGuest(e, t, r, n, a = 0) {
      if ((e | 0) === 0) throw new Error("Guest function address is null");
      let o = this.r[15] | 0, l = this.r[14] | 0, u = this.thumb, c = this.halted, h = this.instructions, m = this.fault;
      for (let v = 0; v < 4; v++) this.r[v] = (v < t.length ? t[v] : 0) | 0;
      this.r[14] = this.haltAddr, this.thumb = (e & 1) === 1, this.r[15] = e & -2 | 0, this.halted = false, this.fault = null;
      let b = r >= mn, x = b ? Math.min(dn, r * 4) : r, p = r, _ = 0, d = h;
      for (; !this.halted && !this.exitRequested && ((this.r[15] | 0) & -2) !== (this.haltAddr | 0); ) {
        if (this.instructions - h >= p) {
          if (!b || p >= x) {
            this.fault = { kind: "budget", pc: this.r[15] | 0, word: 0, detail: `callback limit ${p} function=0x${(e >>> 0).toString(16)}` }, this.exitRequested = true;
            break;
          }
          let M = Date.now();
          if (_ === 0) _ = M + hr;
          else if (M >= _) {
            this.fault = { kind: "budget", pc: this.r[15] | 0, word: 0, detail: `callback wall watchdog ${hr}ms after soft limit function=0x${(e >>> 0).toString(16)}` }, this.exitRequested = true;
            break;
          }
          p = Math.min(x, p + r);
          continue;
        }
        if (n && a > 0 && this.instructions - d >= a && (d = this.instructions, n(this))) break;
        this.step();
      }
      let y = this.r[0] | 0;
      return this.exitRequested ? this.instructions === h && !this.fault && (this.fault = m) : (this.r[15] = o, this.r[14] = l, this.thumb = u, this.halted = c, this.fault || (this.fault = m)), y;
    }
    run(e = this.maxIns) {
      for (this.maxIns = e; !this.halted && !this.exitRequested && this.instructions < e; ) this.step();
      !this.halted && !this.exitRequested && !this.fault && (this.fault = { kind: "budget", pc: this.r[15] | 0, word: 0, detail: `maxIns=${e}` }, this.exitRequested = true);
    }
    step() {
      if (this.exitRequested) return false;
      let e = this.r[15] | 0;
      if (e >>> 0 === this.haltAddr >>> 0) return this.exitRequested = true, false;
      if (this.isApi(e)) return (!this.onApiCall || !this.onApiCall(e)) && (this.r[0] = 0), this.apiCalls++, this.instructions++, this.halted || this.jump(this.r[14] | 0), true;
      if (e >= 0 && e < 65536 && !this.mem.hasRealMapping(e & -2, 4)) {
        let t = this.r[14] | 0, r = t & -2 | 0;
        return r >= 0 && r < 65536 && !this.mem.hasRealMapping(r, 4) ? this.halted = true : (this.thumb = (t & 1) === 1, this.r[15] = r), this.instructions++, true;
      }
      try {
        this.thumb ? this.stepThumb(e) : this.stepArm(e);
      } catch (t) {
        return this.fault = { kind: "unmapped", pc: e, word: 0, detail: t instanceof Error ? t.message : String(t) }, this.exitRequested = true, false;
      }
      return this.instructions++, true;
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
          return true;
      }
    }
    fail(e, t, r) {
      this.unknownCount++, this.fault = { kind: "undefined", pc: e, word: t, detail: r }, this.exitRequested = true;
    }
    read32Safe(e, t) {
      try {
        return this.mem.read32(e) | 0;
      } catch (e2) {
        return t;
      }
    }
    semihosting() {
      let e = this.r[0] | 0, t = this.r[1] | 0;
      switch (e) {
        case 1: {
          let r = this.read32Safe(t, 0), n = Math.min(Math.max(this.read32Safe(t + 8, 0), 0), 256), a = "";
          if (r !== 0 && n > 0) try {
            for (let o = 0; o < n; o++) a += String.fromCharCode(this.mem.read8(r + o));
          } catch (e2) {
            a = "";
          }
          this.r[0] = a === ":tt" ? 1 : -1;
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
          let r = this.read32Safe(t, -1), n = Math.max(this.read32Safe(t + 8, 0), 0);
          this.r[0] = r === 1 || r === 2 ? 0 : n;
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
          this.r[0] = Math.floor(Date.now() / 10) & 2147483647 | 0;
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
          } catch (e2) {
          }
          try {
            this.mem.write32(t + 4, 0);
          } catch (e2) {
          }
          this.r[0] = 0;
          return;
        }
        case 24:
        case 32:
          this.semihostingExitAsReturn ? this.halted = true : this.onExit ? this.onExit(0) : this.exitRequested = true, this.r[0] = 0;
          return;
        case 48: {
          let r = Date.now();
          try {
            this.mem.write32(t, r | 0), this.mem.write32(t + 4, Math.floor(r / 4294967296) | 0);
          } catch (e2) {
          }
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
        this.fault = { kind: "align", pc: e, word: 0, detail: "arm-fetch-unaligned" }, this.exitRequested = true;
        return;
      }
      let t = this.mem.read32(e) | 0, r = e + 4 | 0, n = t >>> 28 & 15;
      if (!this.condOk(n)) {
        this.r[15] = r;
        return;
      }
      let a = t >>> 25 & 7;
      if (a === 5) {
        if (n === 15) {
          let u = (t & 16777215) << 8 >> 8, c = e + 8 + (u << 2) + ((t >>> 24 & 1) << 1) | 0;
          this.r[14] = r, this.thumb = true, this.setPc(c);
          return;
        }
        let o = (t & 16777215) << 8 >> 8, l = e + 8 + (o << 2) | 0;
        if ((t >>> 24 & 1) === 0) {
          this.r[15] = l;
          return;
        }
        this.r[14] = r | (this.thumb ? 1 : 0), this.r[15] = l;
        return;
      }
      if (a === 7) {
        if ((t >>> 24 & 15) === 15) {
          if ((t | 0) === -284019626) {
            this.semihosting(), this.r[15] = r;
            return;
          }
          this.fault = { kind: "swi", pc: e, word: t, detail: `swi 0x${(t & 16777215).toString(16)}` }, this.exitRequested = true;
          return;
        }
        this.r[15] = r;
        return;
      }
      if (a === 6) {
        this.r[15] = r;
        return;
      }
      if (a === 4) {
        this.blockArm(e, t, r);
        return;
      }
      if (a === 2 || a === 3) {
        this.ldstArm(e, t, a === 3, r);
        return;
      }
      if (a === 0 || a === 1) {
        this.miscArm(e, t, r);
        return;
      }
      this.fail(e, t, `arm-class${a}`);
    }
    blockArm(e, t, r) {
      let n = t >>> 24 & 1, a = t >>> 23 & 1, o = t >>> 21 & 1, l = t >>> 20 & 1, u = t >>> 16 & 15, c = [];
      for (let _ = 0; _ < 16; _++) t >>> _ & 1 && c.push(_);
      if (c.length === 0) {
        this.r[15] = r;
        return;
      }
      let h = this.r[u] | 0, m = c.length * 4, x = (a === 1 ? n === 1 ? h + 4 : h : n === 1 ? h - m : h - m + 4) | 0;
      if (l) for (let _ of c) {
        let d = this.mem.read32(x);
        _ === 15 ? (this.thumb = (d & 1) === 1, this.r[15] = d & -2 | 0) : this.r[_] = d | 0, x = x + 4 | 0;
      }
      else for (let _ of c) this.mem.write32(x, _ === 15 ? e + 12 & -4 : this.r[_] | 0), x = x + 4 | 0;
      let p = l === 1 && (t >>> u & 1) === 1;
      o === 1 && !p && (this.r[u] = (a === 1 ? h + m : h - m) | 0), l === 1 && (t >>> 15 & 1) === 1 || (this.r[15] = r);
    }
    ldstArm(e, t, r, n) {
      let a = t >>> 24 & 1, o = t >>> 23 & 1, l = t >>> 22 & 1, u = t >>> 21 & 1, c = t >>> 20 & 1, h = t >>> 16 & 15, m = t >>> 12 & 15, b;
      r ? b = this.decodeShiftedRegister(e, t & 4095).v >>> 0 : b = t & 4095;
      let x = (o === 1 ? b : -b) | 0, p = h === 15 ? e + 8 | 0 : this.r[h] | 0, _ = (a === 1 ? p + x | 0 : p) | 0;
      if ((a === 0 || u === 1) && (this.r[h] = p + x | 0), c) {
        let d = l ? this.mem.read8(_) : this.mem.read32(_);
        if (m === 15) {
          this.thumb = (d & 1) === 1, this.setPc(d);
          return;
        }
        this.r[m] = d | 0;
      } else l ? this.mem.write8(_, this.r[m]) : this.mem.write32(_, m === 15 ? e + 12 & -4 : this.r[m]);
      this.r[15] = n;
    }
    dataProcessing(e, t, r) {
      let n = t >>> 21 & 15, a = (t & 1048576) !== 0, o = t >>> 16 & 15, l = t >>> 12 & 15, u = { n: this.n, z: this.z, c: this.c, v: this.v }, c = this.c, h = o === 15 ? e + 8 | 0 : this.r[o] | 0, m = this.operand2(e, t), b = m.v;
      m.c !== null && (this.c = m.c);
      let x = c ? 1 : 0, p = 0, _ = true;
      switch (n) {
        case 0:
          p = h & b | 0, this.setNZ(p);
          break;
        case 1:
          p = h ^ b | 0, this.setNZ(p);
          break;
        case 2:
          p = this.subWithCarry(h, b, 1);
          break;
        case 3:
          p = this.subWithCarry(b, h, 1);
          break;
        case 4:
          p = this.addWithCarry(h, b, 0);
          break;
        case 5:
          p = this.addWithCarry(h, b, x);
          break;
        case 6:
          p = this.subWithCarry(h, b, x ? 0 : 1);
          break;
        case 7:
          p = this.subWithCarry(b, h, x ? 0 : 1);
          break;
        case 8:
          p = h & b | 0, this.setNZ(p), _ = false;
          break;
        case 9:
          p = h ^ b | 0, this.setNZ(p), _ = false;
          break;
        case 10:
          p = this.subWithCarry(h, b, 1), _ = false;
          break;
        case 11:
          p = this.addWithCarry(h, b, 0), _ = false;
          break;
        case 12:
          p = h | b | 0, this.setNZ(p);
          break;
        case 13:
          p = b | 0, this.setNZ(p);
          break;
        case 14:
          p = h & ~b | 0, this.setNZ(p);
          break;
        default:
          p = ~b | 0, this.setNZ(p);
          break;
      }
      if (a || (this.n = u.n, this.z = u.z, this.c = u.c, this.v = u.v), !_) {
        this.r[15] = r;
        return;
      }
      if (l === 15) {
        this.r[15] = p & -4 | 0;
        return;
      }
      this.r[l] = p | 0, this.r[15] = r;
    }
    miscArm(e, t, r) {
      let n = t >>> 16 & 15, a = t >>> 12 & 15, o = t >>> 8 & 15, l = t & 15, u = t >>> 4 & 15;
      if ((t & 268435440) === 19922704) {
        this.jump(this.r[l] | 0);
        return;
      }
      if ((t & 268435440) === 19922736) {
        this.r[14] = r | (this.thumb ? 1 : 0), this.jump(this.r[l] | 0);
        return;
      }
      if ((t & 263254016) === 16838656) {
        this.r[n] = this.cpsr() | 0, this.r[15] = r;
        return;
      }
      if ((t & 263254016) === 18935808 || (t & 263254016) === 52490240) {
        let p = (t & 33554432) !== 0, _;
        if (p) {
          let d = (t >>> 8 & 15) * 2;
          _ = d === 0 ? t & 255 : Mt(t & 255, d) | 0;
        } else _ = this.r[l] | 0;
        this.setCpsr(_, n), this.r[15] = r;
        return;
      }
      if ((t & 268374e3) === 24055568) {
        let p = this.r[l] | 0;
        this.r[a] = (p === 0 ? 32 : Math.clz32(p)) | 0, this.r[15] = r;
        return;
      }
      if ((t & 33554432) !== 0) {
        this.dataProcessing(e, t, r);
        return;
      }
      {
        let p = t & 267387024;
        if (p === 16777344 || p === 20971648 || p === 23068800 || p === 18874496) {
          let _ = (S, T) => (T ? S >> 16 : S << 16 >> 16) | 0, d = t & 15, y = t >>> 8 & 15, v = (t & 32) !== 0, M = (t & 64) !== 0;
          if (p === 16777344) {
            let S = t >>> 16 & 15, T = t >>> 12 & 15;
            this.r[S] = _(this.r[d], v) * _(this.r[y], M) + (this.r[T] | 0) | 0;
          } else if (p === 20971648) {
            let S = t >>> 16 & 15, T = t >>> 12 & 15, __rr = __mulS64(_(this.r[d], v), _(this.r[y], M)), __lo = (this.r[T] >>> 0) + __rr[1], __hi = (this.r[S] | 0) + __rr[0] + (__lo >= 4294967296 ? 1 : 0);
            this.r[T] = __lo | 0, this.r[S] = __hi | 0;
          } else if (p === 23068800) {
            let S = t >>> 16 & 15;
            this.r[S] = _(this.r[d], v) * _(this.r[y], M) | 0;
          } else {
            let S = t >>> 16 & 15, T = t >>> 12 & 15, __p = __mulS64(this.r[d] | 0, _(this.r[y], M)), E = __p[1] >>> 16 | __p[0] << 16 | 0;
            this.r[S] = (t & 32) !== 0 ? E : E + (this.r[T] | 0) | 0;
          }
          this.r[15] = r;
          return;
        }
      }
      let c = t >>> 24 & 1, h = t >>> 23 & 1, m = t >>> 22 & 1, b = t >>> 21 & 1, x = t >>> 20 & 1;
      if (u === 9) {
        if (c === 1) {
          let R = this.r[n] | 0, E = m === 1 ? this.mem.read8(R) : this.mem.read32(R);
          m === 1 ? this.mem.write8(R, this.r[l]) : this.mem.write32(R, this.r[l]), this.r[a] = E | 0, this.r[15] = r;
          return;
        }
        let p = t >>> 21 & 7;
        if (p <= 1) {
          let R = Math.imul(this.r[l] | 0, this.r[o] | 0) | 0, E = p === 1 ? R + (this.r[a] | 0) | 0 : R;
          n === 15 ? this.r[15] = E & -4 | 0 : this.r[n] = E | 0, x === 1 && this.setNZ(E), this.r[15] = r;
          return;
        }
        if (p < 4) {
          this.fail(e, t, "arm-mul-undefined");
          return;
        }
        let _ = (p & 2) !== 0, d = (p & 1) !== 0, __m = __mulS64(_ ? this.r[l] | 0 : this.r[l] >>> 0, _ ? this.r[o] | 0 : this.r[o] >>> 0), S = __m[1] >>> 0, T = __m[0] >>> 0;
        if (d) {
          let R = (this.r[a] >>> 0) + S;
          S = R >>> 0, T = (this.r[n] >>> 0) + T + (R > 4294967295 ? 1 : 0) >>> 0;
        }
        this.r[a] = S | 0, this.r[n] = T | 0, x === 1 && (this.n = (T | 0) < 0, this.z = S === 0 && T === 0), this.r[15] = r;
        return;
      }
      if ((u & 9) === 9) {
        let p = t >>> 5 & 3, _ = m === 1 ? (t >>> 8 & 15) << 4 | t & 15 : this.r[l] | 0, d = n === 15 ? e + 8 | 0 : this.r[n] | 0, y = (h === 1 ? _ : -_) | 0, v = (c === 1 ? d + y | 0 : d) | 0;
        if (n !== 15 && (c === 0 ? this.r[n] = d + y | 0 : b === 1 && (this.r[n] = v | 0)), x) {
          let M;
          if (p === 1 ? M = this.mem.read16(v) : p === 2 ? M = this.mem.read8(v) << 24 >> 24 : p === 3 ? M = this.mem.read16(v) << 16 >> 16 : M = 0, a === 15) {
            this.thumb = (M & 1) === 1, this.setPc(M);
            return;
          }
          this.r[a] = M | 0;
        } else if (p === 1) this.mem.write16(v, this.r[a]);
        else if (p === 2 || p === 3) {
          if (a >= 15) {
            this.fail(e, t, p === 2 ? "LDRD invalid Rd" : "STRD invalid Rd");
            return;
          }
          p === 2 ? (this.r[a] = this.mem.read32(v) | 0, this.r[a + 1] = this.mem.read32(v + 4) | 0) : (this.mem.write32(v, this.r[a]), this.mem.write32(v + 4, this.r[a + 1]));
        } else {
          this.fail(e, t, "arm-half-undefined");
          return;
        }
        this.r[15] = r;
        return;
      }
      if ((t & 16) === 0 || (u & 8) === 0) {
        this.dataProcessing(e, t, r);
        return;
      }
      this.fail(e, t, "arm-undefined");
    }
    cpsr() {
      return (this.n ? 2147483648 : 0) | (this.z ? 1073741824 : 0) | (this.c ? 536870912 : 0) | (this.v ? 268435456 : 0) | (this.thumb ? 32 : 0) | 0;
    }
    setCpsr(e, t) {
      (t & 8) !== 0 && (this.n = (e & 2147483648) !== 0), (t & 4) !== 0 && (this.z = (e & 1073741824) !== 0), (t & 2) !== 0 && (this.c = (e & 536870912) !== 0), (t & 1) !== 0 && (this.v = (e & 268435456) !== 0);
    }
    barrel(e, t, r, n) {
      let a = e >>> 0;
      switch (!n && (t === 1 || t === 2) && r === 0 && (r = 32), t) {
        case 0:
          return r === 0 ? { v: e | 0, c: null } : r >= 32 ? { v: 0, c: r === 32 ? (a & 1) !== 0 : false } : { v: a << r | 0, c: (a >>> 32 - r & 1) !== 0 };
        case 1:
          return r === 0 ? { v: e | 0, c: null } : r >= 32 ? { v: 0, c: r === 32 ? a >>> 31 !== 0 : false } : { v: a >>> r | 0, c: (a >>> r - 1 & 1) !== 0 };
        case 2:
          return r === 0 ? { v: e | 0, c: null } : r >= 32 ? { v: (a | 0) >> 31, c: a >>> 31 !== 0 } : { v: (a | 0) >> r, c: (a >>> r - 1 & 1) !== 0 };
        default: {
          if (!n && r === 0) return { v: (this.c ? 1 : 0) << 31 | a >>> 1 | 0, c: (a & 1) !== 0 };
          let o = r & 31;
          return o === 0 ? { v: e | 0, c: null } : { v: Mt(a, o) | 0, c: (a >>> o - 1 & 1) !== 0 };
        }
      }
    }
    operand2(e, t) {
      if ((t & 33554432) !== 0) {
        let r = (t >>> 8 & 15) * 2, n = t & 255;
        if (r === 0) return { v: n, c: null };
        let a = Mt(n, r);
        return { v: a | 0, c: a >>> 31 !== 0 };
      }
      return this.decodeShiftedRegister(e, t & 4095);
    }
    decodeShiftedRegister(e, t) {
      let r = t & 15, n = r === 15 ? e + 8 | 0 : this.r[r] | 0, a = t >>> 5 & 3;
      if ((t & 16) === 0) return this.barrel(n, a, t >>> 7 & 31, false);
      let o = t >>> 8 & 15, l = o === 15 ? e + 8 | 0 : this.r[o] | 0;
      return this.barrel(n, a, l & 255, true);
    }
    stepThumb(e) {
      if ((e & 1) !== 0) {
        this.fault = { kind: "align", pc: e, word: 0, detail: "thumb-fetch-odd" }, this.exitRequested = true;
        return;
      }
      let t = this.mem.read16(e), r = this.r, n = e + 2 | 0;
      if ((t & 63488) <= 4096) {
        let a = t >>> 11 & 3, o = t >>> 6 & 31, l = this.barrel(r[t >>> 3 & 7] | 0, a, a === 0 ? o : o === 0 ? 32 : o, false);
        r[t & 7] = l.v | 0, l.c !== null && (this.c = l.c), this.setNZ(l.v), r[15] = n;
        return;
      }
      if ((t & 63488) === 6144) {
        let a = t >>> 9 & 1, o = t >>> 6 & 7, l = t >>> 3 & 7, u = t & 7, c = (t >>> 10 & 1) === 1 ? o : r[o] | 0;
        r[u] = a === 1 ? this.subWithCarry(r[l] | 0, c, 1) : this.addWithCarry(r[l] | 0, c, 0), r[15] = n;
        return;
      }
      if ((t & 57344) === 8192) {
        let a = t >>> 11 & 3, o = t >>> 8 & 7, l = t & 255;
        a === 0 ? (r[o] = l, this.setNZ(l)) : a === 1 ? this.subWithCarry(r[o] | 0, l, 1) : a === 2 ? r[o] = this.addWithCarry(r[o] | 0, l, 0) : r[o] = this.subWithCarry(r[o] | 0, l, 1), r[15] = n;
        return;
      }
      if ((t & 64512) === 16384) {
        this.aluThumb(t, n);
        return;
      }
      if ((t & 64512) === 17408) {
        let a = t >>> 8 & 3, o = t >>> 7 & 1, l = t >>> 3 & 15, u = o << 3 | t & 7, c = e + 4 | 0, h = l === 15 ? c : r[l] | 0, m = u === 15 ? c : r[u] | 0, b = { n: this.n, z: this.z, c: this.c, v: this.v };
        if (a === 0) {
          let x = this.addWithCarry(m, h, 0);
          if (u === 15) {
            this.thumb = true, this.r[15] = x & -2 | 0;
            return;
          }
          r[u] = x, r[15] = n;
        } else if (a === 1) {
          this.subWithCarry(m, h, 1), r[15] = n;
          return;
        } else if (a === 2) {
          if (u === 15) {
            this.thumb = true, this.r[15] = h & -2 | 0;
            return;
          }
          r[u] = h, r[15] = n;
        } else {
          o === 1 && (this.r[14] = n | 1), this.jump(h);
          return;
        }
        this.n = b.n, this.z = b.z, this.c = b.c, this.v = b.v;
        return;
      }
      if ((t & 63488) === 18432) {
        r[t >>> 8 & 7] = this.mem.read32((e & -3) + 4 + ((t & 255) << 2) | 0) | 0, r[15] = n;
        return;
      }
      if ((t & 61440) === 20480) {
        let a = t >>> 9 & 7, o = (r[t >>> 3 & 7] | 0) + (r[t >>> 6 & 7] | 0) | 0;
        this.memAccess(t & 7, a, o, n);
        return;
      }
      if ((t & 57344) === 24576) {
        let a = t >>> 11 & 3, o = [0, 4, 2, 6], l = (r[t >>> 3 & 7] | 0) + (t >>> 6 & 31) * (a >= 2 ? 1 : 4) | 0;
        this.memAccess(t & 7, o[a], l, n);
        return;
      }
      if ((t & 61440) === 32768) {
        let a = (r[t >>> 3 & 7] | 0) + (t >>> 6 & 31) * 2 | 0;
        this.memAccess(t & 7, (t >>> 11 & 1) === 1 ? 5 : 1, a, n);
        return;
      }
      if ((t & 61440) === 36864) {
        let a = t >>> 8 & 7, o = (r[13] | 0) + ((t & 255) << 2) | 0;
        (t >>> 11 & 1) === 1 ? r[a] = this.mem.read32(o) | 0 : this.mem.write32(o, r[a]), r[15] = n;
        return;
      }
      if ((t & 61440) === 40960) {
        let a = (t >>> 11 & 1) === 1 ? r[13] | 0 : (e & -3) + 4 | 0;
        r[t >>> 8 & 7] = a + ((t & 255) << 2) | 0, r[15] = n;
        return;
      }
      if ((t & 65280) === 45056) {
        let a = (t & 127) << 2;
        r[13] = ((t >>> 7 & 1) === 1 ? (r[13] | 0) - a : (r[13] | 0) + a) | 0, r[15] = n;
        return;
      }
      if ((t & 65280) === 48640) {
        this.fault = { kind: "breakpoint", pc: e, word: t, detail: `bkpt #${t & 255}` }, this.exitRequested = true;
        return;
      }
      if ((t & 65024) === 46080 || (t & 65024) === 48128) {
        this.pushPop(t) || (r[15] = n);
        return;
      }
      if ((t & 61440) === 49152) {
        let a = (t >>> 11 & 1) === 1, o = t >>> 8 & 7, l = t & 255, u = r[o] | 0;
        for (let c = 0; c < 8; c++) (l >>> c & 1) !== 0 && (a ? r[c] = this.mem.read32(u) : this.mem.write32(u, r[c]), u = u + 4 | 0);
        l !== 0 && !(a && (l >>> o & 1) === 1) && (r[o] = u | 0), r[15] = n;
        return;
      }
      if ((t & 61440) === 53248) {
        let a = t >>> 8 & 15;
        if (a === 15) {
          if ((t & 255) === 171) {
            this.semihosting(), r[15] = n;
            return;
          }
          this.fault = { kind: "swi", pc: e, word: t, detail: `svc #${t & 255}` }, this.exitRequested = true;
          return;
        }
        if (a === 14) {
          this.fail(e, t, "thumb-undefined-branch");
          return;
        }
        let o = (t & 255) << 24 >> 23;
        r[15] = this.condOk(a) ? e + 4 + o & -2 | 0 : n;
        return;
      }
      if ((t & 63488) === 57344) {
        let a = (t & 2047) << 21 >> 20;
        r[15] = e + 4 + a & -2 | 0;
        return;
      }
      if ((t & 63488) === 61440) {
        let a = this.mem.read16(e + 2 | 0), o = a >>> 11 & 31, l = o === 29;
        if (o !== 31 && !l) {
          this.fail(e, a, "thumb-bl-second-word");
          return;
        }
        let u = ((t & 2047) << 12 | (a & 2047) << 1) << 9 >> 9;
        r[14] = e + 4 | 1, this.thumb = !l, r[15] = l ? e + 4 + u & -4 | 0 : e + 4 + u & -2 | 0;
        return;
      }
      this.fail(e, t, "thumb-undefined");
    }
    aluThumb(e, t) {
      let r = this.r, n = e >>> 6 & 15, a = e >>> 3 & 7, o = e & 7, l = r[o] | 0, u = r[a] | 0, c;
      switch (n) {
        case 0:
          c = l & u | 0, this.setNZ(c), r[o] = c;
          break;
        case 1:
          c = l ^ u | 0, this.setNZ(c), r[o] = c;
          break;
        case 2:
        case 3:
        case 4:
        case 7: {
          let h = this.barrel(l, n === 2 ? 0 : n === 3 ? 1 : n === 4 ? 2 : 3, u & 255, true);
          h.c !== null && (this.c = h.c), c = h.v | 0, this.setNZ(c), r[o] = c;
          break;
        }
        case 5:
          r[o] = this.addWithCarry(l, u, this.c ? 1 : 0);
          break;
        case 6:
          r[o] = this.subWithCarry(l, u, this.c ? 1 : 0);
          break;
        case 8:
          c = l & u | 0, this.setNZ(c);
          break;
        case 9:
          r[o] = this.subWithCarry(0, u, 1);
          break;
        case 10:
          this.subWithCarry(l, u, 1);
          break;
        case 11:
          this.addWithCarry(l, u, 0);
          break;
        case 12:
          c = l | u | 0, this.setNZ(c), r[o] = c;
          break;
        case 13:
          c = Math.imul(l, u) | 0, this.setNZ(c), this.c = false, r[o] = c;
          break;
        case 14:
          c = l & ~u | 0, this.setNZ(c), r[o] = c;
          break;
        default:
          c = ~u | 0, this.setNZ(c), r[o] = c;
          break;
      }
      r[15] = t;
    }
    memAccess(e, t, r, n) {
      let a = this.r;
      switch (t) {
        case 0:
          this.mem.write32(r, a[e]);
          break;
        case 1:
          this.mem.write16(r, a[e]);
          break;
        case 2:
          this.mem.write8(r, a[e]);
          break;
        case 3:
          a[e] = this.mem.read8(r) << 24 >> 24;
          break;
        case 4:
        case 5: {
          let o = t === 4 ? this.mem.read32(r) : this.mem.read16(r);
          if (e === 15) {
            this.thumb = (o & 1) === 1, this.setPc(o);
            return;
          }
          a[e] = o | 0;
          break;
        }
        case 6:
          a[e] = this.mem.read8(r);
          break;
        default:
          a[e] = this.mem.read16(r) << 16 >> 16;
          break;
      }
      a[15] = n;
    }
    pushPop(e) {
      let t = this.r, r = (e >>> 11 & 1) === 1, n = (e >>> 8 & 1) === 1, a = e & 255;
      if (!r) {
        let l = t[13] | 0;
        n && (l = l - 4 | 0, this.mem.write32(l, t[14]));
        for (let u = 7; u >= 0; u--) (a >>> u & 1) === 1 && (l = l - 4 | 0, this.mem.write32(l, t[u]));
        return t[13] = l | 0, false;
      }
      let o = t[13] | 0;
      for (let l = 0; l < 8; l++) (a >>> l & 1) !== 0 && (t[l] = this.mem.read32(o), o = o + 4 | 0);
      if (n) {
        let l = this.mem.read32(o);
        return t[13] = o + 4 | 0, this.thumb = (l & 1) === 1, t[15] = l & -2 | 0, true;
      }
      return t[13] = o | 0, false;
    }
  };
  var mr = { " ": [0, 0, 0, 0, 0, 0, 0], "!": [4, 4, 4, 4, 4, 0, 4], '"': [10, 10, 0, 0, 0, 0, 0], "#": [10, 10, 31, 10, 31, 10, 10], $: [4, 15, 20, 14, 5, 30, 4], "%": [25, 26, 2, 4, 8, 19, 25], "&": [12, 18, 20, 8, 21, 18, 13], "'": [4, 4, 0, 0, 0, 0, 0], "(": [2, 4, 4, 4, 4, 4, 2], ")": [8, 4, 4, 4, 4, 4, 8], "*": [4, 21, 4, 21, 4, 0, 0], "+": [0, 4, 4, 31, 4, 4, 0], ",": [0, 0, 0, 0, 0, 12, 8], "-": [0, 0, 0, 31, 0, 0, 0], ".": [0, 0, 0, 0, 0, 12, 12], "/": [1, 2, 4, 8, 16, 0, 0], ":": [0, 12, 12, 0, 12, 12, 0], ";": [0, 12, 12, 0, 12, 8, 0], "<": [2, 4, 8, 16, 8, 4, 2], "=": [0, 0, 31, 0, 31, 0, 0], ">": [8, 4, 2, 1, 2, 4, 8], "?": [14, 17, 1, 6, 4, 0, 4], "@": [14, 17, 23, 21, 23, 16, 14], "[": [14, 16, 16, 16, 16, 16, 14], "\\": [16, 8, 4, 2, 1, 0, 0], "]": [7, 1, 1, 1, 1, 1, 7], "^": [4, 10, 17, 0, 0, 0, 0], _: [0, 0, 0, 0, 0, 0, 31], "`": [8, 4, 2, 0, 0, 0, 0], "{": [6, 8, 8, 16, 8, 8, 6], "|": [4, 4, 4, 4, 4, 4, 4], "}": [12, 2, 2, 1, 2, 2, 12], "~": [0, 0, 8, 25, 2, 0, 0], 0: [14, 17, 19, 21, 25, 17, 14], 1: [4, 12, 4, 4, 4, 4, 14], 2: [14, 17, 1, 2, 4, 8, 31], 3: [30, 1, 1, 14, 1, 1, 30], 4: [2, 6, 10, 18, 31, 2, 2], 5: [31, 16, 16, 30, 1, 1, 30], 6: [14, 16, 16, 30, 17, 17, 14], 7: [31, 1, 2, 4, 8, 8, 8], 8: [14, 17, 17, 14, 17, 17, 14], 9: [14, 17, 17, 15, 1, 1, 14], A: [14, 17, 17, 31, 17, 17, 17], B: [30, 17, 17, 30, 17, 17, 30], C: [14, 17, 16, 16, 16, 17, 14], D: [30, 17, 17, 17, 17, 17, 30], E: [31, 16, 16, 30, 16, 16, 31], F: [31, 16, 16, 30, 16, 16, 16], G: [14, 17, 16, 23, 17, 17, 15], H: [17, 17, 17, 31, 17, 17, 17], I: [14, 4, 4, 4, 4, 4, 14], J: [7, 2, 2, 2, 18, 18, 12], K: [17, 18, 20, 24, 20, 18, 17], L: [16, 16, 16, 16, 16, 16, 31], M: [17, 27, 21, 21, 17, 17, 17], N: [17, 25, 21, 19, 17, 17, 17], O: [14, 17, 17, 17, 17, 17, 14], P: [30, 17, 17, 30, 16, 16, 16], Q: [14, 17, 17, 17, 21, 18, 13], R: [30, 17, 17, 30, 20, 18, 17], S: [15, 16, 16, 14, 1, 1, 30], T: [31, 4, 4, 4, 4, 4, 4], U: [17, 17, 17, 17, 17, 17, 14], V: [17, 17, 17, 17, 17, 10, 4], W: [17, 17, 17, 17, 21, 27, 17], X: [17, 17, 10, 4, 10, 17, 17], Y: [17, 17, 10, 4, 4, 4, 4], Z: [31, 1, 2, 4, 8, 16, 31] }, pn = [31, 17, 17, 17, 17, 17, 31];
  function Le(i, e, t) {
    return i < e ? e : i > t ? t : i;
  }
  var Ye = class i {
    constructor() {
      this.fontId = 0;
      this.explicitSize = 0;
    }
    setFont(e) {
      this.fontId = e & 255, this.explicitSize = 0;
    }
    setFontSize(e) {
      this.explicitSize = Le(e, 0, 64);
    }
    currentFontId() {
      return this.fontId;
    }
    scale() {
      if (this.explicitSize > 0) return Le(Math.floor((this.explicitSize + 7) / 8), 1, 8);
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
          return Le(Math.floor((Le(this.fontId, 8, 32) + 7) / 8), 1, 4);
      }
    }
    measure(e) {
      let t = this.scale();
      return e.length === 0 ? [0, 8 * t] : [e.length * 6 * t, 8 * t];
    }
    charWidth(e) {
      return 6 * this.scale();
    }
    height() {
      return 8 * this.scale();
    }
    scaleFor(e) {
      return e <= 0 ? this.scale() : Le(Math.floor((e + 7) / 8), 1, 8);
    }
    baseline(e) {
      return 7 * this.scaleFor(e);
    }
    inkWidth(e) {
      return 5 * this.scaleFor(e);
    }
    cellHeight(e) {
      return 8 * this.scaleFor(e);
    }
    advance(e) {
      return 6 * this.scaleFor(e);
    }
    rasterize(e, t = Number.MAX_SAFE_INTEGER) {
      let r = this.scale(), n = Math.max(e.length * 6 * r, 1), a = Math.min(n, Math.max(t, 1)), o = 8 * r, l = new Int32Array(a * o), u = 0;
      for (let c = 0; c < e.length && !(u >= a); c++) {
        let h = i.glyph(e.charCodeAt(c));
        for (let m = 0; m < 7; m++) {
          let b = h[m];
          for (let x = 0; x < 5; x++) if ((b & 1 << 4 - x) !== 0) for (let p = 0; p < r; p++) for (let _ = 0; _ < r; _++) {
            let d = u + x * r + _, y = m * r + p;
            d >= 0 && d < a && y >= 0 && y < o && (l[y * a + d] = 255);
          }
        }
        u += 6 * r;
      }
      return { width: a, height: o, baseline: 7 * r, alpha: l };
    }
    static glyph(e) {
      var _a;
      let t = String.fromCharCode(e).toUpperCase();
      return e < 32 || e === 127 ? mr[" "] : (_a = mr[t]) != null ? _a : pn;
    }
  };
  function St(i) {
    return i < 0 ? 0 : i > 255 ? 255 : i | 0;
  }
  function $(i, e, t) {
    let r = St(i), n = St(e), a = St(t), o = (r * 31 + 127) / 255 | 0, l = (n * 63 + 127) / 255 | 0, u = (a * 31 + 127) / 255 | 0;
    return (o << 11 | l << 5 | u) & 65535;
  }
  function Ie(i) {
    let e = i & 65535, t = e >>> 11 & 31, r = e >>> 5 & 63, n = e & 31;
    return [t << 3 | t >>> 2, r << 2 | r >>> 4, n << 3 | n >>> 2];
  }
  function j(i) {
    return ((i < 0 ? 0 : i > 65535 ? 65535 : i) * 255 + 32767) / 65535 | 0;
  }
  function qe(i, e, t) {
    let r = t < 0 ? 0 : t > 255 ? 255 : t | 0;
    if (r <= 0) return i & 65535;
    if (r >= 255) return e & 65535;
    let n = 255 - r, [a, o, l] = Ie(e), [u, c, h] = Ie(i);
    return $((a * r + u * n + 127) / 255 | 0, (o * r + c * n + 127) / 255 | 0, (l * r + h * n + 127) / 255 | 0);
  }
  function br(i) {
    var _a, _b;
    return (_b = (_a = En(i)) != null ? _a : Sn(i)) != null ? _b : Bn(i);
  }
  var gn = [{ x0: 0, y0: 0, dx: 1, dy: 1 }], _n = [{ x0: 0, y0: 0, dx: 8, dy: 8 }, { x0: 4, y0: 0, dx: 8, dy: 8 }, { x0: 0, y0: 4, dx: 4, dy: 8 }, { x0: 2, y0: 0, dx: 4, dy: 4 }, { x0: 0, y0: 2, dx: 2, dy: 4 }, { x0: 1, y0: 0, dx: 2, dy: 2 }, { x0: 0, y0: 1, dx: 1, dy: 2 }];
  function je(i, e, t) {
    return i <= e ? 0 : Math.floor((i - e + t - 1) / t);
  }
  function xn(i, e, t) {
    let r = i + e - t, n = Math.abs(r - i), a = Math.abs(r - e), o = Math.abs(r - t);
    return n <= a && n <= o ? i : a <= o ? e : t;
  }
  function dr(i, e, t, r) {
    if (r === 8) return i[e + t];
    if (r !== 1 && r !== 2 && r !== 4) throw new Error(`sample depth ${r}`);
    let n = 8 / r, a = i[e + Math.floor(t / n)], o = (n - 1 - t % n) * r;
    return a >>> o & (1 << r) - 1;
  }
  function yn(i, e) {
    switch (e) {
      case 1:
        return i === 0 ? 0 : 255;
      case 2:
        return i * 85;
      case 4:
        return i * 17;
      case 8:
        return i;
      case 16:
        return j(i);
      default:
        throw new Error(`sample depth ${e}`);
    }
  }
  function vn(i, e, t, r, n, a, o) {
    let l = (u, c) => (c & 255) << 16 | u & 65535;
    switch (n) {
      case 3: {
        let u = dr(i, e, t, r), c = a !== null && u < a.length ? a[u] : 0, h = o !== null && u < o.length ? o[u] : 255;
        return l(c, h);
      }
      case 0: {
        let u = r === 16 ? K(i, e + t * 2) : dr(i, e, t, r), c = yn(u, r), h = o !== null && o.length >= 2 ? K(o, 0) : -1;
        return l($(c, c, c), u === h ? 0 : 255);
      }
      case 2: {
        let u, c, h, m, b, x;
        if (r === 16) {
          let _ = e + t * 6;
          u = K(i, _), c = K(i, _ + 2), h = K(i, _ + 4), m = j(u), b = j(c), x = j(h);
        } else {
          let _ = e + t * 3;
          u = i[_], c = i[_ + 1], h = i[_ + 2], m = u, b = c, x = h;
        }
        let p = o !== null && o.length >= 6 && u === K(o, 0) && c === K(o, 2) && h === K(o, 4);
        return l($(m, b, x), p ? 0 : 255);
      }
      case 4: {
        if (r === 16) {
          let c = e + t * 4;
          return l($(j(K(i, c)), j(K(i, c)), j(K(i, c))), j(K(i, c + 2)));
        }
        let u = e + t * 2;
        return l($(i[u], i[u], i[u]), i[u + 1]);
      }
      case 6: {
        if (r === 16) {
          let c = e + t * 8;
          return l($(j(K(i, c)), j(K(i, c + 2)), j(K(i, c + 4))), j(K(i, c + 6)));
        }
        let u = e + t * 4;
        return l($(i[u], i[u + 1], i[u + 2]), i[u + 3]);
      }
      default:
        throw new Error(`PNG color type ${n}`);
    }
  }
  function wn(i, e, t, r, n) {
    let a = new Uint8Array(t * r), o = e, l = -1;
    for (let u = 0; u < t; u++) {
      let c = i[o++], h = u * r;
      for (let m = 0; m < r; m++) {
        let b = i[o++], x = m >= n ? a[h + m - n] : 0, p = l >= 0 ? a[l + m] : 0, _ = l >= 0 && m >= n ? a[l + m - n] : 0, d;
        switch (c) {
          case 0:
            d = b;
            break;
          case 1:
            d = b + x;
            break;
          case 2:
            d = b + p;
            break;
          case 3:
            d = b + (x + p >>> 1);
            break;
          case 4:
            d = b + xn(x, p, _);
            break;
          default:
            throw new Error(`PNG filter ${c}`);
        }
        a[h + m] = d & 255;
      }
      l = h;
    }
    return a;
  }
  function An(i) {
    let e = [63519, 2016, 31, 0, 65535, 65504, 2047];
    for (let t of e) if (i[t] === 0) return t;
    for (let t = 0; t <= 65535; t++) if (i[t] === 0) return t;
    return 63519;
  }
  function En(i) {
    try {
      return Mn(i);
    } catch (e) {
      return null;
    }
  }
  function Mn(i) {
    let e = [137, 80, 78, 71, 13, 10, 26, 10];
    if (i.length < 33) throw new Error("Not PNG");
    for (let E = 0; E < 8; E++) if (i[E] !== e[E]) throw new Error("Not PNG");
    let t = 8, r = null, n = null, a = null, o = [], l = 0;
    e: for (; t + 12 <= i.length; ) {
      let E = Rt(i, t);
      if (t += 4, E < 0 || t + 4 + E + 4 > i.length) throw new Error("Bad PNG chunk");
      let B = String.fromCharCode(i[t], i[t + 1], i[t + 2], i[t + 3]);
      t += 4;
      let L = t;
      switch (B) {
        case "IHDR": {
          if (E !== 13) throw new Error("IHDR len");
          let P = Rt(i, L), I = Rt(i, L + 4);
          if (i[L + 10] !== 0) throw new Error("Unsupported PNG compression");
          if (i[L + 11] !== 0) throw new Error("Unsupported PNG filter method");
          r = { width: P, height: I, bitDepth: i[L + 8], colorType: i[L + 9], interlace: i[L + 12] };
          break;
        }
        case "PLTE": {
          if (E % 3 !== 0) throw new Error("PLTE len");
          n = new Uint16Array(E / 3);
          for (let P = 0; P < n.length; P++) n[P] = $(i[L + P * 3], i[L + P * 3 + 1], i[L + P * 3 + 2]);
          break;
        }
        case "tRNS":
          a = i.slice(L, L + E);
          break;
        case "IDAT": {
          if (l + E > 33554432) throw new Error("PNG IDAT exceeds compressed-data safety limit");
          o.push(i.slice(L, L + E)), l += E;
          break;
        }
        case "IEND":
          break e;
      }
      t += E + 4;
    }
    let u = r;
    if (u === null) throw new Error("PNG missing IHDR");
    if (!(u.width >= 1 && u.width <= 4096 && u.height >= 1 && u.height <= 4096)) throw new Error("PNG size");
    if (u.width * u.height > 4194304) throw new Error("PNG pixel count exceeds safety limit");
    if (u.interlace !== 0 && u.interlace !== 1) throw new Error(`PNG interlace=${u.interlace}`);
    let c = u.colorType === 0 ? 1 : u.colorType === 2 ? 3 : u.colorType === 3 ? 1 : u.colorType === 4 ? 2 : u.colorType === 6 ? 4 : -1;
    if (c < 0) throw new Error(`PNG color type ${u.colorType}`);
    if (!(u.colorType === 3 ? u.bitDepth === 1 || u.bitDepth === 2 || u.bitDepth === 4 || u.bitDepth === 8 : u.colorType === 0 ? u.bitDepth === 1 || u.bitDepth === 2 || u.bitDepth === 4 || u.bitDepth === 8 || u.bitDepth === 16 : u.bitDepth === 8 || u.bitDepth === 16)) throw new Error(`PNG bit depth ${u.bitDepth} type=${u.colorType}`);
    if (u.colorType === 3 && n === null) throw new Error("Indexed PNG missing PLTE");
    let m = u.interlace === 0 ? gn : _n, b = 0;
    for (let E of m) {
      let B = je(u.width, E.x0, E.dx), L = je(u.height, E.y0, E.dy);
      if (B <= 0 || L <= 0) continue;
      let P = Math.floor((B * c * u.bitDepth + 7) / 8);
      if (b += L * (P + 1), b > 67108864) throw new Error("PNG inflated scanlines exceed safety limit");
    }
    let x = new Uint8Array(l), p = 0;
    for (let E of o) x.set(E, p), p += E.length;
    let _ = Ze(x, 0, b);
    if (_ === null || _.bytes.length !== b) throw new Error(`PNG inflated size != expected ${b}`);
    let d = _.bytes, y = new Uint16Array(u.width * u.height), v = { plane: null }, M = (E, B, L, P) => {
      let I = B * u.width + E;
      y[I] = L & 65535, P !== 255 && (v.plane === null && (v.plane = new Uint8Array(y.length).fill(255)), v.plane[I] = P < 0 ? 0 : P > 255 ? 255 : P);
    }, S = 0;
    for (let E of m) {
      let B = je(u.width, E.x0, E.dx), L = je(u.height, E.y0, E.dy);
      if (B <= 0 || L <= 0) continue;
      let P = Math.floor((B * c * u.bitDepth + 7) / 8), I = Math.max(1, Math.floor((c * u.bitDepth + 7) / 8)), D = L * (P + 1);
      if (S + D > d.length) throw new Error("PNG data short pass");
      let z = wn(d, S, L, P, I);
      S += D;
      for (let Z = 0; Z < L; Z++) {
        let ge = E.y0 + Z * E.dy, ne = Z * P;
        for (let _e = 0; _e < B; _e++) {
          let De = E.x0 + _e * E.dx, Ce = vn(z, ne, _e, u.bitDepth, u.colorType, n, a);
          M(De, ge, Ce & 65535, Ce >>> 16 & 255);
        }
      }
    }
    let T = -1, R = v.plane;
    if (R !== null && R.includes(0)) {
      let E = new Uint8Array(65536);
      for (let B = 0; B < y.length; B++) R[B] !== 0 && (E[y[B]] = 1);
      T = An(E);
      for (let B = 0; B < y.length; B++) R[B] === 0 && (y[B] = T);
    }
    return { width: u.width, height: u.height, pixels: y, alpha: R, transparentColor565: T };
  }
  function Sn(i) {
    if (i.length < 13) return null;
    let e = String.fromCharCode(i[0], i[1], i[2], i[3], i[4], i[5]);
    if (e !== "GIF87a" && e !== "GIF89a") return null;
    let t = 6, r = ee(i, t);
    t += 2;
    let n = ee(i, t);
    if (t += 2, r <= 0 || n <= 0 || r > 4096 || n > 4096 || r * n > 4194304) return null;
    let a = i[t++], o = (a & 128) !== 0, l = 1 << (a & 7) + 1;
    t += 2;
    let u = o ? pr(i, t, l) : null;
    if (o && u === null) return null;
    o && (t += l * 3);
    let c = -1;
    for (; t < i.length; ) {
      let h = i[t++];
      if (h === 59) return null;
      if (h === 33) {
        if (t >= i.length) return null;
        if (i[t++] === 249) {
          if (t >= i.length) return null;
          let D = i[t++];
          if (D < 4 || t + D > i.length || (c = (i[t] & 1) !== 0 ? i[t + 3] : -1, t += D, t >= i.length || i[t++] !== 0)) return null;
        } else {
          let D = kn(i, t);
          if (D === null) return null;
          t = D;
        }
        continue;
      }
      if (h === 0) continue;
      if (h !== 44 || t + 9 > i.length) return null;
      let m = ee(i, t);
      t += 2;
      let b = ee(i, t);
      t += 2;
      let x = ee(i, t);
      t += 2;
      let p = ee(i, t);
      t += 2;
      let _ = i[t++];
      if (x <= 0 || p <= 0 || m < 0 || b < 0 || m + x > r || b + p > n) return null;
      let d = (_ & 128) !== 0, y = (_ & 64) !== 0, v = 1 << (_ & 7) + 1, M = d ? pr(i, t, v) : u;
      if (M === null || (d && (t += v * 3), t >= i.length)) return null;
      let S = i[t++];
      if (S < 2 || S > 8) return null;
      let T = Rn(i, t);
      if (T === null) return null;
      let R = Cn(T, S, x * p);
      if (R === null) return null;
      let E = new Uint16Array(r * n), B = c >= 0 ? new Uint8Array(r * n) : null, L = 0, P = (I) => {
        if (I < 0 || I >= p) return;
        let D = (b + I) * r + m;
        for (let z = 0; z < x; z++) {
          if (L >= R.length) return;
          let Z = R[L++], ge = Z < M.length ? M[Z] : 0, ne = D + z;
          E[ne] = Qe(ge), B !== null && (B[ne] = Z === c ? 0 : 255);
        }
      };
      if (y) {
        for (let I = 0; I < p; I += 8) P(I);
        for (let I = 4; I < p; I += 8) P(I);
        for (let I = 2; I < p; I += 4) P(I);
        for (let I = 1; I < p; I += 2) P(I);
      } else for (let I = 0; I < p; I++) P(I);
      if (L < x * p) for (; L < x * p; ) {
        let I = (b + Math.floor(L / x)) * r + m + L % x;
        I >= 0 && I < E.length && (E[I] = Qe(M.length > 0 ? M[0] : 0)), L++;
      }
      return B !== null && !B.includes(0) && (B = null), { width: r, height: n, pixels: E, alpha: B, transparentColor565: -1 };
    }
    return null;
  }
  function Cn(i, e, t) {
    let r = 1 << e, n = r + 1, a = new Int32Array(4096), o = new Uint8Array(4096), l = new Uint8Array(4097);
    for (let d = 0; d < r; d++) a[d] = -1, o[d] = d;
    let u = e + 1, c = n + 1, h = 0, m = -1, b = 0, x = new Uint8Array(t), p = 0, _ = (d) => {
      if (h + d > i.length * 8) return -1;
      let y = 0;
      for (let v = 0; v < d; v++) {
        let M = i[h + v >>> 3];
        y |= (M >>> (h + v & 7) & 1) << v;
      }
      return h += d, y;
    };
    for (; p < t; ) {
      let d = _(u);
      if (d < 0) break;
      if (d === r) {
        u = e + 1, c = n + 1, m = -1;
        continue;
      }
      if (d === n) break;
      if (m < 0) {
        if (d >= r) return null;
        x[p++] = o[d], b = o[d], m = d;
        continue;
      }
      let y = d, v = d, M = 0;
      if (v >= c) {
        if (v !== c) return null;
        l[M++] = b, v = m;
      }
      let S = 0;
      for (; v >= r; ) {
        if (v >= 4096 || S++ > 4096) return null;
        l[M++] = o[v], v = a[v];
      }
      if (v < 0 || v >= r) return null;
      for (b = o[v], l[M++] = b; M > 0 && p < t; ) x[p++] = l[--M];
      c < 4096 && (a[c] = m, o[c] = b, c++, c === 1 << u && u < 12 && u++), m = y;
    }
    return p === t ? x : null;
  }
  function pr(i, e, t) {
    if (e < 0 || t <= 0 || e + t * 3 > i.length) return null;
    let r = new Int32Array(t), n = e;
    for (let a = 0; a < t; a++) {
      let o = i[n++], l = i[n++], u = i[n++];
      r[a] = o << 16 | l << 8 | u;
    }
    return r;
  }
  function Rn(i, e) {
    let t = e, r = 0, n = [];
    for (; ; ) {
      if (t >= i.length) return null;
      let l = i[t++];
      if (l === 0) break;
      if (t + l > i.length || r > 33554432 - l) return null;
      n.push([t, l]), r += l, t += l;
    }
    let a = new Uint8Array(r), o = 0;
    for (let [l, u] of n) a.set(i.subarray(l, l + u), o), o += u;
    return a;
  }
  function kn(i, e) {
    let t = e;
    for (; ; ) {
      if (t >= i.length) return null;
      let r = i[t++];
      if (r === 0) return t;
      if (t + r > i.length) return null;
      t += r;
    }
  }
  function Bn(i) {
    try {
      return Tn(i);
    } catch (e) {
      return null;
    }
  }
  function Tn(i) {
    if (i.length < 26 || i[0] !== 66 || i[1] !== 77) return null;
    let e = Ct(i, 14), t, r, n, a, o, l = Ct(i, 10);
    if (e === 12) t = ee(i, 18), r = ee(i, 20), n = ee(i, 22), a = ee(i, 24), o = 0;
    else if (e >= 40) t = kt(i, 18), r = kt(i, 22), n = ee(i, 26), a = ee(i, 28), o = Ct(i, 30);
    else return null;
    if (n !== 1 || o !== 0 && !(a === 8 && o === 1) || t <= 0 || t > 4096) return null;
    let u = Math.abs(r);
    if (u <= 0 || u > 4096 || t * u > 4194304 || a !== 1 && a !== 4 && a !== 8 && a !== 24 && a !== 32) return null;
    let c = a === 1 ? 2 : a === 4 ? 16 : a === 8 ? 256 : 0, h = 14 + e, m = Math.floor((t * a + 31) / 32) * 4, b = r > 0, x = new Uint16Array(t * u);
    if (c > 0) {
      let p = e === 12 ? 3 : 4;
      if (i.length < h + c * p) return null;
      let _ = new Int32Array(c);
      for (let d = 0; d < c; d++) {
        let y = h + d * p;
        _[d] = i[y + 2] << 16 | i[y + 1] << 8 | i[y];
      }
      if (l < 0 || l + m * u > i.length) return null;
      for (let d = 0; d < u; d++) {
        let y = b ? u - 1 - d : d, v = l + y * m, M = d * t;
        for (let S = 0; S < t; S++) {
          let T;
          if (a === 8) T = i[v + S];
          else if (a === 4) {
            let R = i[v + Math.floor(S / 2)];
            T = (S & 1) === 0 ? R >>> 4 : R & 15;
          } else T = i[v + Math.floor(S / 8)] >>> 7 - (S & 7) & 1;
          x[M + S] = Qe(T < c ? _[T] : 0);
        }
      }
    } else {
      let p = a / 8;
      if (l < 0 || l + m * u > i.length) return null;
      for (let _ = 0; _ < u; _++) {
        let d = b ? u - 1 - _ : _, y = l + d * m, v = _ * t;
        for (let M = 0; M < t; M++) {
          let S = y + M * p;
          x[v + M] = Qe(i[S + 2] << 16 | i[S + 1] << 8 | i[S]);
        }
      }
    }
    return { width: t, height: u, pixels: x, alpha: null, transparentColor565: -1 };
  }
  function Qe(i) {
    return $(i >>> 16 & 255, i >>> 8 & 255, i & 255);
  }
  function ee(i, e) {
    return i[e] | i[e + 1] << 8;
  }
  function kt(i, e) {
    return i[e] | i[e + 1] << 8 | i[e + 2] << 16 | i[e + 3] << 24 | 0;
  }
  function Ct(i, e) {
    return kt(i, e) >>> 0;
  }
  function K(i, e) {
    return i[e] << 8 | i[e + 1];
  }
  function Rt(i, e) {
    return i[e] << 24 | i[e + 1] << 16 | i[e + 2] << 8 | i[e + 3] | 0;
  }
  var Je = 1610612736, et = 8 * 1024 * 1024, O = -1, Tt = 0, Ln = 48, gr = 32, tt = class {
    constructor(e, t, r) {
      this.fb565 = undefined;
      this.layers = /* @__PURE__ */ new Map();
      this.surfacesByAddr = /* @__PURE__ */ new Map();
      this.surfacesByHandle = /* @__PURE__ */ new Map();
      this.active = O;
      this.pendingBlt = null;
      this.nextHandle = 1;
      this.arenaTop = Je;
      this.freeArenaBlocks = [];
      this.decodedImageCache = /* @__PURE__ */ new Map();
      this.dirty = false;
      this.flushCount = 0;
      this.currentColor = 65535;
      this.text = new Ye();
      this.screenLayerHandle = O;
      this.mem = e;
      this.sw = t;
      this.sh = r;
      this.fb565 = new Uint16Array(t * r), e.map(Je, et, true, true, false);
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
      let t = e + 3 & -4;
      if (t <= 0) throw new Error("graphics arena exhausted");
      let r = -1, n = Number.MAX_SAFE_INTEGER;
      for (let l = 0; l < this.freeArenaBlocks.length; l++) {
        let u = this.freeArenaBlocks[l];
        u.bytes >= t && u.bytes < n && (r = l, n = u.bytes);
      }
      if (r >= 0) return this.freeArenaBlocks.splice(r, 1)[0].addr;
      let a = this.arenaTop, o = a + t;
      if (o - Je > et) throw new Error("graphics arena exhausted");
      return this.arenaTop = o, a;
    }
    releaseBytes(e, t) {
      t <= 0 || e < Je || this.freeArenaBlocks.push({ addr: e, bytes: t });
    }
    createLayer(e, t, r, n, a = -1, o = -1) {
      if (r <= 0 || n <= 0 || r > 4096 || n > 4096 || r * n * 2 > et) return O;
      let l = r * n * 2 + 3 & -4, u = o < 0, c = u ? this.allocBytes(l) : o, h = this.nextHandle++, m = { handle: h, x: e, y: t, w: r, h: n, buf: c, transparentColor: a, clip: { x: 0, y: 0, w: r, h: n }, bytes: u ? l : 0, opacity: 100 };
      return this.layers.set(h, m), this.surfacesByAddr.set(c, m), this.active === O && (this.active = h), h;
    }
    createCanvas(e, t, r = -1) {
      if (e <= 0 || t <= 0 || (e * t + 16) * 2 > et) return O;
      let n = gr + e * t * 2 + 3 & -4, a = this.allocBytes(n), o = { buf: a + gr, w: e, h: t, transparentColor: r, clip: null, bytes: n, header: a, alpha: null };
      return this.surfacesByHandle.set(a, o), this.surfacesByAddr.set(a, o), this.surfacesByAddr.set(o.buf, o), a;
    }
    releaseCanvas(e) {
      var _a, _b, _c, _d, _e;
      let t = (_a = this.surfacesByHandle.get(e)) != null ? _a : this.surfacesByAddr.get(e);
      return t ? (this.surfacesByHandle.delete((_b = t.header) != null ? _b : t.buf), this.surfacesByAddr.delete((_c = t.header) != null ? _c : t.buf), this.surfacesByAddr.delete(t.buf), this.releaseBytes((_d = t.header) != null ? _d : t.buf, (_e = t.bytes) != null ? _e : 0), 0) : -1;
    }
    deleteLayer(e) {
      let t = this.layers.get(e);
      return t ? (this.layers.delete(e), this.surfacesByAddr.delete(t.buf), this.releaseBytes(t.buf, t.bytes), this.screenLayerHandle === e && (this.screenLayerHandle = O), this.active === e && (this.active = this.layers.size > 0 ? this.layers.keys().next().value : O), 0) : -1;
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
      if (e === Tt) {
        let r = this.drawTarget(), n = this.layers.get(r);
        if (n) return n.buf;
      }
      return 0;
    }
    activeLayer(e) {
      return e !== O && !this.layers.has(e) ? O : (this.active = e, 0);
    }
    drawTarget() {
      return this.layers.has(this.active) ? this.active : this.screenLayerHandle;
    }
    ensureScreenLayer() {
      if (this.screenLayerHandle !== O) return this.screenLayerHandle;
      let e = this.active;
      if (this.layers.has(e)) return this.screenLayerHandle = e, this.screenLayerHandle;
      let t = this.createLayer(0, 0, this.sw, this.sh, -1);
      return t !== O && (this.screenLayerHandle = t, e === O && (this.active = O)), t;
    }
    screenBufferAddress() {
      let e = this.layers.get(this.screenLayerHandle);
      return e ? e.buf : 0;
    }
    resolveLayerHandle(e) {
      return e === 0 || e === -1 || e === O ? this.drawTarget() : e;
    }
    canvasBuffer(e) {
      var _a, _b;
      let t = (_a = this.surfacesByHandle.get(e)) != null ? _a : this.surfacesByAddr.get(e);
      return t ? (_b = t.header) != null ? _b : t.buf : 0;
    }
    loadImage(e) {
      let t = this.decodeCached(e);
      if (t === null) return 0;
      let r = this.createCanvas(t.width, t.height);
      if (r === O) return 0;
      let n = this.surfacesByHandle.get(r);
      return n ? (this.uploadRgb565(n.buf, t.pixels), t.transparentColor565 >= 0 && (n.transparentColor = t.transparentColor565), n.alpha = t.alpha !== null ? t.alpha.slice() : null, r) : 0;
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
      var _a;
      let t = (_a = this.surfacesByHandle.get(e)) != null ? _a : this.surfacesByAddr.get(e);
      if (t) return t.w;
      let r = this.layers.get(e);
      return r ? r.w : 0;
    }
    imageHeight(e) {
      var _a;
      let t = (_a = this.surfacesByHandle.get(e)) != null ? _a : this.surfacesByAddr.get(e);
      if (t) return t.h;
      let r = this.layers.get(e);
      return r ? r.h : 0;
    }
    setCanvasTransparentColor(e, t) {
      var _a;
      let r = (_a = this.surfacesByHandle.get(e)) != null ? _a : this.surfacesByAddr.get(e);
      return r ? (r.transparentColor = t < 0 ? -1 : t & 65535, r.alpha = null, 0) : -1;
    }
    canvasFrameCount(e) {
      let t = this.surfacesByAddr.get(e);
      return t !== void 0 && t.clip === null ? 1 : 0;
    }
    drawImageFromMemory(e, t, r, n) {
      if (n.length === 0) return -1;
      let a = this.loadImage(n);
      if (a === 0) return -1;
      try {
        let o = this.surfacesByHandle.get(a);
        return o ? this.blt(e, t, r, o.buf, 0, 0, o.w, o.h, 0) : -1;
      } finally {
        this.releaseImage(a);
      }
    }
    decodeCached(e) {
      if (e.length === 0) return null;
      let t = In(e), r = this.decodedImageCache.get(t);
      if (r !== void 0) return this.decodedImageCache.delete(t), this.decodedImageCache.set(t, r), r;
      let n = br(e);
      if (n === null) return null;
      if (this.decodedImageCache.set(t, n), this.decodedImageCache.size > Ln) {
        let a = this.decodedImageCache.keys().next();
        a.done || this.decodedImageCache.delete(a.value);
      }
      return n;
    }
    uploadRgb565(e, t) {
      if (t.length === 0) return;
      let r = t.length * 2, n = this.mem.find(e, r);
      if (n !== null) {
        let o = new DataView(n.data.buffer, n.data.byteOffset + (e - n.start | 0), r);
        for (let l = 0; l < t.length; l++) o.setUint16(l * 2, t[l], true);
        return;
      }
      let a = e;
      for (let o = 0; o < t.length; o++) this.mem.write16(a, t[o], true), a += 2;
    }
    surface(e) {
      var _a, _b, _c;
      if (e === 0 || e === -1 || e === O) return (_a = this.layers.get(this.drawTarget())) != null ? _a : null;
      let t = this.surfacesByAddr.get(e);
      return t || ((_c = (_b = this.surfacesByHandle.get(e)) != null ? _b : this.layers.get(e)) != null ? _c : null);
    }
    setPixelOnSurface(e, t, r, n) {
      let a = this.surface(e);
      if (a === null || t < 0 || r < 0 || t >= a.w || r >= a.h) return -1;
      let o = a.clip;
      return o !== null && (t < o.x || r < o.y || t >= o.x + o.w || r >= o.y + o.h) || (this.mem.write16(a.buf + (r * a.w + t) * 2, n & 65535), this.dirty = true), 0;
    }
    getPixelFromSurface(e, t, r) {
      let n = this.surface(e);
      return n === null || t < 0 || r < 0 || t >= n.w || r >= n.h ? 0 : this.mem.read16(n.buf + (r * n.w + t) * 2) & 65535;
    }
    clearLayerBg(e) {
      let t = this.layers.get(e);
      if (!t) return -1;
      let r = t.transparentColor >= 0 ? t.transparentColor & 65535 : 0, n = t.w * t.h, a = n * 2, o = this.mem.find(t.buf, a);
      if (o !== null) {
        let l = new DataView(o.data.buffer, o.data.byteOffset + (t.buf - o.start | 0), a);
        for (let u = 0; u < n; u++) l.setUint16(u * 2, r, true);
      } else {
        let l = t.buf;
        for (let u = 0; u < n; u++) this.mem.write16(l, r), l += 2;
      }
      return this.dirty = true, 0;
    }
    blt(e, t, r, n, a, o, l, u, c = 0) {
      var _a, _b;
      let h = this.surface(e), m = this.surface(n);
      if (!h || !m || l <= 0 || u <= 0) return -1;
      let b = (_a = h.clip) != null ? _a : { x: 0, y: 0, w: h.w, h: h.h }, x = Math.max(0, -o, -r, b.y - r), p = Math.min(u, m.h - o, h.h - r, b.y + b.h - r), _ = Math.max(0, -a, -t, b.x - t), d = Math.min(l, m.w - a, h.w - t, b.x + b.w - t);
      if (x >= p || _ >= d) return 0;
      let y = m.transparentColor, v = (_b = m.alpha) != null ? _b : null, M = m.buf === h.buf, S = (d - _) * 2;
      if (!M && v === null && y < 0) {
        let E = this.mem.find(m.buf, m.w * m.h * 2), B = this.mem.find(h.buf, h.w * h.h * 2);
        if (E !== null && B !== null) {
          let L = E.data, P = B.data, I = m.buf - E.start | 0, D = h.buf - B.start | 0;
          for (let z = x; z < p; z++) {
            let Z = I + ((o + z) * m.w + a + _) * 2;
            P.set(L.subarray(Z, Z + S), D + ((r + z) * h.w + t + _) * 2);
          }
          return 0;
        }
      }
      let T = M && r < o + (p - x) && o < r + (p - x), R = [];
      for (let E = x; E < p; E++) R.push(E);
      T && r > o && R.reverse();
      for (let E of R) {
        let B = (o + E) * m.w, L = (r + E) * h.w;
        for (let P = _; P < d; P++) {
          let I = B + a + P, D = this.mem.read16(m.buf + I * 2), z = v !== null ? v[I] : 255;
          if (v !== null) {
            if (z === 0) continue;
          } else if (y >= 0 && D === (y & 65535)) continue;
          let Z = h.buf + (L + t + P) * 2;
          this.mem.write16(Z, z >= 255 ? D : qe(this.mem.read16(Z), D, z), true);
        }
      }
      return 0;
    }
    fillRect(e, t, r, n, a, o) {
      var _a;
      let l = this.surface(e);
      if (!l || n <= 0 || a <= 0) return -1;
      let u = (_a = l.clip) != null ? _a : { x: 0, y: 0, w: l.w, h: l.h }, c = Math.max(t, 0, u.x), h = Math.max(r, 0, u.y), m = Math.min(l.w, t + n, u.x + u.w), b = Math.min(l.h, r + a, u.y + u.h), x = o & 65535;
      for (let p = h; p < b; p++) {
        let _ = l.buf + (p * l.w + c) * 2;
        for (let d = c; d < m; d++) this.mem.write16(_ + (d - c) * 2, x, true);
      }
      return 0;
    }
    cleanSurface(e, t) {
      let r = this.surface(e);
      if (!r) return -1;
      let n = r.w * r.h, a = n * 2, o = t & 65535, l = this.mem.find(r.buf, a);
      if (l !== null) {
        let u = new DataView(l.data.buffer, l.data.byteOffset + (r.buf - l.start | 0), a);
        for (let c = 0; c < n; c++) u.setUint16(c * 2, o, true);
      } else {
        let u = r.buf;
        for (let c = 0; c < n; c++) this.mem.write16(u, o, true), u += 2;
      }
      return this.dirty = true, 0;
    }
    gradientPaintRect(e, t, r, n, a, o, l, u) {
      var _a;
      let c = this.surface(e);
      if (!c) return -1;
      let h = (_a = c.clip) != null ? _a : { x: 0, y: 0, w: c.w, h: c.h }, m = Math.max(Math.min(t, n), 0, h.x), b = Math.max(Math.min(r, a), 0, h.y), x = Math.min(Math.max(t, n), c.w - 1, h.x + h.w - 1), p = Math.min(Math.max(r, a), c.h - 1, h.y + h.h - 1);
      if (m > x || b > p) return 0;
      let _ = Ie(o & 65535), d = Ie(l & 65535), y = Math.max(x - m, 1), v = Math.max(p - b, 1);
      for (let M = b; M <= p; M++) {
        let S = c.buf + (M * c.w + m) * 2;
        for (let T = m; T <= x; T++) {
          let R = T - m, E = M - b, B = (u & 7) === 0 ? R / y : (u & 7) === 1 ? E / v : (u & 7) === 2 ? (R + E) / (y + v) : (u & 7) === 3 ? (y - R + E) / (y + v) : Math.max(Math.abs(R - y / 2), Math.abs(E - v / 2)) / Math.max(y, v) / 2;
          B >= 0 ? B > 1 && (B = 1) : B = 0, this.mem.write16(S + (T - m) * 2, $(_[0] + (d[0] - _[0]) * B, _[1] + (d[1] - _[1]) * B, _[2] + (d[2] - _[2]) * B), true);
        }
      }
      return this.dirty = true, 0;
    }
    drawRoundRectBuffer(e, t, r, n, a, o, l = this.currentColor) {
      var _a;
      if (n <= 0 || a <= 0) return 0;
      let u = this.surface(e);
      if (!u) return -1;
      let c = Math.min(Math.max(o, 0), Math.min(n, a) >> 1);
      if (c === 0) return this.drawRectBuffer(e, t, r, n, a, l);
      let h = (_a = u.clip) != null ? _a : { x: 0, y: 0, w: u.w, h: u.h }, m = l & 65535, b = (_, d) => {
        _ < h.x || d < h.y || _ >= h.x + h.w || d >= h.y + h.h || _ < 0 || d < 0 || _ >= u.w || d >= u.h || this.mem.write16(u.buf + (d * u.w + _) * 2, m, true);
      };
      for (let _ = t + c; _ < t + n - c; _++) b(_, r), b(_, r + a - 1);
      for (let _ = r + c; _ < r + a - c; _++) b(t, _), b(t + n - 1, _);
      let x = c * c, p = (c - 1) * (c - 1);
      for (let _ = 1; _ <= c; _++) for (let d = 1; d <= c; d++) {
        let y = d * d + _ * _;
        y > x || y <= p || (b(t + c - d, r + c - _), b(t + n - 1 - c + d, r + c - _), b(t + c - d, r + a - 1 - c + _), b(t + n - 1 - c + d, r + a - 1 - c + _));
      }
      return 0;
    }
    fillRoundRectBuffer(e, t, r, n, a, o, l = this.currentColor) {
      var _a;
      if (n <= 0 || a <= 0) return 0;
      let u = this.surface(e);
      if (!u) return -1;
      let c = Math.min(Math.max(o, 0), Math.min(n, a) >> 1);
      if (c === 0) return this.fillRect(e, t, r, n, a, l);
      let h = (_a = u.clip) != null ? _a : { x: 0, y: 0, w: u.w, h: u.h }, m = Math.min(t + n, h.x + h.w), b = Math.min(r + a, h.y + h.h), x = l & 65535, p = c * c;
      for (let _ = Math.max(r, h.y); _ < b; _++) for (let d = Math.max(t, h.x); d < m; d++) {
        if (d < 0 || _ < 0 || d >= u.w || _ >= u.h) continue;
        let y = d < t + c ? t + c - d : d >= t + n - c ? d - (t + n - 1 - c) : 0, v = _ < r + c ? r + c - _ : _ >= r + a - c ? _ - (r + a - 1 - c) : 0;
        y > 0 && v > 0 && y * y + v * v > p || this.mem.write16(u.buf + (_ * u.w + d) * 2, x, true);
      }
      return 0;
    }
    fillEllipseBuffer(e, t, r, n, a, o = this.currentColor) {
      var _a;
      if (n <= 0 || a <= 0) return 0;
      let l = this.surface(e);
      if (!l) return -1;
      let u = (_a = l.clip) != null ? _a : { x: 0, y: 0, w: l.w, h: l.h }, c = o & 65535, h = n / 2, m = a / 2;
      for (let b = Math.max(r, u.y, 0); b <= Math.min(r + a - 1, u.y + u.h - 1, l.h - 1); b++) {
        let x = b + 0.5 - (r + m);
        for (let p = Math.max(t, u.x, 0); p <= Math.min(t + n - 1, u.x + u.w - 1, l.w - 1); p++) {
          let _ = p + 0.5 - (t + h);
          _ * _ / (h * h) + x * x / (m * m) > 1 || this.mem.write16(l.buf + (b * l.w + p) * 2, c, true);
        }
      }
      return 0;
    }
    setClip(e, t, r, n) {
      let a = this.layers.get(this.drawTarget());
      if (!a) return -1;
      if (r <= e || n <= t) return a.clip = { x: 0, y: 0, w: a.w, h: a.h }, 0;
      let o = Math.min(Math.max(e, 0), a.w - 1), l = Math.min(Math.max(t, 0), a.h - 1);
      return a.clip = { x: o, y: l, w: Math.min(Math.max(r - o + 1, 1), a.w - o), h: Math.min(Math.max(n - l + 1, 1), a.h - l) }, 0;
    }
    resetClip() {
      let e = this.layers.get(this.drawTarget());
      return e ? (e.clip = { x: 0, y: 0, w: e.w, h: e.h }, 0) : -1;
    }
    setLayerClip(e, t, r, n, a) {
      let o = this.layers.get(this.resolveLayerHandle(e));
      if (!o) return -1;
      if (n <= t || a <= r) return o.clip = { x: 0, y: 0, w: o.w, h: o.h }, 0;
      let l = Math.min(Math.max(t, 0), o.w - 1), u = Math.min(Math.max(r, 0), o.h - 1);
      return o.clip = { x: l, y: u, w: Math.min(Math.max(n - l + 1, 1), o.w - l), h: Math.min(Math.max(a - u + 1, 1), o.h - u) }, 0;
    }
    resetLayerClip(e) {
      let t = this.layers.get(this.resolveLayerHandle(e));
      return t ? (t.clip = { x: 0, y: 0, w: t.w, h: t.h }, 0) : -1;
    }
    setLayerTransColor(e, t) {
      let r = this.layers.get(this.resolveLayerHandle(e));
      return r ? (r.transparentColor = t, 0) : -1;
    }
    setLayerOpacity(e, t) {
      let r = this.layers.get(this.resolveLayerHandle(e));
      return r ? (r.opacity = Math.min(Math.max(t, 0), 100), 0) : -1;
    }
    setFont(e) {
      return this.text.setFont(e), 0;
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
      let e = this.text.cellHeight(0), t = this.text.baseline(0);
      return { dwidth: this.text.advance(0), width: this.text.inkWidth(0), height: e, ascent: t, descent: e - t };
    }
    stringWidth(e) {
      return this.text.measure(e)[0];
    }
    stringHeight(e) {
      return e.length === 0 ? this.text.height() : this.text.measure(e)[1];
    }
    drawTextBuffer(e, t, r, n, a = Number.MAX_SAFE_INTEGER, o = this.currentColor) {
      let l = this.surface(e);
      return l ? this.drawTextSurface(l, t, r, n, a, o) : -1;
    }
    drawTextLayer(e, t, r, n, a = Number.MAX_SAFE_INTEGER, o = this.currentColor) {
      let l = this.layers.get(this.resolveLayerHandle(e));
      return l ? this.drawTextSurface(l, t, r, n, a, o) : -1;
    }
    drawTextOnTarget(e, t, r, n = this.currentColor) {
      let a = this.drawTarget();
      return this.drawTextLayer(a !== O ? a : this.ensureScreenLayer(), e, t, r, Number.MAX_SAFE_INTEGER, n);
    }
    drawTextSurface(e, t, r, n, a, o) {
      var _a;
      if (n.length === 0) return 0;
      let l = (_a = e.clip) != null ? _a : { x: 0, y: 0, w: e.w, h: e.h }, u = this.text.rasterize(n, a), c = r - (u.baseline * 2 / 3 | 0), h = c < l.y ? r : c, m = l.y + l.h - h, b = u.height > m && m >= (u.height / 2 | 0) ? m : u.height, x = o & 65535, p = l.y + l.h, _ = l.x + l.w;
      for (let d = 0; d < b; d++) {
        let y = d * u.height / b | 0, v = h + d;
        if (v < 0 || v >= e.h || v < l.y || v >= p) continue;
        let M = e.buf + v * e.w * 2, S = y * u.width;
        for (let T = 0; T < u.width; T++) {
          let R = u.alpha[S + T];
          if (R === 0) continue;
          let E = t + T;
          if (E < 0 || E >= e.w || E < l.x || E >= _) continue;
          let B = M + E * 2;
          R >= 248 ? this.mem.write16(B, x, true) : this.mem.write16(B, qe(this.mem.read16(B), x, R), true);
        }
      }
      return 0;
    }
    fillPolygonOnSurface(e, t, r, n) {
      var _a;
      let a = this.surface(e);
      if (!a) return -1;
      let o = Math.min(t.length, r.length);
      if (o < 3) return 0;
      let l = (_a = a.clip) != null ? _a : { x: 0, y: 0, w: a.w, h: a.h }, u = Number.MAX_SAFE_INTEGER, c = Number.MIN_SAFE_INTEGER;
      for (let x = 0; x < o; x++) r[x] < u && (u = r[x]), r[x] > c && (c = r[x]);
      let h = Math.max(u, l.y), m = Math.min(c, l.y + l.h - 1, a.h - 1), b = n & 65535;
      for (let x = h; x <= m; x++) {
        let p = x + 0.5, _ = [];
        for (let d = 0; d < o; d++) {
          let y = (d + 1) % o, v = r[d], M = r[y];
          if (v <= p && M > p || M <= p && v > p) {
            let S = t[d], T = t[y];
            _.push(S + (p - v) / (M - v) * (T - S));
          }
        }
        _.sort((d, y) => d - y);
        for (let d = 0; d + 1 < _.length; d += 2) {
          let y = Math.max(_[d] | 0, l.x, 0), v = Math.min(_[d + 1] | 0, l.x + l.w, a.w);
          if (y < v) {
            let M = a.buf + (x * a.w + y) * 2;
            for (let S = y; S < v; S++) this.mem.write16(M + (S - y) * 2, b, true);
          }
        }
      }
      return 0;
    }
    strokePolygonOnSurface(e, t, r, n) {
      let a = Math.min(t.length, r.length);
      if (a < 2) return 0;
      for (let o = 0; o < a; o++) {
        let l = (o + 1) % a;
        this.drawLineBuffer(e, t[o], r[o], t[l], r[l], n);
      }
      return 0;
    }
    drawRectBuffer(e, t, r, n, a, o = this.currentColor) {
      return n <= 0 || a <= 0 || (this.fillRect(e, t, r, n, 1, o), this.fillRect(e, t, r + a - 1, n, 1, o), this.fillRect(e, t, r, 1, a, o), this.fillRect(e, t + n - 1, r, 1, a, o)), 0;
    }
    drawLineBuffer(e, t, r, n, a, o = this.currentColor) {
      if (e === 0 || e === -1 || e === O) return this.drawLine(t, r, n, a, o);
      let l = this.surface(e);
      return l ? this.drawLineOnSurface(l, t, r, n, a, o) : -1;
    }
    drawLine(e, t, r, n, a = this.currentColor) {
      let o = this.layers.get(this.drawTarget());
      return o ? this.drawLineOnSurface(o, e, t, r, n, a) : -1;
    }
    drawLineOnSurface(e, t, r, n, a, o) {
      var _a;
      let l = t, u = r, c = n, h = a, m = Math.abs(c - l), b = l < c ? 1 : -1, x = -Math.abs(h - u), p = u < h ? 1 : -1, _ = m + x, d = (_a = e.clip) != null ? _a : { x: 0, y: 0, w: e.w, h: e.h }, y = o & 65535;
      for (; l >= d.x && u >= d.y && l < d.x + d.w && u < d.y + d.h && l >= 0 && u >= 0 && l < e.w && u < e.h && this.mem.write16(e.buf + (u * e.w + l) * 2, y, true), !(l === c && u === h); ) {
        let v = 2 * _;
        v >= x && (_ += x, l += b), v <= m && (_ += m, u += p);
      }
      return 0;
    }
    flushLayers(e) {
      for (let t of e) this.flushLayer(t);
      return 0;
    }
    setBltLayers(e) {
      return this.pendingBlt = e.length > 0 ? e : null, 0;
    }
    flushActiveLayer() {
      if (this.pendingBlt !== null) {
        let t = this.pendingBlt;
        return this.pendingBlt = null, this.flushLayers(t);
      }
      let e = this.drawTarget();
      return e === O ? -1 : this.flushLayers([e]);
    }
    flushLayer(e) {
      let t = this.layers.get(e);
      if (!t) return;
      let r = t.w * t.h * 2, n = this.mem.find(t.buf, r), a = n !== null ? n.data : null, o = n !== null ? t.buf - n.start | 0 : 0, l = this.fb565, u = this.sw, c = this.sh, h = t.opacity >= 100 ? 255 : Math.round(t.opacity * 255 / 100), m = t.transparentColor;
      for (let b = 0; b < t.h; b++) {
        let x = t.y + b;
        if (x < 0 || x >= c) continue;
        let p = x * u;
        for (let _ = 0; _ < t.w; _++) {
          let d = t.x + _;
          if (d < 0 || d >= u) continue;
          let y = (b * t.w + _) * 2, v = a !== null ? (a[o + y] | a[o + y + 1] << 8) & 65535 : (this.mem.read8(t.buf + y) | this.mem.read8(t.buf + y + 1) << 8) & 65535, M = p + d;
          if (!(m >= 0 && v === (m & 65535))) {
            if (h >= 255) {
              l[M] = v;
              continue;
            }
            l[M] = qe(l[M], v, h);
          }
        }
      }
      this.flushCount++, this.dirty = true;
    }
    toRgba(e) {
      for (let t = 0; t < this.fb565.length; t++) {
        let r = this.fb565[t], n = r >> 11 & 31, a = r >> 5 & 63, o = r & 31;
        e[t * 4] = n * 255 / 31 | 0, e[t * 4 + 1] = a * 255 / 63 | 0, e[t * 4 + 2] = o * 255 / 31 | 0, e[t * 4 + 3] = 255;
      }
    }
    clear(e = 0) {
      this.fb565.fill(e & 65535), this.dirty = true;
    }
  };
  function In(i) {
    let e = i.length, t = 1;
    for (let o = 0; o < e; o++) t = Math.imul(t, 31) + i[o] | 0;
    let r = "", n = "", a = e < 8 ? e : 8;
    for (let o = 0; o < a; o++) r += i[o].toString(16);
    for (let o = e - 8 > 0 ? e - 8 : 0; o < e; o++) n += i[o].toString(16);
    return `${e}:${t}:${r}:${n}`;
  }
  var rt = class {
    constructor(e, t, r, n = 8) {
      this.blocks = [];
      this.allocatedBytes = 0;
      this.peakAllocatedBytes = 0;
      this.allocationCalls = 0;
      this.freeCalls = 0;
      this.reallocCalls = 0;
      this.failedAllocations = 0;
      this.lastFailedRequest = 0;
      this.lastFailureReason = "";
      this.mem = e;
      this.base = t;
      this.capacity = r;
      this.alignment = n;
      this.blocks.push({ start: t, size: r, free: true });
    }
    search(e) {
      let t = 0, r = this.blocks.length;
      for (; t < r; ) {
        let n = t + r >>> 1, a = this.blocks[n].start;
        if (a === e) return n;
        a < e ? t = n + 1 : r = n;
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
      if (this.allocationCalls++, e === 0) return 0;
      let t = this.alignedSize(e);
      if (t === 0) return this.fail(e, "invalid-size");
      for (let r of this.blocks) {
        if (!r.free || r.size < t) continue;
        let n = r.size - t;
        return r.free = false, n >= 8 && (r.size = t, this.insert({ start: r.start + t | 0, size: n, free: true })), this.allocatedBytes += r.size, this.allocatedBytes > this.peakAllocatedBytes && (this.peakAllocatedBytes = this.allocatedBytes), r.start;
      }
      return this.fail(e, "no-fit");
    }
    calloc(e) {
      let t = this.malloc(e);
      if (t !== 0) {
        let r = this.usableSize(t);
        r > 0 && this.mem.fillBytes(t, 0, r, true);
      }
      return t;
    }
    free(e) {
      if (this.freeCalls++, e === 0) return true;
      let t = this.indexOf(e);
      if (t < 0) return false;
      let r = this.blocks[t];
      return r.free ? false : (r.free = true, this.allocatedBytes -= r.size, this.coalesce(t), true);
    }
    realloc(e, t) {
      if (this.reallocCalls++, e === 0) return this.malloc(t);
      if (t <= 0) return this.free(e), 0;
      let r = this.alignedSize(t);
      if (r === 0) return this.fail(t, "invalid-size");
      let n = this.indexOf(e);
      if (n < 0) return 0;
      let a = this.blocks[n];
      if (a.free) return 0;
      let o = a.size;
      if (r <= o) {
        let h = o - r;
        if (h >= 8) {
          a.size = r;
          let m = a.start + r | 0;
          this.insert({ start: m, size: h, free: true }), this.allocatedBytes -= h, this.coalesce(this.indexOf(m));
        }
        return e;
      }
      let l = this.blocks[n + 1];
      if (l && l.free && a.start + a.size === l.start && a.size + l.size >= r) {
        let h = r - a.size;
        this.blocks.splice(n + 1, 1);
        let m = l.size - h;
        return a.size = r, m >= 8 ? this.insert({ start: a.start + r | 0, size: m, free: true }) : a.size += m, this.allocatedBytes += a.size - o, this.allocatedBytes > this.peakAllocatedBytes && (this.peakAllocatedBytes = this.allocatedBytes), e;
      }
      let u = this.malloc(t);
      if (u === 0) return 0;
      let c = Math.min(o, this.usableSize(u));
      return c > 0 && this.mem.copyBytes(e, u, c), this.free(e), u;
    }
    usableSize(e) {
      let t = this.indexOf(e);
      if (t < 0) return 0;
      let r = this.blocks[t];
      return r.free ? 0 : r.size;
    }
    coalesce(e) {
      let t = e, r = this.blocks[t - 1];
      r && r.free && r.start + r.size === this.blocks[t].start && (r.size += this.blocks[t].size, this.blocks.splice(t, 1), t--);
      let n = this.blocks[t], a = this.blocks[t + 1];
      a && a.free && n.start + n.size === a.start && (n.size += a.size, this.blocks.splice(t + 1, 1));
    }
    alignedSize(e) {
      if (e <= 0 || e > this.capacity) return 0;
      let t = e + this.alignment - 1 & -this.alignment;
      return t <= 0 || t > this.capacity ? 0 : t;
    }
    fail(e, t) {
      return this.failedAllocations++, this.lastFailedRequest = e, this.lastFailureReason = t, 0;
    }
    stats() {
      let e = 0, t = 0;
      for (let r of this.blocks) r.free ? e += r.size : t++;
      return { capacity: this.capacity, allocatedBytes: this.allocatedBytes, freeBytes: e, liveAllocations: t };
    }
    largestFreeBlock() {
      let e = 0;
      for (let t of this.blocks) t.free && t.size > e && (e = t.size);
      return e;
    }
  };
  var Nn = 1, Un = 2, It = 4, Pt = 8, se = 1, Ft = 2, xr = 4;
  var yr = 16, nt = 32, zn = 2147483647;
  function ae() {
    return Math.floor(Date.now() / 1e3);
  }
  function vr(i, e) {
    let t = i + e;
    return Number.isSafeInteger(t) ? t : null;
  }
  function Q(i) {
    return i.toLowerCase();
  }
  function On(i) {
    let e = "";
    for (let t of i) {
      let r = t.charCodeAt(0);
      e += r < 32 || t === "<" || t === ">" || t === ":" || t === '"' || t === "|" || t === "?" || t === "*" ? "_" : t;
    }
    return e;
  }
  function Dn(i) {
    let e = "^";
    for (let t of i) t === "*" ? e += ".*" : t === "?" ? e += "." : ".()[]{}+^$|\\".includes(t) ? e += `\\${t}` : e += t;
    return new RegExp(`${e}$`, "i");
  }
  function Hn(i, e) {
    let t = i.toLowerCase(), r = e.toLowerCase();
    return t < r ? -1 : t > r ? 1 : i < e ? -1 : i > e ? 1 : 0;
  }
  var it = class {
    constructor(e = ["C", "E"]) {
      this.drives = /* @__PURE__ */ new Map();
      this.driveBytes = /* @__PURE__ */ new Map();
      this.handles = /* @__PURE__ */ new Map();
      this.findHandles = /* @__PURE__ */ new Map();
      this.attributeOverrides = /* @__PURE__ */ new Map();
      this.packageFiles = null;
      this.packageStamp = ae();
      this.nextHandle = 3;
      this.nextFindHandle = 65536;
      this.totalBytes = 0;
      for (let t of e) {
        let r = t.toUpperCase();
        this.drives.set(r, { kind: "dir", name: `${r}:\\`, children: /* @__PURE__ */ new Map(), modifiedSeconds: ae() }), this.driveBytes.set(r, 0);
      }
    }
    get storedBytes() {
      return this.totalBytes;
    }
    get openHandleCount() {
      return this.handles.size;
    }
    setPackageFiles(e, t = ae()) {
      this.packageFiles = e, this.packageStamp = t;
    }
    normalizeGuestPath(e) {
      let t = e.replace(/\//g, "\\").trim().replace(/\0+$/, "");
      if (t.length === 0 || t.length > 1024) return null;
      let r = t.length >= 2 && t[1] === ":", n = (r ? t[0] : "C").toUpperCase(), a = [];
      for (let o of (r ? t.slice(2) : t).split("\\")) if (!(o.length === 0 || o === ".")) {
        if (o === "..") return null;
        a.push(On(o));
      }
      return a.length === 0 ? `${n}:\\` : `${n}:\\${a.join("\\")}`;
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
      for (let n of e.slice(3).split("\\")) {
        if (r.kind !== "dir") return null;
        let a = r.children.get(Q(n));
        if (a === void 0) return null;
        r = a;
      }
      return r;
    }
    materializePackageFile(e) {
      let t = this.packageFiles;
      if (t === null || e.length <= 3) return null;
      let r = e.slice(e.lastIndexOf("\\") + 1);
      if (r.length === 0) return null;
      let n = t(r);
      if (n === null || n.length > 67108864) return null;
      let a = this.ensureParents(e);
      if (a === null) return null;
      let o = { kind: "file", name: r, drive: this.driveKey(e[0]), data: n, length: n.length, modifiedSeconds: this.packageStamp };
      return this.chargeBytes(o) ? (a.children.set(Q(r), o), o) : null;
    }
    exists(e) {
      return this.resolve(e) !== null;
    }
    open(e, t) {
      if (this.handles.size >= 256) return -1;
      let r = this.normalizeGuestPath(e);
      if (r === null) return -1;
      let n = (t & (Un | It | Pt)) !== 0, a = (t & Pt) !== 0;
      if (!n && (t & Nn) === 0) return -1;
      let o = this.resolve(r);
      if (n) {
        if (o !== null && o.kind !== "file" || o !== null && (this.attributes(r) & se) !== 0 || o === null && (t & (It | Pt)) === 0) return -1;
        let c = this.ensureParents(r);
        if (c === null) return -1;
        if (o === null) {
          let h = { kind: "file", name: r.slice(r.lastIndexOf("\\") + 1), drive: this.driveKey(r[0]), data: new Uint8Array(0), length: 0, modifiedSeconds: ae() };
          c.children.set(Q(h.name), h), o = h;
        }
      } else if (o === null || o.kind !== "file") return -1;
      let l = o;
      if ((t & It) !== 0 && !this.setLength(l, 0)) return -1;
      let u = this.allocHandle();
      return this.handles.set(u, { file: l, path: r, cursor: 0, writable: n, append: a }), u;
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
      return r === null || !r.writable || (this.attributes(r.path) & se) !== 0 || !this.setLength(r.file, t) ? -1 : (r.cursor > t && (r.cursor = t), 0);
    }
    freeSpace(e) {
      var _a;
      let t = this.normalizeGuestPath(e);
      if (t === null) return 0;
      let r = (_a = this.driveBytes.get(this.driveKey(t[0]))) != null ? _a : 0, n = zn - r;
      return n > 0 ? Math.min(n, 2147483647) : 0;
    }
    read(e, t) {
      if (t < 0 || t > 33554432) return null;
      let r = this.openFile(e);
      if (r === null) return new Uint8Array(0);
      let n = Math.max(0, r.file.length - r.cursor), a = Math.min(t, n), o = r.file.data.slice(r.cursor, r.cursor + a);
      return r.cursor += a, o;
    }
    write(e, t) {
      var _a;
      let r = this.openFile(e);
      if (r === null || !r.writable || t.length > 33554432 || (this.attributes(r.path) & se) !== 0) return -1;
      if (t.length === 0) return 0;
      r.append && (r.cursor = r.file.length);
      let n = vr(r.cursor, t.length);
      return n === null || n > 67108864 || !this.ensureCapacity(r.file, n) ? -1 : (r.cursor > r.file.length && r.file.data.fill(0, r.file.length, r.cursor), r.file.data.set(t, r.cursor), n > r.file.length && (this.totalBytes += n - r.file.length, this.driveBytes.set(r.file.drive, ((_a = this.driveBytes.get(r.file.drive)) != null ? _a : 0) + (n - r.file.length)), r.file.length = n), r.cursor = n, r.file.modifiedSeconds = ae(), t.length);
    }
    seek(e, t, r) {
      let n = this.openFile(e);
      if (n === null) return null;
      let a = n.file.length, o;
      if (r === 0) o = 0;
      else if (r === 1) o = n.cursor;
      else if (r === 2 || r === 3) o = a;
      else return null;
      let l = vr(o, t);
      if (l === null) return null;
      if (n.writable) return l < 0 ? null : (n.cursor = l, l);
      let u = l >= 0 && l <= a ? l : t >= 0 && t <= a ? t : null;
      return u === null ? null : (n.cursor = u, u);
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
      let n = this.resolve(r);
      if (n === null) return -1;
      let a = n.kind === "dir" ? yr : 0, o = t & (se | Ft | xr | nt), l = n.kind === "dir" ? o & ~nt : o;
      return this.attributeOverrides.set(this.metaKey(r), a | l), 0;
    }
    modifyTimeSeconds(e) {
      let t = this.resolve(e);
      return t === null ? null : t.modifiedSeconds;
    }
    setModifyTimeSeconds(e, t) {
      if (t < 0) return -1;
      let r = this.resolve(e);
      return r === null ? -1 : (r.modifiedSeconds = Math.floor(t), 0);
    }
    mkdir(e) {
      let t = this.normalizeGuestPath(e);
      if (t === null) return -1;
      let r = this.resolve(t);
      if (r !== null) return r.kind === "dir" ? 0 : -1;
      let n = this.ensureParents(t);
      return n === null ? -1 : (n.children.set(Q(t.slice(t.lastIndexOf("\\") + 1)), { kind: "dir", name: t.slice(t.lastIndexOf("\\") + 1), children: /* @__PURE__ */ new Map(), modifiedSeconds: ae() }), 0);
    }
    delete(e) {
      let t = this.normalizeGuestPath(e);
      if (t === null) return -1;
      let r = this.resolve(t);
      if (r === null || r.kind !== "file" || (this.attributesForNode(t) & se) !== 0) return -1;
      let n = this.parentOf(t);
      return n === null ? -1 : (n.children.delete(Q(r.name)), this.releaseBytes(r), this.removeMetadataPrefix(this.metaKey(t)), 0);
    }
    rmdir(e) {
      let t = this.normalizeGuestPath(e);
      if (t === null) return -1;
      let r = this.resolve(t);
      if (r === null || r.kind !== "dir" || r.children.size > 0 || this.rootOf(t[0]) === r || (this.attributesForNode(t) & se) !== 0) return -1;
      let n = this.parentOf(t);
      return n === null ? -1 : (n.children.delete(Q(r.name)), this.removeMetadataPrefix(this.metaKey(t)), 0);
    }
    rename(e, t) {
      let r = this.normalizeGuestPath(e), n = this.normalizeGuestPath(t);
      if (r === null || n === null) return -1;
      let a = this.resolve(r);
      if (a === null || (this.attributesForNode(r) & se) !== 0) return -1;
      if (r === n) return 0;
      if (a.kind === "dir" && this.isInsideDir(a, n)) return -1;
      let o = this.resolve(n);
      if (o !== null && o.kind === "file" != (a.kind === "file") || o !== null && o.kind === "file" && (this.attributesForNode(n) & se) !== 0) return -1;
      let l = this.parentOf(r), u = this.ensureParents(n);
      return l === null || u === null ? -1 : (o !== null && o.kind === "file" && this.releaseBytes(o), l.children.delete(Q(a.name)), a.name = n.slice(n.lastIndexOf("\\") + 1), a.kind === "file" ? a.drive = this.driveKey(n[0]) : this.retargetDrive(a, this.driveKey(n[0])), u.children.set(Q(a.name), a), a.modifiedSeconds = ae(), this.moveMetadataPrefix(this.metaKey(r), this.metaKey(n)), 0);
    }
    copy(e, t) {
      let r = this.normalizeGuestPath(e), n = this.normalizeGuestPath(t);
      if (r === null || n === null) return -1;
      let a = this.resolve(r);
      if (a === null || a.kind !== "file" || a.length > 67108864) return -1;
      if (r === n) return 0;
      let o = this.resolve(n);
      if (o !== null && o.kind !== "file" || o !== null && (this.attributesForNode(n) & se) !== 0) return -1;
      let l = this.ensureParents(n);
      if (l === null) return -1;
      let u = { kind: "file", name: n.slice(n.lastIndexOf("\\") + 1), drive: this.driveKey(n[0]), data: a.data.slice(0, a.length), length: a.length, modifiedSeconds: ae() };
      if (!this.chargeBytes(u)) return -1;
      o !== null && this.releaseBytes(o), l.children.set(Q(u.name), u);
      let c = this.attributeOverrides.get(this.metaKey(r));
      return c !== void 0 && this.attributeOverrides.set(this.metaKey(n), c), 0;
    }
    readAll(e, t = 33554432) {
      if (t < 0 || t > 33554432) return null;
      let r = this.resolve(e);
      return r === null || r.kind !== "file" || r.length > t ? null : r.data.slice(0, r.length);
    }
    readRange(e, t, r) {
      if (t < 0 || r < 0 || r > 33554432) return null;
      let n = this.resolve(e);
      return n === null || n.kind !== "file" || t > n.length || t + r > n.length ? null : n.data.slice(t, t + r);
    }
    findFirst(e) {
      if (this.findHandles.size >= 128) return null;
      let t = this.splitFindPattern(e);
      if (t === null) return null;
      let r = this.resolve(t.dir);
      if (r === null || r.kind !== "dir") return null;
      let n = Dn(t.mask), a = [];
      for (let l of r.children.values()) n.test(l.name) && a.push(l.name);
      if (a.sort(Hn), a.length === 0) return null;
      let o = this.allocFindHandle();
      return this.findHandles.set(o, { names: a, index: 0 }), { handle: o, name: a[0] };
    }
    findNext(e) {
      let t = this.findHandles.get(e);
      if (t === void 0) return null;
      let r = t.index + 1;
      return r >= t.names.length ? null : (t.index = r, t.names[r]);
    }
    findClose(e) {
      return this.findHandles.delete(e) ? 0 : -1;
    }
    describeHandle(e) {
      var _a, _b;
      return (_b = (_a = this.handles.get(e)) == null ? void 0 : _a.path) != null ? _b : "?";
    }
    seedFile(e, t) {
      let r = this.normalizeGuestPath(e);
      if (r === null) return false;
      let n = this.ensureParents(r);
      if (n === null) return false;
      let a = n.children.get(Q(r.slice(r.lastIndexOf("\\") + 1)));
      a !== void 0 && a.kind === "file" && this.releaseBytes(a);
      let o = { kind: "file", name: r.slice(r.lastIndexOf("\\") + 1), drive: this.driveKey(r[0]), data: t.slice(), length: t.length, modifiedSeconds: ae() };
      return this.chargeBytes(o) ? (n.children.set(Q(o.name), o), true) : false;
    }
    closeAll() {
      this.handles.clear(), this.findHandles.clear();
    }
    openFile(e) {
      var _a;
      return (_a = this.handles.get(e)) != null ? _a : null;
    }
    allocHandle() {
      for (; this.nextHandle < 0 || this.handles.has(this.nextHandle); ) this.nextHandle++;
      return this.nextHandle++;
    }
    allocFindHandle() {
      for (; this.nextFindHandle < 0 || this.findHandles.has(this.nextFindHandle); ) this.nextFindHandle++;
      return this.nextFindHandle++;
    }
    attributesForNode(e) {
      var _a;
      let t = this.resolve(e);
      if (t === null) return -1;
      let r = t.kind === "dir" ? yr : nt, n = (_a = this.attributeOverrides.get(this.metaKey(e))) != null ? _a : 0, a = (r | n & (se | Ft | xr | nt)) >>> 0;
      return t.name.startsWith(".") && (a |= Ft), a | 0;
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
      let n = t;
      for (let a of r) {
        let o = Q(a), l = n.children.get(o);
        if (l === void 0) {
          let u = { kind: "dir", name: a, children: /* @__PURE__ */ new Map(), modifiedSeconds: ae() };
          n.children.set(o, u), n = u;
        } else {
          if (l.kind !== "dir") return null;
          n = l;
        }
      }
      return n;
    }
    ensureCapacity(e, t) {
      if (t > 67108864 || t > 134217728 - this.totalBytes + e.length) return false;
      if (t <= e.data.length) return true;
      let r = e.data.length + (e.data.length >> 1) + 64;
      if (r < t && (r = t), r > 67108864 && (r = 67108864), r < t) return false;
      let n = new Uint8Array(r);
      return n.set(e.data.subarray(0, e.length)), e.data = n, true;
    }
    setLength(e, t) {
      var _a;
      if (t < 0 || t > 67108864) return false;
      let r = t - e.length;
      return r > 0 && this.totalBytes + r > 134217728 || t > e.data.length && !this.ensureCapacity(e, t) ? false : (r > 0 && e.data.fill(0, e.length, t), e.length = t, this.totalBytes += r, this.driveBytes.set(e.drive, Math.max(0, ((_a = this.driveBytes.get(e.drive)) != null ? _a : 0) + r)), true);
    }
    chargeBytes(e) {
      var _a;
      return this.totalBytes + e.length > 134217728 ? false : (this.totalBytes += e.length, this.driveBytes.set(e.drive, ((_a = this.driveBytes.get(e.drive)) != null ? _a : 0) + e.length), true);
    }
    releaseBytes(e) {
      var _a;
      this.totalBytes = Math.max(0, this.totalBytes - e.length), this.driveBytes.set(e.drive, Math.max(0, ((_a = this.driveBytes.get(e.drive)) != null ? _a : 0) - e.length)), e.length = 0, e.data = new Uint8Array(0);
    }
    retargetDrive(e, t) {
      var _a, _b;
      if (e.kind === "file") {
        let r = e.length;
        this.driveBytes.set(e.drive, Math.max(0, ((_a = this.driveBytes.get(e.drive)) != null ? _a : 0) - r)), e.drive = t, this.driveBytes.set(t, ((_b = this.driveBytes.get(t)) != null ? _b : 0) + r);
        return;
      }
      for (let r of e.children.values()) this.retargetDrive(r, t);
    }
    isInsideDir(e, t) {
      let r = this.rootOf(t[0]);
      if (r === null) return false;
      let n = r;
      if (n === e) return true;
      if (t.length <= 3) return false;
      for (let a of t.slice(3).split("\\")) {
        if (n.kind !== "dir") return false;
        let o = n.children.get(Q(a));
        if (o === void 0) return false;
        if (n = o, n === e) return true;
      }
      return false;
    }
    driveKey(e) {
      return e.toUpperCase() === "E" ? "E" : "C";
    }
    rootOf(e) {
      var _a;
      return (_a = this.drives.get(this.driveKey(e))) != null ? _a : null;
    }
    moveMetadataPrefix(e, t) {
      let r = [];
      for (let [n, a] of this.attributeOverrides) (n === e || n.startsWith(`${e}\\`)) && r.push([n, a]);
      for (let [n] of r) this.attributeOverrides.delete(n);
      for (let [n, a] of r) this.attributeOverrides.set(t + n.slice(e.length), a);
    }
    removeMetadataPrefix(e) {
      for (let t of Array.from(this.attributeOverrides.keys())) (t === e || t.startsWith(`${e}\\`)) && this.attributeOverrides.delete(t);
    }
    splitFindPattern(e) {
      let t = e.replace(/\//g, "\\").trim().replace(/\0+$/, "");
      if (t.trim().length === 0 || t.length > 1024) return null;
      let r = t.lastIndexOf("\\");
      if (r >= 0) {
        let n = t.slice(r + 1);
        return { dir: t.slice(0, r + 1), mask: n.length === 0 ? "*" : n };
      }
      if (t.length >= 2 && t[1] === ":") {
        let n = t.slice(2);
        return { dir: `${t.slice(0, 2)}\\`, mask: n.length === 0 ? "*" : n };
      }
      return { dir: "C:\\", mask: t };
    }
  };
  var Er = 4096, Mr = 8192;
  function Nt(i, e, t) {
    return i < e ? e : i > t ? t : i;
  }
  var Pe;
  function Gn() {
    if (Pe !== void 0) return Pe;
    try {
      Pe = new TextDecoder("gbk");
    } catch (e) {
      Pe = null;
    }
    return Pe;
  }
  function Sr(i, e, t) {
    let r = [], n = e;
    for (; r.length < t && i.isMapped(n, 1); ) {
      let a = 0;
      try {
        a = i.read8(n);
      } catch (e2) {
        break;
      }
      if (n++, a === 0) break;
      r.push(a);
    }
    return Uint8Array.from(r);
  }
  function Cr(i, e) {
    let t = false;
    for (let a = 0; a < i.length; a++) if (i[a] >= 128) {
      t = true;
      break;
    }
    let r = e && t ? Gn() : null;
    if (r !== null) return r.decode(i);
    let n = "";
    for (let a = 0; a < i.length; a++) n += String.fromCharCode(i[a]);
    return n;
  }
  var st = class {
    constructor(e, t = 240, r = 320, n = 16777216, a = 67108864, o = 1048576) {
      this.cpu = undefined;
      this.gfx = undefined;
      this.heap = undefined;
      this.fs = new it();
      this.apis = /* @__PURE__ */ new Map();
      this.handlers = /* @__PURE__ */ new Map();
      this.systemCallback = 0;
      this.smCallback = 0;
      this.keyboardCallback = 0;
      this.penCallback = 0;
      this.timers = /* @__PURE__ */ new Map();
      this.nextTimerId = 1;
      this.events = [];
      this.inputEvents = [];
      this.eventsDispatched = 0;
      this.timerCallbacks = 0;
      this.exitCode = 0;
      this.resolvedNames = [];
      this.stubbedNames = [];
      this.namedResources = [];
      this.resourceBlobSize = 0;
      this.resourceMappedSize = 0;
      this.rawExecutableName = "app.vxp";
      this.cRandState = 1;
      this.systemStrings = /* @__PURE__ */ new Map();
      this.ucs2Scratch = 0;
      this.exitReason = null;
      this.stubTrace = null;
      this.errorTrace = null;
      this.clockOffsetMs = 0;
      this.mem = e;
      this.sw = t;
      this.sh = r;
      this.heapSize = n;
      this.stackBase = a;
      this.stackSize = o;
      this.cpu = new Ke(e), e.map(16777216, 65536, true, false, true), e.map(33554432, n, true, true, false), e.map(a, o, true, true, false), this.heap = new rt(e, 33554432, n), this.gfx = new tt(e, t, r), this.cpu.onApiCall = (l) => this.dispatch(l), this.cpu.onExit = (l) => this.requestExit(l);
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
      this.exitCode = e, this.exitReason = t, this.cpu.exitRequested = true;
    }
    api(e, t) {
      let r = this.apis.get(e);
      if (r !== void 0) return r;
      let n = 16777216 + this.apis.size * 4 | 0;
      if (n >= 16842748) throw new Error("MRE API table exhausted");
      return this.apis.set(e, n), this.handlers.set(n, t), n;
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
      if (t !== void 0) return this.resolvedNames.push(e), t;
      if (!this.hasApiCapacity) return 0;
      let r = this.api(e, this.compatibilityHandler(e));
      return this.resolvedNames.push(e), this.stubbedNames.push(e), r;
    }
    compatibilityHandler(e) {
      let t = 0;
      return (r) => {
        t++, t === 1 && this.stubTrace && this.stubTrace(e, r), r.r[0] = 0;
      };
    }
    dispatch(e) {
      let t = this.handlers.get(e | 0);
      if (!t) return false;
      try {
        t(this.cpu);
      } catch (r) {
        this.cpu.r[0] = 0, this.errorTrace && this.errorTrace(e, r);
      }
      return true;
    }
    arg(e, t) {
      if (t < 0) throw new Error("negative arg index");
      if (t < 4) return e.r[t] | 0;
      try {
        return this.mem.read32((e.r[13] | 0) + (t - 4 << 2)) | 0;
      } catch (e2) {
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
      let n = this.nextTimerId++;
      return this.timers.set(n, { id: n, intervalMs: r, callback: t, enabled: true, nextFireMs: this.nowMs() + r }), n;
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
      var _a, _b, _c, _d;
      e !== 0 && this.events.push({ kind: "callback", callback: e, argc: t.length, a0: (_a = t[0]) != null ? _a : 0, a1: (_b = t[1]) != null ? _b : 0, a2: (_c = t[2]) != null ? _c : 0, a3: (_d = t[3]) != null ? _d : 0 });
    }
    pollEvent() {
      var _a;
      return (_a = this.inputEvents.shift()) != null ? _a : this.events.shift();
    }
    enqueueDueTimers(e = this.nowMs()) {
      if (this.timers.size !== 0) {
        for (let t of this.timers.values()) if (!(!t.enabled || e < t.nextFireMs)) {
          do
            t.nextFireMs += t.intervalMs;
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
        this.namedResources = [], this.installPackageFiles();
        return;
      }
      let r = [], n = 0, a = e.length, o = 0;
      for (; o++ < 8192 && n < a && n < e.length; ) {
        let l = n;
        for (; l < e.length && l - n < 512 && e[l] !== 0; ) l++;
        if (l >= e.length || l === n || e[l] !== 0 || !Rr(e, n, l)) break;
        let u = kr(e, n, l);
        if (n = l + 1, n + 8 > e.length) break;
        let c = at(e, n);
        n += 4;
        let h = at(e, n);
        n += 4;
        let m = c - t;
        if (m < 0 || h < 0 || m + h > e.length) break;
        a = Math.min(a, m), r.some((b) => b.name === u) || r.push({ name: u, offset: m, size: h });
      }
      this.namedResources = r, this.mapResourceBlob(e), this.installPackageFiles();
    }
    installRawResources(e) {
      if (this.namedResources = Ne(e), e.length === 0) {
        this.resourceBlobSize > 0 && (this.mem.fillBytes(1342177280, 0, this.resourceBlobSize, true), this.resourceBlobSize = 0), this.installPackageFiles();
        return;
      }
      this.mapResourceBlob(e), this.installPackageFiles();
    }
    installPackageFiles() {
      let e = /* @__PURE__ */ new Map();
      for (let t of this.namedResources) {
        if (t.offset < 0 || t.size < 0 || t.offset + t.size > this.resourceBlobSize) continue;
        let r = t.name.slice(Math.max(t.name.lastIndexOf("\\"), t.name.lastIndexOf("/")) + 1).toLowerCase();
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
          return this.mem.readBytes(1342177280 + r.offset | 0, r.size);
        } catch (e2) {
          return null;
        }
      });
    }
    mapResourceBlob(e) {
      if (e.length > Wn) throw new Error(`VXP resource blob too large: ${e.length}`);
      if (this.resourceMappedSize === 0) this.resourceMappedSize = Math.max(e.length + 4095 & -4096, 4096), this.mem.map(1342177280, this.resourceMappedSize, true, true, false);
      else if (e.length > this.resourceMappedSize) throw new Error("Replacement resource blob exceeds mapped arena");
      this.resourceBlobSize > e.length && this.mem.fillBytes(1342177280 + e.length, 0, this.resourceBlobSize - e.length, true), this.mem.writeBytes(1342177280, e, 0, e.length, true), this.resourceBlobSize = e.length;
    }
    resourceByName(e) {
      return this.namedResources.find((t) => t.name === e);
    }
    readUcs2Compat(e, t = 2048) {
      if (e === 0 || !this.mem.isMapped(e, 2)) return "";
      let r = "", n = e;
      for (let a = 0; a < t && this.mem.isMapped(n, 2); a++) {
        let o = 0;
        try {
          o = this.mem.read16(n);
        } catch (e2) {
          break;
        }
        if (n += 2, o === 0) return r;
        r += String.fromCharCode(o);
      }
      return r;
    }
    readResourceNameCompat(e) {
      return this.readStringAuto(e, 256);
    }
    readStringAuto(e, t = 512) {
      if (e === 0 || !this.mem.isMapped(e, 1)) return "";
      let r = false;
      if (this.mem.isMapped(e, 4)) try {
        r = this.mem.read8(e) >= 32 && this.mem.read8(e) <= 126 && this.mem.read8(e + 1) === 0 && this.mem.read8(e + 2) >= 32 && this.mem.read8(e + 2) <= 126 && this.mem.read8(e + 3) === 0;
      } catch (e2) {
        r = false;
      }
      if (r) return this.readUcs2Compat(e, t);
      try {
        return this.mem.readCString(e, t);
      } catch (e2) {
        return "";
      }
    }
    writeUcs2(e, t) {
      if (e === 0 || !this.mem.isMapped(e, (t.length + 1) * 2)) return false;
      let r = e;
      for (let n = 0; n < t.length; n++) this.mem.write16(r, t.charCodeAt(n) & 65535, true), r += 2;
      return this.mem.write16(r, 0, true), true;
    }
    asciiToUcs2Compat(e) {
      let t = e.r[0] | 0, r = Nt(e.r[1] | 0, 0, 1 << 20), n = e.r[2] | 0;
      if (!this.mem.isMapped(t, 2) || !this.mem.isMapped(n, 1)) return 0;
      let a = r >= 2 ? Math.max(r / 2 - 1 | 0, 0) : 1023, o = n, l = t, u = 0;
      for (; u < a && this.mem.isMapped(o, 1) && this.mem.isMapped(l, 2); ) {
        let c = this.mem.read8(o);
        if (o++, this.mem.write16(l, c), l += 2, c === 0) return u;
        u++;
      }
      return this.mem.isMapped(l, 2) && this.mem.write16(l, 0), u;
    }
    gbToUcs2Compat(e) {
      let t = e.r[0] | 0, r = Nt(e.r[1] | 0, 0, 1 << 20), n = e.r[2] | 0;
      if (!this.mem.isMapped(t, 2) || !this.mem.isMapped(n, 1)) return 0;
      let a = r >= 2 ? r : Er, o = r >= 2 ? Math.max(r / 2 - 1 | 0, 0) : 1023, l = Sr(this.mem, n, a), u = Cr(l, true), c = t, h = 0;
      for (let m = 0; m < u.length && !(h >= o || !this.mem.isMapped(c, 2)); m++) this.mem.write16(c, u.charCodeAt(m) & 65535), c += 2, h++;
      return this.mem.isMapped(c, 2) && this.mem.write16(c, 0), h;
    }
    ucs2ToAsciiCompat(e) {
      let t = e.r[0] | 0, r = Nt(e.r[1] | 0, 0, 1 << 20), n = e.r[2] | 0;
      if (!this.mem.isMapped(t, 1) || !this.mem.isMapped(n, 2)) return 0;
      let a = r > 0 ? Math.max(r - 1, 0) : 2047, o = n, l = t, u = 0;
      for (; u < a && this.mem.isMapped(o, 2) && this.mem.isMapped(l, 1); ) {
        let c = this.mem.read16(o);
        if (o += 2, c === 0) return this.mem.write8(l, 0), u;
        this.mem.write8(l, c >= 1 && c <= 255 ? c : 63), l++, u++;
      }
      return this.mem.isMapped(l, 1) && this.mem.write8(l, 0), u;
    }
    narrowToUcs2Compat(e) {
      let t = this.arg(e, 0);
      if (t === 0 || !this.mem.isMapped(t, 1) || this.ucs2Scratch === 0 && (this.ucs2Scratch = this.heap.malloc(Mr), this.ucs2Scratch === 0)) return 0;
      let r = Sr(this.mem, t, Er), n = Cr(r, true), a = this.ucs2Scratch, o = this.ucs2Scratch + Mr - 2;
      for (let l = 0; l < n.length && !(a >= o); l++) this.mem.write16(a, n.charCodeAt(l) & 65535, true), a += 2;
      return this.mem.write16(a, 0, true), this.ucs2Scratch;
    }
    charsetConvertCompat(e) {
      let t = e.r[0] | 0, r = e.r[1] | 0, n = e.r[2] | 0, a = e.r[3] | 0;
      if (!this.mem.isMapped(n, 1) || !this.mem.isMapped(a, 1)) return -1;
      let o = this.mem.isMapped(n, 4) && this.mem.read8(n + 1) === 0 && this.mem.read8(n + 3) === 0, l = r === 38 || !o && r !== t, u = n, c = a, h = 0;
      if (l) {
        for (; h < 2047 && this.mem.isMapped(u, 1) && this.mem.isMapped(c, 2); ) {
          let b = this.mem.read8(u);
          if (u++, this.mem.write16(c, b), c += 2, b === 0) break;
          h++;
        }
        let m = a + h * 2;
        this.mem.isMapped(m, 2) && this.mem.write16(m, 0);
      } else {
        for (; h < 2047 && this.mem.isMapped(u, 2) && this.mem.isMapped(c, 1); ) {
          let b = this.mem.read16(u);
          if (u += 2, b === 0) {
            this.mem.write8(c, 0);
            break;
          }
          this.mem.write8(c, b >= 1 && b <= 255 ? b : 63), c++, h++;
        }
        let m = a + h;
        this.mem.isMapped(m, 1) && this.mem.write8(m, 0);
      }
      return 0;
    }
    systemAscii(e, t) {
      let r = this.systemStrings.get(e);
      if (r !== void 0) return r;
      let n = this.heap.malloc(t.length + 1);
      if (n === 0) return 0;
      for (let a = 0; a < t.length; a++) this.mem.write8(n + a, t.charCodeAt(a) & 127, true);
      return this.mem.write8(n + t.length, 0, true), this.systemStrings.set(e, n), n;
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
      let r = this.readResourceNameCompat(e), n = this.namedResources.find((a) => a.name === r && a.offset >= 0 && a.size >= 0 && a.offset + a.size <= this.resourceBlobSize);
      return n === void 0 ? (t !== 0 && this.mem.write32(t, 0, true), 0) : (t !== 0 && this.mem.write32(t, n.size, true), 1342177280 + n.offset | 0);
    }
    resourceDelete(e) {
      return e >= 1342177280 && e < 1342177280 + this.resourceBlobSize || this.heap.free(e) ? 0 : -1;
    }
    resourceGetData(e) {
      let t = this.arg(e, 0), r = this.arg(e, 1), n = this.arg(e, 2), a = r >= 0 && n >= 0 && r + n <= this.resourceBlobSize, o = n === 0 || t !== 0 && this.mem.isMapped(t, n);
      return !a || !o ? -1 : (n > 0 && this.mem.copyBytes(1342177280 + r, t, n), n);
    }
    resourceFind(e) {
      let t = this.resourceByName(e);
      return t ? t.offset : -1;
    }
  }, Wn = 64 * 1024 * 1024;
  function at(i, e) {
    return i[e] | i[e + 1] << 8 | i[e + 2] << 16 | i[e + 3] << 24 | 0;
  }
  function Rr(i, e, t) {
    for (let r = e; r < t; r++) if (i[r] < 32 || i[r] > 126) return false;
    return true;
  }
  function kr(i, e, t) {
    let r = "";
    for (let n = e; n < t; n++) r += String.fromCharCode(i[n]);
    return r;
  }
  function Ne(i) {
    if (i.length === 0) return [];
    let e = [], t = /* @__PURE__ */ new Set(), r = 0, n = i.length;
    for (; e.length < 8192 && !(r >= i.length || r >= n); ) {
      let a = r;
      for (; a < i.length && a - r < 255 && i[a] !== 0; ) a++;
      if (a >= i.length || i[a] !== 0 || a === r || !Rr(i, r, a)) break;
      let o = kr(i, r, a);
      if (r = a + 1, r + 8 > i.length) break;
      let l = at(i, r);
      r += 4;
      let u = at(i, r);
      if (r += 4, l < 0 || u < 0 || l + u > i.length) break;
      n = Math.min(n, l), t.has(o) || (t.add(o), e.push({ name: o, offset: l, size: u }));
    }
    return e;
  }
  var Br = 2060, Zn = 1 << 20;
  function U(i, e) {
    return i[e] | i[e + 1] << 8 | i[e + 2] << 16 | i[e + 3] << 24 | 0;
  }
  function Pr(i) {
    let e = i & 255, t = (i >>> 8 & 15) * 2;
    return t === 0 ? e : e >>> t | e << 32 - t | 0;
  }
  function Vn(i, e, t) {
    let r = Math.min(i.length, e + t), n = e;
    for (; n < r && i[n] !== 0; ) {
      let o = i[n];
      if (o < 32 || o > 126) return "";
      n++;
    }
    if (n === e) return "";
    let a = "";
    for (let o = e; o < n; o++) a += String.fromCharCode(i[o]);
    return a;
  }
  function Tr(i, e) {
    let t = e.length;
    if (t === 0) return 0;
    e: for (let r = 0; r + t <= i.length; r++) {
      for (let n = 0; n < t; n++) if (i[r + n] !== e.charCodeAt(n)) continue e;
      return r;
    }
    return -1;
  }
  function zt(i) {
    if (i.length < 256) return false;
    let e = U(i, 0), t = U(i, 4), r = (e & 268431360) === 42958848 && (t & 4293918720) === -393216e3 && (t >>> 20 & 1) === 1 && (t >>> 16 & 15) === 8, n = Tr(i, "mre-") >= 0 || Tr(i, "vm_reg_sysevt_callback") >= 0;
    return r || n;
  }
  function Fr(i) {
    if (!ve(i, 0)) throw new Error("Raw ARM VXP does not start with zlib");
    let e = [], t = 0, r = 0;
    for (let n = 0; n < 8 && ve(i, t); n++) {
      let a = Ze(i, t, 33554432);
      if (a === null) break;
      if (r += a.bytes.length, r > 67108864) throw new Error(`RAW streams exceed ${67108864} byte total inflate safety limit`);
      for (e.push(a), t += a.compressedSize; t < i.length && i[t] === 0; ) t++;
    }
    if (e.length === 0) throw new Error("No zlib stream decoded");
    return { streams: e, nextOffset: t };
  }
  function Nr(i, e, t) {
    var _a, _b;
    let r = e[0].bytes;
    if (r.length < 256) throw new Error("Raw ARM code stream too small");
    let n = (_b = (_a = e[1]) == null ? void 0 : _a.bytes) != null ? _b : new Uint8Array(0), a = t < i.length ? i.slice(t) : new Uint8Array(0), o = Dr(r), l = Or(r);
    return { code: r, initialData: n, resources: a, streams: e, imports: o, vmMainOffset: Hr(r, o), dataSizeHint: l.dataSize, bssSizeHint: l.bssSize, resolverSlotOffset: zr(r, o) };
  }
  function Ur(i) {
    let e = Et(i, 0, 33554432);
    if (e === null || !zt(e.bytes)) return null;
    let t = [{ compressedOffset: 0, compressedSize: e.nextInputOffset, bytes: e.bytes }], r = At(i, e.nextInputOffset), n = new Uint8Array(0), a = Math.min(Math.max(e.bytes.length, Zn), 33554432), o = r < i.length ? Et(i, r, a) : null;
    if (o !== null) {
      if (e.bytes.length + o.bytes.length > 67108864) throw new Error(`LZMA streams exceed ${67108864} byte total inflate safety limit`);
      t.push({ compressedOffset: r, compressedSize: o.nextInputOffset - r, bytes: o.bytes }), n = o.bytes, r = At(i, o.nextInputOffset);
    }
    let l = t.length > 1 && r < i.length ? i.subarray(r) : null, u = l !== null && qn(l) > 0 ? i.slice(r) : new Uint8Array(0), c = Dr(e.bytes), h = Or(e.bytes);
    return { code: e.bytes, initialData: n, resources: u, streams: t, imports: c, vmMainOffset: Hr(e.bytes, c), dataSizeHint: h.dataSize, bssSizeHint: h.bssSize, resolverSlotOffset: zr(e.bytes, c) };
  }
  function zr(i, e) {
    var _a;
    let t = /* @__PURE__ */ new Map();
    for (let a of e) {
      let o = Math.max(a.stubOffset, 0), l = Math.min(i.length, o + 96);
      for (let u = o; u + 4 <= l; u += 4) {
        let c = U(i, u);
        if ((c & 268435440) !== 19922736) continue;
        let h = c & 15, m = Math.max(o, u - 32);
        for (let b = u - 4; b >= m; b -= 4) {
          let x = U(i, b), p = x >>> 16 & 15, _ = x >>> 12 & 15;
          if (!((x >>> 26 & 3) === 1 && (x >>> 25 & 1) === 0 && (x >>> 24 & 1) === 1 && (x >>> 20 & 1) === 1) || p !== h || _ !== h) continue;
          let y = x & 4095, v = (x >>> 23 & 1) !== 0;
          for (let M = b - 4; M >= Math.max(o, b - 24); M -= 4) {
            let S = U(i, M);
            if ((S >>> 25 & 1) === 0 && (S >>> 21 & 15) === 4 && (S >>> 16 & 15) === h && (S >>> 12 & 15) === h && (S & 4095) === 9) {
              for (let R = M - 4; R >= Math.max(o, M - 24); R -= 4) {
                let E = U(i, R);
                if (!((E >>> 26 & 3) === 1 && (E >>> 25 & 1) === 0 && (E >>> 24 & 1) === 1 && (E >>> 20 & 1) === 1 && (E >>> 16 & 15) === 15 && (E >>> 12 & 15) === h)) continue;
                let L = E & 4095, P = (E >>> 23 & 1) !== 0, I = R + 8 + (P ? L : -L);
                if (I >= 0 && I + 4 <= i.length) {
                  let z = U(i, I) + (v ? y : -y) | 0;
                  z >= 0 && z < 16 * 1024 * 1024 && t.set(z, ((_a = t.get(z)) != null ? _a : 0) + 1);
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
    let r = Br, n = -1;
    for (let [a, o] of t) (o > n || o === n && a < r) && (r = a, n = o);
    return n < 0 ? Br : r;
  }
  function Or(i) {
    try {
      let e = U(i, 0), r = 8 + Pr(e);
      if (r < 0 || r + 16 > i.length) return { dataSize: 0, bssSize: 0 };
      let n = r + U(i, r) | 0, a = r + U(i, r + 4) | 0, o = r + U(i, r + 8) | 0, l = r + U(i, r + 12) | 0, u = 0;
      for (let h = n; h + 12 <= a && h + 12 <= i.length; h += 12) {
        let m = U(i, h), b = U(i, h + 4), x = U(i, h + 8);
        m !== b && x > u && x < 64 * 1024 * 1024 && (u = x);
      }
      let c = 0;
      for (let h = o; h + 8 <= l && h + 8 <= i.length; h += 8) {
        let m = U(i, h), b = U(i, h + 4), x = m & -4;
        b >= 0 && b < 64 * 1024 * 1024 && (c = Math.max(c, x + b | 0));
      }
      return { dataSize: u, bssSize: Math.max(0, c - u) };
    } catch (e) {
      return { dataSize: 0, bssSize: 0 };
    }
  }
  function Dr(i) {
    let e = /* @__PURE__ */ new Map(), t = (r, n) => {
      if (r < 0 || r >= i.length) return;
      let a = Vn(i, r, 128);
      if (a !== "strtoi" && !a.startsWith("vm_")) return;
      let o = n & -4;
      for (let l = o; l >= Math.max(0, o - 96); l -= 4) if ((U(i, l) & 4294901760) === -382926848) {
        o = l;
        break;
      }
      e.has(a) || e.set(a, { name: a, stubOffset: o, nameOffset: r });
    };
    for (let r = 0; r + 4 <= i.length; r += 4) {
      let n = U(i, r);
      if (r >= 4 && n === -527499264) {
        let o = U(i, r - 4);
        if ((o & 4294963200) === -442564608) {
          let l = o & 4095, u = r + 4 + l;
          u >= 0 && u + 4 <= i.length && t(r + 8 + U(i, u) | 0, r - 4);
        }
      }
      let a = n & 268369920;
      if (a === 42926080 || a === 38731776) {
        let o = Pr(n), l = a === 42926080 ? r + 8 + o : r + 8 - o, u = Math.min(i.length, r + 28), c = false;
        for (let h = r + 4; h + 4 <= u; h += 4) {
          let m = U(i, h);
          if ((m & 234881024) === 167772160 || (m & 268435440) === 19922704 || (m & 268435440) === 19922736) {
            c = true;
            break;
          }
        }
        c && t(l, r);
      }
    }
    return [...e.values()];
  }
  function Hr(i, e) {
    var _a, _b, _c;
    let t = (_a = e.find((u) => u.name === "vm_reg_sysevt_callback")) == null ? void 0 : _a.stubOffset;
    if (t === void 0) return null;
    let r = (_b = e.find((u) => u.name === "vm_reg_keyboard_callback")) == null ? void 0 : _b.stubOffset, n = (_c = e.find((u) => u.name === "vm_reg_pen_callback")) == null ? void 0 : _c.stubOffset, a = Ir(i, t);
    if (a.length === 0) return null;
    let o = /* @__PURE__ */ new Map();
    for (let u of a) {
      let c = Kn(i, u);
      if (o.has(c)) continue;
      let h = 10;
      r !== void 0 && Lr(i, c, Math.min(i.length, c + 384), r) && (h += 4), n !== void 0 && Lr(i, c, Math.min(i.length, c + 384), n) && (h += 2);
      let m = Ir(i, c).filter((b) => b < 16384).reduce((b, x) => Math.min(b, x), Number.MAX_SAFE_INTEGER);
      m !== Number.MAX_SAFE_INTEGER && (h += 20), o.set(c, { start: c, score: h, earliestCaller: m });
    }
    let l = [...o.values()].sort((u, c) => c.score - u.score || u.earliestCaller - c.earliestCaller || u.start - c.start)[0];
    return l ? l.start : null;
  }
  function Xn(i) {
    return (i & 4294901760) === -382926848 || (i & 4294963200) === -449978368;
  }
  function Kn(i, e) {
    let t = Math.max(0, (e & -4) - 1024);
    for (let r = e & -4; r >= t; r -= 4) if (Xn(U(i, r))) {
      for (let n = Math.max(0, r - 16); n < r; n += 4) if (Yn(i, n)) return n;
      return r;
    }
    return e & -4;
  }
  function Yn(i, e) {
    for (let t = 0; t + 4 <= i.length; t += 4) {
      let r = U(i, t);
      if ((r & 251658240) !== 184549376) continue;
      let n = r & 16777215;
      if ((n & 8388608) !== 0 && (n |= 4278190080), (t + 8 + (n << 2) | 0) === e) return true;
    }
    return false;
  }
  function Lr(i, e, t, r) {
    for (let n = e & -4; n + 4 <= t; n += 4) if (Gr(i, n) === r) return true;
    return false;
  }
  function Ir(i, e) {
    let t = [];
    for (let r = 0; r + 4 <= i.length; r += 4) Gr(i, r) === e && t.push(r);
    return t;
  }
  function Gr(i, e) {
    let t = U(i, e);
    if ((t & 234881024) !== 167772160) return null;
    let r = (t & 16777216) !== 0, n = t >>> 28 & 15;
    if (!r && n !== 14) return null;
    let a = t & 16777215;
    return (a & 8388608) !== 0 && (a |= 4278190080), e + 8 + (a << 2) | 0;
  }
  function qn(i) {
    return Ne(i).length;
  }
  function Ot(i, e) {
    return e >= 0 && e + 4 <= i.length && i[e] === 127 && i[e + 1] === 69 && i[e + 2] === 76 && i[e + 3] === 70;
  }
  function jn(i) {
    if (i.length < 8) return false;
    let e = i[0] << 16 | i[1] << 8 | i[2];
    return e === 4609875 || e === 4413267 || e === 5920595;
  }
  function Qn(i) {
    let e = Math.min(i.length - 4, 1048576);
    for (let t = 1; t <= e; t++) if (Ot(i, t)) return t;
    return -1;
  }
  function Jn(i) {
    try {
      return Fr(i);
    } catch (e) {
      return null;
    }
  }
  function Zr(i) {
    var _a, _b;
    let e = nr(i), t = (a, o, l = "") => ({ kind: a, backend: o, sourceSize: i.length, elf: null, raw: null, tags: e, detail: l }), r = false;
    if (i.length > 67108864) return Object.assign({}, t("UNKNOWN", "UNKNOWN"), { detail: `source exceeds ${67108864} bytes` });
    if (jn(i)) return Object.assign({}, t("FLASH_LITE_SWF", "FLASH_LITE"), { detail: "Flash Lite SWF: backend not ported yet" });
    if (Ot(i, 0)) return Object.assign({}, t("ELF32_ARM", "ELF_ARM"), { elf: i });
    if (ve(i, 0)) {
      let a = Jn(i), o = (_b = (_a = a == null ? void 0 : a.streams[0]) == null ? void 0 : _a.bytes) != null ? _b : null;
      if (a === null || o === null) return Object.assign({}, t("UNKNOWN", "UNKNOWN"), { detail: "zlib stream could not be inflated" });
      if (Ot(o, 0)) return o.length > 33554432 ? Object.assign({}, t("ZLIB_ELF", "UNKNOWN"), { detail: "inflated executable exceeds safety limit" }) : Object.assign({}, t("ZLIB_ELF", "ELF_ARM"), { elf: o });
      if (zt(o)) {
        let l = Nr(i, a.streams, a.nextOffset);
        return Object.assign({}, t("RAW_ARM_ZLIB", "RAW_ARM"), { raw: l });
      }
      return Object.assign({}, t("UNKNOWN", "UNKNOWN"), { detail: "zlib payload is neither ELF nor a RAW ARM MRE image" });
    }
    if (wt(i, 0)) {
      r = true;
      try {
        let a = Ur(i);
        if (a !== null) return Object.assign({}, t("LZMA_RAW_ARM", "RAW_ARM"), { raw: a });
      } catch (a) {
        return Object.assign({}, t("LZMA_RAW_ARM", "UNKNOWN"), { detail: a instanceof Error ? a.message : String(a) });
      }
    }
    let n = Qn(i);
    return n >= 0 ? i.length - n > 33554432 ? Object.assign({}, t("EMBEDDED_ELF", "UNKNOWN"), { detail: "embedded ELF exceeds safety limit" }) : Object.assign({}, t("EMBEDDED_ELF", "ELF_ARM"), { elf: i.slice(n) }) : r ? Object.assign({}, t("LZMA_RAW_ARM", "UNKNOWN"), { detail: "LZMA-alone payload is not a RAW ARM MRE image" }) : Object.assign({}, t("UNKNOWN", "UNKNOWN"), { detail: "no executable ELF32 payload found" });
  }
  var Ue = { maxExecutableBytes: 33554432, maxProgramHeaders: 1024, maxSectionHeaders: 4096, maxRegionBytes: 33554432, maxMappedBytes: 134217728 }, Vr = 40, Dt = 1, Ht = 1, lt = 2, ei = 3, ti = 9, ut = 11, Xr = 8, Ee = 0, ri = 2, ni = 3, ii = 10, si = 21, ai = 22, oi = 23, li = 28, ui = 29, fi = 30, ft = 1, Me = 2, ci = 4;
  function N(i, e) {
    return i[e] | i[e + 1] << 8 | i[e + 2] << 16 | i[e + 3] << 24 | 0;
  }
  function le(i, e) {
    return i[e] | i[e + 1] << 8;
  }
  function Kr(i) {
    return i & -4096;
  }
  function Gt(i) {
    return i + 4095 & -4096;
  }
  function Yr(i, e, t, r) {
    return i < 0 || e <= 0 || t < 0 ? false : i + e * t <= r;
  }
  function qr(i, e, t) {
    return i < 0 || e < 0 ? false : i + e <= t;
  }
  var ct = class i {
    constructor(e, t, r, n, a) {
      this.symbolCache = /* @__PURE__ */ new Map();
      this.relocErrors = [];
      this.bytes = e;
      this.type = t;
      this.entry = r;
      this.programHeaders = n;
      this.sections = a;
    }
    static parse(e) {
      if (e.length < 52) throw new Error("ELF file too small");
      if (e.length > Ue.maxExecutableBytes) throw new Error("ELF exceeds safety limit");
      if (e[0] !== 127 || e[1] !== 69 || e[2] !== 76 || e[3] !== 70) throw new Error("Not an ELF file");
      if (e[4] !== 1) throw new Error("Only ELF32 is supported");
      if (e[5] !== 1) throw new Error("Only little-endian ELF is supported");
      let t = le(e, 16), r = le(e, 18), n = N(e, 36) & 251658240;
      if (r !== Vr && !(r === 0 && n !== 0)) throw new Error(`ELF machine=${r}, expected ARM (${Vr})`);
      if (le(e, 40) < 52) throw new Error("Invalid ELF header size");
      let a = N(e, 24), o = N(e, 28), l = N(e, 32), u = le(e, 42), c = le(e, 44), h = le(e, 46), m = le(e, 48), b = le(e, 50);
      if (c > Ue.maxProgramHeaders) throw new Error(`Too many ELF program headers: ${c}`);
      if (m > Ue.maxSectionHeaders) throw new Error(`Too many ELF section headers: ${m}`);
      if (c > 0) {
        if (u < 32 || u > 256) throw new Error(`Invalid ELF program-header entry size: ${u}`);
        if (!Yr(o, u, c, e.length)) throw new Error("Broken ELF program-header table");
      }
      if (m > 0) {
        if (l === 0) throw new Error("ELF section count is nonzero but section table is absent");
        if (h < 40 || h > 256) throw new Error(`Invalid ELF section-header entry size: ${h}`);
        if (!Yr(l, h, m, e.length)) throw new Error("Broken ELF section-header table");
      }
      let x = [], p = 0;
      for (let d = 0; d < c; d++) {
        let y = o + d * u, v = { type: N(e, y), offset: N(e, y + 4), vaddr: N(e, y + 8), filesz: N(e, y + 16), memsz: N(e, y + 20), flags: N(e, y + 24), align: N(e, y + 28) };
        if (v.type === Dt) {
          if (v.filesz < 0 || v.memsz < v.filesz) throw new Error(`Invalid PT_LOAD sizes in header #${d}`);
          if (v.memsz > Ue.maxRegionBytes) throw new Error(`PT_LOAD #${d} exceeds guest-region limit`);
          if (!qr(v.offset, v.filesz, e.length)) throw new Error(`PT_LOAD #${d} outside file`);
          if ((v.vaddr >>> 0) + v.memsz > 4294967296) throw new Error(`PT_LOAD #${d} wraps guest address space`);
          if (p += v.memsz, p > Ue.maxMappedBytes) throw new Error("ELF PT_LOAD total exceeds guest mapping limit");
        }
        x.push(v);
      }
      let _ = [];
      if (m > 0) {
        for (let d = 0; d < m; d++) {
          let y = l + d * h, v = { nameOffset: N(e, y), type: N(e, y + 4), flags: N(e, y + 8), addr: N(e, y + 12), offset: N(e, y + 16), size: N(e, y + 20), link: N(e, y + 24), info: N(e, y + 28), addralign: N(e, y + 32), entsize: N(e, y + 36), name: "" };
          if (v.size < 0) throw new Error(`Negative ELF section size #${d}`);
          v.type !== Xr && v.size > 0 && !qr(v.offset, v.size, e.length) && ((v.flags & Me) !== 0 && v.offset >= 0 ? v.size = Math.min(Math.max(e.length - v.offset, 0), v.size) : v.size = 0), _.push(v);
        }
        if (b !== 0 && (b < 0 || b >= _.length)) throw new Error(`Invalid ELF shstrndx=${b}`);
        if (b > 0 && b < _.length) {
          let d = _[b];
          if (d.type !== ei) throw new Error("ELF shstrndx does not reference a string table");
          for (let y of _) y.name = y.nameOffset < 0 || y.nameOffset >= d.size ? "" : i.readZ(e, d.offset + y.nameOffset, d.offset + d.size);
        }
      }
      return new i(e, t, a, x, _);
    }
    static readZ(e, t, r) {
      if (t < 0 || t >= e.length || t >= r) return "";
      let n = t, a = Math.min(r, e.length);
      for (; n < a && e[n] !== 0; ) n++;
      let o = "";
      for (let l = t; l < n; l++) o += String.fromCharCode(e[l]);
      return o;
    }
    armccRwpiImageSize() {
      let e = this.sections.find((o) => o.name === "ER_RO" && o.type === Ht && (o.flags & Me) !== 0 && (o.flags & ci) !== 0 && o.size > 0);
      if (!e) return 0;
      let t = this.sections.find((o) => o.name === "ER_RW" && o.type === Ht && (o.flags & Me) !== 0 && (o.flags & ft) !== 0 && o.addr === 0 && o.size > 0);
      if (!t) return 0;
      let r = this.programHeaders.find((o) => o.type === Dt && o.vaddr === e.addr && o.filesz > 0);
      if (!r || t.offset < e.offset + e.size || t.offset + t.size > this.bytes.length || r.filesz < e.size + t.size) return 0;
      let n = this.sections.filter((o) => (o.flags & Me) !== 0 && (o.flags & ft) !== 0 && o.size > 0 && o.addr >= 0 && o.addr < 16 * 1024 * 1024);
      if (n.length === 0) return 0;
      let a = Math.max(...n.map((o) => o.addr + o.size));
      return a <= 0 || a > 16 * 1024 * 1024 ? 0 : a;
    }
    correctedLoadOffset(e) {
      if (e.filesz <= 0 || this.sections.length === 0) return e.offset;
      let t = this.sections.map((l, u) => ({ s: l, i: u })).filter(({ s: l }) => l.type === Ht && (l.flags & Me) !== 0 && l.size > 0).sort((l, u) => l.s.offset - u.s.offset), r = t.findIndex(({ s: l }) => l.addr === e.vaddr);
      if (r < 0) return e.offset;
      let n = t[r], a = n.s.offset, o = 0;
      for (let l = 0; l < t.length; l++) {
        let u = t[l].s;
        if (u.offset !== a) {
          if (o > 0) break;
          continue;
        }
        if (!(o === 0 && l !== r) && (o += u.size, a += u.size, o >= e.filesz)) break;
      }
      return o === e.filesz && n.s.offset !== e.offset ? n.s.offset : e.offset;
    }
    load(e) {
      let t = this.programHeaders.filter((h) => h.type === Dt && h.memsz > 0);
      if (t.length === 0) throw new Error("ELF has no PT_LOAD segment");
      let r = Math.min(...t.map((h) => h.vaddr >>> 0)), n = this.type === 3 && r < 65536 ? 65536 : 0, a = 2147483647, o = 0, l = this.armccRwpiImageSize(), u = l > 0 ? 8388608 : null;
      if (u !== null) {
        let h = u - 4096, m = Gt(u + l);
        e.isMapped(h, m - h) || e.map(h, m - h, true, true, false);
      } else {
        let h = this.sections.filter((m) => (m.flags & Me) !== 0 && (m.flags & ft) !== 0 && m.size > 0);
        for (let m of h) {
          let b = m.addr, x = b + m.size;
          if (!t.some((_) => {
            let d = _.vaddr, y = d + _.memsz;
            return b >= d && x <= y;
          }) && b >= 0 && x > b && x <= 16 * 1024 * 1024) {
            let _ = Kr(m.addr + n), d = Gt(m.addr + n + m.size);
            e.isMapped(_, d - _) || e.map(_, d - _, true, true, false);
          }
        }
      }
      for (let h of t) {
        if (h.filesz < 0 || h.memsz < h.filesz) throw new Error("Invalid PT_LOAD sizes");
        let m = this.correctedLoadOffset(h);
        if (m < 0 || m + h.filesz > this.bytes.length) throw new Error("PT_LOAD outside file");
        let b = Kr(h.vaddr + n), x = Gt(h.vaddr + n + h.memsz), p = x - b, _ = (h.flags & 4) !== 0, d = (h.flags & 2) !== 0, y = (h.flags & 1) !== 0;
        e.isMapped(b, p) || e.map(b, p, _ || y, d, y), h.filesz > 0 && e.writeBytes(h.vaddr + n, this.bytes, m, h.filesz, true), a = Math.min(a, b), o = Math.max(o, x);
      }
      let c = t.reduce((h, m) => m.vaddr >>> 0 < h.vaddr >>> 0 ? m : h).vaddr + n;
      return { entry: this.entry !== 0 ? this.entry + n | 0 : c | 0, loadBias: n, imageStart: a | 0, imageEnd: o | 0, staticBase: u, staticImageSize: l };
    }
    readSymbols(e) {
      let t = this.symbolCache.get(e);
      if (t) return t;
      let r = this.sections[e];
      if (!r || r.entsize <= 0 || r.link < 0 || r.link >= this.sections.length) return this.symbolCache.set(e, []), [];
      let n = this.sections[r.link], a = [], o = r.offset, l = Math.min(r.offset + r.size, this.bytes.length);
      for (; o + 16 <= l; ) {
        let u = N(this.bytes, o);
        a.push({ name: i.readZ(this.bytes, n.offset + u, n.offset + n.size), value: N(this.bytes, o + 4), size: N(this.bytes, o + 8), info: this.bytes[o + 12], other: this.bytes[o + 13], shndx: le(this.bytes, o + 14) }), o += r.entsize;
      }
      return this.symbolCache.set(e, a), a;
    }
    sectionAddress(e, t) {
      let r = this.sections.find((n) => n.name === e);
      return r ? r.addr + t.loadBias | 0 : null;
    }
    sectionSize(e) {
      var _a, _b;
      return (_b = (_a = this.sections.find((t) => t.name === e)) == null ? void 0 : _a.size) != null ? _b : 0;
    }
    vmResSection() {
      let e = this.sections.find((t) => t.name === ".vm_res" && t.size > 0);
      if (!e) return null;
      if (e.offset < 0 || e.size < 0 || e.offset + e.size > this.bytes.length) throw new Error(".vm_res section outside file");
      return { bytes: this.bytes.subarray(e.offset, this.bytes.length), offset: e.offset };
    }
    definedSymbolAddress(e, t) {
      for (let r = 0; r < this.sections.length; r++) {
        let n = this.sections[r];
        if (n.type !== lt && n.type !== ut) continue;
        let a = this.readSymbols(r).find((o) => o.shndx !== Ee && o.name === e);
        if (a) return a.value + t.loadBias | 0;
      }
      return null;
    }
    undefinedSymbols() {
      let e = /* @__PURE__ */ new Set();
      for (let t = 0; t < this.sections.length; t++) {
        let r = this.sections[t];
        if (!(r.type !== lt && r.type !== ut)) for (let n of this.readSymbols(t)) n.shndx === Ee && n.name && e.add(n.name);
      }
      return [...e];
    }
    functionSymbols(e) {
      let t = [], r = /* @__PURE__ */ new Set();
      for (let n = 0; n < this.sections.length; n++) {
        let a = this.sections[n];
        if (!(a.type !== lt && a.type !== ut)) for (let o of this.readSymbols(n)) {
          if (o.shndx === Ee || !o.name || (o.info & 15) !== 2) continue;
          let l = (o.value & -2) + e.loadBias | 0, u = `${o.name}@${l.toString(16)}`;
          r.has(u) || (r.add(u), t.push(Object.assign({}, o, { value: l })));
        }
      }
      return t.sort((n, a) => n.value - a.value || n.name.localeCompare(a.name));
    }
    applyRelocations(e, t, r) {
      let n = /* @__PURE__ */ new Set();
      for (let a of this.sections) {
        if (a.type !== ti || a.entsize <= 0 || a.link < 0 || a.link >= this.sections.length) continue;
        let o = this.readSymbols(a.link), l = a.offset, u = a.offset + a.size, c = Math.max(a.entsize, 8);
        for (; l + 8 <= u && l + 8 <= this.bytes.length; ) {
          let h = N(this.bytes, l), m = N(this.bytes, l + 4), b = m & 255, x = m >>> 8, p = h + t.loadBias | 0, _ = 0;
          try {
            _ = e.read32(p);
          } catch (e2) {
            l += c;
            continue;
          }
          if (b === oi) {
            e.write32(p, t.loadBias + _ | 0, true), l += c;
            continue;
          }
          if (b === 0) {
            l += c;
            continue;
          }
          let d = o[x], y = 0;
          if (d === void 0) y = 0;
          else if (d.shndx === Ee) {
            let v = r.addressOf(d.name);
            v === null ? (d.name && n.add(d.name), y = d.name && r.hasApiCapacity ? r.resolveAddressOrStub(d.name) : 0) : y = v;
          } else y = d.value + t.loadBias | 0;
          if (d === void 0 || d.shndx !== Ee || y !== 0) switch (b) {
            case ri:
              e.write32(p, y + _ | 0, true);
              break;
            case ni:
              e.write32(p, y + _ - p | 0, true);
              break;
            case si:
            case ai:
              e.write32(p, y | 0, true);
              break;
            case li:
            case ui:
              this.patchArmBranch(e, p, y);
              break;
            case ii:
            case fi:
              this.patchThumbBranch(e, p, y);
              break;
            default:
              this.relocErrors.push(`unsupported type=${b}@0x${(p >>> 0).toString(16)}`);
              break;
          }
          l += c;
        }
      }
      return [...n];
    }
    patchArmBranch(e, t, r) {
      let n = e.read32(t), a = r - (t + 8);
      if (a % 4 !== 0 || a < -33554432 || a > 33554428) {
        this.relocErrors.push(`arm-branch-range 0x${(t >>> 0).toString(16)}->0x${(r >>> 0).toString(16)}`);
        return;
      }
      let o = a >> 2 & 16777215;
      e.write32(t, n & 4278190080 | o, true);
    }
    patchThumbBranch(e, t, r) {
      let n = r - (t + 4);
      if (n % 2 !== 0 || n < -4194304 || n > 4194302) {
        this.relocErrors.push(`thumb-bl-range 0x${(t >>> 0).toString(16)}->0x${(r >>> 0).toString(16)}`);
        return;
      }
      let a = n >> 12 & 2047, o = n >> 1 & 2047;
      e.write16(t, 61440 | a, true), e.write16(t + 2, 63488 | o, true);
    }
    installImportResolvers(e, t, r, n) {
      let a = new Map(this.namedResolverSlots(e, t, r, n)), o = this.sections.find((h) => h.name === ".text" && h.size >= 16);
      if (!o) {
        for (let [h, m] of a) e.write32(h, m, true);
        return [...a.keys()];
      }
      let l = o.addr + t.loadBias | 0, u = l + o.size | 0, c = 0;
      for (; c + 12 <= o.size; ) {
        let h = e.read32(l + c), m = h >>> 12 & 15;
        if (i.armAddPcReg(h) !== m || m === 15) {
          c += 4;
          continue;
        }
        let b = e.read32(l + c + 4);
        if (!i.isArmLdrWord(b) || (b >>> 16 & 15) !== m || (b >>> 12 & 15) !== m || (b & 4095) !== 0) {
          c += 4;
          continue;
        }
        let x = e.read32(l + c + 8);
        if ((x & 268435440) !== 19922736 || (x & 15) !== m) {
          c += 4;
          continue;
        }
        if (!this.hasApiNameOperand(e, l, c)) {
          c += 4;
          continue;
        }
        let p = 0, _ = false;
        for (let d = Math.max(c - 24, 0); d < c; d += 4) {
          let y = e.read32(l + d);
          if (i.isArmLdrWord(y) && (y >>> 16 & 15) === 15 && (y >>> 12 & 15) === m) {
            let v = y & 4095;
            p = l + d + 8 + ((y & 8388608) !== 0 ? v : -v) | 0, _ = true;
            break;
          }
        }
        if (_ && e.isMapped(p, 4)) {
          let d = l + c + 8 + e.read32(p) | 0, y = false;
          try {
            y = e.read32(d) === 0;
          } catch (e2) {
            y = false;
          }
          d !== 0 && (d < l || d >= u) && e.isMapped(d, 4) && y && !a.has(d) && a.set(d, r);
        }
        c += 4;
      }
      for (let [h, m] of a) e.write32(h, m, true);
      return [...a.keys()];
    }
    namedResolverSlots(e, t, r, n) {
      let a = [];
      for (let o = 0; o < this.sections.length; o++) {
        let l = this.sections[o];
        if (!(l.type !== lt && l.type !== ut)) for (let u of this.readSymbols(o)) {
          if (u.shndx === Ee || u.size !== 4 || (u.info & 15) !== 1) continue;
          let c = this.sections[u.shndx];
          if (!c || c.type === Xr || (c.flags & ft) === 0) continue;
          let h = u.name, m = h === "vm_get_sym_entry" || h === "__vxp_resolver";
          if (!m && n.addressOf(h) === null) continue;
          let b = u.value + t.loadBias | 0, x = false;
          try {
            x = e.isMapped(b, 4) && e.read32(b) === 0;
          } catch (e2) {
            x = false;
          }
          x && a.push([b, m ? r : n.addressOf(h)]);
        }
      }
      return a;
    }
    static armAddPcReg(e) {
      if ((e >>> 20 & 255) !== 8 || (e >>> 16 & 15) !== 15 || (e & 4080) !== 0) return null;
      let t = e >>> 12 & 15;
      return (e & 15) === t ? t : null;
    }
    static isArmLdrWord(e) {
      return (e >>> 20 & 255 & 247) === 81;
    }
    hasApiNameOperand(e, t, r) {
      for (let n = r - 24; n <= r + 8; n += 4) {
        if (n < 0) continue;
        let a = e.read32(t + n);
        if ((a & 268431360) === 42926080) {
          let o = i.armRotatedImmediate(a & 255, a >>> 8 & 15), l = t + n + 8 + ((a & 8388608) !== 0 ? o : -o) | 0;
          if (i.isApiNameAt(e, l)) return true;
        }
      }
      return false;
    }
    static armRotatedImmediate(e, t) {
      let r = t * 2;
      return r === 0 ? e : (e << r | e >>> 32 - r) >>> 0;
    }
    static isApiNameAt(e, t) {
      if (t <= 0) return false;
      let r = 0;
      for (let n = 0; n < 64; n++) {
        let a = -1;
        try {
          a = e.read8(t + n) & 255;
        } catch (e2) {
          return false;
        }
        if (!(a >= 97 && a <= 122 || a >= 65 && a <= 90 || a >= 48 && a <= 57 || a === 95)) return r >= 4 && a === 0 && n > 0;
        if (n === 0 && !(a >= 97 && a <= 122 || a >= 65 && a <= 90 || a === 95)) return false;
        r++;
      }
      return false;
    }
  };
  var Wt = 1, $t = 4;
  var di = 1024;
  function Qr(i) {
    let e = i.mem, t = i.gfx, r = i.fs, n = (s, f) => i.arg(s, f);
    i.api("__vxp_resolver", (s) => {
      let f = "";
      try {
        f = e.readCString(s.r[0], 256);
      } catch (e2) {
        f = "";
      }
      s.r[0] = i.resolveAddressOrStub(f);
    }), i.api("vm_get_sym_entry", (s) => {
      let f = "";
      try {
        f = e.readCString(n(s, 0), 256);
      } catch (e2) {
        f = "";
      }
      s.r[0] = i.resolveAddressOrStub(f);
    }), i.api("vm_graphic_get_screen_width", (s) => {
      s.r[0] = t.screenWidth;
    }), i.api("vm_graphic_get_screen_height", (s) => {
      s.r[0] = t.screenHeight;
    }), i.api("vm_graphic_get_screen_w", (s) => {
      s.r[0] = t.screenWidth;
    }), i.api("vm_graphic_get_screen_h", (s) => {
      s.r[0] = t.screenHeight;
    }), i.api("vm_graphic_get_bits_per_pixel", (s) => {
      s.r[0] = 16;
    }), i.api("vm_graphic_create_layer", (s) => {
      s.r[0] = t.createLayer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), ht(n(s, 4)));
    }), i.api("vm_graphic_create_layer_ex", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = n(s, 3), C = n(s, 6), k = C !== 0 && e.isMapped(C, w * A * 2) ? C : -1;
      s.r[0] = t.createLayer(f, g, w, A, ht(n(s, 4)), k);
    }), i.api("vm_graphic_get_layer_buffer", (s) => {
      s.r[0] = t.getLayerBuffer(n(s, 0));
    }), i.api("vm_graphic_get_buffer", (s) => {
      t.ensureScreenLayer(), s.r[0] = t.screenBufferAddress();
    }), i.api("vm_initialize_screen_buffer", (s) => {
      s.r[0] = t.ensureScreenLayer() !== O ? 0 : -1;
    }), i.api("vm_dd_initialize_clip_rect", (s) => {
      s.r[0] = t.ensureScreenLayer() !== O ? 0 : -1;
    }), i.api("vm_graphic_active_layer", (s) => {
      s.r[0] = t.activeLayer(n(s, 0));
    }), i.api("vm_graphic_delete_layer", (s) => {
      s.r[0] = t.deleteLayer(n(s, 0));
    }), i.api("vm_graphic_create_canvas", (s) => {
      s.r[0] = t.createCanvas(n(s, 0), n(s, 1), ht(n(s, 2)));
    }), i.api("vm_graphic_get_canvas_buffer", (s) => {
      s.r[0] = t.canvasBuffer(n(s, 0));
    }), i.api("vm_graphic_create_canvas_cf", (s) => {
      s.r[0] = t.createCanvas(n(s, 1), n(s, 2), -1);
    }), i.api("vm_graphic_create_layer_cf", (s) => {
      let f = n(s, 1), g = n(s, 2), w = n(s, 3), A = n(s, 4), C = n(s, 7), k = n(s, 8), G = C !== 0 && k >= w * A * 2 && e.isMapped(C, k) ? C : -1, V = n(s, 5), J = V !== 0 && e.isMapped(V, 4) ? $(e.read8(V + 1), e.read8(V + 2), e.read8(V + 3)) : -1;
      s.r[0] = t.createLayer(f, g, w, A, J, G);
    });
    let a = /* @__PURE__ */ new Map(), o = (s) => {
      let f = a.get(s);
      f !== void 0 && (a.delete(s), i.heap.free(f));
    };
    i.api("vm_graphic_release_canvas", (s) => {
      let f = n(s, 0);
      o(f), s.r[0] = t.releaseCanvas(f);
    }), i.api("vm_graphic_canvas_set_trans_color", (s) => {
      let f = n(s, 1);
      s.r[0] = t.setCanvasTransparentColor(n(s, 0), f < 0 ? -1 : Jr(e, f));
    });
    let l = (s) => {
      let f = n(s, 0), g = n(s, 1);
      return f === 0 || g <= 0 || g > 33554432 || !e.isMapped(f, g) ? 0 : t.loadImage(e.readBytes(f, g));
    };
    i.api("vm_graphic_load_image", (s) => {
      s.r[0] = l(s);
    }), i.api("vm_graphic_load_img", (s) => {
      s.r[0] = l(s);
    }), i.api("vm_graphic_get_image_buffer", (s) => {
      s.r[0] = t.getImageBuffer(n(s, 0));
    }), i.api("vm_graphic_get_img_buffer", (s) => {
      s.r[0] = t.getImageBuffer(n(s, 0));
    }), i.api("vm_graphic_release_image", (s) => {
      let f = n(s, 0);
      o(f), s.r[0] = t.releaseImage(f);
    });
    let u = (s) => {
      let f = n(s, 0), g = t.imageWidth(f), w = t.imageHeight(f);
      if (g <= 0 || w <= 0) {
        s.r[0] = 0;
        return;
      }
      let A = a.get(f);
      if (A === void 0) {
        if (A = i.heap.calloc(24), A === 0) {
          s.r[0] = 0;
          return;
        }
        a.set(f, A);
      }
      e.write8(A + 0, 1, true), e.write16(A + 2, 0, true), e.write16(A + 4, 0, true), e.write16(A + 6, g, true), e.write16(A + 8, w, true), e.write16(A + 10, 0, true), e.write8(A + 12, 0, true), e.write16(A + 14, 0, true), e.write32(A + 16, g * w * 2, true), s.r[0] = A;
    };
    i.api("vm_graphic_get_img_property", u), i.api("vm_graphic_get_image_property", u), i.api("vm_graphic_get_img_property_ex", u), i.api("vm_dd_get_img_property", u), i.api("vm_graph_get_img_property", u), i.api("vm_dd_load_image", (s) => {
      let f = n(s, 0), g = n(s, 1), w = f !== 0 && g > 0 && g <= 33554432 && e.isMapped(f, g) ? t.loadImage(e.readBytes(f, g)) : 0;
      s.r[0] = t.getImageBuffer(w);
    }), i.api("vm_dd_get_frame_number", (s) => {
      s.r[0] = t.canvasFrameCount(n(s, 0));
    });
    let c = (s) => {
      let f = n(s, 3), g = n(s, 4);
      if (f === 0 || g <= 0 || g > 33554432 || !e.isMapped(f, g)) {
        s.r[0] = -1;
        return;
      }
      s.r[0] = t.drawImageFromMemory(n(s, 0), n(s, 1), n(s, 2), e.readBytes(f, g));
    };
    i.api("vm_graphic_draw_image_from_memory", c), i.api("vm_graphic_draw_image", c), i.api("vm_graphic_flush_layer", (s) => {
      s.r[0] = t.flushLayers(mt(i, n(s, 0), n(s, 1)));
    }), i.api("vm_graphic_flush_screen", (s) => {
      s.r[0] = t.flushActiveLayer();
    }), i.api("vm_graphic_flush_buffer", (s) => {
      s.r[0] = t.flushActiveLayer();
    }), i.api("vm_graphic_flush_layer_non_block", (s) => {
      s.r[0] = t.flushLayers(mt(i, n(s, 0), n(s, 1)));
    }), i.api("vm_graphic_blt", (s) => {
      let f = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((g) => n(s, g));
      s.r[0] = t.blt(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8]);
    }), i.api("vm_graphic_blt_ex", (s) => {
      let f = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((g) => n(s, g));
      s.r[0] = t.blt(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7], f[8]);
    });
    let h = (s) => {
      let f = n(s, 5), g = n(s, 6), w = g >= 0 && g <= 65535, A = f >= 0 && f <= 65535, C = w && (A || f === 0) ? g : f !== 0 ? f : t.currentColor;
      s.r[0] = t.fillRect(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), C);
    };
    i.api("vm_graphic_fill_rect", h), i.api("vm_graphic_fill_rect_ex", h), i.api("vm_graphic_setcolor", (s) => {
      let f = n(s, 0);
      f >= 0 && f <= 65535 && (t.currentColor = f), s.r[0] = 0;
    }), i.api("vm_graphic_set_clip", (s) => {
      s.r[0] = t.setClip(n(s, 0), n(s, 1), n(s, 2), n(s, 3));
    }), i.api("vm_graphic_reset_clip", (s) => {
      s.r[0] = t.resetClip();
    }), i.api("vm_graphic_set_layer_clip", (s) => {
      s.r[0] = t.setLayerClip(n(s, 0), n(s, 1) << 16 >> 16, n(s, 2) << 16 >> 16, n(s, 3) << 16 >> 16, n(s, 4) << 16 >> 16);
    }), i.api("vm_graphic_reset_layer_clip", (s) => {
      s.r[0] = t.resetLayerClip(n(s, 0));
    }), i.api("vm_graphic_layer_set_trans_color", (s) => {
      s.r[0] = t.setLayerTransColor(n(s, 0), ht(n(s, 1)));
    }), i.api("vm_graphic_get_layer_position", (s) => {
      let f = t.layer(n(s, 0));
      if (!f) {
        s.r[0] = -1;
        return;
      }
      let g = [n(s, 1), n(s, 2), n(s, 3), n(s, 4)], w = [f.x, f.y, f.w, f.h];
      for (let A = 0; A < 4; A++) g[A] !== 0 && e.isMapped(g[A], 4) && e.write32(g[A], w[A], true);
      s.r[0] = 0;
    }), i.api("vm_graphic_set_blt_layer", (s) => {
      s.r[0] = t.setBltLayers(mt(i, n(s, 0), n(s, 1)));
    }), i.api("vm_graphic_set_alpha_blending_layer", (s) => {
      s.r[0] = 0;
    });
    let m = (s) => {
      s.r[0] = t.flushLayers(mt(i, n(s, 0), n(s, 1)));
    };
    i.api("vm_graphic_flatten_layer", m), i.api("vm_graphic_flatten_layer_ex", m), i.api("vm_graphic_set_layer_opacity", (s) => {
      s.r[0] = t.setLayerOpacity(n(s, 0), n(s, 1));
    }), i.api("vm_dd_set_clip", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = n(s, 3);
      s.r[0] = t.setClip(f, g, f + w - 1, g + A - 1);
    }), i.api("vm_dd_reset_clip", (s) => {
      s.r[0] = t.resetClip();
    }), i.api("vm_dd_active_layer", (s) => {
      s.r[0] = t.activeLayer(n(s, 0));
    }), i.api("vm_dd_clean", (s) => {
      s.r[0] = t.cleanSurface(n(s, 0), te(e, n(s, 1)));
    }), i.api("vm_graph_clean", (s) => {
      s.r[0] = t.cleanSurface(n(s, 0), te(e, n(s, 1)));
    }), i.api("vm_graphic_fillrect", (s) => {
      s.r[0] = t.fillRect(Tt, n(s, 0), n(s, 1), n(s, 2), n(s, 3), te(e, n(s, 4)));
    });
    let b = (s, f) => (g) => {
      let w = n(g, 0), A = n(g, 6), C = !f && A !== 0 ? te(e, A) : t.currentColor;
      g.r[0] = s ? t.fillRoundRectBuffer(w, n(g, 1), n(g, 2), n(g, 3), n(g, 4), n(g, 5), C) : t.drawRoundRectBuffer(w, n(g, 1), n(g, 2), n(g, 3), n(g, 4), n(g, 5), C);
    };
    i.api("vm_graphic_roundrect", b(false, false)), i.api("vm_graphic_fill_roundrect", b(true, false));
    let x = (s) => s !== 0 && e.isMapped(s, 4) ? $(e.read8(s + 1), e.read8(s + 2), e.read8(s + 3)) : 0;
    i.api("vm_graphic_roundrect_cf", (s) => {
      s.r[0] = t.drawRoundRectBuffer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), n(s, 5), x(n(s, 6)));
    }), i.api("vm_graphic_fill_roundrect_cf", (s) => {
      s.r[0] = t.fillRoundRectBuffer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), n(s, 5), x(n(s, 6)));
    });
    let p = (s) => (f) => {
      let g = n(f, 0);
      f.r[0] = s ? t.fillRoundRectBuffer(g, n(f, 1), n(f, 2), n(f, 3), n(f, 4), n(f, 5), t.currentColor) : t.drawRoundRectBuffer(g, n(f, 1), n(f, 2), n(f, 3), n(f, 4), n(f, 5), t.currentColor);
    };
    i.api("vm_graphic_roundrect_ex", p(false)), i.api("vm_graphic_fill_roundrect_ex", p(true));
    let _ = (s) => {
      s.r[0] = t.fillEllipseBuffer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), te(e, n(s, 5)));
    };
    i.api("vm_graphic_fill_ellipse", _), i.api("vm_graphic_fill_ellipse_ex", (s) => {
      s.r[0] = t.fillEllipseBuffer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), t.currentColor);
    });
    let d = (s, f) => s !== 0 && s >= 0 && s <= 65535 ? s & 65535 : s > 65535 ? te(e, s) : $(f >>> 16 & 255, f >>> 8 & 255, f & 255);
    i.api("vm_graphic_gradient_paint_rect", (s) => {
      let f = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((g) => n(s, g));
      s.r[0] = t.gradientPaintRect(f[0], f[1], f[2], f[3], f[4], d(f[5], f[6]), d(f[7], f[8]), f[9]);
    }), i.api("vm_graphic_line", (s) => {
      s.r[0] = t.drawLineBuffer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), te(e, n(s, 5)));
    }), i.api("vm_graphic_line_ex", (s) => {
      let f = n(s, 5);
      s.r[0] = t.drawLineBuffer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), f !== 0 ? te(e, f) : t.currentColor);
    });
    let y = (s) => {
      let f = n(s, 5), g = f !== 0 ? te(e, f) : t.currentColor;
      s.r[0] = t.drawRectBuffer(n(s, 0), n(s, 1), n(s, 2), n(s, 3), n(s, 4), g);
    };
    i.api("vm_graphic_rect", y), i.api("vm_graphic_rect_ex", y);
    let v = (s) => (f) => {
      let g = n(f, 1), w = Math.min(Math.max(n(f, 2), 0), 4096);
      if (g === 0 || w < 3 || !e.isMapped(g, w * 4)) {
        f.r[0] = -1;
        return;
      }
      let A = [], C = [];
      for (let k = 0; k < w; k++) A.push(e.read16(g + k * 4) << 16 >> 16), C.push(e.read16(g + k * 4 + 2) << 16 >> 16);
      f.r[0] = s ? t.fillPolygonOnSurface(n(f, 0), A, C, t.currentColor) : t.strokePolygonOnSurface(n(f, 0), A, C, t.currentColor);
    };
    i.api("vm_graphic_fill_polygon", v(true)), i.api("vm_graphic_polygon", v(false)), i.api("vm_graphic_set_pixel", (s) => {
      s.r[0] = t.setPixelOnSurface(n(s, 0), n(s, 1), n(s, 2), te(e, n(s, 3)));
    }), i.api("vm_graphic_set_pixel_ex", (s) => {
      let f = n(s, 3);
      s.r[0] = t.setPixelOnSurface(n(s, 0), n(s, 1), n(s, 2), f !== 0 ? te(e, f) : t.currentColor);
    }), i.api("vm_graphic_get_pixel", (s) => {
      s.r[0] = t.getPixelFromSurface(n(s, 0), n(s, 1), n(s, 2));
    }), i.api("vm_graphic_lock", (s) => {
      s.r[0] = t.screenBufferAddress();
    }), i.api("vm_graphic_unlock", (s) => {
      s.r[0] = 0;
    }), i.api("vm_graphic_getcolor", (s) => {
      s.r[0] = t.currentColor;
    }), i.api("vm_graphic_clear_layer_bg", (s) => {
      s.r[0] = t.clearLayerBg(n(s, 0));
    }), i.api("vm_graphic_is_r2l_state", (s) => {
      s.r[0] = 0;
    }), i.api("vm_graphic_get_frame_number", (s) => {
      s.r[0] = t.flushCount;
    }), i.api("vm_graphic_get_string_baseline", (s) => {
      s.r[0] = Math.max(1, t.characterHeight() * 4 / 5 | 0);
    }), i.api("vm_font_set_font_style", (s) => {
      s.r[0] = 0;
    }), i.api("vm_graphic_set_font", (s) => {
      s.r[0] = t.setFont(n(s, 0));
    }), i.api("vm_font_set_font_size", (s) => {
      s.r[0] = t.setFontSize(n(s, 0));
    }), i.api("vm_graphic_get_character_width", (s) => {
      s.r[0] = t.characterWidth(n(s, 0));
    }), i.api("vm_graphic_get_character_height", (s) => {
      s.r[0] = t.characterHeight();
    }), i.api("vm_graphic_get_character_height_ex", (s) => {
      s.r[0] = t.characterHeight();
    }), i.api("vm_graphic_get_highest_char_height_of_all_language", (s) => {
      s.r[0] = t.highestCharHeight();
    }), i.api("vm_graphic_get_char_baseline_alllang", (s) => {
      s.r[0] = t.charBaseline(n(s, 0));
    }), i.api("vm_graphic_get_character_info", (s) => {
      let f = n(s, 1);
      if (f === 0 || !e.isMapped(f, 20)) {
        s.r[0] = -1;
        return;
      }
      let g = t.characterInfo();
      e.write32(f + 0, g.dwidth, true), e.write32(f + 4, g.width, true), e.write32(f + 8, g.height, true), e.write32(f + 12, g.ascent, true), e.write32(f + 16, g.descent, true), s.r[0] = 0;
    }), i.api("vm_graphic_get_font_height", (s) => {
      s.r[0] = t.characterHeight();
    }), i.api("vm_graphic_measure_character", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = t.characterWidth(f);
      g !== 0 && e.isMapped(g, 2) && e.write16(g, A), w !== 0 && e.isMapped(w, 2) && e.write16(w, t.characterHeight()), s.r[0] = A;
    }), i.api("vm_graphic_get_string_width", (s) => {
      s.r[0] = t.stringWidth(ze(i.readUcs2Compat(n(s, 0))));
    }), i.api("vm_graphic_get_text_width", (s) => {
      s.r[0] = t.stringWidth(ze(i.readUcs2Compat(n(s, 0))));
    }), i.api("vm_graphic_get_string_height", (s) => {
      s.r[0] = t.stringHeight(ze(i.readUcs2Compat(n(s, 0))));
    }), i.api("vm_graphic_textout", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = n(s, 4), C = te(e, n(s, 5)), k = jr(i.readUcs2Compat(n(s, 3)), A, t);
      s.r[0] = t.drawTextBuffer(f, g, w, k.value, k.maxWidth, C);
    }), i.api("vm_graphic_textout_to_layer", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = n(s, 4), C = jr(i.readUcs2Compat(n(s, 3)), A, t);
      s.r[0] = t.drawTextLayer(f, g, w, C.value, C.maxWidth);
    }), i.api("vm_graphic_drawtext", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = n(s, 3), C = n(s, 4), k = ze(i.readUcs2Compat(w, A >= 1 && A <= 256 ? A : 256)), G = C >= 0 && C <= 65535 ? C & 65535 : $(C >>> 16 & 255, C >>> 8 & 255, C & 255);
      s.r[0] = t.drawTextOnTarget(f, g, k, G);
    }), i.api("vm_malloc", (s) => {
      s.r[0] = i.malloc(n(s, 0));
    }), i.api("vm_calloc", (s) => {
      s.r[0] = i.heap.calloc(n(s, 0));
    }), i.api("vm_realloc", (s) => {
      s.r[0] = i.heap.realloc(n(s, 0), n(s, 1));
    }), i.api("vm_free", (s) => {
      i.heap.free(n(s, 0)), s.r[0] = 0;
    });
    let M = 28, S = 0;
    i.api("vm_get_malloc_stat", (s) => {
      if (S === 0 && (S = i.heap.calloc(M), S === 0)) {
        s.r[0] = 0;
        return;
      }
      let f = i.heap, g = f.stats();
      e.write32(S + 0, f.allocationCalls, true), e.write32(S + 4, f.freeCalls, true), e.write32(S + 8, g.allocatedBytes, true), e.write32(S + 12, f.peakAllocatedBytes, true), e.write32(S + 16, f.failedAllocations, true), e.write32(S + 20, f.lastFailedRequest, true), e.write32(S + 24, g.freeBytes, true), s.r[0] = S;
    }), i.api("vm_global_get_max_alloc_size", (s) => {
      s.r[0] = Math.min(i.heap.largestFreeBlock(), 2147483647);
    }), i.api("vm_get_mre_total_mem_size", (s) => {
      s.r[0] = Math.min(i.heap.capacity, 2147483647);
    });
    let T = 65536, R = 8 * 1024 * 1024, E = (s) => s !== 0 && e.isMapped(s, 24);
    i.api("vm_create_dyn_array", (s) => {
      let f = n(s, 0) | 0, g = n(s, 1) | 0, w = n(s, 2) | 0, A = Math.max(f, 1);
      if (w <= 0 || w > T || A > R / w) {
        s.r[0] = 0;
        return;
      }
      let C = i.heap.calloc(A * w), k = i.heap.calloc(24);
      if (C === 0 || k === 0) {
        i.heap.free(C), i.heap.free(k), s.r[0] = 0;
        return;
      }
      e.write32(k + 0, w), e.write32(k + 4, f), e.write32(k + 8, Math.max(g, 1)), e.write32(k + 12, 0), e.write32(k + 16, A), e.write32(k + 20, C), s.r[0] = k;
    });
    let B = (s) => {
      let f = e.read32(s) | 0, g = e.read32(s + 16) | 0, w = e.read32(s + 20) | 0;
      if ((e.read32(s + 12) | 0) < g) return w;
      let A = g + Math.max(e.read32(s + 8) | 0, 1);
      if (A * f > R) return 0;
      let C = i.heap.realloc(w, A * f);
      return C === 0 ? 0 : (e.fillBytes(C + g * f, 0, (A - g) * f), g = A, w = C, e.write32(s + 16, g), e.write32(s + 20, w), w);
    };
    i.api("vm_dyn_array_add", (s) => {
      let f = n(s, 0), g = n(s, 1);
      if (!E(f) || g === 0) {
        s.r[0] = -1;
        return;
      }
      let w = e.read32(f) | 0;
      if (!e.isMapped(g, w)) {
        s.r[0] = -1;
        return;
      }
      let A = B(f);
      if (A === 0) {
        s.r[0] = -1;
        return;
      }
      let C = e.read32(f + 12) | 0;
      e.copyBytes(g, A + C * w, w), e.write32(f + 12, C + 1), s.r[0] = 0;
    }), i.api("vm_dyn_array_del", (s) => {
      let f = n(s, 0), g = n(s, 1) | 0;
      if (!E(f)) {
        s.r[0] = -1;
        return;
      }
      let w = e.read32(f) | 0, A = e.read32(f + 12) | 0, C = e.read32(f + 20) | 0;
      if (g < 0 || g >= A) {
        s.r[0] = -1;
        return;
      }
      g + 1 < A && e.copyBytes(C + (g + 1) * w, C + g * w, (A - g - 1) * w), e.write32(f + 12, A - 1), s.r[0] = 0;
    }), i.api("vm_dyn_array_del_all", (s) => {
      let f = n(s, 0);
      if (!E(f)) {
        s.r[0] = -1;
        return;
      }
      e.write32(f + 12, 0), s.r[0] = 0;
    }), i.api("vm_free_dyn_array", (s) => {
      let f = n(s, 0);
      E(f) && i.heap.free(e.read32(f + 20) | 0), i.heap.free(f), s.r[0] = 0;
    });
    let L = 1, P = 15, I = 1;
    i.api("vm_pmng_get_current_handle", (s) => {
      s.r[0] = L;
    }), i.api("vm_pmng_get_app_handle", (s) => {
      s.r[0] = L;
    }), i.api("vm_pmng_state", (s) => {
      let f = n(s, 0) | 0;
      s.r[0] = f === L || f === P ? I : 0;
    }), i.api("vm_pmng_set_bg", (s) => {
      s.r[0] = 0;
    }), i.api("vm_pmng_get_handle", (s) => {
      var _a;
      let f = i.readUcs2Compat(n(s, 0), 260).toLowerCase(), g = i.rawExecutableName.toLowerCase(), w = (_a = f.split(/[\\/]/).pop()) != null ? _a : f;
      s.r[0] = w.length > 0 && g.endsWith(w) ? L : 0;
    });
    let D = (s) => (f) => {
      i[s] = n(f, 0), f.r[0] = 0;
    };
    i.api("vm_reg_sysevt_callback", D("systemCallback")), i.api("vm_reg_system_event_callback", D("systemCallback")), i.api("vm_reg_sm_callback", D("smCallback")), i.api("vm_reg_keyboard_callback", (s) => {
      i.keyboardCallback = n(s, 0), s.r[0] = 0;
    }), i.api("vm_reg_key_callback", (s) => {
      i.keyboardCallback = n(s, 0), s.r[0] = 0;
    }), i.api("vm_reg_pen_callback", (s) => {
      i.penCallback = n(s, 0), s.r[0] = 0;
    }), i.api("vm_reg_touch_callback", (s) => {
      i.penCallback = n(s, 0), s.r[0] = 0;
    }), i.api("vm_exit_app", (s) => {
      i.requestExit(n(s, 0)), s.r[0] = 0;
    });
    let z = (s) => {
      let f = n(s, 0), g = n(s, 1);
      if (g === 0 || i.timers.size >= di) {
        s.r[0] = -1;
        return;
      }
      s.r[0] = i.registerTimer(f, g);
    };
    i.api("vm_create_timer", z), i.api("vm_create_timer_ex", z);
    let Z = (s) => {
      s.r[0] = i.deleteTimer(n(s, 0)) ? 0 : -1;
    };
    i.api("vm_delete_timer", Z), i.api("vm_delete_timer_ex", Z), i.api("vm_get_tick_count", (s) => {
      s.r[0] = Date.now() & 2147483647 | 0;
    }), i.api("vm_get_tick", (s) => {
      s.r[0] = Date.now() & 2147483647 | 0;
    }), i.api("vm_get_time", (s) => {
      let f = /* @__PURE__ */ new Date(), g = n(s, 0);
      if (g !== 0 && e.isMapped(g, 28)) try {
        e.write32(g, f.getFullYear() - 1900), e.write32(g + 4, f.getMonth()), e.write32(g + 8, f.getDate()), e.write32(g + 12, f.getHours()), e.write32(g + 16, f.getMinutes()), e.write32(g + 20, f.getSeconds()), s.r[0] = 0;
        return;
      } catch (e2) {
      }
      s.r[0] = -1;
    }), i.api("vm_resource_get_data", (s) => {
      s.r[0] = i.resourceGetData(s);
    }), i.api("vm_resource_get_data_from_file", (s) => {
      s.r[0] = i.resourceGetData(s);
    }), i.api("vm_resource_init", (s) => {
      s.r[0] = i.resourceBlobSize > 0 ? 0 : -1;
    }), i.api("vm_res_init", (s) => {
      s.r[0] = i.resourceBlobSize > 0 ? 0 : -1;
    }), i.api("vm_load_resource", (s) => {
      s.r[0] = i.loadNamedResource(n(s, 0), n(s, 1));
    }), i.api("vm_res_load", (s) => {
      s.r[0] = i.loadNamedResource(n(s, 0), n(s, 1));
    }), i.api("vm_res_delete", (s) => {
      s.r[0] = i.resourceDelete(n(s, 0));
    }), i.api("vm_res_deinit", (s) => {
      s.r[0] = 0;
    }), i.api("vm_get_resource_offset", (s) => {
      s.r[0] = i.resourceFind(i.readResourceNameCompat(n(s, 0)));
    }), i.api("vm_get_res_header", (s) => {
      s.r[0] = 0;
    });
    let ge = (s) => {
      if (s === 0 || !e.isMapped(s, 6)) return false;
      let f = i.readUcs2Compat(s, 260);
      return f.length >= 2 && f[1] === ":" && (f[0] === "C" || f[0] === "E" || f[0] === "c" || f[0] === "e");
    };
    i.api("vm_get_resource_offset_from_file", (s) => {
      let f = n(s, 0), g = n(s, 1), w = ge(f) ? f : ge(g) ? g : 0;
      if (w === 0) {
        s.r[0] = -1;
        return;
      }
      let A = w === f ? g : f, C = r.readAll(i.readUcs2Compat(w, 512));
      if (C === null) {
        s.r[0] = -1;
        return;
      }
      let k = i.readResourceNameCompat(A), G = Ne(C).find((V) => V.name === k);
      s.r[0] = G ? G.offset : -1;
    }), i.api("vm_is_support_wifi", (s) => {
      s.r[0] = 0;
    }), i.api("vm_wifi_is_connected", (s) => {
      s.r[0] = 0;
    }), i.api("vm_has_sim_card", (s) => {
      s.r[0] = 1;
    }), i.api("vm_get_sim_card_status", (s) => {
      s.r[0] = 1;
    }), i.api("vm_get_language", (s) => {
      s.r[0] = 0;
    }), i.api("vm_get_language_ssc", (s) => {
      s.r[0] = 0;
    }), i.api("vm_send_sms", (s) => {
      s.r[0] = -1;
    }), i.api("vm_vibrator_once", (s) => {
      s.r[0] = 0;
    }), i.api("vm_switch_power_saving_mode", (s) => {
      s.r[0] = 0;
    }), i.api("vm_get_exec_filename", (s) => {
      let f = n(s, 0), g = i.rawExecutableName;
      if (f === 0 || !e.isMapped(f, g.length + 1)) {
        s.r[0] = -1;
        return;
      }
      try {
        for (let w = 0; w < g.length; w++) e.write8(f + w, g.charCodeAt(w) & 127);
        e.write8(f + g.length, 0), s.r[0] = 0;
      } catch (e2) {
        s.r[0] = -1;
      }
    }), i.api("vm_get_disk_free_space", (s) => {
      let f = n(s, 0), g = f !== 0 && e.isMapped(f, 2) ? i.readUcs2Compat(f, 260) : "C:\\";
      s.r[0] = Math.min(r.freeSpace(g), 2147483647) | 0;
    }), i.api("vm_get_vm_tag", (s) => {
      s.r[0] = 0;
    }), i.api("vm_log_info", (s) => {
      s.r[0] = 0;
    }), i.api("vm_log_error", (s) => {
      s.r[0] = 0;
    }), i.api("_vm_log_info", (s) => {
      s.r[0] = 0;
    }), i.api("_vm_log_error", (s) => {
      s.r[0] = 0;
    }), i.api("vm_app_log", (s) => {
      s.r[0] = 0;
    }), i.api("vm_get_sys_scene", (s) => {
      s.r[0] = 0;
    }), i.api("vm_get_system_driver", (s) => {
      s.r[0] = 67;
    }), i.api("vm_get_removeable_driver", (s) => {
      s.r[0] = 69;
    }), i.api("vm_get_removable_driver", (s) => {
      s.r[0] = 69;
    }), i.api("vm_get_imei", (s) => {
      s.r[0] = i.systemAscii("imei", "000000000000000");
    }), i.api("vm_get_imsi", (s) => {
      s.r[0] = i.systemAscii("imsi", "001010000000000");
    }), i.api("vm_query_operator_code", (s) => {
      let f = n(s, 0), g = "00101";
      if (f !== 0 && e.isMapped(f, g.length + 1)) {
        for (let w = 0; w < g.length; w++) e.write8(f + w, g.charCodeAt(w));
        e.write8(f + g.length, 0), s.r[0] = 0;
      } else s.r[0] = -1;
    }), i.api("vm_sim_get_active_sim_card", (s) => {
      s.r[0] = 0;
    }), i.api("vm_set_active_sim_card", (s) => {
      s.r[0] = 0;
    }), i.api("vm_is_support_pen_touch", (s) => {
      s.r[0] = 1;
    }), i.api("vm_is_finger_touch_version", (s) => {
      s.r[0] = 1;
    }), i.api("vm_is_figner_touch_version", (s) => {
      s.r[0] = 1;
    }), i.api("vm_is_support_keyborad", (s) => {
      s.r[0] = 1;
    }), i.api("vm_get_key_tone_state", (s) => {
      s.r[0] = 0;
    }), i.api("vm_appmgr_get_installed_list", (s) => {
      let f = n(s, 2);
      f !== 0 && e.isMapped(f, 4) && e.write32(f, 0), s.r[0] = 0;
    }), i.api("vm_appmgr_get_install_info", (s) => {
      let f = n(s, 1);
      if (f !== 0 && e.isMapped(f, 64)) for (let g = 0; g < 64; g++) e.write8(f + g, 0);
      s.r[0] = -1;
    }), i.api("vm_wstrcpy", (s) => {
      let f = n(s, 0), g = n(s, 1);
      if (f !== 0 && g !== 0) {
        let w = g, A = f;
        for (; e.isMapped(w, 2) && e.isMapped(A, 2); ) {
          let C = e.read16(w);
          if (e.write16(A, C), w += 2, A += 2, C === 0) break;
        }
      }
      s.r[0] = f;
    }), i.api("vm_wstrncpy", (s) => {
      let f = n(s, 0), g = n(s, 1), w = Math.min(Math.max(n(s, 2), 0), 4096);
      if (f !== 0 && g !== 0) {
        let A = 0;
        for (; A < w && e.isMapped(g + A * 2, 2) && e.isMapped(f + A * 2, 2); ) {
          let C = e.read16(g + A * 2);
          if (e.write16(f + A * 2, C), C === 0) break;
          A++;
        }
        for (; A < w && e.isMapped(f + A * 2, 2); ) e.write16(f + A * 2, 0), A++;
      }
      s.r[0] = f;
    }), i.api("vm_wstrcat", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = g >= 4096 && e.isMapped(g, 2), C = A ? g : w, k = A ? 0 : g;
      if (f === 0 || C === 0) {
        s.r[0] = f;
        return;
      }
      let G = f, V = 0;
      for (; V < 4096 && e.isMapped(G, 2) && e.read16(G) !== 0; ) G += 2, V++;
      let J = k > 0 ? f + k : Number.MAX_SAFE_INTEGER, Re = C, q = G;
      for (; q + 2 <= J && e.isMapped(Re, 2) && e.isMapped(q, 2); ) {
        let H = e.read16(Re);
        if (e.write16(q, H), Re += 2, q += 2, H === 0) break;
      }
      s.r[0] = f;
    }), i.api("vm_wstrcmp", (s) => {
      let f = n(s, 0), g = n(s, 1), w = 0;
      if (f !== 0 && g !== 0) {
        let A = 0;
        for (; A < 8192 && e.isMapped(f + A, 2) && e.isMapped(g + A, 2); ) {
          let C = e.read16(f + A), k = e.read16(g + A);
          if (C !== k) {
            w = C - k;
            break;
          }
          if (C === 0) break;
          A += 2;
        }
      }
      s.r[0] = w;
    });
    let ne = 4096, _e = 65536, De = new Float64Array(1), Ce = new Uint32Array(De.buffer), pt = (s) => s.replace(/e([+-])(\d)$/, "e$10$2"), Xt = (s) => {
      let f = s.indexOf("e");
      if (f < 0) return s;
      let g = s.slice(0, f), w = s.slice(f);
      return g.includes(".") && (g = g.replace(/0+$/, "").replace(/\.$/, "")), g + w;
    }, Kt = (s) => s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s, nn = (s, f) => {
      if (!Number.isFinite(s)) return Number.isNaN(s) ? "NaN" : s > 0 ? "Infinity" : "-Infinity";
      if (s === 0) return Kt(s.toPrecision(f));
      let g = Math.floor(Math.log10(Math.abs(s)));
      if (g < -4 || g >= f) return Xt(pt(s.toExponential(f - 1)));
      let w = s.toPrecision(f);
      return w.includes("e") ? Xt(pt(w)) : Kt(w);
    };
    i.api("vm_vsprintf", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2);
      if (f === 0 || g === 0 || !e.isMapped(f, 1) || !e.isMapped(g, 1)) {
        s.r[0] = -1;
        return;
      }
      let A = () => {
        try {
          return e.read8(g);
        } catch (e2) {
          return 0;
        }
      }, C = () => {
        let H = A();
        return g += 1, H;
      }, k = () => {
        let H = 0;
        try {
          H = e.read32(w);
        } catch (e2) {
          H = 0;
        }
        return w += 4, H;
      }, G = () => {
        (w & 7) !== 0 && (w += 4);
        let H = 0, ye = 0;
        try {
          H = e.read32(w) >>> 0, ye = e.read32(w + 4) >>> 0;
        } catch (e2) {
          H = 0, ye = 0;
        }
        return w += 8, Ce[0] = H, Ce[1] = ye, De[0];
      }, V = () => {
        let H = 0;
        for (; A() >= 48 && A() <= 57; ) H < ne ? H = H * 10 + (C() - 48) : C();
        return Math.min(H, ne);
      }, J = "", Re = 0;
      for (; Re++ < ne && J.length < _e; ) {
        let H = C();
        if (H === 0) break;
        if (H !== 37) {
          J += String.fromCharCode(H);
          continue;
        }
        let ye = false, qt = false, jt = false, He = false, Qt = false;
        for (; ; ) {
          let W = A();
          if (W === 45) ye = true;
          else if (W === 43) qt = true;
          else if (W === 32) jt = true;
          else if (W === 48) He = true;
          else if (W === 35) Qt = true;
          else break;
          g += 1;
        }
        let Ge = -1;
        A() === 42 ? (g += 1, Ge = Math.min(Math.max(k(), 0), ne)) : A() >= 48 && A() <= 57 && (Ge = V());
        let X = -1;
        for (A() === 46 && (g += 1, A() === 42 ? (g += 1, X = Math.min(Math.max(k(), 0), ne)) : A() >= 48 && A() <= 57 ? X = V() : X = 0); "lLhqztj".includes(String.fromCharCode(A())); ) g += 1;
        let Jt = C(), ie = String.fromCharCode(Jt), er = "diuoxX".includes(ie), sn = "fFeEgG".includes(ie), F;
        switch (ie) {
          case "d":
          case "i":
            F = String(k() | 0);
            break;
          case "u":
            F = String(k() >>> 0);
            break;
          case "x":
            F = (k() >>> 0).toString(16);
            break;
          case "X":
            F = (k() >>> 0).toString(16).toUpperCase();
            break;
          case "o":
            F = (k() >>> 0).toString(8);
            break;
          case "c":
            F = String.fromCharCode(k() & 255);
            break;
          case "s": {
            let W = k();
            W === 0 ? F = "(null)" : (F = e.readCString(W, (X >= 0 ? X : ne) + 1), X >= 0 && F.length > X && (F = F.slice(0, X)));
            break;
          }
          case "p":
            F = "0x" + (k() >>> 0).toString(16);
            break;
          case "f":
          case "F": {
            let W = X >= 0 ? X : 6;
            F = G().toFixed(Math.min(W, 100)), ie === "F" && (F = F.toUpperCase());
            break;
          }
          case "e":
          case "E": {
            let W = X >= 0 ? X : 6;
            F = pt(G().toExponential(Math.min(W, 100))), ie === "E" && (F = F.toUpperCase());
            break;
          }
          case "g":
          case "G": {
            let W = X >= 0 ? X === 0 ? 1 : X : 6;
            F = nn(G(), W), ie === "G" && (F = F.toUpperCase());
            break;
          }
          case "%":
            F = "%";
            break;
          default:
            F = "%" + ie;
            break;
        }
        !er && !sn && (He = false);
        let ke = "";
        (ie === "d" || ie === "i") && (F.startsWith("-") ? (F = F.slice(1), ke = "-") : qt ? ke = "+" : jt && (ke = " ")), er && X >= 0 && (F = F.padStart(X, "0"), He = false), Qt && F !== "" && F !== "0" && (F = Jt === 111 ? "0" + F : "0" + ie + F);
        let ue = ke + F;
        if (Ge > ue.length) {
          let W = Ge - ue.length;
          ye ? ue = ue + " ".repeat(W) : He ? ue = ke + "0".repeat(W) + F : ue = " ".repeat(W) + ue;
        }
        J += ue;
      }
      let q = 0;
      for (; q < J.length && e.isMapped(f + q, 1); ) e.write8(f + q, J.charCodeAt(q) & 255), q += 1;
      e.isMapped(f + q, 1) && e.write8(f + q, 0), s.r[0] = q;
    }), i.api("vm_asyn_http_req", (s) => {
      s.r[0] = -1;
    }), i.api("vm_cancel_asyn_http_req", (s) => {
      s.r[0] = -1;
    }), i.api("vm_open_wap_url", (s) => {
      s.r[0] = -1;
    }), i.api("vm_get_filename", (s) => {
      let f = i.guestFilename(i.readUcs2Compat(n(s, 0), 512));
      s.r[0] = f !== null && i.writeUcs2(n(s, 1), f) ? 0 : -1;
    }), i.api("vm_get_path", (s) => {
      let f = i.guestParentPath(i.readUcs2Compat(n(s, 0), 512));
      s.r[0] = f !== null && i.writeUcs2(n(s, 1), f) ? 0 : -1;
    }), i.api("vm_get_default_folder_path", (s) => {
      let f = n(s, 0), g = n(s, 1), w = f !== 0 && e.isMapped(f, 2) ? f : g !== 0 && e.isMapped(g, 2) ? g : 0;
      if (w === 0) {
        s.r[0] = -1;
        return;
      }
      let A = (w === f ? g : f) & 255;
      s.r[0] = i.writeUcs2(w, i.guestDefaultFolderPath(A === 69 || A === 101 ? "E" : "C")) ? 0 : -1;
    });
    let Y = (s, f = 512) => i.readUcs2Compat(s, f), xe = (s, f) => {
      if (s === 0 || !e.isMapped(s, 4)) return false;
      try {
        return e.write32(s, f | 0), true;
      } catch (e2) {
        return false;
      }
    }, Yt = (s, f) => s === null || s > 4294967295 || !xe(f, s) ? -1 : 0;
    i.api("vm_file_open", (s) => {
      s.r[0] = r.open(Y(n(s, 0)), n(s, 1));
    }), i.api("vm_file_close", (s) => {
      s.r[0] = r.close(n(s, 0));
    }), i.api("vm_file_commit", (s) => {
      s.r[0] = r.commit(n(s, 0));
    }), i.api("vm_file_getfilesize", (s) => {
      s.r[0] = Yt(r.size(n(s, 0)), n(s, 1));
    }), i.api("vm_file_get_file_size", (s) => {
      let f = n(s, 0), g = r.size(f);
      if (g === null) {
        let w = Y(f);
        g = w.trim().length === 0 ? null : r.sizeByPath(w);
      }
      s.r[0] = Yt(g, n(s, 1));
    }), i.api("vm_file_read", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = n(s, 3), C = w >= 0 && w <= 33554432 && (w === 0 || g !== 0 && e.isMapped(g, w)) && (A === 0 || e.isMapped(A, 4)), k = null;
      if (C) try {
        k = r.read(f, w);
      } catch (e2) {
        k = null;
      }
      if (k === null) {
        xe(A, 0), s.r[0] = -1;
        return;
      }
      try {
        k.length > 0 && e.writeBytes(g, k), xe(A, k.length), s.r[0] = 0;
      } catch (e2) {
        xe(A, 0), s.r[0] = -1;
      }
    }), i.api("vm_file_write", (s) => {
      let f = n(s, 0), g = n(s, 1), w = n(s, 2), A = n(s, 3), C = w >= 0 && w <= 33554432 && (w === 0 || g !== 0 && e.isMapped(g, w)) && (A === 0 || e.isMapped(A, 4)), k = -1;
      if (C) try {
        k = r.write(f, w === 0 ? new Uint8Array(0) : e.readBytes(g, w));
      } catch (e2) {
        k = -1;
      }
      xe(A, Math.max(0, k)), s.r[0] = k >= 0 ? 0 : -1;
    }), i.api("vm_file_seek", (s) => {
      s.r[0] = r.seek(n(s, 0), n(s, 1), n(s, 2)) !== null ? 0 : -1;
    }), i.api("vm_file_tell", (s) => {
      let f = r.tell(n(s, 0));
      s.r[0] = f !== null && f <= 2147483647 ? f | 0 : -1;
    }), i.api("vm_file_is_eof", (s) => {
      let f = r.isEof(n(s, 0));
      s.r[0] = f === null ? -1 : f ? 1 : 0;
    }), i.api("vm_file_get_attributes", (s) => {
      s.r[0] = r.attributes(Y(n(s, 0)));
    }), i.api("vm_file_set_attributes", (s) => {
      s.r[0] = r.setAttributes(Y(n(s, 0)), n(s, 1));
    }), i.api("vm_file_mkdir", (s) => {
      s.r[0] = r.mkdir(Y(n(s, 0)));
    }), i.api("vm_file_delete", (s) => {
      s.r[0] = r.delete(Y(n(s, 0)));
    }), i.api("vm_file_rmdir", (s) => {
      s.r[0] = r.rmdir(Y(n(s, 0)));
    }), i.api("vm_file_rename", (s) => {
      s.r[0] = r.rename(Y(n(s, 0)), Y(n(s, 1)));
    }), i.api("vm_file_copy", (s) => {
      s.r[0] = r.copy(Y(n(s, 0)), Y(n(s, 1)));
    }), i.api("vm_file_copy_abort", (s) => {
      s.r[0] = 0;
    }), i.api("vm_file_get_modify_time", (s) => {
      let f = r.modifyTimeSeconds(Y(n(s, 0))), g = n(s, 1);
      if (f === null || f > 4294967295) {
        s.r[0] = -1;
        return;
      }
      if (g === 0) {
        s.r[0] = f | 0;
        return;
      }
      s.r[0] = xe(g, f) ? 0 : -1;
    }), i.api("vm_find_first", (s) => {
      let f = Y(n(s, 0)), g = n(s, 1), w = r.findFirst(f);
      if (w === null || g === 0 || !i.writeUcs2(g, w.name)) {
        w !== null && r.findClose(w.handle), s.r[0] = -1;
        return;
      }
      s.r[0] = w.handle;
    }), i.api("vm_find_next", (s) => {
      let f = r.findNext(n(s, 0));
      s.r[0] = f !== null && i.writeUcs2(n(s, 1), f) ? 0 : -1;
    }), i.api("vm_find_close", (s) => {
      s.r[0] = r.findClose(n(s, 0));
    }), i.api("vm_sm_set_sb_by_ptr", (s) => {
      s.r[0] = 0;
    }), i.api("vm_sm_reset_sb", (s) => {
      s.r[0] = 0;
    }), i.api("vm_sm_set_sb_for_invoker", (s) => {
      s.r[0] = 0;
    }), i.api("srand", (s) => {
      i.cRandState = n(s, 0) >>> 0, s.r[0] = 0;
    }), i.api("rand", (s) => {
      i.cRandState = (Math.imul(1103515245, i.cRandState) >>> 0) + 12345 >>> 0, s.r[0] = i.cRandState >>> 16 & 32767;
    }), i.api("strtoi", (s) => {
      let f = n(s, 0), g = "";
      try {
        g = f !== 0 ? e.readCString(f, 128) : "";
      } catch (e2) {
        g = "";
      }
      let w = g.replace(/^\s+/, ""), A = 1;
      w.startsWith("-") ? (A = -1, w = w.slice(1)) : w.startsWith("+") && (w = w.slice(1));
      let C = /^0x/i.test(w) ? 16 : 10;
      C === 16 && (w = w.slice(2));
      let k = 0, G = false;
      for (let V = 0; V < w.length; V++) {
        let J = pi(w[V], C);
        if (J < 0) break;
        G = true, k = (Math.imul(k, C) >>> 0) + J >>> 0;
      }
      s.r[0] = G ? (A === -1 ? -k : k) | 0 : 0;
    }), i.api("vm_ascii_to_ucs2", (s) => {
      s.r[0] = i.asciiToUcs2Compat(s);
    }), i.api("vm_gb2312_to_ucs2", (s) => {
      s.r[0] = i.gbToUcs2Compat(s);
    }), i.api("vm_ucs2_to_ascii", (s) => {
      s.r[0] = i.ucs2ToAsciiCompat(s);
    }), i.api("vm_ucs2_to_gb2312", (s) => {
      s.r[0] = i.ucs2ToAsciiCompat(s);
    }), i.api("vm_ucs2_string", (s) => {
      s.r[0] = i.narrowToUcs2Compat(s);
    }), i.api("vm_chset_convert", (s) => {
      s.r[0] = i.charsetConvertCompat(s);
    }), i.api("vm_wstrlen", (s) => {
      let f = n(s, 0);
      if (f === 0) {
        s.r[0] = 0;
        return;
      }
      let g = 0;
      try {
        for (; g < 4096 && e.read16(f + g * 2) !== 0; ) g++;
      } catch (e2) {
        g = 0;
      }
      s.r[0] = g;
    });
    i.api("vm_midi_play_by_bytes", (s) => {
      let p2 = n(s, 0) >>> 0, len = n(s, 1) >>> 0, loop = n(s, 2) | 0;
      let data = null;
      try {
        data = Array.prototype.slice.call(e.readBytes(p2, Math.min(len, 1048576)));
      } catch (err) {
        data = null;
      }
      if (data && data.length > 0) self.postMessage({ type: "midi", bytes: data, loop: loop !== 0 });
      s.r[0] = 0;
    });
    i.api("vm_midi_stop", (s) => {
      self.postMessage({ type: "midi-stop" });
      s.r[0] = 0;
    });
    i.api("vm_midi_stop_all", (s) => {
      self.postMessage({ type: "midi-stop" });
      s.r[0] = 0;
    });
    i.api("vm_midi_pause", (s) => {
      self.postMessage({ type: "midi-pause" });
      s.r[0] = 0;
    });
    i.api("vm_midi_resume", (s) => {
      self.postMessage({ type: "midi-resume" });
      s.r[0] = 0;
    });
    i.api("vm_midi_play_by_bytes_ex", (s) => {
      let p2 = n(s, 0) >>> 0, len = n(s, 1) >>> 0, loop = n(s, 2) | 0;
      let data = null;
      try {
        data = Array.prototype.slice.call(e.readBytes(p2, Math.min(len, 1048576)));
      } catch (err) {
        data = null;
      }
      if (data && data.length > 0) self.postMessage({ type: "midi", bytes: data, loop: loop !== 0 });
      s.r[0] = 0;
    });
    for (let s of ["vm_audio_play_file", "vm_audio_play_file_ex", "vm_audio_play_bytes", "vm_audio_play_bytes_no_block", "vm_audio_stop", "vm_audio_stop_all", "vm_audio_pause", "vm_audio_resume", "vm_audio_duration", "vm_audio_bytes_duration", "vm_audio_get_time", "vm_audio_is_app_playing", "vm_audio_set_volume_type", "vm_audio_register_interrupt_callback", "vm_audio_clear_interrupt_callback", "vm_audio_resume_bg_play", "vm_audio_suspend_bg_play", "vm_audio_terminate_background_play", "vm_midi_get_time", "vm_set_volume"]) i.api(s, (f) => {
      f.r[0] = 0;
    });
  }
  function pi(i, e) {
    let t = i.charCodeAt(0), r = t >= 48 && t <= 57 ? t - 48 : t >= 97 && t <= 122 ? t - 97 + 10 : t >= 65 && t <= 90 ? t - 65 + 10 : -1;
    return r < e ? r : -1;
  }
  function ht(i) {
    return i === -1 || i === 4294967295 ? -1 : i >= 0 && i <= 65535 ? i : -1;
  }
  function mt(i, e, t) {
    let r = i.gfx;
    if (t <= 0) return r.activeLayerHandle === -1 ? [] : [r.activeLayerHandle];
    let n = Math.min(t, 64);
    if (n === 1 && r.layer(e)) return [e];
    if (!i.mem.isMapped(e, n * 4)) return r.layer(e) ? [e] : [];
    let a = [];
    for (let o = 0; o < n; o++) a.push(i.mem.read32(e + o * 4) | 0);
    return a;
  }
  function ze(i) {
    let e = i.length;
    for (; e > 0 && i.charCodeAt(e - 1) < 32; ) e--;
    return e === i.length ? i : i.slice(0, e);
  }
  function jr(i, e, t) {
    let r = ze(i);
    if (e <= 0) return { value: r, maxWidth: Number.MAX_SAFE_INTEGER };
    let n = t.stringWidth(r);
    return e <= r.length + 1 && e < n ? { value: r.slice(0, Math.min(e, r.length)), maxWidth: Number.MAX_SAFE_INTEGER } : { value: r, maxWidth: e };
  }
  function te(i, e) {
    return e >= 0 && e <= 65535 ? e & 65535 : e >= 1048576 && i.isMapped(e, 2) ? Jr(i, e) : e & 65535;
  }
  function Jr(i, e) {
    if (!i.isMapped(e, 2)) return e & 65535;
    let t = i.read16(e);
    if (i.isMapped(e, 4) && i.read16(e + 2) !== 0) {
      let r = i.read8(e), n = i.read8(e + 1), a = i.read8(e + 2), o = i.read8(e + 3);
      if ((r === 255 || r === 0) && (n !== 0 || a !== 0 || o !== 0)) return $(n, a, o);
    }
    return t;
  }
  function Zt(i, e) {
    if (e.staticBase === null) return;
    let t = i.mem, r = i.cpu, n = e.staticBase;
    r.r[9] = n, r.r[13] = 68157184;
    let a = r.r[13] - 8 | 0;
    t.write32(a, 0, true), t.write32(a + 4, 16842748, true), t.write32(n - 128, a, true), t.write32(n - 124, i.resolverAddress, true);
  }
  function en(i) {
    let e = i.mem, t = i.cpu, r = 805306624, n = t.r[13] - 8 | 0;
    e.write32(n, 0, true), e.write32(n + 4, 16842748, true), e.write32(r - 128, n, true), e.write32(r - 124, i.resolverAddress, true), e.write32(r - 120, 33554432, true), e.write32(r - 116, 50331648, true), e.write32(r - 112, 1048576, true);
  }
  var Oe = class {
    constructor(e, t, r = 2e7) {
      this.eventsDispatched = 0;
      this.timerCallbacks = 0;
      this.warnings = [];
      this.createDelivered = false;
      this.penDropReported = false;
      this.cpu = e;
      this.rt = t;
      this.maxInsPerCallback = r;
    }
    dispatchOne(e) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
      let t = this.rt;
      if (!(t.exitRequested || this.cpu.halted)) switch (e.kind) {
        case "system": {
          let r = t.entryCallback();
          if (r === 0) return;
          this.cpu.callGuest(r, [(_a = e.message) != null ? _a : 0, (_b = e.param) != null ? _b : 0], this.maxInsPerCallback), this.eventsDispatched++;
          return;
        }
        case "timer": {
          if (!e.callback) return;
          this.cpu.callGuest(e.callback, [(_c = e.timerId) != null ? _c : 0], this.maxInsPerCallback), this.eventsDispatched++, this.timerCallbacks++;
          return;
        }
        case "keyboard": {
          if (t.keyboardCallback === 0) return;
          this.cpu.callGuest(t.keyboardCallback, [(_d = e.eventType) != null ? _d : 0, (_e = e.keyCode) != null ? _e : 0], this.maxInsPerCallback), this.eventsDispatched++;
          return;
        }
        case "pen": {
          if (t.penCallback === 0) {
            this.penDropReported || (this.penDropReported = true, this.warnings.push("pen events dropped: guest registered no pen callback"));
            return;
          }
          this.cpu.callGuest(t.penCallback, [(_f = e.eventType) != null ? _f : 0, (_g = e.x) != null ? _g : 0, (_h = e.y) != null ? _h : 0], this.maxInsPerCallback), this.eventsDispatched++;
          return;
        }
        default: {
          if (!e.callback) return;
          let r = (_i = e.argc) != null ? _i : 0, n = [(_j = e.a0) != null ? _j : 0, (_k = e.a1) != null ? _k : 0, (_l = e.a2) != null ? _l : 0, (_m = e.a3) != null ? _m : 0].slice(0, r);
          this.cpu.callGuest(e.callback, n, this.maxInsPerCallback), this.eventsDispatched++;
        }
      }
    }
    deliverCreatePaint() {
      this.createDelivered || this.rt.entryCallback() === 0 || (this.createDelivered = true, this.dispatchOne({ kind: "system", message: $t, param: 0 }), this.dispatchOne({ kind: "system", message: Wt, param: 0 }));
    }
    start(e, t = true, r = 0) {
      if (e === 0) throw new Error("vm_main/entry address is null");
      if (!t) return;
      let n = () => {
        this.rt.enqueueDueTimers(), this.deliverCreatePaint();
        let o = 0;
        for (; o < 4 && !this.rt.exitRequested && !this.cpu.halted; ) {
          let l = this.rt.pollEvent();
          if (!l) break;
          this.dispatchOne(l), o++;
        }
        return this.rt.exitRequested || this.cpu.halted;
      }, a = r !== 0 ? [r] : [];
      this.cpu.callGuest(e, a, this.maxInsPerCallback, n, 2e5);
    }
    begin() {
      if (this.rt.exitRequested) return false;
      if (this.rt.hasEntryCallback()) this.createDelivered || (this.rt.postSystemEvent($t, 0), this.rt.postSystemEvent(Wt, 0));
      else if (this.warnings.push("vm_main returned without vm_reg_sysevt_callback(); no CREATE/PAINT callback can be delivered"), this.rt.timerCount() === 0) return false;
      return true;
    }
    pumpOnce(e = 4) {
      if (this.rt.exitRequested || this.cpu.halted) return 0;
      this.rt.enqueueDueTimers(), this.deliverCreatePaint();
      let t = 0;
      for (; t < e && !this.rt.exitRequested && !this.cpu.halted; ) {
        let r = this.rt.pollEvent();
        if (!r) break;
        this.dispatchOne(r), t++;
      }
      return t;
    }
    pumpFor(e, t = false) {
      let r = e > 0 ? Date.now() + e : 0, n = e > 0 ? this.rt.nowMs() + e : 0, a = false;
      for (; !this.rt.exitRequested && !this.cpu.halted; ) {
        if (e > 0 && Date.now() >= r) {
          a = true;
          break;
        }
        if (this.pumpOnce() === 0) {
          let l = this.rt.msUntilNextTimer();
          if (l === null) break;
          if (l > 0) {
            if (!t) break;
            let u = l;
            if (e > 0 && (u = Math.min(u, Math.max(0, n - this.rt.nowMs()))), u <= 0) {
              a = true;
              break;
            }
            this.rt.clockOffsetMs += u;
            continue;
          }
        }
      }
      return this.stats(a);
    }
    stats(e = false) {
      return { eventsDispatched: this.eventsDispatched, timerCallbacks: this.timerCallbacks, timedOut: e, warnings: this.warnings.slice() };
    }
  };
  var dt = class {
    constructor(e = 2e7, t = 4) {
      this.mem = new we();
      this.rt = undefined;
      this.loop = null;
      this.backend = "UNKNOWN";
      this.kind = "UNKNOWN";
      this.pkg = "OTHER";
      this.lcdW = 240;
      this.lcdH = 320;
      this.ramKb = 800;
      this.entry = 0;
      this.booted = false;
      this.warnings = [];
      this.cpuHook = null;
      this.maxInsPerCallback = e;
      this.frameBudgetMs = t;
      this.rt = this.newRuntime(this.mem, "app.vxp");
    }
    newRuntime(e, t) {
      var _a;
      let r = new st(e, this.lcdW, this.lcdH);
      return Qr(r), r.rawExecutableName = t, r.stubTrace = (n) => {
        this.warnings.push(`stub API called: ${n}`);
      }, r.errorTrace = (n, a) => {
        this.warnings.push(`api handler threw: ${a instanceof Error ? a.message : String(a)}`);
      }, this.mem = e, this.rt = r, (_a = this.cpuHook) == null ? void 0 : _a.call(this, r.cpu), r;
    }
    load(e, t = "app.vxp") {
      this.warnings = [], this.loop = null, this.booted = false, this.entry = 0;
      let r = Zr(e);
      this.kind = r.kind, this.backend = r.backend;
      let n = sr(r.tags);
      if (this.lcdW = n.w, this.lcdH = n.h, this.ramKb = ir(r.tags), this.pkg = ar(r.tags, e[0] === 127 && e[1] === 69, e[0] === 120), r.backend === "UNKNOWN") return this.fail(0, r.detail || "Unsupported container: no ELF or RAW ARM image found.");
      try {
        if (r.backend === "RAW_ARM") {
          if (r.raw === null) throw new Error("RAW image was not prepared");
          return this.bootRaw(r.raw, t, true);
        }
        if (r.backend === "FLASH_LITE") return this.fail(0, "Flash Lite SWF: backend not ported yet (parser/probe only).");
        if (r.elf === null) throw new Error("ELF image was not prepared");
        return this.bootElf(r.elf, t);
      } catch (a) {
        return this.fail(this.entry, `Boot failed: ${a instanceof Error ? a.message : String(a)}`);
      }
    }
    fail(e, t) {
      return this.result(false, e, t);
    }
    result(e, t, r) {
      var _a, _b;
      let n = this.loop;
      return { ok: e, backend: this.backend, kind: this.kind, pkg: this.pkg, lcdW: this.lcdW, lcdH: this.lcdH, ramKb: this.ramKb, entry: t, instructions: this.rt.cpu.instructions, frames: this.rt.frames, events: (_a = n == null ? void 0 : n.eventsDispatched) != null ? _a : 0, timerCallbacks: (_b = n == null ? void 0 : n.timerCallbacks) != null ? _b : 0, resolved: this.rt.resolvedNames.length, stubbed: this.rt.stubbedNames.length, message: r, warnings: this.warnings.slice(0, 24) };
    }
    bootElf(e, t) {
      var _a, _b;
      let r = ct.parse(e), n = new we(), a = r.load(n), o = this.newRuntime(n, t), l = o.cpu, u = r.vmResSection();
      u !== null && o.installElfVmResources(u.bytes, u.offset);
      let c = r.applyRelocations(n, a, o);
      c.length > 0 && this.warnings.push(`unresolved imports (${c.length}): ${c.slice(0, 12).join(", ")}`);
      let h = r.installImportResolvers(n, a, o.resolverAddress, o);
      for (let E of c) o.stubbedNames.includes(E) || o.stubbedNames.push(E);
      let m = (_a = r.definedSymbolAddress("vm_main", a)) != null ? _a : r.definedSymbolAddress("_vm_main", a), b = m != null ? m : a.entry, x = r.definedSymbolAddress("gcc_entry", a), p = (_b = r.sectionAddress(".init_array", a)) != null ? _b : 0, _ = Math.floor(r.sectionSize(".init_array") / 4), d = m === null && x === null && _ > 0;
      this.entry = b | 0;
      let y = a.staticBase;
      y !== null && (n.write32(y - 120, 33554432, true), n.write32(y - 116, 50331648, true), n.write32(y - 112, 1048576, true));
      let v = x !== null || d;
      v ? (l.reset(a.entry), Zt(o, a), l.callGuest(a.entry, [o.resolverAddress, p, _], this.maxInsPerCallback)) : (l.reset(a.entry), Zt(o, a));
      let M = false;
      if (!v) {
        o.bootstrapSemihostingExitAsReturn = true;
        try {
          let E = h.length > 0 ? [o.resolverAddress] : [];
          l.callGuest(a.entry, E, this.maxInsPerCallback), M = !o.exitRequested && (o.hasEntryCallback() || o.timerCount() > 0);
        } catch (E) {
          this.warnings.push(`ELF entry bootstrap fault: ${E instanceof Error ? E.message : String(E)}`);
        } finally {
          o.bootstrapSemihostingExitAsReturn = false;
        }
      }
      let S = new Oe(l, o, this.maxInsPerCallback);
      this.loop = S, S.start(b, !(M || v), h.length > 0 ? o.resolverAddress : 0);
      let T = S.begin();
      this.booted = T;
      for (let E of S.warnings) this.warnings.push(E);
      r.relocErrors.length > 0 && this.warnings.push(`reloc errors (${r.relocErrors.length}): ${r.relocErrors.slice(0, 8).join(", ")}`);
      let R = `bootstrap=${M ? "entry" : v ? "gcc_entry" : "vm_main"} sysCb=0x${(o.systemCallback >>> 0).toString(16)} keyCb=0x${(o.keyboardCallback >>> 0).toString(16)} penCb=0x${(o.penCallback >>> 0).toString(16)} timers=${o.timerCount()} slots=${h.length} exit=${o.exitRequested ? 1 : 0} halted=${l.halted ? 1 : 0}${tn(l)}`;
      return T ? this.result(true, this.entry, `Boot ELF_ARM: kind=${this.kind} pkg=${this.pkg} lcd=${this.lcdW}x${this.lcdH} entry=0x${(this.entry >>> 0).toString(16)} ins=${l.instructions} frames=${o.frames} ${R}`) : this.result(false, this.entry, `ELF_ARM did not start after bootstrap: ${R} ins=${l.instructions} frames=${o.frames}`);
    }
    bootRaw(e, t, r) {
      var _a;
      let n = (_a = e.vmMainOffset) != null ? _a : 0, a = new we(), o = r ? Xe(e.code.length + e.initialData.length + 4096, 4096) : Xe(e.code.length, 4096);
      a.map(268435456, Math.max(o, 4096), true, true, true), a.writeBytes(268435456, e.code, 0, e.code.length, true), r && e.initialData.length > 0 && a.writeBytes(268435456 + e.code.length | 0, e.initialData, 0, e.initialData.length, true);
      let l = Math.max(e.initialData.length, e.dataSizeHint), u = Math.max(e.bssSizeHint, 16384), c = Xe(256 + l + u + 16384, 4096);
      a.map(805306368, c, true, true, false), e.initialData.length > 0 && a.writeBytes(805306624, e.initialData), a.write32(805306624, 805306624, true);
      let h = this.newRuntime(a, t);
      h.installRawResources(e.resources), a.write32(805306624 + e.resolverSlotOffset | 0, h.resolverAddress, true);
      let m = 268435456 + n | 0;
      this.entry = m;
      let b = h.cpu, x = false;
      if (r) try {
        b.reset(268435456), b.r[9] = 805306624, en(h), h.bootstrapSemihostingExitAsReturn = true;
        try {
          b.callGuest(268435456, [], this.maxInsPerCallback);
        } finally {
          h.bootstrapSemihostingExitAsReturn = false;
        }
        x = !h.exitRequested && (h.hasEntryCallback() || h.timerCount() > 0);
      } catch (y) {
        this.warnings.push(`RAW ARMCC bootstrap fallback: ${y instanceof Error ? y.message : String(y)}`);
      } finally {
        h.bootstrapSemihostingExitAsReturn = false;
      }
      if (r && !x) return this.warnings.push("RAW ARMCC bootstrap did not complete; retrying pristine legacy launch"), this.bootRaw(e, t, false);
      let p = new Oe(b, h, this.maxInsPerCallback);
      this.loop = p, x ? p.start(m, false) : (e.initialData.length > 0 && a.writeBytes(805306624, e.initialData, 0, e.initialData.length, true), a.write32(805306624, 805306624, true), a.write32(805306624 + e.resolverSlotOffset | 0, h.resolverAddress, true), b.reset(m), b.r[9] = 805306624, p.start(m, true));
      let _ = p.begin();
      this.booted = _;
      for (let y of p.warnings) this.warnings.push(y);
      let d = `bootstrap=${x} vmMain=0x${(m >>> 0).toString(16)} sysCb=0x${(h.systemCallback >>> 0).toString(16)} keyCb=0x${(h.keyboardCallback >>> 0).toString(16)} penCb=0x${(h.penCallback >>> 0).toString(16)} timers=${h.timerCount()} res=${h.namedResources.length} slot=0x${e.resolverSlotOffset.toString(16)} exit=${h.exitRequested ? 1 : 0} halted=${b.halted ? 1 : 0}${tn(b)}`;
      return _ ? this.result(true, this.entry, `Boot RAW_ARM: kind=${this.kind} pkg=${this.pkg} lcd=${this.lcdW}x${this.lcdH} ${d} ins=${b.instructions} frames=${h.frames}`) : this.result(false, this.entry, `RAW_ARM did not start after bootstrap: ${d} ins=${b.instructions} frames=${h.frames}`);
    }
    present(e) {
      var _a;
      (_a = this.loop) == null ? void 0 : _a.pumpFor(this.frameBudgetMs), this.rt.gfx.toRgba(e);
    }
    present565(e) {
      var _a;
      (_a = this.loop) == null ? void 0 : _a.pumpFor(this.frameBudgetMs);
      let t = this.rt.gfx.fb565;
      e.set(t.length <= e.length ? t : t.subarray(0, e.length));
    }
    pumpFor(e) {
      var _a;
      (_a = this.loop) == null ? void 0 : _a.pumpFor(e, true);
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
  function tn(i) {
    let e = i.fault;
    return e === null ? "" : ` fault=${e.kind}@0x${(e.pc >>> 0).toString(16)} ${e.detail}`;
  }
  function rn(i, e) {
    let t = null, r = false, n = null, a = null, o = false, l = [], u = (m, b) => {
      let x = m * b;
      for (let p = 0; p < l.length; p++) if (l[p].length >= x) return l.splice(p, 1)[0];
      return new Uint16Array(x);
    }, c = () => {
      if (n = null, o || !t || !r) return;
      let m = u(t.lcdW, t.lcdH);
      t.present565(m);
      let b = t.rt.cpu.fault;
      b && b !== a && (a = b, e({ type: "log", level: "warn", text: `Guest stopped: ${b.kind}@0x${(b.pc >>> 0).toString(16)}` })), e({ type: "frame", px: m, w: t.lcdW, h: t.lcdH, frames: t.rt.frames, fault: b, exit: t.rt.exitReason }, [m.buffer]), n = setTimeout(c, 16);
    }, h = () => {
      n === null && !o && (n = setTimeout(c, 0));
    };
    return { handle(m) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      switch (m.type) {
        case "load": {
          let b = new Uint8Array((_a = m.bytes) != null ? _a : new ArrayBuffer(0));
          t = new i(), a = null;
          let x = t.load(b, (_b = m.name) != null ? _b : "app.vxp");
          e({ type: "boot", result: x }), x.ok && (r = true, h());
          break;
        }
        case "key":
          t == null ? void 0 : t.key((_c = m.ev) != null ? _c : 0, (_d = m.code) != null ? _d : 0);
          break;
        case "pen":
          t == null ? void 0 : t.pen((_e = m.ev) != null ? _e : 0, (_f = m.x) != null ? _f : 0, (_g = m.y) != null ? _g : 0);
          break;
        case "running":
          r = !!m.value, r && h();
          break;
        case "recycle":
          m.px && l.push(m.px);
          break;
        case "stop":
          t == null ? void 0 : t.stop((_h = m.code) != null ? _h : 0);
          break;
        default:
          break;
      }
    }, dispose() {
      o = true, r = false, n !== null && clearTimeout(n), n = null, t = null, l.length = 0;
    } };
  }
  var Vt = self, gi = rn(dt, (i, e) => Vt.postMessage(i, e));
  Vt.onmessage = (i) => gi.handle(i.data);
  Vt.postMessage({ type: "ready" });
})();
