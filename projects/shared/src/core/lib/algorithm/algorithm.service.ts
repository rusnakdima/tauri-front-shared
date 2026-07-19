import { Injectable, inject } from "@angular/core";
import { InvokeWrapperService } from "../../../core-api/invoke-wrapper.service";

export interface SortOptions {
  field?: string;
  direction?: "asc" | "desc";
}

export interface SearchOptions {
  query: string;
  fields?: string[];
  limit?: number;
  offset?: number;
}

export interface PaginateOptions {
  page: number;
  pageSize: number;
}

export interface GraphNode {
  id: string;
  edges?: Array<{ node: string; weight: number }>;
}

export interface Graph {
  nodes: Record<string, GraphNode>;
  directed?: boolean;
}

export interface DijkstraResult {
  path: string[];
  distance: number;
  visited: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

/**
 * AlgorithmService provides TypeScript implementations of common algorithms
 * and delegates complex or Rust-optimized variants to the backend via invoke.
 */
@Injectable({ providedIn: "root" })
export class AlgorithmService {
  private invoke = inject(InvokeWrapperService);

  // -------------------------------------------------------------------------
  // Core execute + list
  // -------------------------------------------------------------------------

  /**
   * Execute a named algorithm on the backend via the algorithm registry.
   */
  async execute<T>(name: string, input: unknown): Promise<T> {
    return this.invoke.invoke<T>("execute_algorithm", { name, input });
  }

  /**
   * List all available algorithm names registered in the backend.
   */
  async list(): Promise<string[]> {
    return this.invoke.invoke<string[]>("list_algorithms");
  }

  // -------------------------------------------------------------------------
  // Sorting algorithms
  // -------------------------------------------------------------------------

  /**
   * Bubble sort - O(n²), stable, in-place.
   * Best for: small arrays, nearly sorted data, educational purposes.
   */
  async sortBubble<T>(items: T[], field?: string): Promise<T[]> {
    const input = field ? { data: items, field, order: 'asc' } : { data: items, order: 'asc' };
    return this.execute<T[]>("sort.bubble", input);
  }

  /**
   * Insertion sort - O(n²), stable, efficient for small/nearly sorted arrays.
   * Best for: small datasets, online sorting (elements arrive incrementally).
   */
  async sortInsertion<T>(items: T[], field?: string): Promise<T[]> {
    const input = field ? { data: items, field, order: 'asc' } : { data: items, order: 'asc' };
    return this.execute<T[]>("sort.insertion", input);
  }

  /**
   * Merge sort - O(n log n), stable, not in-place.
   * Best for: large datasets, guaranteed O(n log n) performance, external sorting.
   */
  async sortMerge<T>(items: T[], field?: string): Promise<T[]> {
    const input = field ? { data: items, field, order: 'asc' } : { data: items, order: 'asc' };
    return this.execute<T[]>("sort.merge", input);
  }

  /**
   * Quick sort - O(n log n) average, O(n²) worst, not stable, in-place.
   * Best for: large datasets, general-purpose sorting, when average performance matters.
   */
  async sortQuick<T>(items: T[], field?: string): Promise<T[]> {
    const input = field ? { data: items, field, order: 'asc' } : { data: items, order: 'asc' };
    return this.execute<T[]>("sort.quick", input);
  }

  // -------------------------------------------------------------------------
  // Search algorithms
  // -------------------------------------------------------------------------

  /**
   * Full-text search across schema entities.
   */
  async searchSchemas(query: string, limit = 20): Promise<unknown[]> {
    return this.execute<unknown[]>("search.schemas", { query, limit });
  }

  /**
   * Paginate a list of items.
   */
  async paginate<T>(items: T[], page: number, pageSize: number): Promise<{ items: T[]; total: number; page: number; pageSize: number }> {
    return this.execute<{ items: T[]; total: number; page: number; pageSize: number }>(
      "search.paginate",
      { items, page, pageSize },
    );
  }

  /**
   * General search with query string across specified fields.
   */
  async search<T>(items: T[], query: string, fields: string[]): Promise<T[]> {
    return this.execute<T[]>("search.schemas", { items, query, fields });
  }

  // -------------------------------------------------------------------------
  // Graph algorithms
  // -------------------------------------------------------------------------

  /**
   * Dijkstra's shortest path algorithm.
   * Returns path, total distance, and visited nodes.
   */
  async dijkstra(graph: Graph, source: string, target: string): Promise<DijkstraResult> {
    // Convert Graph format to Rust format
    const nodeIds = Object.keys(graph.nodes);
    const edges: { from: string; to: string; weight: number }[] = [];
    nodeIds.forEach(nodeId => {
      const node = graph.nodes[nodeId];
      (node.edges || []).forEach(edge => {
        edges.push({ from: nodeId, to: edge.node, weight: edge.weight });
      });
    });
    return this.execute<DijkstraResult>("graph.dijkstra", {
      nodes: nodeIds,
      edges,
      start: source,
      end: target,
    });
  }

