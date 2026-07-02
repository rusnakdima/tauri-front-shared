export interface GraphEdge {
  node: string;
  weight: number;
}

export type Graph = Map<string, GraphEdge[]>;

export function createGraph(): Graph {
  return new Map();
}

export function addNode(graph: Graph, label: string): void {
  if (!graph.has(label)) {
    graph.set(label, []);
  }
}

export function addEdge(graph: Graph, from: string, to: string, weight: number): void {
  addNode(graph, from);
  addNode(graph, to);
  const edges = graph.get(from)!;
  edges.push({ node: to, weight });
}

export function dijkstra(
  graph: Graph,
  start: string
): Map<string, number | null> {
  const distances = new Map<string, number | null>();
  const visited = new Set<string>();
  const queue: Array<{ node: string; distance: number }> = [];

  for (const node of graph.keys()) {
    distances.set(node, null);
  }
  distances.set(start, 0);
  queue.push({ node: start, distance: 0 });

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const { node: current, distance: currentDist } = queue.shift()!;

    if (visited.has(current)) continue;
    visited.add(current);

    const edges = graph.get(current) || [];
    for (const edge of edges) {
      if (visited.has(edge.node)) continue;
      const newDist = currentDist + edge.weight;
      const existing = distances.get(edge.node);
      if (existing === null || newDist < existing) {
        distances.set(edge.node, newDist);
        queue.push({ node: edge.node, distance: newDist });
      }
    }
  }

  return distances;
}
