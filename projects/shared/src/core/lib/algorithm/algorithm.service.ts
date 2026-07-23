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

  /**
   * Get all algorithms available for a specific domain.
   */
  async listByDomain(domain: string): Promise<string[]> {
    const all = await this.list();
    return all.filter(name => name.startsWith(domain + '.'));
  }

  /**
   * Get algorithm metadata (input/output schema hints).
   */
  async getAlgorithmMeta(name: string): Promise<{ name: string; domain: string } | null> {
    const all = await this.list();
    if (!all.includes(name)) {
      return null;
    }
    const dotIndex = name.indexOf('.');
    const domain = dotIndex > 0 ? name.substring(0, dotIndex) : 'core';
    return { name, domain };
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
    const nodeIds = Object.keys(graph.nodes);
    const edges: { from: string; to: string; weight: number }[] = [];
    nodeIds.forEach(nodeId => {
      const node = graph.nodes[nodeId];
      (node.edges || []).forEach(edge => {
        edges.push({ from: nodeId, to: edge.node, weight: edge.weight });
      });
    });
    return this.execute<string[]>("graph.bfs", {
      nodes: nodeIds.map(id => ({ id, data: graph.nodes[id] })),
      edges,
      start: source,
    });
  }

  /**
   * Depth-first search - explores as far as possible along each branch.
   * Returns all reachable nodes in depth-first order.
   */
  async dfs(graph: Graph, source: string): Promise<string[]> {
    const nodeIds = Object.keys(graph.nodes);
    const edges: { from: string; to: string; weight: number }[] = [];
    nodeIds.forEach(nodeId => {
      const node = graph.nodes[nodeId];
      (node.edges || []).forEach(edge => {
        edges.push({ from: nodeId, to: edge.node, weight: edge.weight });
      });
    });
    return this.execute<string[]>("graph.dfs", {
      nodes: nodeIds.map(id => ({ id, data: graph.nodes[id] })),
      edges,
      start: source,
    });
  }

  /**
   * Topological sort for directed acyclic graphs.
   */
  async topologicalSort(graph: Graph): Promise<string[]> {
    const nodeIds = Object.keys(graph.nodes);
    const edges: { from: string; to: string; weight: number }[] = [];
    nodeIds.forEach(nodeId => {
      const node = graph.nodes[nodeId];
      (node.edges || []).forEach(edge => {
        edges.push({ from: nodeId, to: edge.node, weight: edge.weight });
      });
    });
    return this.execute<string[]>("graph.topological_sort", {
      nodes: nodeIds.map(id => ({ id, data: graph.nodes[id] })),
      edges,
    });
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
    return this.execute<T[]>("tree.build", items);
  }

  /**
   * Flatten a tree structure back into a list.
   */
  async flattenTree<T>(tree: T[]): Promise<T[]> {
    return this.execute<T[]>("tree.flatten", tree);
  }

}