  /**
   * Breadth-first search - explores nodes level by level.
   * Returns all reachable nodes in breadth-first order.
   */
  async bfs(graph: Graph, source: string): Promise<string[]> {
    // BFS is not in the Rust registry, use local implementation
    return Promise.resolve(this.bfsLocal(graph, source));
  }

  /**
   * Depth-first search - explores as far as possible along each branch.
   * Returns all reachable nodes in depth-first order.
   */
  async dfs(graph: Graph, source: string): Promise<string[]> {
    // DFS is not in the Rust registry, use local implementation
    return Promise.resolve(this.dfsLocal(graph, source));
  }

  /**
   * Topological sort for directed acyclic graphs.
   */
  async topologicalSort(graph: Graph): Promise<string[]> {
    // Topological sort is not in the Rust registry, use local implementation
    return Promise.resolve(this.topologicalSortLocal(graph));
  }

  // -------------------------------------------------------------------------
  // Validation algorithms
  // -------------------------------------------------------------------------

  /**
   * Validate an email address.
   */
  async validateEmail(email: string): Promise<ValidationResult> {
    return this.execute<ValidationResult>("validate.email", { email });
  }

  /**
   * Validate input against a set of rules.
   */
  async validateInput(value: unknown, rules: Record<string, unknown>): Promise<ValidationResult> {
    return this.execute<ValidationResult>("validate.input", { value, rules });
  }

  /**
   * Sanitize input by stripping dangerous characters/patterns.
   */
  async sanitize(input: string): Promise<string> {
    return this.execute<string>("validate.sanitize", { input });
  }

  // -------------------------------------------------------------------------
  // Tree algorithms
  // -------------------------------------------------------------------------

  /**
   * Build a tree structure from a flat list with parent references.
   */
  async buildTree<T extends { id: string; parentId?: string }>(items: T[]): Promise<T[]> {
    // Tree algorithms not in Rust registry, use local implementation
    return Promise.resolve(this.buildTreeLocal(items));
  }

  /**
   * Flatten a tree structure back into a list.
   */
  async flattenTree<T>(tree: T[]): Promise<T[]> {
    // Tree algorithms not in Rust registry, use local implementation
    return Promise.resolve(this.flattenTreeLocal(tree));
  }

  // -------------------------------------------------------------------------
  // Local (TypeScript-only) algorithm helpers
  // -------------------------------------------------------------------------

  private compareFieldValues(a: unknown, b: unknown): number {
    if (typeof a === "number" && typeof b === "number") return a - b;
    if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
    return 0;
  }

  /**
   * Local bubble sort implementation for small datasets.
   */
  sortBubbleLocal<T>(items: T[], getField: (item: T) => unknown): T[] {
    const arr = [...items];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (this.compareFieldValues(getField(arr[j]), getField(arr[j + 1])) > 0) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }

  /**
   * Local insertion sort implementation.
   */
  sortInsertionLocal<T>(items: T[], getField: (item: T) => unknown): T[] {
    const arr = [...items];
    for (let i = 1; i < arr.length; i++) {
      const current = arr[i];
      let j = i - 1;
      while (j >= 0 && this.compareFieldValues(getField(arr[j]), getField(current)) > 0) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = current;
    }
    return arr;
  }

  /**
   * Local merge sort implementation.
   */
  sortMergeLocal<T>(items: T[], getField: (item: T) => unknown): T[] {
    if (items.length <= 1) return items;
    const mid = Math.floor(items.length / 2);
    const left = this.sortMergeLocal(items.slice(0, mid), getField);
    const right = this.sortMergeLocal(items.slice(mid), getField);
    return this.mergeLocal(left, right, getField);
  }

