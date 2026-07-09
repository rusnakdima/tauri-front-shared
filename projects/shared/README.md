# @tauri-front/shared

Unified TypeScript/Angular shared library for Tauri desktop applications. Provides SDUI schema rendering, 50+ UI components, style variants, algorithms, and enterprise features (RBAC, i18n, storage).

## Installation

```bash
npm install @tauri-front/shared
# or
bun add @tauri-front/shared
```

**Peer dependencies** (must be installed by the consumer app):

```bash
npm install @angular/common @angular/core @angular/platform-browser @angular/material rxjs @tauri-apps/api
```

## Quick Start

```typescript
import "@tauri-front/shared"; // registers all components
import { SchemaShellComponent } from "@tauri-front/shared";

// In your Angular component template:
// <lib-schema-shell [appId]="'my-app'" [commandName]="'get_ui_schema'" />
```

## Style Variants

Six built-in visual themes — switch at runtime with zero refactoring:

| Variant              | Class Prefix | Description                                  |
| -------------------- | ------------ | -------------------------------------------- |
| `material-design-v3` | `m3-`        | Material Design 3 tokens + component classes |
| `glassmorphism`      | `glass-`     | Frosted glass with backdrop blur             |
| `neumorphism`        | `neu-`       | Soft extruded/inset shadows                  |
| `claymorphism`       | `clay-`      | Clay-like rounded shapes with depth          |
| `brutalism`          | `brut-`      | Sharp edges, hard shadows, high-contrast     |
| `skeuomorphism`      | `skeu-`      | Realistic leather, paper, glossy textures    |

### Loading & Switching Themes

```typescript
import {
  loadStyleVariant,
  setCurrentStyle,
  getCurrentStyle,
  getAllStyleVariants,
  StyleThemeService,
} from "@tauri-front/shared";

// Load all variants once (recommended — loads asynchronously)
async function initStyles() {
  const variants = getAllStyleVariants();
  await Promise.all(variants.map((v) => loadStyleVariant(v.id)));
}

// Switch theme at runtime
setCurrentStyle("glassmorphism");

// Or use the service
const theme = inject(StyleThemeService);
await theme.loadTheme("brutalism");
theme.toggleDarkMode(); // toggles dark/light within the current variant
```

### Dark Mode

Dark mode works via the `html.dark` class + TailwindCSS `dark:` variants. The `StyleThemeService` handles injection:

```typescript
// Toggle dark mode
theme.toggleDarkMode(); // adds/removes 'dark' class from <html>
theme.setDarkMode(true); // force dark
theme.isDarkMode(); // boolean
```

All six variants have complete dark mode CSS — `:root {}` variable overrides plus `.dark .{prefix}-*` class selectors for component-level styling.

## Core Services

All services are `@Injectable({ providedIn: 'root' })`.

### Schema-Driven UI (SDUI)

```typescript
import {
  SchemaRendererService, // parses + renders UiSchema
  SchemaRouterService, // manages routes within a schema
  SchemaFetcherService, // loads schema from Tauri backend
  SchemaShellComponent, // standalone shell component
  SCHEMA_COMPONENT_MAP, // Map<string, Type<any>> — all registered components
  registerSchemaComponent, // register a custom component
} from "@tauri-front/shared";
```

### State & Data

```typescript
import {
  SignalStoreService, // signal-based reactive store
  SignalSyncService, // cross-component signal sync
  DataPatchService, // immutable patch operations
  UnifiedStorageService, // key/value + query storage
  RemoteCrudService, // CRUD over Tauri invoke
} from "@tauri-front/shared";
```

### UI & Feedback

```typescript
import {
  ToastService, // toast notifications
  EventBusService, // pub/sub events
  ShortcutService, // keyboard shortcut registration
  PermissionService, // RBAC permission checks
  I18nService, // internationalization
  GlobalStateService, // app-wide state
  ErrorHandlerService, // error capture + reporting
} from "@tauri-front/shared";
```

### Invoke Wrappers (Tauri Commands)

```typescript
import {
  invokeCommand<T>,           // generic command with retry
  invokeCommandWithResponse<T>, // typed Response<T>
  invokeVoid,                 // fire-and-forget
  invokeWithError<T>,          // throws on error
  ResponseStatus,             // enum: success, error, notFound...
  isSuccess, isError,
  unwrapResponse,
} from '@tauri-front/shared';
```

### RBAC

