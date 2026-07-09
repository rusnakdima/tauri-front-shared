/**
 * Graph algorithms.
 */

export interface GraphNode<T = unknown> {
  id: string;
  data?: T;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface Graph<T = unknown> {
  nodes: Map<string, GraphNode<T>>;
  adjacency: Map<string, Array<{ to: string; weight: number }>>;
}

export function createGraph<T = unknown>(): Graph<T> {
  return { nodes: new Map(), adjacency: new Map() };
}

export function addNode<T>(g: Graph<T>, node: GraphNode<T>): void {
  g.nodes.set(node.id, node);
  if (!g.adjacency.has(node.id)) g.adjacency.set(node.id, []);
}

export function addEdge(g: Graph, edge: GraphEdge, directed = false): void {
  const weight = edge.weight ?? 1;
  g.adjacency.get(edge.from)?.push({ to: edge.to, weight });
  if (!directed) {
    if (!g.adjacency.has(edge.to)) g.adjacency.set(edge.to, []);
    g.adjacency.get(edge.to)!.push({ to: edge.from, weight });
  }
}

export function bfs(g: Graph, start: string): string[] {
  const visited = new Set<string>([start]);
  const order: string[] = [];
  const queue: string[] = [start];
  while (queue.length) {
    const node = queue.shift()!;
    order.push(node);
    for (const { to } of g.adjacency.get(node) ?? []) {
      if (!visited.has(to)) {
        visited.add(to);
        queue.push(to);
      }
    }
  }
  return order;
}

export function dfs(g: Graph, start: string): string[] {
  const visited = new Set<string>();
  const order: string[] = [];
  const visit = (n: string) => {
    visited.add(n);
    order.push(n);
    for (const { to } of g.adjacency.get(n) ?? []) {
      if (!visited.has(to)) visit(to);
    }
  };
  visit(start);
  return order;
}

/** Dijkstra's shortest path. Returns map of node id → distance from start. */
export function dijkstra(g: Graph, start: string): Map<string, number> {
  const dist = new Map<string, number>();
  for (const id of g.nodes.keys()) dist.set(id, Infinity);
  dist.set(start, 0);
  const visited = new Set<string>();
  while (visited.size < g.nodes.size) {
    let u: string | null = null;
    let min = Infinity;
    for (const [id, d] of dist) {
      if (!visited.has(id) && d < min) {
        min = d;
        u = id;
      }
    }
    if (u === null) break;
    visited.add(u);
    for (const { to, weight } of g.adjacency.get(u) ?? []) {
      const alt = min + weight;
      if (alt < (dist.get(to) ?? Infinity)) dist.set(to, alt);
    }
  }
  return dist;
}

/** Topological sort via Kahn's algorithm. Returns null if the graph has a cycle. */
export function topologicalSort(g: Graph): string[] | null {
  const inDegree = new Map<string, number>();
  for (const id of g.nodes.keys()) inDegree.set(id, 0);
  for (const [, edges] of g.adjacency) {
    for (const { to } of edges) inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
  }
  const queue: string[] = [];
  for (const [id, d] of inDegree) if (d === 0) queue.push(id);
  const order: string[] = [];
  while (queue.length) {
    const n = queue.shift()!;
    order.push(n);
    for (const { to } of g.adjacency.get(n) ?? []) {
      const d = (inDegree.get(to) ?? 0) - 1;
      inDegree.set(to, d);
      if (d === 0) queue.push(to);
    }
  }
  return order.length === g.nodes.size ? order : null;
}

export function hasCycle(g: Graph): boolean {
  return topologicalSort(g) === null;
}
