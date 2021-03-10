function EventEmitter() {
  this.events = new Map();
}

// addListener、removeListener、once、removeAllListeners、emit
const wrapCallback = (fn, once = false) => {
  return { callback: fn, once };
};

EventEmitter.prototype.addListener = function (type, fn, once = false) {
  const handler = this.events.get(type);
  if (!handler) {
    this.events.set(type, wrapCallback(fn, once));
  } else if (handler && typeof handler.callback === 'function') {
    this.events.set(type, [handler, wrapCallback(fn, once)]);
  } else {
    handler.push(wrapCallback(fn, once));
  }
};

EventEmitter.prototype.removeListener = function (type, listener) {
  const handler = this.events.get(type);
  if (!handler) return;
  if (!Array.isArray(handler)) {
    if (handler.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for (let i = 0; i < handler.length; i++) {
    const item = handler[i];
    if (item.callback === listener.callback) {
      handler.splice(i, 1);
      i--;
      if (handler.length === 1) {
        this.events.set(type, handler[0]);
      }
    }
  }
};

EventEmitter.prototype.emit = function (type, ...args) {
  const handler = this.events.get(type);
  if (!handler) return;
  if (Array.isArray(handler)) {
    handler.forEach((item) => {
      item.callback.apply(this, args);
      if (item.once) {
        this.removeListener(type, item);
      }
    });
  } else {
    handler.callback.apply(this, args);
    if (handler.once) {
      this.events.delete(type);
    }
  }
  return true;
};

EventEmitter.prototype.removeAllListener = function (type) {
  const handler = this.events.get(type);
  if (!handler) return;
  this.events.delete(type);
};
