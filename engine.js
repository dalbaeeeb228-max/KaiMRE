// KaiMRE engine (MRE/VXP runtime), readable source.
// Runs inside a Web Worker and is loaded by index.html.
// Compatible with KaiOS 2.5 (Gecko 48): ES2015 syntax only.
// Local names were generated automatically from their kind (fn_, arg_, v_, ...).
// KaiOS 2.5 (Gecko 48) has no Object.getOwnPropertyDescriptors (added in ES2017).
// Provide it before any code captures it.
if (typeof Object.getOwnPropertyDescriptors !== "function") {
  Object.getOwnPropertyDescriptors = function (obj) {
    var out = {};
    var keys = Object.getOwnPropertyNames(obj);
    if (Object.getOwnPropertySymbols) keys = keys.concat(Object.getOwnPropertySymbols(obj));
    for (var i = 0; i < keys.length; i++) {
      out[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return out;
  };
}

function fn_1(arg_13, arg_14) {
  var v_15 = arg_13 < 0 != arg_14 < 0,
    v_16 = arg_13 < 0 ? -arg_13 : arg_13,
    v_17 = arg_14 < 0 ? -arg_14 : arg_14,
    v_18 = Math.floor(v_16 / 65536),
    v_19 = v_16 % 65536,
    v_20 = Math.floor(v_17 / 65536),
    v_21 = v_17 % 65536,
    v_22 = v_19 * v_21,
    v_23 = v_19 * v_20,
    v_24 = v_18 * v_21,
    v_25 = v_18 * v_20,
    v_26 = v_23 + v_24,
    v_27 = v_22 + (v_26 % 65536) * 65536,
    v_28 = v_27 % 4294967296,
    v_29 = Math.floor(v_27 / 4294967296),
    v_30 = v_25 + Math.floor(v_26 / 65536) + v_29;
  if (v_15) {
    var v_31 = v_28 === 0 ? 0 : 1;
    ((v_28 = -v_28 >>> 0), (v_30 = (-v_30 - v_31) >>> 0));
  }
  return [v_30 >>> 0, v_28 >>> 0];
}
// Cyrillic 5x7 glyphs (capitals). Lowercase is looked up as uppercase by the glyph code.
var CYRILLIC_GLYPHS = {
  "А": [14, 17, 17, 31, 17, 17, 17],
  "Б": [15, 16, 16, 30, 17, 17, 15],
  "В": [30, 17, 17, 30, 17, 17, 30],
  "Г": [31, 16, 16, 16, 16, 16, 16],
  "Д": [14, 10, 10, 10, 31, 17, 17],
  "Е": [31, 16, 30, 16, 16, 16, 31],
  "Ё": [10, 31, 16, 30, 16, 16, 31],
  "Ж": [21, 14, 4, 4, 14, 21, 21],
  "З": [14, 17, 1, 3, 1, 17, 14],
  "И": [17, 17, 19, 21, 25, 17, 17],
  "Й": [10, 17, 19, 21, 25, 17, 17],
  "К": [17, 18, 20, 24, 20, 18, 17],
  "Л": [7, 9, 9, 9, 9, 17, 17],
  "М": [17, 27, 21, 21, 17, 17, 17],
  "Н": [17, 17, 17, 31, 17, 17, 17],
  "О": [14, 17, 17, 17, 17, 17, 14],
  "П": [31, 17, 17, 17, 17, 17, 17],
  "Р": [30, 17, 17, 30, 16, 16, 16],
  "С": [14, 17, 16, 16, 16, 17, 14],
  "Т": [31, 4, 4, 4, 4, 4, 4],
  "У": [17, 17, 17, 10, 4, 8, 16],
  "Ф": [4, 14, 21, 21, 21, 14, 4],
  "Х": [17, 17, 10, 4, 10, 17, 17],
  "Ц": [18, 18, 18, 18, 18, 31, 1],
  "Ч": [17, 17, 17, 15, 1, 1, 1],
  "Ш": [21, 21, 21, 21, 21, 21, 31],
  "Щ": [21, 21, 21, 21, 21, 31, 1],
  "Ъ": [24, 8, 8, 14, 9, 9, 14],
  "Ы": [17, 17, 17, 25, 21, 21, 25],
  "Ь": [16, 16, 16, 30, 17, 17, 30],
  "Э": [14, 17, 1, 7, 1, 17, 14],
  "Ю": [22, 21, 21, 28, 21, 21, 22],
  "Я": [15, 17, 17, 15, 5, 9, 17],
};

var v_2 = Object.defineProperty,
  v_3 = Object.defineProperties,
  v_4 = Object.getOwnPropertyDescriptors,
  v_5 = Object.getOwnPropertySymbols,
  v_6 = Object.prototype.hasOwnProperty,
  v_7 = Object.prototype.propertyIsEnumerable,
  v_8 = Math.pow,
  fn_9 = (arg_32, arg_33, arg_34) =>
    arg_33 in arg_32
      ? v_2(arg_32, arg_33, { enumerable: !0, configurable: !0, writable: !0, value: arg_34 })
      : (arg_32[arg_33] = arg_34),
  fn_10 = (arg_35, arg_36) => {
    for (var v_37 in arg_36 || (arg_36 = {}))
      v_6.call(arg_36, v_37) && fn_9(arg_35, v_37, arg_36[v_37]);
    if (v_5)
      for (var v_37b of v_5(arg_36)) v_7.call(arg_36, v_37b) && fn_9(arg_35, v_37b, arg_36[v_37b]);
    return arg_35;
  },
  fn_11 = (arg_38, arg_39) => v_3(arg_38, v_4(arg_39)),
  fn_12 = (arg_40, arg_41, arg_42) =>
    fn_9(arg_40, typeof arg_41 != "symbol" ? arg_41 + "" : arg_41, arg_42);
(() => {
  var obj_43 = {
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
    num_44 = 800,
    num_45 = 240,
    num_46 = 320;
  function fn_47(arg_231, arg_232) {
    return (
      (arg_231[arg_232] |
        (arg_231[arg_232 + 1] << 8) |
        (arg_231[arg_232 + 2] << 16) |
        (arg_231[arg_232 + 3] << 24)) >>>
      0
    );
  }
  function fn_48(arg_233) {
    let obj_234 = { offset: 0, map: new Map(), error: "" },
      v_235 = arg_233.length;
    if (v_235 < 12) return ((obj_234.error = "too-small"), obj_234);
    let v_236 = fn_47(arg_233, v_235 - 12);
    obj_234.offset = v_236;
    let v_237 = v_236,
      num_238 = 4294967295,
      num_239 = 0;
    for (; num_238 !== 0 && num_239++ < 64; ) {
      if (v_237 + 8 > v_235)
        return ((obj_234.error = `truncated@0x${v_237.toString(16)}`), obj_234);
      num_238 = fn_47(arg_233, v_237);
      let v_240 = fn_47(arg_233, v_237 + 4);
      if (((v_237 += 8), num_238 === 0)) break;
      if (v_237 + v_240 > v_235)
        return ((obj_234.error = `oversize id=${num_238} @0x${v_237.toString(16)}`), obj_234);
      (obj_234.map.set(num_238, arg_233.slice(v_237, v_237 + v_240)), (v_237 += v_240));
    }
    return (num_238 !== 0 && (obj_234.error = "no-terminator"), obj_234);
  }
  function fn_49(arg_241, arg_242) {
    let v_243 = arg_241.map.get(arg_242);
    return v_243 && v_243.length === 4 ? fn_47(v_243, 0) : 0;
  }
  function fn_50(arg_244) {
    let v_245 = fn_49(arg_244, obj_43.MEM_REQ);
    return v_245 === 0 ? num_44 : v_245;
  }
  function fn_51(arg_246) {
    let v_247 = fn_49(arg_246, obj_43.RESOLUTION_REQ);
    if (v_247 === 0) return { w: num_45, h: num_46 };
    let v_248 = (v_247 >>> 16) & 65535,
      v_249 = v_247 & 65535;
    return v_248 === 0 || v_249 === 0 || v_248 > 2048 || v_249 > 2048
      ? { w: num_45, h: num_46 }
      : { w: v_248, h: v_249 };
  }
  function fn_52(arg_250) {
    return fn_49(arg_250, obj_43.FILE_TYPE);
  }
  function fn_53(arg_251) {
    return fn_49(arg_251, obj_43.RO_RW_ZIP);
  }
  function fn_54(arg_252, arg_253, arg_254) {
    if (arg_252.error) return "TAGERR";
    let v_255 = fn_52(arg_252);
    return arg_252.map.has(obj_43.FILE_TYPE) && (v_255 === 0 || v_255 === 1 || v_255 === 5)
      ? fn_53(arg_252) !== 0
        ? "ADS_ZIPPED"
        : arg_253
          ? "ADS_ELF"
          : arg_254
            ? "ADS_RAW_ZLIB"
            : "ADS_RAW"
      : arg_253
        ? "GCC_ELF"
        : arg_254
          ? "GCC_ZLIB_ELF"
          : "OTHER";
  }
  var list_55 = [
      3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131,
      163, 195, 227, 258,
    ],
    list_56 = [
      0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0,
    ],
    list_57 = [
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537,
      2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
    ],
    list_58 = [
      0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13,
      13,
    ],
    list_59 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  function fn_60(arg_256, arg_257) {
    if (arg_257 < 0 || arg_257 + 2 > arg_256.length) return !1;
    let v_258 = arg_256[arg_257],
      v_259 = arg_256[arg_257 + 1];
    return (v_258 & 15) === 8 && ((v_258 << 8) + v_259) % 31 === 0;
  }
  function fn_61(arg_260) {
    let num_261 = 1,
      num_262 = 0,
      num_263 = 0;
    for (; num_263 < arg_260.length; ) {
      let v_264 = Math.min(5552, arg_260.length - num_263),
        v_265 = num_263 + v_264;
      for (; num_263 < v_265; num_263++) ((num_261 += arg_260[num_263]), (num_262 += num_261));
      ((num_261 %= 65521), (num_262 %= 65521));
    }
    return ((num_262 << 16) | num_261) >>> 0;
  }
  var v_62 = class {
      constructor(arg_266, arg_267) {
        (fn_12(this, "counts", new Int32Array(16)), fn_12(this, "symbols"));
        for (let num_270 = 0; num_270 < arg_267; num_270++) this.counts[arg_266[num_270]]++;
        this.counts[0] = 0;
        let int32Array_268 = new Int32Array(16),
          num_269 = 0;
        for (let num_271 = 1; num_271 < 16; num_271++)
          ((int32Array_268[num_271] = num_269), (num_269 += this.counts[num_271]));
        this.symbols = new Int32Array(num_269);
        for (let num_272 = 0; num_272 < arg_267; num_272++)
          arg_266[num_272] !== 0 && (this.symbols[int32Array_268[arg_266[num_272]]++] = num_272);
      }
    },
    v_63 = class {
      constructor(arg_273, arg_274) {
        (fn_12(this, "acc", 0),
          fn_12(this, "nbits", 0),
          (this.src = arg_273),
          (this.pos = arg_274));
      }
      bits(arg_275) {
        for (; this.nbits < arg_275; ) {
          if (this.pos >= this.src.length) throw new Error("inflate: input truncated");
          ((this.acc |= this.src[this.pos++] << this.nbits), (this.nbits += 8));
        }
        let v_276 = this.acc & ((1 << arg_275) - 1);
        return ((this.acc >>>= arg_275), (this.nbits -= arg_275), v_276);
      }
      alignByte() {
        ((this.acc = 0), (this.nbits = 0));
      }
      byte() {
        if (this.pos >= this.src.length) throw new Error("inflate: input truncated");
        return this.src[this.pos++];
      }
    };
  function fn_64(arg_277, arg_278) {
    let num_279 = 0,
      num_280 = 0,
      num_281 = 0;
    for (let num_282 = 1; num_282 <= 15; num_282++) {
      num_279 |= arg_277.bits(1);
      let v_283 = arg_278.counts[num_282];
      if (num_279 - v_283 < num_280) return arg_278.symbols[num_281 + (num_279 - num_280)];
      ((num_281 += v_283), (num_280 += v_283), (num_280 <<= 1), (num_279 <<= 1));
    }
    return -1;
  }
  function fn_65(arg_284, arg_285 = 0, arg_286 = 64 * 1024 * 1024) {
    if (!fn_60(arg_284, arg_285) || (arg_284[arg_285 + 1] & 32) !== 0) return null;
    try {
      let cr_287 = new v_63(arg_284, arg_285 + 2),
        uint8Array_288 = new Uint8Array(Math.min(arg_286, 65536)),
        num_289 = 0,
        fn_290 = (arg_294) => {
          if (num_289 + arg_294 <= uint8Array_288.length) return;
          let v_295 = uint8Array_288.length;
          for (; v_295 < num_289 + arg_294; ) v_295 *= 2;
          if (v_295 > arg_286) throw new Error("inflate: output exceeds safety limit");
          let uint8Array_296 = new Uint8Array(v_295);
          (uint8Array_296.set(uint8Array_288.subarray(0, num_289)),
            (uint8Array_288 = uint8Array_296));
        },
        num_291 = 0;
      do {
        num_291 = cr_287.bits(1);
        let v_297 = cr_287.bits(2);
        if (v_297 === 0) {
          cr_287.alignByte();
          let v_300 = cr_287.byte() | (cr_287.byte() << 8),
            v_301 = cr_287.byte() | (cr_287.byte() << 8);
          if (((v_300 ^ 65535) & 65535) !== v_301)
            throw new Error("inflate: bad stored block length");
          fn_290(v_300);
          for (let num_302 = 0; num_302 < v_300; num_302++)
            uint8Array_288[num_289++] = cr_287.byte();
          continue;
        }
        if (v_297 === 3) throw new Error("inflate: bad block type");
        let v_298, v_299;
        if (v_297 === 1) {
          let uint8Array_303 = new Uint8Array(288),
            uint8Array_304 = new Uint8Array(30);
          for (let num_305 = 0; num_305 < 144; num_305++) uint8Array_303[num_305] = 8;
          for (let num_306 = 144; num_306 < 256; num_306++) uint8Array_303[num_306] = 9;
          for (let num_307 = 256; num_307 < 280; num_307++) uint8Array_303[num_307] = 7;
          for (let num_308 = 280; num_308 < 288; num_308++) uint8Array_303[num_308] = 8;
          (uint8Array_304.fill(5),
            (v_298 = new v_62(uint8Array_303, 288)),
            (v_299 = new v_62(uint8Array_304, 30)));
        } else {
          let v_309 = cr_287.bits(5) + 257,
            v_310 = cr_287.bits(5) + 1,
            v_311 = cr_287.bits(4) + 4,
            uint8Array_312 = new Uint8Array(19);
          for (let num_317 = 0; num_317 < v_311; num_317++)
            uint8Array_312[list_59[num_317]] = cr_287.bits(3);
          let me_313 = new v_62(uint8Array_312, 19),
            uint8Array_314 = new Uint8Array(v_309 + v_310),
            v_315 = v_309 + v_310,
            num_316 = 0;
          for (; num_316 < v_315; ) {
            let v_318 = fn_64(cr_287, me_313);
            if (v_318 < 0) throw new Error("inflate: bad code-length symbol");
            if (v_318 < 16) {
              uint8Array_314[num_316++] = v_318;
              continue;
            }
            if (v_318 === 16) {
              if (num_316 === 0) throw new Error("inflate: repeat with no prior length");
              let v_319 = uint8Array_314[num_316 - 1],
                v_320 = 3 + cr_287.bits(2);
              for (let num_321 = 0; num_321 < v_320 && num_316 < v_315; num_321++)
                uint8Array_314[num_316++] = v_319;
            } else if (v_318 === 17) {
              let v_322 = 3 + cr_287.bits(3);
              for (let num_323 = 0; num_323 < v_322 && num_316 < v_315; num_323++)
                uint8Array_314[num_316++] = 0;
            } else {
              let v_324 = 11 + cr_287.bits(7);
              for (let num_325 = 0; num_325 < v_324 && num_316 < v_315; num_325++)
                uint8Array_314[num_316++] = 0;
            }
          }
          if (uint8Array_314[256] === 0) throw new Error("inflate: no end-of-block code");
          ((v_298 = new v_62(uint8Array_314.subarray(0, v_309), v_309)),
            (v_299 = new v_62(uint8Array_314.subarray(v_309), v_310)));
        }
        for (;;) {
          let v_326 = fn_64(cr_287, v_298);
          if (v_326 < 0) throw new Error("inflate: bad literal symbol");
          if (v_326 < 256) {
            (fn_290(1), (uint8Array_288[num_289++] = v_326));
            continue;
          }
          if (v_326 === 256) break;
          let v_327 = v_326 - 257;
          if (v_327 >= list_55.length) throw new Error("inflate: bad length symbol");
          let v_328 = list_55[v_327] + cr_287.bits(list_56[v_327]),
            v_329 = fn_64(cr_287, v_299);
          if (v_329 < 0 || v_329 >= list_57.length) throw new Error("inflate: bad distance symbol");
          let v_330 = list_57[v_329] + cr_287.bits(list_58[v_329]);
          if (v_330 > num_289) throw new Error("inflate: distance beyond output");
          fn_290(v_328);
          for (let num_331 = 0; num_331 < v_328; num_331++)
            ((uint8Array_288[num_289] = uint8Array_288[num_289 - v_330]), num_289++);
        }
      } while (!num_291);
      cr_287.alignByte();
      let v_292 = uint8Array_288.subarray(0, num_289);
      if (cr_287.pos + 4 > arg_284.length) throw new Error("inflate: missing adler32");
      if (
        ((arg_284[cr_287.pos] << 24) |
          (arg_284[cr_287.pos + 1] << 16) |
          (arg_284[cr_287.pos + 2] << 8) |
          arg_284[cr_287.pos + 3]) >>>
          0 !==
        fn_61(v_292)
      )
        throw new Error("inflate: adler32 mismatch");
      let v_293 = cr_287.pos + 4;
      return { compressedOffset: arg_285, compressedSize: v_293 - arg_285, bytes: v_292.slice() };
    } catch (v_332) {
      return null;
    }
  }
  function fn_66(arg_333, arg_334) {
    return (
      arg_333[arg_334] |
      (arg_333[arg_334 + 1] << 8) |
      (arg_333[arg_334 + 2] << 16) |
      (arg_333[arg_334 + 3] << 24) |
      0
    );
  }
  function fn_67(arg_335, arg_336 = 0) {
    if (arg_336 < 0 || arg_336 + 6 > arg_335.length) return !1;
    let v_337 = arg_335[arg_336];
    if (
      v_337 >= 225 ||
      v_337 % 9 > 8 ||
      Math.floor(v_337 / 9) % 5 > 4 ||
      Math.floor(v_337 / 45) > 4
    )
      return !1;
    let v_338 = fn_66(arg_335, arg_336 + 1) >>> 0;
    return v_338 >= 1 && v_338 <= 67108864;
  }
  function fn_68(arg_339, arg_340) {
    let v_341 = Math.max(0, Math.min(arg_340, arg_339.length));
    for (; v_341 < arg_339.length && arg_339[v_341] === 0; ) v_341++;
    return v_341;
  }
  function fn_69(arg_342, arg_343 = 0, arg_344 = 134217728) {
    if (!fn_67(arg_342, arg_343)) return null;
    let v_345 = fn_70(arg_342, arg_343, arg_343 + 5, arg_344);
    if (v_345 !== null) return v_345;
    if (arg_343 + 14 > arg_342.length) return null;
    let num_346 = 0;
    for (let num_348 = 0; num_348 < 8; num_348++)
      num_346 += arg_342[arg_343 + 5 + num_348] * v_8(2, 8 * num_348);
    let v_347 = num_346 <= 0 || num_346 > arg_344 ? -1 : num_346;
    return fn_70(arg_342, arg_343, arg_343 + 13, arg_344, v_347);
  }
  function fn_70(arg_349, arg_350, arg_351, arg_352, arg_353 = -1) {
    if (arg_351 < 0 || arg_351 + 6 > arg_349.length) return null;
    try {
      let v_354 = arg_349[arg_350],
        v_355 = v_354 % 9,
        v_356 = Math.floor(v_354 / 9) % 5,
        v_357 = Math.floor(v_354 / 45);
      if (v_357 > 4 || v_356 > 4 || v_355 > 8) throw new Error("LZMA bad properties");
      let v_358 = fn_66(arg_349, arg_350 + 1) >>> 0;
      if (v_358 < 1 || v_358 > 67108864) throw new Error("LZMA bad dictionary size");
      let br_359 = new v_76(v_355, v_356, v_357, v_358, arg_352);
      return {
        bytes: br_359.decode(arg_349, arg_351, arg_353),
        nextInputOffset: br_359.inputConsumed,
      };
    } catch (v_360) {
      return null;
    }
  }
  var v_71 = class {
      constructor(arg_361) {
        (fn_12(this, "buf"),
          fn_12(this, "n", 0),
          (this.buf = new Uint8Array(Math.max(1024, Math.min(arg_361, 65536)))));
      }
      get size() {
        return this.n;
      }
      write(arg_362) {
        if (this.n === this.buf.length) {
          let uint8Array_363 = new Uint8Array(this.buf.length * 2);
          (uint8Array_363.set(this.buf), (this.buf = uint8Array_363));
        }
        this.buf[this.n++] = arg_362 & 255;
      }
      toBytes() {
        return this.buf.slice(0, this.n);
      }
    },
    v_72 = class {
      constructor(arg_364, arg_365) {
        (fn_12(this, "pos"),
          fn_12(this, "range", -1),
          fn_12(this, "code", 0),
          (this.input = arg_364),
          (this.pos = arg_365));
      }
      init() {
        if (this.input[this.pos] !== 0)
          throw new Error("LZMA range coder must start with zero byte");
        (this.pos++, (this.code = 0));
        for (let num_366 = 0; num_366 < 4; num_366++) {
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
      decodeBit(arg_367, arg_368) {
        let v_369 = arg_367[arg_368] & 65535,
          v_370 = (((this.range >>> 11) * v_369) >>> 0) | 0;
        return this.code >>> 0 < v_370 >>> 0
          ? ((this.range = v_370),
            (arg_367[arg_368] = (v_369 + ((2048 - v_369) >>> 5)) & 65535),
            this.normalize(),
            0)
          : ((this.range = (this.range - v_370) | 0),
            (this.code = (this.code - v_370) | 0),
            (arg_367[arg_368] = (v_369 - (v_369 >>> 5)) & 65535),
            this.normalize(),
            1);
      }
      decodeDirectBits(arg_371) {
        let num_372 = 0;
        for (let num_373 = 0; num_373 < arg_371; num_373++) {
          this.range = this.range >>> 1;
          let v_374 = (this.code - this.range) >>> 31;
          ((this.code = (this.code - (this.range & (v_374 - 1))) | 0),
            (num_372 = (num_372 << 1) | (1 - v_374) | 0),
            this.normalize());
        }
        return num_372;
      }
    },
    v_73 = class {
      constructor(arg_375) {
        (fn_12(this, "probs"),
          (this.numBitLevels = arg_375),
          (this.probs = new Int32Array(1 << arg_375).fill(1024)));
      }
      decode(arg_376) {
        let num_377 = 1;
        for (let num_378 = 0; num_378 < this.numBitLevels; num_378++)
          num_377 = (num_377 << 1) | arg_376.decodeBit(this.probs, num_377);
        return num_377 - (1 << this.numBitLevels);
      }
      reverseDecode(arg_379) {
        let num_380 = 1,
          num_381 = 0;
        for (let num_382 = 0; num_382 < this.numBitLevels; num_382++) {
          let v_383 = arg_379.decodeBit(this.probs, num_380);
          ((num_380 = (num_380 << 1) | v_383), (num_381 |= v_383 << num_382));
        }
        return num_381;
      }
    },
    v_74 = class {
      constructor() {
        (fn_12(this, "choice", new Int32Array(2).fill(1024)),
          fn_12(this, "lowCoder", []),
          fn_12(this, "midCoder", []),
          fn_12(this, "highCoder", new v_73(8)));
        for (let num_384 = 0; num_384 < 16; num_384++)
          (this.lowCoder.push(new v_73(3)), this.midCoder.push(new v_73(3)));
      }
      decode(arg_385, arg_386) {
        return arg_385.decodeBit(this.choice, 0) === 0
          ? this.lowCoder[arg_386].decode(arg_385)
          : arg_385.decodeBit(this.choice, 1) === 0
            ? 8 + this.midCoder[arg_386].decode(arg_385)
            : 16 + this.highCoder.decode(arg_385);
      }
    },
    v_75 = class {
      constructor(arg_387, arg_388) {
        (fn_12(this, "posMask"),
          fn_12(this, "lc"),
          fn_12(this, "coders", []),
          (this.posMask = (1 << arg_387) - 1),
          (this.lc = arg_388));
        let v_389 = 1 << (arg_387 + arg_388);
        for (let num_390 = 0; num_390 < v_389; num_390++)
          this.coders.push(new Int32Array(768).fill(1024));
      }
      probsFor(arg_391, arg_392) {
        return this.coders[
          ((arg_391 & this.posMask) << this.lc) + ((arg_392 & 255) >>> (8 - this.lc))
        ];
      }
      decodeNormal(arg_393, arg_394, arg_395) {
        let v_396 = this.probsFor(arg_394, arg_395),
          num_397 = 1;
        for (let num_398 = 0; num_398 < 8; num_398++)
          num_397 = (num_397 << 1) | arg_393.decodeBit(v_396, num_397);
        return num_397 & 255;
      }
      decodeWithMatchByte(arg_399, arg_400, arg_401, arg_402) {
        let v_403 = this.probsFor(arg_400, arg_401),
          num_404 = 1,
          v_405 = arg_402;
        for (let num_406 = 7; num_406 >= 0; num_406--) {
          let v_407 = (v_405 >> 7) & 1;
          v_405 <<= 1;
          let v_408 = arg_399.decodeBit(v_403, ((1 + v_407) << 8) + num_404);
          if (((num_404 = (num_404 << 1) | v_408), v_408 !== v_407)) {
            for (; num_404 < 256; ) num_404 = (num_404 << 1) | arg_399.decodeBit(v_403, num_404);
            break;
          }
        }
        return num_404 & 255;
      }
    },
    v_76 = class {
      constructor(arg_409, arg_410, arg_411, arg_412, arg_413) {
        (fn_12(this, "inputConsumed", -1),
          fn_12(this, "posStateMask"),
          fn_12(this, "isMatch", new Int32Array(192).fill(1024)),
          fn_12(this, "isRep", new Int32Array(12).fill(1024)),
          fn_12(this, "isRepG0", new Int32Array(12).fill(1024)),
          fn_12(this, "isRepG1", new Int32Array(12).fill(1024)),
          fn_12(this, "isRepG2", new Int32Array(12).fill(1024)),
          fn_12(this, "isRep0Long", new Int32Array(192).fill(1024)),
          fn_12(this, "posSlotDecoder", []),
          fn_12(this, "posDecoders", new Int32Array(114).fill(1024)),
          fn_12(this, "alignDecoder", new v_73(4)),
          fn_12(this, "lenDecoder", new v_74()),
          fn_12(this, "repLenDecoder", new v_74()),
          fn_12(this, "literalDecoder"),
          fn_12(this, "dict"),
          fn_12(this, "dictPos", 0),
          fn_12(this, "out"),
          fn_12(this, "maxOutput"),
          (this.posStateMask = (1 << arg_411) - 1));
        for (let num_414 = 0; num_414 < 4; num_414++) this.posSlotDecoder.push(new v_73(6));
        ((this.literalDecoder = new v_75(arg_410, arg_409)),
          (this.dict = new Uint8Array(arg_412)),
          (this.out = new v_71(arg_413)),
          (this.maxOutput = arg_413));
      }
      dictGet(arg_415) {
        let v_416 = this.dict.length;
        return this.dict[(this.dictPos - arg_415 - 1 + v_416) % v_416];
      }
      reverseDecode(arg_417, arg_418, arg_419, arg_420) {
        let num_421 = 1,
          num_422 = 0;
        for (let num_423 = 0; num_423 < arg_420; num_423++) {
          let v_424 = arg_419.decodeBit(arg_417, arg_418 + num_421);
          ((num_421 = (num_421 << 1) | v_424), (num_422 |= v_424 << num_423));
        }
        return num_422;
      }
      dictPut(arg_425) {
        ((this.dict[this.dictPos] = arg_425 & 255),
          this.dictPos++,
          this.dictPos === this.dict.length && (this.dictPos = 0),
          this.out.write(arg_425));
      }
      decode(arg_426, arg_427, arg_428) {
        let ar_429 = new v_72(arg_426, arg_427);
        ar_429.init();
        let v_430 = this.dict.length,
          num_431 = 0,
          num_432 = 0,
          num_433 = 0,
          num_434 = 0,
          num_435 = 0,
          num_436 = 0;
        for (; arg_428 < 0 || num_436 < arg_428; ) {
          if (this.out.size > this.maxOutput) throw new Error("LZMA output exceeds cap");
          let v_437 = num_436 & this.posStateMask;
          if (ar_429.decodeBit(this.isMatch, (num_431 << 4) + v_437) === 0) {
            let v_438 = num_436 === 0 ? 0 : this.dict[(this.dictPos - 1 + v_430) % v_430],
              v_439 =
                num_431 >= 7
                  ? this.literalDecoder.decodeWithMatchByte(
                      ar_429,
                      num_436,
                      v_438,
                      this.dict[(this.dictPos - num_432 - 1 + v_430) % v_430]
                    )
                  : this.literalDecoder.decodeNormal(ar_429, num_436, v_438);
            (this.dictPut(v_439),
              num_436++,
              (num_431 = num_431 < 4 ? 0 : num_431 < 10 ? num_431 - 3 : num_431 - 6));
          } else {
            let v_440;
            if (ar_429.decodeBit(this.isRep, num_431) === 1) {
              if (((v_440 = 0), ar_429.decodeBit(this.isRepG0, num_431) === 0))
                ar_429.decodeBit(this.isRep0Long, (num_431 << 4) + v_437) === 0 &&
                  ((num_431 = num_431 < 7 ? 9 : 11), (v_440 = 1));
              else {
                let v_441;
                (ar_429.decodeBit(this.isRepG1, num_431) === 0
                  ? (v_441 = num_433)
                  : (ar_429.decodeBit(this.isRepG2, num_431) === 0
                      ? (v_441 = num_434)
                      : ((v_441 = num_435), (num_435 = num_434)),
                    (num_434 = num_433)),
                  (num_433 = num_432),
                  (num_432 = v_441));
              }
              v_440 === 0 &&
                ((v_440 = 2 + this.repLenDecoder.decode(ar_429, v_437)),
                (num_431 = num_431 < 7 ? 8 : 11));
            } else {
              ((num_435 = num_434),
                (num_434 = num_433),
                (num_433 = num_432),
                (v_440 = 2 + this.lenDecoder.decode(ar_429, v_437)),
                (num_431 = num_431 < 7 ? 7 : 10));
              let v_442 = this.posSlotDecoder[v_440 < 6 ? v_440 - 2 : 3].decode(ar_429);
              if (v_442 >= 4) {
                let v_443 = (v_442 >> 1) - 1;
                ((num_432 = ((2 | (v_442 & 1)) << v_443) | 0),
                  v_442 < 14
                    ? (num_432 =
                        (num_432 +
                          this.reverseDecode(
                            this.posDecoders,
                            num_432 - v_442 - 1,
                            ar_429,
                            v_443
                          )) |
                        0)
                    : ((num_432 = (num_432 + ((ar_429.decodeDirectBits(v_443 - 4) << 4) | 0)) | 0),
                      (num_432 = (num_432 + this.alignDecoder.reverseDecode(ar_429)) | 0)));
              } else num_432 = v_442;
              if (num_432 >>> 0 === 4294967295) {
                if (arg_428 >= 0) throw new Error("LZMA EOS marker with known size");
                break;
              }
            }
            if (arg_428 >= 0 && num_436 + v_440 > arg_428) throw new Error("LZMA length overrun");
            if (num_432 < 0 || num_432 >= v_430 || num_432 >= num_436)
              throw new Error("LZMA invalid distance");
            for (let num_444 = 0; num_444 < v_440; num_444++)
              (this.dictPut(this.dictGet(num_432)), num_436++);
          }
        }
        return ((this.inputConsumed = ar_429.pos), this.out.toBytes());
      }
    },
    v_77 = class Cls_445 {
      constructor() {
        (fn_12(this, "regions", []),
          fn_12(this, "lowPage", new Uint8Array(4096)),
          fn_12(this, "mappedBytesTotal", 0),
          fn_12(this, "last", null));
      }
      map(arg_446, arg_447, arg_448, arg_449, arg_450) {
        if (arg_447 <= 0) throw new Error("size must be > 0");
        if (arg_447 > 33554432) throw new Error("guest mapping exceeds region limit");
        if (this.mappedBytesTotal + arg_447 > 134217728)
          throw new Error("guest mappings exceed total limit");
        let v_451 = arg_446 >>> 0,
          v_452 = v_451 + arg_447;
        if (v_452 > 4294967296) throw new Error("guest mapping wraps address space");
        for (let v_454 of this.regions) {
          let v_455 = v_454.start >>> 0,
            v_456 = v_455 + v_454.size;
          if (!(v_452 <= v_455 || v_451 >= v_456))
            throw new Error(
              `guest mapping overlaps @0x${v_451.toString(16)} size=${arg_447} with @0x${v_455.toString(16)} size=${v_454.size}`
            );
        }
        let obj_453 = {
          start: arg_446 | 0,
          size: arg_447,
          readable: arg_448,
          writable: arg_449,
          executable: arg_450,
          data: new Uint8Array(arg_447),
        };
        return (
          this.regions.push(obj_453),
          this.regions.sort((arg_457, arg_458) => (arg_457.start >>> 0) - (arg_458.start >>> 0)),
          (this.mappedBytesTotal += arg_447),
          obj_453
        );
      }
      static contains(arg_459, arg_460, arg_461) {
        return arg_461 < 0 || arg_461 > arg_459.size
          ? !1
          : (arg_460 - arg_459.start) >>> 0 <= (arg_459.size - arg_461) >>> 0;
      }
      find(arg_462, arg_463) {
        if (arg_463 < 0) return null;
        let v_464 = this.last;
        if (v_464 !== null && Cls_445.contains(v_464, arg_462, arg_463)) return v_464;
        for (let v_465 of this.regions)
          if (Cls_445.contains(v_465, arg_462, arg_463)) return ((this.last = v_465), v_465);
        return null;
      }
      hasRealMapping(arg_466, arg_467) {
        let v_468 = this.last;
        if (v_468 !== null && Cls_445.contains(v_468, arg_466, arg_467)) return !0;
        for (let v_469 of this.regions) if (Cls_445.contains(v_469, arg_466, arg_467)) return !0;
        return !1;
      }
      isMapped(arg_470, arg_471 = 1) {
        if (this.hasRealMapping(arg_470, arg_471)) return !0;
        let v_472 = arg_470 >>> 0;
        return arg_471 >= 0 && v_472 + arg_471 <= 4096;
      }
      off(arg_473, arg_474) {
        return (arg_474 - arg_473.start) | 0;
      }
      read8(arg_475) {
        let v_476 = this.find(arg_475, 1);
        if (v_476 !== null) {
          if (!v_476.readable) throw new Error(`Read protect @0x${(arg_475 >>> 0).toString(16)}`);
          return v_476.data[this.off(v_476, arg_475)];
        }
        let v_477 = arg_475 >>> 0;
        if (v_477 < 4096) return this.lowPage[v_477];
        throw new Error(`Unmapped read @0x${v_477.toString(16)}`);
      }
      read16(arg_478) {
        let v_479 = this.find(arg_478, 2);
        if (v_479 !== null) {
          if (!v_479.readable) throw new Error(`Read protect @0x${(arg_478 >>> 0).toString(16)}`);
          let v_480 = this.off(v_479, arg_478);
          return v_479.data[v_480] | (v_479.data[v_480 + 1] << 8);
        }
        return this.read8(arg_478) | (this.read8(arg_478 + 1) << 8);
      }
      read32(arg_481) {
        let v_482 = this.find(arg_481, 4);
        if (v_482 !== null) {
          if (!v_482.readable) throw new Error(`Read protect @0x${(arg_481 >>> 0).toString(16)}`);
          let v_483 = this.off(v_482, arg_481),
            v_484 = v_482.data;
          return (
            v_484[v_483] |
            (v_484[v_483 + 1] << 8) |
            (v_484[v_483 + 2] << 16) |
            (v_484[v_483 + 3] << 24) |
            0
          );
        }
        return (
          this.read8(arg_481) |
          (this.read8(arg_481 + 1) << 8) |
          (this.read8(arg_481 + 2) << 16) |
          (this.read8(arg_481 + 3) << 24) |
          0
        );
      }
      write8(arg_485, arg_486, arg_487 = !1) {
        let v_488 = this.find(arg_485, 1);
        if (v_488 !== null) {
          if (!arg_487 && !v_488.writable)
            throw new Error(`Write protect @0x${(arg_485 >>> 0).toString(16)}`);
          v_488.data[this.off(v_488, arg_485)] = arg_486 & 255;
          return;
        }
        let v_489 = arg_485 >>> 0;
        if (v_489 < 4096) {
          this.lowPage[v_489] = arg_486 & 255;
          return;
        }
        throw new Error(`Unmapped write @0x${v_489.toString(16)}`);
      }
      write16(arg_490, arg_491, arg_492 = !1) {
        let v_493 = this.find(arg_490, 2);
        if (v_493 !== null) {
          if (!arg_492 && !v_493.writable)
            throw new Error(`Write protect @0x${(arg_490 >>> 0).toString(16)}`);
          let v_494 = this.off(v_493, arg_490);
          ((v_493.data[v_494] = arg_491 & 255), (v_493.data[v_494 + 1] = (arg_491 >>> 8) & 255));
          return;
        }
        (this.write8(arg_490, arg_491, arg_492), this.write8(arg_490 + 1, arg_491 >>> 8, arg_492));
      }
      write32(arg_495, arg_496, arg_497 = !1) {
        let v_498 = this.find(arg_495, 4);
        if (v_498 !== null) {
          if (!arg_497 && !v_498.writable)
            throw new Error(`Write protect @0x${(arg_495 >>> 0).toString(16)}`);
          let v_499 = this.off(v_498, arg_495),
            v_500 = v_498.data;
          ((v_500[v_499] = arg_496 & 255),
            (v_500[v_499 + 1] = (arg_496 >>> 8) & 255),
            (v_500[v_499 + 2] = (arg_496 >>> 16) & 255),
            (v_500[v_499 + 3] = (arg_496 >>> 24) & 255));
          return;
        }
        (this.write8(arg_495, arg_496, arg_497),
          this.write8(arg_495 + 1, arg_496 >>> 8, arg_497),
          this.write8(arg_495 + 2, arg_496 >>> 16, arg_497),
          this.write8(arg_495 + 3, arg_496 >>> 24, arg_497));
      }
      readBytes(arg_501, arg_502) {
        let v_503 = this.find(arg_501, arg_502);
        if (v_503 !== null)
          return v_503.data
            .subarray(this.off(v_503, arg_501), this.off(v_503, arg_501) + arg_502)
            .slice();
        let uint8Array_504 = new Uint8Array(arg_502);
        for (let num_505 = 0; num_505 < arg_502; num_505++)
          uint8Array_504[num_505] = this.read8(arg_501 + num_505);
        return uint8Array_504;
      }
      writeBytes(arg_506, arg_507, arg_508 = 0, arg_509 = arg_507.length - arg_508, arg_510 = !1) {
        let v_511 = this.find(arg_506, arg_509);
        if (v_511 === null)
          throw new Error(
            `Unmapped guest memory @0x${(arg_506 >>> 0).toString(16)} size=${arg_509}`
          );
        if (!arg_510 && !v_511.writable)
          throw new Error(`Write protection fault @0x${(arg_506 >>> 0).toString(16)}`);
        v_511.data.set(arg_507.subarray(arg_508, arg_508 + arg_509), this.off(v_511, arg_506));
      }
      readCString(arg_512, arg_513 = 256) {
        let str_514 = "";
        for (let num_515 = 0; num_515 < arg_513; num_515++) {
          let v_516 = this.read8(arg_512 + num_515);
          if (v_516 === 0) break;
          str_514 += String.fromCharCode(v_516);
        }
        return str_514;
      }
      fillBytes(arg_517, arg_518, arg_519, arg_520 = !1) {
        if (arg_519 <= 0) return;
        let v_521 = this.find(arg_517, arg_519);
        if (v_521 !== null) {
          if (!arg_520 && !v_521.writable)
            throw new Error(`Write protection fault @0x${(arg_517 >>> 0).toString(16)}`);
          v_521.data.fill(
            arg_518 & 255,
            this.off(v_521, arg_517),
            this.off(v_521, arg_517) + arg_519
          );
          return;
        }
        for (let num_522 = 0; num_522 < arg_519; num_522++)
          this.write8(arg_517 + num_522, arg_518, arg_520);
      }
      copyBytes(arg_523, arg_524, arg_525, arg_526 = !1) {
        arg_525 <= 0 ||
          this.writeBytes(arg_524, this.readBytes(arg_523, arg_525), 0, arg_525, arg_526);
      }
    };
  function fn_78(arg_527, arg_528) {
    return (arg_527 + arg_528 - 1) & -arg_528;
  }
  var num_79 = 2e7,
    num_80 = 8e7,
    num_81 = 8e3;
  function fn_82(arg_529, arg_530) {
    let v_531 = arg_530 & 31,
      v_532 = arg_529 >>> 0;
    return v_531 === 0 ? v_532 : ((v_532 >>> v_531) | (v_532 << (32 - v_531))) >>> 0;
  }
  var v_83 = class {
      constructor(arg_533) {
        (fn_12(this, "r", new Int32Array(16)),
          fn_12(this, "n", !1),
          fn_12(this, "z", !1),
          fn_12(this, "c", !1),
          fn_12(this, "v", !1),
          fn_12(this, "thumb", !0),
          fn_12(this, "halted", !1),
          fn_12(this, "instructions", 0),
          fn_12(this, "apiCalls", 0),
          fn_12(this, "exitRequested", !1),
          fn_12(this, "maxIns", 2e6),
          fn_12(this, "haltAddr", 16842748),
          fn_12(this, "apiBase", 16777216),
          fn_12(this, "apiEnd", 16842748),
          fn_12(this, "onApiCall", null),
          fn_12(this, "fault", null),
          fn_12(this, "unknownCount", 0),
          fn_12(this, "semihostingExitAsReturn", !1),
          fn_12(this, "onExit", null),
          (this.mem = arg_533));
      }
      reset(arg_534) {
        (this.r.fill(0),
          this.jump(arg_534),
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
      jump(arg_535) {
        ((this.thumb = (arg_535 & 1) === 1), (this.r[15] = (arg_535 & -2) | 0));
      }
      setPc(arg_536) {
        this.r[15] = (arg_536 & -2) | 0;
      }
      isApi(arg_537) {
        let v_538 = arg_537 >>> 0;
        return v_538 >= this.apiBase >>> 0 && v_538 < this.apiEnd >>> 0 && (v_538 & 3) === 0;
      }
      setNZ(arg_539) {
        ((this.n = (arg_539 | 0) < 0), (this.z = (arg_539 | 0) === 0));
      }
      addWithCarry(arg_540, arg_541, arg_542) {
        let v_543 = (arg_540 >>> 0) + (arg_541 >>> 0) + (arg_542 & 1),
          v_544 = v_543 | 0;
        return (
          (this.c = v_543 > 4294967295),
          (this.v = (((arg_540 ^ v_544) & (arg_541 ^ v_544)) | 0) < 0),
          this.setNZ(v_544),
          v_544
        );
      }
      subWithCarry(arg_545, arg_546, arg_547) {
        return this.addWithCarry(arg_545, (~arg_546 | 0) >>> 0, arg_547 & 1);
      }
      arg(arg_548) {
        return arg_548 < 4
          ? this.r[arg_548] | 0
          : this.mem.read32((this.r[13] | 0) + ((arg_548 - 4) << 2));
      }
      callGuest(arg_549, arg_550, arg_551, arg_552, arg_553 = 0) {
        if ((arg_549 | 0) === 0) throw new Error("Guest function address is null");
        let v_554 = this.r[15] | 0,
          v_555 = this.r[14] | 0,
          v_556 = this.thumb,
          v_557 = this.halted,
          v_558 = this.instructions,
          v_559 = this.fault;
        for (let num_566 = 0; num_566 < 4; num_566++)
          this.r[num_566] = (num_566 < arg_550.length ? arg_550[num_566] : 0) | 0;
        ((this.r[14] = this.haltAddr),
          (this.thumb = (arg_549 & 1) === 1),
          (this.r[15] = (arg_549 & -2) | 0),
          (this.halted = !1),
          (this.fault = null));
        let v_560 = arg_551 >= num_79,
          v_561 = v_560 ? Math.min(num_80, arg_551 * 4) : arg_551,
          v_562 = arg_551,
          num_563 = 0,
          v_564 = v_558;
        for (
          ;
          !this.halted && !this.exitRequested && ((this.r[15] | 0) & -2) !== (this.haltAddr | 0);
        ) {
          if (this.instructions - v_558 >= v_562) {
            if (!v_560 || v_562 >= v_561) {
              ((this.fault = {
                kind: "budget",
                pc: this.r[15] | 0,
                word: 0,
                detail: `callback limit ${v_562} function=0x${(arg_549 >>> 0).toString(16)}`,
              }),
                (this.exitRequested = !0));
              break;
            }
            let v_567 = Date.now();
            if (num_563 === 0) num_563 = v_567 + num_81;
            else if (v_567 >= num_563) {
              ((this.fault = {
                kind: "budget",
                pc: this.r[15] | 0,
                word: 0,
                detail: `callback wall watchdog ${num_81}ms after soft limit function=0x${(arg_549 >>> 0).toString(16)}`,
              }),
                (this.exitRequested = !0));
              break;
            }
            v_562 = Math.min(v_561, v_562 + arg_551);
            continue;
          }
          if (
            arg_552 &&
            arg_553 > 0 &&
            this.instructions - v_564 >= arg_553 &&
            ((v_564 = this.instructions), arg_552(this))
          )
            break;
          this.step();
        }
        let v_565 = this.r[0] | 0;
        return (
          this.exitRequested
            ? this.instructions === v_558 && !this.fault && (this.fault = v_559)
            : ((this.r[15] = v_554),
              (this.r[14] = v_555),
              (this.thumb = v_556),
              (this.halted = v_557),
              this.fault || (this.fault = v_559)),
          v_565
        );
      }
      run(arg_568 = this.maxIns) {
        for (
          this.maxIns = arg_568;
          !this.halted && !this.exitRequested && this.instructions < arg_568;
        )
          this.step();
        !this.halted &&
          !this.exitRequested &&
          !this.fault &&
          ((this.fault = {
            kind: "budget",
            pc: this.r[15] | 0,
            word: 0,
            detail: `maxIns=${arg_568}`,
          }),
          (this.exitRequested = !0));
      }
      step() {
        if (this.exitRequested) return !1;
        let v_569 = this.r[15] | 0;
        if (v_569 >>> 0 === this.haltAddr >>> 0) return ((this.exitRequested = !0), !1);
        if (this.isApi(v_569))
          return (
            (!this.onApiCall || !this.onApiCall(v_569)) && (this.r[0] = 0),
            this.apiCalls++,
            this.instructions++,
            this.halted || this.jump(this.r[14] | 0),
            !0
          );
        if (v_569 >= 0 && v_569 < 65536 && !this.mem.hasRealMapping(v_569 & -2, 4)) {
          let v_570 = this.r[14] | 0,
            v_571 = (v_570 & -2) | 0;
          return (
            v_571 >= 0 && v_571 < 65536 && !this.mem.hasRealMapping(v_571, 4)
              ? (this.halted = !0)
              : ((this.thumb = (v_570 & 1) === 1), (this.r[15] = v_571)),
            this.instructions++,
            !0
          );
        }
        try {
          this.thumb ? this.stepThumb(v_569) : this.stepArm(v_569);
        } catch (v_572) {
          return (
            (this.fault = {
              kind: "unmapped",
              pc: v_569,
              word: 0,
              detail: v_572 instanceof Error ? v_572.message : String(v_572),
            }),
            (this.exitRequested = !0),
            !1
          );
        }
        return (this.instructions++, !0);
      }
      condOk(arg_573) {
        switch (arg_573) {
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
      fail(arg_574, arg_575, arg_576) {
        (this.unknownCount++,
          (this.fault = { kind: "undefined", pc: arg_574, word: arg_575, detail: arg_576 }),
          (this.exitRequested = !0));
      }
      read32Safe(arg_577, arg_578) {
        try {
          return this.mem.read32(arg_577) | 0;
        } catch (v_579) {
          return arg_578;
        }
      }
      semihosting() {
        let v_580 = this.r[0] | 0,
          v_581 = this.r[1] | 0;
        switch (v_580) {
          case 1: {
            let v_582 = this.read32Safe(v_581, 0),
              v_583 = Math.min(Math.max(this.read32Safe(v_581 + 8, 0), 0), 256),
              str_584 = "";
            if (v_582 !== 0 && v_583 > 0)
              try {
                for (let num_585 = 0; num_585 < v_583; num_585++)
                  str_584 += String.fromCharCode(this.mem.read8(v_582 + num_585));
              } catch (v_586) {
                str_584 = "";
              }
            this.r[0] = str_584 === ":tt" ? 1 : -1;
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
            let v_587 = this.read32Safe(v_581, -1),
              v_588 = Math.max(this.read32Safe(v_581 + 8, 0), 0);
            this.r[0] = v_587 === 1 || v_587 === 2 ? 0 : v_588;
            return;
          }
          case 6:
            this.r[0] = Math.max(this.read32Safe(v_581 + 8, 0), 0);
            return;
          case 7:
            this.r[0] = -1;
            return;
          case 8:
            this.r[0] = v_581 < 0 ? 1 : 0;
            return;
          case 9:
            this.r[0] = v_581 === 1 || v_581 === 2 ? 1 : 0;
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
            let v_589 = this.read32Safe(v_581, 0);
            try {
              v_589 !== 0 && this.mem.write8(v_589, 0);
            } catch (v_590) {}
            try {
              this.mem.write32(v_581 + 4, 0);
            } catch (v_591) {}
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
            let v_592 = Date.now();
            try {
              (this.mem.write32(v_581, v_592 | 0),
                this.mem.write32(v_581 + 4, Math.floor(v_592 / 4294967296) | 0));
            } catch (v_593) {}
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
      stepArm(arg_594) {
        if ((arg_594 & 3) !== 0) {
          ((this.fault = { kind: "align", pc: arg_594, word: 0, detail: "arm-fetch-unaligned" }),
            (this.exitRequested = !0));
          return;
        }
        let v_595 = this.mem.read32(arg_594) | 0,
          v_596 = (arg_594 + 4) | 0,
          v_597 = (v_595 >>> 28) & 15;
        if (!this.condOk(v_597)) {
          this.r[15] = v_596;
          return;
        }
        let v_598 = (v_595 >>> 25) & 7;
        if (v_598 === 5) {
          if (v_597 === 15) {
            let v_601 = ((v_595 & 16777215) << 8) >> 8,
              v_602 = (arg_594 + 8 + (v_601 << 2) + (((v_595 >>> 24) & 1) << 1)) | 0;
            ((this.r[14] = v_596), (this.thumb = !0), this.setPc(v_602));
            return;
          }
          let v_599 = ((v_595 & 16777215) << 8) >> 8,
            v_600 = (arg_594 + 8 + (v_599 << 2)) | 0;
          if (((v_595 >>> 24) & 1) === 0) {
            this.r[15] = v_600;
            return;
          }
          ((this.r[14] = v_596 | (this.thumb ? 1 : 0)), (this.r[15] = v_600));
          return;
        }
        if (v_598 === 7) {
          if (((v_595 >>> 24) & 15) === 15) {
            if ((v_595 | 0) === -284019626) {
              (this.semihosting(), (this.r[15] = v_596));
              return;
            }
            ((this.fault = {
              kind: "swi",
              pc: arg_594,
              word: v_595,
              detail: `swi 0x${(v_595 & 16777215).toString(16)}`,
            }),
              (this.exitRequested = !0));
            return;
          }
          this.r[15] = v_596;
          return;
        }
        if (v_598 === 6) {
          this.r[15] = v_596;
          return;
        }
        if (v_598 === 4) {
          this.blockArm(arg_594, v_595, v_596);
          return;
        }
        if (v_598 === 2 || v_598 === 3) {
          this.ldstArm(arg_594, v_595, v_598 === 3, v_596);
          return;
        }
        if (v_598 === 0 || v_598 === 1) {
          this.miscArm(arg_594, v_595, v_596);
          return;
        }
        this.fail(arg_594, v_595, `arm-class${v_598}`);
      }
      blockArm(arg_603, arg_604, arg_605) {
        let v_606 = (arg_604 >>> 24) & 1,
          v_607 = (arg_604 >>> 23) & 1,
          v_608 = (arg_604 >>> 21) & 1,
          v_609 = (arg_604 >>> 20) & 1,
          v_610 = (arg_604 >>> 16) & 15,
          list_611 = [];
        for (let num_616 = 0; num_616 < 16; num_616++)
          (arg_604 >>> num_616) & 1 && list_611.push(num_616);
        if (list_611.length === 0) {
          this.r[15] = arg_605;
          return;
        }
        let v_612 = this.r[v_610] | 0,
          v_613 = list_611.length * 4,
          v_614 = (v_607 === 1 ? (v_606 === 1 ? v_612 + 4 : v_612) : v_612 - v_613) | 0;
        if (v_609)
          for (let v_617 of list_611) {
            let v_618 = this.mem.read32(v_614);
            (v_617 === 15
              ? ((this.thumb = (v_618 & 1) === 1), (this.r[15] = (v_618 & -2) | 0))
              : (this.r[v_617] = v_618 | 0),
              (v_614 = (v_614 + 4) | 0));
          }
        else
          for (let v_619 of list_611)
            (this.mem.write32(v_614, v_619 === 15 ? (arg_603 + 12) & -4 : this.r[v_619] | 0),
              (v_614 = (v_614 + 4) | 0));
        let v_615 = v_609 === 1 && ((arg_604 >>> v_610) & 1) === 1;
        (v_608 === 1 &&
          !v_615 &&
          (this.r[v_610] = (v_607 === 1 ? v_612 + v_613 : v_612 - v_613) | 0),
          (v_609 === 1 && ((arg_604 >>> 15) & 1) === 1) || (this.r[15] = arg_605));
      }
      ldstArm(arg_620, arg_621, arg_622, arg_623) {
        let v_624 = (arg_621 >>> 24) & 1,
          v_625 = (arg_621 >>> 23) & 1,
          v_626 = (arg_621 >>> 22) & 1,
          v_627 = (arg_621 >>> 21) & 1,
          v_628 = (arg_621 >>> 20) & 1,
          v_629 = (arg_621 >>> 16) & 15,
          v_630 = (arg_621 >>> 12) & 15,
          v_631;
        arg_622
          ? (v_631 = this.decodeShiftedRegister(arg_620, arg_621 & 4095).v >>> 0)
          : (v_631 = arg_621 & 4095);
        let v_632 = (v_625 === 1 ? v_631 : -v_631) | 0,
          v_633 = v_629 === 15 ? (arg_620 + 8) | 0 : this.r[v_629] | 0,
          v_634 = (v_624 === 1 ? (v_633 + v_632) | 0 : v_633) | 0;
        if (((v_624 === 0 || v_627 === 1) && (this.r[v_629] = (v_633 + v_632) | 0), v_628)) {
          let v_635 = v_626 ? this.mem.read8(v_634) : this.mem.read32(v_634);
          if (v_630 === 15) {
            ((this.thumb = (v_635 & 1) === 1), this.setPc(v_635));
            return;
          }
          this.r[v_630] = v_635 | 0;
        } else
          v_626
            ? this.mem.write8(v_634, this.r[v_630])
            : this.mem.write32(v_634, v_630 === 15 ? (arg_620 + 12) & -4 : this.r[v_630]);
        this.r[15] = arg_623;
      }
      dataProcessing(arg_636, arg_637, arg_638) {
        let v_639 = (arg_637 >>> 21) & 15,
          v_640 = (arg_637 & 1048576) !== 0,
          v_641 = (arg_637 >>> 16) & 15,
          v_642 = (arg_637 >>> 12) & 15,
          obj_643 = { n: this.n, z: this.z, c: this.c, v: this.v },
          v_644 = this.c,
          v_645 = v_641 === 15 ? (arg_636 + 8) | 0 : this.r[v_641] | 0,
          v_646 = this.operand2(arg_636, arg_637),
          v_647 = v_646.v;
        v_646.c !== null && (this.c = v_646.c);
        let v_648 = v_644 ? 1 : 0,
          num_649 = 0,
          v_650 = !0;
        switch (v_639) {
          case 0:
            ((num_649 = (v_645 & v_647) | 0), this.setNZ(num_649));
            break;
          case 1:
            ((num_649 = (v_645 ^ v_647) | 0), this.setNZ(num_649));
            break;
          case 2:
            num_649 = this.subWithCarry(v_645, v_647, 1);
            break;
          case 3:
            num_649 = this.subWithCarry(v_647, v_645, 1);
            break;
          case 4:
            num_649 = this.addWithCarry(v_645, v_647, 0);
            break;
          case 5:
            num_649 = this.addWithCarry(v_645, v_647, v_648);
            break;
          case 6:
            num_649 = this.subWithCarry(v_645, v_647, v_648 ? 0 : 1);
            break;
          case 7:
            num_649 = this.subWithCarry(v_647, v_645, v_648 ? 0 : 1);
            break;
          case 8:
            ((num_649 = (v_645 & v_647) | 0), this.setNZ(num_649), (v_650 = !1));
            break;
          case 9:
            ((num_649 = (v_645 ^ v_647) | 0), this.setNZ(num_649), (v_650 = !1));
            break;
          case 10:
            ((num_649 = this.subWithCarry(v_645, v_647, 1)), (v_650 = !1));
            break;
          case 11:
            ((num_649 = this.addWithCarry(v_645, v_647, 0)), (v_650 = !1));
            break;
          case 12:
            ((num_649 = v_645 | v_647 | 0), this.setNZ(num_649));
            break;
          case 13:
            ((num_649 = v_647 | 0), this.setNZ(num_649));
            break;
          case 14:
            ((num_649 = (v_645 & ~v_647) | 0), this.setNZ(num_649));
            break;
          default:
            ((num_649 = ~v_647 | 0), this.setNZ(num_649));
            break;
        }
        if (
          (v_640 ||
            ((this.n = obj_643.n),
            (this.z = obj_643.z),
            (this.c = obj_643.c),
            (this.v = obj_643.v)),
          !v_650)
        ) {
          this.r[15] = arg_638;
          return;
        }
        if (v_642 === 15) {
          this.r[15] = (num_649 & -4) | 0;
          return;
        }
        ((this.r[v_642] = num_649 | 0), (this.r[15] = arg_638));
      }
      miscArm(arg_651, arg_652, arg_653) {
        let v_654 = (arg_652 >>> 16) & 15,
          v_655 = (arg_652 >>> 12) & 15,
          v_656 = (arg_652 >>> 8) & 15,
          v_657 = arg_652 & 15,
          v_658 = (arg_652 >>> 4) & 15;
        if ((arg_652 & 268435440) === 19922704) {
          this.jump(this.r[v_657] | 0);
          return;
        }
        if ((arg_652 & 268435440) === 19922736) {
          ((this.r[14] = arg_653 | (this.thumb ? 1 : 0)), this.jump(this.r[v_657] | 0));
          return;
        }
        if ((arg_652 & 263254016) === 16838656) {
          ((this.r[v_654] = this.cpsr() | 0), (this.r[15] = arg_653));
          return;
        }
        if ((arg_652 & 263254016) === 18935808 || (arg_652 & 263254016) === 52490240) {
          let v_664 = (arg_652 & 33554432) !== 0,
            v_665;
          if (v_664) {
            let v_666 = ((arg_652 >>> 8) & 15) * 2;
            v_665 = v_666 === 0 ? arg_652 & 255 : fn_82(arg_652 & 255, v_666) | 0;
          } else v_665 = this.r[v_657] | 0;
          (this.setCpsr(v_665, v_654), (this.r[15] = arg_653));
          return;
        }
        if ((arg_652 & 268374e3) === 24055568) {
          let v_667 = this.r[v_657] | 0;
          ((this.r[v_655] = (v_667 === 0 ? 32 : Math.clz32(v_667)) | 0), (this.r[15] = arg_653));
          return;
        }
        if ((arg_652 & 33554432) !== 0) {
          this.dataProcessing(arg_651, arg_652, arg_653);
          return;
        }
        {
          let v_668 = arg_652 & 267387024;
          if (
            v_668 === 16777344 ||
            v_668 === 20971648 ||
            v_668 === 23068800 ||
            v_668 === 18874496
          ) {
            let fn_669 = (arg_674, arg_675) =>
                (arg_675 ? arg_674 >> 16 : (arg_674 << 16) >> 16) | 0,
              v_670 = arg_652 & 15,
              v_671 = (arg_652 >>> 8) & 15,
              v_672 = (arg_652 & 32) !== 0,
              v_673 = (arg_652 & 64) !== 0;
            if (v_668 === 16777344) {
              let v_676 = (arg_652 >>> 16) & 15,
                v_677 = (arg_652 >>> 12) & 15;
              this.r[v_676] =
                (fn_669(this.r[v_670], v_672) * fn_669(this.r[v_671], v_673) +
                  (this.r[v_677] | 0)) |
                0;
            } else if (v_668 === 20971648) {
              let v_678 = (arg_652 >>> 16) & 15,
                v_679 = (arg_652 >>> 12) & 15,
                v_680 = fn_1(fn_669(this.r[v_670], v_672), fn_669(this.r[v_671], v_673)),
                v_681 = (this.r[v_679] >>> 0) + v_680[1],
                v_682 = (this.r[v_678] | 0) + v_680[0] + (v_681 >= 4294967296 ? 1 : 0);
              ((this.r[v_679] = v_681 | 0), (this.r[v_678] = v_682 | 0));
            } else if (v_668 === 23068800) {
              let v_683 = (arg_652 >>> 16) & 15;
              this.r[v_683] = (fn_669(this.r[v_670], v_672) * fn_669(this.r[v_671], v_673)) | 0;
            } else {
              let v_684 = (arg_652 >>> 16) & 15,
                v_685 = (arg_652 >>> 12) & 15,
                v_686 = fn_1(this.r[v_670] | 0, fn_669(this.r[v_671], v_673)),
                v_687 = (v_686[1] >>> 16) | (v_686[0] << 16) | 0;
              this.r[v_684] = (arg_652 & 32) !== 0 ? v_687 : (v_687 + (this.r[v_685] | 0)) | 0;
            }
            this.r[15] = arg_653;
            return;
          }
        }
        let v_659 = (arg_652 >>> 24) & 1,
          v_660 = (arg_652 >>> 23) & 1,
          v_661 = (arg_652 >>> 22) & 1,
          v_662 = (arg_652 >>> 21) & 1,
          v_663 = (arg_652 >>> 20) & 1;
        if (v_658 === 9) {
          if (v_659 === 1) {
            let v_694 = this.r[v_654] | 0,
              v_695 = v_661 === 1 ? this.mem.read8(v_694) : this.mem.read32(v_694);
            (v_661 === 1
              ? this.mem.write8(v_694, this.r[v_657])
              : this.mem.write32(v_694, this.r[v_657]),
              (this.r[v_655] = v_695 | 0),
              (this.r[15] = arg_653));
            return;
          }
          let v_688 = (arg_652 >>> 21) & 7;
          if (v_688 <= 1) {
            let v_696 = Math.imul(this.r[v_657] | 0, this.r[v_656] | 0) | 0,
              v_697 = v_688 === 1 ? (v_696 + (this.r[v_655] | 0)) | 0 : v_696;
            (v_654 === 15 ? (this.r[15] = (v_697 & -4) | 0) : (this.r[v_654] = v_697 | 0),
              v_663 === 1 && this.setNZ(v_697),
              (this.r[15] = arg_653));
            return;
          }
          if (v_688 < 4) {
            this.fail(arg_651, arg_652, "arm-mul-undefined");
            return;
          }
          let v_689 = (v_688 & 2) !== 0,
            v_690 = (v_688 & 1) !== 0,
            v_691 = fn_1(
              v_689 ? this.r[v_657] | 0 : this.r[v_657] >>> 0,
              v_689 ? this.r[v_656] | 0 : this.r[v_656] >>> 0
            ),
            v_692 = v_691[1] >>> 0,
            v_693 = v_691[0] >>> 0;
          if (v_690) {
            let v_698 = (this.r[v_655] >>> 0) + v_692;
            ((v_692 = v_698 >>> 0),
              (v_693 = ((this.r[v_654] >>> 0) + v_693 + (v_698 > 4294967295 ? 1 : 0)) >>> 0));
          }
          ((this.r[v_655] = v_692 | 0),
            (this.r[v_654] = v_693 | 0),
            v_663 === 1 && ((this.n = (v_693 | 0) < 0), (this.z = v_692 === 0 && v_693 === 0)),
            (this.r[15] = arg_653));
          return;
        }
        if ((v_658 & 9) === 9) {
          let v_699 = (arg_652 >>> 5) & 3,
            v_700 =
              v_661 === 1 ? (((arg_652 >>> 8) & 15) << 4) | (arg_652 & 15) : this.r[v_657] | 0,
            v_701 = v_654 === 15 ? (arg_651 + 8) | 0 : this.r[v_654] | 0,
            v_702 = (v_660 === 1 ? v_700 : -v_700) | 0,
            v_703 = (v_659 === 1 ? (v_701 + v_702) | 0 : v_701) | 0;
          if (
            (v_654 !== 15 &&
              (v_659 === 0
                ? (this.r[v_654] = (v_701 + v_702) | 0)
                : v_662 === 1 && (this.r[v_654] = v_703 | 0)),
            v_663)
          ) {
            let v_704;
            if (
              (v_699 === 1
                ? (v_704 = this.mem.read16(v_703))
                : v_699 === 2
                  ? (v_704 = (this.mem.read8(v_703) << 24) >> 24)
                  : v_699 === 3
                    ? (v_704 = (this.mem.read16(v_703) << 16) >> 16)
                    : (v_704 = 0),
              v_655 === 15)
            ) {
              ((this.thumb = (v_704 & 1) === 1), this.setPc(v_704));
              return;
            }
            this.r[v_655] = v_704 | 0;
          } else if (v_699 === 1) this.mem.write16(v_703, this.r[v_655]);
          else if (v_699 === 2 || v_699 === 3) {
            if (v_655 >= 15) {
              this.fail(arg_651, arg_652, v_699 === 2 ? "LDRD invalid Rd" : "STRD invalid Rd");
              return;
            }
            v_699 === 2
              ? ((this.r[v_655] = this.mem.read32(v_703) | 0),
                (this.r[v_655 + 1] = this.mem.read32(v_703 + 4) | 0))
              : (this.mem.write32(v_703, this.r[v_655]),
                this.mem.write32(v_703 + 4, this.r[v_655 + 1]));
          } else {
            this.fail(arg_651, arg_652, "arm-half-undefined");
            return;
          }
          this.r[15] = arg_653;
          return;
        }
        if ((arg_652 & 16) === 0 || (v_658 & 8) === 0) {
          this.dataProcessing(arg_651, arg_652, arg_653);
          return;
        }
        this.fail(arg_651, arg_652, "arm-undefined");
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
      setCpsr(arg_705, arg_706) {
        ((arg_706 & 8) !== 0 && (this.n = (arg_705 & 2147483648) !== 0),
          (arg_706 & 4) !== 0 && (this.z = (arg_705 & 1073741824) !== 0),
          (arg_706 & 2) !== 0 && (this.c = (arg_705 & 536870912) !== 0),
          (arg_706 & 1) !== 0 && (this.v = (arg_705 & 268435456) !== 0));
      }
      barrel(arg_707, arg_708, arg_709, arg_710) {
        let v_711 = arg_707 >>> 0;
        switch (
          (!arg_710 && (arg_708 === 1 || arg_708 === 2) && arg_709 === 0 && (arg_709 = 32), arg_708)
        ) {
          case 0:
            return arg_709 === 0
              ? { v: arg_707 | 0, c: null }
              : arg_709 >= 32
                ? { v: 0, c: arg_709 === 32 ? (v_711 & 1) !== 0 : !1 }
                : { v: (v_711 << arg_709) | 0, c: ((v_711 >>> (32 - arg_709)) & 1) !== 0 };
          case 1:
            return arg_709 === 0
              ? { v: arg_707 | 0, c: null }
              : arg_709 >= 32
                ? { v: 0, c: arg_709 === 32 ? v_711 >>> 31 !== 0 : !1 }
                : { v: (v_711 >>> arg_709) | 0, c: ((v_711 >>> (arg_709 - 1)) & 1) !== 0 };
          case 2:
            return arg_709 === 0
              ? { v: arg_707 | 0, c: null }
              : arg_709 >= 32
                ? { v: (v_711 | 0) >> 31, c: v_711 >>> 31 !== 0 }
                : { v: (v_711 | 0) >> arg_709, c: ((v_711 >>> (arg_709 - 1)) & 1) !== 0 };
          default: {
            if (!arg_710 && arg_709 === 0)
              return { v: ((this.c ? 1 : 0) << 31) | (v_711 >>> 1) | 0, c: (v_711 & 1) !== 0 };
            let v_712 = arg_709 & 31;
            return v_712 === 0
              ? { v: arg_707 | 0, c: null }
              : { v: fn_82(v_711, v_712) | 0, c: ((v_711 >>> (v_712 - 1)) & 1) !== 0 };
          }
        }
      }
      operand2(arg_713, arg_714) {
        if ((arg_714 & 33554432) !== 0) {
          let v_715 = ((arg_714 >>> 8) & 15) * 2,
            v_716 = arg_714 & 255;
          if (v_715 === 0) return { v: v_716, c: null };
          let v_717 = fn_82(v_716, v_715);
          return { v: v_717 | 0, c: v_717 >>> 31 !== 0 };
        }
        return this.decodeShiftedRegister(arg_713, arg_714 & 4095);
      }
      decodeShiftedRegister(arg_718, arg_719) {
        let v_720 = arg_719 & 15,
          v_721 = v_720 === 15 ? (arg_718 + 8) | 0 : this.r[v_720] | 0,
          v_722 = (arg_719 >>> 5) & 3;
        if ((arg_719 & 16) === 0) return this.barrel(v_721, v_722, (arg_719 >>> 7) & 31, !1);
        let v_723 = (arg_719 >>> 8) & 15,
          v_724 = v_723 === 15 ? (arg_718 + 8) | 0 : this.r[v_723] | 0;
        return this.barrel(v_721, v_722, v_724 & 255, !0);
      }
      stepThumb(arg_725) {
        if ((arg_725 & 1) !== 0) {
          ((this.fault = { kind: "align", pc: arg_725, word: 0, detail: "thumb-fetch-odd" }),
            (this.exitRequested = !0));
          return;
        }
        let v_726 = this.mem.read16(arg_725),
          v_727 = this.r,
          v_728 = (arg_725 + 2) | 0;
        if ((v_726 & 63488) <= 4096) {
          let v_729 = (v_726 >>> 11) & 3,
            v_730 = (v_726 >>> 6) & 31,
            v_731 = this.barrel(
              v_727[(v_726 >>> 3) & 7] | 0,
              v_729,
              v_729 === 0 ? v_730 : v_730 === 0 ? 32 : v_730,
              !1
            );
          ((v_727[v_726 & 7] = v_731.v | 0),
            v_731.c !== null && (this.c = v_731.c),
            this.setNZ(v_731.v),
            (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 63488) === 6144) {
          let v_732 = (v_726 >>> 9) & 1,
            v_733 = (v_726 >>> 6) & 7,
            v_734 = (v_726 >>> 3) & 7,
            v_735 = v_726 & 7,
            v_736 = ((v_726 >>> 10) & 1) === 1 ? v_733 : v_727[v_733] | 0;
          ((v_727[v_735] =
            v_732 === 1
              ? this.subWithCarry(v_727[v_734] | 0, v_736, 1)
              : this.addWithCarry(v_727[v_734] | 0, v_736, 0)),
            (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 57344) === 8192) {
          let v_737 = (v_726 >>> 11) & 3,
            v_738 = (v_726 >>> 8) & 7,
            v_739 = v_726 & 255;
          (v_737 === 0
            ? ((v_727[v_738] = v_739), this.setNZ(v_739))
            : v_737 === 1
              ? this.subWithCarry(v_727[v_738] | 0, v_739, 1)
              : v_737 === 2
                ? (v_727[v_738] = this.addWithCarry(v_727[v_738] | 0, v_739, 0))
                : (v_727[v_738] = this.subWithCarry(v_727[v_738] | 0, v_739, 1)),
            (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 64512) === 16384) {
          this.aluThumb(v_726, v_728);
          return;
        }
        if ((v_726 & 64512) === 17408) {
          let v_740 = (v_726 >>> 8) & 3,
            v_741 = (v_726 >>> 7) & 1,
            v_742 = (v_726 >>> 3) & 15,
            v_743 = (v_741 << 3) | (v_726 & 7),
            v_744 = (arg_725 + 4) | 0,
            v_745 = v_742 === 15 ? v_744 : v_727[v_742] | 0,
            v_746 = v_743 === 15 ? v_744 : v_727[v_743] | 0,
            obj_747 = { n: this.n, z: this.z, c: this.c, v: this.v };
          if (v_740 === 0) {
            let v_748 = this.addWithCarry(v_746, v_745, 0);
            if (v_743 === 15) {
              ((this.thumb = !0), (this.r[15] = (v_748 & -2) | 0));
              return;
            }
            ((v_727[v_743] = v_748), (v_727[15] = v_728));
          } else if (v_740 === 1) {
            (this.subWithCarry(v_746, v_745, 1), (v_727[15] = v_728));
            return;
          } else if (v_740 === 2) {
            if (v_743 === 15) {
              ((this.thumb = !0), (this.r[15] = (v_745 & -2) | 0));
              return;
            }
            ((v_727[v_743] = v_745), (v_727[15] = v_728));
          } else {
            (v_741 === 1 && (this.r[14] = v_728 | 1), this.jump(v_745));
            return;
          }
          ((this.n = obj_747.n), (this.z = obj_747.z), (this.c = obj_747.c), (this.v = obj_747.v));
          return;
        }
        if ((v_726 & 63488) === 18432) {
          ((v_727[(v_726 >>> 8) & 7] =
            this.mem.read32(((arg_725 & -3) + 4 + ((v_726 & 255) << 2)) | 0) | 0),
            (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 61440) === 20480) {
          let v_749 = (v_726 >>> 9) & 7,
            v_750 = ((v_727[(v_726 >>> 3) & 7] | 0) + (v_727[(v_726 >>> 6) & 7] | 0)) | 0;
          this.memAccess(v_726 & 7, v_749, v_750, v_728);
          return;
        }
        if ((v_726 & 57344) === 24576) {
          let v_751 = (v_726 >>> 11) & 3,
            list_752 = [0, 4, 2, 6],
            v_753 =
              ((v_727[(v_726 >>> 3) & 7] | 0) + ((v_726 >>> 6) & 31) * (v_751 >= 2 ? 1 : 4)) | 0;
          this.memAccess(v_726 & 7, list_752[v_751], v_753, v_728);
          return;
        }
        if ((v_726 & 61440) === 32768) {
          let v_754 = ((v_727[(v_726 >>> 3) & 7] | 0) + ((v_726 >>> 6) & 31) * 2) | 0;
          this.memAccess(v_726 & 7, ((v_726 >>> 11) & 1) === 1 ? 5 : 1, v_754, v_728);
          return;
        }
        if ((v_726 & 61440) === 36864) {
          let v_755 = (v_726 >>> 8) & 7,
            v_756 = ((v_727[13] | 0) + ((v_726 & 255) << 2)) | 0;
          (((v_726 >>> 11) & 1) === 1
            ? (v_727[v_755] = this.mem.read32(v_756) | 0)
            : this.mem.write32(v_756, v_727[v_755]),
            (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 61440) === 40960) {
          let v_757 = ((v_726 >>> 11) & 1) === 1 ? v_727[13] | 0 : ((arg_725 & -3) + 4) | 0;
          ((v_727[(v_726 >>> 8) & 7] = (v_757 + ((v_726 & 255) << 2)) | 0), (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 65280) === 45056) {
          let v_758 = (v_726 & 127) << 2;
          ((v_727[13] =
            (((v_726 >>> 7) & 1) === 1 ? (v_727[13] | 0) - v_758 : (v_727[13] | 0) + v_758) | 0),
            (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 65280) === 48640) {
          ((this.fault = {
            kind: "breakpoint",
            pc: arg_725,
            word: v_726,
            detail: `bkpt #${v_726 & 255}`,
          }),
            (this.exitRequested = !0));
          return;
        }
        if ((v_726 & 65024) === 46080 || (v_726 & 65024) === 48128) {
          this.pushPop(v_726) || (v_727[15] = v_728);
          return;
        }
        if ((v_726 & 61440) === 49152) {
          let v_759 = ((v_726 >>> 11) & 1) === 1,
            v_760 = (v_726 >>> 8) & 7,
            v_761 = v_726 & 255,
            v_762 = v_727[v_760] | 0;
          for (let num_763 = 0; num_763 < 8; num_763++)
            ((v_761 >>> num_763) & 1) !== 0 &&
              (v_759
                ? (v_727[num_763] = this.mem.read32(v_762))
                : this.mem.write32(v_762, v_727[num_763]),
              (v_762 = (v_762 + 4) | 0));
          (v_761 !== 0 && !(v_759 && ((v_761 >>> v_760) & 1) === 1) && (v_727[v_760] = v_762 | 0),
            (v_727[15] = v_728));
          return;
        }
        if ((v_726 & 61440) === 53248) {
          let v_764 = (v_726 >>> 8) & 15;
          if (v_764 === 15) {
            if ((v_726 & 255) === 171) {
              (this.semihosting(), (v_727[15] = v_728));
              return;
            }
            ((this.fault = {
              kind: "swi",
              pc: arg_725,
              word: v_726,
              detail: `svc #${v_726 & 255}`,
            }),
              (this.exitRequested = !0));
            return;
          }
          if (v_764 === 14) {
            this.fail(arg_725, v_726, "thumb-undefined-branch");
            return;
          }
          let v_765 = ((v_726 & 255) << 24) >> 23;
          v_727[15] = this.condOk(v_764) ? ((arg_725 + 4 + v_765) & -2) | 0 : v_728;
          return;
        }
        if ((v_726 & 63488) === 57344) {
          let v_766 = ((v_726 & 2047) << 21) >> 20;
          v_727[15] = ((arg_725 + 4 + v_766) & -2) | 0;
          return;
        }
        if ((v_726 & 63488) === 61440) {
          let v_767 = this.mem.read16((arg_725 + 2) | 0),
            v_768 = (v_767 >>> 11) & 31,
            v_769 = v_768 === 29;
          if (v_768 !== 31 && !v_769) {
            this.fail(arg_725, v_767, "thumb-bl-second-word");
            return;
          }
          let v_770 = ((((v_726 & 2047) << 12) | ((v_767 & 2047) << 1)) << 9) >> 9;
          ((v_727[14] = (arg_725 + 4) | 1),
            (this.thumb = !v_769),
            (v_727[15] = v_769
              ? ((arg_725 + 4 + v_770) & -4) | 0
              : ((arg_725 + 4 + v_770) & -2) | 0));
          return;
        }
        this.fail(arg_725, v_726, "thumb-undefined");
      }
      aluThumb(arg_771, arg_772) {
        let v_773 = this.r,
          v_774 = (arg_771 >>> 6) & 15,
          v_775 = (arg_771 >>> 3) & 7,
          v_776 = arg_771 & 7,
          v_777 = v_773[v_776] | 0,
          v_778 = v_773[v_775] | 0,
          v_779;
        switch (v_774) {
          case 0:
            ((v_779 = (v_777 & v_778) | 0), this.setNZ(v_779), (v_773[v_776] = v_779));
            break;
          case 1:
            ((v_779 = (v_777 ^ v_778) | 0), this.setNZ(v_779), (v_773[v_776] = v_779));
            break;
          case 2:
          case 3:
          case 4:
          case 7: {
            let v_780 = this.barrel(
              v_777,
              v_774 === 2 ? 0 : v_774 === 3 ? 1 : v_774 === 4 ? 2 : 3,
              v_778 & 255,
              !0
            );
            (v_780.c !== null && (this.c = v_780.c),
              (v_779 = v_780.v | 0),
              this.setNZ(v_779),
              (v_773[v_776] = v_779));
            break;
          }
          case 5:
            v_773[v_776] = this.addWithCarry(v_777, v_778, this.c ? 1 : 0);
            break;
          case 6:
            v_773[v_776] = this.subWithCarry(v_777, v_778, this.c ? 1 : 0);
            break;
          case 8:
            ((v_779 = (v_777 & v_778) | 0), this.setNZ(v_779));
            break;
          case 9:
            v_773[v_776] = this.subWithCarry(0, v_778, 1);
            break;
          case 10:
            this.subWithCarry(v_777, v_778, 1);
            break;
          case 11:
            this.addWithCarry(v_777, v_778, 0);
            break;
          case 12:
            ((v_779 = v_777 | v_778 | 0), this.setNZ(v_779), (v_773[v_776] = v_779));
            break;
          case 13:
            ((v_779 = Math.imul(v_777, v_778) | 0),
              this.setNZ(v_779),
              (this.c = !1),
              (v_773[v_776] = v_779));
            break;
          case 14:
            ((v_779 = (v_777 & ~v_778) | 0), this.setNZ(v_779), (v_773[v_776] = v_779));
            break;
          default:
            ((v_779 = ~v_778 | 0), this.setNZ(v_779), (v_773[v_776] = v_779));
            break;
        }
        v_773[15] = arg_772;
      }
      memAccess(arg_781, arg_782, arg_783, arg_784) {
        let v_785 = this.r;
        switch (arg_782) {
          case 0:
            this.mem.write32(arg_783, v_785[arg_781]);
            break;
          case 1:
            this.mem.write16(arg_783, v_785[arg_781]);
            break;
          case 2:
            this.mem.write8(arg_783, v_785[arg_781]);
            break;
          case 3:
            v_785[arg_781] = (this.mem.read8(arg_783) << 24) >> 24;
            break;
          case 4:
          case 5: {
            let v_786 = arg_782 === 4 ? this.mem.read32(arg_783) : this.mem.read16(arg_783);
            if (arg_781 === 15) {
              ((this.thumb = (v_786 & 1) === 1), this.setPc(v_786));
              return;
            }
            v_785[arg_781] = v_786 | 0;
            break;
          }
          case 6:
            v_785[arg_781] = this.mem.read8(arg_783);
            break;
          default:
            v_785[arg_781] = (this.mem.read16(arg_783) << 16) >> 16;
            break;
        }
        v_785[15] = arg_784;
      }
      pushPop(arg_787) {
        let v_788 = this.r,
          v_789 = ((arg_787 >>> 11) & 1) === 1,
          v_790 = ((arg_787 >>> 8) & 1) === 1,
          v_791 = arg_787 & 255;
        if (!v_789) {
          let v_793 = v_788[13] | 0;
          v_790 && ((v_793 = (v_793 - 4) | 0), this.mem.write32(v_793, v_788[14]));
          for (let num_794 = 7; num_794 >= 0; num_794--)
            ((v_791 >>> num_794) & 1) === 1 &&
              ((v_793 = (v_793 - 4) | 0), this.mem.write32(v_793, v_788[num_794]));
          return ((v_788[13] = v_793 | 0), !1);
        }
        let v_792 = v_788[13] | 0;
        for (let num_795 = 0; num_795 < 8; num_795++)
          ((v_791 >>> num_795) & 1) !== 0 &&
            ((v_788[num_795] = this.mem.read32(v_792)), (v_792 = (v_792 + 4) | 0));
        if (v_790) {
          let v_796 = this.mem.read32(v_792);
          return (
            (v_788[13] = (v_792 + 4) | 0),
            (this.thumb = (v_796 & 1) === 1),
            (v_788[15] = (v_796 & -2) | 0),
            !0
          );
        }
        return ((v_788[13] = v_792 | 0), !1);
      }
    },
    obj_84 = {
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
    list_85 = [31, 17, 17, 17, 17, 17, 31];
  function fn_86(arg_797, arg_798, arg_799) {
    return arg_797 < arg_798 ? arg_798 : arg_797 > arg_799 ? arg_799 : arg_797;
  }
  var v_87 = class Cls_800 {
    constructor() {
      (fn_12(this, "fontId", 0), fn_12(this, "explicitSize", 0));
    }
    setFont(arg_801) {
      ((this.fontId = arg_801 & 255), (this.explicitSize = 0));
    }
    setFontSize(arg_802) {
      this.explicitSize = fn_86(arg_802, 0, 64);
    }
    currentFontId() {
      return this.fontId;
    }
    scale() {
      if (this.explicitSize > 0) return fn_86(Math.floor((this.explicitSize + 7) / 8), 1, 8);
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
          return fn_86(Math.floor((fn_86(this.fontId, 8, 32) + 7) / 8), 1, 4);
      }
    }
    measure(arg_803) {
      let v_804 = this.scale();
      return arg_803.length === 0 ? [0, 8 * v_804] : [arg_803.length * 6 * v_804, 8 * v_804];
    }
    charWidth(arg_805) {
      return 6 * this.scale();
    }
    height() {
      return 8 * this.scale();
    }
    scaleFor(arg_806) {
      return arg_806 <= 0 ? this.scale() : fn_86(Math.floor((arg_806 + 7) / 8), 1, 8);
    }
    baseline(arg_807) {
      return 7 * this.scaleFor(arg_807);
    }
    inkWidth(arg_808) {
      return 5 * this.scaleFor(arg_808);
    }
    cellHeight(arg_809) {
      return 8 * this.scaleFor(arg_809);
    }
    advance(arg_810) {
      return 6 * this.scaleFor(arg_810);
    }
    rasterize(arg_811, arg_812 = Number.MAX_SAFE_INTEGER) {
      let v_813 = this.scale(),
        v_814 = Math.max(arg_811.length * 6 * v_813, 1),
        v_815 = Math.min(v_814, Math.max(arg_812, 1)),
        v_816 = 8 * v_813,
        int32Array_817 = new Int32Array(v_815 * v_816),
        num_818 = 0;
      for (let num_819 = 0; num_819 < arg_811.length && !(num_818 >= v_815); num_819++) {
        let v_820 = Cls_800.glyph(arg_811.charCodeAt(num_819));
        for (let num_821 = 0; num_821 < 7; num_821++) {
          let v_822 = v_820[num_821];
          for (let num_823 = 0; num_823 < 5; num_823++)
            if ((v_822 & (1 << (4 - num_823))) !== 0)
              for (let num_824 = 0; num_824 < v_813; num_824++)
                for (let num_825 = 0; num_825 < v_813; num_825++) {
                  let v_826 = num_818 + num_823 * v_813 + num_825,
                    v_827 = num_821 * v_813 + num_824;
                  v_826 >= 0 &&
                    v_826 < v_815 &&
                    v_827 >= 0 &&
                    v_827 < v_816 &&
                    (int32Array_817[v_827 * v_815 + v_826] = 255);
                }
        }
        num_818 += 6 * v_813;
      }
      return { width: v_815, height: v_816, baseline: 7 * v_813, alpha: int32Array_817 };
    }
    static glyph(arg_828) {
      var v_829;
      let v_830 = String.fromCharCode(arg_828).toUpperCase();
      if (CYRILLIC_GLYPHS[v_830]) return CYRILLIC_GLYPHS[v_830];
      return arg_828 < 32 || arg_828 === 127
        ? obj_84[" "]
        : (v_829 = obj_84[v_830]) != null
          ? v_829
          : list_85;
    }
  };
  function fn_88(arg_831) {
    return arg_831 < 0 ? 0 : arg_831 > 255 ? 255 : arg_831 | 0;
  }
  function fn_89(arg_832, arg_833, arg_834) {
    let v_835 = fn_88(arg_832),
      v_836 = fn_88(arg_833),
      v_837 = fn_88(arg_834),
      v_838 = ((v_835 * 31 + 127) / 255) | 0,
      v_839 = ((v_836 * 63 + 127) / 255) | 0,
      v_840 = ((v_837 * 31 + 127) / 255) | 0;
    return ((v_838 << 11) | (v_839 << 5) | v_840) & 65535;
  }
  function fn_90(arg_841) {
    let v_842 = arg_841 & 65535,
      v_843 = (v_842 >>> 11) & 31,
      v_844 = (v_842 >>> 5) & 63,
      v_845 = v_842 & 31;
    return [
      (v_843 << 3) | (v_843 >>> 2),
      (v_844 << 2) | (v_844 >>> 4),
      (v_845 << 3) | (v_845 >>> 2),
    ];
  }
  function fn_91(arg_846) {
    return (((arg_846 < 0 ? 0 : arg_846 > 65535 ? 65535 : arg_846) * 255 + 32767) / 65535) | 0;
  }
  function fn_92(arg_847, arg_848, arg_849) {
    let v_850 = arg_849 < 0 ? 0 : arg_849 > 255 ? 255 : arg_849 | 0;
    if (v_850 <= 0) return arg_847 & 65535;
    if (v_850 >= 255) return arg_848 & 65535;
    let v_851 = 255 - v_850,
      [v_852, v_853, v_854] = fn_90(arg_848),
      [v_855, v_856, v_857] = fn_90(arg_847);
    return fn_89(
      ((v_852 * v_850 + v_855 * v_851 + 127) / 255) | 0,
      ((v_853 * v_850 + v_856 * v_851 + 127) / 255) | 0,
      ((v_854 * v_850 + v_857 * v_851 + 127) / 255) | 0
    );
  }
  function fn_93(arg_858) {
    var v_859, v_860;
    return (v_860 = (v_859 = fn_103(arg_858)) != null ? v_859 : fn_105(arg_858)) != null
      ? v_860
      : fn_110(arg_858);
  }
  var list_94 = [{ x0: 0, y0: 0, dx: 1, dy: 1 }],
    list_95 = [
      { x0: 0, y0: 0, dx: 8, dy: 8 },
      { x0: 4, y0: 0, dx: 8, dy: 8 },
      { x0: 0, y0: 4, dx: 4, dy: 8 },
      { x0: 2, y0: 0, dx: 4, dy: 4 },
      { x0: 0, y0: 2, dx: 2, dy: 4 },
      { x0: 1, y0: 0, dx: 2, dy: 2 },
      { x0: 0, y0: 1, dx: 1, dy: 2 },
    ];
  function fn_96(arg_861, arg_862, arg_863) {
    return arg_861 <= arg_862 ? 0 : Math.floor((arg_861 - arg_862 + arg_863 - 1) / arg_863);
  }
  function fn_97(arg_864, arg_865, arg_866) {
    let v_867 = arg_864 + arg_865 - arg_866,
      v_868 = Math.abs(v_867 - arg_864),
      v_869 = Math.abs(v_867 - arg_865),
      v_870 = Math.abs(v_867 - arg_866);
    return v_868 <= v_869 && v_868 <= v_870 ? arg_864 : v_869 <= v_870 ? arg_865 : arg_866;
  }
  function fn_98(arg_871, arg_872, arg_873, arg_874) {
    if (arg_874 === 8) return arg_871[arg_872 + arg_873];
    if (arg_874 !== 1 && arg_874 !== 2 && arg_874 !== 4) throw new Error(`sample depth ${arg_874}`);
    let v_875 = 8 / arg_874,
      v_876 = arg_871[arg_872 + Math.floor(arg_873 / v_875)],
      v_877 = (v_875 - 1 - (arg_873 % v_875)) * arg_874;
    return (v_876 >>> v_877) & ((1 << arg_874) - 1);
  }
  function fn_99(arg_878, arg_879) {
    switch (arg_879) {
      case 1:
        return arg_878 === 0 ? 0 : 255;
      case 2:
        return arg_878 * 85;
      case 4:
        return arg_878 * 17;
      case 8:
        return arg_878;
      case 16:
        return fn_91(arg_878);
      default:
        throw new Error(`sample depth ${arg_879}`);
    }
  }
  function fn_100(arg_880, arg_881, arg_882, arg_883, arg_884, arg_885, arg_886) {
    let fn_887 = (arg_888, arg_889) => ((arg_889 & 255) << 16) | (arg_888 & 65535);
    switch (arg_884) {
      case 3: {
        let v_890 = fn_98(arg_880, arg_881, arg_882, arg_883),
          v_891 = arg_885 !== null && v_890 < arg_885.length ? arg_885[v_890] : 0,
          v_892 = arg_886 !== null && v_890 < arg_886.length ? arg_886[v_890] : 255;
        return fn_887(v_891, v_892);
      }
      case 0: {
        let v_893 =
            arg_883 === 16
              ? fn_116(arg_880, arg_881 + arg_882 * 2)
              : fn_98(arg_880, arg_881, arg_882, arg_883),
          v_894 = fn_99(v_893, arg_883),
          v_895 = arg_886 !== null && arg_886.length >= 2 ? fn_116(arg_886, 0) : -1;
        return fn_887(fn_89(v_894, v_894, v_894), v_893 === v_895 ? 0 : 255);
      }
      case 2: {
        let v_896, v_897, v_898, v_899, v_900, v_901;
        if (arg_883 === 16) {
          let v_903 = arg_881 + arg_882 * 6;
          ((v_896 = fn_116(arg_880, v_903)),
            (v_897 = fn_116(arg_880, v_903 + 2)),
            (v_898 = fn_116(arg_880, v_903 + 4)),
            (v_899 = fn_91(v_896)),
            (v_900 = fn_91(v_897)),
            (v_901 = fn_91(v_898)));
        } else {
          let v_904 = arg_881 + arg_882 * 3;
          ((v_896 = arg_880[v_904]),
            (v_897 = arg_880[v_904 + 1]),
            (v_898 = arg_880[v_904 + 2]),
            (v_899 = v_896),
            (v_900 = v_897),
            (v_901 = v_898));
        }
        let v_902 =
          arg_886 !== null &&
          arg_886.length >= 6 &&
          v_896 === fn_116(arg_886, 0) &&
          v_897 === fn_116(arg_886, 2) &&
          v_898 === fn_116(arg_886, 4);
        return fn_887(fn_89(v_899, v_900, v_901), v_902 ? 0 : 255);
      }
      case 4: {
        if (arg_883 === 16) {
          let v_906 = arg_881 + arg_882 * 4;
          return fn_887(
            fn_89(
              fn_91(fn_116(arg_880, v_906)),
              fn_91(fn_116(arg_880, v_906)),
              fn_91(fn_116(arg_880, v_906))
            ),
            fn_91(fn_116(arg_880, v_906 + 2))
          );
        }
        let v_905 = arg_881 + arg_882 * 2;
        return fn_887(fn_89(arg_880[v_905], arg_880[v_905], arg_880[v_905]), arg_880[v_905 + 1]);
      }
      case 6: {
        if (arg_883 === 16) {
          let v_908 = arg_881 + arg_882 * 8;
          return fn_887(
            fn_89(
              fn_91(fn_116(arg_880, v_908)),
              fn_91(fn_116(arg_880, v_908 + 2)),
              fn_91(fn_116(arg_880, v_908 + 4))
            ),
            fn_91(fn_116(arg_880, v_908 + 6))
          );
        }
        let v_907 = arg_881 + arg_882 * 4;
        return fn_887(
          fn_89(arg_880[v_907], arg_880[v_907 + 1], arg_880[v_907 + 2]),
          arg_880[v_907 + 3]
        );
      }
      default:
        throw new Error(`PNG color type ${arg_884}`);
    }
  }
  function fn_101(arg_909, arg_910, arg_911, arg_912, arg_913) {
    let uint8Array_914 = new Uint8Array(arg_911 * arg_912),
      v_915 = arg_910,
      v_916 = -1;
    for (let num_917 = 0; num_917 < arg_911; num_917++) {
      let v_918 = arg_909[v_915++],
        v_919 = num_917 * arg_912;
      for (let num_920 = 0; num_920 < arg_912; num_920++) {
        let v_921 = arg_909[v_915++],
          v_922 = num_920 >= arg_913 ? uint8Array_914[v_919 + num_920 - arg_913] : 0,
          v_923 = v_916 >= 0 ? uint8Array_914[v_916 + num_920] : 0,
          v_924 = v_916 >= 0 && num_920 >= arg_913 ? uint8Array_914[v_916 + num_920 - arg_913] : 0,
          v_925;
        switch (v_918) {
          case 0:
            v_925 = v_921;
            break;
          case 1:
            v_925 = v_921 + v_922;
            break;
          case 2:
            v_925 = v_921 + v_923;
            break;
          case 3:
            v_925 = v_921 + ((v_922 + v_923) >>> 1);
            break;
          case 4:
            v_925 = v_921 + fn_97(v_922, v_923, v_924);
            break;
          default:
            throw new Error(`PNG filter ${v_918}`);
        }
        uint8Array_914[v_919 + num_920] = v_925 & 255;
      }
      v_916 = v_919;
    }
    return uint8Array_914;
  }
  function fn_102(arg_926) {
    let list_927 = [63519, 2016, 31, 0, 65535, 65504, 2047];
    for (let v_928 of list_927) if (arg_926[v_928] === 0) return v_928;
    for (let num_929 = 0; num_929 <= 65535; num_929++) if (arg_926[num_929] === 0) return num_929;
    return 63519;
  }
  function fn_103(arg_930) {
    try {
      return fn_104(arg_930);
    } catch (v_931) {
      return null;
    }
  }
  function fn_104(arg_932) {
    let list_933 = [137, 80, 78, 71, 13, 10, 26, 10];
    if (arg_932.length < 33) throw new Error("Not PNG");
    for (let num_954 = 0; num_954 < 8; num_954++)
      if (arg_932[num_954] !== list_933[num_954]) throw new Error("Not PNG");
    let num_934 = 8,
      v_935 = null,
      v_936 = null,
      v_937 = null,
      list_938 = [],
      num_939 = 0;
    e: for (; num_934 + 12 <= arg_932.length; ) {
      let v_955 = fn_117(arg_932, num_934);
      if (((num_934 += 4), v_955 < 0 || num_934 + 4 + v_955 + 4 > arg_932.length))
        throw new Error("Bad PNG chunk");
      let v_956 = String.fromCharCode(
        arg_932[num_934],
        arg_932[num_934 + 1],
        arg_932[num_934 + 2],
        arg_932[num_934 + 3]
      );
      num_934 += 4;
      let v_957 = num_934;
      switch (v_956) {
        case "IHDR": {
          if (v_955 !== 13) throw new Error("IHDR len");
          let v_958 = fn_117(arg_932, v_957),
            v_959 = fn_117(arg_932, v_957 + 4);
          if (arg_932[v_957 + 10] !== 0) throw new Error("Unsupported PNG compression");
          if (arg_932[v_957 + 11] !== 0) throw new Error("Unsupported PNG filter method");
          v_935 = {
            width: v_958,
            height: v_959,
            bitDepth: arg_932[v_957 + 8],
            colorType: arg_932[v_957 + 9],
            interlace: arg_932[v_957 + 12],
          };
          break;
        }
        case "PLTE": {
          if (v_955 % 3 !== 0) throw new Error("PLTE len");
          v_936 = new Uint16Array(v_955 / 3);
          for (let num_960 = 0; num_960 < v_936.length; num_960++)
            v_936[num_960] = fn_89(
              arg_932[v_957 + num_960 * 3],
              arg_932[v_957 + num_960 * 3 + 1],
              arg_932[v_957 + num_960 * 3 + 2]
            );
          break;
        }
        case "tRNS":
          v_937 = arg_932.slice(v_957, v_957 + v_955);
          break;
        case "IDAT": {
          if (num_939 + v_955 > 33554432)
            throw new Error("PNG IDAT exceeds compressed-data safety limit");
          (list_938.push(arg_932.slice(v_957, v_957 + v_955)), (num_939 += v_955));
          break;
        }
        case "IEND":
          break e;
      }
      num_934 += v_955 + 4;
    }
    let v_940 = v_935;
    if (v_940 === null) throw new Error("PNG missing IHDR");
    if (!(v_940.width >= 1 && v_940.width <= 4096 && v_940.height >= 1 && v_940.height <= 4096))
      throw new Error("PNG size");
    if (v_940.width * v_940.height > 4194304)
      throw new Error("PNG pixel count exceeds safety limit");
    if (v_940.interlace !== 0 && v_940.interlace !== 1)
      throw new Error(`PNG interlace=${v_940.interlace}`);
    let v_941 =
      v_940.colorType === 0
        ? 1
        : v_940.colorType === 2
          ? 3
          : v_940.colorType === 3
            ? 1
            : v_940.colorType === 4
              ? 2
              : v_940.colorType === 6
                ? 4
                : -1;
    if (v_941 < 0) throw new Error(`PNG color type ${v_940.colorType}`);
    if (
      !(v_940.colorType === 3
        ? v_940.bitDepth === 1 ||
          v_940.bitDepth === 2 ||
          v_940.bitDepth === 4 ||
          v_940.bitDepth === 8
        : v_940.colorType === 0
          ? v_940.bitDepth === 1 ||
            v_940.bitDepth === 2 ||
            v_940.bitDepth === 4 ||
            v_940.bitDepth === 8 ||
            v_940.bitDepth === 16
          : v_940.bitDepth === 8 || v_940.bitDepth === 16)
    )
      throw new Error(`PNG bit depth ${v_940.bitDepth} type=${v_940.colorType}`);
    if (v_940.colorType === 3 && v_936 === null) throw new Error("Indexed PNG missing PLTE");
    let v_942 = v_940.interlace === 0 ? list_94 : list_95,
      num_943 = 0;
    for (let v_961 of v_942) {
      let v_962 = fn_96(v_940.width, v_961.x0, v_961.dx),
        v_963 = fn_96(v_940.height, v_961.y0, v_961.dy);
      if (v_962 <= 0 || v_963 <= 0) continue;
      let v_964 = Math.floor((v_962 * v_941 * v_940.bitDepth + 7) / 8);
      if (((num_943 += v_963 * (v_964 + 1)), num_943 > 67108864))
        throw new Error("PNG inflated scanlines exceed safety limit");
    }
    let uint8Array_944 = new Uint8Array(num_939),
      num_945 = 0;
    for (let v_965 of list_938) (uint8Array_944.set(v_965, num_945), (num_945 += v_965.length));
    let v_946 = fn_65(uint8Array_944, 0, num_943);
    if (v_946 === null || v_946.bytes.length !== num_943)
      throw new Error(`PNG inflated size != expected ${num_943}`);
    let v_947 = v_946.bytes,
      uint16Array_948 = new Uint16Array(v_940.width * v_940.height),
      obj_949 = { plane: null },
      fn_950 = (arg_966, arg_967, arg_968, arg_969) => {
        let v_970 = arg_967 * v_940.width + arg_966;
        ((uint16Array_948[v_970] = arg_968 & 65535),
          arg_969 !== 255 &&
            (obj_949.plane === null &&
              (obj_949.plane = new Uint8Array(uint16Array_948.length).fill(255)),
            (obj_949.plane[v_970] = arg_969 < 0 ? 0 : arg_969 > 255 ? 255 : arg_969)));
      },
      num_951 = 0;
    for (let v_971 of v_942) {
      let v_972 = fn_96(v_940.width, v_971.x0, v_971.dx),
        v_973 = fn_96(v_940.height, v_971.y0, v_971.dy);
      if (v_972 <= 0 || v_973 <= 0) continue;
      let v_974 = Math.floor((v_972 * v_941 * v_940.bitDepth + 7) / 8),
        v_975 = Math.max(1, Math.floor((v_941 * v_940.bitDepth + 7) / 8)),
        v_976 = v_973 * (v_974 + 1);
      if (num_951 + v_976 > v_947.length) throw new Error("PNG data short pass");
      let v_977 = fn_101(v_947, num_951, v_973, v_974, v_975);
      num_951 += v_976;
      for (let num_978 = 0; num_978 < v_973; num_978++) {
        let v_979 = v_971.y0 + num_978 * v_971.dy,
          v_980 = num_978 * v_974;
        for (let num_981 = 0; num_981 < v_972; num_981++) {
          let v_982 = v_971.x0 + num_981 * v_971.dx,
            v_983 = fn_100(v_977, v_980, num_981, v_940.bitDepth, v_940.colorType, v_936, v_937);
          fn_950(v_982, v_979, v_983 & 65535, (v_983 >>> 16) & 255);
        }
      }
    }
    let v_952 = -1,
      v_953 = obj_949.plane;
    if (v_953 !== null && v_953.includes(0)) {
      let uint8Array_984 = new Uint8Array(65536);
      for (let num_985 = 0; num_985 < uint16Array_948.length; num_985++)
        v_953[num_985] !== 0 && (uint8Array_984[uint16Array_948[num_985]] = 1);
      v_952 = fn_102(uint8Array_984);
      for (let num_986 = 0; num_986 < uint16Array_948.length; num_986++)
        v_953[num_986] === 0 && (uint16Array_948[num_986] = v_952);
    }
    return {
      width: v_940.width,
      height: v_940.height,
      pixels: uint16Array_948,
      alpha: v_953,
      transparentColor565: v_952,
    };
  }
  function fn_105(arg_987) {
    if (arg_987.length < 13) return null;
    let v_988 = String.fromCharCode(
      arg_987[0],
      arg_987[1],
      arg_987[2],
      arg_987[3],
      arg_987[4],
      arg_987[5]
    );
    if (v_988 !== "GIF87a" && v_988 !== "GIF89a") return null;
    let num_989 = 6,
      v_990 = fn_113(arg_987, num_989);
    num_989 += 2;
    let v_991 = fn_113(arg_987, num_989);
    if (
      ((num_989 += 2),
      v_990 <= 0 || v_991 <= 0 || v_990 > 4096 || v_991 > 4096 || v_990 * v_991 > 4194304)
    )
      return null;
    let v_992 = arg_987[num_989++],
      v_993 = (v_992 & 128) !== 0,
      v_994 = 1 << ((v_992 & 7) + 1);
    num_989 += 2;
    let v_995 = v_993 ? fn_107(arg_987, num_989, v_994) : null;
    if (v_993 && v_995 === null) return null;
    v_993 && (num_989 += v_994 * 3);
    let v_996 = -1;
    for (; num_989 < arg_987.length; ) {
      let v_997 = arg_987[num_989++];
      if (v_997 === 59) return null;
      if (v_997 === 33) {
        if (num_989 >= arg_987.length) return null;
        if (arg_987[num_989++] === 249) {
          if (num_989 >= arg_987.length) return null;
          let v_1014 = arg_987[num_989++];
          if (
            v_1014 < 4 ||
            num_989 + v_1014 > arg_987.length ||
            ((v_996 = (arg_987[num_989] & 1) !== 0 ? arg_987[num_989 + 3] : -1),
            (num_989 += v_1014),
            num_989 >= arg_987.length || arg_987[num_989++] !== 0)
          )
            return null;
        } else {
          let v_1015 = fn_109(arg_987, num_989);
          if (v_1015 === null) return null;
          num_989 = v_1015;
        }
        continue;
      }
      if (v_997 === 0) continue;
      if (v_997 !== 44 || num_989 + 9 > arg_987.length) return null;
      let v_998 = fn_113(arg_987, num_989);
      num_989 += 2;
      let v_999 = fn_113(arg_987, num_989);
      num_989 += 2;
      let v_1000 = fn_113(arg_987, num_989);
      num_989 += 2;
      let v_1001 = fn_113(arg_987, num_989);
      num_989 += 2;
      let v_1002 = arg_987[num_989++];
      if (
        v_1000 <= 0 ||
        v_1001 <= 0 ||
        v_998 < 0 ||
        v_999 < 0 ||
        v_998 + v_1000 > v_990 ||
        v_999 + v_1001 > v_991
      )
        return null;
      let v_1003 = (v_1002 & 128) !== 0,
        v_1004 = (v_1002 & 64) !== 0,
        v_1005 = 1 << ((v_1002 & 7) + 1),
        v_1006 = v_1003 ? fn_107(arg_987, num_989, v_1005) : v_995;
      if (v_1006 === null || (v_1003 && (num_989 += v_1005 * 3), num_989 >= arg_987.length))
        return null;
      let v_1007 = arg_987[num_989++];
      if (v_1007 < 2 || v_1007 > 8) return null;
      let v_1008 = fn_108(arg_987, num_989);
      if (v_1008 === null) return null;
      let v_1009 = fn_106(v_1008, v_1007, v_1000 * v_1001);
      if (v_1009 === null) return null;
      let uint16Array_1010 = new Uint16Array(v_990 * v_991),
        v_1011 = v_996 >= 0 ? new Uint8Array(v_990 * v_991) : null,
        num_1012 = 0,
        fn_1013 = (arg_1016) => {
          if (arg_1016 < 0 || arg_1016 >= v_1001) return;
          let v_1017 = (v_999 + arg_1016) * v_990 + v_998;
          for (let num_1018 = 0; num_1018 < v_1000; num_1018++) {
            if (num_1012 >= v_1009.length) return;
            let v_1019 = v_1009[num_1012++],
              v_1020 = v_1019 < v_1006.length ? v_1006[v_1019] : 0,
              v_1021 = v_1017 + num_1018;
            ((uint16Array_1010[v_1021] = fn_112(v_1020)),
              v_1011 !== null && (v_1011[v_1021] = v_1019 === v_996 ? 0 : 255));
          }
        };
      if (v_1004) {
        for (let num_1022 = 0; num_1022 < v_1001; num_1022 += 8) fn_1013(num_1022);
        for (let num_1023 = 4; num_1023 < v_1001; num_1023 += 8) fn_1013(num_1023);
        for (let num_1024 = 2; num_1024 < v_1001; num_1024 += 4) fn_1013(num_1024);
        for (let num_1025 = 1; num_1025 < v_1001; num_1025 += 2) fn_1013(num_1025);
      } else for (let num_1026 = 0; num_1026 < v_1001; num_1026++) fn_1013(num_1026);
      if (num_1012 < v_1000 * v_1001)
        for (; num_1012 < v_1000 * v_1001; ) {
          let v_1027 =
            (v_999 + Math.floor(num_1012 / v_1000)) * v_990 + v_998 + (num_1012 % v_1000);
          (v_1027 >= 0 &&
            v_1027 < uint16Array_1010.length &&
            (uint16Array_1010[v_1027] = fn_112(v_1006.length > 0 ? v_1006[0] : 0)),
            num_1012++);
        }
      return (
        v_1011 !== null && !v_1011.includes(0) && (v_1011 = null),
        {
          width: v_990,
          height: v_991,
          pixels: uint16Array_1010,
          alpha: v_1011,
          transparentColor565: -1,
        }
      );
    }
    return null;
  }
  function fn_106(arg_1028, arg_1029, arg_1030) {
    let v_1031 = 1 << arg_1029,
      v_1032 = v_1031 + 1,
      int32Array_1033 = new Int32Array(4096),
      uint8Array_1034 = new Uint8Array(4096),
      uint8Array_1035 = new Uint8Array(4097);
    for (let num_1044 = 0; num_1044 < v_1031; num_1044++)
      ((int32Array_1033[num_1044] = -1), (uint8Array_1034[num_1044] = num_1044));
    let v_1036 = arg_1029 + 1,
      v_1037 = v_1032 + 1,
      num_1038 = 0,
      v_1039 = -1,
      num_1040 = 0,
      uint8Array_1041 = new Uint8Array(arg_1030),
      num_1042 = 0,
      fn_1043 = (arg_1045) => {
        if (num_1038 + arg_1045 > arg_1028.length * 8) return -1;
        let num_1046 = 0;
        for (let num_1047 = 0; num_1047 < arg_1045; num_1047++) {
          let v_1048 = arg_1028[(num_1038 + num_1047) >>> 3];
          num_1046 |= ((v_1048 >>> ((num_1038 + num_1047) & 7)) & 1) << num_1047;
        }
        return ((num_1038 += arg_1045), num_1046);
      };
    for (; num_1042 < arg_1030; ) {
      let v_1049 = fn_1043(v_1036);
      if (v_1049 < 0) break;
      if (v_1049 === v_1031) {
        ((v_1036 = arg_1029 + 1), (v_1037 = v_1032 + 1), (v_1039 = -1));
        continue;
      }
      if (v_1049 === v_1032) break;
      if (v_1039 < 0) {
        if (v_1049 >= v_1031) return null;
        ((uint8Array_1041[num_1042++] = uint8Array_1034[v_1049]),
          (num_1040 = uint8Array_1034[v_1049]),
          (v_1039 = v_1049));
        continue;
      }
      let v_1050 = v_1049,
        v_1051 = v_1049,
        num_1052 = 0;
      if (v_1051 >= v_1037) {
        if (v_1051 !== v_1037) return null;
        ((uint8Array_1035[num_1052++] = num_1040), (v_1051 = v_1039));
      }
      let num_1053 = 0;
      for (; v_1051 >= v_1031; ) {
        if (v_1051 >= 4096 || num_1053++ > 4096) return null;
        ((uint8Array_1035[num_1052++] = uint8Array_1034[v_1051]),
          (v_1051 = int32Array_1033[v_1051]));
      }
      if (v_1051 < 0 || v_1051 >= v_1031) return null;
      for (
        num_1040 = uint8Array_1034[v_1051], uint8Array_1035[num_1052++] = num_1040;
        num_1052 > 0 && num_1042 < arg_1030;
      )
        uint8Array_1041[num_1042++] = uint8Array_1035[--num_1052];
      (v_1037 < 4096 &&
        ((int32Array_1033[v_1037] = v_1039),
        (uint8Array_1034[v_1037] = num_1040),
        v_1037++,
        v_1037 === 1 << v_1036 && v_1036 < 12 && v_1036++),
        (v_1039 = v_1050));
    }
    return num_1042 === arg_1030 ? uint8Array_1041 : null;
  }
  function fn_107(arg_1054, arg_1055, arg_1056) {
    if (arg_1055 < 0 || arg_1056 <= 0 || arg_1055 + arg_1056 * 3 > arg_1054.length) return null;
    let int32Array_1057 = new Int32Array(arg_1056),
      v_1058 = arg_1055;
    for (let num_1059 = 0; num_1059 < arg_1056; num_1059++) {
      let v_1060 = arg_1054[v_1058++],
        v_1061 = arg_1054[v_1058++],
        v_1062 = arg_1054[v_1058++];
      int32Array_1057[num_1059] = (v_1060 << 16) | (v_1061 << 8) | v_1062;
    }
    return int32Array_1057;
  }
  function fn_108(arg_1063, arg_1064) {
    let v_1065 = arg_1064,
      num_1066 = 0,
      list_1067 = [];
    for (;;) {
      if (v_1065 >= arg_1063.length) return null;
      let v_1070 = arg_1063[v_1065++];
      if (v_1070 === 0) break;
      if (v_1065 + v_1070 > arg_1063.length || num_1066 > 33554432 - v_1070) return null;
      (list_1067.push([v_1065, v_1070]), (num_1066 += v_1070), (v_1065 += v_1070));
    }
    let uint8Array_1068 = new Uint8Array(num_1066),
      num_1069 = 0;
    for (let [v_1071, v_1072] of list_1067)
      (uint8Array_1068.set(arg_1063.subarray(v_1071, v_1071 + v_1072), num_1069),
        (num_1069 += v_1072));
    return uint8Array_1068;
  }
  function fn_109(arg_1073, arg_1074) {
    let v_1075 = arg_1074;
    for (;;) {
      if (v_1075 >= arg_1073.length) return null;
      let v_1076 = arg_1073[v_1075++];
      if (v_1076 === 0) return v_1075;
      if (v_1075 + v_1076 > arg_1073.length) return null;
      v_1075 += v_1076;
    }
  }
  function fn_110(arg_1077) {
    try {
      return fn_111(arg_1077);
    } catch (v_1078) {
      return null;
    }
  }
  function fn_111(arg_1079) {
    if (arg_1079.length < 26 || arg_1079[0] !== 66 || arg_1079[1] !== 77) return null;
    let v_1080 = fn_115(arg_1079, 14),
      v_1081,
      v_1082,
      v_1083,
      v_1084,
      v_1085,
      v_1086 = fn_115(arg_1079, 10);
    if (v_1080 === 12)
      ((v_1081 = fn_113(arg_1079, 18)),
        (v_1082 = fn_113(arg_1079, 20)),
        (v_1083 = fn_113(arg_1079, 22)),
        (v_1084 = fn_113(arg_1079, 24)),
        (v_1085 = 0));
    else if (v_1080 >= 40)
      ((v_1081 = fn_114(arg_1079, 18)),
        (v_1082 = fn_114(arg_1079, 22)),
        (v_1083 = fn_113(arg_1079, 26)),
        (v_1084 = fn_113(arg_1079, 28)),
        (v_1085 = fn_115(arg_1079, 30)));
    else return null;
    if (
      v_1083 !== 1 ||
      (v_1085 !== 0 && !(v_1084 === 8 && v_1085 === 1)) ||
      v_1081 <= 0 ||
      v_1081 > 4096
    )
      return null;
    let v_1087 = Math.abs(v_1082);
    if (
      v_1087 <= 0 ||
      v_1087 > 4096 ||
      v_1081 * v_1087 > 4194304 ||
      (v_1084 !== 1 && v_1084 !== 4 && v_1084 !== 8 && v_1084 !== 24 && v_1084 !== 32)
    )
      return null;
    let v_1088 = v_1084 === 1 ? 2 : v_1084 === 4 ? 16 : v_1084 === 8 ? 256 : 0,
      v_1089 = 14 + v_1080,
      v_1090 = Math.floor((v_1081 * v_1084 + 31) / 32) * 4,
      v_1091 = v_1082 > 0,
      uint16Array_1092 = new Uint16Array(v_1081 * v_1087);
    if (v_1088 > 0) {
      let v_1093 = v_1080 === 12 ? 3 : 4;
      if (arg_1079.length < v_1089 + v_1088 * v_1093) return null;
      let int32Array_1094 = new Int32Array(v_1088);
      for (let num_1095 = 0; num_1095 < v_1088; num_1095++) {
        let v_1096 = v_1089 + num_1095 * v_1093;
        int32Array_1094[num_1095] =
          (arg_1079[v_1096 + 2] << 16) | (arg_1079[v_1096 + 1] << 8) | arg_1079[v_1096];
      }
      if (v_1086 < 0 || v_1086 + v_1090 * v_1087 > arg_1079.length) return null;
      for (let num_1097 = 0; num_1097 < v_1087; num_1097++) {
        let v_1098 = v_1091 ? v_1087 - 1 - num_1097 : num_1097,
          v_1099 = v_1086 + v_1098 * v_1090,
          v_1100 = num_1097 * v_1081;
        for (let num_1101 = 0; num_1101 < v_1081; num_1101++) {
          let v_1102;
          if (v_1084 === 8) v_1102 = arg_1079[v_1099 + num_1101];
          else if (v_1084 === 4) {
            let v_1103 = arg_1079[v_1099 + Math.floor(num_1101 / 2)];
            v_1102 = (num_1101 & 1) === 0 ? v_1103 >>> 4 : v_1103 & 15;
          } else
            v_1102 = (arg_1079[v_1099 + Math.floor(num_1101 / 8)] >>> (7 - (num_1101 & 7))) & 1;
          uint16Array_1092[v_1100 + num_1101] = fn_112(
            v_1102 < v_1088 ? int32Array_1094[v_1102] : 0
          );
        }
      }
    } else {
      let v_1104 = v_1084 / 8;
      if (v_1086 < 0 || v_1086 + v_1090 * v_1087 > arg_1079.length) return null;
      for (let num_1105 = 0; num_1105 < v_1087; num_1105++) {
        let v_1106 = v_1091 ? v_1087 - 1 - num_1105 : num_1105,
          v_1107 = v_1086 + v_1106 * v_1090,
          v_1108 = num_1105 * v_1081;
        for (let num_1109 = 0; num_1109 < v_1081; num_1109++) {
          let v_1110 = v_1107 + num_1109 * v_1104;
          uint16Array_1092[v_1108 + num_1109] = fn_112(
            (arg_1079[v_1110 + 2] << 16) | (arg_1079[v_1110 + 1] << 8) | arg_1079[v_1110]
          );
        }
      }
    }
    return {
      width: v_1081,
      height: v_1087,
      pixels: uint16Array_1092,
      alpha: null,
      transparentColor565: -1,
    };
  }
  function fn_112(arg_1111) {
    return fn_89((arg_1111 >>> 16) & 255, (arg_1111 >>> 8) & 255, arg_1111 & 255);
  }
  function fn_113(arg_1112, arg_1113) {
    return arg_1112[arg_1113] | (arg_1112[arg_1113 + 1] << 8);
  }
  function fn_114(arg_1114, arg_1115) {
    return (
      arg_1114[arg_1115] |
      (arg_1114[arg_1115 + 1] << 8) |
      (arg_1114[arg_1115 + 2] << 16) |
      (arg_1114[arg_1115 + 3] << 24) |
      0
    );
  }
  function fn_115(arg_1116, arg_1117) {
    return fn_114(arg_1116, arg_1117) >>> 0;
  }
  function fn_116(arg_1118, arg_1119) {
    return (arg_1118[arg_1119] << 8) | arg_1118[arg_1119 + 1];
  }
  function fn_117(arg_1120, arg_1121) {
    return (
      (arg_1120[arg_1121] << 24) |
      (arg_1120[arg_1121 + 1] << 16) |
      (arg_1120[arg_1121 + 2] << 8) |
      arg_1120[arg_1121 + 3] |
      0
    );
  }
  var num_118 = 1610612736,
    v_119 = 8 * 1024 * 1024,
    v_120 = -1,
    num_121 = 0,
    num_122 = 48,
    num_123 = 32,
    v_124 = class {
      constructor(arg_1122, arg_1123, arg_1124) {
        (fn_12(this, "fb565"),
          fn_12(this, "layers", new Map()),
          fn_12(this, "surfacesByAddr", new Map()),
          fn_12(this, "surfacesByHandle", new Map()),
          fn_12(this, "active", v_120),
          fn_12(this, "pendingBlt", null),
          fn_12(this, "nextHandle", 1),
          fn_12(this, "arenaTop", num_118),
          fn_12(this, "freeArenaBlocks", []),
          fn_12(this, "decodedImageCache", new Map()),
          fn_12(this, "dirty", !1),
          fn_12(this, "flushCount", 0),
          fn_12(this, "currentColor", 65535),
          fn_12(this, "text", new v_87()),
          fn_12(this, "screenLayerHandle", v_120),
          (this.mem = arg_1122),
          (this.sw = arg_1123),
          (this.sh = arg_1124),
          (this.fb565 = new Uint16Array(arg_1123 * arg_1124)),
          arg_1122.map(num_118, v_119, !0, !0, !1));
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
      allocBytes(arg_1125) {
        let v_1126 = (arg_1125 + 3) & -4;
        if (v_1126 <= 0) throw new Error("graphics arena exhausted");
        let v_1127 = -1,
          v_1128 = Number.MAX_SAFE_INTEGER;
        for (let num_1131 = 0; num_1131 < this.freeArenaBlocks.length; num_1131++) {
          let v_1132 = this.freeArenaBlocks[num_1131];
          v_1132.bytes >= v_1126 &&
            v_1132.bytes < v_1128 &&
            ((v_1127 = num_1131), (v_1128 = v_1132.bytes));
        }
        if (v_1127 >= 0) return this.freeArenaBlocks.splice(v_1127, 1)[0].addr;
        let v_1129 = this.arenaTop,
          v_1130 = v_1129 + v_1126;
        if (v_1130 - num_118 > v_119) throw new Error("graphics arena exhausted");
        return ((this.arenaTop = v_1130), v_1129);
      }
      releaseBytes(arg_1133, arg_1134) {
        arg_1134 <= 0 ||
          arg_1133 < num_118 ||
          this.freeArenaBlocks.push({ addr: arg_1133, bytes: arg_1134 });
      }
      createLayer(arg_1135, arg_1136, arg_1137, arg_1138, arg_1139 = -1, arg_1140 = -1) {
        if (
          arg_1137 <= 0 ||
          arg_1138 <= 0 ||
          arg_1137 > 4096 ||
          arg_1138 > 4096 ||
          arg_1137 * arg_1138 * 2 > v_119
        )
          return v_120;
        let v_1141 = (arg_1137 * arg_1138 * 2 + 3) & -4,
          v_1142 = arg_1140 < 0,
          v_1143 = v_1142 ? this.allocBytes(v_1141) : arg_1140,
          v_1144 = this.nextHandle++,
          obj_1145 = {
            handle: v_1144,
            x: arg_1135,
            y: arg_1136,
            w: arg_1137,
            h: arg_1138,
            buf: v_1143,
            transparentColor: arg_1139,
            clip: { x: 0, y: 0, w: arg_1137, h: arg_1138 },
            bytes: v_1142 ? v_1141 : 0,
            opacity: 100,
          };
        return (
          this.layers.set(v_1144, obj_1145),
          this.surfacesByAddr.set(v_1143, obj_1145),
          this.active === v_120 && (this.active = v_1144),
          v_1144
        );
      }
      createCanvas(arg_1146, arg_1147, arg_1148 = -1) {
        if (arg_1146 <= 0 || arg_1147 <= 0 || (arg_1146 * arg_1147 + 16) * 2 > v_119) return v_120;
        let v_1149 = (num_123 + arg_1146 * arg_1147 * 2 + 3) & -4,
          v_1150 = this.allocBytes(v_1149),
          obj_1151 = {
            buf: v_1150 + num_123,
            w: arg_1146,
            h: arg_1147,
            transparentColor: arg_1148,
            clip: null,
            bytes: v_1149,
            header: v_1150,
            alpha: null,
          };
        return (
          this.surfacesByHandle.set(v_1150, obj_1151),
          this.surfacesByAddr.set(v_1150, obj_1151),
          this.surfacesByAddr.set(obj_1151.buf, obj_1151),
          v_1150
        );
      }
      releaseCanvas(arg_1152) {
        var v_1153, v_1154, v_1155, v_1156, v_1157;
        let v_1158 =
          (v_1153 = this.surfacesByHandle.get(arg_1152)) != null
            ? v_1153
            : this.surfacesByAddr.get(arg_1152);
        return v_1158
          ? (this.surfacesByHandle.delete((v_1154 = v_1158.header) != null ? v_1154 : v_1158.buf),
            this.surfacesByAddr.delete((v_1155 = v_1158.header) != null ? v_1155 : v_1158.buf),
            this.surfacesByAddr.delete(v_1158.buf),
            this.releaseBytes(
              (v_1156 = v_1158.header) != null ? v_1156 : v_1158.buf,
              (v_1157 = v_1158.bytes) != null ? v_1157 : 0
            ),
            0)
          : -1;
      }
      deleteLayer(arg_1159) {
        let v_1160 = this.layers.get(arg_1159);
        return v_1160
          ? (this.layers.delete(arg_1159),
            this.surfacesByAddr.delete(v_1160.buf),
            this.releaseBytes(v_1160.buf, v_1160.bytes),
            this.screenLayerHandle === arg_1159 && (this.screenLayerHandle = v_120),
            this.active === arg_1159 &&
              (this.active = this.layers.size > 0 ? this.layers.keys().next().value : v_120),
            0)
          : -1;
      }
      layer(arg_1161) {
        return this.layers.get(arg_1161);
      }
      layerBuf(arg_1162) {
        return this.layers.get(arg_1162);
      }
      getLayerBuffer(arg_1163) {
        let v_1164 = this.layers.get(arg_1163);
        if (v_1164) return v_1164.buf;
        if (arg_1163 === num_121) {
          let v_1165 = this.drawTarget(),
            v_1166 = this.layers.get(v_1165);
          if (v_1166) return v_1166.buf;
        }
        return 0;
      }
      activeLayer(arg_1167) {
        return arg_1167 !== v_120 && !this.layers.has(arg_1167)
          ? v_120
          : ((this.active = arg_1167), 0);
      }
      drawTarget() {
        return this.layers.has(this.active) ? this.active : this.screenLayerHandle;
      }
      ensureScreenLayer() {
        if (this.screenLayerHandle !== v_120) return this.screenLayerHandle;
        let v_1168 = this.active;
        if (this.layers.has(v_1168))
          return ((this.screenLayerHandle = v_1168), this.screenLayerHandle);
        let v_1169 = this.createLayer(0, 0, this.sw, this.sh, -1);
        return (
          v_1169 !== v_120 &&
            ((this.screenLayerHandle = v_1169), v_1168 === v_120 && (this.active = v_120)),
          v_1169
        );
      }
      screenBufferAddress() {
        let v_1170 = this.layers.get(this.screenLayerHandle);
        return v_1170 ? v_1170.buf : 0;
      }
      resolveLayerHandle(arg_1171) {
        return arg_1171 === 0 || arg_1171 === -1 || arg_1171 === v_120
          ? this.drawTarget()
          : arg_1171;
      }
      canvasBuffer(arg_1172) {
        var v_1173, v_1174;
        let v_1175 =
          (v_1173 = this.surfacesByHandle.get(arg_1172)) != null
            ? v_1173
            : this.surfacesByAddr.get(arg_1172);
        return v_1175 ? ((v_1174 = v_1175.header) != null ? v_1174 : v_1175.buf) : 0;
      }
      loadImage(arg_1176) {
        let v_1177 = this.decodeCached(arg_1176);
        if (v_1177 === null) return 0;
        let v_1178 = this.createCanvas(v_1177.width, v_1177.height);
        if (v_1178 === v_120) return 0;
        let v_1179 = this.surfacesByHandle.get(v_1178);
        return v_1179
          ? (this.uploadRgb565(v_1179.buf, v_1177.pixels),
            v_1177.transparentColor565 >= 0 &&
              (v_1179.transparentColor = v_1177.transparentColor565),
            (v_1179.alpha = v_1177.alpha !== null ? v_1177.alpha.slice() : null),
            v_1178)
          : 0;
      }
      getImageBuffer(arg_1180) {
        let v_1181 = this.surfacesByHandle.get(arg_1180);
        if (v_1181) return v_1181.buf;
        let v_1182 = this.layers.get(arg_1180);
        return v_1182 ? v_1182.buf : 0;
      }
      releaseImage(arg_1183) {
        return this.releaseCanvas(arg_1183);
      }
      imageWidth(arg_1184) {
        var v_1185;
        let v_1186 =
          (v_1185 = this.surfacesByHandle.get(arg_1184)) != null
            ? v_1185
            : this.surfacesByAddr.get(arg_1184);
        if (v_1186) return v_1186.w;
        let v_1187 = this.layers.get(arg_1184);
        return v_1187 ? v_1187.w : 0;
      }
      imageHeight(arg_1188) {
        var v_1189;
        let v_1190 =
          (v_1189 = this.surfacesByHandle.get(arg_1188)) != null
            ? v_1189
            : this.surfacesByAddr.get(arg_1188);
        if (v_1190) return v_1190.h;
        let v_1191 = this.layers.get(arg_1188);
        return v_1191 ? v_1191.h : 0;
      }
      setCanvasTransparentColor(arg_1192, arg_1193) {
        var v_1194;
        let v_1195 =
          (v_1194 = this.surfacesByHandle.get(arg_1192)) != null
            ? v_1194
            : this.surfacesByAddr.get(arg_1192);
        return v_1195
          ? ((v_1195.transparentColor = arg_1193 < 0 ? -1 : arg_1193 & 65535),
            (v_1195.alpha = null),
            0)
          : -1;
      }
      canvasFrameCount(arg_1196) {
        let v_1197 = this.surfacesByAddr.get(arg_1196);
        return v_1197 !== void 0 && v_1197.clip === null ? 1 : 0;
      }
      drawImageFromMemory(arg_1198, arg_1199, arg_1200, arg_1201) {
        if (arg_1201.length === 0) return -1;
        let v_1202 = this.loadImage(arg_1201);
        if (v_1202 === 0) return -1;
        try {
          let v_1203 = this.surfacesByHandle.get(v_1202);
          return v_1203
            ? this.blt(arg_1198, arg_1199, arg_1200, v_1203.buf, 0, 0, v_1203.w, v_1203.h, 0)
            : -1;
        } finally {
          this.releaseImage(v_1202);
        }
      }
      decodeCached(arg_1204) {
        if (arg_1204.length === 0) return null;
        let v_1205 = fn_125(arg_1204),
          v_1206 = this.decodedImageCache.get(v_1205);
        if (v_1206 !== void 0)
          return (
            this.decodedImageCache.delete(v_1205),
            this.decodedImageCache.set(v_1205, v_1206),
            v_1206
          );
        let v_1207 = fn_93(arg_1204);
        if (v_1207 === null) return null;
        if ((this.decodedImageCache.set(v_1205, v_1207), this.decodedImageCache.size > num_122)) {
          let v_1208 = this.decodedImageCache.keys().next();
          v_1208.done || this.decodedImageCache.delete(v_1208.value);
        }
        return v_1207;
      }
      uploadRgb565(arg_1209, arg_1210) {
        if (arg_1210.length === 0) return;
        let v_1211 = arg_1210.length * 2,
          v_1212 = this.mem.find(arg_1209, v_1211);
        if (v_1212 !== null) {
          let dataView_1214 = new DataView(
            v_1212.data.buffer,
            v_1212.data.byteOffset + ((arg_1209 - v_1212.start) | 0),
            v_1211
          );
          for (let num_1215 = 0; num_1215 < arg_1210.length; num_1215++)
            dataView_1214.setUint16(num_1215 * 2, arg_1210[num_1215], !0);
          return;
        }
        let v_1213 = arg_1209;
        for (let num_1216 = 0; num_1216 < arg_1210.length; num_1216++)
          (this.mem.write16(v_1213, arg_1210[num_1216], !0), (v_1213 += 2));
      }
      surface(arg_1217) {
        var v_1218, v_1219, v_1220;
        return arg_1217 === 0 || arg_1217 === -1 || arg_1217 === v_120
          ? (v_1218 = this.layers.get(this.drawTarget())) != null
            ? v_1218
            : null
          : this.surfacesByAddr.get(arg_1217) ||
              ((v_1220 =
                (v_1219 = this.surfacesByHandle.get(arg_1217)) != null
                  ? v_1219
                  : this.layers.get(arg_1217)) != null
                ? v_1220
                : null);
      }
      setPixelOnSurface(arg_1221, arg_1222, arg_1223, arg_1224) {
        let v_1225 = this.surface(arg_1221);
        if (
          v_1225 === null ||
          arg_1222 < 0 ||
          arg_1223 < 0 ||
          arg_1222 >= v_1225.w ||
          arg_1223 >= v_1225.h
        )
          return -1;
        let v_1226 = v_1225.clip;
        return (
          (v_1226 !== null &&
            (arg_1222 < v_1226.x ||
              arg_1223 < v_1226.y ||
              arg_1222 >= v_1226.x + v_1226.w ||
              arg_1223 >= v_1226.y + v_1226.h)) ||
            (this.mem.write16(v_1225.buf + (arg_1223 * v_1225.w + arg_1222) * 2, arg_1224 & 65535),
            (this.dirty = !0)),
          0
        );
      }
      getPixelFromSurface(arg_1227, arg_1228, arg_1229) {
        let v_1230 = this.surface(arg_1227);
        return v_1230 === null ||
          arg_1228 < 0 ||
          arg_1229 < 0 ||
          arg_1228 >= v_1230.w ||
          arg_1229 >= v_1230.h
          ? 0
          : this.mem.read16(v_1230.buf + (arg_1229 * v_1230.w + arg_1228) * 2) & 65535;
      }
      clearLayerBg(arg_1231) {
        let v_1232 = this.layers.get(arg_1231);
        if (!v_1232) return -1;
        let v_1233 = v_1232.transparentColor >= 0 ? v_1232.transparentColor & 65535 : 0,
          v_1234 = v_1232.w * v_1232.h,
          v_1235 = v_1234 * 2,
          v_1236 = this.mem.find(v_1232.buf, v_1235);
        if (v_1236 !== null) {
          let dataView_1237 = new DataView(
            v_1236.data.buffer,
            v_1236.data.byteOffset + ((v_1232.buf - v_1236.start) | 0),
            v_1235
          );
          for (let num_1238 = 0; num_1238 < v_1234; num_1238++)
            dataView_1237.setUint16(num_1238 * 2, v_1233, !0);
        } else {
          let v_1239 = v_1232.buf;
          for (let num_1240 = 0; num_1240 < v_1234; num_1240++)
            (this.mem.write16(v_1239, v_1233), (v_1239 += 2));
        }
        return ((this.dirty = !0), 0);
      }
      blt(
        arg_1241,
        arg_1242,
        arg_1243,
        arg_1244,
        arg_1245,
        arg_1246,
        arg_1247,
        arg_1248,
        arg_1249 = 0
      ) {
        var v_1250, v_1251;
        let v_1252 = this.surface(arg_1241),
          v_1253 = this.surface(arg_1244);
        if (!v_1252 || !v_1253 || arg_1247 <= 0 || arg_1248 <= 0) return -1;
        let v_1254 =
            (v_1250 = v_1252.clip) != null ? v_1250 : { x: 0, y: 0, w: v_1252.w, h: v_1252.h },
          v_1255 = Math.max(0, -arg_1246, -arg_1243, v_1254.y - arg_1243),
          v_1256 = Math.min(
            arg_1248,
            v_1253.h - arg_1246,
            v_1252.h - arg_1243,
            v_1254.y + v_1254.h - arg_1243
          ),
          v_1257 = Math.max(0, -arg_1245, -arg_1242, v_1254.x - arg_1242),
          v_1258 = Math.min(
            arg_1247,
            v_1253.w - arg_1245,
            v_1252.w - arg_1242,
            v_1254.x + v_1254.w - arg_1242
          );
        if (v_1255 >= v_1256 || v_1257 >= v_1258) return 0;
        let v_1259 = v_1253.transparentColor,
          v_1260 = (v_1251 = v_1253.alpha) != null ? v_1251 : null,
          v_1261 = v_1253.buf === v_1252.buf,
          v_1262 = (v_1258 - v_1257) * 2;
        if (!v_1261 && v_1260 === null && v_1259 < 0) {
          let v_1265 = this.mem.find(v_1253.buf, v_1253.w * v_1253.h * 2),
            v_1266 = this.mem.find(v_1252.buf, v_1252.w * v_1252.h * 2);
          if (v_1265 !== null && v_1266 !== null) {
            let v_1267 = v_1265.data,
              v_1268 = v_1266.data,
              v_1269 = (v_1253.buf - v_1265.start) | 0,
              v_1270 = (v_1252.buf - v_1266.start) | 0;
            for (let v_1271 = v_1255; v_1271 < v_1256; v_1271++) {
              let v_1272 = v_1269 + ((arg_1246 + v_1271) * v_1253.w + arg_1245 + v_1257) * 2;
              v_1268.set(
                v_1267.subarray(v_1272, v_1272 + v_1262),
                v_1270 + ((arg_1243 + v_1271) * v_1252.w + arg_1242 + v_1257) * 2
              );
            }
            return 0;
          }
        }
        let v_1263 =
            v_1261 &&
            arg_1243 < arg_1246 + (v_1256 - v_1255) &&
            arg_1246 < arg_1243 + (v_1256 - v_1255),
          list_1264 = [];
        for (let v_1273 = v_1255; v_1273 < v_1256; v_1273++) list_1264.push(v_1273);
        v_1263 && arg_1243 > arg_1246 && list_1264.reverse();
        for (let v_1274 of list_1264) {
          let v_1275 = (arg_1246 + v_1274) * v_1253.w,
            v_1276 = (arg_1243 + v_1274) * v_1252.w;
          for (let v_1277 = v_1257; v_1277 < v_1258; v_1277++) {
            let v_1278 = v_1275 + arg_1245 + v_1277,
              v_1279 = this.mem.read16(v_1253.buf + v_1278 * 2),
              v_1280 = v_1260 !== null ? v_1260[v_1278] : 255;
            if (v_1260 !== null) {
              if (v_1280 === 0) continue;
            } else if (v_1259 >= 0 && v_1279 === (v_1259 & 65535)) continue;
            let v_1281 = v_1252.buf + (v_1276 + arg_1242 + v_1277) * 2;
            this.mem.write16(
              v_1281,
              v_1280 >= 255 ? v_1279 : fn_92(this.mem.read16(v_1281), v_1279, v_1280),
              !0
            );
          }
        }
        return 0;
      }
      fillRect(arg_1282, arg_1283, arg_1284, arg_1285, arg_1286, arg_1287) {
        var v_1288;
        let v_1289 = this.surface(arg_1282);
        if (!v_1289 || arg_1285 <= 0 || arg_1286 <= 0) return -1;
        let v_1290 =
            (v_1288 = v_1289.clip) != null ? v_1288 : { x: 0, y: 0, w: v_1289.w, h: v_1289.h },
          v_1291 = Math.max(arg_1283, 0, v_1290.x),
          v_1292 = Math.max(arg_1284, 0, v_1290.y),
          v_1293 = Math.min(v_1289.w, arg_1283 + arg_1285, v_1290.x + v_1290.w),
          v_1294 = Math.min(v_1289.h, arg_1284 + arg_1286, v_1290.y + v_1290.h),
          v_1295 = arg_1287 & 65535;
        for (let v_1296 = v_1292; v_1296 < v_1294; v_1296++) {
          let v_1297 = v_1289.buf + (v_1296 * v_1289.w + v_1291) * 2;
          for (let v_1298 = v_1291; v_1298 < v_1293; v_1298++)
            this.mem.write16(v_1297 + (v_1298 - v_1291) * 2, v_1295, !0);
        }
        return 0;
      }
      cleanSurface(arg_1299, arg_1300) {
        let v_1301 = this.surface(arg_1299);
        if (!v_1301) return -1;
        let v_1302 = v_1301.w * v_1301.h,
          v_1303 = v_1302 * 2,
          v_1304 = arg_1300 & 65535,
          v_1305 = this.mem.find(v_1301.buf, v_1303);
        if (v_1305 !== null) {
          let dataView_1306 = new DataView(
            v_1305.data.buffer,
            v_1305.data.byteOffset + ((v_1301.buf - v_1305.start) | 0),
            v_1303
          );
          for (let num_1307 = 0; num_1307 < v_1302; num_1307++)
            dataView_1306.setUint16(num_1307 * 2, v_1304, !0);
        } else {
          let v_1308 = v_1301.buf;
          for (let num_1309 = 0; num_1309 < v_1302; num_1309++)
            (this.mem.write16(v_1308, v_1304, !0), (v_1308 += 2));
        }
        return ((this.dirty = !0), 0);
      }
      gradientPaintRect(
        arg_1310,
        arg_1311,
        arg_1312,
        arg_1313,
        arg_1314,
        arg_1315,
        arg_1316,
        arg_1317
      ) {
        var v_1318;
        let v_1319 = this.surface(arg_1310);
        if (!v_1319) return -1;
        let v_1320 =
            (v_1318 = v_1319.clip) != null ? v_1318 : { x: 0, y: 0, w: v_1319.w, h: v_1319.h },
          v_1321 = Math.max(Math.min(arg_1311, arg_1313), 0, v_1320.x),
          v_1322 = Math.max(Math.min(arg_1312, arg_1314), 0, v_1320.y),
          v_1323 = Math.min(Math.max(arg_1311, arg_1313), v_1319.w - 1, v_1320.x + v_1320.w - 1),
          v_1324 = Math.min(Math.max(arg_1312, arg_1314), v_1319.h - 1, v_1320.y + v_1320.h - 1);
        if (v_1321 > v_1323 || v_1322 > v_1324) return 0;
        let v_1325 = fn_90(arg_1315 & 65535),
          v_1326 = fn_90(arg_1316 & 65535),
          v_1327 = Math.max(v_1323 - v_1321, 1),
          v_1328 = Math.max(v_1324 - v_1322, 1);
        for (let v_1329 = v_1322; v_1329 <= v_1324; v_1329++) {
          let v_1330 = v_1319.buf + (v_1329 * v_1319.w + v_1321) * 2;
          for (let v_1331 = v_1321; v_1331 <= v_1323; v_1331++) {
            let v_1332 = v_1331 - v_1321,
              v_1333 = v_1329 - v_1322,
              v_1334 =
                (arg_1317 & 7) === 0
                  ? v_1332 / v_1327
                  : (arg_1317 & 7) === 1
                    ? v_1333 / v_1328
                    : (arg_1317 & 7) === 2
                      ? (v_1332 + v_1333) / (v_1327 + v_1328)
                      : (arg_1317 & 7) === 3
                        ? (v_1327 - v_1332 + v_1333) / (v_1327 + v_1328)
                        : Math.max(Math.abs(v_1332 - v_1327 / 2), Math.abs(v_1333 - v_1328 / 2)) /
                          Math.max(v_1327, v_1328) /
                          2;
            (v_1334 >= 0 ? v_1334 > 1 && (v_1334 = 1) : (v_1334 = 0),
              this.mem.write16(
                v_1330 + (v_1331 - v_1321) * 2,
                fn_89(
                  v_1325[0] + (v_1326[0] - v_1325[0]) * v_1334,
                  v_1325[1] + (v_1326[1] - v_1325[1]) * v_1334,
                  v_1325[2] + (v_1326[2] - v_1325[2]) * v_1334
                ),
                !0
              ));
          }
        }
        return ((this.dirty = !0), 0);
      }
      drawRoundRectBuffer(
        arg_1335,
        arg_1336,
        arg_1337,
        arg_1338,
        arg_1339,
        arg_1340,
        arg_1341 = this.currentColor
      ) {
        var v_1342;
        if (arg_1338 <= 0 || arg_1339 <= 0) return 0;
        let v_1343 = this.surface(arg_1335);
        if (!v_1343) return -1;
        let v_1344 = Math.min(Math.max(arg_1340, 0), Math.min(arg_1338, arg_1339) >> 1);
        if (v_1344 === 0)
          return this.drawRectBuffer(arg_1335, arg_1336, arg_1337, arg_1338, arg_1339, arg_1341);
        let v_1345 =
            (v_1342 = v_1343.clip) != null ? v_1342 : { x: 0, y: 0, w: v_1343.w, h: v_1343.h },
          v_1346 = arg_1341 & 65535,
          fn_1347 = (arg_1350, arg_1351) => {
            arg_1350 < v_1345.x ||
              arg_1351 < v_1345.y ||
              arg_1350 >= v_1345.x + v_1345.w ||
              arg_1351 >= v_1345.y + v_1345.h ||
              arg_1350 < 0 ||
              arg_1351 < 0 ||
              arg_1350 >= v_1343.w ||
              arg_1351 >= v_1343.h ||
              this.mem.write16(v_1343.buf + (arg_1351 * v_1343.w + arg_1350) * 2, v_1346, !0);
          };
        for (let v_1352 = arg_1336 + v_1344; v_1352 < arg_1336 + arg_1338 - v_1344; v_1352++)
          (fn_1347(v_1352, arg_1337), fn_1347(v_1352, arg_1337 + arg_1339 - 1));
        for (let v_1353 = arg_1337 + v_1344; v_1353 < arg_1337 + arg_1339 - v_1344; v_1353++)
          (fn_1347(arg_1336, v_1353), fn_1347(arg_1336 + arg_1338 - 1, v_1353));
        let v_1348 = v_1344 * v_1344,
          v_1349 = (v_1344 - 1) * (v_1344 - 1);
        for (let num_1354 = 1; num_1354 <= v_1344; num_1354++)
          for (let num_1355 = 1; num_1355 <= v_1344; num_1355++) {
            let v_1356 = num_1355 * num_1355 + num_1354 * num_1354;
            v_1356 > v_1348 ||
              v_1356 <= v_1349 ||
              (fn_1347(arg_1336 + v_1344 - num_1355, arg_1337 + v_1344 - num_1354),
              fn_1347(arg_1336 + arg_1338 - 1 - v_1344 + num_1355, arg_1337 + v_1344 - num_1354),
              fn_1347(arg_1336 + v_1344 - num_1355, arg_1337 + arg_1339 - 1 - v_1344 + num_1354),
              fn_1347(
                arg_1336 + arg_1338 - 1 - v_1344 + num_1355,
                arg_1337 + arg_1339 - 1 - v_1344 + num_1354
              ));
          }
        return 0;
      }
      fillRoundRectBuffer(
        arg_1357,
        arg_1358,
        arg_1359,
        arg_1360,
        arg_1361,
        arg_1362,
        arg_1363 = this.currentColor
      ) {
        var v_1364;
        if (arg_1360 <= 0 || arg_1361 <= 0) return 0;
        let v_1365 = this.surface(arg_1357);
        if (!v_1365) return -1;
        let v_1366 = Math.min(Math.max(arg_1362, 0), Math.min(arg_1360, arg_1361) >> 1);
        if (v_1366 === 0)
          return this.fillRect(arg_1357, arg_1358, arg_1359, arg_1360, arg_1361, arg_1363);
        let v_1367 =
            (v_1364 = v_1365.clip) != null ? v_1364 : { x: 0, y: 0, w: v_1365.w, h: v_1365.h },
          v_1368 = Math.min(arg_1358 + arg_1360, v_1367.x + v_1367.w),
          v_1369 = Math.min(arg_1359 + arg_1361, v_1367.y + v_1367.h),
          v_1370 = arg_1363 & 65535,
          v_1371 = v_1366 * v_1366;
        for (let v_1372 = Math.max(arg_1359, v_1367.y); v_1372 < v_1369; v_1372++)
          for (let v_1373 = Math.max(arg_1358, v_1367.x); v_1373 < v_1368; v_1373++) {
            if (v_1373 < 0 || v_1372 < 0 || v_1373 >= v_1365.w || v_1372 >= v_1365.h) continue;
            let v_1374 =
                v_1373 < arg_1358 + v_1366
                  ? arg_1358 + v_1366 - v_1373
                  : v_1373 >= arg_1358 + arg_1360 - v_1366
                    ? v_1373 - (arg_1358 + arg_1360 - 1 - v_1366)
                    : 0,
              v_1375 =
                v_1372 < arg_1359 + v_1366
                  ? arg_1359 + v_1366 - v_1372
                  : v_1372 >= arg_1359 + arg_1361 - v_1366
                    ? v_1372 - (arg_1359 + arg_1361 - 1 - v_1366)
                    : 0;
            (v_1374 > 0 && v_1375 > 0 && v_1374 * v_1374 + v_1375 * v_1375 > v_1371) ||
              this.mem.write16(v_1365.buf + (v_1372 * v_1365.w + v_1373) * 2, v_1370, !0);
          }
        return 0;
      }
      fillEllipseBuffer(
        arg_1376,
        arg_1377,
        arg_1378,
        arg_1379,
        arg_1380,
        arg_1381 = this.currentColor
      ) {
        var v_1382;
        if (arg_1379 <= 0 || arg_1380 <= 0) return 0;
        let v_1383 = this.surface(arg_1376);
        if (!v_1383) return -1;
        let v_1384 =
            (v_1382 = v_1383.clip) != null ? v_1382 : { x: 0, y: 0, w: v_1383.w, h: v_1383.h },
          v_1385 = arg_1381 & 65535,
          v_1386 = arg_1379 / 2,
          v_1387 = arg_1380 / 2;
        for (
          let v_1388 = Math.max(arg_1378, v_1384.y, 0);
          v_1388 <= Math.min(arg_1378 + arg_1380 - 1, v_1384.y + v_1384.h - 1, v_1383.h - 1);
          v_1388++
        ) {
          let v_1389 = v_1388 + 0.5 - (arg_1378 + v_1387);
          for (
            let v_1390 = Math.max(arg_1377, v_1384.x, 0);
            v_1390 <= Math.min(arg_1377 + arg_1379 - 1, v_1384.x + v_1384.w - 1, v_1383.w - 1);
            v_1390++
          ) {
            let v_1391 = v_1390 + 0.5 - (arg_1377 + v_1386);
            (v_1391 * v_1391) / (v_1386 * v_1386) + (v_1389 * v_1389) / (v_1387 * v_1387) > 1 ||
              this.mem.write16(v_1383.buf + (v_1388 * v_1383.w + v_1390) * 2, v_1385, !0);
          }
        }
        return 0;
      }
      setClip(arg_1392, arg_1393, arg_1394, arg_1395) {
        let v_1396 = this.layers.get(this.drawTarget());
        if (!v_1396) return -1;
        if (arg_1394 <= arg_1392 || arg_1395 <= arg_1393)
          return ((v_1396.clip = { x: 0, y: 0, w: v_1396.w, h: v_1396.h }), 0);
        let v_1397 = Math.min(Math.max(arg_1392, 0), v_1396.w - 1),
          v_1398 = Math.min(Math.max(arg_1393, 0), v_1396.h - 1);
        return (
          (v_1396.clip = {
            x: v_1397,
            y: v_1398,
            w: Math.min(Math.max(arg_1394 - v_1397 + 1, 1), v_1396.w - v_1397),
            h: Math.min(Math.max(arg_1395 - v_1398 + 1, 1), v_1396.h - v_1398),
          }),
          0
        );
      }
      resetClip() {
        let v_1399 = this.layers.get(this.drawTarget());
        return v_1399 ? ((v_1399.clip = { x: 0, y: 0, w: v_1399.w, h: v_1399.h }), 0) : -1;
      }
      setLayerClip(arg_1400, arg_1401, arg_1402, arg_1403, arg_1404) {
        let v_1405 = this.layers.get(this.resolveLayerHandle(arg_1400));
        if (!v_1405) return -1;
        if (arg_1403 <= arg_1401 || arg_1404 <= arg_1402)
          return ((v_1405.clip = { x: 0, y: 0, w: v_1405.w, h: v_1405.h }), 0);
        let v_1406 = Math.min(Math.max(arg_1401, 0), v_1405.w - 1),
          v_1407 = Math.min(Math.max(arg_1402, 0), v_1405.h - 1);
        return (
          (v_1405.clip = {
            x: v_1406,
            y: v_1407,
            w: Math.min(Math.max(arg_1403 - v_1406 + 1, 1), v_1405.w - v_1406),
            h: Math.min(Math.max(arg_1404 - v_1407 + 1, 1), v_1405.h - v_1407),
          }),
          0
        );
      }
      resetLayerClip(arg_1408) {
        let v_1409 = this.layers.get(this.resolveLayerHandle(arg_1408));
        return v_1409 ? ((v_1409.clip = { x: 0, y: 0, w: v_1409.w, h: v_1409.h }), 0) : -1;
      }
      setLayerTransColor(arg_1410, arg_1411) {
        let v_1412 = this.layers.get(this.resolveLayerHandle(arg_1410));
        return v_1412 ? ((v_1412.transparentColor = arg_1411), 0) : -1;
      }
      setLayerOpacity(arg_1413, arg_1414) {
        let v_1415 = this.layers.get(this.resolveLayerHandle(arg_1413));
        return v_1415 ? ((v_1415.opacity = Math.min(Math.max(arg_1414, 0), 100)), 0) : -1;
      }
      setFont(arg_1416) {
        return (this.text.setFont(arg_1416), 0);
      }
      setFontSize(arg_1417) {
        return arg_1417 < 0 || arg_1417 > 64 ? -1 : (this.text.setFontSize(arg_1417), 0);
      }
      characterWidth(arg_1418) {
        return this.text.charWidth(arg_1418 & 65535);
      }
      characterHeight() {
        return this.text.height();
      }
      highestCharHeight() {
        return this.text.height();
      }
      charBaseline(arg_1419) {
        return this.text.baseline(arg_1419);
      }
      characterInfo() {
        let v_1420 = this.text.cellHeight(0),
          v_1421 = this.text.baseline(0);
        return {
          dwidth: this.text.advance(0),
          width: this.text.inkWidth(0),
          height: v_1420,
          ascent: v_1421,
          descent: v_1420 - v_1421,
        };
      }
      stringWidth(arg_1422) {
        return this.text.measure(arg_1422)[0];
      }
      stringHeight(arg_1423) {
        return arg_1423.length === 0 ? this.text.height() : this.text.measure(arg_1423)[1];
      }
      drawTextBuffer(
        arg_1424,
        arg_1425,
        arg_1426,
        arg_1427,
        arg_1428 = Number.MAX_SAFE_INTEGER,
        arg_1429 = this.currentColor
      ) {
        let v_1430 = this.surface(arg_1424);
        return v_1430
          ? this.drawTextSurface(v_1430, arg_1425, arg_1426, arg_1427, arg_1428, arg_1429)
          : -1;
      }
      drawTextLayer(
        arg_1431,
        arg_1432,
        arg_1433,
        arg_1434,
        arg_1435 = Number.MAX_SAFE_INTEGER,
        arg_1436 = this.currentColor
      ) {
        let v_1437 = this.layers.get(this.resolveLayerHandle(arg_1431));
        return v_1437
          ? this.drawTextSurface(v_1437, arg_1432, arg_1433, arg_1434, arg_1435, arg_1436)
          : -1;
      }
      drawTextOnTarget(arg_1438, arg_1439, arg_1440, arg_1441 = this.currentColor) {
        let v_1442 = this.drawTarget();
        return this.drawTextLayer(
          v_1442 !== v_120 ? v_1442 : this.ensureScreenLayer(),
          arg_1438,
          arg_1439,
          arg_1440,
          Number.MAX_SAFE_INTEGER,
          arg_1441
        );
      }
      drawTextSurface(arg_1443, arg_1444, arg_1445, arg_1446, arg_1447, arg_1448) {
        var v_1449;
        if (arg_1446.length === 0) return 0;
        let v_1450 =
            (v_1449 = arg_1443.clip) != null
              ? v_1449
              : { x: 0, y: 0, w: arg_1443.w, h: arg_1443.h },
          v_1451 = this.text.rasterize(arg_1446, arg_1447),
          v_1452 = arg_1445 - (((v_1451.baseline * 2) / 3) | 0),
          v_1453 = v_1452 < v_1450.y ? arg_1445 : v_1452,
          v_1454 = v_1450.y + v_1450.h - v_1453,
          v_1455 =
            v_1451.height > v_1454 && v_1454 >= ((v_1451.height / 2) | 0) ? v_1454 : v_1451.height,
          v_1456 = arg_1448 & 65535,
          v_1457 = v_1450.y + v_1450.h,
          v_1458 = v_1450.x + v_1450.w;
        for (let num_1459 = 0; num_1459 < v_1455; num_1459++) {
          let v_1460 = ((num_1459 * v_1451.height) / v_1455) | 0,
            v_1461 = v_1453 + num_1459;
          if (v_1461 < 0 || v_1461 >= arg_1443.h || v_1461 < v_1450.y || v_1461 >= v_1457) continue;
          let v_1462 = arg_1443.buf + v_1461 * arg_1443.w * 2,
            v_1463 = v_1460 * v_1451.width;
          for (let num_1464 = 0; num_1464 < v_1451.width; num_1464++) {
            let v_1465 = v_1451.alpha[v_1463 + num_1464];
            if (v_1465 === 0) continue;
            let v_1466 = arg_1444 + num_1464;
            if (v_1466 < 0 || v_1466 >= arg_1443.w || v_1466 < v_1450.x || v_1466 >= v_1458)
              continue;
            let v_1467 = v_1462 + v_1466 * 2;
            v_1465 >= 248
              ? this.mem.write16(v_1467, v_1456, !0)
              : this.mem.write16(v_1467, fn_92(this.mem.read16(v_1467), v_1456, v_1465), !0);
          }
        }
        return 0;
      }
      fillPolygonOnSurface(arg_1468, arg_1469, arg_1470, arg_1471) {
        var v_1472;
        let v_1473 = this.surface(arg_1468);
        if (!v_1473) return -1;
        let v_1474 = Math.min(arg_1469.length, arg_1470.length);
        if (v_1474 < 3) return 0;
        let v_1475 =
            (v_1472 = v_1473.clip) != null ? v_1472 : { x: 0, y: 0, w: v_1473.w, h: v_1473.h },
          v_1476 = Number.MAX_SAFE_INTEGER,
          v_1477 = Number.MIN_SAFE_INTEGER;
        for (let num_1481 = 0; num_1481 < v_1474; num_1481++)
          (arg_1470[num_1481] < v_1476 && (v_1476 = arg_1470[num_1481]),
            arg_1470[num_1481] > v_1477 && (v_1477 = arg_1470[num_1481]));
        let v_1478 = Math.max(v_1476, v_1475.y),
          v_1479 = Math.min(v_1477, v_1475.y + v_1475.h - 1, v_1473.h - 1),
          v_1480 = arg_1471 & 65535;
        for (let v_1482 = v_1478; v_1482 <= v_1479; v_1482++) {
          let v_1483 = v_1482 + 0.5,
            list_1484 = [];
          for (let num_1485 = 0; num_1485 < v_1474; num_1485++) {
            let v_1486 = (num_1485 + 1) % v_1474,
              v_1487 = arg_1470[num_1485],
              v_1488 = arg_1470[v_1486];
            if ((v_1487 <= v_1483 && v_1488 > v_1483) || (v_1488 <= v_1483 && v_1487 > v_1483)) {
              let v_1489 = arg_1469[num_1485],
                v_1490 = arg_1469[v_1486];
              list_1484.push(v_1489 + ((v_1483 - v_1487) / (v_1488 - v_1487)) * (v_1490 - v_1489));
            }
          }
          list_1484.sort((arg_1491, arg_1492) => arg_1491 - arg_1492);
          for (let num_1493 = 0; num_1493 + 1 < list_1484.length; num_1493 += 2) {
            let v_1494 = Math.max(list_1484[num_1493] | 0, v_1475.x, 0),
              v_1495 = Math.min(list_1484[num_1493 + 1] | 0, v_1475.x + v_1475.w, v_1473.w);
            if (v_1494 < v_1495) {
              let v_1496 = v_1473.buf + (v_1482 * v_1473.w + v_1494) * 2;
              for (let v_1497 = v_1494; v_1497 < v_1495; v_1497++)
                this.mem.write16(v_1496 + (v_1497 - v_1494) * 2, v_1480, !0);
            }
          }
        }
        return 0;
      }
      strokePolygonOnSurface(arg_1498, arg_1499, arg_1500, arg_1501) {
        let v_1502 = Math.min(arg_1499.length, arg_1500.length);
        if (v_1502 < 2) return 0;
        for (let num_1503 = 0; num_1503 < v_1502; num_1503++) {
          let v_1504 = (num_1503 + 1) % v_1502;
          this.drawLineBuffer(
            arg_1498,
            arg_1499[num_1503],
            arg_1500[num_1503],
            arg_1499[v_1504],
            arg_1500[v_1504],
            arg_1501
          );
        }
        return 0;
      }
      drawRectBuffer(
        arg_1505,
        arg_1506,
        arg_1507,
        arg_1508,
        arg_1509,
        arg_1510 = this.currentColor
      ) {
        return (
          arg_1508 <= 0 ||
            arg_1509 <= 0 ||
            (this.fillRect(arg_1505, arg_1506, arg_1507, arg_1508, 1, arg_1510),
            this.fillRect(arg_1505, arg_1506, arg_1507 + arg_1509 - 1, arg_1508, 1, arg_1510),
            this.fillRect(arg_1505, arg_1506, arg_1507, 1, arg_1509, arg_1510),
            this.fillRect(arg_1505, arg_1506 + arg_1508 - 1, arg_1507, 1, arg_1509, arg_1510)),
          0
        );
      }
      drawLineBuffer(
        arg_1511,
        arg_1512,
        arg_1513,
        arg_1514,
        arg_1515,
        arg_1516 = this.currentColor
      ) {
        if (arg_1511 === 0 || arg_1511 === -1 || arg_1511 === v_120)
          return this.drawLine(arg_1512, arg_1513, arg_1514, arg_1515, arg_1516);
        let v_1517 = this.surface(arg_1511);
        return v_1517
          ? this.drawLineOnSurface(v_1517, arg_1512, arg_1513, arg_1514, arg_1515, arg_1516)
          : -1;
      }
      drawLine(arg_1518, arg_1519, arg_1520, arg_1521, arg_1522 = this.currentColor) {
        let v_1523 = this.layers.get(this.drawTarget());
        return v_1523
          ? this.drawLineOnSurface(v_1523, arg_1518, arg_1519, arg_1520, arg_1521, arg_1522)
          : -1;
      }
      drawLineOnSurface(arg_1524, arg_1525, arg_1526, arg_1527, arg_1528, arg_1529) {
        var v_1530;
        let v_1531 = arg_1525,
          v_1532 = arg_1526,
          v_1533 = arg_1527,
          v_1534 = arg_1528,
          v_1535 = Math.abs(v_1533 - v_1531),
          v_1536 = v_1531 < v_1533 ? 1 : -1,
          v_1537 = -Math.abs(v_1534 - v_1532),
          v_1538 = v_1532 < v_1534 ? 1 : -1,
          v_1539 = v_1535 + v_1537,
          v_1540 =
            (v_1530 = arg_1524.clip) != null
              ? v_1530
              : { x: 0, y: 0, w: arg_1524.w, h: arg_1524.h },
          v_1541 = arg_1529 & 65535;
        for (
          ;
          v_1531 >= v_1540.x &&
            v_1532 >= v_1540.y &&
            v_1531 < v_1540.x + v_1540.w &&
            v_1532 < v_1540.y + v_1540.h &&
            v_1531 >= 0 &&
            v_1532 >= 0 &&
            v_1531 < arg_1524.w &&
            v_1532 < arg_1524.h &&
            this.mem.write16(arg_1524.buf + (v_1532 * arg_1524.w + v_1531) * 2, v_1541, !0),
            !(v_1531 === v_1533 && v_1532 === v_1534);
        ) {
          let v_1542 = 2 * v_1539;
          (v_1542 >= v_1537 && ((v_1539 += v_1537), (v_1531 += v_1536)),
            v_1542 <= v_1535 && ((v_1539 += v_1535), (v_1532 += v_1538)));
        }
        return 0;
      }
      flushLayers(arg_1543) {
        for (let v_1544 of arg_1543) this.flushLayer(v_1544);
        return 0;
      }
      setBltLayers(arg_1545) {
        return ((this.pendingBlt = arg_1545.length > 0 ? arg_1545 : null), 0);
      }
      flushActiveLayer() {
        if (this.pendingBlt !== null) {
          let v_1547 = this.pendingBlt;
          return ((this.pendingBlt = null), this.flushLayers(v_1547));
        }
        let v_1546 = this.drawTarget();
        return v_1546 === v_120 ? -1 : this.flushLayers([v_1546]);
      }
      flushLayer(arg_1548) {
        let v_1549 = this.layers.get(arg_1548);
        if (!v_1549) return;
        let v_1550 = v_1549.w * v_1549.h * 2,
          v_1551 = this.mem.find(v_1549.buf, v_1550),
          v_1552 = v_1551 !== null ? v_1551.data : null,
          v_1553 = v_1551 !== null ? (v_1549.buf - v_1551.start) | 0 : 0,
          v_1554 = this.fb565,
          v_1555 = this.sw,
          v_1556 = this.sh,
          v_1557 = v_1549.opacity >= 100 ? 255 : Math.round((v_1549.opacity * 255) / 100),
          v_1558 = v_1549.transparentColor;
        for (let num_1559 = 0; num_1559 < v_1549.h; num_1559++) {
          let v_1560 = v_1549.y + num_1559;
          if (v_1560 < 0 || v_1560 >= v_1556) continue;
          let v_1561 = v_1560 * v_1555;
          for (let num_1562 = 0; num_1562 < v_1549.w; num_1562++) {
            let v_1563 = v_1549.x + num_1562;
            if (v_1563 < 0 || v_1563 >= v_1555) continue;
            let v_1564 = (num_1559 * v_1549.w + num_1562) * 2,
              v_1565 =
                v_1552 !== null
                  ? (v_1552[v_1553 + v_1564] | (v_1552[v_1553 + v_1564 + 1] << 8)) & 65535
                  : (this.mem.read8(v_1549.buf + v_1564) |
                      (this.mem.read8(v_1549.buf + v_1564 + 1) << 8)) &
                    65535,
              v_1566 = v_1561 + v_1563;
            if (!(v_1558 >= 0 && v_1565 === (v_1558 & 65535))) {
              if (v_1557 >= 255) {
                v_1554[v_1566] = v_1565;
                continue;
              }
              v_1554[v_1566] = fn_92(v_1554[v_1566], v_1565, v_1557);
            }
          }
        }
        (this.flushCount++, (this.dirty = !0));
      }
      toRgba(arg_1567) {
        for (let num_1568 = 0; num_1568 < this.fb565.length; num_1568++) {
          let v_1569 = this.fb565[num_1568],
            v_1570 = (v_1569 >> 11) & 31,
            v_1571 = (v_1569 >> 5) & 63,
            v_1572 = v_1569 & 31;
          ((arg_1567[num_1568 * 4] = ((v_1570 * 255) / 31) | 0),
            (arg_1567[num_1568 * 4 + 1] = ((v_1571 * 255) / 63) | 0),
            (arg_1567[num_1568 * 4 + 2] = ((v_1572 * 255) / 31) | 0),
            (arg_1567[num_1568 * 4 + 3] = 255));
        }
      }
      clear(arg_1573 = 0) {
        (this.fb565.fill(arg_1573 & 65535), (this.dirty = !0));
      }
    };
  function fn_125(arg_1574) {
    let v_1575 = arg_1574.length,
      num_1576 = 1;
    for (let num_1580 = 0; num_1580 < v_1575; num_1580++)
      num_1576 = (Math.imul(num_1576, 31) + arg_1574[num_1580]) | 0;
    let str_1577 = "",
      str_1578 = "",
      v_1579 = v_1575 < 8 ? v_1575 : 8;
    for (let num_1581 = 0; num_1581 < v_1579; num_1581++)
      str_1577 += arg_1574[num_1581].toString(16);
    for (let v_1582 = v_1575 - 8 > 0 ? v_1575 - 8 : 0; v_1582 < v_1575; v_1582++)
      str_1578 += arg_1574[v_1582].toString(16);
    return `${v_1575}:${num_1576}:${str_1577}:${str_1578}`;
  }
  var v_126 = class {
      constructor(arg_1583, arg_1584, arg_1585, arg_1586 = 8) {
        (fn_12(this, "blocks", []),
          fn_12(this, "allocatedBytes", 0),
          fn_12(this, "peakAllocatedBytes", 0),
          fn_12(this, "allocationCalls", 0),
          fn_12(this, "freeCalls", 0),
          fn_12(this, "reallocCalls", 0),
          fn_12(this, "failedAllocations", 0),
          fn_12(this, "lastFailedRequest", 0),
          fn_12(this, "lastFailureReason", ""),
          (this.mem = arg_1583),
          (this.base = arg_1584),
          (this.capacity = arg_1585),
          (this.alignment = arg_1586),
          this.blocks.push({ start: arg_1584, size: arg_1585, free: !0 }));
      }
      search(arg_1587) {
        let num_1588 = 0,
          v_1589 = this.blocks.length;
        for (; num_1588 < v_1589; ) {
          let v_1590 = (num_1588 + v_1589) >>> 1,
            v_1591 = this.blocks[v_1590].start;
          if (v_1591 === arg_1587) return v_1590;
          v_1591 < arg_1587 ? (num_1588 = v_1590 + 1) : (v_1589 = v_1590);
        }
        return ~num_1588;
      }
      indexOf(arg_1592) {
        let v_1593 = this.search(arg_1592);
        return v_1593 < 0 ? -1 : v_1593;
      }
      insert(arg_1594) {
        let v_1595 = this.search(arg_1594.start);
        this.blocks.splice(v_1595 < 0 ? ~v_1595 : v_1595, 0, arg_1594);
      }
      malloc(arg_1596) {
        if ((this.allocationCalls++, arg_1596 === 0)) return 0;
        let v_1597 = this.alignedSize(arg_1596);
        if (v_1597 === 0) return this.fail(arg_1596, "invalid-size");
        for (let v_1598 of this.blocks) {
          if (!v_1598.free || v_1598.size < v_1597) continue;
          let v_1599 = v_1598.size - v_1597;
          return (
            (v_1598.free = !1),
            v_1599 >= 8 &&
              ((v_1598.size = v_1597),
              this.insert({ start: (v_1598.start + v_1597) | 0, size: v_1599, free: !0 })),
            (this.allocatedBytes += v_1598.size),
            this.allocatedBytes > this.peakAllocatedBytes &&
              (this.peakAllocatedBytes = this.allocatedBytes),
            v_1598.start
          );
        }
        return this.fail(arg_1596, "no-fit");
      }
      calloc(arg_1600) {
        let v_1601 = this.malloc(arg_1600);
        if (v_1601 !== 0) {
          let v_1602 = this.usableSize(v_1601);
          v_1602 > 0 && this.mem.fillBytes(v_1601, 0, v_1602, !0);
        }
        return v_1601;
      }
      free(arg_1603) {
        if ((this.freeCalls++, arg_1603 === 0)) return !0;
        let v_1604 = this.indexOf(arg_1603);
        if (v_1604 < 0) return !1;
        let v_1605 = this.blocks[v_1604];
        return v_1605.free
          ? !1
          : ((v_1605.free = !0), (this.allocatedBytes -= v_1605.size), this.coalesce(v_1604), !0);
      }
      realloc(arg_1606, arg_1607) {
        if ((this.reallocCalls++, arg_1606 === 0)) return this.malloc(arg_1607);
        if (arg_1607 <= 0) return (this.free(arg_1606), 0);
        let v_1608 = this.alignedSize(arg_1607);
        if (v_1608 === 0) return this.fail(arg_1607, "invalid-size");
        let v_1609 = this.indexOf(arg_1606);
        if (v_1609 < 0) return 0;
        let v_1610 = this.blocks[v_1609];
        if (v_1610.free) return 0;
        let v_1611 = v_1610.size;
        if (v_1608 <= v_1611) {
          let v_1615 = v_1611 - v_1608;
          if (v_1615 >= 8) {
            v_1610.size = v_1608;
            let v_1616 = (v_1610.start + v_1608) | 0;
            (this.insert({ start: v_1616, size: v_1615, free: !0 }),
              (this.allocatedBytes -= v_1615),
              this.coalesce(this.indexOf(v_1616)));
          }
          return arg_1606;
        }
        let v_1612 = this.blocks[v_1609 + 1];
        if (
          v_1612 &&
          v_1612.free &&
          v_1610.start + v_1610.size === v_1612.start &&
          v_1610.size + v_1612.size >= v_1608
        ) {
          let v_1617 = v_1608 - v_1610.size;
          this.blocks.splice(v_1609 + 1, 1);
          let v_1618 = v_1612.size - v_1617;
          return (
            (v_1610.size = v_1608),
            v_1618 >= 8
              ? this.insert({ start: (v_1610.start + v_1608) | 0, size: v_1618, free: !0 })
              : (v_1610.size += v_1618),
            (this.allocatedBytes += v_1610.size - v_1611),
            this.allocatedBytes > this.peakAllocatedBytes &&
              (this.peakAllocatedBytes = this.allocatedBytes),
            arg_1606
          );
        }
        let v_1613 = this.malloc(arg_1607);
        if (v_1613 === 0) return 0;
        let v_1614 = Math.min(v_1611, this.usableSize(v_1613));
        return (
          v_1614 > 0 && this.mem.copyBytes(arg_1606, v_1613, v_1614),
          this.free(arg_1606),
          v_1613
        );
      }
      usableSize(arg_1619) {
        let v_1620 = this.indexOf(arg_1619);
        if (v_1620 < 0) return 0;
        let v_1621 = this.blocks[v_1620];
        return v_1621.free ? 0 : v_1621.size;
      }
      coalesce(arg_1622) {
        let v_1623 = arg_1622,
          v_1624 = this.blocks[v_1623 - 1];
        v_1624 &&
          v_1624.free &&
          v_1624.start + v_1624.size === this.blocks[v_1623].start &&
          ((v_1624.size += this.blocks[v_1623].size), this.blocks.splice(v_1623, 1), v_1623--);
        let v_1625 = this.blocks[v_1623],
          v_1626 = this.blocks[v_1623 + 1];
        v_1626 &&
          v_1626.free &&
          v_1625.start + v_1625.size === v_1626.start &&
          ((v_1625.size += v_1626.size), this.blocks.splice(v_1623 + 1, 1));
      }
      alignedSize(arg_1627) {
        if (arg_1627 <= 0 || arg_1627 > this.capacity) return 0;
        let v_1628 = (arg_1627 + this.alignment - 1) & -this.alignment;
        return v_1628 <= 0 || v_1628 > this.capacity ? 0 : v_1628;
      }
      fail(arg_1629, arg_1630) {
        return (
          this.failedAllocations++,
          (this.lastFailedRequest = arg_1629),
          (this.lastFailureReason = arg_1630),
          0
        );
      }
      stats() {
        let num_1631 = 0,
          num_1632 = 0;
        for (let v_1633 of this.blocks) v_1633.free ? (num_1631 += v_1633.size) : num_1632++;
        return {
          capacity: this.capacity,
          allocatedBytes: this.allocatedBytes,
          freeBytes: num_1631,
          liveAllocations: num_1632,
        };
      }
      largestFreeBlock() {
        let num_1634 = 0;
        for (let v_1635 of this.blocks)
          v_1635.free && v_1635.size > num_1634 && (num_1634 = v_1635.size);
        return num_1634;
      }
    },
    num_127 = 1,
    num_128 = 2,
    num_129 = 4,
    num_130 = 8,
    num_131 = 1,
    num_132 = 2,
    num_133 = 4,
    num_134 = 16,
    num_135 = 32,
    num_136 = 2147483647;
  function fn_137() {
    return Math.floor(Date.now() / 1e3);
  }
  function fn_138(arg_1636, arg_1637) {
    let v_1638 = arg_1636 + arg_1637;
    return Number.isSafeInteger(v_1638) ? v_1638 : null;
  }
  function fn_139(arg_1639) {
    return arg_1639.toLowerCase();
  }
  function fn_140(arg_1640) {
    let str_1641 = "";
    for (let v_1642 of arg_1640) {
      let v_1643 = v_1642.charCodeAt(0);
      str_1641 +=
        v_1643 < 32 ||
        v_1642 === "<" ||
        v_1642 === ">" ||
        v_1642 === ":" ||
        v_1642 === '"' ||
        v_1642 === "|" ||
        v_1642 === "?" ||
        v_1642 === "*"
          ? "_"
          : v_1642;
    }
    return str_1641;
  }
  function fn_141(arg_1644) {
    let str_1645 = "^";
    for (let v_1646 of arg_1644)
      v_1646 === "*"
        ? (str_1645 += ".*")
        : v_1646 === "?"
          ? (str_1645 += ".")
          : ".()[]{}+^$|\\".includes(v_1646)
            ? (str_1645 += `\\${v_1646}`)
            : (str_1645 += v_1646);
    return new RegExp(`${str_1645}$`, "i");
  }
  function fn_142(arg_1647, arg_1648) {
    let v_1649 = arg_1647.toLowerCase(),
      v_1650 = arg_1648.toLowerCase();
    return v_1649 < v_1650
      ? -1
      : v_1649 > v_1650
        ? 1
        : arg_1647 < arg_1648
          ? -1
          : arg_1647 > arg_1648
            ? 1
            : 0;
  }
  var v_143 = class {
      constructor(arg_1651 = ["C", "E"]) {
        (fn_12(this, "drives", new Map()),
          fn_12(this, "driveBytes", new Map()),
          fn_12(this, "handles", new Map()),
          fn_12(this, "findHandles", new Map()),
          fn_12(this, "attributeOverrides", new Map()),
          fn_12(this, "packageFiles", null),
          fn_12(this, "packageStamp", fn_137()),
          fn_12(this, "nextHandle", 3),
          fn_12(this, "nextFindHandle", 65536),
          fn_12(this, "totalBytes", 0));
        for (let v_1652 of arg_1651) {
          let v_1653 = v_1652.toUpperCase();
          (this.drives.set(v_1653, {
            kind: "dir",
            name: `${v_1653}:\\`,
            children: new Map(),
            modifiedSeconds: fn_137(),
          }),
            this.driveBytes.set(v_1653, 0));
        }
      }
      get storedBytes() {
        return this.totalBytes;
      }
      get openHandleCount() {
        return this.handles.size;
      }
      setPackageFiles(arg_1654, arg_1655 = fn_137()) {
        ((this.packageFiles = arg_1654), (this.packageStamp = arg_1655));
      }
      normalizeGuestPath(arg_1656) {
        let v_1657 = arg_1656.replace(/\//g, "\\").trim().replace(/\0+$/, "");
        if (v_1657.length === 0 || v_1657.length > 1024) return null;
        let v_1658 = v_1657.length >= 2 && v_1657[1] === ":",
          v_1659 = (v_1658 ? v_1657[0] : "C").toUpperCase(),
          list_1660 = [];
        for (let v_1661 of (v_1658 ? v_1657.slice(2) : v_1657).split("\\"))
          if (!(v_1661.length === 0 || v_1661 === ".")) {
            if (v_1661 === "..") return null;
            list_1660.push(fn_140(v_1661));
          }
        return list_1660.length === 0 ? `${v_1659}:\\` : `${v_1659}:\\${list_1660.join("\\")}`;
      }
      defaultFolderPath(arg_1662 = "C") {
        return arg_1662.toUpperCase() === "E" ? "E:\\" : "C:\\";
      }
      filename(arg_1663) {
        let v_1664 = this.normalizeGuestPath(arg_1663);
        return v_1664 === null
          ? null
          : v_1664.length <= 3
            ? ""
            : v_1664.slice(v_1664.lastIndexOf("\\") + 1);
      }
      parentPath(arg_1665) {
        let v_1666 = this.normalizeGuestPath(arg_1665);
        if (v_1666 === null) return null;
        if (v_1666.length <= 3) return v_1666;
        let v_1667 = v_1666.lastIndexOf("\\");
        return v_1667 <= 2 ? v_1666.slice(0, 3) : v_1666.slice(0, v_1667 + 1);
      }
      resolve(arg_1668) {
        let v_1669 = this.normalizeGuestPath(arg_1668);
        if (v_1669 === null) return null;
        let v_1670 = this.walk(v_1669);
        return v_1670 !== null ? v_1670 : this.materializePackageFile(v_1669);
      }
      walk(arg_1671) {
        let v_1672 = this.rootOf(arg_1671[0]);
        if (v_1672 === null) return null;
        let v_1673 = v_1672;
        if (arg_1671.length <= 3) return v_1673;
        for (let v_1674 of arg_1671.slice(3).split("\\")) {
          if (v_1673.kind !== "dir") return null;
          let v_1675 = v_1673.children.get(fn_139(v_1674));
          if (v_1675 === void 0) return null;
          v_1673 = v_1675;
        }
        return v_1673;
      }
      materializePackageFile(arg_1676) {
        let v_1677 = this.packageFiles;
        if (v_1677 === null || arg_1676.length <= 3) return null;
        let v_1678 = arg_1676.slice(arg_1676.lastIndexOf("\\") + 1);
        if (v_1678.length === 0) return null;
        let v_1679 = v_1677(v_1678);
        if (v_1679 === null || v_1679.length > 67108864) return null;
        let v_1680 = this.ensureParents(arg_1676);
        if (v_1680 === null) return null;
        let obj_1681 = {
          kind: "file",
          name: v_1678,
          drive: this.driveKey(arg_1676[0]),
          data: v_1679,
          length: v_1679.length,
          modifiedSeconds: this.packageStamp,
        };
        return this.chargeBytes(obj_1681)
          ? (v_1680.children.set(fn_139(v_1678), obj_1681), obj_1681)
          : null;
      }
      exists(arg_1682) {
        return this.resolve(arg_1682) !== null;
      }
      open(arg_1683, arg_1684) {
        if (this.handles.size >= 256) return -1;
        let v_1685 = this.normalizeGuestPath(arg_1683);
        if (v_1685 === null) return -1;
        let v_1686 = (arg_1684 & (num_128 | num_129 | num_130)) !== 0,
          v_1687 = (arg_1684 & num_130) !== 0;
        if (!v_1686 && (arg_1684 & num_127) === 0) return -1;
        let v_1688 = this.resolve(v_1685);
        if (v_1686) {
          if (
            (v_1688 !== null && v_1688.kind !== "file") ||
            (v_1688 !== null && (this.attributes(v_1685) & num_131) !== 0) ||
            (v_1688 === null && (arg_1684 & (num_129 | num_130)) === 0)
          )
            return -1;
          let v_1691 = this.ensureParents(v_1685);
          if (v_1691 === null) return -1;
          if (v_1688 === null) {
            let obj_1692 = {
              kind: "file",
              name: v_1685.slice(v_1685.lastIndexOf("\\") + 1),
              drive: this.driveKey(v_1685[0]),
              data: new Uint8Array(0),
              length: 0,
              modifiedSeconds: fn_137(),
            };
            (v_1691.children.set(fn_139(obj_1692.name), obj_1692), (v_1688 = obj_1692));
          }
        } else if (v_1688 === null || v_1688.kind !== "file") return -1;
        let v_1689 = v_1688;
        if ((arg_1684 & num_129) !== 0 && !this.setLength(v_1689, 0)) return -1;
        let v_1690 = this.allocHandle();
        return (
          this.handles.set(v_1690, {
            file: v_1689,
            path: v_1685,
            cursor: 0,
            writable: v_1686,
            append: v_1687,
          }),
          v_1690
        );
      }
      close(arg_1693) {
        return this.handles.delete(arg_1693) ? 0 : -1;
      }
      size(arg_1694) {
        let v_1695 = this.openFile(arg_1694);
        return v_1695 === null ? null : v_1695.file.length;
      }
      sizeByPath(arg_1696) {
        let v_1697 = this.resolve(arg_1696);
        return v_1697 !== null && v_1697.kind === "file" ? v_1697.length : null;
      }
      truncate(arg_1698, arg_1699) {
        if (arg_1699 < 0 || arg_1699 > 67108864) return -1;
        let v_1700 = this.openFile(arg_1698);
        return v_1700 === null ||
          !v_1700.writable ||
          (this.attributes(v_1700.path) & num_131) !== 0 ||
          !this.setLength(v_1700.file, arg_1699)
          ? -1
          : (v_1700.cursor > arg_1699 && (v_1700.cursor = arg_1699), 0);
      }
      freeSpace(arg_1701) {
        var v_1702;
        let v_1703 = this.normalizeGuestPath(arg_1701);
        if (v_1703 === null) return 0;
        let v_1704 = (v_1702 = this.driveBytes.get(this.driveKey(v_1703[0]))) != null ? v_1702 : 0,
          v_1705 = num_136 - v_1704;
        return v_1705 > 0 ? Math.min(v_1705, 2147483647) : 0;
      }
      read(arg_1706, arg_1707) {
        if (arg_1707 < 0 || arg_1707 > 33554432) return null;
        let v_1708 = this.openFile(arg_1706);
        if (v_1708 === null) return new Uint8Array(0);
        let v_1709 = Math.max(0, v_1708.file.length - v_1708.cursor),
          v_1710 = Math.min(arg_1707, v_1709),
          v_1711 = v_1708.file.data.slice(v_1708.cursor, v_1708.cursor + v_1710);
        return ((v_1708.cursor += v_1710), v_1711);
      }
      write(arg_1712, arg_1713) {
        var v_1714;
        let v_1715 = this.openFile(arg_1712);
        if (
          v_1715 === null ||
          !v_1715.writable ||
          arg_1713.length > 33554432 ||
          (this.attributes(v_1715.path) & num_131) !== 0
        )
          return -1;
        if (arg_1713.length === 0) return 0;
        v_1715.append && (v_1715.cursor = v_1715.file.length);
        let v_1716 = fn_138(v_1715.cursor, arg_1713.length);
        return v_1716 === null || v_1716 > 67108864 || !this.ensureCapacity(v_1715.file, v_1716)
          ? -1
          : (v_1715.cursor > v_1715.file.length &&
              v_1715.file.data.fill(0, v_1715.file.length, v_1715.cursor),
            v_1715.file.data.set(arg_1713, v_1715.cursor),
            v_1716 > v_1715.file.length &&
              ((this.totalBytes += v_1716 - v_1715.file.length),
              this.driveBytes.set(
                v_1715.file.drive,
                ((v_1714 = this.driveBytes.get(v_1715.file.drive)) != null ? v_1714 : 0) +
                  (v_1716 - v_1715.file.length)
              ),
              (v_1715.file.length = v_1716)),
            (v_1715.cursor = v_1716),
            (v_1715.file.modifiedSeconds = fn_137()),
            arg_1713.length);
      }
      seek(arg_1717, arg_1718, arg_1719) {
        let v_1720 = this.openFile(arg_1717);
        if (v_1720 === null) return null;
        let v_1721 = v_1720.file.length,
          v_1722;
        if (arg_1719 === 0) v_1722 = 0;
        else if (arg_1719 === 1) v_1722 = v_1720.cursor;
        else if (arg_1719 === 2 || arg_1719 === 3) v_1722 = v_1721;
        else return null;
        let v_1723 = fn_138(v_1722, arg_1718);
        if (v_1723 === null) return null;
        if (v_1720.writable) return v_1723 < 0 ? null : ((v_1720.cursor = v_1723), v_1723);
        let v_1724 =
          v_1723 >= 0 && v_1723 <= v_1721
            ? v_1723
            : arg_1718 >= 0 && arg_1718 <= v_1721
              ? arg_1718
              : null;
        return v_1724 === null ? null : ((v_1720.cursor = v_1724), v_1724);
      }
      tell(arg_1725) {
        let v_1726 = this.openFile(arg_1725);
        return v_1726 === null ? null : v_1726.cursor;
      }
      isEof(arg_1727) {
        let v_1728 = this.openFile(arg_1727);
        return v_1728 === null ? null : v_1728.cursor >= v_1728.file.length;
      }
      commit(arg_1729) {
        return this.openFile(arg_1729) === null ? -1 : 0;
      }
      attributes(arg_1730) {
        let v_1731 = this.normalizeGuestPath(arg_1730);
        return v_1731 === null ? -1 : this.attributesForNode(v_1731);
      }
      setAttributes(arg_1732, arg_1733) {
        let v_1734 = this.normalizeGuestPath(arg_1732);
        if (v_1734 === null) return -1;
        let v_1735 = this.resolve(v_1734);
        if (v_1735 === null) return -1;
        let v_1736 = v_1735.kind === "dir" ? num_134 : 0,
          v_1737 = arg_1733 & (num_131 | num_132 | num_133 | num_135),
          v_1738 = v_1735.kind === "dir" ? v_1737 & ~num_135 : v_1737;
        return (this.attributeOverrides.set(this.metaKey(v_1734), v_1736 | v_1738), 0);
      }
      modifyTimeSeconds(arg_1739) {
        let v_1740 = this.resolve(arg_1739);
        return v_1740 === null ? null : v_1740.modifiedSeconds;
      }
      setModifyTimeSeconds(arg_1741, arg_1742) {
        if (arg_1742 < 0) return -1;
        let v_1743 = this.resolve(arg_1741);
        return v_1743 === null ? -1 : ((v_1743.modifiedSeconds = Math.floor(arg_1742)), 0);
      }
      mkdir(arg_1744) {
        let v_1745 = this.normalizeGuestPath(arg_1744);
        if (v_1745 === null) return -1;
        let v_1746 = this.resolve(v_1745);
        if (v_1746 !== null) return v_1746.kind === "dir" ? 0 : -1;
        let v_1747 = this.ensureParents(v_1745);
        return v_1747 === null
          ? -1
          : (v_1747.children.set(fn_139(v_1745.slice(v_1745.lastIndexOf("\\") + 1)), {
              kind: "dir",
              name: v_1745.slice(v_1745.lastIndexOf("\\") + 1),
              children: new Map(),
              modifiedSeconds: fn_137(),
            }),
            0);
      }
      delete(arg_1748) {
        let v_1749 = this.normalizeGuestPath(arg_1748);
        if (v_1749 === null) return -1;
        let v_1750 = this.resolve(v_1749);
        if (
          v_1750 === null ||
          v_1750.kind !== "file" ||
          (this.attributesForNode(v_1749) & num_131) !== 0
        )
          return -1;
        let v_1751 = this.parentOf(v_1749);
        return v_1751 === null
          ? -1
          : (v_1751.children.delete(fn_139(v_1750.name)),
            this.releaseBytes(v_1750),
            this.removeMetadataPrefix(this.metaKey(v_1749)),
            0);
      }
      rmdir(arg_1752) {
        let v_1753 = this.normalizeGuestPath(arg_1752);
        if (v_1753 === null) return -1;
        let v_1754 = this.resolve(v_1753);
        if (
          v_1754 === null ||
          v_1754.kind !== "dir" ||
          v_1754.children.size > 0 ||
          this.rootOf(v_1753[0]) === v_1754 ||
          (this.attributesForNode(v_1753) & num_131) !== 0
        )
          return -1;
        let v_1755 = this.parentOf(v_1753);
        return v_1755 === null
          ? -1
          : (v_1755.children.delete(fn_139(v_1754.name)),
            this.removeMetadataPrefix(this.metaKey(v_1753)),
            0);
      }
      rename(arg_1756, arg_1757) {
        let v_1758 = this.normalizeGuestPath(arg_1756),
          v_1759 = this.normalizeGuestPath(arg_1757);
        if (v_1758 === null || v_1759 === null) return -1;
        let v_1760 = this.resolve(v_1758);
        if (v_1760 === null || (this.attributesForNode(v_1758) & num_131) !== 0) return -1;
        if (v_1758 === v_1759) return 0;
        if (v_1760.kind === "dir" && this.isInsideDir(v_1760, v_1759)) return -1;
        let v_1761 = this.resolve(v_1759);
        if (
          (v_1761 !== null && (v_1761.kind === "file") != (v_1760.kind === "file")) ||
          (v_1761 !== null &&
            v_1761.kind === "file" &&
            (this.attributesForNode(v_1759) & num_131) !== 0)
        )
          return -1;
        let v_1762 = this.parentOf(v_1758),
          v_1763 = this.ensureParents(v_1759);
        return v_1762 === null || v_1763 === null
          ? -1
          : (v_1761 !== null && v_1761.kind === "file" && this.releaseBytes(v_1761),
            v_1762.children.delete(fn_139(v_1760.name)),
            (v_1760.name = v_1759.slice(v_1759.lastIndexOf("\\") + 1)),
            v_1760.kind === "file"
              ? (v_1760.drive = this.driveKey(v_1759[0]))
              : this.retargetDrive(v_1760, this.driveKey(v_1759[0])),
            v_1763.children.set(fn_139(v_1760.name), v_1760),
            (v_1760.modifiedSeconds = fn_137()),
            this.moveMetadataPrefix(this.metaKey(v_1758), this.metaKey(v_1759)),
            0);
      }
      copy(arg_1764, arg_1765) {
        let v_1766 = this.normalizeGuestPath(arg_1764),
          v_1767 = this.normalizeGuestPath(arg_1765);
        if (v_1766 === null || v_1767 === null) return -1;
        let v_1768 = this.resolve(v_1766);
        if (v_1768 === null || v_1768.kind !== "file" || v_1768.length > 67108864) return -1;
        if (v_1766 === v_1767) return 0;
        let v_1769 = this.resolve(v_1767);
        if (
          (v_1769 !== null && v_1769.kind !== "file") ||
          (v_1769 !== null && (this.attributesForNode(v_1767) & num_131) !== 0)
        )
          return -1;
        let v_1770 = this.ensureParents(v_1767);
        if (v_1770 === null) return -1;
        let obj_1771 = {
          kind: "file",
          name: v_1767.slice(v_1767.lastIndexOf("\\") + 1),
          drive: this.driveKey(v_1767[0]),
          data: v_1768.data.slice(0, v_1768.length),
          length: v_1768.length,
          modifiedSeconds: fn_137(),
        };
        if (!this.chargeBytes(obj_1771)) return -1;
        (v_1769 !== null && this.releaseBytes(v_1769),
          v_1770.children.set(fn_139(obj_1771.name), obj_1771));
        let v_1772 = this.attributeOverrides.get(this.metaKey(v_1766));
        return (v_1772 !== void 0 && this.attributeOverrides.set(this.metaKey(v_1767), v_1772), 0);
      }
      readAll(arg_1773, arg_1774 = 33554432) {
        if (arg_1774 < 0 || arg_1774 > 33554432) return null;
        let v_1775 = this.resolve(arg_1773);
        return v_1775 === null || v_1775.kind !== "file" || v_1775.length > arg_1774
          ? null
          : v_1775.data.slice(0, v_1775.length);
      }
      readRange(arg_1776, arg_1777, arg_1778) {
        if (arg_1777 < 0 || arg_1778 < 0 || arg_1778 > 33554432) return null;
        let v_1779 = this.resolve(arg_1776);
        return v_1779 === null ||
          v_1779.kind !== "file" ||
          arg_1777 > v_1779.length ||
          arg_1777 + arg_1778 > v_1779.length
          ? null
          : v_1779.data.slice(arg_1777, arg_1777 + arg_1778);
      }
      findFirst(arg_1780) {
        if (this.findHandles.size >= 128) return null;
        let v_1781 = this.splitFindPattern(arg_1780);
        if (v_1781 === null) return null;
        let v_1782 = this.resolve(v_1781.dir);
        if (v_1782 === null || v_1782.kind !== "dir") return null;
        let v_1783 = fn_141(v_1781.mask),
          list_1784 = [];
        for (let v_1786 of v_1782.children.values())
          v_1783.test(v_1786.name) && list_1784.push(v_1786.name);
        if ((list_1784.sort(fn_142), list_1784.length === 0)) return null;
        let v_1785 = this.allocFindHandle();
        return (
          this.findHandles.set(v_1785, { names: list_1784, index: 0 }),
          { handle: v_1785, name: list_1784[0] }
        );
      }
      findNext(arg_1787) {
        let v_1788 = this.findHandles.get(arg_1787);
        if (v_1788 === void 0) return null;
        let v_1789 = v_1788.index + 1;
        return v_1789 >= v_1788.names.length
          ? null
          : ((v_1788.index = v_1789), v_1788.names[v_1789]);
      }
      findClose(arg_1790) {
        return this.findHandles.delete(arg_1790) ? 0 : -1;
      }
      describeHandle(arg_1791) {
        var v_1792, v_1793;
        return (v_1793 = (v_1792 = this.handles.get(arg_1791)) == null ? void 0 : v_1792.path) !=
          null
          ? v_1793
          : "?";
      }
      seedFile(arg_1794, arg_1795) {
        let v_1796 = this.normalizeGuestPath(arg_1794);
        if (v_1796 === null) return !1;
        let v_1797 = this.ensureParents(v_1796);
        if (v_1797 === null) return !1;
        let v_1798 = v_1797.children.get(fn_139(v_1796.slice(v_1796.lastIndexOf("\\") + 1)));
        v_1798 !== void 0 && v_1798.kind === "file" && this.releaseBytes(v_1798);
        let obj_1799 = {
          kind: "file",
          name: v_1796.slice(v_1796.lastIndexOf("\\") + 1),
          drive: this.driveKey(v_1796[0]),
          data: arg_1795.slice(),
          length: arg_1795.length,
          modifiedSeconds: fn_137(),
        };
        return this.chargeBytes(obj_1799)
          ? (v_1797.children.set(fn_139(obj_1799.name), obj_1799), !0)
          : !1;
      }
      closeAll() {
        (this.handles.clear(), this.findHandles.clear());
      }
      openFile(arg_1800) {
        var v_1801;
        return (v_1801 = this.handles.get(arg_1800)) != null ? v_1801 : null;
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
      attributesForNode(arg_1802) {
        var v_1803;
        let v_1804 = this.resolve(arg_1802);
        if (v_1804 === null) return -1;
        let v_1805 = v_1804.kind === "dir" ? num_134 : num_135,
          v_1806 =
            (v_1803 = this.attributeOverrides.get(this.metaKey(arg_1802))) != null ? v_1803 : 0,
          v_1807 = (v_1805 | (v_1806 & (num_131 | num_132 | num_133 | num_135))) >>> 0;
        return (v_1804.name.startsWith(".") && (v_1807 |= num_132), v_1807 | 0);
      }
      metaKey(arg_1808) {
        return arg_1808.toLowerCase();
      }
      parentOf(arg_1809) {
        let v_1810 = this.parentPath(arg_1809);
        if (v_1810 === null || v_1810 === arg_1809) return null;
        let v_1811 = this.resolve(v_1810.endsWith("\\") ? v_1810.slice(0, -1) : v_1810);
        return v_1811 !== null && v_1811.kind === "dir" ? v_1811 : null;
      }
      ensureParents(arg_1812) {
        let v_1813 = this.rootOf(arg_1812[0]);
        if (v_1813 === null) return null;
        if (arg_1812.length <= 3) return v_1813;
        let v_1814 = arg_1812.slice(3).split("\\");
        v_1814.pop();
        let v_1815 = v_1813;
        for (let v_1816 of v_1814) {
          let v_1817 = fn_139(v_1816),
            v_1818 = v_1815.children.get(v_1817);
          if (v_1818 === void 0) {
            let obj_1819 = {
              kind: "dir",
              name: v_1816,
              children: new Map(),
              modifiedSeconds: fn_137(),
            };
            (v_1815.children.set(v_1817, obj_1819), (v_1815 = obj_1819));
          } else {
            if (v_1818.kind !== "dir") return null;
            v_1815 = v_1818;
          }
        }
        return v_1815;
      }
      ensureCapacity(arg_1820, arg_1821) {
        if (arg_1821 > 67108864 || arg_1821 > 134217728 - this.totalBytes + arg_1820.length)
          return !1;
        if (arg_1821 <= arg_1820.data.length) return !0;
        let v_1822 = arg_1820.data.length + (arg_1820.data.length >> 1) + 64;
        if (
          (v_1822 < arg_1821 && (v_1822 = arg_1821),
          v_1822 > 67108864 && (v_1822 = 67108864),
          v_1822 < arg_1821)
        )
          return !1;
        let uint8Array_1823 = new Uint8Array(v_1822);
        return (
          uint8Array_1823.set(arg_1820.data.subarray(0, arg_1820.length)),
          (arg_1820.data = uint8Array_1823),
          !0
        );
      }
      setLength(arg_1824, arg_1825) {
        var v_1826;
        if (arg_1825 < 0 || arg_1825 > 67108864) return !1;
        let v_1827 = arg_1825 - arg_1824.length;
        return (v_1827 > 0 && this.totalBytes + v_1827 > 134217728) ||
          (arg_1825 > arg_1824.data.length && !this.ensureCapacity(arg_1824, arg_1825))
          ? !1
          : (v_1827 > 0 && arg_1824.data.fill(0, arg_1824.length, arg_1825),
            (arg_1824.length = arg_1825),
            (this.totalBytes += v_1827),
            this.driveBytes.set(
              arg_1824.drive,
              Math.max(
                0,
                ((v_1826 = this.driveBytes.get(arg_1824.drive)) != null ? v_1826 : 0) + v_1827
              )
            ),
            !0);
      }
      chargeBytes(arg_1828) {
        var v_1829;
        return this.totalBytes + arg_1828.length > 134217728
          ? !1
          : ((this.totalBytes += arg_1828.length),
            this.driveBytes.set(
              arg_1828.drive,
              ((v_1829 = this.driveBytes.get(arg_1828.drive)) != null ? v_1829 : 0) +
                arg_1828.length
            ),
            !0);
      }
      releaseBytes(arg_1830) {
        var v_1831;
        ((this.totalBytes = Math.max(0, this.totalBytes - arg_1830.length)),
          this.driveBytes.set(
            arg_1830.drive,
            Math.max(
              0,
              ((v_1831 = this.driveBytes.get(arg_1830.drive)) != null ? v_1831 : 0) -
                arg_1830.length
            )
          ),
          (arg_1830.length = 0),
          (arg_1830.data = new Uint8Array(0)));
      }
      retargetDrive(arg_1832, arg_1833) {
        var v_1834, v_1835;
        if (arg_1832.kind === "file") {
          let v_1836 = arg_1832.length;
          (this.driveBytes.set(
            arg_1832.drive,
            Math.max(
              0,
              ((v_1834 = this.driveBytes.get(arg_1832.drive)) != null ? v_1834 : 0) - v_1836
            )
          ),
            (arg_1832.drive = arg_1833),
            this.driveBytes.set(
              arg_1833,
              ((v_1835 = this.driveBytes.get(arg_1833)) != null ? v_1835 : 0) + v_1836
            ));
          return;
        }
        for (let v_1837 of arg_1832.children.values()) this.retargetDrive(v_1837, arg_1833);
      }
      isInsideDir(arg_1838, arg_1839) {
        let v_1840 = this.rootOf(arg_1839[0]);
        if (v_1840 === null) return !1;
        let v_1841 = v_1840;
        if (v_1841 === arg_1838) return !0;
        if (arg_1839.length <= 3) return !1;
        for (let v_1842 of arg_1839.slice(3).split("\\")) {
          if (v_1841.kind !== "dir") return !1;
          let v_1843 = v_1841.children.get(fn_139(v_1842));
          if (v_1843 === void 0) return !1;
          if (((v_1841 = v_1843), v_1841 === arg_1838)) return !0;
        }
        return !1;
      }
      driveKey(arg_1844) {
        return arg_1844.toUpperCase() === "E" ? "E" : "C";
      }
      rootOf(arg_1845) {
        var v_1846;
        return (v_1846 = this.drives.get(this.driveKey(arg_1845))) != null ? v_1846 : null;
      }
      moveMetadataPrefix(arg_1847, arg_1848) {
        let list_1849 = [];
        for (let [v_1850, v_1851] of this.attributeOverrides)
          (v_1850 === arg_1847 || v_1850.startsWith(`${arg_1847}\\`)) &&
            list_1849.push([v_1850, v_1851]);
        for (let [v_1852] of list_1849) this.attributeOverrides.delete(v_1852);
        for (let [v_1853, v_1854] of list_1849)
          this.attributeOverrides.set(arg_1848 + v_1853.slice(arg_1847.length), v_1854);
      }
      removeMetadataPrefix(arg_1855) {
        for (let v_1856 of Array.from(this.attributeOverrides.keys()))
          (v_1856 === arg_1855 || v_1856.startsWith(`${arg_1855}\\`)) &&
            this.attributeOverrides.delete(v_1856);
      }
      splitFindPattern(arg_1857) {
        let v_1858 = arg_1857.replace(/\//g, "\\").trim().replace(/\0+$/, "");
        if (v_1858.trim().length === 0 || v_1858.length > 1024) return null;
        let v_1859 = v_1858.lastIndexOf("\\");
        if (v_1859 >= 0) {
          let v_1860 = v_1858.slice(v_1859 + 1);
          return { dir: v_1858.slice(0, v_1859 + 1), mask: v_1860.length === 0 ? "*" : v_1860 };
        }
        if (v_1858.length >= 2 && v_1858[1] === ":") {
          let v_1861 = v_1858.slice(2);
          return { dir: `${v_1858.slice(0, 2)}\\`, mask: v_1861.length === 0 ? "*" : v_1861 };
        }
        return { dir: "C:\\", mask: v_1858 };
      }
    },
    num_144 = 4096,
    num_145 = 8192;
  function fn_146(arg_1862, arg_1863, arg_1864) {
    return arg_1862 < arg_1863 ? arg_1863 : arg_1862 > arg_1864 ? arg_1864 : arg_1862;
  }
  // Text encoding of guest strings. "auto" (default): UTF-8 when the bytes are valid UTF-8,
  // otherwise Windows-1251 (Cyrillic, used by Russian games). "gbk" keeps the old
  // Chinese decoding. The page selects it with ?charset=gbk.
  var textCharset = "auto";
  // Windows-1251 code points for bytes 0x80..0xFF.
  var CP1251_HIGH = [
    0x0402, 0x0403, 0x201a, 0x0453, 0x201e, 0x2026, 0x2020, 0x2021, 0x20ac, 0x2030, 0x0409,
    0x2039, 0x040a, 0x040c, 0x040b, 0x040f, 0x0452, 0x2018, 0x2019, 0x201c, 0x201d, 0x2022,
    0x2013, 0x2014, 0xfffd, 0x2122, 0x0459, 0x203a, 0x045a, 0x045c, 0x045b, 0x045f, 0x00a0,
    0x040e, 0x045e, 0x0408, 0x00a4, 0x0490, 0x00a6, 0x00a7, 0x0401, 0x00a9, 0x0404, 0x00ab,
    0x00ac, 0x00ad, 0x00ae, 0x0407, 0x00b0, 0x00b1, 0x0406, 0x0456, 0x0491, 0x00b5, 0x00b6,
    0x00b7, 0x0451, 0x2116, 0x0454, 0x00bb, 0x0458, 0x0405, 0x0455, 0x0457
  ];
  function cp1251Char(b) {
    if (b < 0x80) return b;
    if (b < 0xc0) return CP1251_HIGH[b - 0x80];
    if (b < 0xe0) return 0x0410 + (b - 0xc0);
    return 0x0430 + (b - 0xe0);
  }
  // Strict UTF-8 check and decode. Returns null if the bytes are not valid UTF-8.
  function decodeUtf8Strict(bytes) {
    var out = "", i = 0, n = bytes.length;
    while (i < n) {
      var c = bytes[i], need = 0, cp = 0, min = 0;
      if (c < 0x80) { out += String.fromCharCode(c); i++; continue; }
      if (c >= 0xc2 && c <= 0xdf) { need = 1; cp = c & 0x1f; min = 0x80; }
      else if (c >= 0xe0 && c <= 0xef) { need = 2; cp = c & 0x0f; min = 0x800; }
      else if (c >= 0xf0 && c <= 0xf4) { need = 3; cp = c & 0x07; min = 0x10000; }
      else return null;
      if (i + need >= n) return null;
      for (var k = 1; k <= need; k++) {
        var cc = bytes[i + k];
        if ((cc & 0xc0) !== 0x80) return null;
        cp = (cp << 6) | (cc & 0x3f);
      }
      if (cp < min || cp > 0x10ffff || (cp >= 0xd800 && cp <= 0xdfff)) return null;
      out += String.fromCodePoint(cp);
      i += need + 1;
    }
    return out;
  }
  function decodeGbk(bytes) {
    var dec = null;
    try { dec = new TextDecoder("gbk"); } catch (e) { dec = null; }
    return dec ? dec.decode(bytes) : null;
  }
  function fn_149(arg_1866, arg_1867, arg_1868) {
    let list_1869 = [],
      v_1870 = arg_1867;
    for (; list_1869.length < arg_1868 && arg_1866.isMapped(v_1870, 1); ) {
      let num_1871 = 0;
      try {
        num_1871 = arg_1866.read8(v_1870);
      } catch (v_1872) {
        break;
      }
      if ((v_1870++, num_1871 === 0)) break;
      list_1869.push(num_1871);
    }
    return Uint8Array.from(list_1869);
  }
  function fn_150(arg_1873, arg_1874) {
    var hasHigh = false, i;
    for (i = 0; i < arg_1873.length; i++) {
      if (arg_1873[i] >= 128) { hasHigh = true; break; }
    }
    var text = "";
    if (!hasHigh) {
      for (i = 0; i < arg_1873.length; i++) text += String.fromCharCode(arg_1873[i]);
      return text;
    }
    if (textCharset === "gbk" && arg_1874) {
      var g = decodeGbk(arg_1873);
      if (g !== null) return g;
    }
    var u = decodeUtf8Strict(arg_1873);
    if (u !== null) return u;
    for (i = 0; i < arg_1873.length; i++) text += String.fromCharCode(cp1251Char(arg_1873[i]));
    return text;
  }
  var v_151 = class {
      constructor(
        arg_1880,
        arg_1881 = 240,
        arg_1882 = 320,
        arg_1883 = 16777216,
        arg_1884 = 67108864,
        arg_1885 = 1048576
      ) {
        (fn_12(this, "cpu"),
          fn_12(this, "gfx"),
          fn_12(this, "heap"),
          fn_12(this, "fs", new v_143()),
          fn_12(this, "apis", new Map()),
          fn_12(this, "handlers", new Map()),
          fn_12(this, "systemCallback", 0),
          fn_12(this, "smCallback", 0),
          fn_12(this, "keyboardCallback", 0),
          fn_12(this, "penCallback", 0),
          fn_12(this, "timers", new Map()),
          fn_12(this, "nextTimerId", 1),
          fn_12(this, "events", []),
          fn_12(this, "inputEvents", []),
          fn_12(this, "eventsDispatched", 0),
          fn_12(this, "timerCallbacks", 0),
          fn_12(this, "exitCode", 0),
          fn_12(this, "resolvedNames", []),
          fn_12(this, "stubbedNames", []),
          fn_12(this, "namedResources", []),
          fn_12(this, "resourceBlobSize", 0),
          fn_12(this, "resourceMappedSize", 0),
          fn_12(this, "rawExecutableName", "app.vxp"),
          fn_12(this, "cRandState", 1),
          fn_12(this, "systemStrings", new Map()),
          fn_12(this, "ucs2Scratch", 0),
          fn_12(this, "exitReason", null),
          fn_12(this, "stubTrace", null),
          fn_12(this, "errorTrace", null),
          fn_12(this, "clockOffsetMs", 0),
          (this.mem = arg_1880),
          (this.sw = arg_1881),
          (this.sh = arg_1882),
          (this.heapSize = arg_1883),
          (this.stackBase = arg_1884),
          (this.stackSize = arg_1885),
          (this.cpu = new v_83(arg_1880)),
          arg_1880.map(16777216, 65536, !0, !1, !0),
          arg_1880.map(33554432, arg_1883, !0, !0, !1),
          arg_1880.map(arg_1884, arg_1885, !0, !0, !1),
          (this.heap = new v_126(arg_1880, 33554432, arg_1883)),
          (this.gfx = new v_124(arg_1880, arg_1881, arg_1882)),
          (this.cpu.onApiCall = (arg_1886) => this.dispatch(arg_1886)),
          (this.cpu.onExit = (arg_1887) => this.requestExit(arg_1887)));
      }
      get bootstrapSemihostingExitAsReturn() {
        return this.cpu.semihostingExitAsReturn;
      }
      set bootstrapSemihostingExitAsReturn(arg_1888) {
        this.cpu.semihostingExitAsReturn = arg_1888;
      }
      get exitRequested() {
        return this.cpu.exitRequested;
      }
      get frames() {
        return this.gfx.flushCount;
      }
      requestExit(arg_1889 = 0, arg_1890 = "app") {
        ((this.exitCode = arg_1889), (this.exitReason = arg_1890), (this.cpu.exitRequested = !0));
      }
      api(arg_1891, arg_1892) {
        let v_1893 = this.apis.get(arg_1891);
        if (v_1893 !== void 0) return v_1893;
        let v_1894 = (16777216 + this.apis.size * 4) | 0;
        if (v_1894 >= 16842748) throw new Error("MRE API table exhausted");
        return (this.apis.set(arg_1891, v_1894), this.handlers.set(v_1894, arg_1892), v_1894);
      }
      get resolverAddress() {
        let v_1895 = this.apis.get("__vxp_resolver");
        if (v_1895 === void 0) throw new Error("__vxp_resolver not registered");
        return v_1895;
      }
      get hasApiCapacity() {
        return this.apis.size * 4 < 65472;
      }
      addressOf(arg_1896) {
        let v_1897 = this.apis.get(arg_1896);
        return v_1897 === void 0 ? null : v_1897;
      }
      resolveAddressOrStub(arg_1898) {
        if (!arg_1898) return 0;
        let v_1899 = this.apis.get(arg_1898);
        if (v_1899 !== void 0) return (this.resolvedNames.push(arg_1898), v_1899);
        if (!this.hasApiCapacity) return 0;
        let v_1900 = this.api(arg_1898, this.compatibilityHandler(arg_1898));
        return (this.resolvedNames.push(arg_1898), this.stubbedNames.push(arg_1898), v_1900);
      }
      compatibilityHandler(arg_1901) {
        let num_1902 = 0;
        return (arg_1903) => {
          (num_1902++,
            num_1902 === 1 && this.stubTrace && this.stubTrace(arg_1901, arg_1903),
            (arg_1903.r[0] = 0));
        };
      }
      dispatch(arg_1904) {
        let v_1905 = this.handlers.get(arg_1904 | 0);
        if (!v_1905) return !1;
        try {
          v_1905(this.cpu);
        } catch (v_1906) {
          ((this.cpu.r[0] = 0), this.errorTrace && this.errorTrace(arg_1904, v_1906));
        }
        return !0;
      }
      arg(arg_1907, arg_1908) {
        if (arg_1908 < 0) throw new Error("negative arg index");
        if (arg_1908 < 4) return arg_1907.r[arg_1908] | 0;
        try {
          return this.mem.read32((arg_1907.r[13] | 0) + ((arg_1908 - 4) << 2)) | 0;
        } catch (v_1909) {
          return 0;
        }
      }
      malloc(arg_1910) {
        return this.heap.malloc(arg_1910 | 0);
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
      registerTimer(arg_1911, arg_1912) {
        if (arg_1912 === 0) return -1;
        let v_1913 = Math.max(1, arg_1911 | 0);
        for (; this.nextTimerId === 0 || this.timers.has(this.nextTimerId); ) this.nextTimerId++;
        let v_1914 = this.nextTimerId++;
        return (
          this.timers.set(v_1914, {
            id: v_1914,
            intervalMs: v_1913,
            callback: arg_1912,
            enabled: !0,
            nextFireMs: this.nowMs() + v_1913,
          }),
          v_1914
        );
      }
      deleteTimer(arg_1915) {
        return this.timers.delete(arg_1915);
      }
      postSystemEvent(arg_1916, arg_1917 = 0) {
        this.events.push({ kind: "system", message: arg_1916, param: arg_1917 });
      }
      postKeyboardEvent(arg_1918, arg_1919) {
        this.inputEvents.push({ kind: "keyboard", eventType: arg_1918, keyCode: arg_1919 });
      }
      postPenEvent(arg_1920, arg_1921, arg_1922) {
        this.inputEvents.push({ kind: "pen", eventType: arg_1920, x: arg_1921, y: arg_1922 });
      }
      postGuestCallback(arg_1923, ...arg_1924) {
        var v_1925, v_1926, v_1927, v_1928;
        arg_1923 !== 0 &&
          this.events.push({
            kind: "callback",
            callback: arg_1923,
            argc: arg_1924.length,
            a0: (v_1925 = arg_1924[0]) != null ? v_1925 : 0,
            a1: (v_1926 = arg_1924[1]) != null ? v_1926 : 0,
            a2: (v_1927 = arg_1924[2]) != null ? v_1927 : 0,
            a3: (v_1928 = arg_1924[3]) != null ? v_1928 : 0,
          });
      }
      pollEvent() {
        var v_1929;
        return (v_1929 = this.inputEvents.shift()) != null ? v_1929 : this.events.shift();
      }
      enqueueDueTimers(arg_1930 = this.nowMs()) {
        if (this.timers.size !== 0) {
          for (let v_1931 of this.timers.values())
            if (!(!v_1931.enabled || arg_1930 < v_1931.nextFireMs)) {
              do v_1931.nextFireMs += v_1931.intervalMs;
              while (v_1931.nextFireMs <= arg_1930);
              this.events.push({ kind: "timer", timerId: v_1931.id, callback: v_1931.callback });
            }
        }
      }
      msUntilNextTimer(arg_1932 = this.nowMs()) {
        let v_1933 = Number.MAX_SAFE_INTEGER;
        for (let v_1934 of this.timers.values())
          v_1934.enabled && v_1934.nextFireMs < v_1933 && (v_1933 = v_1934.nextFireMs);
        return v_1933 === Number.MAX_SAFE_INTEGER ? null : Math.max(0, v_1933 - arg_1932);
      }
      installElfVmResources(arg_1935, arg_1936) {
        if (arg_1935.length === 0) {
          ((this.namedResources = []), this.installPackageFiles());
          return;
        }
        let list_1937 = [],
          num_1938 = 0,
          v_1939 = arg_1935.length,
          num_1940 = 0;
        for (; num_1940++ < 8192 && num_1938 < v_1939 && num_1938 < arg_1935.length; ) {
          let v_1941 = num_1938;
          for (; v_1941 < arg_1935.length && v_1941 - num_1938 < 512 && arg_1935[v_1941] !== 0; )
            v_1941++;
          if (
            v_1941 >= arg_1935.length ||
            v_1941 === num_1938 ||
            arg_1935[v_1941] !== 0 ||
            !fn_154(arg_1935, num_1938, v_1941)
          )
            break;
          let v_1942 = fn_155(arg_1935, num_1938, v_1941);
          if (((num_1938 = v_1941 + 1), num_1938 + 8 > arg_1935.length)) break;
          let v_1943 = fn_153(arg_1935, num_1938);
          num_1938 += 4;
          let v_1944 = fn_153(arg_1935, num_1938);
          num_1938 += 4;
          let v_1945 = v_1943 - arg_1936;
          if (v_1945 < 0 || v_1944 < 0 || v_1945 + v_1944 > arg_1935.length) break;
          ((v_1939 = Math.min(v_1939, v_1945)),
            list_1937.some((arg_1946) => arg_1946.name === v_1942) ||
              list_1937.push({ name: v_1942, offset: v_1945, size: v_1944 }));
        }
        ((this.namedResources = list_1937),
          this.mapResourceBlob(arg_1935),
          this.installPackageFiles());
      }
      installRawResources(arg_1947) {
        if (((this.namedResources = fn_156(arg_1947)), arg_1947.length === 0)) {
          (this.resourceBlobSize > 0 &&
            (this.mem.fillBytes(1342177280, 0, this.resourceBlobSize, !0),
            (this.resourceBlobSize = 0)),
            this.installPackageFiles());
          return;
        }
        (this.mapResourceBlob(arg_1947), this.installPackageFiles());
      }
      installPackageFiles() {
        let map_1948 = new Map();
        for (let v_1949 of this.namedResources) {
          if (
            v_1949.offset < 0 ||
            v_1949.size < 0 ||
            v_1949.offset + v_1949.size > this.resourceBlobSize
          )
            continue;
          let v_1950 = v_1949.name
            .slice(Math.max(v_1949.name.lastIndexOf("\\"), v_1949.name.lastIndexOf("/")) + 1)
            .toLowerCase();
          v_1950.length > 0 && !map_1948.has(v_1950) && map_1948.set(v_1950, v_1949);
        }
        if (map_1948.size === 0) {
          this.fs.setPackageFiles(null);
          return;
        }
        this.fs.setPackageFiles((arg_1951) => {
          let v_1952 = map_1948.get(arg_1951.toLowerCase());
          if (v_1952 === void 0) return null;
          try {
            return this.mem.readBytes((1342177280 + v_1952.offset) | 0, v_1952.size);
          } catch (v_1953) {
            return null;
          }
        });
      }
      mapResourceBlob(arg_1954) {
        if (arg_1954.length > v_152)
          throw new Error(`VXP resource blob too large: ${arg_1954.length}`);
        if (this.resourceMappedSize === 0)
          ((this.resourceMappedSize = Math.max((arg_1954.length + 4095) & -4096, 4096)),
            this.mem.map(1342177280, this.resourceMappedSize, !0, !0, !1));
        else if (arg_1954.length > this.resourceMappedSize)
          throw new Error("Replacement resource blob exceeds mapped arena");
        (this.resourceBlobSize > arg_1954.length &&
          this.mem.fillBytes(
            1342177280 + arg_1954.length,
            0,
            this.resourceBlobSize - arg_1954.length,
            !0
          ),
          this.mem.writeBytes(1342177280, arg_1954, 0, arg_1954.length, !0),
          (this.resourceBlobSize = arg_1954.length));
      }
      resourceByName(arg_1955) {
        return this.namedResources.find((arg_1956) => arg_1956.name === arg_1955);
      }
      readUcs2Compat(arg_1957, arg_1958 = 2048) {
        if (arg_1957 === 0 || !this.mem.isMapped(arg_1957, 2)) return "";
        let str_1959 = "",
          v_1960 = arg_1957;
        for (let num_1961 = 0; num_1961 < arg_1958 && this.mem.isMapped(v_1960, 2); num_1961++) {
          let num_1962 = 0;
          try {
            num_1962 = this.mem.read16(v_1960);
          } catch (v_1963) {
            break;
          }
          if (((v_1960 += 2), num_1962 === 0)) return str_1959;
          str_1959 += String.fromCharCode(num_1962);
        }
        return str_1959;
      }
      readResourceNameCompat(arg_1964) {
        return this.readStringAuto(arg_1964, 256);
      }
      readStringAuto(arg_1965, arg_1966 = 512) {
        if (arg_1965 === 0 || !this.mem.isMapped(arg_1965, 1)) return "";
        let v_1967 = !1;
        if (this.mem.isMapped(arg_1965, 4))
          try {
            v_1967 =
              this.mem.read8(arg_1965) >= 32 &&
              this.mem.read8(arg_1965) <= 126 &&
              this.mem.read8(arg_1965 + 1) === 0 &&
              this.mem.read8(arg_1965 + 2) >= 32 &&
              this.mem.read8(arg_1965 + 2) <= 126 &&
              this.mem.read8(arg_1965 + 3) === 0;
          } catch (v_1968) {
            v_1967 = !1;
          }
        if (v_1967) return this.readUcs2Compat(arg_1965, arg_1966);
        try {
          return this.mem.readCString(arg_1965, arg_1966);
        } catch (v_1969) {
          return "";
        }
      }
      writeUcs2(arg_1970, arg_1971) {
        if (arg_1970 === 0 || !this.mem.isMapped(arg_1970, (arg_1971.length + 1) * 2)) return !1;
        let v_1972 = arg_1970;
        for (let num_1973 = 0; num_1973 < arg_1971.length; num_1973++)
          (this.mem.write16(v_1972, arg_1971.charCodeAt(num_1973) & 65535, !0), (v_1972 += 2));
        return (this.mem.write16(v_1972, 0, !0), !0);
      }
      asciiToUcs2Compat(arg_1974) {
        let v_1975 = arg_1974.r[0] | 0,
          v_1976 = fn_146(arg_1974.r[1] | 0, 0, 1 << 20),
          v_1977 = arg_1974.r[2] | 0;
        if (!this.mem.isMapped(v_1975, 2) || !this.mem.isMapped(v_1977, 1)) return 0;
        let v_1978 = v_1976 >= 2 ? Math.max((v_1976 / 2 - 1) | 0, 0) : 1023,
          v_1979 = v_1977,
          v_1980 = v_1975,
          num_1981 = 0;
        for (
          ;
          num_1981 < v_1978 && this.mem.isMapped(v_1979, 1) && this.mem.isMapped(v_1980, 2);
        ) {
          let v_1982 = this.mem.read8(v_1979);
          if ((v_1979++, this.mem.write16(v_1980, v_1982), (v_1980 += 2), v_1982 === 0))
            return num_1981;
          num_1981++;
        }
        return (this.mem.isMapped(v_1980, 2) && this.mem.write16(v_1980, 0), num_1981);
      }
      gbToUcs2Compat(arg_1983) {
        let v_1984 = arg_1983.r[0] | 0,
          v_1985 = fn_146(arg_1983.r[1] | 0, 0, 1 << 20),
          v_1986 = arg_1983.r[2] | 0;
        if (!this.mem.isMapped(v_1984, 2) || !this.mem.isMapped(v_1986, 1)) return 0;
        let v_1987 = v_1985 >= 2 ? v_1985 : num_144,
          v_1988 = v_1985 >= 2 ? Math.max((v_1985 / 2 - 1) | 0, 0) : 1023,
          v_1989 = fn_149(this.mem, v_1986, v_1987),
          v_1990 = fn_150(v_1989, !0),
          v_1991 = v_1984,
          num_1992 = 0;
        for (
          let num_1993 = 0;
          num_1993 < v_1990.length && !(num_1992 >= v_1988 || !this.mem.isMapped(v_1991, 2));
          num_1993++
        )
          (this.mem.write16(v_1991, v_1990.charCodeAt(num_1993) & 65535),
            (v_1991 += 2),
            num_1992++);
        return (this.mem.isMapped(v_1991, 2) && this.mem.write16(v_1991, 0), num_1992);
      }
      ucs2ToAsciiCompat(arg_1994) {
        let v_1995 = arg_1994.r[0] | 0,
          v_1996 = fn_146(arg_1994.r[1] | 0, 0, 1 << 20),
          v_1997 = arg_1994.r[2] | 0;
        if (!this.mem.isMapped(v_1995, 1) || !this.mem.isMapped(v_1997, 2)) return 0;
        let v_1998 = v_1996 > 0 ? Math.max(v_1996 - 1, 0) : 2047,
          v_1999 = v_1997,
          v_2000 = v_1995,
          num_2001 = 0;
        for (
          ;
          num_2001 < v_1998 && this.mem.isMapped(v_1999, 2) && this.mem.isMapped(v_2000, 1);
        ) {
          let v_2002 = this.mem.read16(v_1999);
          if (((v_1999 += 2), v_2002 === 0)) return (this.mem.write8(v_2000, 0), num_2001);
          (this.mem.write8(v_2000, v_2002 >= 1 && v_2002 <= 255 ? v_2002 : 63),
            v_2000++,
            num_2001++);
        }
        return (this.mem.isMapped(v_2000, 1) && this.mem.write8(v_2000, 0), num_2001);
      }
      narrowToUcs2Compat(arg_2003) {
        let v_2004 = this.arg(arg_2003, 0);
        if (
          v_2004 === 0 ||
          !this.mem.isMapped(v_2004, 1) ||
          (this.ucs2Scratch === 0 &&
            ((this.ucs2Scratch = this.heap.malloc(num_145)), this.ucs2Scratch === 0))
        )
          return 0;
        let v_2005 = fn_149(this.mem, v_2004, num_144),
          v_2006 = fn_150(v_2005, !0),
          v_2007 = this.ucs2Scratch,
          v_2008 = this.ucs2Scratch + num_145 - 2;
        for (let num_2009 = 0; num_2009 < v_2006.length && !(v_2007 >= v_2008); num_2009++)
          (this.mem.write16(v_2007, v_2006.charCodeAt(num_2009) & 65535, !0), (v_2007 += 2));
        return (this.mem.write16(v_2007, 0, !0), this.ucs2Scratch);
      }
      charsetConvertCompat(arg_2010) {
        let v_2011 = arg_2010.r[0] | 0,
          v_2012 = arg_2010.r[1] | 0,
          v_2013 = arg_2010.r[2] | 0,
          v_2014 = arg_2010.r[3] | 0;
        if (!this.mem.isMapped(v_2013, 1) || !this.mem.isMapped(v_2014, 1)) return -1;
        let v_2015 =
            this.mem.isMapped(v_2013, 4) &&
            this.mem.read8(v_2013 + 1) === 0 &&
            this.mem.read8(v_2013 + 3) === 0,
          v_2016 = v_2012 === 38 || (!v_2015 && v_2012 !== v_2011),
          v_2017 = v_2013,
          v_2018 = v_2014,
          num_2019 = 0;
        if (v_2016) {
          for (
            ;
            num_2019 < 2047 && this.mem.isMapped(v_2017, 1) && this.mem.isMapped(v_2018, 2);
          ) {
            let v_2021 = this.mem.read8(v_2017);
            if ((v_2017++, this.mem.write16(v_2018, v_2021), (v_2018 += 2), v_2021 === 0)) break;
            num_2019++;
          }
          let v_2020 = v_2014 + num_2019 * 2;
          this.mem.isMapped(v_2020, 2) && this.mem.write16(v_2020, 0);
        } else {
          for (
            ;
            num_2019 < 2047 && this.mem.isMapped(v_2017, 2) && this.mem.isMapped(v_2018, 1);
          ) {
            let v_2023 = this.mem.read16(v_2017);
            if (((v_2017 += 2), v_2023 === 0)) {
              this.mem.write8(v_2018, 0);
              break;
            }
            (this.mem.write8(v_2018, v_2023 >= 1 && v_2023 <= 255 ? v_2023 : 63),
              v_2018++,
              num_2019++);
          }
          let v_2022 = v_2014 + num_2019;
          this.mem.isMapped(v_2022, 1) && this.mem.write8(v_2022, 0);
        }
        return 0;
      }
      systemAscii(arg_2024, arg_2025) {
        let v_2026 = this.systemStrings.get(arg_2024);
        if (v_2026 !== void 0) return v_2026;
        let v_2027 = this.heap.malloc(arg_2025.length + 1);
        if (v_2027 === 0) return 0;
        for (let num_2028 = 0; num_2028 < arg_2025.length; num_2028++)
          this.mem.write8(v_2027 + num_2028, arg_2025.charCodeAt(num_2028) & 127, !0);
        return (
          this.mem.write8(v_2027 + arg_2025.length, 0, !0),
          this.systemStrings.set(arg_2024, v_2027),
          v_2027
        );
      }
      normalizeGuestPath(arg_2029) {
        return this.fs.normalizeGuestPath(arg_2029);
      }
      guestFilename(arg_2030) {
        return this.fs.filename(arg_2030);
      }
      guestParentPath(arg_2031) {
        return this.fs.parentPath(arg_2031);
      }
      guestDefaultFolderPath(arg_2032) {
        return this.fs.defaultFolderPath(arg_2032);
      }
      loadNamedResource(arg_2033, arg_2034) {
        if (arg_2034 !== 0 && !this.mem.isMapped(arg_2034, 4)) return 0;
        let v_2035 = this.readResourceNameCompat(arg_2033),
          v_2036 = this.namedResources.find(
            (arg_2037) =>
              arg_2037.name === v_2035 &&
              arg_2037.offset >= 0 &&
              arg_2037.size >= 0 &&
              arg_2037.offset + arg_2037.size <= this.resourceBlobSize
          );
        return v_2036 === void 0
          ? (arg_2034 !== 0 && this.mem.write32(arg_2034, 0, !0), 0)
          : (arg_2034 !== 0 && this.mem.write32(arg_2034, v_2036.size, !0),
            (1342177280 + v_2036.offset) | 0);
      }
      resourceDelete(arg_2038) {
        return (arg_2038 >= 1342177280 && arg_2038 < 1342177280 + this.resourceBlobSize) ||
          this.heap.free(arg_2038)
          ? 0
          : -1;
      }
      resourceGetData(arg_2039) {
        let v_2040 = this.arg(arg_2039, 0),
          v_2041 = this.arg(arg_2039, 1),
          v_2042 = this.arg(arg_2039, 2),
          v_2043 = v_2041 >= 0 && v_2042 >= 0 && v_2041 + v_2042 <= this.resourceBlobSize,
          v_2044 = v_2042 === 0 || (v_2040 !== 0 && this.mem.isMapped(v_2040, v_2042));
        return !v_2043 || !v_2044
          ? -1
          : (v_2042 > 0 && this.mem.copyBytes(1342177280 + v_2041, v_2040, v_2042), v_2042);
      }
      resourceFind(arg_2045) {
        let v_2046 = this.resourceByName(arg_2045);
        return v_2046 ? v_2046.offset : -1;
      }
    },
    v_152 = 64 * 1024 * 1024;
  function fn_153(arg_2047, arg_2048) {
    return (
      arg_2047[arg_2048] |
      (arg_2047[arg_2048 + 1] << 8) |
      (arg_2047[arg_2048 + 2] << 16) |
      (arg_2047[arg_2048 + 3] << 24) |
      0
    );
  }
  function fn_154(arg_2049, arg_2050, arg_2051) {
    for (let v_2052 = arg_2050; v_2052 < arg_2051; v_2052++)
      if (arg_2049[v_2052] < 32 || arg_2049[v_2052] > 126) return !1;
    return !0;
  }
  function fn_155(arg_2053, arg_2054, arg_2055) {
    let str_2056 = "";
    for (let v_2057 = arg_2054; v_2057 < arg_2055; v_2057++)
      str_2056 += String.fromCharCode(arg_2053[v_2057]);
    return str_2056;
  }
  function fn_156(arg_2058) {
    if (arg_2058.length === 0) return [];
    let list_2059 = [],
      set_2060 = new Set(),
      num_2061 = 0,
      v_2062 = arg_2058.length;
    for (; list_2059.length < 8192 && !(num_2061 >= arg_2058.length || num_2061 >= v_2062); ) {
      let v_2063 = num_2061;
      for (; v_2063 < arg_2058.length && v_2063 - num_2061 < 255 && arg_2058[v_2063] !== 0; )
        v_2063++;
      if (
        v_2063 >= arg_2058.length ||
        arg_2058[v_2063] !== 0 ||
        v_2063 === num_2061 ||
        !fn_154(arg_2058, num_2061, v_2063)
      )
        break;
      let v_2064 = fn_155(arg_2058, num_2061, v_2063);
      if (((num_2061 = v_2063 + 1), num_2061 + 8 > arg_2058.length)) break;
      let v_2065 = fn_153(arg_2058, num_2061);
      num_2061 += 4;
      let v_2066 = fn_153(arg_2058, num_2061);
      if (((num_2061 += 4), v_2065 < 0 || v_2066 < 0 || v_2065 + v_2066 > arg_2058.length)) break;
      ((v_2062 = Math.min(v_2062, v_2065)),
        set_2060.has(v_2064) ||
          (set_2060.add(v_2064), list_2059.push({ name: v_2064, offset: v_2065, size: v_2066 })));
    }
    return list_2059;
  }
  var num_157 = 2060,
    v_158 = 1 << 20;
  function fn_159(arg_2067, arg_2068) {
    return (
      arg_2067[arg_2068] |
      (arg_2067[arg_2068 + 1] << 8) |
      (arg_2067[arg_2068 + 2] << 16) |
      (arg_2067[arg_2068 + 3] << 24) |
      0
    );
  }
  function fn_160(arg_2069) {
    let v_2070 = arg_2069 & 255,
      v_2071 = ((arg_2069 >>> 8) & 15) * 2;
    return v_2071 === 0 ? v_2070 : (v_2070 >>> v_2071) | (v_2070 << (32 - v_2071)) | 0;
  }
  function fn_161(arg_2072, arg_2073, arg_2074) {
    let v_2075 = Math.min(arg_2072.length, arg_2073 + arg_2074),
      v_2076 = arg_2073;
    for (; v_2076 < v_2075 && arg_2072[v_2076] !== 0; ) {
      let v_2078 = arg_2072[v_2076];
      if (v_2078 < 32 || v_2078 > 126) return "";
      v_2076++;
    }
    if (v_2076 === arg_2073) return "";
    let str_2077 = "";
    for (let v_2079 = arg_2073; v_2079 < v_2076; v_2079++)
      str_2077 += String.fromCharCode(arg_2072[v_2079]);
    return str_2077;
  }
  function fn_162(arg_2080, arg_2081) {
    let v_2082 = arg_2081.length;
    if (v_2082 === 0) return 0;
    e: for (let num_2083 = 0; num_2083 + v_2082 <= arg_2080.length; num_2083++) {
      for (let num_2084 = 0; num_2084 < v_2082; num_2084++)
        if (arg_2080[num_2083 + num_2084] !== arg_2081.charCodeAt(num_2084)) continue e;
      return num_2083;
    }
    return -1;
  }
  function fn_163(arg_2085) {
    if (arg_2085.length < 256) return !1;
    let v_2086 = fn_159(arg_2085, 0),
      v_2087 = fn_159(arg_2085, 4),
      v_2088 =
        (v_2086 & 268431360) === 42958848 &&
        (v_2087 & 4293918720) === -393216e3 &&
        ((v_2087 >>> 20) & 1) === 1 &&
        ((v_2087 >>> 16) & 15) === 8,
      v_2089 = fn_162(arg_2085, "mre-") >= 0 || fn_162(arg_2085, "vm_reg_sysevt_callback") >= 0;
    return v_2088 || v_2089;
  }
  function fn_164(arg_2090) {
    if (!fn_60(arg_2090, 0)) throw new Error("Raw ARM VXP does not start with zlib");
    let list_2091 = [],
      num_2092 = 0,
      num_2093 = 0;
    for (let num_2094 = 0; num_2094 < 8 && fn_60(arg_2090, num_2092); num_2094++) {
      let v_2095 = fn_65(arg_2090, num_2092, 33554432);
      if (v_2095 === null) break;
      if (((num_2093 += v_2095.bytes.length), num_2093 > 67108864))
        throw new Error("RAW streams exceed 67108864 byte total inflate safety limit");
      for (
        list_2091.push(v_2095), num_2092 += v_2095.compressedSize;
        num_2092 < arg_2090.length && arg_2090[num_2092] === 0;
      )
        num_2092++;
    }
    if (list_2091.length === 0) throw new Error("No zlib stream decoded");
    return { streams: list_2091, nextOffset: num_2092 };
  }
  function fn_165(arg_2096, arg_2097, arg_2098) {
    var v_2099, v_2100;
    let v_2101 = arg_2097[0].bytes;
    if (v_2101.length < 256) throw new Error("Raw ARM code stream too small");
    let v_2102 =
        (v_2100 = (v_2099 = arg_2097[1]) == null ? void 0 : v_2099.bytes) != null
          ? v_2100
          : new Uint8Array(0),
      v_2103 = arg_2098 < arg_2096.length ? arg_2096.slice(arg_2098) : new Uint8Array(0),
      v_2104 = fn_169(v_2101),
      v_2105 = fn_168(v_2101);
    return {
      code: v_2101,
      initialData: v_2102,
      resources: v_2103,
      streams: arg_2097,
      imports: v_2104,
      vmMainOffset: fn_170(v_2101, v_2104),
      dataSizeHint: v_2105.dataSize,
      bssSizeHint: v_2105.bssSize,
      resolverSlotOffset: fn_167(v_2101, v_2104),
    };
  }
  function fn_166(arg_2106) {
    let v_2107 = fn_69(arg_2106, 0, 33554432);
    if (v_2107 === null || !fn_163(v_2107.bytes)) return null;
    let list_2108 = [
        { compressedOffset: 0, compressedSize: v_2107.nextInputOffset, bytes: v_2107.bytes },
      ],
      v_2109 = fn_68(arg_2106, v_2107.nextInputOffset),
      uint8Array_2110 = new Uint8Array(0),
      v_2111 = Math.min(Math.max(v_2107.bytes.length, v_158), 33554432),
      v_2112 = v_2109 < arg_2106.length ? fn_69(arg_2106, v_2109, v_2111) : null;
    if (v_2112 !== null) {
      if (v_2107.bytes.length + v_2112.bytes.length > 67108864)
        throw new Error("LZMA streams exceed 67108864 byte total inflate safety limit");
      (list_2108.push({
        compressedOffset: v_2109,
        compressedSize: v_2112.nextInputOffset - v_2109,
        bytes: v_2112.bytes,
      }),
        (uint8Array_2110 = v_2112.bytes),
        (v_2109 = fn_68(arg_2106, v_2112.nextInputOffset)));
    }
    let v_2113 =
        list_2108.length > 1 && v_2109 < arg_2106.length ? arg_2106.subarray(v_2109) : null,
      v_2114 = v_2113 !== null && fn_177(v_2113) > 0 ? arg_2106.slice(v_2109) : new Uint8Array(0),
      v_2115 = fn_169(v_2107.bytes),
      v_2116 = fn_168(v_2107.bytes);
    return {
      code: v_2107.bytes,
      initialData: uint8Array_2110,
      resources: v_2114,
      streams: list_2108,
      imports: v_2115,
      vmMainOffset: fn_170(v_2107.bytes, v_2115),
      dataSizeHint: v_2116.dataSize,
      bssSizeHint: v_2116.bssSize,
      resolverSlotOffset: fn_167(v_2107.bytes, v_2115),
    };
  }
  function fn_167(arg_2117, arg_2118) {
    var v_2119;
    let map_2120 = new Map();
    for (let v_2123 of arg_2118) {
      let v_2124 = Math.max(v_2123.stubOffset, 0),
        v_2125 = Math.min(arg_2117.length, v_2124 + 96);
      for (let v_2126 = v_2124; v_2126 + 4 <= v_2125; v_2126 += 4) {
        let v_2127 = fn_159(arg_2117, v_2126);
        if ((v_2127 & 268435440) !== 19922736) continue;
        let v_2128 = v_2127 & 15,
          v_2129 = Math.max(v_2124, v_2126 - 32);
        for (let v_2130 = v_2126 - 4; v_2130 >= v_2129; v_2130 -= 4) {
          let v_2131 = fn_159(arg_2117, v_2130),
            v_2132 = (v_2131 >>> 16) & 15,
            v_2133 = (v_2131 >>> 12) & 15;
          if (
            !(
              ((v_2131 >>> 26) & 3) === 1 &&
              ((v_2131 >>> 25) & 1) === 0 &&
              ((v_2131 >>> 24) & 1) === 1 &&
              ((v_2131 >>> 20) & 1) === 1
            ) ||
            v_2132 !== v_2128 ||
            v_2133 !== v_2128
          )
            continue;
          let v_2134 = v_2131 & 4095,
            v_2135 = ((v_2131 >>> 23) & 1) !== 0;
          for (let v_2136 = v_2130 - 4; v_2136 >= Math.max(v_2124, v_2130 - 24); v_2136 -= 4) {
            let v_2137 = fn_159(arg_2117, v_2136);
            if (
              ((v_2137 >>> 25) & 1) === 0 &&
              ((v_2137 >>> 21) & 15) === 4 &&
              ((v_2137 >>> 16) & 15) === v_2128 &&
              ((v_2137 >>> 12) & 15) === v_2128 &&
              (v_2137 & 4095) === 9
            ) {
              for (let v_2138 = v_2136 - 4; v_2138 >= Math.max(v_2124, v_2136 - 24); v_2138 -= 4) {
                let v_2139 = fn_159(arg_2117, v_2138);
                if (
                  !(
                    ((v_2139 >>> 26) & 3) === 1 &&
                    ((v_2139 >>> 25) & 1) === 0 &&
                    ((v_2139 >>> 24) & 1) === 1 &&
                    ((v_2139 >>> 20) & 1) === 1 &&
                    ((v_2139 >>> 16) & 15) === 15 &&
                    ((v_2139 >>> 12) & 15) === v_2128
                  )
                )
                  continue;
                let v_2140 = v_2139 & 4095,
                  v_2141 = ((v_2139 >>> 23) & 1) !== 0,
                  v_2142 = v_2138 + 8 + (v_2141 ? v_2140 : -v_2140);
                if (v_2142 >= 0 && v_2142 + 4 <= arg_2117.length) {
                  let v_2143 = (fn_159(arg_2117, v_2142) + (v_2135 ? v_2134 : -v_2134)) | 0;
                  v_2143 >= 0 &&
                    v_2143 < 16 * 1024 * 1024 &&
                    map_2120.set(
                      v_2143,
                      ((v_2119 = map_2120.get(v_2143)) != null ? v_2119 : 0) + 1
                    );
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
    let v_2121 = num_157,
      v_2122 = -1;
    for (let [v_2144, v_2145] of map_2120)
      (v_2145 > v_2122 || (v_2145 === v_2122 && v_2144 < v_2121)) &&
        ((v_2121 = v_2144), (v_2122 = v_2145));
    return v_2122 < 0 ? num_157 : v_2121;
  }
  function fn_168(arg_2146) {
    try {
      let v_2147 = fn_159(arg_2146, 0),
        v_2148 = 8 + fn_160(v_2147);
      if (v_2148 < 0 || v_2148 + 16 > arg_2146.length) return { dataSize: 0, bssSize: 0 };
      let v_2149 = (v_2148 + fn_159(arg_2146, v_2148)) | 0,
        v_2150 = (v_2148 + fn_159(arg_2146, v_2148 + 4)) | 0,
        v_2151 = (v_2148 + fn_159(arg_2146, v_2148 + 8)) | 0,
        v_2152 = (v_2148 + fn_159(arg_2146, v_2148 + 12)) | 0,
        num_2153 = 0;
      for (
        let v_2155 = v_2149;
        v_2155 + 12 <= v_2150 && v_2155 + 12 <= arg_2146.length;
        v_2155 += 12
      ) {
        let v_2156 = fn_159(arg_2146, v_2155),
          v_2157 = fn_159(arg_2146, v_2155 + 4),
          v_2158 = fn_159(arg_2146, v_2155 + 8);
        v_2156 !== v_2157 && v_2158 > num_2153 && v_2158 < 64 * 1024 * 1024 && (num_2153 = v_2158);
      }
      let num_2154 = 0;
      for (
        let v_2159 = v_2151;
        v_2159 + 8 <= v_2152 && v_2159 + 8 <= arg_2146.length;
        v_2159 += 8
      ) {
        let v_2160 = fn_159(arg_2146, v_2159),
          v_2161 = fn_159(arg_2146, v_2159 + 4),
          v_2162 = v_2160 & -4;
        v_2161 >= 0 &&
          v_2161 < 64 * 1024 * 1024 &&
          (num_2154 = Math.max(num_2154, (v_2162 + v_2161) | 0));
      }
      return { dataSize: num_2153, bssSize: Math.max(0, num_2154 - num_2153) };
    } catch (v_2163) {
      return { dataSize: 0, bssSize: 0 };
    }
  }
  function fn_169(arg_2164) {
    let map_2165 = new Map(),
      fn_2166 = (arg_2167, arg_2168) => {
        if (arg_2167 < 0 || arg_2167 >= arg_2164.length) return;
        let v_2169 = fn_161(arg_2164, arg_2167, 128);
        if (v_2169 !== "strtoi" && !v_2169.startsWith("vm_")) return;
        let v_2170 = arg_2168 & -4;
        for (let v_2171 = v_2170; v_2171 >= Math.max(0, v_2170 - 96); v_2171 -= 4)
          if ((fn_159(arg_2164, v_2171) & 4294901760) === -382926848) {
            v_2170 = v_2171;
            break;
          }
        map_2165.has(v_2169) ||
          map_2165.set(v_2169, { name: v_2169, stubOffset: v_2170, nameOffset: arg_2167 });
      };
    for (let num_2172 = 0; num_2172 + 4 <= arg_2164.length; num_2172 += 4) {
      let v_2173 = fn_159(arg_2164, num_2172);
      if (num_2172 >= 4 && v_2173 === -527499264) {
        let v_2175 = fn_159(arg_2164, num_2172 - 4);
        if ((v_2175 & 4294963200) === -442564608) {
          let v_2176 = v_2175 & 4095,
            v_2177 = num_2172 + 4 + v_2176;
          v_2177 >= 0 &&
            v_2177 + 4 <= arg_2164.length &&
            fn_2166((num_2172 + 8 + fn_159(arg_2164, v_2177)) | 0, num_2172 - 4);
        }
      }
      let v_2174 = v_2173 & 268369920;
      if (v_2174 === 42926080 || v_2174 === 38731776) {
        let v_2178 = fn_160(v_2173),
          v_2179 = v_2174 === 42926080 ? num_2172 + 8 + v_2178 : num_2172 + 8 - v_2178,
          v_2180 = Math.min(arg_2164.length, num_2172 + 28),
          v_2181 = !1;
        for (let v_2182 = num_2172 + 4; v_2182 + 4 <= v_2180; v_2182 += 4) {
          let v_2183 = fn_159(arg_2164, v_2182);
          if (
            (v_2183 & 234881024) === 167772160 ||
            (v_2183 & 268435440) === 19922704 ||
            (v_2183 & 268435440) === 19922736
          ) {
            v_2181 = !0;
            break;
          }
        }
        v_2181 && fn_2166(v_2179, num_2172);
      }
    }
    return [...map_2165.values()];
  }
  function fn_170(arg_2184, arg_2185) {
    var v_2186, v_2187, v_2188;
    let v_2189 =
      (v_2186 = arg_2185.find((arg_2195) => arg_2195.name === "vm_reg_sysevt_callback")) == null
        ? void 0
        : v_2186.stubOffset;
    if (v_2189 === void 0) return null;
    let v_2190 =
        (v_2187 = arg_2185.find((arg_2196) => arg_2196.name === "vm_reg_keyboard_callback")) == null
          ? void 0
          : v_2187.stubOffset,
      v_2191 =
        (v_2188 = arg_2185.find((arg_2197) => arg_2197.name === "vm_reg_pen_callback")) == null
          ? void 0
          : v_2188.stubOffset,
      v_2192 = fn_175(arg_2184, v_2189);
    if (v_2192.length === 0) return null;
    let map_2193 = new Map();
    for (let v_2198 of v_2192) {
      let v_2199 = fn_172(arg_2184, v_2198);
      if (map_2193.has(v_2199)) continue;
      let num_2200 = 10;
      (v_2190 !== void 0 &&
        fn_174(arg_2184, v_2199, Math.min(arg_2184.length, v_2199 + 384), v_2190) &&
        (num_2200 += 4),
        v_2191 !== void 0 &&
          fn_174(arg_2184, v_2199, Math.min(arg_2184.length, v_2199 + 384), v_2191) &&
          (num_2200 += 2));
      let v_2201 = fn_175(arg_2184, v_2199)
        .filter((arg_2202) => arg_2202 < 16384)
        .reduce((arg_2203, arg_2204) => Math.min(arg_2203, arg_2204), Number.MAX_SAFE_INTEGER);
      (v_2201 !== Number.MAX_SAFE_INTEGER && (num_2200 += 20),
        map_2193.set(v_2199, { start: v_2199, score: num_2200, earliestCaller: v_2201 }));
    }
    let v_2194 = [...map_2193.values()].sort(
      (arg_2205, arg_2206) =>
        arg_2206.score - arg_2205.score ||
        arg_2205.earliestCaller - arg_2206.earliestCaller ||
        arg_2205.start - arg_2206.start
    )[0];
    return v_2194 ? v_2194.start : null;
  }
  function fn_171(arg_2207) {
    return (arg_2207 & 4294901760) === -382926848 || (arg_2207 & 4294963200) === -449978368;
  }
  function fn_172(arg_2208, arg_2209) {
    let v_2210 = Math.max(0, (arg_2209 & -4) - 1024);
    for (let v_2211 = arg_2209 & -4; v_2211 >= v_2210; v_2211 -= 4)
      if (fn_171(fn_159(arg_2208, v_2211))) {
        for (let v_2212 = Math.max(0, v_2211 - 16); v_2212 < v_2211; v_2212 += 4)
          if (fn_173(arg_2208, v_2212)) return v_2212;
        return v_2211;
      }
    return arg_2209 & -4;
  }
  function fn_173(arg_2213, arg_2214) {
    for (let num_2215 = 0; num_2215 + 4 <= arg_2213.length; num_2215 += 4) {
      let v_2216 = fn_159(arg_2213, num_2215);
      if ((v_2216 & 251658240) !== 184549376) continue;
      let v_2217 = v_2216 & 16777215;
      if (
        ((v_2217 & 8388608) !== 0 && (v_2217 |= 4278190080),
        ((num_2215 + 8 + (v_2217 << 2)) | 0) === arg_2214)
      )
        return !0;
    }
    return !1;
  }
  function fn_174(arg_2218, arg_2219, arg_2220, arg_2221) {
    for (let v_2222 = arg_2219 & -4; v_2222 + 4 <= arg_2220; v_2222 += 4)
      if (fn_176(arg_2218, v_2222) === arg_2221) return !0;
    return !1;
  }
  function fn_175(arg_2223, arg_2224) {
    let list_2225 = [];
    for (let num_2226 = 0; num_2226 + 4 <= arg_2223.length; num_2226 += 4)
      fn_176(arg_2223, num_2226) === arg_2224 && list_2225.push(num_2226);
    return list_2225;
  }
  function fn_176(arg_2227, arg_2228) {
    let v_2229 = fn_159(arg_2227, arg_2228);
    if ((v_2229 & 234881024) !== 167772160) return null;
    let v_2230 = (v_2229 & 16777216) !== 0,
      v_2231 = (v_2229 >>> 28) & 15;
    if (!v_2230 && v_2231 !== 14) return null;
    let v_2232 = v_2229 & 16777215;
    return ((v_2232 & 8388608) !== 0 && (v_2232 |= 4278190080), (arg_2228 + 8 + (v_2232 << 2)) | 0);
  }
  function fn_177(arg_2233) {
    return fn_156(arg_2233).length;
  }
  function fn_178(arg_2234, arg_2235) {
    return (
      arg_2235 >= 0 &&
      arg_2235 + 4 <= arg_2234.length &&
      arg_2234[arg_2235] === 127 &&
      arg_2234[arg_2235 + 1] === 69 &&
      arg_2234[arg_2235 + 2] === 76 &&
      arg_2234[arg_2235 + 3] === 70
    );
  }
  function fn_179(arg_2236) {
    if (arg_2236.length < 8) return !1;
    let v_2237 = (arg_2236[0] << 16) | (arg_2236[1] << 8) | arg_2236[2];
    return v_2237 === 4609875 || v_2237 === 4413267 || v_2237 === 5920595;
  }
  function fn_180(arg_2238) {
    let v_2239 = Math.min(arg_2238.length - 4, 1048576);
    for (let num_2240 = 1; num_2240 <= v_2239; num_2240++)
      if (fn_178(arg_2238, num_2240)) return num_2240;
    return -1;
  }
  function fn_181(arg_2241) {
    try {
      return fn_164(arg_2241);
    } catch (v_2242) {
      return null;
    }
  }
  function fn_182(arg_2243) {
    var v_2244, v_2245;
    let v_2246 = fn_48(arg_2243),
      fn_2247 = (arg_2250, arg_2251, arg_2252 = "") => ({
        kind: arg_2250,
        backend: arg_2251,
        sourceSize: arg_2243.length,
        elf: null,
        raw: null,
        tags: v_2246,
        detail: arg_2252,
      }),
      v_2248 = !1;
    if (arg_2243.length > 67108864)
      return fn_11(fn_10({}, fn_2247("UNKNOWN", "UNKNOWN")), {
        detail: "source exceeds 67108864 bytes",
      });
    if (fn_179(arg_2243))
      return fn_11(fn_10({}, fn_2247("FLASH_LITE_SWF", "FLASH_LITE")), {
        detail: "Flash Lite SWF \u2014 backend ch\u01B0a port",
      });
    if (fn_178(arg_2243, 0))
      return fn_11(fn_10({}, fn_2247("ELF32_ARM", "ELF_ARM")), { elf: arg_2243 });
    if (fn_60(arg_2243, 0)) {
      let v_2253 = fn_181(arg_2243),
        v_2254 =
          (v_2245 =
            (v_2244 = v_2253 == null ? void 0 : v_2253.streams[0]) == null
              ? void 0
              : v_2244.bytes) != null
            ? v_2245
            : null;
      if (v_2253 === null || v_2254 === null)
        return fn_11(fn_10({}, fn_2247("UNKNOWN", "UNKNOWN")), {
          detail: "zlib stream could not be inflated",
        });
      if (fn_178(v_2254, 0))
        return v_2254.length > 33554432
          ? fn_11(fn_10({}, fn_2247("ZLIB_ELF", "UNKNOWN")), {
              detail: "inflated executable exceeds safety limit",
            })
          : fn_11(fn_10({}, fn_2247("ZLIB_ELF", "ELF_ARM")), { elf: v_2254 });
      if (fn_163(v_2254)) {
        let v_2255 = fn_165(arg_2243, v_2253.streams, v_2253.nextOffset);
        return fn_11(fn_10({}, fn_2247("RAW_ARM_ZLIB", "RAW_ARM")), { raw: v_2255 });
      }
      return fn_11(fn_10({}, fn_2247("UNKNOWN", "UNKNOWN")), {
        detail: "zlib payload is neither ELF nor a RAW ARM MRE image",
      });
    }
    if (fn_67(arg_2243, 0)) {
      v_2248 = !0;
      try {
        let v_2256 = fn_166(arg_2243);
        if (v_2256 !== null)
          return fn_11(fn_10({}, fn_2247("LZMA_RAW_ARM", "RAW_ARM")), { raw: v_2256 });
      } catch (v_2257) {
        return fn_11(fn_10({}, fn_2247("LZMA_RAW_ARM", "UNKNOWN")), {
          detail: v_2257 instanceof Error ? v_2257.message : String(v_2257),
        });
      }
    }
    let v_2249 = fn_180(arg_2243);
    return v_2249 >= 0
      ? arg_2243.length - v_2249 > 33554432
        ? fn_11(fn_10({}, fn_2247("EMBEDDED_ELF", "UNKNOWN")), {
            detail: "embedded ELF exceeds safety limit",
          })
        : fn_11(fn_10({}, fn_2247("EMBEDDED_ELF", "ELF_ARM")), { elf: arg_2243.slice(v_2249) })
      : v_2248
        ? fn_11(fn_10({}, fn_2247("LZMA_RAW_ARM", "UNKNOWN")), {
            detail: "LZMA-alone payload is not a RAW ARM MRE image",
          })
        : fn_11(fn_10({}, fn_2247("UNKNOWN", "UNKNOWN")), {
            detail: "no executable ELF32 payload found",
          });
  }
  var obj_183 = {
      maxExecutableBytes: 33554432,
      maxProgramHeaders: 1024,
      maxSectionHeaders: 4096,
      maxRegionBytes: 33554432,
      maxMappedBytes: 134217728,
    },
    num_184 = 40,
    num_185 = 1,
    num_186 = 1,
    num_187 = 2,
    num_188 = 3,
    num_189 = 9,
    num_190 = 11,
    num_191 = 8,
    num_192 = 0,
    num_193 = 2,
    num_194 = 3,
    num_195 = 10,
    num_196 = 21,
    num_197 = 22,
    num_198 = 23,
    num_199 = 28,
    num_200 = 29,
    num_201 = 30,
    num_202 = 1,
    num_203 = 2,
    num_204 = 4;
  function fn_205(arg_2258, arg_2259) {
    return (
      arg_2258[arg_2259] |
      (arg_2258[arg_2259 + 1] << 8) |
      (arg_2258[arg_2259 + 2] << 16) |
      (arg_2258[arg_2259 + 3] << 24) |
      0
    );
  }
  function fn_206(arg_2260, arg_2261) {
    return arg_2260[arg_2261] | (arg_2260[arg_2261 + 1] << 8);
  }
  function fn_207(arg_2262) {
    return arg_2262 & -4096;
  }
  function fn_208(arg_2263) {
    return (arg_2263 + 4095) & -4096;
  }
  function fn_209(arg_2264, arg_2265, arg_2266, arg_2267) {
    return arg_2264 < 0 || arg_2265 <= 0 || arg_2266 < 0
      ? !1
      : arg_2264 + arg_2265 * arg_2266 <= arg_2267;
  }
  function fn_210(arg_2268, arg_2269, arg_2270) {
    return arg_2268 < 0 || arg_2269 < 0 ? !1 : arg_2268 + arg_2269 <= arg_2270;
  }
  var v_211 = class Cls_2271 {
      constructor(arg_2272, arg_2273, arg_2274, arg_2275, arg_2276) {
        (fn_12(this, "symbolCache", new Map()),
          fn_12(this, "relocErrors", []),
          (this.bytes = arg_2272),
          (this.type = arg_2273),
          (this.entry = arg_2274),
          (this.programHeaders = arg_2275),
          (this.sections = arg_2276));
      }
      static parse(arg_2277) {
        if (arg_2277.length < 52) throw new Error("ELF file too small");
        if (arg_2277.length > obj_183.maxExecutableBytes)
          throw new Error("ELF exceeds safety limit");
        if (arg_2277[0] !== 127 || arg_2277[1] !== 69 || arg_2277[2] !== 76 || arg_2277[3] !== 70)
          throw new Error("Not an ELF file");
        if (arg_2277[4] !== 1) throw new Error("Only ELF32 is supported");
        if (arg_2277[5] !== 1) throw new Error("Only little-endian ELF is supported");
        let v_2278 = fn_206(arg_2277, 16),
          v_2279 = fn_206(arg_2277, 18),
          v_2280 = fn_205(arg_2277, 36) & 251658240;
        if (v_2279 !== num_184 && !(v_2279 === 0 && v_2280 !== 0))
          throw new Error(`ELF machine=${v_2279}, expected ARM (${num_184})`);
        if (fn_206(arg_2277, 40) < 52) throw new Error("Invalid ELF header size");
        let v_2281 = fn_205(arg_2277, 24),
          v_2282 = fn_205(arg_2277, 28),
          v_2283 = fn_205(arg_2277, 32),
          v_2284 = fn_206(arg_2277, 42),
          v_2285 = fn_206(arg_2277, 44),
          v_2286 = fn_206(arg_2277, 46),
          v_2287 = fn_206(arg_2277, 48),
          v_2288 = fn_206(arg_2277, 50);
        if (v_2285 > obj_183.maxProgramHeaders)
          throw new Error(`Too many ELF program headers: ${v_2285}`);
        if (v_2287 > obj_183.maxSectionHeaders)
          throw new Error(`Too many ELF section headers: ${v_2287}`);
        if (v_2285 > 0) {
          if (v_2284 < 32 || v_2284 > 256)
            throw new Error(`Invalid ELF program-header entry size: ${v_2284}`);
          if (!fn_209(v_2282, v_2284, v_2285, arg_2277.length))
            throw new Error("Broken ELF program-header table");
        }
        if (v_2287 > 0) {
          if (v_2283 === 0)
            throw new Error("ELF section count is nonzero but section table is absent");
          if (v_2286 < 40 || v_2286 > 256)
            throw new Error(`Invalid ELF section-header entry size: ${v_2286}`);
          if (!fn_209(v_2283, v_2286, v_2287, arg_2277.length))
            throw new Error("Broken ELF section-header table");
        }
        let list_2289 = [],
          num_2290 = 0;
        for (let num_2292 = 0; num_2292 < v_2285; num_2292++) {
          let v_2293 = v_2282 + num_2292 * v_2284,
            obj_2294 = {
              type: fn_205(arg_2277, v_2293),
              offset: fn_205(arg_2277, v_2293 + 4),
              vaddr: fn_205(arg_2277, v_2293 + 8),
              filesz: fn_205(arg_2277, v_2293 + 16),
              memsz: fn_205(arg_2277, v_2293 + 20),
              flags: fn_205(arg_2277, v_2293 + 24),
              align: fn_205(arg_2277, v_2293 + 28),
            };
          if (obj_2294.type === num_185) {
            if (obj_2294.filesz < 0 || obj_2294.memsz < obj_2294.filesz)
              throw new Error(`Invalid PT_LOAD sizes in header #${num_2292}`);
            if (obj_2294.memsz > obj_183.maxRegionBytes)
              throw new Error(`PT_LOAD #${num_2292} exceeds guest-region limit`);
            if (!fn_210(obj_2294.offset, obj_2294.filesz, arg_2277.length))
              throw new Error(`PT_LOAD #${num_2292} outside file`);
            if ((obj_2294.vaddr >>> 0) + obj_2294.memsz > 4294967296)
              throw new Error(`PT_LOAD #${num_2292} wraps guest address space`);
            if (((num_2290 += obj_2294.memsz), num_2290 > obj_183.maxMappedBytes))
              throw new Error("ELF PT_LOAD total exceeds guest mapping limit");
          }
          list_2289.push(obj_2294);
        }
        let list_2291 = [];
        if (v_2287 > 0) {
          for (let num_2295 = 0; num_2295 < v_2287; num_2295++) {
            let v_2296 = v_2283 + num_2295 * v_2286,
              obj_2297 = {
                nameOffset: fn_205(arg_2277, v_2296),
                type: fn_205(arg_2277, v_2296 + 4),
                flags: fn_205(arg_2277, v_2296 + 8),
                addr: fn_205(arg_2277, v_2296 + 12),
                offset: fn_205(arg_2277, v_2296 + 16),
                size: fn_205(arg_2277, v_2296 + 20),
                link: fn_205(arg_2277, v_2296 + 24),
                info: fn_205(arg_2277, v_2296 + 28),
                addralign: fn_205(arg_2277, v_2296 + 32),
                entsize: fn_205(arg_2277, v_2296 + 36),
                name: "",
              };
            if (obj_2297.size < 0) throw new Error(`Negative ELF section size #${num_2295}`);
            (obj_2297.type !== num_191 &&
              obj_2297.size > 0 &&
              !fn_210(obj_2297.offset, obj_2297.size, arg_2277.length) &&
              ((obj_2297.flags & num_203) !== 0 && obj_2297.offset >= 0
                ? (obj_2297.size = Math.min(
                    Math.max(arg_2277.length - obj_2297.offset, 0),
                    obj_2297.size
                  ))
                : (obj_2297.size = 0)),
              list_2291.push(obj_2297));
          }
          if (v_2288 !== 0 && (v_2288 < 0 || v_2288 >= list_2291.length))
            throw new Error(`Invalid ELF shstrndx=${v_2288}`);
          if (v_2288 > 0 && v_2288 < list_2291.length) {
            let v_2298 = list_2291[v_2288];
            if (v_2298.type !== num_188)
              throw new Error("ELF shstrndx does not reference a string table");
            for (let v_2299 of list_2291)
              v_2299.name =
                v_2299.nameOffset < 0 || v_2299.nameOffset >= v_2298.size
                  ? ""
                  : Cls_2271.readZ(
                      arg_2277,
                      v_2298.offset + v_2299.nameOffset,
                      v_2298.offset + v_2298.size
                    );
          }
        }
        return new Cls_2271(arg_2277, v_2278, v_2281, list_2289, list_2291);
      }
      static readZ(arg_2300, arg_2301, arg_2302) {
        if (arg_2301 < 0 || arg_2301 >= arg_2300.length || arg_2301 >= arg_2302) return "";
        let v_2303 = arg_2301,
          v_2304 = Math.min(arg_2302, arg_2300.length);
        for (; v_2303 < v_2304 && arg_2300[v_2303] !== 0; ) v_2303++;
        let str_2305 = "";
        for (let v_2306 = arg_2301; v_2306 < v_2303; v_2306++)
          str_2305 += String.fromCharCode(arg_2300[v_2306]);
        return str_2305;
      }
      armccRwpiImageSize() {
        let v_2307 = this.sections.find(
          (arg_2312) =>
            arg_2312.name === "ER_RO" &&
            arg_2312.type === num_186 &&
            (arg_2312.flags & num_203) !== 0 &&
            (arg_2312.flags & num_204) !== 0 &&
            arg_2312.size > 0
        );
        if (!v_2307) return 0;
        let v_2308 = this.sections.find(
          (arg_2313) =>
            arg_2313.name === "ER_RW" &&
            arg_2313.type === num_186 &&
            (arg_2313.flags & num_203) !== 0 &&
            (arg_2313.flags & num_202) !== 0 &&
            arg_2313.addr === 0 &&
            arg_2313.size > 0
        );
        if (!v_2308) return 0;
        let v_2309 = this.programHeaders.find(
          (arg_2314) =>
            arg_2314.type === num_185 && arg_2314.vaddr === v_2307.addr && arg_2314.filesz > 0
        );
        if (
          !v_2309 ||
          v_2308.offset < v_2307.offset + v_2307.size ||
          v_2308.offset + v_2308.size > this.bytes.length ||
          v_2309.filesz < v_2307.size + v_2308.size
        )
          return 0;
        let v_2310 = this.sections.filter(
          (arg_2315) =>
            (arg_2315.flags & num_203) !== 0 &&
            (arg_2315.flags & num_202) !== 0 &&
            arg_2315.size > 0 &&
            arg_2315.addr >= 0 &&
            arg_2315.addr < 16 * 1024 * 1024
        );
        if (v_2310.length === 0) return 0;
        let v_2311 = Math.max(...v_2310.map((arg_2316) => arg_2316.addr + arg_2316.size));
        return v_2311 <= 0 || v_2311 > 16 * 1024 * 1024 ? 0 : v_2311;
      }
      correctedLoadOffset(arg_2317) {
        if (arg_2317.filesz <= 0 || this.sections.length === 0) return arg_2317.offset;
        let v_2318 = this.sections
            .map((arg_2323, arg_2324) => ({ s: arg_2323, i: arg_2324 }))
            .filter(
              ({ s: arg_2325 }) =>
                arg_2325.type === num_186 && (arg_2325.flags & num_203) !== 0 && arg_2325.size > 0
            )
            .sort((arg_2326, arg_2327) => arg_2326.s.offset - arg_2327.s.offset),
          v_2319 = v_2318.findIndex(({ s: arg_2328 }) => arg_2328.addr === arg_2317.vaddr);
        if (v_2319 < 0) return arg_2317.offset;
        let v_2320 = v_2318[v_2319],
          v_2321 = v_2320.s.offset,
          num_2322 = 0;
        for (let num_2329 = 0; num_2329 < v_2318.length; num_2329++) {
          let v_2330 = v_2318[num_2329].s;
          if (v_2330.offset !== v_2321) {
            if (num_2322 > 0) break;
            continue;
          }
          if (
            !(num_2322 === 0 && num_2329 !== v_2319) &&
            ((num_2322 += v_2330.size), (v_2321 += v_2330.size), num_2322 >= arg_2317.filesz)
          )
            break;
        }
        return num_2322 === arg_2317.filesz && v_2320.s.offset !== arg_2317.offset
          ? v_2320.s.offset
          : arg_2317.offset;
      }
      load(arg_2331) {
        let v_2332 = this.programHeaders.filter(
          (arg_2340) => arg_2340.type === num_185 && arg_2340.memsz > 0
        );
        if (v_2332.length === 0) throw new Error("ELF has no PT_LOAD segment");
        let v_2333 = Math.min(...v_2332.map((arg_2341) => arg_2341.vaddr >>> 0)),
          v_2334 = this.type === 3 && v_2333 < 65536 ? 65536 : 0,
          num_2335 = 2147483647,
          num_2336 = 0,
          v_2337 = this.armccRwpiImageSize(),
          v_2338 = v_2337 > 0 ? 8388608 : null;
        if (v_2338 !== null) {
          let v_2342 = v_2338 - 4096,
            v_2343 = fn_208(v_2338 + v_2337);
          arg_2331.isMapped(v_2342, v_2343 - v_2342) ||
            arg_2331.map(v_2342, v_2343 - v_2342, !0, !0, !1);
        } else {
          let v_2344 = this.sections.filter(
            (arg_2345) =>
              (arg_2345.flags & num_203) !== 0 &&
              (arg_2345.flags & num_202) !== 0 &&
              arg_2345.size > 0
          );
          for (let v_2346 of v_2344) {
            let v_2347 = v_2346.addr,
              v_2348 = v_2347 + v_2346.size;
            if (
              !v_2332.some((arg_2349) => {
                let v_2350 = arg_2349.vaddr,
                  v_2351 = v_2350 + arg_2349.memsz;
                return v_2347 >= v_2350 && v_2348 <= v_2351;
              }) &&
              v_2347 >= 0 &&
              v_2348 > v_2347 &&
              v_2348 <= 16 * 1024 * 1024
            ) {
              let v_2352 = fn_207(v_2346.addr + v_2334),
                v_2353 = fn_208(v_2346.addr + v_2334 + v_2346.size);
              arg_2331.isMapped(v_2352, v_2353 - v_2352) ||
                arg_2331.map(v_2352, v_2353 - v_2352, !0, !0, !1);
            }
          }
        }
        for (let v_2354 of v_2332) {
          if (v_2354.filesz < 0 || v_2354.memsz < v_2354.filesz)
            throw new Error("Invalid PT_LOAD sizes");
          let v_2355 = this.correctedLoadOffset(v_2354);
          if (v_2355 < 0 || v_2355 + v_2354.filesz > this.bytes.length)
            throw new Error("PT_LOAD outside file");
          let v_2356 = fn_207(v_2354.vaddr + v_2334),
            v_2357 = fn_208(v_2354.vaddr + v_2334 + v_2354.memsz),
            v_2358 = v_2357 - v_2356,
            v_2359 = (v_2354.flags & 4) !== 0,
            v_2360 = (v_2354.flags & 2) !== 0,
            v_2361 = (v_2354.flags & 1) !== 0;
          (arg_2331.isMapped(v_2356, v_2358) ||
            arg_2331.map(v_2356, v_2358, v_2359 || v_2361, v_2360, v_2361),
            v_2354.filesz > 0 &&
              arg_2331.writeBytes(v_2354.vaddr + v_2334, this.bytes, v_2355, v_2354.filesz, !0),
            (num_2335 = Math.min(num_2335, v_2356)),
            (num_2336 = Math.max(num_2336, v_2357)));
        }
        let v_2339 =
          v_2332.reduce((arg_2362, arg_2363) =>
            arg_2363.vaddr >>> 0 < arg_2362.vaddr >>> 0 ? arg_2363 : arg_2362
          ).vaddr + v_2334;
        return {
          entry: this.entry !== 0 ? (this.entry + v_2334) | 0 : v_2339 | 0,
          loadBias: v_2334,
          imageStart: num_2335 | 0,
          imageEnd: num_2336 | 0,
          staticBase: v_2338,
          staticImageSize: v_2337,
        };
      }
      readSymbols(arg_2364) {
        let v_2365 = this.symbolCache.get(arg_2364);
        if (v_2365) return v_2365;
        let v_2366 = this.sections[arg_2364];
        if (
          !v_2366 ||
          v_2366.entsize <= 0 ||
          v_2366.link < 0 ||
          v_2366.link >= this.sections.length
        )
          return (this.symbolCache.set(arg_2364, []), []);
        let v_2367 = this.sections[v_2366.link],
          list_2368 = [],
          v_2369 = v_2366.offset,
          v_2370 = Math.min(v_2366.offset + v_2366.size, this.bytes.length);
        for (; v_2369 + 16 <= v_2370; ) {
          let v_2371 = fn_205(this.bytes, v_2369);
          (list_2368.push({
            name: Cls_2271.readZ(this.bytes, v_2367.offset + v_2371, v_2367.offset + v_2367.size),
            value: fn_205(this.bytes, v_2369 + 4),
            size: fn_205(this.bytes, v_2369 + 8),
            info: this.bytes[v_2369 + 12],
            other: this.bytes[v_2369 + 13],
            shndx: fn_206(this.bytes, v_2369 + 14),
          }),
            (v_2369 += v_2366.entsize));
        }
        return (this.symbolCache.set(arg_2364, list_2368), list_2368);
      }
      sectionAddress(arg_2372, arg_2373) {
        let v_2374 = this.sections.find((arg_2375) => arg_2375.name === arg_2372);
        return v_2374 ? (v_2374.addr + arg_2373.loadBias) | 0 : null;
      }
      sectionSize(arg_2376) {
        var v_2377, v_2378;
        return (v_2378 =
          (v_2377 = this.sections.find((arg_2379) => arg_2379.name === arg_2376)) == null
            ? void 0
            : v_2377.size) != null
          ? v_2378
          : 0;
      }
      vmResSection() {
        let v_2380 = this.sections.find(
          (arg_2381) => arg_2381.name === ".vm_res" && arg_2381.size > 0
        );
        if (!v_2380) return null;
        if (v_2380.offset < 0 || v_2380.size < 0 || v_2380.offset + v_2380.size > this.bytes.length)
          throw new Error(".vm_res section outside file");
        return {
          bytes: this.bytes.subarray(v_2380.offset, this.bytes.length),
          offset: v_2380.offset,
        };
      }
      definedSymbolAddress(arg_2382, arg_2383) {
        for (let num_2384 = 0; num_2384 < this.sections.length; num_2384++) {
          let v_2385 = this.sections[num_2384];
          if (v_2385.type !== num_187 && v_2385.type !== num_190) continue;
          let v_2386 = this.readSymbols(num_2384).find(
            (arg_2387) => arg_2387.shndx !== num_192 && arg_2387.name === arg_2382
          );
          if (v_2386) return (v_2386.value + arg_2383.loadBias) | 0;
        }
        return null;
      }
      undefinedSymbols() {
        let set_2388 = new Set();
        for (let num_2389 = 0; num_2389 < this.sections.length; num_2389++) {
          let v_2390 = this.sections[num_2389];
          if (!(v_2390.type !== num_187 && v_2390.type !== num_190))
            for (let v_2391 of this.readSymbols(num_2389))
              v_2391.shndx === num_192 && v_2391.name && set_2388.add(v_2391.name);
        }
        return [...set_2388];
      }
      functionSymbols(arg_2392) {
        let list_2393 = [],
          set_2394 = new Set();
        for (let num_2395 = 0; num_2395 < this.sections.length; num_2395++) {
          let v_2396 = this.sections[num_2395];
          if (!(v_2396.type !== num_187 && v_2396.type !== num_190))
            for (let v_2397 of this.readSymbols(num_2395)) {
              if (v_2397.shndx === num_192 || !v_2397.name || (v_2397.info & 15) !== 2) continue;
              let v_2398 = ((v_2397.value & -2) + arg_2392.loadBias) | 0,
                v_2399 = `${v_2397.name}@${v_2398.toString(16)}`;
              set_2394.has(v_2399) ||
                (set_2394.add(v_2399), list_2393.push(fn_11(fn_10({}, v_2397), { value: v_2398 })));
            }
        }
        return list_2393.sort(
          (arg_2400, arg_2401) =>
            arg_2400.value - arg_2401.value || arg_2400.name.localeCompare(arg_2401.name)
        );
      }
      applyRelocations(arg_2402, arg_2403, arg_2404) {
        let set_2405 = new Set();
        for (let v_2406 of this.sections) {
          if (
            v_2406.type !== num_189 ||
            v_2406.entsize <= 0 ||
            v_2406.link < 0 ||
            v_2406.link >= this.sections.length
          )
            continue;
          let v_2407 = this.readSymbols(v_2406.link),
            v_2408 = v_2406.offset,
            v_2409 = v_2406.offset + v_2406.size,
            v_2410 = Math.max(v_2406.entsize, 8);
          for (; v_2408 + 8 <= v_2409 && v_2408 + 8 <= this.bytes.length; ) {
            let v_2411 = fn_205(this.bytes, v_2408),
              v_2412 = fn_205(this.bytes, v_2408 + 4),
              v_2413 = v_2412 & 255,
              v_2414 = v_2412 >>> 8,
              v_2415 = (v_2411 + arg_2403.loadBias) | 0,
              num_2416 = 0;
            try {
              num_2416 = arg_2402.read32(v_2415);
            } catch (v_2419) {
              v_2408 += v_2410;
              continue;
            }
            if (v_2413 === num_198) {
              (arg_2402.write32(v_2415, (arg_2403.loadBias + num_2416) | 0, !0),
                (v_2408 += v_2410));
              continue;
            }
            if (v_2413 === 0) {
              v_2408 += v_2410;
              continue;
            }
            let v_2417 = v_2407[v_2414],
              num_2418 = 0;
            if (v_2417 === void 0) num_2418 = 0;
            else if (v_2417.shndx === num_192) {
              let v_2420 = arg_2404.addressOf(v_2417.name);
              v_2420 === null
                ? (v_2417.name && set_2405.add(v_2417.name),
                  (num_2418 =
                    v_2417.name && arg_2404.hasApiCapacity
                      ? arg_2404.resolveAddressOrStub(v_2417.name)
                      : 0))
                : (num_2418 = v_2420);
            } else num_2418 = (v_2417.value + arg_2403.loadBias) | 0;
            if (v_2417 === void 0 || v_2417.shndx !== num_192 || num_2418 !== 0)
              switch (v_2413) {
                case num_193:
                  arg_2402.write32(v_2415, (num_2418 + num_2416) | 0, !0);
                  break;
                case num_194:
                  arg_2402.write32(v_2415, (num_2418 + num_2416 - v_2415) | 0, !0);
                  break;
                case num_196:
                case num_197:
                  arg_2402.write32(v_2415, num_2418 | 0, !0);
                  break;
                case num_199:
                case num_200:
                  this.patchArmBranch(arg_2402, v_2415, num_2418);
                  break;
                case num_195:
                case num_201:
                  this.patchThumbBranch(arg_2402, v_2415, num_2418);
                  break;
                default:
                  this.relocErrors.push(
                    `unsupported type=${v_2413}@0x${(v_2415 >>> 0).toString(16)}`
                  );
                  break;
              }
            v_2408 += v_2410;
          }
        }
        return [...set_2405];
      }
      patchArmBranch(arg_2421, arg_2422, arg_2423) {
        let v_2424 = arg_2421.read32(arg_2422),
          v_2425 = arg_2423 - (arg_2422 + 8);
        if (v_2425 % 4 !== 0 || v_2425 < -33554432 || v_2425 > 33554428) {
          this.relocErrors.push(
            `arm-branch-range 0x${(arg_2422 >>> 0).toString(16)}->0x${(arg_2423 >>> 0).toString(16)}`
          );
          return;
        }
        let v_2426 = (v_2425 >> 2) & 16777215;
        arg_2421.write32(arg_2422, (v_2424 & 4278190080) | v_2426, !0);
      }
      patchThumbBranch(arg_2427, arg_2428, arg_2429) {
        let v_2430 = arg_2429 - (arg_2428 + 4);
        if (v_2430 % 2 !== 0 || v_2430 < -4194304 || v_2430 > 4194302) {
          this.relocErrors.push(
            `thumb-bl-range 0x${(arg_2428 >>> 0).toString(16)}->0x${(arg_2429 >>> 0).toString(16)}`
          );
          return;
        }
        let v_2431 = (v_2430 >> 12) & 2047,
          v_2432 = (v_2430 >> 1) & 2047;
        (arg_2427.write16(arg_2428, 61440 | v_2431, !0),
          arg_2427.write16(arg_2428 + 2, 63488 | v_2432, !0));
      }
      installImportResolvers(arg_2433, arg_2434, arg_2435, arg_2436) {
        let map_2437 = new Map(this.namedResolverSlots(arg_2433, arg_2434, arg_2435, arg_2436)),
          v_2438 = this.sections.find(
            (arg_2442) => arg_2442.name === ".text" && arg_2442.size >= 16
          );
        if (!v_2438) {
          for (let [v_2443, v_2444] of map_2437) arg_2433.write32(v_2443, v_2444, !0);
          return [...map_2437.keys()];
        }
        let v_2439 = (v_2438.addr + arg_2434.loadBias) | 0,
          v_2440 = (v_2439 + v_2438.size) | 0,
          num_2441 = 0;
        for (; num_2441 + 12 <= v_2438.size; ) {
          let v_2445 = arg_2433.read32(v_2439 + num_2441),
            v_2446 = (v_2445 >>> 12) & 15;
          if (Cls_2271.armAddPcReg(v_2445) !== v_2446 || v_2446 === 15) {
            num_2441 += 4;
            continue;
          }
          let v_2447 = arg_2433.read32(v_2439 + num_2441 + 4);
          if (
            !Cls_2271.isArmLdrWord(v_2447) ||
            ((v_2447 >>> 16) & 15) !== v_2446 ||
            ((v_2447 >>> 12) & 15) !== v_2446 ||
            (v_2447 & 4095) !== 0
          ) {
            num_2441 += 4;
            continue;
          }
          let v_2448 = arg_2433.read32(v_2439 + num_2441 + 8);
          if ((v_2448 & 268435440) !== 19922736 || (v_2448 & 15) !== v_2446) {
            num_2441 += 4;
            continue;
          }
          if (!this.hasApiNameOperand(arg_2433, v_2439, num_2441)) {
            num_2441 += 4;
            continue;
          }
          let num_2449 = 0,
            v_2450 = !1;
          for (let v_2451 = Math.max(num_2441 - 24, 0); v_2451 < num_2441; v_2451 += 4) {
            let v_2452 = arg_2433.read32(v_2439 + v_2451);
            if (
              Cls_2271.isArmLdrWord(v_2452) &&
              ((v_2452 >>> 16) & 15) === 15 &&
              ((v_2452 >>> 12) & 15) === v_2446
            ) {
              let v_2453 = v_2452 & 4095;
              ((num_2449 =
                (v_2439 + v_2451 + 8 + ((v_2452 & 8388608) !== 0 ? v_2453 : -v_2453)) | 0),
                (v_2450 = !0));
              break;
            }
          }
          if (v_2450 && arg_2433.isMapped(num_2449, 4)) {
            let v_2454 = (v_2439 + num_2441 + 8 + arg_2433.read32(num_2449)) | 0,
              v_2455 = !1;
            try {
              v_2455 = arg_2433.read32(v_2454) === 0;
            } catch (v_2456) {
              v_2455 = !1;
            }
            v_2454 !== 0 &&
              (v_2454 < v_2439 || v_2454 >= v_2440) &&
              arg_2433.isMapped(v_2454, 4) &&
              v_2455 &&
              !map_2437.has(v_2454) &&
              map_2437.set(v_2454, arg_2435);
          }
          num_2441 += 4;
        }
        for (let [v_2457, v_2458] of map_2437) arg_2433.write32(v_2457, v_2458, !0);
        return [...map_2437.keys()];
      }
      namedResolverSlots(arg_2459, arg_2460, arg_2461, arg_2462) {
        let list_2463 = [];
        for (let num_2464 = 0; num_2464 < this.sections.length; num_2464++) {
          let v_2465 = this.sections[num_2464];
          if (!(v_2465.type !== num_187 && v_2465.type !== num_190))
            for (let v_2466 of this.readSymbols(num_2464)) {
              if (v_2466.shndx === num_192 || v_2466.size !== 4 || (v_2466.info & 15) !== 1)
                continue;
              let v_2467 = this.sections[v_2466.shndx];
              if (!v_2467 || v_2467.type === num_191 || (v_2467.flags & num_202) === 0) continue;
              let v_2468 = v_2466.name,
                v_2469 = v_2468 === "vm_get_sym_entry" || v_2468 === "__vxp_resolver";
              if (!v_2469 && arg_2462.addressOf(v_2468) === null) continue;
              let v_2470 = (v_2466.value + arg_2460.loadBias) | 0,
                v_2471 = !1;
              try {
                v_2471 = arg_2459.isMapped(v_2470, 4) && arg_2459.read32(v_2470) === 0;
              } catch (v_2472) {
                v_2471 = !1;
              }
              v_2471 && list_2463.push([v_2470, v_2469 ? arg_2461 : arg_2462.addressOf(v_2468)]);
            }
        }
        return list_2463;
      }
      static armAddPcReg(arg_2473) {
        if (
          ((arg_2473 >>> 20) & 255) !== 8 ||
          ((arg_2473 >>> 16) & 15) !== 15 ||
          (arg_2473 & 4080) !== 0
        )
          return null;
        let v_2474 = (arg_2473 >>> 12) & 15;
        return (arg_2473 & 15) === v_2474 ? v_2474 : null;
      }
      static isArmLdrWord(arg_2475) {
        return ((arg_2475 >>> 20) & 255 & 247) === 81;
      }
      hasApiNameOperand(arg_2476, arg_2477, arg_2478) {
        for (let v_2479 = arg_2478 - 24; v_2479 <= arg_2478 + 8; v_2479 += 4) {
          if (v_2479 < 0) continue;
          let v_2480 = arg_2476.read32(arg_2477 + v_2479);
          if ((v_2480 & 268431360) === 42926080) {
            let v_2481 = Cls_2271.armRotatedImmediate(v_2480 & 255, (v_2480 >>> 8) & 15),
              v_2482 = (arg_2477 + v_2479 + 8 + ((v_2480 & 8388608) !== 0 ? v_2481 : -v_2481)) | 0;
            if (Cls_2271.isApiNameAt(arg_2476, v_2482)) return !0;
          }
        }
        return !1;
      }
      static armRotatedImmediate(arg_2483, arg_2484) {
        let v_2485 = arg_2484 * 2;
        return v_2485 === 0
          ? arg_2483
          : ((arg_2483 << v_2485) | (arg_2483 >>> (32 - v_2485))) >>> 0;
      }
      static isApiNameAt(arg_2486, arg_2487) {
        if (arg_2487 <= 0) return !1;
        let num_2488 = 0;
        for (let num_2489 = 0; num_2489 < 64; num_2489++) {
          let v_2490 = -1;
          try {
            v_2490 = arg_2486.read8(arg_2487 + num_2489) & 255;
          } catch (v_2491) {
            return !1;
          }
          if (
            !(
              (v_2490 >= 97 && v_2490 <= 122) ||
              (v_2490 >= 65 && v_2490 <= 90) ||
              (v_2490 >= 48 && v_2490 <= 57) ||
              v_2490 === 95
            )
          )
            return num_2488 >= 4 && v_2490 === 0 && num_2489 > 0;
          if (
            num_2489 === 0 &&
            !((v_2490 >= 97 && v_2490 <= 122) || (v_2490 >= 65 && v_2490 <= 90) || v_2490 === 95)
          )
            return !1;
          num_2488++;
        }
        return !1;
      }
    },
    num_212 = 1,
    num_213 = 4,
    num_214 = 1024;
  function fn_215(arg_2492) {
    let v_2493 = arg_2492.mem,
      v_2494 = arg_2492.gfx,
      v_2495 = arg_2492.fs,
      fn_2496 = (arg_2535, arg_2536) => arg_2492.arg(arg_2535, arg_2536);
    (arg_2492.api("__vxp_resolver", (arg_2537) => {
      let str_2538 = "";
      try {
        str_2538 = v_2493.readCString(arg_2537.r[0], 256);
      } catch (v_2539) {
        str_2538 = "";
      }
      arg_2537.r[0] = arg_2492.resolveAddressOrStub(str_2538);
    }),
      arg_2492.api("vm_get_sym_entry", (arg_2540) => {
        let str_2541 = "";
        try {
          str_2541 = v_2493.readCString(fn_2496(arg_2540, 0), 256);
        } catch (v_2542) {
          str_2541 = "";
        }
        arg_2540.r[0] = arg_2492.resolveAddressOrStub(str_2541);
      }),
      arg_2492.api("vm_graphic_get_screen_width", (arg_2543) => {
        arg_2543.r[0] = v_2494.screenWidth;
      }),
      arg_2492.api("vm_graphic_get_screen_height", (arg_2544) => {
        arg_2544.r[0] = v_2494.screenHeight;
      }),
      arg_2492.api("vm_graphic_get_screen_w", (arg_2545) => {
        arg_2545.r[0] = v_2494.screenWidth;
      }),
      arg_2492.api("vm_graphic_get_screen_h", (arg_2546) => {
        arg_2546.r[0] = v_2494.screenHeight;
      }),
      arg_2492.api("vm_graphic_get_bits_per_pixel", (arg_2547) => {
        arg_2547.r[0] = 16;
      }),
      arg_2492.api("vm_graphic_create_layer", (arg_2548) => {
        arg_2548.r[0] = v_2494.createLayer(
          fn_2496(arg_2548, 0),
          fn_2496(arg_2548, 1),
          fn_2496(arg_2548, 2),
          fn_2496(arg_2548, 3),
          fn_217(fn_2496(arg_2548, 4))
        );
      }),
      arg_2492.api("vm_graphic_create_layer_ex", (arg_2549) => {
        let v_2550 = fn_2496(arg_2549, 0),
          v_2551 = fn_2496(arg_2549, 1),
          v_2552 = fn_2496(arg_2549, 2),
          v_2553 = fn_2496(arg_2549, 3),
          v_2554 = fn_2496(arg_2549, 6),
          v_2555 = v_2554 !== 0 && v_2493.isMapped(v_2554, v_2552 * v_2553 * 2) ? v_2554 : -1;
        arg_2549.r[0] = v_2494.createLayer(
          v_2550,
          v_2551,
          v_2552,
          v_2553,
          fn_217(fn_2496(arg_2549, 4)),
          v_2555
        );
      }),
      arg_2492.api("vm_graphic_get_layer_buffer", (arg_2556) => {
        arg_2556.r[0] = v_2494.getLayerBuffer(fn_2496(arg_2556, 0));
      }),
      arg_2492.api("vm_graphic_get_buffer", (arg_2557) => {
        (v_2494.ensureScreenLayer(), (arg_2557.r[0] = v_2494.screenBufferAddress()));
      }),
      arg_2492.api("vm_initialize_screen_buffer", (arg_2558) => {
        arg_2558.r[0] = v_2494.ensureScreenLayer() !== v_120 ? 0 : -1;
      }),
      arg_2492.api("vm_dd_initialize_clip_rect", (arg_2559) => {
        arg_2559.r[0] = v_2494.ensureScreenLayer() !== v_120 ? 0 : -1;
      }),
      arg_2492.api("vm_graphic_active_layer", (arg_2560) => {
        arg_2560.r[0] = v_2494.activeLayer(fn_2496(arg_2560, 0));
      }),
      arg_2492.api("vm_graphic_delete_layer", (arg_2561) => {
        arg_2561.r[0] = v_2494.deleteLayer(fn_2496(arg_2561, 0));
      }),
      arg_2492.api("vm_graphic_create_canvas", (arg_2562) => {
        arg_2562.r[0] = v_2494.createCanvas(
          fn_2496(arg_2562, 0),
          fn_2496(arg_2562, 1),
          fn_217(fn_2496(arg_2562, 2))
        );
      }),
      arg_2492.api("vm_graphic_get_canvas_buffer", (arg_2563) => {
        arg_2563.r[0] = v_2494.canvasBuffer(fn_2496(arg_2563, 0));
      }),
      arg_2492.api("vm_graphic_create_canvas_cf", (arg_2564) => {
        arg_2564.r[0] = v_2494.createCanvas(fn_2496(arg_2564, 1), fn_2496(arg_2564, 2), -1);
      }),
      arg_2492.api("vm_graphic_create_layer_cf", (arg_2565) => {
        let v_2566 = fn_2496(arg_2565, 1),
          v_2567 = fn_2496(arg_2565, 2),
          v_2568 = fn_2496(arg_2565, 3),
          v_2569 = fn_2496(arg_2565, 4),
          v_2570 = fn_2496(arg_2565, 7),
          v_2571 = fn_2496(arg_2565, 8),
          v_2572 =
            v_2570 !== 0 && v_2571 >= v_2568 * v_2569 * 2 && v_2493.isMapped(v_2570, v_2571)
              ? v_2570
              : -1,
          v_2573 = fn_2496(arg_2565, 5),
          v_2574 =
            v_2573 !== 0 && v_2493.isMapped(v_2573, 4)
              ? fn_89(v_2493.read8(v_2573 + 1), v_2493.read8(v_2573 + 2), v_2493.read8(v_2573 + 3))
              : -1;
        arg_2565.r[0] = v_2494.createLayer(v_2566, v_2567, v_2568, v_2569, v_2574, v_2572);
      }));
    let map_2497 = new Map(),
      fn_2498 = (arg_2575) => {
        let v_2576 = map_2497.get(arg_2575);
        v_2576 !== void 0 && (map_2497.delete(arg_2575), arg_2492.heap.free(v_2576));
      };
    (arg_2492.api("vm_graphic_release_canvas", (arg_2577) => {
      let v_2578 = fn_2496(arg_2577, 0);
      (fn_2498(v_2578), (arg_2577.r[0] = v_2494.releaseCanvas(v_2578)));
    }),
      arg_2492.api("vm_graphic_canvas_set_trans_color", (arg_2579) => {
        let v_2580 = fn_2496(arg_2579, 1);
        arg_2579.r[0] = v_2494.setCanvasTransparentColor(
          fn_2496(arg_2579, 0),
          v_2580 < 0 ? -1 : fn_222(v_2493, v_2580)
        );
      }));
    let fn_2499 = (arg_2581) => {
      let v_2582 = fn_2496(arg_2581, 0),
        v_2583 = fn_2496(arg_2581, 1);
      return v_2582 === 0 || v_2583 <= 0 || v_2583 > 33554432 || !v_2493.isMapped(v_2582, v_2583)
        ? 0
        : v_2494.loadImage(v_2493.readBytes(v_2582, v_2583));
    };
    (arg_2492.api("vm_graphic_load_image", (arg_2584) => {
      arg_2584.r[0] = fn_2499(arg_2584);
    }),
      arg_2492.api("vm_graphic_load_img", (arg_2585) => {
        arg_2585.r[0] = fn_2499(arg_2585);
      }),
      arg_2492.api("vm_graphic_get_image_buffer", (arg_2586) => {
        arg_2586.r[0] = v_2494.getImageBuffer(fn_2496(arg_2586, 0));
      }),
      arg_2492.api("vm_graphic_get_img_buffer", (arg_2587) => {
        arg_2587.r[0] = v_2494.getImageBuffer(fn_2496(arg_2587, 0));
      }),
      arg_2492.api("vm_graphic_release_image", (arg_2588) => {
        let v_2589 = fn_2496(arg_2588, 0);
        (fn_2498(v_2589), (arg_2588.r[0] = v_2494.releaseImage(v_2589)));
      }));
    let fn_2500 = (arg_2590) => {
      let v_2591 = fn_2496(arg_2590, 0),
        v_2592 = v_2494.imageWidth(v_2591),
        v_2593 = v_2494.imageHeight(v_2591);
      if (v_2592 <= 0 || v_2593 <= 0) {
        arg_2590.r[0] = 0;
        return;
      }
      let v_2594 = map_2497.get(v_2591);
      if (v_2594 === void 0) {
        if (((v_2594 = arg_2492.heap.calloc(24)), v_2594 === 0)) {
          arg_2590.r[0] = 0;
          return;
        }
        map_2497.set(v_2591, v_2594);
      }
      (v_2493.write8(v_2594 + 0, 1, !0),
        v_2493.write16(v_2594 + 2, 0, !0),
        v_2493.write16(v_2594 + 4, 0, !0),
        v_2493.write16(v_2594 + 6, v_2592, !0),
        v_2493.write16(v_2594 + 8, v_2593, !0),
        v_2493.write16(v_2594 + 10, 0, !0),
        v_2493.write8(v_2594 + 12, 0, !0),
        v_2493.write16(v_2594 + 14, 0, !0),
        v_2493.write32(v_2594 + 16, v_2592 * v_2593 * 2, !0),
        (arg_2590.r[0] = v_2594));
    };
    (arg_2492.api("vm_graphic_get_img_property", fn_2500),
      arg_2492.api("vm_graphic_get_image_property", fn_2500),
      arg_2492.api("vm_graphic_get_img_property_ex", fn_2500),
      arg_2492.api("vm_dd_get_img_property", fn_2500),
      arg_2492.api("vm_graph_get_img_property", fn_2500),
      arg_2492.api("vm_dd_load_image", (arg_2595) => {
        let v_2596 = fn_2496(arg_2595, 0),
          v_2597 = fn_2496(arg_2595, 1),
          v_2598 =
            v_2596 !== 0 && v_2597 > 0 && v_2597 <= 33554432 && v_2493.isMapped(v_2596, v_2597)
              ? v_2494.loadImage(v_2493.readBytes(v_2596, v_2597))
              : 0;
        arg_2595.r[0] = v_2494.getImageBuffer(v_2598);
      }),
      arg_2492.api("vm_dd_get_frame_number", (arg_2599) => {
        arg_2599.r[0] = v_2494.canvasFrameCount(fn_2496(arg_2599, 0));
      }));
    let fn_2501 = (arg_2600) => {
      let v_2601 = fn_2496(arg_2600, 3),
        v_2602 = fn_2496(arg_2600, 4);
      if (v_2601 === 0 || v_2602 <= 0 || v_2602 > 33554432 || !v_2493.isMapped(v_2601, v_2602)) {
        arg_2600.r[0] = -1;
        return;
      }
      arg_2600.r[0] = v_2494.drawImageFromMemory(
        fn_2496(arg_2600, 0),
        fn_2496(arg_2600, 1),
        fn_2496(arg_2600, 2),
        v_2493.readBytes(v_2601, v_2602)
      );
    };
    (arg_2492.api("vm_graphic_draw_image_from_memory", fn_2501),
      arg_2492.api("vm_graphic_draw_image", fn_2501),
      arg_2492.api("vm_graphic_flush_layer", (arg_2603) => {
        arg_2603.r[0] = v_2494.flushLayers(
          fn_218(arg_2492, fn_2496(arg_2603, 0), fn_2496(arg_2603, 1))
        );
      }),
      arg_2492.api("vm_graphic_flush_screen", (arg_2604) => {
        arg_2604.r[0] = v_2494.flushActiveLayer();
      }),
      arg_2492.api("vm_graphic_flush_buffer", (arg_2605) => {
        arg_2605.r[0] = v_2494.flushActiveLayer();
      }),
      arg_2492.api("vm_graphic_flush_layer_non_block", (arg_2606) => {
        arg_2606.r[0] = v_2494.flushLayers(
          fn_218(arg_2492, fn_2496(arg_2606, 0), fn_2496(arg_2606, 1))
        );
      }),
      arg_2492.api("vm_graphic_blt", (arg_2607) => {
        let v_2608 = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((arg_2609) => fn_2496(arg_2607, arg_2609));
        arg_2607.r[0] = v_2494.blt(
          v_2608[0],
          v_2608[1],
          v_2608[2],
          v_2608[3],
          v_2608[4],
          v_2608[5],
          v_2608[6],
          v_2608[7],
          v_2608[8]
        );
      }),
      arg_2492.api("vm_graphic_blt_ex", (arg_2610) => {
        let v_2611 = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((arg_2612) => fn_2496(arg_2610, arg_2612));
        arg_2610.r[0] = v_2494.blt(
          v_2611[0],
          v_2611[1],
          v_2611[2],
          v_2611[3],
          v_2611[4],
          v_2611[5],
          v_2611[6],
          v_2611[7],
          v_2611[8]
        );
      }));
    let fn_2502 = (arg_2613) => {
      let v_2614 = fn_2496(arg_2613, 5),
        v_2615 = fn_2496(arg_2613, 6),
        v_2616 = v_2615 >= 0 && v_2615 <= 65535,
        v_2617 = v_2614 >= 0 && v_2614 <= 65535,
        v_2618 =
          v_2616 && (v_2617 || v_2614 === 0) ? v_2615 : v_2614 !== 0 ? v_2614 : v_2494.currentColor;
      arg_2613.r[0] = v_2494.fillRect(
        fn_2496(arg_2613, 0),
        fn_2496(arg_2613, 1),
        fn_2496(arg_2613, 2),
        fn_2496(arg_2613, 3),
        fn_2496(arg_2613, 4),
        v_2618
      );
    };
    (arg_2492.api("vm_graphic_fill_rect", fn_2502),
      arg_2492.api("vm_graphic_fill_rect_ex", fn_2502),
      arg_2492.api("vm_graphic_setcolor", (arg_2619) => {
        let v_2620 = fn_2496(arg_2619, 0);
        (v_2620 >= 0 && v_2620 <= 65535 && (v_2494.currentColor = v_2620), (arg_2619.r[0] = 0));
      }),
      arg_2492.api("vm_graphic_set_clip", (arg_2621) => {
        arg_2621.r[0] = v_2494.setClip(
          fn_2496(arg_2621, 0),
          fn_2496(arg_2621, 1),
          fn_2496(arg_2621, 2),
          fn_2496(arg_2621, 3)
        );
      }),
      arg_2492.api("vm_graphic_reset_clip", (arg_2622) => {
        arg_2622.r[0] = v_2494.resetClip();
      }),
      arg_2492.api("vm_graphic_set_layer_clip", (arg_2623) => {
        arg_2623.r[0] = v_2494.setLayerClip(
          fn_2496(arg_2623, 0),
          (fn_2496(arg_2623, 1) << 16) >> 16,
          (fn_2496(arg_2623, 2) << 16) >> 16,
          (fn_2496(arg_2623, 3) << 16) >> 16,
          (fn_2496(arg_2623, 4) << 16) >> 16
        );
      }),
      arg_2492.api("vm_graphic_reset_layer_clip", (arg_2624) => {
        arg_2624.r[0] = v_2494.resetLayerClip(fn_2496(arg_2624, 0));
      }),
      arg_2492.api("vm_graphic_layer_set_trans_color", (arg_2625) => {
        arg_2625.r[0] = v_2494.setLayerTransColor(
          fn_2496(arg_2625, 0),
          fn_217(fn_2496(arg_2625, 1))
        );
      }),
      arg_2492.api("vm_graphic_get_layer_position", (arg_2626) => {
        let v_2627 = v_2494.layer(fn_2496(arg_2626, 0));
        if (!v_2627) {
          arg_2626.r[0] = -1;
          return;
        }
        let list_2628 = [
            fn_2496(arg_2626, 1),
            fn_2496(arg_2626, 2),
            fn_2496(arg_2626, 3),
            fn_2496(arg_2626, 4),
          ],
          list_2629 = [v_2627.x, v_2627.y, v_2627.w, v_2627.h];
        for (let num_2630 = 0; num_2630 < 4; num_2630++)
          list_2628[num_2630] !== 0 &&
            v_2493.isMapped(list_2628[num_2630], 4) &&
            v_2493.write32(list_2628[num_2630], list_2629[num_2630], !0);
        arg_2626.r[0] = 0;
      }),
      arg_2492.api("vm_graphic_set_blt_layer", (arg_2631) => {
        arg_2631.r[0] = v_2494.setBltLayers(
          fn_218(arg_2492, fn_2496(arg_2631, 0), fn_2496(arg_2631, 1))
        );
      }),
      arg_2492.api("vm_graphic_set_alpha_blending_layer", (arg_2632) => {
        arg_2632.r[0] = 0;
      }));
    let fn_2503 = (arg_2633) => {
      arg_2633.r[0] = v_2494.flushLayers(
        fn_218(arg_2492, fn_2496(arg_2633, 0), fn_2496(arg_2633, 1))
      );
    };
    (arg_2492.api("vm_graphic_flatten_layer", fn_2503),
      arg_2492.api("vm_graphic_flatten_layer_ex", fn_2503),
      arg_2492.api("vm_graphic_set_layer_opacity", (arg_2634) => {
        arg_2634.r[0] = v_2494.setLayerOpacity(fn_2496(arg_2634, 0), fn_2496(arg_2634, 1));
      }),
      arg_2492.api("vm_dd_set_clip", (arg_2635) => {
        let v_2636 = fn_2496(arg_2635, 0),
          v_2637 = fn_2496(arg_2635, 1),
          v_2638 = fn_2496(arg_2635, 2),
          v_2639 = fn_2496(arg_2635, 3);
        arg_2635.r[0] = v_2494.setClip(v_2636, v_2637, v_2636 + v_2638 - 1, v_2637 + v_2639 - 1);
      }),
      arg_2492.api("vm_dd_reset_clip", (arg_2640) => {
        arg_2640.r[0] = v_2494.resetClip();
      }),
      arg_2492.api("vm_dd_active_layer", (arg_2641) => {
        arg_2641.r[0] = v_2494.activeLayer(fn_2496(arg_2641, 0));
      }),
      arg_2492.api("vm_dd_clean", (arg_2642) => {
        arg_2642.r[0] = v_2494.cleanSurface(
          fn_2496(arg_2642, 0),
          fn_221(v_2493, fn_2496(arg_2642, 1))
        );
      }),
      arg_2492.api("vm_graph_clean", (arg_2643) => {
        arg_2643.r[0] = v_2494.cleanSurface(
          fn_2496(arg_2643, 0),
          fn_221(v_2493, fn_2496(arg_2643, 1))
        );
      }),
      arg_2492.api("vm_graphic_fillrect", (arg_2644) => {
        arg_2644.r[0] = v_2494.fillRect(
          num_121,
          fn_2496(arg_2644, 0),
          fn_2496(arg_2644, 1),
          fn_2496(arg_2644, 2),
          fn_2496(arg_2644, 3),
          fn_221(v_2493, fn_2496(arg_2644, 4))
        );
      }));
    let fn_2504 = (arg_2645, arg_2646) => (arg_2647) => {
      let v_2648 = fn_2496(arg_2647, 0),
        v_2649 = fn_2496(arg_2647, 6),
        v_2650 = !arg_2646 && v_2649 !== 0 ? fn_221(v_2493, v_2649) : v_2494.currentColor;
      arg_2647.r[0] = arg_2645
        ? v_2494.fillRoundRectBuffer(
            v_2648,
            fn_2496(arg_2647, 1),
            fn_2496(arg_2647, 2),
            fn_2496(arg_2647, 3),
            fn_2496(arg_2647, 4),
            fn_2496(arg_2647, 5),
            v_2650
          )
        : v_2494.drawRoundRectBuffer(
            v_2648,
            fn_2496(arg_2647, 1),
            fn_2496(arg_2647, 2),
            fn_2496(arg_2647, 3),
            fn_2496(arg_2647, 4),
            fn_2496(arg_2647, 5),
            v_2650
          );
    };
    (arg_2492.api("vm_graphic_roundrect", fn_2504(!1, !1)),
      arg_2492.api("vm_graphic_fill_roundrect", fn_2504(!0, !1)));
    let fn_2505 = (arg_2651) =>
      arg_2651 !== 0 && v_2493.isMapped(arg_2651, 4)
        ? fn_89(v_2493.read8(arg_2651 + 1), v_2493.read8(arg_2651 + 2), v_2493.read8(arg_2651 + 3))
        : 0;
    (arg_2492.api("vm_graphic_roundrect_cf", (arg_2652) => {
      arg_2652.r[0] = v_2494.drawRoundRectBuffer(
        fn_2496(arg_2652, 0),
        fn_2496(arg_2652, 1),
        fn_2496(arg_2652, 2),
        fn_2496(arg_2652, 3),
        fn_2496(arg_2652, 4),
        fn_2496(arg_2652, 5),
        fn_2505(fn_2496(arg_2652, 6))
      );
    }),
      arg_2492.api("vm_graphic_fill_roundrect_cf", (arg_2653) => {
        arg_2653.r[0] = v_2494.fillRoundRectBuffer(
          fn_2496(arg_2653, 0),
          fn_2496(arg_2653, 1),
          fn_2496(arg_2653, 2),
          fn_2496(arg_2653, 3),
          fn_2496(arg_2653, 4),
          fn_2496(arg_2653, 5),
          fn_2505(fn_2496(arg_2653, 6))
        );
      }));
    let fn_2506 = (arg_2654) => (arg_2655) => {
      let v_2656 = fn_2496(arg_2655, 0);
      arg_2655.r[0] = arg_2654
        ? v_2494.fillRoundRectBuffer(
            v_2656,
            fn_2496(arg_2655, 1),
            fn_2496(arg_2655, 2),
            fn_2496(arg_2655, 3),
            fn_2496(arg_2655, 4),
            fn_2496(arg_2655, 5),
            v_2494.currentColor
          )
        : v_2494.drawRoundRectBuffer(
            v_2656,
            fn_2496(arg_2655, 1),
            fn_2496(arg_2655, 2),
            fn_2496(arg_2655, 3),
            fn_2496(arg_2655, 4),
            fn_2496(arg_2655, 5),
            v_2494.currentColor
          );
    };
    (arg_2492.api("vm_graphic_roundrect_ex", fn_2506(!1)),
      arg_2492.api("vm_graphic_fill_roundrect_ex", fn_2506(!0)));
    let fn_2507 = (arg_2657) => {
      arg_2657.r[0] = v_2494.fillEllipseBuffer(
        fn_2496(arg_2657, 0),
        fn_2496(arg_2657, 1),
        fn_2496(arg_2657, 2),
        fn_2496(arg_2657, 3),
        fn_2496(arg_2657, 4),
        fn_221(v_2493, fn_2496(arg_2657, 5))
      );
    };
    (arg_2492.api("vm_graphic_fill_ellipse", fn_2507),
      arg_2492.api("vm_graphic_fill_ellipse_ex", (arg_2658) => {
        arg_2658.r[0] = v_2494.fillEllipseBuffer(
          fn_2496(arg_2658, 0),
          fn_2496(arg_2658, 1),
          fn_2496(arg_2658, 2),
          fn_2496(arg_2658, 3),
          fn_2496(arg_2658, 4),
          v_2494.currentColor
        );
      }));
    let fn_2508 = (arg_2659, arg_2660) =>
      arg_2659 !== 0 && arg_2659 >= 0 && arg_2659 <= 65535
        ? arg_2659 & 65535
        : arg_2659 > 65535
          ? fn_221(v_2493, arg_2659)
          : fn_89((arg_2660 >>> 16) & 255, (arg_2660 >>> 8) & 255, arg_2660 & 255);
    (arg_2492.api("vm_graphic_gradient_paint_rect", (arg_2661) => {
      let v_2662 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((arg_2663) => fn_2496(arg_2661, arg_2663));
      arg_2661.r[0] = v_2494.gradientPaintRect(
        v_2662[0],
        v_2662[1],
        v_2662[2],
        v_2662[3],
        v_2662[4],
        fn_2508(v_2662[5], v_2662[6]),
        fn_2508(v_2662[7], v_2662[8]),
        v_2662[9]
      );
    }),
      arg_2492.api("vm_graphic_line", (arg_2664) => {
        arg_2664.r[0] = v_2494.drawLineBuffer(
          fn_2496(arg_2664, 0),
          fn_2496(arg_2664, 1),
          fn_2496(arg_2664, 2),
          fn_2496(arg_2664, 3),
          fn_2496(arg_2664, 4),
          fn_221(v_2493, fn_2496(arg_2664, 5))
        );
      }),
      arg_2492.api("vm_graphic_line_ex", (arg_2665) => {
        let v_2666 = fn_2496(arg_2665, 5);
        arg_2665.r[0] = v_2494.drawLineBuffer(
          fn_2496(arg_2665, 0),
          fn_2496(arg_2665, 1),
          fn_2496(arg_2665, 2),
          fn_2496(arg_2665, 3),
          fn_2496(arg_2665, 4),
          v_2666 !== 0 ? fn_221(v_2493, v_2666) : v_2494.currentColor
        );
      }));
    let fn_2509 = (arg_2667) => {
      let v_2668 = fn_2496(arg_2667, 5),
        v_2669 = v_2668 !== 0 ? fn_221(v_2493, v_2668) : v_2494.currentColor;
      arg_2667.r[0] = v_2494.drawRectBuffer(
        fn_2496(arg_2667, 0),
        fn_2496(arg_2667, 1),
        fn_2496(arg_2667, 2),
        fn_2496(arg_2667, 3),
        fn_2496(arg_2667, 4),
        v_2669
      );
    };
    (arg_2492.api("vm_graphic_rect", fn_2509), arg_2492.api("vm_graphic_rect_ex", fn_2509));
    let fn_2510 = (arg_2670) => (arg_2671) => {
      let v_2672 = fn_2496(arg_2671, 1),
        v_2673 = Math.min(Math.max(fn_2496(arg_2671, 2), 0), 4096);
      if (v_2672 === 0 || v_2673 < 3 || !v_2493.isMapped(v_2672, v_2673 * 4)) {
        arg_2671.r[0] = -1;
        return;
      }
      let list_2674 = [],
        list_2675 = [];
      for (let num_2676 = 0; num_2676 < v_2673; num_2676++)
        (list_2674.push((v_2493.read16(v_2672 + num_2676 * 4) << 16) >> 16),
          list_2675.push((v_2493.read16(v_2672 + num_2676 * 4 + 2) << 16) >> 16));
      arg_2671.r[0] = arg_2670
        ? v_2494.fillPolygonOnSurface(
            fn_2496(arg_2671, 0),
            list_2674,
            list_2675,
            v_2494.currentColor
          )
        : v_2494.strokePolygonOnSurface(
            fn_2496(arg_2671, 0),
            list_2674,
            list_2675,
            v_2494.currentColor
          );
    };
    (arg_2492.api("vm_graphic_fill_polygon", fn_2510(!0)),
      arg_2492.api("vm_graphic_polygon", fn_2510(!1)),
      arg_2492.api("vm_graphic_set_pixel", (arg_2677) => {
        arg_2677.r[0] = v_2494.setPixelOnSurface(
          fn_2496(arg_2677, 0),
          fn_2496(arg_2677, 1),
          fn_2496(arg_2677, 2),
          fn_221(v_2493, fn_2496(arg_2677, 3))
        );
      }),
      arg_2492.api("vm_graphic_set_pixel_ex", (arg_2678) => {
        let v_2679 = fn_2496(arg_2678, 3);
        arg_2678.r[0] = v_2494.setPixelOnSurface(
          fn_2496(arg_2678, 0),
          fn_2496(arg_2678, 1),
          fn_2496(arg_2678, 2),
          v_2679 !== 0 ? fn_221(v_2493, v_2679) : v_2494.currentColor
        );
      }),
      arg_2492.api("vm_graphic_get_pixel", (arg_2680) => {
        arg_2680.r[0] = v_2494.getPixelFromSurface(
          fn_2496(arg_2680, 0),
          fn_2496(arg_2680, 1),
          fn_2496(arg_2680, 2)
        );
      }),
      arg_2492.api("vm_graphic_lock", (arg_2681) => {
        arg_2681.r[0] = v_2494.screenBufferAddress();
      }),
      arg_2492.api("vm_graphic_unlock", (arg_2682) => {
        arg_2682.r[0] = 0;
      }),
      arg_2492.api("vm_graphic_getcolor", (arg_2683) => {
        arg_2683.r[0] = v_2494.currentColor;
      }),
      arg_2492.api("vm_graphic_clear_layer_bg", (arg_2684) => {
        arg_2684.r[0] = v_2494.clearLayerBg(fn_2496(arg_2684, 0));
      }),
      arg_2492.api("vm_graphic_is_r2l_state", (arg_2685) => {
        arg_2685.r[0] = 0;
      }),
      arg_2492.api("vm_graphic_get_frame_number", (arg_2686) => {
        arg_2686.r[0] = v_2494.flushCount;
      }),
      arg_2492.api("vm_graphic_get_string_baseline", (arg_2687) => {
        arg_2687.r[0] = Math.max(1, ((v_2494.characterHeight() * 4) / 5) | 0);
      }),
      arg_2492.api("vm_font_set_font_style", (arg_2688) => {
        arg_2688.r[0] = 0;
      }),
      arg_2492.api("vm_graphic_set_font", (arg_2689) => {
        arg_2689.r[0] = v_2494.setFont(fn_2496(arg_2689, 0));
      }),
      arg_2492.api("vm_font_set_font_size", (arg_2690) => {
        arg_2690.r[0] = v_2494.setFontSize(fn_2496(arg_2690, 0));
      }),
      arg_2492.api("vm_graphic_get_character_width", (arg_2691) => {
        arg_2691.r[0] = v_2494.characterWidth(fn_2496(arg_2691, 0));
      }),
      arg_2492.api("vm_graphic_get_character_height", (arg_2692) => {
        arg_2692.r[0] = v_2494.characterHeight();
      }),
      arg_2492.api("vm_graphic_get_character_height_ex", (arg_2693) => {
        arg_2693.r[0] = v_2494.characterHeight();
      }),
      arg_2492.api("vm_graphic_get_highest_char_height_of_all_language", (arg_2694) => {
        arg_2694.r[0] = v_2494.highestCharHeight();
      }),
      arg_2492.api("vm_graphic_get_char_baseline_alllang", (arg_2695) => {
        arg_2695.r[0] = v_2494.charBaseline(fn_2496(arg_2695, 0));
      }),
      arg_2492.api("vm_graphic_get_character_info", (arg_2696) => {
        let v_2697 = fn_2496(arg_2696, 1);
        if (v_2697 === 0 || !v_2493.isMapped(v_2697, 20)) {
          arg_2696.r[0] = -1;
          return;
        }
        let v_2698 = v_2494.characterInfo();
        (v_2493.write32(v_2697 + 0, v_2698.dwidth, !0),
          v_2493.write32(v_2697 + 4, v_2698.width, !0),
          v_2493.write32(v_2697 + 8, v_2698.height, !0),
          v_2493.write32(v_2697 + 12, v_2698.ascent, !0),
          v_2493.write32(v_2697 + 16, v_2698.descent, !0),
          (arg_2696.r[0] = 0));
      }),
      arg_2492.api("vm_graphic_get_font_height", (arg_2699) => {
        arg_2699.r[0] = v_2494.characterHeight();
      }),
      arg_2492.api("vm_graphic_measure_character", (arg_2700) => {
        let v_2701 = fn_2496(arg_2700, 0),
          v_2702 = fn_2496(arg_2700, 1),
          v_2703 = fn_2496(arg_2700, 2),
          v_2704 = v_2494.characterWidth(v_2701);
        (v_2702 !== 0 && v_2493.isMapped(v_2702, 2) && v_2493.write16(v_2702, v_2704),
          v_2703 !== 0 &&
            v_2493.isMapped(v_2703, 2) &&
            v_2493.write16(v_2703, v_2494.characterHeight()),
          (arg_2700.r[0] = v_2704));
      }),
      arg_2492.api("vm_graphic_get_string_width", (arg_2705) => {
        arg_2705.r[0] = v_2494.stringWidth(fn_219(arg_2492.readUcs2Compat(fn_2496(arg_2705, 0))));
      }),
      arg_2492.api("vm_graphic_get_text_width", (arg_2706) => {
        arg_2706.r[0] = v_2494.stringWidth(fn_219(arg_2492.readUcs2Compat(fn_2496(arg_2706, 0))));
      }),
      arg_2492.api("vm_graphic_get_string_height", (arg_2707) => {
        arg_2707.r[0] = v_2494.stringHeight(fn_219(arg_2492.readUcs2Compat(fn_2496(arg_2707, 0))));
      }),
      arg_2492.api("vm_graphic_textout", (arg_2708) => {
        let v_2709 = fn_2496(arg_2708, 0),
          v_2710 = fn_2496(arg_2708, 1),
          v_2711 = fn_2496(arg_2708, 2),
          v_2712 = fn_2496(arg_2708, 4),
          v_2713 = fn_221(v_2493, fn_2496(arg_2708, 5)),
          v_2714 = fn_220(arg_2492.readUcs2Compat(fn_2496(arg_2708, 3)), v_2712, v_2494);
        arg_2708.r[0] = v_2494.drawTextBuffer(
          v_2709,
          v_2710,
          v_2711,
          v_2714.value,
          v_2714.maxWidth,
          v_2713
        );
      }),
      arg_2492.api("vm_graphic_textout_to_layer", (arg_2715) => {
        let v_2716 = fn_2496(arg_2715, 0),
          v_2717 = fn_2496(arg_2715, 1),
          v_2718 = fn_2496(arg_2715, 2),
          v_2719 = fn_2496(arg_2715, 4),
          v_2720 = fn_220(arg_2492.readUcs2Compat(fn_2496(arg_2715, 3)), v_2719, v_2494);
        arg_2715.r[0] = v_2494.drawTextLayer(v_2716, v_2717, v_2718, v_2720.value, v_2720.maxWidth);
      }),
      arg_2492.api("vm_graphic_drawtext", (arg_2721) => {
        let v_2722 = fn_2496(arg_2721, 0),
          v_2723 = fn_2496(arg_2721, 1),
          v_2724 = fn_2496(arg_2721, 2),
          v_2725 = fn_2496(arg_2721, 3),
          v_2726 = fn_2496(arg_2721, 4),
          v_2727 = fn_219(
            arg_2492.readUcs2Compat(v_2724, v_2725 >= 1 && v_2725 <= 256 ? v_2725 : 256)
          ),
          v_2728 =
            v_2726 >= 0 && v_2726 <= 65535
              ? v_2726 & 65535
              : fn_89((v_2726 >>> 16) & 255, (v_2726 >>> 8) & 255, v_2726 & 255);
        arg_2721.r[0] = v_2494.drawTextOnTarget(v_2722, v_2723, v_2727, v_2728);
      }),
      arg_2492.api("vm_malloc", (arg_2729) => {
        arg_2729.r[0] = arg_2492.malloc(fn_2496(arg_2729, 0));
      }),
      arg_2492.api("vm_calloc", (arg_2730) => {
        arg_2730.r[0] = arg_2492.heap.calloc(fn_2496(arg_2730, 0));
      }),
      arg_2492.api("vm_realloc", (arg_2731) => {
        arg_2731.r[0] = arg_2492.heap.realloc(fn_2496(arg_2731, 0), fn_2496(arg_2731, 1));
      }),
      arg_2492.api("vm_free", (arg_2732) => {
        (arg_2492.heap.free(fn_2496(arg_2732, 0)), (arg_2732.r[0] = 0));
      }));
    let num_2511 = 28,
      num_2512 = 0;
    (arg_2492.api("vm_get_malloc_stat", (arg_2733) => {
      if (num_2512 === 0 && ((num_2512 = arg_2492.heap.calloc(num_2511)), num_2512 === 0)) {
        arg_2733.r[0] = 0;
        return;
      }
      let v_2734 = arg_2492.heap,
        v_2735 = v_2734.stats();
      (v_2493.write32(num_2512 + 0, v_2734.allocationCalls, !0),
        v_2493.write32(num_2512 + 4, v_2734.freeCalls, !0),
        v_2493.write32(num_2512 + 8, v_2735.allocatedBytes, !0),
        v_2493.write32(num_2512 + 12, v_2734.peakAllocatedBytes, !0),
        v_2493.write32(num_2512 + 16, v_2734.failedAllocations, !0),
        v_2493.write32(num_2512 + 20, v_2734.lastFailedRequest, !0),
        v_2493.write32(num_2512 + 24, v_2735.freeBytes, !0),
        (arg_2733.r[0] = num_2512));
    }),
      arg_2492.api("vm_global_get_max_alloc_size", (arg_2736) => {
        arg_2736.r[0] = Math.min(arg_2492.heap.largestFreeBlock(), 2147483647);
      }),
      arg_2492.api("vm_get_mre_total_mem_size", (arg_2737) => {
        arg_2737.r[0] = Math.min(arg_2492.heap.capacity, 2147483647);
      }));
    let num_2513 = 65536,
      v_2514 = 8 * 1024 * 1024,
      fn_2515 = (arg_2738) => arg_2738 !== 0 && v_2493.isMapped(arg_2738, 24);
    arg_2492.api("vm_create_dyn_array", (arg_2739) => {
      let v_2740 = fn_2496(arg_2739, 0) | 0,
        v_2741 = fn_2496(arg_2739, 1) | 0,
        v_2742 = fn_2496(arg_2739, 2) | 0,
        v_2743 = Math.max(v_2740, 1);
      if (v_2742 <= 0 || v_2742 > num_2513 || v_2743 > v_2514 / v_2742) {
        arg_2739.r[0] = 0;
        return;
      }
      let v_2744 = arg_2492.heap.calloc(v_2743 * v_2742),
        v_2745 = arg_2492.heap.calloc(24);
      if (v_2744 === 0 || v_2745 === 0) {
        (arg_2492.heap.free(v_2744), arg_2492.heap.free(v_2745), (arg_2739.r[0] = 0));
        return;
      }
      (v_2493.write32(v_2745 + 0, v_2742),
        v_2493.write32(v_2745 + 4, v_2740),
        v_2493.write32(v_2745 + 8, Math.max(v_2741, 1)),
        v_2493.write32(v_2745 + 12, 0),
        v_2493.write32(v_2745 + 16, v_2743),
        v_2493.write32(v_2745 + 20, v_2744),
        (arg_2739.r[0] = v_2745));
    });
    let fn_2516 = (arg_2746) => {
      let v_2747 = v_2493.read32(arg_2746) | 0,
        v_2748 = v_2493.read32(arg_2746 + 16) | 0,
        v_2749 = v_2493.read32(arg_2746 + 20) | 0;
      if ((v_2493.read32(arg_2746 + 12) | 0) < v_2748) return v_2749;
      let v_2750 = v_2748 + Math.max(v_2493.read32(arg_2746 + 8) | 0, 1);
      if (v_2750 * v_2747 > v_2514) return 0;
      let v_2751 = arg_2492.heap.realloc(v_2749, v_2750 * v_2747);
      return v_2751 === 0
        ? 0
        : (v_2493.fillBytes(v_2751 + v_2748 * v_2747, 0, (v_2750 - v_2748) * v_2747),
          (v_2748 = v_2750),
          (v_2749 = v_2751),
          v_2493.write32(arg_2746 + 16, v_2748),
          v_2493.write32(arg_2746 + 20, v_2749),
          v_2749);
    };
    (arg_2492.api("vm_dyn_array_add", (arg_2752) => {
      let v_2753 = fn_2496(arg_2752, 0),
        v_2754 = fn_2496(arg_2752, 1);
      if (!fn_2515(v_2753) || v_2754 === 0) {
        arg_2752.r[0] = -1;
        return;
      }
      let v_2755 = v_2493.read32(v_2753) | 0;
      if (!v_2493.isMapped(v_2754, v_2755)) {
        arg_2752.r[0] = -1;
        return;
      }
      let v_2756 = fn_2516(v_2753);
      if (v_2756 === 0) {
        arg_2752.r[0] = -1;
        return;
      }
      let v_2757 = v_2493.read32(v_2753 + 12) | 0;
      (v_2493.copyBytes(v_2754, v_2756 + v_2757 * v_2755, v_2755),
        v_2493.write32(v_2753 + 12, v_2757 + 1),
        (arg_2752.r[0] = 0));
    }),
      arg_2492.api("vm_dyn_array_del", (arg_2758) => {
        let v_2759 = fn_2496(arg_2758, 0),
          v_2760 = fn_2496(arg_2758, 1) | 0;
        if (!fn_2515(v_2759)) {
          arg_2758.r[0] = -1;
          return;
        }
        let v_2761 = v_2493.read32(v_2759) | 0,
          v_2762 = v_2493.read32(v_2759 + 12) | 0,
          v_2763 = v_2493.read32(v_2759 + 20) | 0;
        if (v_2760 < 0 || v_2760 >= v_2762) {
          arg_2758.r[0] = -1;
          return;
        }
        (v_2760 + 1 < v_2762 &&
          v_2493.copyBytes(
            v_2763 + (v_2760 + 1) * v_2761,
            v_2763 + v_2760 * v_2761,
            (v_2762 - v_2760 - 1) * v_2761
          ),
          v_2493.write32(v_2759 + 12, v_2762 - 1),
          (arg_2758.r[0] = 0));
      }),
      arg_2492.api("vm_dyn_array_del_all", (arg_2764) => {
        let v_2765 = fn_2496(arg_2764, 0);
        if (!fn_2515(v_2765)) {
          arg_2764.r[0] = -1;
          return;
        }
        (v_2493.write32(v_2765 + 12, 0), (arg_2764.r[0] = 0));
      }),
      arg_2492.api("vm_free_dyn_array", (arg_2766) => {
        let v_2767 = fn_2496(arg_2766, 0);
        (fn_2515(v_2767) && arg_2492.heap.free(v_2493.read32(v_2767 + 20) | 0),
          arg_2492.heap.free(v_2767),
          (arg_2766.r[0] = 0));
      }));
    let num_2517 = 1,
      num_2518 = 15,
      num_2519 = 1;
    (arg_2492.api("vm_pmng_get_current_handle", (arg_2768) => {
      arg_2768.r[0] = num_2517;
    }),
      arg_2492.api("vm_pmng_get_app_handle", (arg_2769) => {
        arg_2769.r[0] = num_2517;
      }),
      arg_2492.api("vm_pmng_state", (arg_2770) => {
        let v_2771 = fn_2496(arg_2770, 0) | 0;
        arg_2770.r[0] = v_2771 === num_2517 || v_2771 === num_2518 ? num_2519 : 0;
      }),
      arg_2492.api("vm_pmng_set_bg", (arg_2772) => {
        arg_2772.r[0] = 0;
      }),
      arg_2492.api("vm_pmng_get_handle", (arg_2773) => {
        var v_2774;
        let v_2775 = arg_2492.readUcs2Compat(fn_2496(arg_2773, 0), 260).toLowerCase(),
          v_2776 = arg_2492.rawExecutableName.toLowerCase(),
          v_2777 = (v_2774 = v_2775.split(/[\\/]/).pop()) != null ? v_2774 : v_2775;
        arg_2773.r[0] = v_2777.length > 0 && v_2776.endsWith(v_2777) ? num_2517 : 0;
      }));
    let fn_2520 = (arg_2778) => (arg_2779) => {
      ((arg_2492[arg_2778] = fn_2496(arg_2779, 0)), (arg_2779.r[0] = 0));
    };
    (arg_2492.api("vm_reg_sysevt_callback", fn_2520("systemCallback")),
      arg_2492.api("vm_reg_system_event_callback", fn_2520("systemCallback")),
      arg_2492.api("vm_reg_sm_callback", fn_2520("smCallback")),
      arg_2492.api("vm_reg_keyboard_callback", (arg_2780) => {
        ((arg_2492.keyboardCallback = fn_2496(arg_2780, 0)), (arg_2780.r[0] = 0));
      }),
      arg_2492.api("vm_reg_key_callback", (arg_2781) => {
        ((arg_2492.keyboardCallback = fn_2496(arg_2781, 0)), (arg_2781.r[0] = 0));
      }),
      arg_2492.api("vm_reg_pen_callback", (arg_2782) => {
        ((arg_2492.penCallback = fn_2496(arg_2782, 0)), (arg_2782.r[0] = 0));
      }),
      arg_2492.api("vm_reg_touch_callback", (arg_2783) => {
        ((arg_2492.penCallback = fn_2496(arg_2783, 0)), (arg_2783.r[0] = 0));
      }),
      arg_2492.api("vm_exit_app", (arg_2784) => {
        (arg_2492.requestExit(fn_2496(arg_2784, 0)), (arg_2784.r[0] = 0));
      }));
    let fn_2521 = (arg_2785) => {
      let v_2786 = fn_2496(arg_2785, 0),
        v_2787 = fn_2496(arg_2785, 1);
      if (v_2787 === 0 || arg_2492.timers.size >= num_214) {
        arg_2785.r[0] = -1;
        return;
      }
      arg_2785.r[0] = arg_2492.registerTimer(v_2786, v_2787);
    };
    (arg_2492.api("vm_create_timer", fn_2521), arg_2492.api("vm_create_timer_ex", fn_2521));
    let fn_2522 = (arg_2788) => {
      arg_2788.r[0] = arg_2492.deleteTimer(fn_2496(arg_2788, 0)) ? 0 : -1;
    };
    (arg_2492.api("vm_delete_timer", fn_2522),
      arg_2492.api("vm_delete_timer_ex", fn_2522),
      arg_2492.api("vm_get_tick_count", (arg_2789) => {
        arg_2789.r[0] = (Date.now() & 2147483647) | 0;
      }),
      arg_2492.api("vm_get_tick", (arg_2790) => {
        arg_2790.r[0] = (Date.now() & 2147483647) | 0;
      }),
      arg_2492.api("vm_get_time", (arg_2791) => {
        let date_2792 = new Date(),
          v_2793 = fn_2496(arg_2791, 0);
        if (v_2793 !== 0 && v_2493.isMapped(v_2793, 28))
          try {
            (v_2493.write32(v_2793, date_2792.getFullYear() - 1900),
              v_2493.write32(v_2793 + 4, date_2792.getMonth()),
              v_2493.write32(v_2793 + 8, date_2792.getDate()),
              v_2493.write32(v_2793 + 12, date_2792.getHours()),
              v_2493.write32(v_2793 + 16, date_2792.getMinutes()),
              v_2493.write32(v_2793 + 20, date_2792.getSeconds()),
              (arg_2791.r[0] = 0));
            return;
          } catch (v_2794) {}
        arg_2791.r[0] = -1;
      }),
      arg_2492.api("vm_resource_get_data", (arg_2795) => {
        arg_2795.r[0] = arg_2492.resourceGetData(arg_2795);
      }),
      arg_2492.api("vm_resource_get_data_from_file", (arg_2796) => {
        arg_2796.r[0] = arg_2492.resourceGetData(arg_2796);
      }),
      arg_2492.api("vm_resource_init", (arg_2797) => {
        arg_2797.r[0] = arg_2492.resourceBlobSize > 0 ? 0 : -1;
      }),
      arg_2492.api("vm_res_init", (arg_2798) => {
        arg_2798.r[0] = arg_2492.resourceBlobSize > 0 ? 0 : -1;
      }),
      arg_2492.api("vm_load_resource", (arg_2799) => {
        arg_2799.r[0] = arg_2492.loadNamedResource(fn_2496(arg_2799, 0), fn_2496(arg_2799, 1));
      }),
      arg_2492.api("vm_res_load", (arg_2800) => {
        arg_2800.r[0] = arg_2492.loadNamedResource(fn_2496(arg_2800, 0), fn_2496(arg_2800, 1));
      }),
      arg_2492.api("vm_res_delete", (arg_2801) => {
        arg_2801.r[0] = arg_2492.resourceDelete(fn_2496(arg_2801, 0));
      }),
      arg_2492.api("vm_res_deinit", (arg_2802) => {
        arg_2802.r[0] = 0;
      }),
      arg_2492.api("vm_get_resource_offset", (arg_2803) => {
        arg_2803.r[0] = arg_2492.resourceFind(
          arg_2492.readResourceNameCompat(fn_2496(arg_2803, 0))
        );
      }),
      arg_2492.api("vm_get_res_header", (arg_2804) => {
        arg_2804.r[0] = 0;
      }));
    let fn_2523 = (arg_2805) => {
      if (arg_2805 === 0 || !v_2493.isMapped(arg_2805, 6)) return !1;
      let v_2806 = arg_2492.readUcs2Compat(arg_2805, 260);
      return (
        v_2806.length >= 2 &&
        v_2806[1] === ":" &&
        (v_2806[0] === "C" || v_2806[0] === "E" || v_2806[0] === "c" || v_2806[0] === "e")
      );
    };
    (arg_2492.api("vm_get_resource_offset_from_file", (arg_2807) => {
      let v_2808 = fn_2496(arg_2807, 0),
        v_2809 = fn_2496(arg_2807, 1),
        v_2810 = fn_2523(v_2808) ? v_2808 : fn_2523(v_2809) ? v_2809 : 0;
      if (v_2810 === 0) {
        arg_2807.r[0] = -1;
        return;
      }
      let v_2811 = v_2810 === v_2808 ? v_2809 : v_2808,
        v_2812 = v_2495.readAll(arg_2492.readUcs2Compat(v_2810, 512));
      if (v_2812 === null) {
        arg_2807.r[0] = -1;
        return;
      }
      let v_2813 = arg_2492.readResourceNameCompat(v_2811),
        v_2814 = fn_156(v_2812).find((arg_2815) => arg_2815.name === v_2813);
      arg_2807.r[0] = v_2814 ? v_2814.offset : -1;
    }),
      arg_2492.api("vm_is_support_wifi", (arg_2816) => {
        arg_2816.r[0] = 0;
      }),
      arg_2492.api("vm_wifi_is_connected", (arg_2817) => {
        arg_2817.r[0] = 0;
      }),
      arg_2492.api("vm_has_sim_card", (arg_2818) => {
        arg_2818.r[0] = 1;
      }),
      arg_2492.api("vm_get_sim_card_status", (arg_2819) => {
        arg_2819.r[0] = 1;
      }),
      arg_2492.api("vm_get_language", (arg_2820) => {
        arg_2820.r[0] = 0;
      }),
      arg_2492.api("vm_get_language_ssc", (arg_2821) => {
        arg_2821.r[0] = 0;
      }),
      arg_2492.api("vm_send_sms", (arg_2822) => {
        arg_2822.r[0] = -1;
      }),
      arg_2492.api("vm_vibrator_once", (arg_2823) => {
        arg_2823.r[0] = 0;
      }),
      arg_2492.api("vm_switch_power_saving_mode", (arg_2824) => {
        arg_2824.r[0] = 0;
      }),
      arg_2492.api("vm_get_exec_filename", (arg_2825) => {
        let v_2826 = fn_2496(arg_2825, 0),
          v_2827 = arg_2492.rawExecutableName;
        if (v_2826 === 0 || !v_2493.isMapped(v_2826, v_2827.length + 1)) {
          arg_2825.r[0] = -1;
          return;
        }
        try {
          for (let num_2828 = 0; num_2828 < v_2827.length; num_2828++)
            v_2493.write8(v_2826 + num_2828, v_2827.charCodeAt(num_2828) & 127);
          (v_2493.write8(v_2826 + v_2827.length, 0), (arg_2825.r[0] = 0));
        } catch (v_2829) {
          arg_2825.r[0] = -1;
        }
      }),
      arg_2492.api("vm_get_disk_free_space", (arg_2830) => {
        let v_2831 = fn_2496(arg_2830, 0),
          v_2832 =
            v_2831 !== 0 && v_2493.isMapped(v_2831, 2)
              ? arg_2492.readUcs2Compat(v_2831, 260)
              : "C:\\";
        arg_2830.r[0] = Math.min(v_2495.freeSpace(v_2832), 2147483647) | 0;
      }),
      arg_2492.api("vm_get_vm_tag", (arg_2833) => {
        arg_2833.r[0] = 0;
      }),
      arg_2492.api("vm_log_info", (arg_2834) => {
        arg_2834.r[0] = 0;
      }),
      arg_2492.api("vm_log_error", (arg_2835) => {
        arg_2835.r[0] = 0;
      }),
      arg_2492.api("_vm_log_info", (arg_2836) => {
        arg_2836.r[0] = 0;
      }),
      arg_2492.api("_vm_log_error", (arg_2837) => {
        arg_2837.r[0] = 0;
      }),
      arg_2492.api("vm_app_log", (arg_2838) => {
        arg_2838.r[0] = 0;
      }),
      arg_2492.api("vm_get_sys_scene", (arg_2839) => {
        arg_2839.r[0] = 0;
      }),
      arg_2492.api("vm_get_system_driver", (arg_2840) => {
        arg_2840.r[0] = 67;
      }),
      arg_2492.api("vm_get_removeable_driver", (arg_2841) => {
        arg_2841.r[0] = 69;
      }),
      arg_2492.api("vm_get_removable_driver", (arg_2842) => {
        arg_2842.r[0] = 69;
      }),
      arg_2492.api("vm_get_imei", (arg_2843) => {
        arg_2843.r[0] = arg_2492.systemAscii("imei", "000000000000000");
      }),
      arg_2492.api("vm_get_imsi", (arg_2844) => {
        arg_2844.r[0] = arg_2492.systemAscii("imsi", "001010000000000");
      }),
      arg_2492.api("vm_query_operator_code", (arg_2845) => {
        let v_2846 = fn_2496(arg_2845, 0),
          str_2847 = "00101";
        if (v_2846 !== 0 && v_2493.isMapped(v_2846, str_2847.length + 1)) {
          for (let num_2848 = 0; num_2848 < str_2847.length; num_2848++)
            v_2493.write8(v_2846 + num_2848, str_2847.charCodeAt(num_2848));
          (v_2493.write8(v_2846 + str_2847.length, 0), (arg_2845.r[0] = 0));
        } else arg_2845.r[0] = -1;
      }),
      arg_2492.api("vm_sim_get_active_sim_card", (arg_2849) => {
        arg_2849.r[0] = 0;
      }),
      arg_2492.api("vm_set_active_sim_card", (arg_2850) => {
        arg_2850.r[0] = 0;
      }),
      arg_2492.api("vm_is_support_pen_touch", (arg_2851) => {
        arg_2851.r[0] = 1;
      }),
      arg_2492.api("vm_is_finger_touch_version", (arg_2852) => {
        arg_2852.r[0] = 1;
      }),
      arg_2492.api("vm_is_figner_touch_version", (arg_2853) => {
        arg_2853.r[0] = 1;
      }),
      arg_2492.api("vm_is_support_keyborad", (arg_2854) => {
        arg_2854.r[0] = 1;
      }),
      arg_2492.api("vm_get_key_tone_state", (arg_2855) => {
        arg_2855.r[0] = 0;
      }),
      arg_2492.api("vm_appmgr_get_installed_list", (arg_2856) => {
        let v_2857 = fn_2496(arg_2856, 2);
        (v_2857 !== 0 && v_2493.isMapped(v_2857, 4) && v_2493.write32(v_2857, 0),
          (arg_2856.r[0] = 0));
      }),
      arg_2492.api("vm_appmgr_get_install_info", (arg_2858) => {
        let v_2859 = fn_2496(arg_2858, 1);
        if (v_2859 !== 0 && v_2493.isMapped(v_2859, 64))
          for (let num_2860 = 0; num_2860 < 64; num_2860++) v_2493.write8(v_2859 + num_2860, 0);
        arg_2858.r[0] = -1;
      }),
      arg_2492.api("vm_wstrcpy", (arg_2861) => {
        let v_2862 = fn_2496(arg_2861, 0),
          v_2863 = fn_2496(arg_2861, 1);
        if (v_2862 !== 0 && v_2863 !== 0) {
          let v_2864 = v_2863,
            v_2865 = v_2862;
          for (; v_2493.isMapped(v_2864, 2) && v_2493.isMapped(v_2865, 2); ) {
            let v_2866 = v_2493.read16(v_2864);
            if ((v_2493.write16(v_2865, v_2866), (v_2864 += 2), (v_2865 += 2), v_2866 === 0)) break;
          }
        }
        arg_2861.r[0] = v_2862;
      }),
      arg_2492.api("vm_wstrncpy", (arg_2867) => {
        let v_2868 = fn_2496(arg_2867, 0),
          v_2869 = fn_2496(arg_2867, 1),
          v_2870 = Math.min(Math.max(fn_2496(arg_2867, 2), 0), 4096);
        if (v_2868 !== 0 && v_2869 !== 0) {
          let num_2871 = 0;
          for (
            ;
            num_2871 < v_2870 &&
            v_2493.isMapped(v_2869 + num_2871 * 2, 2) &&
            v_2493.isMapped(v_2868 + num_2871 * 2, 2);
          ) {
            let v_2872 = v_2493.read16(v_2869 + num_2871 * 2);
            if ((v_2493.write16(v_2868 + num_2871 * 2, v_2872), v_2872 === 0)) break;
            num_2871++;
          }
          for (; num_2871 < v_2870 && v_2493.isMapped(v_2868 + num_2871 * 2, 2); )
            (v_2493.write16(v_2868 + num_2871 * 2, 0), num_2871++);
        }
        arg_2867.r[0] = v_2868;
      }),
      arg_2492.api("vm_wstrcat", (arg_2873) => {
        let v_2874 = fn_2496(arg_2873, 0),
          v_2875 = fn_2496(arg_2873, 1),
          v_2876 = fn_2496(arg_2873, 2),
          v_2877 = v_2875 >= 4096 && v_2493.isMapped(v_2875, 2),
          v_2878 = v_2877 ? v_2875 : v_2876,
          v_2879 = v_2877 ? 0 : v_2875;
        if (v_2874 === 0 || v_2878 === 0) {
          arg_2873.r[0] = v_2874;
          return;
        }
        let v_2880 = v_2874,
          num_2881 = 0;
        for (; num_2881 < 4096 && v_2493.isMapped(v_2880, 2) && v_2493.read16(v_2880) !== 0; )
          ((v_2880 += 2), num_2881++);
        let v_2882 = v_2879 > 0 ? v_2874 + v_2879 : Number.MAX_SAFE_INTEGER,
          v_2883 = v_2878,
          v_2884 = v_2880;
        for (; v_2884 + 2 <= v_2882 && v_2493.isMapped(v_2883, 2) && v_2493.isMapped(v_2884, 2); ) {
          let v_2885 = v_2493.read16(v_2883);
          if ((v_2493.write16(v_2884, v_2885), (v_2883 += 2), (v_2884 += 2), v_2885 === 0)) break;
        }
        arg_2873.r[0] = v_2874;
      }),
      arg_2492.api("vm_wstrcmp", (arg_2886) => {
        let v_2887 = fn_2496(arg_2886, 0),
          v_2888 = fn_2496(arg_2886, 1),
          num_2889 = 0;
        if (v_2887 !== 0 && v_2888 !== 0) {
          let num_2890 = 0;
          for (
            ;
            num_2890 < 8192 &&
            v_2493.isMapped(v_2887 + num_2890, 2) &&
            v_2493.isMapped(v_2888 + num_2890, 2);
          ) {
            let v_2891 = v_2493.read16(v_2887 + num_2890),
              v_2892 = v_2493.read16(v_2888 + num_2890);
            if (v_2891 !== v_2892) {
              num_2889 = v_2891 - v_2892;
              break;
            }
            if (v_2891 === 0) break;
            num_2890 += 2;
          }
        }
        arg_2886.r[0] = num_2889;
      }));
    let num_2524 = 4096,
      num_2525 = 65536,
      float64Array_2526 = new Float64Array(1),
      uint32Array_2527 = new Uint32Array(float64Array_2526.buffer),
      fn_2528 = (arg_2893) => arg_2893.replace(/e([+-])(\d)$/, "e$10$2"),
      fn_2529 = (arg_2894) => {
        let v_2895 = arg_2894.indexOf("e");
        if (v_2895 < 0) return arg_2894;
        let v_2896 = arg_2894.slice(0, v_2895),
          v_2897 = arg_2894.slice(v_2895);
        return (
          v_2896.includes(".") && (v_2896 = v_2896.replace(/0+$/, "").replace(/\.$/, "")),
          v_2896 + v_2897
        );
      },
      fn_2530 = (arg_2898) =>
        arg_2898.includes(".") ? arg_2898.replace(/0+$/, "").replace(/\.$/, "") : arg_2898,
      fn_2531 = (arg_2899, arg_2900) => {
        if (!Number.isFinite(arg_2899))
          return Number.isNaN(arg_2899) ? "NaN" : arg_2899 > 0 ? "Infinity" : "-Infinity";
        if (arg_2899 === 0) return fn_2530(arg_2899.toPrecision(arg_2900));
        let v_2901 = Math.floor(Math.log10(Math.abs(arg_2899)));
        if (v_2901 < -4 || v_2901 >= arg_2900)
          return fn_2529(fn_2528(arg_2899.toExponential(arg_2900 - 1)));
        let v_2902 = arg_2899.toPrecision(arg_2900);
        return v_2902.includes("e") ? fn_2529(fn_2528(v_2902)) : fn_2530(v_2902);
      };
    (arg_2492.api("vm_vsprintf", (arg_2903) => {
      let v_2904 = fn_2496(arg_2903, 0),
        v_2905 = fn_2496(arg_2903, 1),
        v_2906 = fn_2496(arg_2903, 2);
      if (
        v_2904 === 0 ||
        v_2905 === 0 ||
        !v_2493.isMapped(v_2904, 1) ||
        !v_2493.isMapped(v_2905, 1)
      ) {
        arg_2903.r[0] = -1;
        return;
      }
      let fn_2907 = () => {
          try {
            return v_2493.read8(v_2905);
          } catch (v_2915) {
            return 0;
          }
        },
        fn_2908 = () => {
          let v_2916 = fn_2907();
          return ((v_2905 += 1), v_2916);
        },
        fn_2909 = () => {
          let num_2917 = 0;
          try {
            num_2917 = v_2493.read32(v_2906);
          } catch (v_2918) {
            num_2917 = 0;
          }
          return ((v_2906 += 4), num_2917);
        },
        fn_2910 = () => {
          (v_2906 & 7) !== 0 && (v_2906 += 4);
          let num_2919 = 0,
            num_2920 = 0;
          try {
            ((num_2919 = v_2493.read32(v_2906) >>> 0),
              (num_2920 = v_2493.read32(v_2906 + 4) >>> 0));
          } catch (v_2921) {
            ((num_2919 = 0), (num_2920 = 0));
          }
          return (
            (v_2906 += 8),
            (uint32Array_2527[0] = num_2919),
            (uint32Array_2527[1] = num_2920),
            float64Array_2526[0]
          );
        },
        fn_2911 = () => {
          let num_2922 = 0;
          for (; fn_2907() >= 48 && fn_2907() <= 57; )
            num_2922 < num_2524 ? (num_2922 = num_2922 * 10 + (fn_2908() - 48)) : fn_2908();
          return Math.min(num_2922, num_2524);
        },
        str_2912 = "",
        num_2913 = 0;
      for (; num_2913++ < num_2524 && str_2912.length < num_2525; ) {
        let v_2923 = fn_2908();
        if (v_2923 === 0) break;
        if (v_2923 !== 37) {
          str_2912 += String.fromCharCode(v_2923);
          continue;
        }
        let v_2924 = !1,
          v_2925 = !1,
          v_2926 = !1,
          v_2927 = !1,
          v_2928 = !1;
        for (;;) {
          let v_2938 = fn_2907();
          if (v_2938 === 45) v_2924 = !0;
          else if (v_2938 === 43) v_2925 = !0;
          else if (v_2938 === 32) v_2926 = !0;
          else if (v_2938 === 48) v_2927 = !0;
          else if (v_2938 === 35) v_2928 = !0;
          else break;
          v_2905 += 1;
        }
        let v_2929 = -1;
        fn_2907() === 42
          ? ((v_2905 += 1), (v_2929 = Math.min(Math.max(fn_2909(), 0), num_2524)))
          : fn_2907() >= 48 && fn_2907() <= 57 && (v_2929 = fn_2911());
        let v_2930 = -1;
        for (
          fn_2907() === 46 &&
          ((v_2905 += 1),
          fn_2907() === 42
            ? ((v_2905 += 1), (v_2930 = Math.min(Math.max(fn_2909(), 0), num_2524)))
            : fn_2907() >= 48 && fn_2907() <= 57
              ? (v_2930 = fn_2911())
              : (v_2930 = 0));
          "lLhqztj".includes(String.fromCharCode(fn_2907()));
        )
          v_2905 += 1;
        let v_2931 = fn_2908(),
          v_2932 = String.fromCharCode(v_2931),
          v_2933 = "diuoxX".includes(v_2932),
          v_2934 = "fFeEgG".includes(v_2932),
          v_2935;
        switch (v_2932) {
          case "d":
          case "i":
            v_2935 = String(fn_2909() | 0);
            break;
          case "u":
            v_2935 = String(fn_2909() >>> 0);
            break;
          case "x":
            v_2935 = (fn_2909() >>> 0).toString(16);
            break;
          case "X":
            v_2935 = (fn_2909() >>> 0).toString(16).toUpperCase();
            break;
          case "o":
            v_2935 = (fn_2909() >>> 0).toString(8);
            break;
          case "c":
            v_2935 = String.fromCharCode(fn_2909() & 255);
            break;
          case "s": {
            let v_2939 = fn_2909();
            v_2939 === 0
              ? (v_2935 = "(null)")
              : ((v_2935 = v_2493.readCString(v_2939, (v_2930 >= 0 ? v_2930 : num_2524) + 1)),
                v_2930 >= 0 && v_2935.length > v_2930 && (v_2935 = v_2935.slice(0, v_2930)));
            break;
          }
          case "p":
            v_2935 = "0x" + (fn_2909() >>> 0).toString(16);
            break;
          case "f":
          case "F": {
            let v_2940 = v_2930 >= 0 ? v_2930 : 6;
            ((v_2935 = fn_2910().toFixed(Math.min(v_2940, 100))),
              v_2932 === "F" && (v_2935 = v_2935.toUpperCase()));
            break;
          }
          case "e":
          case "E": {
            let v_2941 = v_2930 >= 0 ? v_2930 : 6;
            ((v_2935 = fn_2528(fn_2910().toExponential(Math.min(v_2941, 100)))),
              v_2932 === "E" && (v_2935 = v_2935.toUpperCase()));
            break;
          }
          case "g":
          case "G": {
            let v_2942 = v_2930 >= 0 ? (v_2930 === 0 ? 1 : v_2930) : 6;
            ((v_2935 = fn_2531(fn_2910(), v_2942)),
              v_2932 === "G" && (v_2935 = v_2935.toUpperCase()));
            break;
          }
          case "%":
            v_2935 = "%";
            break;
          default:
            v_2935 = "%" + v_2932;
            break;
        }
        !v_2933 && !v_2934 && (v_2927 = !1);
        let str_2936 = "";
        ((v_2932 === "d" || v_2932 === "i") &&
          (v_2935.startsWith("-")
            ? ((v_2935 = v_2935.slice(1)), (str_2936 = "-"))
            : v_2925
              ? (str_2936 = "+")
              : v_2926 && (str_2936 = " ")),
          v_2933 &&
            v_2930 >= 0 &&
            ((v_2935 = (function (arg_2943, arg_2944, arg_2945) {
              for (; arg_2943.length < arg_2944; ) arg_2943 = arg_2945 + arg_2943;
              return arg_2943;
            })(v_2935, v_2930, "0")),
            (v_2927 = !1)),
          v_2928 &&
            v_2935 !== "" &&
            v_2935 !== "0" &&
            (v_2935 = v_2931 === 111 ? "0" + v_2935 : "0" + v_2932 + v_2935));
        let v_2937 = str_2936 + v_2935;
        if (v_2929 > v_2937.length) {
          let v_2946 = v_2929 - v_2937.length;
          v_2924
            ? (v_2937 = v_2937 + " ".repeat(v_2946))
            : v_2927
              ? (v_2937 = str_2936 + "0".repeat(v_2946) + v_2935)
              : (v_2937 = " ".repeat(v_2946) + v_2937);
        }
        str_2912 += v_2937;
      }
      let num_2914 = 0;
      for (; num_2914 < str_2912.length && v_2493.isMapped(v_2904 + num_2914, 1); )
        (v_2493.write8(v_2904 + num_2914, str_2912.charCodeAt(num_2914) & 255), (num_2914 += 1));
      (v_2493.isMapped(v_2904 + num_2914, 1) && v_2493.write8(v_2904 + num_2914, 0),
        (arg_2903.r[0] = num_2914));
    }),
      arg_2492.api("vm_asyn_http_req", (arg_2947) => {
        arg_2947.r[0] = -1;
      }),
      arg_2492.api("vm_cancel_asyn_http_req", (arg_2948) => {
        arg_2948.r[0] = -1;
      }),
      arg_2492.api("vm_open_wap_url", (arg_2949) => {
        arg_2949.r[0] = -1;
      }),
      arg_2492.api("vm_get_filename", (arg_2950) => {
        let v_2951 = arg_2492.guestFilename(arg_2492.readUcs2Compat(fn_2496(arg_2950, 0), 512));
        arg_2950.r[0] =
          v_2951 !== null && arg_2492.writeUcs2(fn_2496(arg_2950, 1), v_2951) ? 0 : -1;
      }),
      arg_2492.api("vm_get_path", (arg_2952) => {
        let v_2953 = arg_2492.guestParentPath(arg_2492.readUcs2Compat(fn_2496(arg_2952, 0), 512));
        arg_2952.r[0] =
          v_2953 !== null && arg_2492.writeUcs2(fn_2496(arg_2952, 1), v_2953) ? 0 : -1;
      }),
      arg_2492.api("vm_get_default_folder_path", (arg_2954) => {
        let v_2955 = fn_2496(arg_2954, 0),
          v_2956 = fn_2496(arg_2954, 1),
          v_2957 =
            v_2955 !== 0 && v_2493.isMapped(v_2955, 2)
              ? v_2955
              : v_2956 !== 0 && v_2493.isMapped(v_2956, 2)
                ? v_2956
                : 0;
        if (v_2957 === 0) {
          arg_2954.r[0] = -1;
          return;
        }
        let v_2958 = (v_2957 === v_2955 ? v_2956 : v_2955) & 255;
        arg_2954.r[0] = arg_2492.writeUcs2(
          v_2957,
          arg_2492.guestDefaultFolderPath(v_2958 === 69 || v_2958 === 101 ? "E" : "C")
        )
          ? 0
          : -1;
      }));
    let fn_2532 = (arg_2959, arg_2960 = 512) => arg_2492.readUcs2Compat(arg_2959, arg_2960),
      fn_2533 = (arg_2961, arg_2962) => {
        if (arg_2961 === 0 || !v_2493.isMapped(arg_2961, 4)) return !1;
        try {
          return (v_2493.write32(arg_2961, arg_2962 | 0), !0);
        } catch (v_2963) {
          return !1;
        }
      },
      fn_2534 = (arg_2964, arg_2965) =>
        arg_2964 === null || arg_2964 > 4294967295 || !fn_2533(arg_2965, arg_2964) ? -1 : 0;
    (arg_2492.api("vm_file_open", (arg_2966) => {
      arg_2966.r[0] = v_2495.open(fn_2532(fn_2496(arg_2966, 0)), fn_2496(arg_2966, 1));
    }),
      arg_2492.api("vm_file_close", (arg_2967) => {
        arg_2967.r[0] = v_2495.close(fn_2496(arg_2967, 0));
      }),
      arg_2492.api("vm_file_commit", (arg_2968) => {
        arg_2968.r[0] = v_2495.commit(fn_2496(arg_2968, 0));
      }),
      arg_2492.api("vm_file_getfilesize", (arg_2969) => {
        arg_2969.r[0] = fn_2534(v_2495.size(fn_2496(arg_2969, 0)), fn_2496(arg_2969, 1));
      }),
      arg_2492.api("vm_file_get_file_size", (arg_2970) => {
        let v_2971 = fn_2496(arg_2970, 0),
          v_2972 = v_2495.size(v_2971);
        if (v_2972 === null) {
          let v_2973 = fn_2532(v_2971);
          v_2972 = v_2973.trim().length === 0 ? null : v_2495.sizeByPath(v_2973);
        }
        arg_2970.r[0] = fn_2534(v_2972, fn_2496(arg_2970, 1));
      }),
      arg_2492.api("vm_file_read", (arg_2974) => {
        let v_2975 = fn_2496(arg_2974, 0),
          v_2976 = fn_2496(arg_2974, 1),
          v_2977 = fn_2496(arg_2974, 2),
          v_2978 = fn_2496(arg_2974, 3),
          v_2979 =
            v_2977 >= 0 &&
            v_2977 <= 33554432 &&
            (v_2977 === 0 || (v_2976 !== 0 && v_2493.isMapped(v_2976, v_2977))) &&
            (v_2978 === 0 || v_2493.isMapped(v_2978, 4)),
          v_2980 = null;
        if (v_2979)
          try {
            v_2980 = v_2495.read(v_2975, v_2977);
          } catch (v_2981) {
            v_2980 = null;
          }
        if (v_2980 === null) {
          (fn_2533(v_2978, 0), (arg_2974.r[0] = -1));
          return;
        }
        try {
          (v_2980.length > 0 && v_2493.writeBytes(v_2976, v_2980),
            fn_2533(v_2978, v_2980.length),
            (arg_2974.r[0] = 0));
        } catch (v_2982) {
          (fn_2533(v_2978, 0), (arg_2974.r[0] = -1));
        }
      }),
      arg_2492.api("vm_file_write", (arg_2983) => {
        let v_2984 = fn_2496(arg_2983, 0),
          v_2985 = fn_2496(arg_2983, 1),
          v_2986 = fn_2496(arg_2983, 2),
          v_2987 = fn_2496(arg_2983, 3),
          v_2988 =
            v_2986 >= 0 &&
            v_2986 <= 33554432 &&
            (v_2986 === 0 || (v_2985 !== 0 && v_2493.isMapped(v_2985, v_2986))) &&
            (v_2987 === 0 || v_2493.isMapped(v_2987, 4)),
          v_2989 = -1;
        if (v_2988)
          try {
            v_2989 = v_2495.write(
              v_2984,
              v_2986 === 0 ? new Uint8Array(0) : v_2493.readBytes(v_2985, v_2986)
            );
          } catch (v_2990) {
            v_2989 = -1;
          }
        (fn_2533(v_2987, Math.max(0, v_2989)), (arg_2983.r[0] = v_2989 >= 0 ? 0 : -1));
      }),
      arg_2492.api("vm_file_seek", (arg_2991) => {
        arg_2991.r[0] =
          v_2495.seek(fn_2496(arg_2991, 0), fn_2496(arg_2991, 1), fn_2496(arg_2991, 2)) !== null
            ? 0
            : -1;
      }),
      arg_2492.api("vm_file_tell", (arg_2992) => {
        let v_2993 = v_2495.tell(fn_2496(arg_2992, 0));
        arg_2992.r[0] = v_2993 !== null && v_2993 <= 2147483647 ? v_2993 | 0 : -1;
      }),
      arg_2492.api("vm_file_is_eof", (arg_2994) => {
        let v_2995 = v_2495.isEof(fn_2496(arg_2994, 0));
        arg_2994.r[0] = v_2995 === null ? -1 : v_2995 ? 1 : 0;
      }),
      arg_2492.api("vm_file_get_attributes", (arg_2996) => {
        arg_2996.r[0] = v_2495.attributes(fn_2532(fn_2496(arg_2996, 0)));
      }),
      arg_2492.api("vm_file_set_attributes", (arg_2997) => {
        arg_2997.r[0] = v_2495.setAttributes(fn_2532(fn_2496(arg_2997, 0)), fn_2496(arg_2997, 1));
      }),
      arg_2492.api("vm_file_mkdir", (arg_2998) => {
        arg_2998.r[0] = v_2495.mkdir(fn_2532(fn_2496(arg_2998, 0)));
      }),
      arg_2492.api("vm_file_delete", (arg_2999) => {
        arg_2999.r[0] = v_2495.delete(fn_2532(fn_2496(arg_2999, 0)));
      }),
      arg_2492.api("vm_file_rmdir", (arg_3000) => {
        arg_3000.r[0] = v_2495.rmdir(fn_2532(fn_2496(arg_3000, 0)));
      }),
      arg_2492.api("vm_file_rename", (arg_3001) => {
        arg_3001.r[0] = v_2495.rename(fn_2532(fn_2496(arg_3001, 0)), fn_2532(fn_2496(arg_3001, 1)));
      }),
      arg_2492.api("vm_file_copy", (arg_3002) => {
        arg_3002.r[0] = v_2495.copy(fn_2532(fn_2496(arg_3002, 0)), fn_2532(fn_2496(arg_3002, 1)));
      }),
      arg_2492.api("vm_file_copy_abort", (arg_3003) => {
        arg_3003.r[0] = 0;
      }),
      arg_2492.api("vm_file_get_modify_time", (arg_3004) => {
        let v_3005 = v_2495.modifyTimeSeconds(fn_2532(fn_2496(arg_3004, 0))),
          v_3006 = fn_2496(arg_3004, 1);
        if (v_3005 === null || v_3005 > 4294967295) {
          arg_3004.r[0] = -1;
          return;
        }
        if (v_3006 === 0) {
          arg_3004.r[0] = v_3005 | 0;
          return;
        }
        arg_3004.r[0] = fn_2533(v_3006, v_3005) ? 0 : -1;
      }),
      arg_2492.api("vm_find_first", (arg_3007) => {
        let v_3008 = fn_2532(fn_2496(arg_3007, 0)),
          v_3009 = fn_2496(arg_3007, 1),
          v_3010 = v_2495.findFirst(v_3008);
        if (v_3010 === null || v_3009 === 0 || !arg_2492.writeUcs2(v_3009, v_3010.name)) {
          (v_3010 !== null && v_2495.findClose(v_3010.handle), (arg_3007.r[0] = -1));
          return;
        }
        arg_3007.r[0] = v_3010.handle;
      }),
      arg_2492.api("vm_find_next", (arg_3011) => {
        let v_3012 = v_2495.findNext(fn_2496(arg_3011, 0));
        arg_3011.r[0] =
          v_3012 !== null && arg_2492.writeUcs2(fn_2496(arg_3011, 1), v_3012) ? 0 : -1;
      }),
      arg_2492.api("vm_find_close", (arg_3013) => {
        arg_3013.r[0] = v_2495.findClose(fn_2496(arg_3013, 0));
      }),
      arg_2492.api("vm_sm_set_sb_by_ptr", (arg_3014) => {
        arg_3014.r[0] = 0;
      }),
      arg_2492.api("vm_sm_reset_sb", (arg_3015) => {
        arg_3015.r[0] = 0;
      }),
      arg_2492.api("vm_sm_set_sb_for_invoker", (arg_3016) => {
        arg_3016.r[0] = 0;
      }),
      arg_2492.api("srand", (arg_3017) => {
        ((arg_2492.cRandState = fn_2496(arg_3017, 0) >>> 0), (arg_3017.r[0] = 0));
      }),
      arg_2492.api("rand", (arg_3018) => {
        ((arg_2492.cRandState = ((Math.imul(1103515245, arg_2492.cRandState) >>> 0) + 12345) >>> 0),
          (arg_3018.r[0] = (arg_2492.cRandState >>> 16) & 32767));
      }),
      arg_2492.api("strtoi", (arg_3019) => {
        let v_3020 = fn_2496(arg_3019, 0),
          str_3021 = "";
        try {
          str_3021 = v_3020 !== 0 ? v_2493.readCString(v_3020, 128) : "";
        } catch (v_3027) {
          str_3021 = "";
        }
        let v_3022 = str_3021.replace(/^\s+/, ""),
          num_3023 = 1;
        v_3022.startsWith("-")
          ? ((num_3023 = -1), (v_3022 = v_3022.slice(1)))
          : v_3022.startsWith("+") && (v_3022 = v_3022.slice(1));
        let v_3024 = /^0x/i.test(v_3022) ? 16 : 10;
        v_3024 === 16 && (v_3022 = v_3022.slice(2));
        let num_3025 = 0,
          v_3026 = !1;
        for (let num_3028 = 0; num_3028 < v_3022.length; num_3028++) {
          let v_3029 = fn_216(v_3022[num_3028], v_3024);
          if (v_3029 < 0) break;
          ((v_3026 = !0), (num_3025 = ((Math.imul(num_3025, v_3024) >>> 0) + v_3029) >>> 0));
        }
        arg_3019.r[0] = v_3026 ? (num_3023 === -1 ? -num_3025 : num_3025) | 0 : 0;
      }),
      arg_2492.api("vm_ascii_to_ucs2", (arg_3030) => {
        arg_3030.r[0] = arg_2492.asciiToUcs2Compat(arg_3030);
      }),
      arg_2492.api("vm_gb2312_to_ucs2", (arg_3031) => {
        arg_3031.r[0] = arg_2492.gbToUcs2Compat(arg_3031);
      }),
      arg_2492.api("vm_ucs2_to_ascii", (arg_3032) => {
        arg_3032.r[0] = arg_2492.ucs2ToAsciiCompat(arg_3032);
      }),
      arg_2492.api("vm_ucs2_to_gb2312", (arg_3033) => {
        arg_3033.r[0] = arg_2492.ucs2ToAsciiCompat(arg_3033);
      }),
      arg_2492.api("vm_ucs2_string", (arg_3034) => {
        arg_3034.r[0] = arg_2492.narrowToUcs2Compat(arg_3034);
      }),
      arg_2492.api("vm_chset_convert", (arg_3035) => {
        arg_3035.r[0] = arg_2492.charsetConvertCompat(arg_3035);
      }),
      arg_2492.api("vm_wstrlen", (arg_3036) => {
        let v_3037 = fn_2496(arg_3036, 0);
        if (v_3037 === 0) {
          arg_3036.r[0] = 0;
          return;
        }
        let num_3038 = 0;
        try {
          for (; num_3038 < 4096 && v_2493.read16(v_3037 + num_3038 * 2) !== 0; ) num_3038++;
        } catch (v_3039) {
          num_3038 = 0;
        }
        arg_3036.r[0] = num_3038;
      }),
      arg_2492.api("vm_midi_play_by_bytes", (arg_3040) => {
        let v_3041 = fn_2496(arg_3040, 0) >>> 0,
          v_3042 = fn_2496(arg_3040, 1) >>> 0,
          v_3043 = fn_2496(arg_3040, 2) | 0,
          v_3044 = null;
        try {
          v_3044 = Array.prototype.slice.call(v_2493.readBytes(v_3041, Math.min(v_3042, 1048576)));
        } catch (v_3045) {
          v_3044 = null;
        }
        (v_3044 &&
          v_3044.length > 0 &&
          self.postMessage({ type: "midi", bytes: v_3044, loop: v_3043 !== 0 }),
          (arg_3040.r[0] = 0));
      }),
      arg_2492.api("vm_midi_stop", (arg_3046) => {
        (self.postMessage({ type: "midi-stop" }), (arg_3046.r[0] = 0));
      }),
      arg_2492.api("vm_midi_stop_all", (arg_3047) => {
        (self.postMessage({ type: "midi-stop" }), (arg_3047.r[0] = 0));
      }),
      arg_2492.api("vm_midi_pause", (arg_3048) => {
        (self.postMessage({ type: "midi-pause" }), (arg_3048.r[0] = 0));
      }),
      arg_2492.api("vm_midi_resume", (arg_3049) => {
        (self.postMessage({ type: "midi-resume" }), (arg_3049.r[0] = 0));
      }),
      arg_2492.api("vm_midi_play_by_bytes_ex", (arg_3050) => {
        let v_3051 = fn_2496(arg_3050, 0) >>> 0,
          v_3052 = fn_2496(arg_3050, 1) >>> 0,
          v_3053 = fn_2496(arg_3050, 2) | 0,
          v_3054 = null;
        try {
          v_3054 = Array.prototype.slice.call(v_2493.readBytes(v_3051, Math.min(v_3052, 1048576)));
        } catch (v_3055) {
          v_3054 = null;
        }
        (v_3054 &&
          v_3054.length > 0 &&
          self.postMessage({ type: "midi", bytes: v_3054, loop: v_3053 !== 0 }),
          (arg_3050.r[0] = 0));
      }));
    (arg_2492.api("vm_audio_play_bytes", (arg_3056) => {
      let v_3057 = fn_2496(arg_3056, 0) >>> 0,
        v_3058 = fn_2496(arg_3056, 1) >>> 0,
        v_3059 = null;
      try {
        v_3059 = Array.prototype.slice.call(v_2493.readBytes(v_3057, Math.min(v_3058, 4194304)));
      } catch (v_3060) {
        v_3059 = null;
      }
      (v_3059 && v_3059.length > 0 && self.postMessage({ type: "audio", bytes: v_3059, loop: !1 }),
        (arg_3056.r[0] = 0));
    }),
      arg_2492.api("vm_audio_play_bytes_no_block", (arg_3061) => {
        let v_3062 = fn_2496(arg_3061, 0) >>> 0,
          v_3063 = fn_2496(arg_3061, 1) >>> 0,
          v_3064 = null;
        try {
          v_3064 = Array.prototype.slice.call(v_2493.readBytes(v_3062, Math.min(v_3063, 4194304)));
        } catch (v_3065) {
          v_3064 = null;
        }
        (v_3064 &&
          v_3064.length > 0 &&
          self.postMessage({ type: "audio", bytes: v_3064, loop: !1 }),
          (arg_3061.r[0] = 0));
      }),
      arg_2492.api("vm_audio_stop", (arg_3066) => {
        (self.postMessage({ type: "audio-stop" }), (arg_3066.r[0] = 0));
      }),
      arg_2492.api("vm_audio_stop_all", (arg_3067) => {
        (self.postMessage({ type: "audio-stop" }), (arg_3067.r[0] = 0));
      }),
      arg_2492.api("vm_audio_pause", (arg_3068) => {
        (self.postMessage({ type: "audio-pause" }), (arg_3068.r[0] = 0));
      }),
      arg_2492.api("vm_audio_resume", (arg_3069) => {
        (self.postMessage({ type: "audio-resume" }), (arg_3069.r[0] = 0));
      }));
    for (let v_3070 of [
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
      arg_2492.api(v_3070, (arg_3071) => {
        arg_3071.r[0] = 0;
      });
  }
  function fn_216(arg_3072, arg_3073) {
    let v_3074 = arg_3072.charCodeAt(0),
      v_3075 =
        v_3074 >= 48 && v_3074 <= 57
          ? v_3074 - 48
          : v_3074 >= 97 && v_3074 <= 122
            ? v_3074 - 97 + 10
            : v_3074 >= 65 && v_3074 <= 90
              ? v_3074 - 65 + 10
              : -1;
    return v_3075 < arg_3073 ? v_3075 : -1;
  }
  function fn_217(arg_3076) {
    return arg_3076 === -1 || arg_3076 === 4294967295
      ? -1
      : arg_3076 >= 0 && arg_3076 <= 65535
        ? arg_3076
        : -1;
  }
  function fn_218(arg_3077, arg_3078, arg_3079) {
    let v_3080 = arg_3077.gfx;
    if (arg_3079 <= 0) return v_3080.activeLayerHandle === -1 ? [] : [v_3080.activeLayerHandle];
    let v_3081 = Math.min(arg_3079, 64);
    if (v_3081 === 1 && v_3080.layer(arg_3078)) return [arg_3078];
    if (!arg_3077.mem.isMapped(arg_3078, v_3081 * 4))
      return v_3080.layer(arg_3078) ? [arg_3078] : [];
    let list_3082 = [];
    for (let num_3083 = 0; num_3083 < v_3081; num_3083++)
      list_3082.push(arg_3077.mem.read32(arg_3078 + num_3083 * 4) | 0);
    return list_3082;
  }
  function fn_219(arg_3084) {
    let v_3085 = arg_3084.length;
    for (; v_3085 > 0 && arg_3084.charCodeAt(v_3085 - 1) < 32; ) v_3085--;
    return v_3085 === arg_3084.length ? arg_3084 : arg_3084.slice(0, v_3085);
  }
  function fn_220(arg_3086, arg_3087, arg_3088) {
    let v_3089 = fn_219(arg_3086);
    if (arg_3087 <= 0) return { value: v_3089, maxWidth: Number.MAX_SAFE_INTEGER };
    let v_3090 = arg_3088.stringWidth(v_3089);
    return arg_3087 <= v_3089.length + 1 && arg_3087 < v_3090
      ? {
          value: v_3089.slice(0, Math.min(arg_3087, v_3089.length)),
          maxWidth: Number.MAX_SAFE_INTEGER,
        }
      : { value: v_3089, maxWidth: arg_3087 };
  }
  function fn_221(arg_3091, arg_3092) {
    return arg_3092 >= 0 && arg_3092 <= 65535
      ? arg_3092 & 65535
      : arg_3092 >= 1048576 && arg_3091.isMapped(arg_3092, 2)
        ? fn_222(arg_3091, arg_3092)
        : arg_3092 & 65535;
  }
  function fn_222(arg_3093, arg_3094) {
    if (!arg_3093.isMapped(arg_3094, 2)) return arg_3094 & 65535;
    let v_3095 = arg_3093.read16(arg_3094);
    if (arg_3093.isMapped(arg_3094, 4) && arg_3093.read16(arg_3094 + 2) !== 0) {
      let v_3096 = arg_3093.read8(arg_3094),
        v_3097 = arg_3093.read8(arg_3094 + 1),
        v_3098 = arg_3093.read8(arg_3094 + 2),
        v_3099 = arg_3093.read8(arg_3094 + 3);
      if ((v_3096 === 255 || v_3096 === 0) && (v_3097 !== 0 || v_3098 !== 0 || v_3099 !== 0))
        return fn_89(v_3097, v_3098, v_3099);
    }
    return v_3095;
  }
  function fn_223(arg_3100, arg_3101) {
    if (arg_3101.staticBase === null) return;
    let v_3102 = arg_3100.mem,
      v_3103 = arg_3100.cpu,
      v_3104 = arg_3101.staticBase;
    ((v_3103.r[9] = v_3104), (v_3103.r[13] = 68157184));
    let v_3105 = (v_3103.r[13] - 8) | 0;
    (v_3102.write32(v_3105, 0, !0),
      v_3102.write32(v_3105 + 4, 16842748, !0),
      v_3102.write32(v_3104 - 128, v_3105, !0),
      v_3102.write32(v_3104 - 124, arg_3100.resolverAddress, !0));
  }
  function fn_224(arg_3106) {
    let v_3107 = arg_3106.mem,
      v_3108 = arg_3106.cpu,
      num_3109 = 805306624,
      v_3110 = (v_3108.r[13] - 8) | 0;
    (v_3107.write32(v_3110, 0, !0),
      v_3107.write32(v_3110 + 4, 16842748, !0),
      v_3107.write32(num_3109 - 128, v_3110, !0),
      v_3107.write32(num_3109 - 124, arg_3106.resolverAddress, !0),
      v_3107.write32(num_3109 - 120, 33554432, !0),
      v_3107.write32(num_3109 - 116, 50331648, !0),
      v_3107.write32(num_3109 - 112, 1048576, !0));
  }
  var v_225 = class {
      constructor(arg_3111, arg_3112, arg_3113 = 2e7) {
        (fn_12(this, "eventsDispatched", 0),
          fn_12(this, "timerCallbacks", 0),
          fn_12(this, "warnings", []),
          fn_12(this, "createDelivered", !1),
          fn_12(this, "penDropReported", !1),
          (this.cpu = arg_3111),
          (this.rt = arg_3112),
          (this.maxInsPerCallback = arg_3113));
      }
      dispatchOne(arg_3114) {
        var v_3115,
          v_3116,
          v_3117,
          v_3118,
          v_3119,
          v_3120,
          v_3121,
          v_3122,
          v_3123,
          v_3124,
          v_3125,
          v_3126,
          v_3127;
        let v_3128 = this.rt;
        if (!(v_3128.exitRequested || this.cpu.halted))
          switch (arg_3114.kind) {
            case "system": {
              let v_3129 = v_3128.entryCallback();
              if (v_3129 === 0) return;
              (this.cpu.callGuest(
                v_3129,
                [
                  (v_3115 = arg_3114.message) != null ? v_3115 : 0,
                  (v_3116 = arg_3114.param) != null ? v_3116 : 0,
                ],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++);
              return;
            }
            case "timer": {
              if (!arg_3114.callback) return;
              (this.cpu.callGuest(
                arg_3114.callback,
                [(v_3117 = arg_3114.timerId) != null ? v_3117 : 0],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++,
                this.timerCallbacks++);
              return;
            }
            case "keyboard": {
              if (v_3128.keyboardCallback === 0) return;
              (this.cpu.callGuest(
                v_3128.keyboardCallback,
                [
                  (v_3118 = arg_3114.eventType) != null ? v_3118 : 0,
                  (v_3119 = arg_3114.keyCode) != null ? v_3119 : 0,
                ],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++);
              return;
            }
            case "pen": {
              if (v_3128.penCallback === 0) {
                this.penDropReported ||
                  ((this.penDropReported = !0),
                  this.warnings.push("pen events dropped: guest registered no pen callback"));
                return;
              }
              (this.cpu.callGuest(
                v_3128.penCallback,
                [
                  (v_3120 = arg_3114.eventType) != null ? v_3120 : 0,
                  (v_3121 = arg_3114.x) != null ? v_3121 : 0,
                  (v_3122 = arg_3114.y) != null ? v_3122 : 0,
                ],
                this.maxInsPerCallback
              ),
                this.eventsDispatched++);
              return;
            }
            default: {
              if (!arg_3114.callback) return;
              let v_3130 = (v_3123 = arg_3114.argc) != null ? v_3123 : 0,
                v_3131 = [
                  (v_3124 = arg_3114.a0) != null ? v_3124 : 0,
                  (v_3125 = arg_3114.a1) != null ? v_3125 : 0,
                  (v_3126 = arg_3114.a2) != null ? v_3126 : 0,
                  (v_3127 = arg_3114.a3) != null ? v_3127 : 0,
                ].slice(0, v_3130);
              (this.cpu.callGuest(arg_3114.callback, v_3131, this.maxInsPerCallback),
                this.eventsDispatched++);
            }
          }
      }
      deliverCreatePaint() {
        this.createDelivered ||
          this.rt.entryCallback() === 0 ||
          ((this.createDelivered = !0),
          this.dispatchOne({ kind: "system", message: num_213, param: 0 }),
          this.dispatchOne({ kind: "system", message: num_212, param: 0 }));
      }
      start(arg_3132, arg_3133 = !0, arg_3134 = 0) {
        if (arg_3132 === 0) throw new Error("vm_main/entry address is null");
        if (!arg_3133) return;
        let fn_3135 = () => {
            (this.rt.enqueueDueTimers(), this.deliverCreatePaint());
            let num_3137 = 0;
            for (; num_3137 < 4 && !this.rt.exitRequested && !this.cpu.halted; ) {
              let v_3138 = this.rt.pollEvent();
              if (!v_3138) break;
              (this.dispatchOne(v_3138), num_3137++);
            }
            return this.rt.exitRequested || this.cpu.halted;
          },
          v_3136 = arg_3134 !== 0 ? [arg_3134] : [];
        this.cpu.callGuest(arg_3132, v_3136, this.maxInsPerCallback, fn_3135, 2e5);
      }
      begin() {
        if (this.rt.exitRequested) return !1;
        if (this.rt.hasEntryCallback())
          this.createDelivered ||
            (this.rt.postSystemEvent(num_213, 0), this.rt.postSystemEvent(num_212, 0));
        else if (
          (this.warnings.push(
            "vm_main returned without vm_reg_sysevt_callback(); no CREATE/PAINT callback can be delivered"
          ),
          this.rt.timerCount() === 0)
        )
          return !1;
        return !0;
      }
      pumpOnce(arg_3139 = 4) {
        if (this.rt.exitRequested || this.cpu.halted) return 0;
        (this.rt.enqueueDueTimers(), this.deliverCreatePaint());
        let num_3140 = 0;
        for (; num_3140 < arg_3139 && !this.rt.exitRequested && !this.cpu.halted; ) {
          let v_3141 = this.rt.pollEvent();
          if (!v_3141) break;
          (this.dispatchOne(v_3141), num_3140++);
        }
        return num_3140;
      }
      pumpFor(arg_3142, arg_3143 = !1) {
        let v_3144 = arg_3142 > 0 ? Date.now() + arg_3142 : 0,
          v_3145 = arg_3142 > 0 ? this.rt.nowMs() + arg_3142 : 0,
          v_3146 = !1;
        for (; !this.rt.exitRequested && !this.cpu.halted; ) {
          if (arg_3142 > 0 && Date.now() >= v_3144) {
            v_3146 = !0;
            break;
          }
          if (this.pumpOnce() === 0) {
            let v_3147 = this.rt.msUntilNextTimer();
            if (v_3147 === null) break;
            if (v_3147 > 0) {
              if (!arg_3143) break;
              let v_3148 = v_3147;
              if (
                (arg_3142 > 0 && (v_3148 = Math.min(v_3148, Math.max(0, v_3145 - this.rt.nowMs()))),
                v_3148 <= 0)
              ) {
                v_3146 = !0;
                break;
              }
              this.rt.clockOffsetMs += v_3148;
              continue;
            }
          }
        }
        return this.stats(v_3146);
      }
      stats(arg_3149 = !1) {
        return {
          eventsDispatched: this.eventsDispatched,
          timerCallbacks: this.timerCallbacks,
          timedOut: arg_3149,
          warnings: this.warnings.slice(),
        };
      }
    },
    v_226 = class {
      constructor(arg_3150 = 2e7, arg_3151 = 4) {
        (fn_12(this, "mem", new v_77()),
          fn_12(this, "rt"),
          fn_12(this, "loop", null),
          fn_12(this, "backend", "UNKNOWN"),
          fn_12(this, "kind", "UNKNOWN"),
          fn_12(this, "pkg", "OTHER"),
          fn_12(this, "lcdW", 240),
          fn_12(this, "lcdH", 320),
          fn_12(this, "ramKb", 800),
          fn_12(this, "entry", 0),
          fn_12(this, "booted", !1),
          fn_12(this, "warnings", []),
          fn_12(this, "cpuHook", null),
          (this.maxInsPerCallback = arg_3150),
          (this.frameBudgetMs = arg_3151),
          (this.rt = this.newRuntime(this.mem, "app.vxp")));
      }
      newRuntime(arg_3152, arg_3153) {
        var v_3154;
        let ui_3155 = new v_151(arg_3152, this.lcdW, this.lcdH);
        return (
          fn_215(ui_3155),
          (ui_3155.rawExecutableName = arg_3153),
          (ui_3155.stubTrace = (arg_3156) => {
            this.warnings.push(`stub API called: ${arg_3156}`);
          }),
          (ui_3155.errorTrace = (arg_3157, arg_3158) => {
            this.warnings.push(
              `api handler threw: ${arg_3158 instanceof Error ? arg_3158.message : String(arg_3158)}`
            );
          }),
          (this.mem = arg_3152),
          (this.rt = ui_3155),
          (v_3154 = this.cpuHook) == null || v_3154.call(this, ui_3155.cpu),
          ui_3155
        );
      }
      load(arg_3159, arg_3160 = "app.vxp") {
        ((this.warnings = []), (this.loop = null), (this.booted = !1), (this.entry = 0));
        let v_3161 = fn_182(arg_3159);
        ((this.kind = v_3161.kind), (this.backend = v_3161.backend));
        let v_3162 = fn_51(v_3161.tags);
        if (
          ((this.lcdW = v_3162.w),
          (this.lcdH = v_3162.h),
          (this.ramKb = fn_50(v_3161.tags)),
          (this.pkg = fn_54(
            v_3161.tags,
            arg_3159[0] === 127 && arg_3159[1] === 69,
            arg_3159[0] === 120
          )),
          v_3161.backend === "UNKNOWN")
        )
          return this.fail(
            0,
            v_3161.detail ||
              "Container kh\xF4ng \u0111\u01B0\u1EE3c h\u1ED7 tr\u1EE3 \u2014 kh\xF4ng t\xECm th\u1EA5y ELF/RAW ARM."
          );
        try {
          if (v_3161.backend === "RAW_ARM") {
            if (v_3161.raw === null) throw new Error("RAW image was not prepared");
            return this.bootRaw(v_3161.raw, arg_3160, !0);
          }
          if (v_3161.backend === "FLASH_LITE")
            return this.fail(
              0,
              "Flash Lite SWF \u2014 backend ch\u01B0a port (ch\u1EC9 c\xF3 parser/probe)."
            );
          if (v_3161.elf === null) throw new Error("ELF image was not prepared");
          return this.bootElf(v_3161.elf, arg_3160);
        } catch (v_3163) {
          return this.fail(
            this.entry,
            `Boot th\u1EADt l\u1ED7i: ${v_3163 instanceof Error ? v_3163.message : String(v_3163)}`
          );
        }
      }
      fail(arg_3164, arg_3165) {
        return this.result(!1, arg_3164, arg_3165);
      }
      result(arg_3166, arg_3167, arg_3168) {
        var v_3169, v_3170;
        let v_3171 = this.loop;
        return {
          ok: arg_3166,
          backend: this.backend,
          kind: this.kind,
          pkg: this.pkg,
          lcdW: this.lcdW,
          lcdH: this.lcdH,
          ramKb: this.ramKb,
          entry: arg_3167,
          instructions: this.rt.cpu.instructions,
          frames: this.rt.frames,
          events: (v_3169 = v_3171 == null ? void 0 : v_3171.eventsDispatched) != null ? v_3169 : 0,
          timerCallbacks:
            (v_3170 = v_3171 == null ? void 0 : v_3171.timerCallbacks) != null ? v_3170 : 0,
          resolved: this.rt.resolvedNames.length,
          stubbed: this.rt.stubbedNames.length,
          message: arg_3168,
          warnings: this.warnings.slice(0, 24),
        };
      }
      bootElf(arg_3172, arg_3173) {
        var v_3174, v_3175;
        let v_3176 = v_211.parse(arg_3172),
          st_3177 = new v_77(),
          v_3178 = v_3176.load(st_3177),
          v_3179 = this.newRuntime(st_3177, arg_3173),
          v_3180 = v_3179.cpu,
          v_3181 = v_3176.vmResSection();
        v_3181 !== null && v_3179.installElfVmResources(v_3181.bytes, v_3181.offset);
        let v_3182 = v_3176.applyRelocations(st_3177, v_3178, v_3179);
        v_3182.length > 0 &&
          this.warnings.push(
            `unresolved imports (${v_3182.length}): ${v_3182.slice(0, 12).join(", ")}`
          );
        let v_3183 = v_3176.installImportResolvers(st_3177, v_3178, v_3179.resolverAddress, v_3179);
        for (let v_3196 of v_3182)
          v_3179.stubbedNames.includes(v_3196) || v_3179.stubbedNames.push(v_3196);
        let v_3184 =
            (v_3174 = v_3176.definedSymbolAddress("vm_main", v_3178)) != null
              ? v_3174
              : v_3176.definedSymbolAddress("_vm_main", v_3178),
          v_3185 = v_3184 != null ? v_3184 : v_3178.entry,
          v_3186 = v_3176.definedSymbolAddress("gcc_entry", v_3178),
          v_3187 = (v_3175 = v_3176.sectionAddress(".init_array", v_3178)) != null ? v_3175 : 0,
          v_3188 = Math.floor(v_3176.sectionSize(".init_array") / 4),
          v_3189 = v_3184 === null && v_3186 === null && v_3188 > 0;
        this.entry = v_3185 | 0;
        let v_3190 = v_3178.staticBase;
        v_3190 !== null &&
          (st_3177.write32(v_3190 - 120, 33554432, !0),
          st_3177.write32(v_3190 - 116, 50331648, !0),
          st_3177.write32(v_3190 - 112, 1048576, !0));
        let v_3191 = v_3186 !== null || v_3189;
        v_3191
          ? (v_3180.reset(v_3178.entry),
            fn_223(v_3179, v_3178),
            v_3180.callGuest(
              v_3178.entry,
              [v_3179.resolverAddress, v_3187, v_3188],
              this.maxInsPerCallback
            ))
          : (v_3180.reset(v_3178.entry), fn_223(v_3179, v_3178));
        let v_3192 = !1;
        if (!v_3191) {
          v_3179.bootstrapSemihostingExitAsReturn = !0;
          try {
            let v_3197 = v_3183.length > 0 ? [v_3179.resolverAddress] : [];
            (v_3180.callGuest(v_3178.entry, v_3197, this.maxInsPerCallback),
              (v_3192 =
                !v_3179.exitRequested && (v_3179.hasEntryCallback() || v_3179.timerCount() > 0)));
          } catch (v_3198) {
            this.warnings.push(
              `ELF entry bootstrap fault: ${v_3198 instanceof Error ? v_3198.message : String(v_3198)}`
            );
          } finally {
            v_3179.bootstrapSemihostingExitAsReturn = !1;
          }
        }
        let mr_3193 = new v_225(v_3180, v_3179, this.maxInsPerCallback);
        ((this.loop = mr_3193),
          mr_3193.start(
            v_3185,
            !(v_3192 || v_3191),
            v_3183.length > 0 ? v_3179.resolverAddress : 0
          ));
        let v_3194 = mr_3193.begin();
        this.booted = v_3194;
        for (let v_3199 of mr_3193.warnings) this.warnings.push(v_3199);
        v_3176.relocErrors.length > 0 &&
          this.warnings.push(
            `reloc errors (${v_3176.relocErrors.length}): ${v_3176.relocErrors.slice(0, 8).join(", ")}`
          );
        let v_3195 = `bootstrap=${v_3192 ? "entry" : v_3191 ? "gcc_entry" : "vm_main"} sysCb=0x${(v_3179.systemCallback >>> 0).toString(16)} keyCb=0x${(v_3179.keyboardCallback >>> 0).toString(16)} penCb=0x${(v_3179.penCallback >>> 0).toString(16)} timers=${v_3179.timerCount()} slots=${v_3183.length} exit=${v_3179.exitRequested ? 1 : 0} halted=${v_3180.halted ? 1 : 0}${fn_227(v_3180)}`;
        return v_3194
          ? this.result(
              !0,
              this.entry,
              `Boot th\u1EADt ELF_ARM: kind=${this.kind} pkg=${this.pkg} lcd=${this.lcdW}x${this.lcdH} entry=0x${(this.entry >>> 0).toString(16)} ins=${v_3180.instructions} frames=${v_3179.frames} ${v_3195}`
            )
          : this.result(
              !1,
              this.entry,
              `ELF_ARM kh\xF4ng s\u1ED1ng sau bootstrap: ${v_3195} ins=${v_3180.instructions} frames=${v_3179.frames}`
            );
      }
      bootRaw(arg_3200, arg_3201, arg_3202) {
        var v_3203;
        let v_3204 = (v_3203 = arg_3200.vmMainOffset) != null ? v_3203 : 0,
          st_3205 = new v_77(),
          v_3206 = fn_78(
            arg_3202
              ? arg_3200.code.length + arg_3200.initialData.length + 4096
              : arg_3200.code.length,
            4096
          );
        (st_3205.map(268435456, Math.max(v_3206, 4096), !0, !0, !0),
          st_3205.writeBytes(268435456, arg_3200.code, 0, arg_3200.code.length, !0),
          arg_3202 &&
            arg_3200.initialData.length > 0 &&
            st_3205.writeBytes(
              (268435456 + arg_3200.code.length) | 0,
              arg_3200.initialData,
              0,
              arg_3200.initialData.length,
              !0
            ));
        let v_3207 = Math.max(arg_3200.initialData.length, arg_3200.dataSizeHint),
          v_3208 = Math.max(arg_3200.bssSizeHint, 16384),
          v_3209 = fn_78(256 + v_3207 + v_3208 + 16384, 4096);
        (st_3205.map(805306368, v_3209, !0, !0, !1),
          arg_3200.initialData.length > 0 && st_3205.writeBytes(805306624, arg_3200.initialData),
          st_3205.write32(805306624, 805306624, !0));
        let v_3210 = this.newRuntime(st_3205, arg_3201);
        (v_3210.installRawResources(arg_3200.resources),
          st_3205.write32(
            (805306624 + arg_3200.resolverSlotOffset) | 0,
            v_3210.resolverAddress,
            !0
          ));
        let v_3211 = (268435456 + v_3204) | 0;
        this.entry = v_3211;
        let v_3212 = v_3210.cpu,
          v_3213 = !1;
        if (arg_3202)
          try {
            (v_3212.reset(268435456),
              (v_3212.r[9] = 805306624),
              fn_224(v_3210),
              (v_3210.bootstrapSemihostingExitAsReturn = !0));
            try {
              v_3212.callGuest(268435456, [], this.maxInsPerCallback);
            } finally {
              v_3210.bootstrapSemihostingExitAsReturn = !1;
            }
            v_3213 =
              !v_3210.exitRequested && (v_3210.hasEntryCallback() || v_3210.timerCount() > 0);
          } catch (v_3217) {
            this.warnings.push(
              `RAW ARMCC bootstrap fallback: ${v_3217 instanceof Error ? v_3217.message : String(v_3217)}`
            );
          } finally {
            v_3210.bootstrapSemihostingExitAsReturn = !1;
          }
        if (arg_3202 && !v_3213)
          return (
            this.warnings.push(
              "RAW ARMCC bootstrap did not complete; retrying pristine legacy launch"
            ),
            this.bootRaw(arg_3200, arg_3201, !1)
          );
        let mr_3214 = new v_225(v_3212, v_3210, this.maxInsPerCallback);
        ((this.loop = mr_3214),
          v_3213
            ? mr_3214.start(v_3211, !1)
            : (arg_3200.initialData.length > 0 &&
                st_3205.writeBytes(
                  805306624,
                  arg_3200.initialData,
                  0,
                  arg_3200.initialData.length,
                  !0
                ),
              st_3205.write32(805306624, 805306624, !0),
              st_3205.write32(
                (805306624 + arg_3200.resolverSlotOffset) | 0,
                v_3210.resolverAddress,
                !0
              ),
              v_3212.reset(v_3211),
              (v_3212.r[9] = 805306624),
              mr_3214.start(v_3211, !0)));
        let v_3215 = mr_3214.begin();
        this.booted = v_3215;
        for (let v_3218 of mr_3214.warnings) this.warnings.push(v_3218);
        let v_3216 = `bootstrap=${v_3213} vmMain=0x${(v_3211 >>> 0).toString(16)} sysCb=0x${(v_3210.systemCallback >>> 0).toString(16)} keyCb=0x${(v_3210.keyboardCallback >>> 0).toString(16)} penCb=0x${(v_3210.penCallback >>> 0).toString(16)} timers=${v_3210.timerCount()} res=${v_3210.namedResources.length} slot=0x${arg_3200.resolverSlotOffset.toString(16)} exit=${v_3210.exitRequested ? 1 : 0} halted=${v_3212.halted ? 1 : 0}${fn_227(v_3212)}`;
        return v_3215
          ? this.result(
              !0,
              this.entry,
              `Boot th\u1EADt RAW_ARM: kind=${this.kind} pkg=${this.pkg} lcd=${this.lcdW}x${this.lcdH} ${v_3216} ins=${v_3212.instructions} frames=${v_3210.frames}`
            )
          : this.result(
              !1,
              this.entry,
              `RAW_ARM kh\xF4ng s\u1ED1ng sau bootstrap: ${v_3216} ins=${v_3212.instructions} frames=${v_3210.frames}`
            );
      }
      present(arg_3219) {
        var v_3220;
        ((v_3220 = this.loop) == null || v_3220.pumpFor(this.frameBudgetMs),
          this.rt.gfx.toRgba(arg_3219));
      }
      present565(arg_3221) {
        var v_3222;
        (v_3222 = this.loop) == null || v_3222.pumpFor(this.frameBudgetMs);
        let v_3223 = this.rt.gfx.fb565;
        arg_3221.set(
          v_3223.length <= arg_3221.length ? v_3223 : v_3223.subarray(0, arg_3221.length)
        );
      }
      pumpFor(arg_3224) {
        var v_3225;
        (v_3225 = this.loop) == null || v_3225.pumpFor(arg_3224, !0);
      }
      key(arg_3226, arg_3227) {
        this.rt.postKeyboardEvent(arg_3226, arg_3227);
      }
      pen(arg_3228, arg_3229, arg_3230) {
        this.rt.postPenEvent(arg_3228, arg_3229, arg_3230);
      }
      stop(arg_3231 = 0) {
        this.rt.requestExit(arg_3231, "host");
      }
    };
  function fn_227(arg_3232) {
    let v_3233 = arg_3232.fault;
    return v_3233 === null
      ? ""
      : ` fault=${v_3233.kind}@0x${(v_3233.pc >>> 0).toString(16)} ${v_3233.detail}`;
  }
  function fn_228(arg_3234, arg_3235) {
    let v_3236 = null,
      v_3237 = !1,
      v_3238 = null,
      v_3239 = null,
      v_3240 = !1,
      list_3241 = [],
      fn_3242 = (arg_3245, arg_3246) => {
        let v_3247 = arg_3245 * arg_3246;
        for (let num_3248 = 0; num_3248 < list_3241.length; num_3248++)
          if (list_3241[num_3248].length >= v_3247) return list_3241.splice(num_3248, 1)[0];
        return new Uint16Array(v_3247);
      },
      fn_3243 = () => {
        if (((v_3238 = null), v_3240 || !v_3236 || !v_3237)) return;
        let v_3249 = fn_3242(v_3236.lcdW, v_3236.lcdH);
        v_3236.present565(v_3249);
        let v_3250 = v_3236.rt.cpu.fault;
        (v_3250 &&
          v_3250 !== v_3239 &&
          ((v_3239 = v_3250),
          arg_3235({
            type: "log",
            level: "warn",
            text: `Guest stopped: ${v_3250.kind}@0x${(v_3250.pc >>> 0).toString(16)}${v_3250.detail ? " - " + v_3250.detail : ""}`,
          })),
          arg_3235(
            {
              type: "frame",
              px: v_3249,
              w: v_3236.lcdW,
              h: v_3236.lcdH,
              frames: v_3236.rt.frames,
              fault: v_3250,
              exit: v_3236.rt.exitReason,
            },
            [v_3249.buffer]
          ),
          (v_3238 = setTimeout(fn_3243, 16)));
      },
      fn_3244 = () => {
        v_3238 === null && !v_3240 && (v_3238 = setTimeout(fn_3243, 0));
      };
    return {
      handle(arg_3251) {
        var v_3252, v_3253, v_3254, v_3255, v_3256, v_3257, v_3258, v_3259;
        switch (arg_3251.type) {
          case "load": {
            textCharset = arg_3251.charset === "gbk" ? "gbk" : "auto";
            let uint8Array_3260 = new Uint8Array(
              (v_3252 = arg_3251.bytes) != null ? v_3252 : new ArrayBuffer(0)
            );
            let v_3261;
            try {
              ((v_3236 = new arg_3234()), (v_3239 = null));
              v_3261 = v_3236.load(
                uint8Array_3260,
                (v_3253 = arg_3251.name) != null ? v_3253 : "app.vxp"
              );
            } catch (v_3262) {
              v_3261 = {
                ok: !1,
                message:
                  "engine error: " +
                  (v_3262 && v_3262.message ? v_3262.message : String(v_3262)) +
                  (v_3262 && v_3262.stack ? " | " + String(v_3262.stack).slice(0, 300) : ""),
              };
            }
            (arg_3235({ type: "boot", result: v_3261 }),
              v_3261 && v_3261.ok && ((v_3237 = !0), fn_3244()));
            break;
          }
          case "key":
            v_3236 == null ||
              v_3236.key(
                (v_3254 = arg_3251.ev) != null ? v_3254 : 0,
                (v_3255 = arg_3251.code) != null ? v_3255 : 0
              );
            break;
          case "pen":
            v_3236 == null ||
              v_3236.pen(
                (v_3256 = arg_3251.ev) != null ? v_3256 : 0,
                (v_3257 = arg_3251.x) != null ? v_3257 : 0,
                (v_3258 = arg_3251.y) != null ? v_3258 : 0
              );
            break;
          case "running":
            ((v_3237 = !!arg_3251.value), v_3237 && fn_3244());
            break;
          case "recycle":
            arg_3251.px && list_3241.push(arg_3251.px);
            break;
          case "stop":
            v_3236 == null || v_3236.stop((v_3259 = arg_3251.code) != null ? v_3259 : 0);
            break;
          default:
            break;
        }
      },
      dispose() {
        ((v_3240 = !0),
          (v_3237 = !1),
          v_3238 !== null && clearTimeout(v_3238),
          (v_3238 = null),
          (v_3236 = null),
          (list_3241.length = 0));
      },
    };
  }
  var v_229 = self,
    v_230 = fn_228(v_226, (arg_3263, arg_3264) => v_229.postMessage(arg_3263, arg_3264));
  ((v_229.onmessage = (arg_3265) => v_230.handle(arg_3265.data)),
    v_229.postMessage({ type: "ready" }));
})();