```typescript
import {
  PermissionService,
  rbacGuard, // Route guard function
  rbacRoleGuard, // Role-based route guard
  RbacHasPermissionDirective, // *rbacHasPermission="'perm:read'"
  RbacHasRoleDirective, // *rbacHasRole="'admin'"
  TodoPermission, // pre-defined permission set
} from "@tauri-front/shared";
```

## UI Components

All components are standalone Angular components using light DOM (no shadow root) with CSS variable-based theming.

### Form Controls

| Component | Selector       | Key Props                                                            |
| --------- | -------------- | -------------------------------------------------------------------- |
| Button    | `app-button`   | `variant` (solid/outlined/text/tonal), `size`, `disabled`, `(click)` |
| Input     | `app-input`    | `type`, `placeholder`, `label`, `hint`, `state`, `prefix`, `suffix`  |
| Textarea  | `app-textarea` | `rows`, `maxLength`, `placeholder`                                   |
| Select    | `app-select`   | `options`, `value`, `placeholder`, `searchable`                      |
| Checkbox  | `app-checkbox` | `checked`, `label`, `indeterminate`                                  |
| Radio     | `app-radio`    | `value`, `group`, `label`                                            |
| Switch    | `app-switch`   | `checked`, `label`, `disabled`                                       |
| Slider    | `app-slider`   | `min`, `max`, `step`, `value`                                        |
| Chip      | `app-chip`     | `label`, `avatar`, `closeable`, `variant`                            |

### Layout

| Component     | Selector             | Key Props                                                    |
| ------------- | -------------------- | ------------------------------------------------------------ |
| Header        | `app-header`         | `logo`, `title`, `actions`                                   |
| Sidebar       | `app-sidebar`        | `items`, `collapsed`, `width`                                |
| Footer        | `app-footer`         | `links`, `copyright`                                         |
| Card          | `app-card`           | `variant` (elevated/filled/outlined), `padding`, `clickable` |
| PageContainer | `app-page-container` | `header`, `sidebar`, `footer` slots                          |
| SplitView     | `app-split-view`     | `direction`, `dividerPosition`                               |
| BottomPanel   | `app-bottom-panel`   | `open`, `height`                                             |

### Data Display

| Component   | Selector           | Key Props                                                 |
| ----------- | ------------------ | --------------------------------------------------------- |
| DataTable   | `app-data-table`   | `columns`, `data`, `selectable`, `sortable`, `pagination` |
| TableView   | `app-table-view`   | `rows`, `columns`, `rowKey`                               |
| StatsCard   | `app-stats-card`   | `title`, `value`, `trend`, `icon`                         |
| ProgressBar | `app-progress-bar` | `value`, `max`, `variant`, `label`                        |
| Avatar      | `app-avatar`       | `src`, `name`, `size`, `shape`                            |
| Badge       | `app-badge`        | `label`, `variant`, `color`                               |
| Tabs        | `app-tabs`         | `tabs`, `selected`, `variant`                             |
| JsonView    | `app-json-view`    | `data` (syntax-highlighted JSON)                          |

### Feedback

| Component     | Selector             | Key Props                                         |
| ------------- | -------------------- | ------------------------------------------------- |
| Dialog        | `app-dialog`         | `open`, `title`, `content`, `actions`, `(close)`  |
| Modal         | `app-modal`          | `open`, `size`, `backdrop`, `closeOnEscape`       |
| ConfirmDialog | `app-confirm-dialog` | `title`, `message`, `confirmLabel`, `cancelLabel` |
| Toast         | `app-toast`          | Auto-displayed via `ToastService`                 |
| Loading       | `app-loading`        | `size`, `fullscreen`                              |
| Spinner       | `app-spinner`        | `size`, `color`                                   |
| EmptyState    | `app-empty-state`    | `title`, `message`, `icon`, `actionLabel`         |
| Tooltip       | `app-tooltip`        | `content`, `position`, `trigger`                  |

### Navigation

| Component | Selector        |
| --------- | --------------- |
| NavItem   | `app-nav-item`  |
| NavGroup  | `app-nav-group` |

### Designer / Canvas

| Component        | Selector                |
| ---------------- | ----------------------- |
| ComponentPalette | `app-component-palette` |
| Canvas           | `app-canvas`            |
| PropertiesPanel  | `app-properties-panel`  |
| MainEditor       | `app-main-editor`       |
| DesignerSidebar  | `app-designer-sidebar`  |
| CanvasToolbar    | `app-canvas-toolbar`    |

