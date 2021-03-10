// 遍历二叉树所有节点，返回他们的和
function run(tree) {
  if (!tree) return 0;
  return tree.val + run(tree.left) + run(tree.right);
}
