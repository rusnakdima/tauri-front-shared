# @tauri-front/shared — API Reference

Auto-generated from source. For usage documentation, see [README.md](./README.md).

---

## Exports Index

### Services

| Export                       | Source                      | Description                                        |
| ---------------------------- | --------------------------- | -------------------------------------------------- |
| `SchemaRendererService`      | `core/lib/schema-renderer/` | Parses `UiSchema`, resolves components, binds data |
| `SchemaRouterService`        | `core/lib/schema-router/`   | Route management within a schema                   |
| `SchemaFetcherService`       | `core/lib/schema-fetcher/`  | Loads schema from Tauri backend                    |
| `ComponentRegistryService`   | `core/lib/`                 | Registers/resolves component selectors             |
| `LayoutEngineService`        | `core/lib/schema-renderer/` | Grid layout computation                            |
| `DataBindingResolverService` | `core/lib/schema-renderer/` | Resolves `{{ expression }}` bindings               |
| `SignalStoreService`         | `core/lib/signal-store/`    | Signal-based reactive store                        |
| `SignalSyncService`          | `core/lib/signal-sync/`     | Cross-component signal synchronization             |
| `SignalLoggerService`        | `core/lib/signal-logger/`   | Signal change logging                              |
| `DataPatchService`           | `core/lib/data-patch/`      | Immutable deep-patch operations                    |
| `ToastService`               | `core/lib/toast/`           | Toast notification display                         |
| `EventBusService`            | `core/lib/events/`          | Pub/sub application events                         |
| `ShortcutService`            | `core/lib/shortcuts/`       | Global keyboard shortcut registration              |
| `PermissionService`          | `core/lib/rbac/`            | RBAC permission evaluation                         |
| `I18nService`                | `core/lib/i18n/`            | Internationalization                               |
| `GlobalStateService`         | `core/lib/global-state/`    | App-wide state management                          |
| `ErrorHandlerService`        | `core/lib/error-handler/`   | Error capture + retry                              |
| `InvokeWrapperService`       | `core-api/`                 | Tauri invoke wrapper with retry                    |
| `RemoteCrudService`          | `core-crud/`                | CRUD operations over Tauri invoke                  |
| `StorageService`             | `storage/`                  | Key/value + JSON storage                           |
| `UnifiedStorageService`      | `core-storage/`             | Key/value + query storage                          |
| `SchemaShellComponent`       | `core/lib/schema-router/`   | Standalone SDUI shell component                    |
| `SchemaRouteViewerComponent` | `core/lib/schema-router/`   | Renders current route's schema                     |
| `SchemaElementComponent`     | `core/lib/schema-router/`   | Renders a single schema element                    |
| `GuardService`               | `core/lib/schema-router/`   | Auth guard service                                 |

### Style System

| Export                                         | Type       | Description                                                                                                              |
| ---------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| `loadStyleVariant(variant)`                    | `function` | Load a style variant's CSS (async, idempotent)                                                                           |
| `setCurrentStyle(variant)`                     | `function` | Activate a loaded style variant                                                                                          |
| `getCurrentStyle()`                            | `function` | Returns current `StyleVariant` string                                                                                    |
| `getAllStyleVariants()`                        | `function` | Returns all `StyleVariantConfig[]`                                                                                       |
| `getStyleClassPrefix(variant)`                 | `function` | Returns prefix string (e.g. `"glass-"`)                                                                                  |
| `getComponentStyleClasses(component, variant)` | `function` | Returns CSS class string for component+variant                                                                           |
| `StyleThemeService`                            | `class`    | Dark mode toggle, theme loading, preference persistence                                                                  |
| `ThemeService`                                 | `class`    | Alias for `StyleThemeService`                                                                                            |
| `ThemeToggleService`                           | `class`    | Programmatic dark mode toggle                                                                                            |
| `StyleVariant`                                 | `type`     | `"material-design-v3"` \| `"glassmorphism"` \| `"neumorphism"` \| `"claymorphism"` \| `"brutalism"` \| `"skeuomorphism"` |

### Invoke / Tauri Commands

| Export                         | Signature                                                 | Description                              |
| ------------------------------ | --------------------------------------------------------- | ---------------------------------------- |
| `invokeCommand<T>`             | `(command, args?, options?) => Promise<CommandResult<T>>` | Generic command with optional retry      |
| `invokeCommandWithResponse<T>` | `(command, args?, options?) => Promise<Response<T>>`      | Typed Response wrapper                   |
| `invokeVoid`                   | `(command, args?) => Promise<void>`                       | Fire-and-forget                          |
| `invokeWithError<T>`           | `(command, args?, options?) => Promise<T>`                | Throws `AppError` on failure             |
| `InvokeOptionsWithRetry`       | `interface`                                               | `{ timeout?, retryCount?, retryDelay? }` |

