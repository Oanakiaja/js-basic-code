const Observer = (function () {
  const messages = new Map<string, Array<Function>>();
  return {
    regist: function (type: string, fn: Function) {
      if (messages.has(type)) {
        messages.get(type).push(fn);
        return;
      }
      messages.set(type, [fn]);
    },
    fire: function (type: string, args) {
      if (!messages.has(type)) {
        return;
      }
      const events = {
        type: type,
        args: args ?? {},
      };
      messages.get(type).forEach((_fn) => {
        _fn.call(this, events);
      });
    },
    remove: function (type, fn) {
      if (!messages.has(type)) {
        return;
      }
      messages.set(
        type,
        messages.get(type).filter((_fn) => _fn !== fn),
      );
    },
  };
})();
const typeFn = (e) => {
  console.log(e.type);
};
const msgFn = (e) => {
  console.log(e.args.msg);
};
Observer.regist('test', typeFn);
Observer.regist('test', msgFn);

Observer.fire('test', {
  msg: 'hh',
});
Observer.remove('test', msgFn);
Observer.fire('test', {
  msg: 'hh',
});
