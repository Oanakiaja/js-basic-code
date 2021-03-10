const log = console.log;
// 0. Object.create
// https://github.com/mqyqingfeng/Blog/issues/48
function create(proto) {
  function F() {}
  F.prototype = proto; // 将原型挂在构造函数的prototype上
  F.prototype.constructor = F;
  return new F(); // 返回新对象
}
//1. 模拟new操作
log('1.new');
function newOpt(fn) {
  if (typeof fn !== 'function') {
    throw new TypeError('Tpye Error');
  }
  const args = [...arguments].slice(1);
  const obj = Object.create(fn.prototype);
  const res = fn.apply(obj, args);
  return typeof res === 'object' ? res : obj;
}
function constructorFn() {
  this.a = 1;
  return this.a;
}
log(newOpt(constructorFn));

//2. instanceof
log('2.instanceof');
function myinstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
}
// 3.原型继承（寄生组合式继承）
log('3.原型继承（寄生组合式继承）');
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function () {
  console.log(this.age);
};
log(new SubType('zjt', '10'));

// 4.Object.is
// Object.is解决的主要是这两个问题：
// +0 === -0  // true
// NaN === NaN // false
log('4.Object.is');
const is = (x, y) => {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y; // 判断NaN
  }
};
log(+0 === -0);
log(1 / +0);
log(1 / -0);
log(NaN === NaN);
log(is(+0, -0));

// 5. Object.assign
Object.defineProperty(Object, 'assign', {
  value: function (target) {
    const args = [].slice.call(arguments, 1);
    if (target == null) {
      return new TypeError('Cannot convert undefined or null to object');
    }
    // 目标对象需要统一是引用数据类型，若不是会自动转换
    const to = Object(target);
    for (let i = 0; i < args.length; i++) {
      const nextSource = args[i];
      if (nextSource != null) {
        Object.keys(nextSource).forEach((key) => {
          to[key] = nextSource[key];
        });
      }
    }
    return to;
  },
  enumerable: false,
  writable: true,
  configurable: true,
});
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
log(Object.assign(target, source));

// 6.箭头函数 this 有个奇怪的地方
log('6. arrowFnThis');
const arrowFnThis = (source) => {
  log('this', this);
};
(function () {
  log('this', this);
})();
arrowFnThis();
// 7. 浅拷贝
log('7.shallow clone');
const shallowClone = (source) => {
  var target = {};
  for (let key in source) {
    if (Object.prototype.hasOwnProperty(source, key)) {
      target[key] = source[key];
    }
  }
  return target;
};
// 8. 深拷贝
// 1）初版
// 补充 判断对象用
function isObjectStrict(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
typeof null; //"object"
typeof {}; //"object"
typeof []; //"object"
typeof function foo() {}; //"function" (特殊情况)

const cloneDeep = (source) => {
  function isObjectClone(obj) {
    return typeof obj === 'object' && obj != null;
  }
  if (!isObjectClone(source)) {
    return source;
  }
  var target = Array.isArray(source) ? [] : {};
  for (let key in source) {
    if (Object.prototype.hasOwnProperty(source, key)) {
      if (isObjectClone(source[key])) {
        target[key] = cloneDeep(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// 2）遇到循环引用情况
// a.circleRef = a;
// JSON.parse(JSON.stringify(a));
// TypeError: Converting circular structure to JSON
// 循环检测
const cloneDeep2 = (source, hash = new Weekmap()) => {
  function isObjectClone(obj) {
    return typeof obj === 'object' && obj != null;
  }
  if (!isObjectClone(source)) {
    return source;
  }
  if (hash.has(source)) return hash.get(source);

  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  for (let key in source) {
    if (Object.prototype.hasOwnProperty(source, key)) {
      if (isObjectClone(source[key])) {
        target[key] = cloneDeep2(source[key], hash);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// 3） 拷贝Symbol

const cloneDeep3 = (source, hash = new Weekmap()) => {
  function isObjectClone(obj) {
    return typeof obj === 'object' && obj != null;
  }
  if (!isObjectClone(source)) {
    return source;
  }
  if (hash.has(source)) return hash.get(source);

  var target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  // ============= 新增代码
  let symKeys = Object.getOwnPropertySymbols(source); // 查找
  if (symKeys.length) {
    // 查找成功
    symKeys.forEach((symKey) => {
      if (isObject(source[symKey])) {
        target[symKey] = cloneDeep3(source[symKey], hash);
      } else {
        target[symKey] = source[symKey];
      }
    });
  }
  // =============

  for (let key in source) {
    if (Object.prototype.hasOwnProperty(source, key)) {
      if (isObjectClone(source[key])) {
        target[key] = cloneDeep3(source[key], hash);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// 如何判断一个对象是不是空对象
// Object.keys(obj).length ==== 0
