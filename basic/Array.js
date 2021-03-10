const log = console.log;
// --------------------------------------------------------------------------------------------------
// 1. 数组扁平化
log('数组扁平化');
const q1 = [[0, 1], [2, [3, [4, 5]]], 6];
// => [1, 2, 3, 4, 5, 6]
//* flat()
log('1.flat', q1.flat(10)); // 深度
//*  reg /g 匹配所有的 不加匹配第一个
log('1.reg', JSON.stringify(q1).replace(/\[|\]/g, '').split(','));
log(
  '1.reg modify',
  JSON.parse(`[${JSON.stringify(q1).replace(/\[|\]/g, '')}]`),
);
//* toString
log('1.toString', q1.toString().split(','));
//* reduce
const flatten = (arr) =>
  arr.reduce((pre, cur) =>
    (Array.isArray(pre) ? flatten(pre) : [pre]).concat(
      Array.isArray(cur) ? flatten(cur) : [cur],
    ),
  );
log('1.reduce', flatten(q1));
// --------------------------------------------------------------------------------------------------
// 2.数组去重
log('数组去重');
const q2 = [1, 1, '1', 17, true, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]
// 2. Set
log('2.set', new Set(q2));
// 2. 最笨的循环
const getSet = (arr) => {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        len--;
        j--;
      }
    }
  }
  return arr;
};
log('2.for', getSet(q2));
// 2.indexOf
const getSetIndexof = (arr) => {
  const set = [];
  for (let i = 0; i < arr.length; i++) {
    if (set.indexOf(arr) === -1) {
      set.push(arr[i]);
    }
  }
  return set;
};
log('2.indexOf', getSetIndexof(q2));
// 2.include  filter 类似
const getSetInclude = (arr) => {
  const set = [];
  for (let i = 0; i < arr.length; i++) {
    if (!set.includes(arr[i])) {
      set.push(arr[i]);
    }
  }
  return set;
};
const getSetFilter = (arr) => arr.filter((val, i) => arr.indexOf(val) === i);
log('2.filter', getSetFilter(q2));
// --------------------------------------------------------------------------------------------------
// 3.类数组转化为数组
log('3.类数组转化为数组');
const fn = () => {
  return arguments;
};
// log([...fn(1, 2)]);
// log([].concat(fn(1, 2)));
// log(Array.from(fn(1, 2)));
// log(Array.prototype.slice.call(fn(1, 2)));
// --------------------------------------------------------------------------------------------------
// Array.prototype.filter()
// >>>
//原来移位操作符在移位前做了两种转换，第一将不是number类型的数据转换为number，第二将number转换为无符号的32bit数据，也就是Uint32类型。这些与移位的位数无关，移位0位主要就是用了js的内部特性做了前两种转换
// >>>0 保证是正整数
log('4.Array.prototype.filter');
Array.prototype.filter = function (callback, thisArg) {
  const context = thisArg || this;
  if (context == null) {
    throw new TypeError('null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callbakc is not function');
  }
  const res = [];
  for (let i = 0; i < context.length; i++) {
    if (callback.call(thisArg, context[i], i, context)) {
      res.push(context[i]);
    }
  }
  return res;
};
log(
  Array.prototype.filter((val, i, arr) => arr.indexOf(val) === i, [
    1,
    2,
    3,
    3,
    3,
    4,
  ]),
);
log([1, 2, 3, 3, 3, 4].filter((val, i, arr) => arr.indexOf(val) === i));
// --------------------------------------------------------------------------------------------------
//  Array.prototype.map
log('5.Array.prototype.map');
Array.prototype.map = function (callback, thisArg) {
  const context = thisArg || this;
  if (context == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not a function');
  }
  const res = [];
  for (let i = 0; i < context.length; i++) {
    res[i] = callback.call(context, context[i], i, context);
  }
  return res;
};
log([1, 2, 3, 4, 5].map((val) => val * 2));
log(Array.prototype.map((val) => val * 2, [1, 2, 3, 4, 5]));
// Array.prototype.forEach
log('6.Array.prototype.forEach');
Array.prototype.forEach = function (callback, thisArg) {
  const context = thisArg || this;
  if (context == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not a function');
  }
  for (let i = 0; i < context.length; i++) {
    callback.call(context, context[i], i, context);
  }
};
[1, 2, 3, 4, 5].forEach((val) => log(val * 2));
// Array.prototype.reduce
log('7.Array.prototype.reduce');
log([null, null, 1, 1].reduce((acc, cur) => acc + cur));
Array.prototype.reduce = function (callback, initialValue) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  let acc = initialValue === undefined ? this[0] : initialValue;
  let curIndex = initialValue === undefined ? 1 : 0;
  while (curIndex < this.length) {
    acc = callback.call(this, acc, this[curIndex], curIndex, this);
    curIndex++;
  }
  return acc;
};
log([null, 1, 1, 1].reduce((acc, cur) => acc + cur));
