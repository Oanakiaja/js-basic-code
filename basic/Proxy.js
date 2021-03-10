let hero = {
  name: '赵云',
  hp: 100,
  sp: 100,
  equipment: ['马', '长枪'],
};

let handler = {
  get(target, name, receiver) {
    if (name === 'name') {
      console.log('success');
    } else {
      console.log('failure');
    }
    return Reflect.get(target, name, receiver);
  },
};

let heroProxy = new Proxy(hero, handler);
console.log(heroProxy.name);

// 观察者模式
let hero = {
  name: '赵云',
  hp: 100,
  sp: 100,
  equipment: ['马', '长枪'],
};

const handler = {
  set(target, key, value, receiver) {
    //内部调用对应的 Reflect 方法
    const result = Reflect.set(target, key, value, receiver);
    //执行观察者队列
    observableArray.forEach((item) => item());
    return result;
  },
};

//初始化Proxy对象，设置拦截操作
const createProxy = (obj) => new Proxy(obj, handler);

//初始化观察者队列
const observableArray = new Set();

const heroProxy = createProxy(hero);

//将监听函数加入队列
observableArray.add(() => {
  console.log(heroProxy.name);
});

heroProxy.name = '黄忠';
// --> 黄忠
