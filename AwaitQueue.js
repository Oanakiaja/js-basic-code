// 同步调度器
async function runQueue(queue) {
  let fn = queue.shift();
  while (fn) {
    await fn();
    fn = queue.shift();
  }
}

const fn1 = (num) => {
  return () => {
    console.log(num);
  };
};

const fn_queue = [fn1(1), fn1(2), fn1(3)];
runQueue(fn_queue);
