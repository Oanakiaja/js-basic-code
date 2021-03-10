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

Function.prototype.bind2 = function (context) {
  fn = this;
  arg = Array.prototype.slice.call(arguments, 1);

  function fNop() {}

  function fBound() {
    bindArg = Array.prototype.slice.call(arguments);
    return fn.apply(this instanceof fNop ? this : context, arg.concat(bindArg));
  }

  fNop.prototype = this.prototype;
  fBound.prototype = new fNop();
  return fBound;
};

function newOpt(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Error');
  }
  const args = [...arguments].slice(1);
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}

function create(proto) {
  function F() {}
  F.prototype = proto;
  F.prototype.constructor = F;
  return new F();
}

function inheritPrototype(subFn, superFn) {
  var prototype = Object.create(superFn.prototype);
  prototype.constructor = subFn;
  subFn.prototype = prototype;
}

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

// 面试题
function getMax(_num) {
  const strArr = _num.toString().split('');
  while (strArr.length < 4) {
    strArr.push('0');
  }
  sortedArr = strArr.sort((a, b) => b - a);
  return Number(sortedArr.join(''));
}
function getMin(_num) {
  const strArr = _num.toString().split('');
  sortedArr = strArr.sort((a, b) => a - b);
  return Number(sortedArr.join(''));
}

function fn(num, i) {
  if (i <= 0) return num;
  return fn(getMax(num) - getMin(num), i - 1);
}

// 面试题
foo = '1-1';
function bar() {
  console.log(foo);
  console.log(this.foo);
}
console.log('------');
bar();
var baz = (function () {
  let foo = '1-2';
  return {
    foo: '1-3',
    bar: function bar() {
      console.log(foo);
      console.log(this.foo);
    },
  };
})();
console.log('------');
console.log(baz.foo);
console.log(baz.bar());
console.log('------');
var barr = baz.bar;
barr();
console.log('------');
bar.call(baz);

const curryFn = (i) => {
  return async () => {
    console.log(i, '. fn,start');
    await new Promise(() => {
      setTimeout(() => {
        console.log(i, '.timeout');
      }, 0);
    });
    console.log(i, '.fn,end');
  };
};
const arr = [curryFn(1), curryFn(2), curryFn(3), curryFn(4)];
console.log('start');
arr.forEach((val) => {
  val();
});
console.log('end');
