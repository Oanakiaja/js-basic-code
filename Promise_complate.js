const PENDING = 'PENDING'; // 进行中
const FULFILLED = 'FULFILLED'; // 已成功
const REJECTED = 'REJECTED'; // 已失败

// 链式回调顺序
// new Promise((resolve, reject) => {
//   console.log("log: 外部promise");
//   resolve();
// })
//   .then(() => {
//     console.log("log: 外部第一个then");
//     new Promise((resolve, reject) => {
//       console.log("log: 内部promise");
//       resolve();
//     })
//       .then(() => {
//         console.log("log: 内部第一个then");
//       })
//       .then(() => {
//         console.log("log: 内部第二个then");
//       });
//   })
//   .then(() => {
//     console.log("log: 外部第二个then");
//   });

// 作者：yeyan1996
// 链接：https://juejin.cn/post/6844903972008886279
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

class Promise {
  constructor(excutor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;

    this.onFulfilledCallbacks = [];
    this.onRejectCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn(value));
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectCallbacks.forEach((fn) => fn(reason));
      }
    };

    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFullfiled, onRejected) {
    // 实现如果 then(1).then(2).then(val=>log(val)) 还是最初resolve的值
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason);
          };

    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          try {
            setTimeout(() => {
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              const result = onFullfiled(self.value);
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        self.onRejectCallbacks.push(() => {
          try {
            setTimeout(() => {
              const result = onRejected(self.value);
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === FULFILLED) {
        setTimeout(() => {
          try {
            const result = onFullfiled(self.value);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        setTimeout(() => {
          try {
            const result = onRejected(self.reason);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
  }
  // Promise.prototype.catch就是Promise.prototype.then(null, onRejected)的别名
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  static resolve(value) {
    if (value instanceof Promise) {
      return value;
    } else {
      return new Promise((resolve) => resolve(value));
    }
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promiseArr) {
    const len = promiseArr.length;
    const values = new Array(len);
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        Promise.resolve(promiseArr[i]).then(
          (val) => {
            values[i] = val;
            count++;
            if (count === len) resolve(values);
          },
          (err) => reject(err),
        );
      }
    });
  }
  static race(promiseArr) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach((val) => {
        Promise.resolve(val).then(
          (val) => resolve(val),
          (err) => reject(err),
        );
      });
    });
  }
}
