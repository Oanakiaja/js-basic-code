global.identity = 'global';
let object1 = {
  identity: 'Object',
  getIdentityFunc: function () {
    return function () {
      console.log(this.identity);
    };
  },
};

let object2 = {
  identity: 'Object',
  getIdentityFunc: function () {
    const that = this;
    return function () {
      console.log(that.identity);
    };
  },
};

object1.getIdentityFunc()();
object2.getIdentityFunc()();
