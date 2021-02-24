// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。完善下面代码的Scheduler类，使以下程序能够正常输出：
// class Scheduler {
//   add(promiseCreator) { ... }
//   // ...
// }

// const timeout = time => new Promise(resolve => {
//   setTimeout(resolve, time);
// })

// const scheduler = new Scheduler();

// const addTask = (time,order) => {
//   scheduler.add(() => timeout(time).then(()=>console.log(order)))
// }

// addTask(1000, '1');
// addTask(500, '2');
// addTask(300, '3');
// addTask(400, '4');

// // output: 2 3 1 4
// 复制代码整个的完整执行流程：

// 其实1、2两个任务开始执行
// 500ms时，2任务执行完毕，输出2，任务3开始执行
// 800ms时，3任务执行完毕，输出3，任务4开始执行
// 1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
// 1200ms时，4任务执行完毕，输出4

class Scheduler {
  constructor() {
    this.limited = 2;
    this.count = 0;
    this.taskCallbacks = [];
  }
  add(promiseCreator) {
    this.taskCallbacks.push(promiseCreator);
    const taskDone = () => {
      this.count++;
      const fn = this.taskCallbacks.shift();
      if (fn) {
        fn().then(() => {
          this.count--;
          taskDone();
        });
      }
    };
    if (this.count < this.limited) {
      taskDone();
    }
  }
  addAwait(promiseCreator) {
    this.taskCallbacks.push(promiseCreator);
    const taskDone = async () => {
      this.count++;
      const fn = this.taskCallbacks.shift();
      if (fn) {
        await fn();
        this.count--;
        taskDone();
      }
    };
    if (this.count < this.limited) {
      taskDone();
    }
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.addAwait(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');

// output: 2 3 1 4