### Response Types

```typescript
enum ResponseStatus {
  Success = "success",
  Created = "created",
  Updated = "updated",
  Deleted = "deleted",
  Error = "error",
  ValidationError = "validationError",
  NotFound = "notFound",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
}

interface Response<T = unknown> {
  status: ResponseStatus;
  message: string;
  data: T | null;
}

function isSuccess<T>(response: Response<T>): boolean;
function isError<T>(response: Response<T>): boolean;
function getErrorMessage<T>(response: Response<T>): string | null;
function unwrapResponse<T>(response: Response<T>): T; // throws if error
function mapResponse<U, T>(
  response: Response<T>,
  mapper: (data: T) => U,
): Response<U>;
```

### Error Types

```typescript
interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

function parseError(error: unknown): AppError;
function formatError(error: AppError): string;
```

### RBAC

```typescript
interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: "create" | "read" | "update" | "delete";
}

interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

// Directive usage in templates:
// <button *rbacHasPermission="'post:delete'">Delete</button>
// <div *rbacHasRole="'admin'">Admin Panel</div>
```

### Schema Types

```typescript
interface GridPosition {
  column?: number | string; // CSS grid-column
  row?: number | string; // CSS grid-row
  columnSpan?: number; // grid-column: span N
  rowSpan?: number; // grid-row: span N
}

interface ElementEvents {
  click?: string; // Data-binding expression
  change?: string;
  submit?: string;
  focus?: string;
  blur?: string;
  // ...any DOM event name
}

interface ComponentDef {
  type: string; // e.g. "app-button"
  properties?: Record<string, unknown>; // component @Input() values
  events?: ElementEvents;
  behaviors?: ComponentBehavior[];
  condition?: string; // show/hide expression
  repeat?: string; // repeat expression
}

interface LayoutElement extends ComponentDef {
  id: string;
  gridPosition?: GridPosition;
  children?: LayoutElement[];
  region?: RegionType;
}

type RegionType =
  | "header"
  | "sidebar-left"
  | "sidebar-right"
  | "content"
  | "footer"
  | "bottom-nav"
  | "overlay"
  | "other";

interface Layout {
  id: string;
  type: "grid" | "flex" | "stack";
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  gap?: number;
  regions?: LayoutRegion[];
}

interface Page {
  id: string;
  title: string;
  route: string;
  layout?: Layout;
  elements?: LayoutElement[];
  condition?: string;
}

interface UiSchema {
  pages: Page[];
  navigation?: NavigationItem[];
  theme?: ThemeConfig;
  globals?: Record<string, unknown>;
}

interface AppSchema {
  version: string;
  appId: string;
  ui: UiSchema;
  meta?: Record<string, unknown>;
}
```

### Algorithms

**Array**

```typescript
sortBy<T>(arr: T[], key: keyof T | number, order?: "asc" | "desc"): T[]
dedupe<T>(arr: T[]): T[]
chunk<T>(arr: T[], size: number): T[][]
partition<T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]]
flatten<T>(arr: (T | T[])[]): T[]
flattenTree<T>(arr: T[], childrenKey: string): T[]
groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>
difference<T>(a: T[], b: T[]): T[]
intersection<T>(a: T[], b: T[]): T[]
union<T>(a: T[], b: T[]): T[]
zip<T>(a: T[], b: T[]): [T, T][]
```

**Math**

```typescript
clamp(value: number, min: number, max: number): number
fibonacci(n: number): number
factorial(n: number): number
isPrime(n: number): boolean
primesUpTo(n: number): number[]
power(base: number, exp: number): number
gcd(a: number, b: number): number
lcm(a: number, b: number): number
mean(arr: number[]): number
median(arr: number[]): number
stddev(arr: number[]): number
nextPowerOfTwo(n: number): number
isPowerOfTwo(n: number): boolean
```

**String**

```typescript
camelToKebab(str: string): string
kebabToCamel(str: string): string
levenshtein(a: string, b: string): number
jaroWinkler(a: string, b: string): number
hamming(a: string, b: string): number
isPalindrome(str: string): boolean
truncate(str: string, maxLen: number, suffix?: string): string
```

**Searching**

```typescript
binarySearch<T>(arr: T[], target: T, key?: keyof T): number
binarySearchBy<T>(arr: T[], target: unknown, key: keyof T): number
linearSearch<T>(arr: T[], target: T): number
jumpSearch<T>(arr: T[], target: T): number
```

**Graph**

