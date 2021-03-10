// 一、判断一个链表是否有环
// 1。快慢指针
const hasCycle = (head) => {
  if (!head || !head.next) {
    return false;
  }
  let fast = head.next.next;
  let slow = head.next;
  while (fast !== slow) {
    if (!fast || !fast.next) return false;
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
};
