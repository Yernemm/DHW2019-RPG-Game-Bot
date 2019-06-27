'use strict';

class Util {
  constructor() {
    throw new Error(`The ${this.constructor.name} class may not be instantiated`);
  }

  static shuffle(array) {
    if (!Array.isArray(array)) throw new TypeError('Expected an array');
    var arr = array.slice(0);
    var currentIndex = arr.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }

    return arr;
  }

  static mergeDefault(def, given) {
    if (!given) return def;
    for (const key in def) {
      if (!{}.hasOwnProperty.call(given, key)) {
        given[key] = def[key];
      } else if (given[key] === Object(given[key])) {
        given[key] = Util.mergeDefault(def[key], given[key]);
      }
    }

    return given;
  }

  static generateID(len = 8) {
    if (!Util.isPosInt(len)) throw new RangeError('Invalid id length');
    return Array(Math.ceil(len / 8)).fill(void 0).map(e => Math.random().toString(36).slice(2, 10)).join('').slice(0, len);
  }

  static format(str, ...replacers) {
    if (typeof str !== 'string') throw new TypeError('Expected a string');
    return str.replace(/{(\d+)}/g, (match, number) => { 
      return typeof replacers[number] !== 'undefined' ? replacers[number] : match;
    });
  }

  static isPercent(val) {
    !isNaN(val) && val >= 0 && val <= 1;
  }

  static isPosInt(val) {
    return parseInt(val) !== Infinity && Number.isInteger(val) && val >= 0;
  }

  static isArrayLike(val) {
    return val !== null && typeof val[Symbol.iterator] === 'function' && typeof val.length === 'number';
  }

  static isNumeric(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  }

  static pick(arr) {
    if (!Util.isArrayLike(arr)) throw new TypeError('Expected an array-like object');
    return arr.length === 1 ? arr[0] : arr[Math.floor(Math.random() * arr.length)];
  }

  static capFirst(str) {
    return ''.charAt.call(str, 0).toUpperCase() + ''.slice.call(str, 1);
  }

  static random(v0, v1) {
    return Util.lerp(v0, v1, Math.random());
  }

  static irandom(v0, v1) {
    return Math.floor(Util.random(v0, v1));
  }

  static lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t;
  }

  static clamp(val, max, min) {
    return Math.min(Math.max(val, min), max);
  }

  static modulo(val, max) {
    return (val % max < 0 ? max : 0) + (val % max);
  }

  static async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  static dist(x1, y1, x2, y2) {
    var h = x1 - x2, k = y1 - y2;
    return Math.sqrt(h*h + k*k);
  }
}

module.exports = Util;
