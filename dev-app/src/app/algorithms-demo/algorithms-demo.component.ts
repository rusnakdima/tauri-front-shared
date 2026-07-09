import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  levenshtein,
  hamming,
  jaroWinkler,
  isPalindrome,
  primesUpTo,
  gcd,
  lcm,
  fibonacci,
  factorial,
  power,
  mean,
  median,
  stddev,
  binarySearch,
  linearSearch,
  bfs,
  dfs,
  dijkstra,
  createGraph,
  addNode,
  addEdge,
  walkPreorder,
  walkLevelOrder,
  treeDepth,
  flattenTree,
  dedupe,
  groupBy,
  chunk,
  intersection,
  union,
  difference,
} from "@tauri-front/shared";

interface DemoResult {
  label: string;
  result: string;
  ms: number;
}

@Component({
  selector: "app-algorithms-demo",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="algo-container">
      <h2 class="algo-title">Algorithm Demos</h2>
      <p class="algo-subtitle">Live execution of @tauri-front/shared algorithms</p>

      <div class="algo-grid">
        @for (demo of demos(); track demo.label) {
          <div class="algo-card">
            <div class="algo-label">{{ demo.label }}</div>
            <div class="algo-result">{{ demo.result }}</div>
            <div class="algo-time">{{ demo.ms }}ms</div>
          </div>
        }
      </div>

      <button class="run-btn" (click)="runAll()">▶ Run All</button>
    </div>
  `,
  styles: [`
    .algo-container { padding: 1.5rem; }
    .algo-title { font-size: 1.5rem; font-weight: 700; margin: 0 0 0.25rem; color: var(--text-primary, #1f2937); }
    .algo-subtitle { color: var(--text-muted, #6b7280); margin: 0 0 1.5rem; }
    .algo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 0.75rem;
      margin-bottom: 1.5rem;
    }
    .algo-card {
      padding: 1rem;
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 0.5rem;
      background: var(--bg-elevated, #ffffff);
    }
    .algo-label {
      font-size: 0.6875rem; font-weight: 600; text-transform: uppercase;
      color: var(--text-muted, #6b7280); margin-bottom: 0.5rem;
      letter-spacing: 0.05em;
    }
    .algo-result {
      font-family: "JetBrains Mono", monospace; font-size: 0.875rem;
      color: var(--text-primary, #1f2937);
      word-break: break-word; line-height: 1.4;
      max-height: 80px; overflow: auto;
    }
    .algo-time {
      margin-top: 0.5rem; font-size: 0.6875rem;
      color: var(--accent, #3b82f6); font-weight: 600;
    }
    .run-btn {
      padding: 0.625rem 1.25rem; border-radius: 0.5rem;
      border: 1px solid var(--accent, #3b82f6);
      background: var(--accent, #3b82f6);
      color: #ffffff; font-weight: 600; cursor: pointer;
      transition: all 0.15s;
    }
    .run-btn:hover { opacity: 0.9; }
  `],
})
export class AlgorithmsDemoComponent {
  readonly demos = signal<DemoResult[]>([]);

  constructor() { this.runAll(); }

  runAll() {
    const t = (fn: () => unknown) => {
      const start = performance.now();
      try {
        const result = fn();
        return { result: this.fmt(result), ms: Math.round((performance.now() - start) * 100) / 100 };
      } catch (e) {
        return { result: `Error: ${(e as Error).message}`, ms: 0 };
      }
    };

    const r: DemoResult[] = [
      { label: "levenshtein(\"kitten\", \"sitting\")", ...t(() => levenshtein("kitten", "sitting")) },
      { label: "hamming(\"karolin\", \"kathrin\")", ...t(() => hamming("karolin", "kathrin")) },
      { label: "jaroWinkler(\"martha\", \"marhta\")", ...t(() => jaroWinkler("martha", "marhta").toFixed(4)) },
      { label: "isPalindrome(\"racecar\")", ...t(() => isPalindrome("racecar")) },
      { label: "primesUpTo(50)", ...t(() => primesUpTo(50)) },
      { label: "gcd(48, 36)", ...t(() => gcd(48, 36)) },
      { label: "lcm(4, 6)", ...t(() => lcm(4, 6)) },
      { label: "factorial(10)", ...t(() => factorial(10)) },
      { label: "fibonacci(20)", ...t(() => fibonacci(20)) },
      { label: "power(2, 16)", ...t(() => power(2, 16)) },
      { label: "mean([1,2,3,4,5])", ...t(() => mean([1, 2, 3, 4, 5])) },
      { label: "median([1,5,3,2,4])", ...t(() => median([1, 5, 3, 2, 4])) },
      { label: "stddev([1,2,3,4,5])", ...t(() => stddev([1, 2, 3, 4, 5]).toFixed(3)) },
      { label: "binarySearch([1..10], 7)", ...t(() => binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)) },
      { label: "linearSearch(['a','b','c'], 'c')", ...t(() => linearSearch(["a", "b", "c"], (x: string) => x === "c")) },
      { label: "sort([3,1,4,1,5,9,2,6]) (native)", ...t(() => [...[3, 1, 4, 1, 5, 9, 2, 6]].sort((a, b) => a - b)) },
      { label: "dedupe([1,2,2,3,3,3])", ...t(() => dedupe([1, 2, 2, 3, 3, 3])) },
      { label: "groupBy([1,2,3,4], n%2)", ...t(() => Array.from(groupBy([1, 2, 3, 4], (n: number) => n % 2 === 0 ? "even" : "odd").entries())) },
      { label: "chunk([1..7], 3)", ...t(() => chunk([1, 2, 3, 4, 5, 6, 7], 3)) },
      { label: "intersection([1,2,3], [2,3,4])", ...t(() => intersection([1, 2, 3], [2, 3, 4])) },
      { label: "union([1,2], [2,3])", ...t(() => union([1, 2], [2, 3])) },
      { label: "difference([1,2,3], [2])", ...t(() => difference([1, 2, 3], [2])) },
      { label: "graph bfs (A->B->C->D)", ...t(() => {
        const g = createGraph<string>();
        addNode(g, { id: "A" }); addNode(g, { id: "B" }); addNode(g, { id: "C" }); addNode(g, { id: "D" });
        addEdge(g, { from: "A", to: "B" }); addEdge(g, { from: "B", to: "C" }); addEdge(g, { from: "C", to: "D" });
        return bfs(g, "A");
      }) },
      { label: "graph dfs (A->B->C->D)", ...t(() => {
        const g = createGraph<string>();
        addNode(g, { id: "A" }); addNode(g, { id: "B" }); addNode(g, { id: "C" }); addNode(g, { id: "D" });
        addEdge(g, { from: "A", to: "B" }); addEdge(g, { from: "B", to: "C" }); addEdge(g, { from: "C", to: "D" });
        return dfs(g, "A");
      }) },
      { label: "dijkstra (4-node weighted)", ...t(() => {
        const g = createGraph();
        addNode(g, { id: "A" }); addNode(g, { id: "B" }); addNode(g, { id: "C" }); addNode(g, { id: "D" });
        addEdge(g, { from: "A", to: "B", weight: 1 }); addEdge(g, { from: "A", to: "C", weight: 4 });
        addEdge(g, { from: "B", to: "C", weight: 2 }); addEdge(g, { from: "B", to: "D", weight: 5 });
        addEdge(g, { from: "C", to: "D", weight: 1 });
        return Array.from(dijkstra(g, "A").entries());
      }) },
      { label: "tree walkPreorder", ...t(() => {
        const tree = { id: "root", children: [{ id: "a", children: [{ id: "a1" }, { id: "a2" }] }, { id: "b" }] };
        const order: string[] = [];
        walkPreorder(tree, (n) => order.push(n.id));
        return order;
      }) },
      { label: "tree walkLevelOrder", ...t(() => {
        const tree = { id: "root", children: [{ id: "a", children: [{ id: "a1" }, { id: "a2" }] }, { id: "b" }] };
        const order: string[] = [];
        walkLevelOrder(tree, (n) => order.push(n.id));
        return order;
      }) },
      { label: "treeDepth", ...t(() => {
        const tree = { id: "root", children: [{ id: "a", children: [{ id: "a1", children: [{ id: "a1a" }] }] }] };
        return treeDepth(tree);
      }) },
      { label: "flattenTree", ...t(() => {
        const tree = { id: "root", children: [{ id: "a", children: [{ id: "a1" }] }, { id: "b" }] };
        return flattenTree(tree).map((n) => n.id);
      }) },
    ];
    this.demos.set(r);
  }

  private fmt(v: unknown): string {
    if (Array.isArray(v)) return JSON.stringify(v);
    if (typeof v === "number") return String(v);
    return String(v);
  }
}
