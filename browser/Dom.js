// 图片懒加载
//  <img data-src="./images/2.jpg" alt="">
function lazyload() {
  const imgs = document.getElementByTagName('img');
  const len = imgs.length;
  // 视口的高度
  const viewHeight = document.documentElement.clientHeight;
  // 滚动条高度
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  for (let i = 0; i < len; i++) {
    const offsetHeight = imgs[i].offsetTop;
    if (offsetHeight < viewHeight + scrollTop) {
      const src = imgs[i].dataset.src;
      imgs[i].src = src;
    }
  }
}

// 滚动加载
window.addEventListener(
  'scroll',
  function () {
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = documnet.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if (clientHeight + scrollTop >= scrollHeight) {
      // 滚动到底部
      // 加载
    }
  },
  false,
);

// 渲染几万条数据不卡住页面
function renderBigDom() {
  setTimeout(() => {
    // 插入十万条数据
    const total = 100000;
    // 一次插入的数据
    const once = 20;
    // 插入数据需要的次数
    const loopCount = Math.ceil(total / once);
    let countOfRender = 0;
    const ul = document.querySelector('ul');
    function add() {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < once; i++) {
        const li = document.createElement('li');
        li.innerHTML = Math.floor(Math.random() * total);
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      countOfRender += 1;
      loop();
    }
    function loop() {
      if (countOfRender < loopCount) {
        window.requestAnimationFrame(add);
      }
    }
    loop();
  }, 0);
}

// 打印出当前网页用了多少种html元素
const fn = () => {
  return [
    ...new Set([...document.querySelectorAll('*')].map((el) => el.tagName)),
  ].length;
};

// 将 virtual dom 转化为 dom
// vnode结构:
//{ tag, attrs, children}
function render(vnode, container) {
  container.appendChild(_render(vnode));
}
function _render(vnode) {
  if (typeof vnode === 'number') {
    vnode = String(vnode);
  }
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((key) => {
      dom.setAttribute(key, vnode.attrs[key]);
    });
  }
  vnode.children.forEach((child) => render(child.dom));
  return dom;
}
