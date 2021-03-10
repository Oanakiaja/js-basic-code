// 迭代binarySearch
const nums = [-1, 0, 3, 5, 9, 12];
function binarySearchWhile(arr, num, start, end) {
  start = start ? start : 0;
  end = end ? end : arr.length - 1;
  while (start <= end) {
    let mid = Math.floor(start + (end - start) / 2);
    if (arr[mid] === num) {
      return mid;
    }
    if (arr[mid] < num) {
      // 从小到大排序
      start = mid + 1;
      continue;
    }
    end = mid - 1;
  }
  return null;
}
console.log(binarySearchWhile(nums, 0));

// 递归binarySearch
function binarySearchRecursion(arr, num) {
  const mid = Math.floor(arr.length / 2);
  if (arr[mid] === num) return mid;
  if (arr[mid] < num)
    return binarySearchRecursion(arr.slice(mid + 1, arr.length), num);
  return binarySearchRecursion(arr.slice(0, mid), num);
}

console.log(binarySearchRecursion(nums, 0));
// 记录有多少个数字, arr = [1,2,32,12,312,3,12,31,1,1,1,1,1,1] 中有多少个1
const bigArr = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  0,
  0,
  0,
  0,
  01,
  23,
  123,
  1,
  1,
  1,
  1,
  213,
  123,
  123,
  12,
  1,
  1,
  1,
  1,
  1,
  1,
  123,
  231,
  5,
];
(function (arr, num) {
  let count = 0;
  for (n of arr) {
    if (n === num) count++;
  }
  console.log(count);
})(bigArr, 1);
function numberCount(arr, num) {
  const mid = Math.floor(arr.length / 2);
  if (!arr.length) return 0;
  return (
    numberCount(arr.slice(0, mid), num) +
    numberCount(arr.slice(mid + 1, arr.length), num) +
    (arr[mid] === num ? 1 : 0)
  );
}
console.log(numberCount(bigArr, 1));
