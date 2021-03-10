const PENDING = 'PENDING'; // 进行中
const FULFILLED = 'FULFILLED'; // 已成功
const REJECTED = 'REJECTED'; // 已失败

// 不支持链式调用的情况
class Promise {
  constructor(exector) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };
    try {
      exector(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    setTimeout(() => {
      if (this.status === PENDING) {
        // 思考下，什么时候 then 了还在 pending 情况，
        //就是promise里面有异步代码，在异步代码内resolve了，但是then执行了，就添加进去。
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      } else if (this.status === FULFILLED) {
        onFulfilled(this.value);
      } else if (this.status === REJECTED) {
        onRejected(this.reason);
      }
    });
  }
  catch() {}
  static resolve() {}
  static all() {}
  static race() {}
}
