// loader
// syncLoader.js
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  console.log(options);
  source += options.message;
  // 可以传递更详细的信息
  this.callback(null, source);
};
// asyncLoader.js
const loaderUtils = require('loader-utils');
module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const asyncfunc = this.async();
  setTimeout(() => {
    source += '人生巅峰';
    asyncfunc(null, source);
  }, 200);
};

// Plugin
// demo-webpack-plugin
class DemoWebpackPlugin {
  contructor() {
    // 执行打包命令的时候就会输出
    console.log('plugin init');
  }
  apply(compiler) {
    // 必须实现的apply方法，打包时会调用plugin的apply方法来执行plugin逻辑，compiler是webpack实例
    // plugin的核心在于，apply方法执行时，可以操作webpack本次打包的各个时间节点
    //（hooks，也就是生命周期勾子），在不同的时间节点做一些操作
    // compilation 代表每一次执行打包，独立的编译
    compiler.hooks.compile.tap('DemoWebpackPlugin', (compilation) => {
      console.log(compilation);
    });
    // 异步
    compiler.hooks.emit.tapPromise('DemoWebpackPlugin', async (compilation) => {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      console.log(compilation.assets);
      compilation.assets['index.md'] = {
        // 文件内容
        source: function () {
          return 'this is a demo for plugin';
        },
        // 文件尺寸
        size: function () {
          return 25;
        },
      };
    });
  }
}
