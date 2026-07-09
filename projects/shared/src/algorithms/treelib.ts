/**
 * Tree algorithms.
 */

export interface TreeNode<T = unknown> {
  id: string;
  data?: T;
  children?: TreeNode<T>[];
}

export function walkPreorder<T>(
  node: TreeNode<T>,
  fn: (n: TreeNode<T>) => void,
): void {
  fn(node);
  for (const child of node.children ?? []) walkPreorder(child, fn);
}

export function walkInorder<T>(
  node: TreeNode<T>,
  fn: (n: TreeNode<T>) => void,
): void {
  const children = node.children ?? [];
  const mid = children.length >> 1;
  for (let i = 0; i < mid; i++) walkInorder(children[i], fn);
  fn(node);
  for (let i = mid; i < children.length; i++) walkInorder(children[i], fn);
}

export function walkPostorder<T>(
  node: TreeNode<T>,
  fn: (n: TreeNode<T>) => void,
): void {
  for (const child of node.children ?? []) walkPostorder(child, fn);
  fn(node);
}

export function walkLevelOrder<T>(
  node: TreeNode<T>,
  fn: (n: TreeNode<T>, level: number) => void,
): void {
  const queue: Array<{ node: TreeNode<T>; level: number }> = [
    { node, level: 0 },
  ];
  while (queue.length) {
    const { node: n, level } = queue.shift()!;
    fn(n, level);
    for (const c of n.children ?? []) queue.push({ node: c, level: level + 1 });
  }
}

export function findNode<T>(node: TreeNode<T>, id: string): TreeNode<T> | null {
  if (node.id === id) return node;
  for (const child of node.children ?? []) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

export function treeDepth<T>(node: TreeNode<T>): number {
  if (!node.children || node.children.length === 0) return 0;
  let max = 0;
  for (const c of node.children) {
    const d = treeDepth(c);
    if (d > max) max = d;
  }
  return max + 1;
}

export function flattenTree<T>(node: TreeNode<T>): TreeNode<T>[] {
  const out: TreeNode<T>[] = [];
  walkPreorder(node, (n) => out.push(n));
  return out;
}
