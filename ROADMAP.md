# ROADMAP.md — @tauri-front/shared (Angular)

## Vision

Provides ALL UI components, services, and schemas needed for 100% SDUI. Consumer apps only `import "@tauri-front/shared"` — everything auto-registers.

---

## Library Structure

```
tauri-front-shared/
├── projects/shared/src/
│   ├── components/          # Lit web components (45+)
│   │   ├── ui/              # Button, Input, Select, Badge, Avatar, Chip...
│   │   ├── layout/          # Header, Sidebar, Footer, SplitView...
│   │   ├── feedback/        # Dialog, Toast, Modal, ConfirmDialog...
│   │   ├── data/            # Card, Table, StatsCard, JsonView...
│   │   └── grid/            # GridContainer, GridItem, GridArea
│   ├── core/
│   │   └── lib/
│   │       ├── schema-router/      # SchemaRouterService
│   │       ├── schema-renderer/    # SchemaRendererService
│   │       ├── component-discovery/ # ComponentDiscoveryService
│   │       ├── theme/              # ThemeService
│   │       ├── events/            # EventBusService
│   │       ├── rbac/              # RbacService
│   │       └── signal-store/       # SignalStoreService
│   └── index.ts              # Main barrel — imports register ALL components
└── component-manifest.json   # Auto-generated list of all components + props
```

---

## Implemented Features

### Lit Web Components (45+)
- [x] UI: button, input, select, checkbox, radio, switch, slider, textarea, chip, badge, avatar, tabs, empty-state, loading, pagination, tooltip, progress-bar
- [x] Layout: header, footer, sidebar, card, page-container, page-toolbar, split-view, bottom-panel
- [x] Feedback: dialog, confirm-dialog, toast, snackbar, modal, command-palette
- [x] Data: stats-card, table-view, data-table, json-view, segment-selector
- [x] Grid: grid-container, grid-item, grid-area

### Services
- [x] SchemaRouterService — navigate, setSchema, resolveRoute
- [x] SchemaRendererService — render pages from schema
- [x] SchemaRouteViewerComponent — Angular component to embed SDUI
- [x] ComponentDiscoveryService — load component-manifest.json dynamically
- [x] ThemeService — 4-variant theme system
- [x] EventBusService — pub/sub event system
- [x] RbacService — role-based access control
- [x] ToastService — notification system
- [x] SignalStoreService — reactive state store
- [x] SignalSyncService — state synchronization
- [x] SignalLoggerService — logging with history
- [x] SchemaFetcherService — fetch schemas from URLs
- [x] ElementFactoryService — create DOM elements from schema
- [x] BindingEngine — data binding resolution
- [x] StyleResolver — dynamic style resolution
- [x] FallbackService — error handling

### Build System
- [x] ng-packagr for Angular package publishing
- [x] Lit component compilation
- [x] Component manifest generation script

---

---

## Migration to Unified Architecture

### Phase 1: Remove Algorithm Duplication ⚠️ IN PROGRESS

Algorithms should only exist in `tauri-shared` (Rust). Frontend calls via Tauri invoke.

- [ ] Remove `projects/shared/src/algorithms/sorting.ts` (use invoke)
- [ ] Remove `projects/shared/src/algorithms/graph.ts` (use invoke)
- [ ] Update `FeatureTreeService` in Designer to use invoke commands

### Phase 2: Type Binding Consolidation ✅ COMPLETED 2026-07-05

- [x] All schema types (UiSchema, Page, Layout) imported from tauri-shared bindings
- [x] TypeScript types generated via `cargo build` in tauri-shared

### Phase 3: Storage Layer Unification 🔲 PENDING

- [ ] All CRUD operations use `nosql_orm` via Tauri commands
- [ ] Schema storage uses JSON provider
- [ ] No direct database access in frontend

---

## Pending Tasks

### Step 1: Fix Incomplete Component Manifest ✅ COMPLETED 2026-06-28

Many Lit components are missing from `component-manifest.json` or have incorrect prop types.

#### Fixed:
- [x] app-switch added to manifest
- [x] app-slider added to manifest
- [x] app-chip added to manifest
- [x] app-textarea added to manifest
- [x] app-segment-selector added to manifest
- [x] app-confirm-dialog added to manifest
- [x] app-pagination added to manifest
- [x] app-progress-bar added to manifest
- [x] app-loading added to manifest
- [x] app-tooltip added to manifest
- [x] button.fullWidth: fixed to boolean
- [x] input.type: fixed to select [text, email, password, number, search, tel, url]
- [x] slider min/max: fixed to number
- [x] All disabled states: fixed to boolean

### Step 2: Add Missing Lit Components ✅ VERIFIED 2026-06-28

All listed components already exist and build correctly:
- [x] app-switch component - at `projects/ui/lit/switch.js`
- [x] app-slider component - at `projects/ui/lit/slider.js`
- [x] app-chip component - at `projects/ui/lit/chip.js`
- [x] app-textarea component - at `projects/shared/src/components/textarea/`

### Step 3: UI Variant Options ✅ COMPLETED 2026-06-28

Components need @property() for all visual variants:
- [x] app-bottom-nav: position (top/bottom), fullWidth (boolean), floating (boolean), borderRadius (number)
- [x] app-sidebar: width (number), collapsedWidth (number)
- [x] app-dialog: showHeader (boolean), showFooter (boolean)
- [x] app-card: borderRadius (number), padding (number)

### Step 4: Event Binding Implementation ✅ COMPLETED 2026-06-28

Schema canvasElements support `events` field, fully wired:
- [x] Verify SchemaRendererService creates event listeners from schema
- [x] Add `data-events` support in canvasElement schema (types.ts ElementEvents interface)
- [x] Support `click`, `input`, `change`, `blur`, `focus` standard events
- [x] `handleEvent(eventName, elementId, event)` method added to SchemaRendererService

### Step 5: Algorithm Service Manifest ✅ COMPLETED 2026-06-28

Expose sorting/graph algorithms as selectable Designer options:
- [x] algorithms-manifest.json already generated in tauri-shared
- [x] Designer integration via FeatureTreeService
- [x] Algorithm execution via Tauri commands in Designer

### Step 6: Theme System Enhancements
- [ ] Support custom CSS variable injection at runtime
- [ ] Theme preview in Designer
- [ ] Dark/light mode switching

---

## Key Patterns

### Adding a New Lit Component

1. Create component file: `projects/shared/src/components/ui/new-component/new-component.component.ts`
2. Add to `projects/shared/src/components/ui/index.ts`
3. Add to `components.ts` (shared component definition)
4. Run `npx tsx scripts/generate-component-manifest.ts`
5. Verify `component-manifest.json` includes it
6. Build: `npm run build`

### Component Registration

Bare import registers all components:
```typescript
// main.ts (consumer app)
import "@tauri-front/shared";
// All customElements.define() calls execute
// No per-component imports needed
```

---

## Build Commands

```bash
# Generate manifest from source
npx tsx scripts/generate-component-manifest.ts

# Build entire library
npm run build

# Build shared package only
npm run build:shared
```
