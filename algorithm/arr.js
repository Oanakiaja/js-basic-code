// 一、连续元素组成子串和的最大值
let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]; //6
function maxSubStr(arr) {
  let max = 0;
  let sum = 0;
  for (i of arr) {
    sum += i;
    if (sum < 0) {
      sum = 0;
    } else {
      if (max < sum) {
        max = sum;
      }
    }
  }
  return max;
}
console.log(maxSubStr(arr));

// 2、输入 ['1.1.1.1.1.1', '6', '5.4.3', '2.3.1', '2.3.1.1']
// 返回从大到小的版本号数组
function getSubVersion(str) {
  const substr = str.split('.').slice(1).join('.');
  return substr;
}
function getHeadVersion(str) {
  const matchRes = str.match(/^(\d+).?/g);
  if (matchRes) {
    return matchRes[0].splice(-1, 1);
  }
  return null;
}
function sortVersion(arr) {
  const sortArr = [];
  for (str of arr) {
  }
}

// 3、数组去重
arr = [1, 2, 2, '1', 'test'];
// time O(n)
function getSetO1(arr) {
  const hash = new Map();
  arr.forEach((val) => {
    if (!hash.has(val)) {
      hash.set(val, true); //这里也可以换成obj
    }
  });
  return [...hash.keys()];
}
console.log(getSetO1(arr));
// time O(n2)
function getSetO2(arr) {
  return arr.filter((val, index) => arr.indexOf(val) === index);
}
console.log(getSetO2(arr));
