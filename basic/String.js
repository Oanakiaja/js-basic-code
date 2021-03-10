var a = {
  b: 123,
  c: '456',
  e: '789',
};
var str = `a{a.b}aa{a.c}aa {a.d}aaaa`;
// => 'a123aa456aa {a.d}aaaa'
const fn1 = (str, obj) => {
  let res = '';
  let flag = false;
  let start;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '{') {
      flag = true;
      start = i + 1;
      continue;
    }
    if (!flag) res += str[i];
    else {
      if (str[i] === '}') {
        flag = false;
        res += match(str.slice(start, i, obj));
      }
    }
  }
  return res;
};

const match = (str, obj) => {
  const keys = str.split('.').slice(1);
  let o = obj;
  keys.forEach((key) => {
    if (!obj[key]) {
      return `{${str}}`;
    }
    o = o[key];
  });
  return o;
};