## Algorithms

Import from `@tauri-front/shared/algorithms` or individual subpaths:

```typescript
import {
  sortBy, // array sort by key + order
  clamp, // bound value between min/max
  timeAgo, // human-readable relative time
  // searching
  binarySearch,
  linearSearch,
  jumpSearch,
  // string
  camelToKebab,
  kebabToCamel,
  levenshtein,
  jaroWinkler,
  hamming,
  isPalindrome,
  // math
  fibonacci,
  factorial,
  prime,
  isPrime,
  power,
  gcd,
  lcm,
  mean,
  median,
  stddev,
  // array
  dedupe,
  groupBy,
  chunk,
  partition,
  flatten,
  zip,
  difference,
  intersection,
  union,
  // graph
  bfs,
  dfs,
  dijkstra,
  topologicalSort,
  hasCycle,
  // tree
  treeDepth,
  walkPreorder,
  walkInorder,
  walkPostorder,
  walkLevelOrder,
} from "@tauri-front/shared";
```

## SDUI Schema Types

```typescript
import type {
  AppSchema, // root schema with pages + navigation
  UiSchema, // page content with elements
  Page, // { id, title, route, layout?, elements? }
  Layout, // { id, type, gridTemplate?, regions? }
  LayoutElement, // { id, component, props, gridPosition?, children?, region? }
  ComponentDef, // { type, properties, events, behaviors }
  GridPosition, // { column?, row?, columnSpan?, rowSpan? }
  ElementEvents, // { click?, change?, submit?... }
} from "@tauri-front/shared";
```

## Theming Reference

### CSS Variables (Glassmorphism example)

```css
:root {
  --color-glass-bg: rgba(255, 255, 255, 0.1);
  --color-glass-border: rgba(255, 255, 255, 0.45);
  --color-glass-border-strong: rgba(255, 255, 255, 0.6);
  --accent: #6d5dfc;
  --accent-hover: #8b7cf7;
  --text-primary: #1a1a2e;
  --bg-elevated: rgba(255, 255, 255, 0.15);
  --border-color: rgba(255, 255, 255, 0.45);
}
```

Components reference these variables automatically — changing values at the `:root` level instantly updates all component appearances.

### Component Style Classes

Each variant defines class names for each component:

| Variant       | Button Class    | Card Class         |
| ------------- | --------------- | ------------------ |
| Material 3    | `m3-btn-filled` | `m3-card-elevated` |
| Glassmorphism | `glass-btn`     | `glass-card`       |
| Neumorphism   | `neu-btn`       | `neu-card`         |
| Claymorphism  | `clay-btn`      | `clay-card`        |
| Brutalism     | `brut-btn`      | `brut-card`        |
| Skeuomorphism | `skeu-btn`      | `skeu-card`        |

Use `getComponentStyleClasses('app-button', variant)` to retrieve variant classes programmatically.

## Build

```bash
# Full build (all sub-packages)
bun run build

# Shared library only
cd projects/shared && bun run build
```

The library uses **ng-packagr** for Angular package compilation. Output goes to `projects/shared/dist/`.

## Architecture

```
projects/shared/src/
├── index.ts                    # Main barrel — imports register-components.ts
├── register-components.ts      # Side-effect: registers all components
├── components/                 # Angular standalone components
│   ├── button/
│   ├── input/
│   ├── card/
│   └── ... (50+ components)
├── core/lib/
│   ├── schema-renderer/        # SDUI rendering pipeline
│   ├── schema-router/          # Route management
│   ├── schema-fetcher/         # Backend schema loading
│   ├── rbac/                   # Permission system
│   ├── events/                 # EventBus
│   └── ...
├── core-api/                   # Tauri invoke wrappers
├── core-crud/                  # CRUD service
├── core-storage/               # UnifiedStorageService
├── core-i18n/                  # i18n
├── core-logger/                # Logging
├── algorithms/                 # Pure utility algorithms
└── styles/
    ├── style-registry.ts       # Variant definitions + load/switch functions
    └── theme.service.ts         # Dark mode injection + StyleThemeService
```

> **Important:** Import `@tauri-front/shared` once in your app root before any schema rendering. The side-effect import `register-components.ts` registers all Angular components in `SCHEMA_COMPONENT_MAP` for dynamic resolution by the schema renderer.

## License

Proprietary — internal use only.