  private mergeLocal<T>(left: T[], right: T[], getField: (item: T) => unknown): T[] {
    const result: T[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      if (this.compareFieldValues(getField(left[i]), getField(right[j])) <= 0) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  }

  /**
   * Local quick sort implementation.
   */
  sortQuickLocal<T>(items: T[], getField: (item: T) => unknown): T[] {
    if (items.length <= 1) return items;
    const pivot = items[Math.floor(items.length / 2)];
    const pivotVal = getField(pivot);
    const left = items.filter((item) => this.compareFieldValues(getField(item), pivotVal) < 0);
    const middle = items.filter((item) => this.compareFieldValues(getField(item), pivotVal) === 0);
    const right = items.filter((item) => this.compareFieldValues(getField(item), pivotVal) > 0);
    return [...this.sortQuickLocal(left, getField), ...middle, ...this.sortQuickLocal(right, getField)];
  }

  /**
   * Local Dijkstra implementation for simple graphs.
   */
  dijkstraLocal(graph: Graph, source: string, target: string): DijkstraResult {
    const distances: Record<string, number> = {};
    const previous: Record<string, string | null> = {};
    const visited = new Set<string>();
    const queue: Array<{ node: string; distance: number }> = [];

    for (const nodeId of Object.keys(graph.nodes)) {
      distances[nodeId] = nodeId === source ? 0 : Infinity;
      previous[nodeId] = null;
      queue.push({ node: nodeId, distance: distances[nodeId] });
    }

    while (queue.length > 0) {
      queue.sort((a, b) => a.distance - b.distance);
      const { node: current } = queue.shift()!;

      if (visited.has(current)) continue;
      visited.add(current);

      if (current === target) break;

      const edges = graph.nodes[current]?.edges || [];
      for (const edge of edges) {
        const alt = distances[current] + edge.weight;
        if (alt < distances[edge.node]) {
          distances[edge.node] = alt;
          previous[edge.node] = current;
          const idx = queue.findIndex((q) => q.node === edge.node);
          if (idx >= 0) queue[idx].distance = alt;
          else queue.push({ node: edge.node, distance: alt });
        }
      }
    }

    const path: string[] = [];
    let current: string | null = target;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    return {
      path: previous[target] !== null ? path : [],
      distance: distances[target] ?? Infinity,
      visited: Array.from(visited),
    };
  }

  /**
   * Local BFS implementation.
   */
  bfsLocal(graph: Graph, source: string): string[] {
    const visited = new Set<string>();
    const result: string[] = [];
    const queue: string[] = [source];

    while (queue.length > 0) {
      const node = queue.shift()!;
      if (visited.has(node)) continue;
      visited.add(node);
      result.push(node);

      const edges = graph.nodes[node]?.edges || [];
      for (const edge of edges) {
        if (!visited.has(edge.node)) {
          queue.push(edge.node);
        }
      }
    }
    return result;
  }

  /**
   * Local DFS implementation.
   */
  dfsLocal(graph: Graph, source: string): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    const dfs = (node: string) => {
      visited.add(node);
      result.push(node);
      const edges = graph.nodes[node]?.edges || [];
      for (const edge of edges) {
        if (!visited.has(edge.node)) {
          dfs(edge.node);
        }
      }
    };

    dfs(source);
    return result;
  }

  /**
   * Local email validation.
   */
  validateEmailLocal(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    return { valid, errors: valid ? undefined : ["Invalid email format"] };
  }

  /**
   * Local input sanitization - strips HTML tags and trim whitespace.
   */
  sanitizeLocal(input: string): string {
    return input
      .replace(/<[^>]*>/g, "")
      .replace(/&[^;]+;/g, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  /**
   * Local tree build implementation.
   */
  private buildTreeLocal<T extends { id: string; parentId?: string }>(items: T[]): T[] {
    const map = new Map<string, T & { children?: T[] }>();
    const roots: (T & { children?: T[] })[] = [];

    items.forEach(item => {
      map.set(item.id, { ...item, children: [] });
    });

    items.forEach(item => {
      const node = map.get(item.id)!;
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId)!.children!.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots as T[];
  }

  /**
   * Local tree flatten implementation.
   */
  private flattenTreeLocal<T>(tree: T[]): T[] {
    const result: T[] = [];
    const flatten = (nodes: T[]) => {
      nodes.forEach(node => {
        result.push(node);
        if ((node as unknown as { children?: T[] }).children) {
          flatten((node as unknown as { children: T[] }).children);
        }
      });
    };
    flatten(tree);
    return result;
  }

  /**
   * Local topological sort implementation.
   */
  private topologicalSortLocal(graph: Graph): string[] {
    const visited = new Set<string>();
    const result: string[] = [];
    const inDegree: Record<string, number> = {};

    Object.keys(graph.nodes).forEach(nodeId => {
      inDegree[nodeId] = 0;
    });

    Object.values(graph.nodes).forEach(node => {
      (node.edges || []).forEach(edge => {
        inDegree[edge.node] = (inDegree[edge.node] || 0) + 1;
      });
    });

    const queue: string[] = [];
    Object.keys(inDegree).forEach(nodeId => {
      if (inDegree[nodeId] === 0) queue.push(nodeId);
    });

    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      result.push(nodeId);
      visited.add(nodeId);

      (graph.nodes[nodeId]?.edges || []).forEach(edge => {
        inDegree[edge.node]--;
        if (inDegree[edge.node] === 0 && !visited.has(edge.node)) {
          queue.push(edge.node);
        }
      });
    }

    return result;
  }
}