```typescript
createGraph(): Graph
addNode(graph: Graph, id: string, data?: unknown): void
addEdge(graph: Graph, from: string, to: string, weight?: number): void
bfs(graph: Graph, startId: string): string[]
dfs(graph: Graph, startId: string): string[]
dijkstra(graph: Graph, startId: string, endId: string): { path: string[]; distance: number }
topologicalSort(graph: Graph): string[]
hasCycle(graph: Graph): boolean
findNode(graph: Graph, id: string): GraphNode | undefined
```

**Tree**

```typescript
treeDepth(root: TreeNode): number
walkPreorder<T>(root: T, getChildren: (n: T) => T[]): T[]
walkInorder<T>(root: T, getChildren: (n: T) => T[]): T[]
walkPostorder<T>(root: T, getChildren: (n: T) => T[]): T[]
walkLevelOrder<T>(root: T, getChildren: (n: T) => T[]): T[][]
```

**Utility**

```typescript
timeAgo(date: Date | string | number): string
upperBound<T>(arr: T[], target: T, key?: keyof T): number
lowerBound<T>(arr: T[], target: T, key?: keyof T): number
```

### Component Registry

```typescript
// Map of all registered schema component selectors → Angular component types
declare const SCHEMA_COMPONENT_MAP: Map<string, Type<any>>;

// Register a custom component for SDUI rendering
function registerSchemaComponent(selector: string, component: Type<any>): void;
```

## StyleRegistry API

### loadStyleVariant()

```typescript
async function loadStyleVariant(variant: StyleVariant): Promise<void>;
```

Loads (downloads + injects) a style variant's CSS exactly once. Idempotent — calling twice is a no-op.

**Example:**

```typescript
await loadStyleVariant("glassmorphism");
```

### setCurrentStyle()

```typescript
function setCurrentStyle(variant: StyleVariant): void;
```

Activates a previously-loaded variant. Throws if the variant hasn't been loaded yet.

### getCurrentStyle()

```typescript
function getCurrentStyle(): StyleVariant;
```

Returns the currently active style variant string.

### getAllStyleVariants()

```typescript
function getAllStyleVariants(): StyleVariantConfig[];
```

Returns metadata for all 6 variants: `id`, `name`, `description`, `classPrefix`.

### getComponentStyleClasses()

```typescript
function getComponentStyleClasses(
  componentId: string,
  variant: StyleVariant,
): string;
```

Returns the CSS class string for a component+variant combination (e.g. `"glass-btn"`).

## StyleThemeService API

```typescript
@Injectable({ providedIn: "root" })
class StyleThemeService {
  // Observable emitted on any theme or dark mode change
  readonly themeChanged$: Observable<{
    variant: StyleVariant;
    isDark: boolean;
  }>;

  // Load + activate a variant
  async loadTheme(variant: StyleVariant): Promise<void>;

  // Simple theme setter (maps "light"/"dark" strings)
  async setTheme(theme: string): Promise<void>;

  // Dark mode — adds/removes 'dark' class from <html>
  toggleDarkMode(): void;
  setDarkMode(enabled: boolean): void;
  isDarkMode(): boolean;

  // Get current active variant
  getCurrentTheme(): StyleVariant;

  // Aliases (for compat)
  toggle(): void; // → toggleDarkMode()
  effectiveColorMode(): string; // → isDarkMode() ? "dark" : "light"
  init(): void; // no-op, for API compat
}
```

## SchemaShellComponent API

Standalone Angular component that provides a complete SDUI shell with routing, dark mode, and layout regions.

```typescript
@Component({
  selector: "lib-schema-shell",
  standalone: true,
  imports: [CommonModule, SchemaRouteViewerComponent, SchemaElementComponent],
})
export class SchemaShellComponent {
  @Input() appId = "";
  @Input() commandName = "get_ui_schema";
  @Input() defaultTheme: StyleVariant = "material-design-v3";
  @Input() initialRoute = "";
  @Input() errorFallbackCommandName = "";
}
```

**Usage:**

```html
<lib-schema-shell
  [appId]="'my-app'"
  [commandName]="'get_ui_schema'"
  [defaultTheme]="'glassmorphism'"
  [initialRoute]="'/home'"
/>
```

## Invoking Tauri Commands

```typescript
// Simple command (void return)
await invokeVoid("show_window", { label: "main" });

// With typed response
const resp = await invokeCommandWithResponse<MyData>("load_data", { id: 123 });
if (isSuccess(resp)) {
  console.log(unwrapResponse(resp));
}

// With retry
const result = await invokeCommand<User[]>(
  "fetch_users",
  {},
  {
    retryCount: 3,
    retryDelay: 1000,
  },
);

// Error-throwing variant
const user = await invokeWithError<User>("get_user", { id: 1 });
```
