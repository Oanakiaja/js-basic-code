// 1. 闭包陷阱
function App() {
  const [state, setState] = React.useState(0);
  // 连点三次你觉得答案会是什么？
  const handleClick = () => {
    setState(state + 1);
    setTimeout(() => {
      console.log(state);
    }, 2000);
  };

  return (
    <>
      <div>{state}</div>
      <button onClick={handleClick} />
    </>
  );
}
// 输出 0 1 2
// 修改
function App() {
  const [state, setState] = React.useState(0);
  // 用 ref 存一下
  const currentState = React.useRef(state);
  // 每次渲染后更新下值
  useEffect(() => {
    currentState.current = state;
  });

  const handleClick = () => {
    setState(state + 1);
    // 这样定时器里通过 ref 拿到最新值
    setTimeout(() => {
      console.log(currentState.current);
    }, 2000);
  };

  return (
    <>
      <div>{state}</div>
      <button onClick={handleClick} />
    </>
  );
}

// 2. useContext and useReducer 代替 redux
// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'action description':
        const newState = 1; // do something with the action
        return newState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };

// root index.js file
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './store.js';

const app = (
  <StateProvider>
    <App />
  </StateProvider>
);

ReactDOM.render(app, document.getElementById('root'));

// component.js
import React, { useContext } from 'react';
import { store } from './store.js';

const ExampleComponent = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  dispatch({ type: 'action description' });
};

// React router
// 原生router实现
window.addEventListener('HistoryChange', onPopState);
window.addEventListener('DOMContentLoaded', onLoad);

let routerView = null;

function onLoad() {
  routerView = document.querySelector('#routeView');
  onPopState();

  const LinkList = document.querySelectorAll('a');
  linkList.forEach((el) =>
    el.addEventListener('click', function (e) {
      e.preventDefault();
      history.pushState(null, ''.el.getAttribute('href'));
      onPopState();
    }),
  );
}

function onPopState() {
  switch (location.pathname) {
    case '/home':
      routerView.innerHTML = 'Home';
      return;
    case '/about':
      routerView.innerHTML = 'About';
      return;
    default:
      return;
  }
}
// Router 简单配置
const routeConfig = [
  {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: 'about', component: About },
      {
        path: 'inbox',
        component: Inbox,
        childRoutes: [
          { path: '/messages/:id', component: Message },
          {
            path: 'messages/:id',
            onEnter: function (nextState, replaceState) {
              replaceState(null, '/messages/' + nextState.params.id);
            },
          },
        ],
      },
    ],
  },
];
React.render(<Router routes={routeConfig} />, document.body);

// 定时器写法
function useInterval(fn, timeout) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = fn;
  }, [fn]);
  useEffect(() => {
    const id = setInterval(() => {
      ref.current();
    }, timeout);
    return () => clearInterval(id);
  }, []);
}
