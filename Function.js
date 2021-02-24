const log = console.log;
// 1. Function.prototype.apply()
log('1. Function.prototype.apply()');
Function.prototype.apply = function (context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('TypeError');
  }
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
function foo(c, d) {
  console.log(this.a, this.b, c, d);
  return this.a + this.b + c + d;
}
const obj = {
  a: 1,
  b: 2,
};
log(foo.apply(obj, [3, 4]));
// 2. Function.prototype.call()
log('2. Function.prototype.call()');
Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('TypeError');
  }
  const fn = Symbol('fn');
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
log(foo.call(obj, 3, 4));
// 3. Function.prototype.bind()
log('3. Function.prototype.bind()');
// 闭包保留 this， 并且返回一个函数， 检查new的情况
// 把new学了再看看
Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error(
      'Function.prototype.bind - what is trying to be bound is not callable',
    );
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var fNOP = function () {};

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs),
    );
  };
  log('this, this.prototype', this, this.prototype);
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
// 4. debounce（防抖）
// 输入的时候ajax,
// window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
const debouce = (fn, time) => {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
};
// 5. throttle（节流）
// 鼠标不断点击触发，mousedown(单位时间内只触发一次)
// 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
const throttle = (fn, time) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};

//6. curry
// 经典面试题：实现add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;
log('6.closuer');
function add() {
  const arg = [...arguments];
  function fn() {
    arg.push(...arguments);
    return fn;
  }
  fn.toString = function () {
    return arg.reduce((pre, cur) => pre + cur);
  };
  return fn;
}
log(add(1, 2, 3)(1, 2)); // 这里node改变了toString打印的是函数对象，但浏览器显示正确
