# @tauri-front/shared — Fixes & Enhancements Plan

**Last updated:** 2026-07-06 — All P0 fixes (FIX-1, FIX-3, FIX-5, FIX-9) and P1 fixes (FIX-2, FIX-8) applied. FIX-4 verified. Remaining: FIX-6, FIX-7 (P2 enhancements).

**Status:**
- ✅ FIX-1: `SchemaRouteViewerComponent` and `SchemaRouterService` now exported from `core/lib/schema-router/`.
- ✅ FIX-2: `GuardService` implemented with `auth`/`role`/`permission`/`admin` modes via `PermissionService`.
- ✅ FIX-3: `core/lib/schema-renderer/component-registry.ts` is now `@Injectable({ providedIn: 'root' })` and injected via DI. Unused duplicate `core/lib/schema-renderer/component-registry.service.ts` deleted. Canonical `@Injectable` variant re-exported as `ComponentRegistryNgService`.
- ✅ FIX-4: Verified — schema-route-viewer reads `canvasElements || elements || components` (canvasElements preferred per AGENTS.md §6).
- ✅ FIX-5: Local duplicate `CanvasElement` in `schema-renderer.service.ts` removed; canonical type from `core/lib/types.ts` is now used. Canonical already includes `position`, `zIndex`, `dataBinding`.
- ✅ FIX-8: `styles/theme.service.ts` renamed to `StyleThemeService` to eliminate name collision with `core/lib/theme/theme.service.ts` (different services — accent vars vs dark-mode CSS injection).
- ✅ FIX-9: Missing exports added (`SignalStoreService`, `SignalSyncService`, `DataPatchService`, `ToastService`, `SchemaElementComponent`). `AppSchema`, `LayoutElement`, `CanvasElement` also exported from public API.
- 🔲 FIX-6: `DataBindingResolverService` params/function resolution (P2).
- 🔲 FIX-7: Layout engine theme CSS variables (P2).

**Other cleanups applied 2026-07-06:**
- Removed dead duplicate `core/lib/schema-route-viewer.component.ts` (3rd copy, unused).
- Removed dead duplicate `core/lib/schema-renderer/schema-route-viewer.component.ts` and `schema-router.service.ts` (replaced by FIX-1 export swap).
- Renamed `core-crud/crud.service.ts` exported abstract class to `RemoteCrudService` to avoid name collision with concrete `core/lib/crud/crud.service.ts`.
- Extracted 7 inline templates to external `.html` files (RBAC stubs + grid components).

**Date:** 2026-07-06  
**Based on:** Comprehensive analysis of all Tauri projects + library integration

---

## Architecture Rule: Zero Re-implementation

**Consumer apps MUST NOT re-implement anything from the shared library.**

| Rule | Description |
|------|-------------|
| **No custom CSS** | All styles come from Lit component Shadow DOM + schema `classes` field. No project-level stylesheets, no component-specific CSS files. |
| **No custom algorithms** | Rendering, data binding, layout, routing, events, CRUD, theme — all from the library. |
| **No custom components** | Every UI element must be a Lit Web Component from the library's registry. No Angular components duplicating library functionality. |
| **Call the generator** | Apps call `SchemaRendererService` / `SchemaRouteViewerComponent`. They do not create DOM elements directly. |
| **Styles via schema only** | Styling expressed through: Tailwind `classes` strings in schema, `ThemeService` CSS variables, Lit Shadow DOM. No project-level CSS. |
| **Library is single source of truth** | The project only loads the schema and passes it to the renderer. Everything else is the library's responsibility. |

---

## Critical Fixes (HIGH — Breaking / Wrong Behavior)

### FIX-1: `SchemaRouteViewerComponent` export points to wrong implementation

**File:** `projects/shared/src/index.ts`  
**Current (line 44):**
```typescript
export { SchemaRouteViewerComponent } from "./core/lib/schema-renderer/schema-route-viewer.component";
```
**Problem:** This exports the inline-template version with hardcoded header/main/footer region names. The schema-router version (`core/lib/schema-router/schema-route-viewer.component.ts`) has proper external templates, uses `SchemaElementComponent`, and supports recursive element rendering.

**Fix:**
```typescript
export { SchemaRouteViewerComponent } from "./core/lib/schema-router/schema-route-viewer.component";
```

**Also fix SchemaRouterService export** (line 43):
```typescript
// Current — simple version (57 lines, minimal features)
export { SchemaRouterService } from "./core/lib/schema-renderer/schema-router.service";
// Fix — full version (197 lines, route matching, guards, params)
export { SchemaRouterService } from "./core/lib/schema-router/schema-router.service";
```

### FIX-2: `GuardService` is a stub

**File:** `projects/shared/src/core/lib/schema-router/guard.service.ts`  
**Current:**
```typescript
canActivate(): boolean { return true; }
```

**Problem:** Always returns true. No actual guard evaluation.

**Fix:** Implement proper guard evaluation using `PermissionService`:
```typescript
@Injectable({ providedIn: 'root' })
export class GuardService {
  private permissionService = inject(PermissionService, { optional: true });

  async canActivate(guardType: string, params?: Record<string, unknown>): Promise<boolean> {
    switch (guardType) {
      case 'auth':
        return this.checkAuth();
      case 'role':
        return this.checkRole(params?.['role'] as string);
      case 'permission':
        return this.checkPermission(params);
      default:
        return true;
    }
  }

  private async checkAuth(): Promise<boolean> { /* ... */ }
  private async checkRole(role: string): Promise<boolean> { /* ... */ }
  private async checkPermission(params?: Record<string, unknown>): Promise<boolean> { /* ... */ }
}
```

### FIX-3: `ComponentRegistryService` not `@Injectable`

**File:** `projects/shared/src/core/lib/schema-renderer/component-registry.ts`  
**Current:** Plain class, instantiated with `new ComponentRegistryService()` in schema-renderer.service.ts

**Fix:** Convert to `@Injectable({ providedIn: 'root' })` and inject via DI:
```typescript
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ComponentRegistryService {
  // ... existing code, but now injectable
}
```

Then in `schema-renderer.service.ts`:
```typescript
// Replace: private componentRegistry = new ComponentRegistryService();
private componentRegistry = inject(ComponentRegistryService);
```

### FIX-4: Schema-route-viewer reads wrong property name

**File:** `projects/shared/src/core/lib/schema-renderer/schema-route-viewer.component.ts` (line 143)  
**Current:**
```typescript
const elements: CanvasElement[] = (page as any).canvasElements || (page as any).elements || [];
```

**Problem:** The `Page` type in `types.ts` defines `components?` and `canvasElements?` (both as `ComponentDef[]`) but the renderer expects `elements` or `canvasElements` at runtime. The property `components` (used by generated apps to store component lists) is never read.

**Fix:**
```typescript
const elements = (page as any).canvasElements ?? (page as any).elements ?? (page as any).components ?? [];
```

### FIX-5: `CanvasElement` type inconsistency

**Files:**
- `projects/shared/src/core/lib/types.ts` — has `gridPosition?` but NOT `position`
- `projects/shared/src/core/lib/schema-renderer/schema-renderer.service.ts` — defines its OWN `CanvasElement` with `position?` AND `gridPosition?`

**Problem:** The renderer's `createElement()` method accesses `data.position` (for absolute positioning from Designer) but the type in `types.ts` doesn't have `position`. This causes type errors.

**Fix:** Add `position` to the types.ts `CanvasElement` interface:
```typescript
export interface CanvasElement {
  id: string;
  componentId: string;
  name?: string;
  icon?: string;
  position?: { x: number; y: number; width: number; height: number };  // ADD THIS
  gridPosition?: GridPosition;
  classes?: string;
  children?: string[];
  props?: Record<string, unknown>;
  routes?: { include?: string[]; exclude?: string[] };
  defaults?: Record<string, unknown>;
  visible?: boolean | { when?: string; equals?: unknown };
  bind?: { store?: string; field?: string };
  events?: Record<string, string>;
  zIndex?: number;  // ADD THIS
  dataBinding?: { entity: string; field: string };  // ADD THIS
}
```

And remove the DUPLICATE `CanvasElement` interface from `schema-renderer.service.ts` — import from `types.ts` instead.

---

## Medium Priority Fixes

### FIX-6: DataBindingResolverService context is incomplete

**File:** `projects/shared/src/core/lib/schema-renderer/data-binding-resolver.ts`  
**Problem:** The `resolveDataBinding()` method has code for handling `{{data.*}}` but the full `BindingContext` (params, services, functions) is partially implemented. Complex bindings don't work.

**Fix:** Add params resolution and function call support to the resolver.

### FIX-7: Layout engine doesn't apply theme CSS variables

**File:** `projects/shared/src/core/lib/schema-renderer/layout-engine.ts`  
**Problem:** `renderGridLayout()` and `renderFlexLayout()` apply Tailwind classes but don't set theme CSS variables (background, text colors).

**Fix:** Inject `ThemeService` (or accept it as parameter) and apply theme CSS variables to layout containers:
```typescript
renderGridLayout(container: HTMLElement, layout: Layout, theme?: Theme): void {
  container.style.display = "grid";
  // ... existing code ...
  if (theme) {
    container.style.setProperty('--bg-primary', theme.colors?.bgPrimary ?? '#ffffff');
    container.style.setProperty('--bg-secondary', theme.colors?.bgSecondary ?? '#f3f4f6');
    // etc.
  }
}
```

### FIX-8: ThemeService duplication (two implementations)

**Files:**
- `projects/shared/src/core/lib/theme/theme.service.ts` — exported as `ThemeService`
- `projects/shared/src/styles/theme.service.ts` — exported as `StyleThemeService`

**Fix:** Consolidate into one implementation. The `core/lib/theme/theme.service.ts` version is more complete (has accent shade calculation, system preference detection). Update `styles/theme.service.ts` to re-export from `core/lib/theme/`.

### FIX-9: Index.ts missing exports

**File:** `projects/shared/src/index.ts`  

**Add these exports:**
```typescript
// Missing services that exist
export { SignalStoreService } from "./core/lib/signal-store/signal-store.service";
export { SignalSyncService } from "./core/lib/signal-sync/signal-sync.service";
export { DataPatchService } from "./core/lib/data-patch/data-patch.service";

// Also export the Angular-injectable ComponentRegistryService
export { ComponentRegistryService as ComponentRegistryNgService } from "./core/lib/component-registry.service";
```

---

## Library Enhancement Roadmap

### Enhancement 1: Schema validation before rendering

Add a `validateSchema()` method to `SchemaRendererService` that checks:
- All referenced component IDs exist in the registry
- All layout IDs referenced by pages exist
- Required props are present
- Grid positions are valid

### Enhancement 2: Error boundary component

Create an `SchemaErrorBoundary` component that catches rendering errors per element and shows a fallback UI instead of breaking the entire page.

### Enhancement 3: Schema hot-reload

Add a service that watches for schema changes (via Tauri events or file watcher) and triggers re-render without page reload.

### Enhancement 4: Performance optimization

- Virtual scrolling support for large element lists
- Lazy element creation (only render visible elements)
- Memoized class resolution

### Enhancement 5: Schema migration utilities

Create version-aware migration utilities that can convert between schema formats:
- Old `elements[]` with `selector` → new `canvasElements[]` with `componentId`
- Old `UISchema` → new `AppSchema`
- Layout format migration

---

## Immediate Action Items

1. FIX-1: Change index.ts exports to point to schema-router versions  
2. FIX-4: Add `components` property read in schema-route-viewer  
3. FIX-5: Unify CanvasElement type across all files  
4. FIX-9: Add missing exports to index.ts  
5. Build library and verify no regressions on VoiceAssistant  
6. Build and verify on TaskFlow  
7. Update `SDUI_LIBRARY_INTEGRATION_GUIDE.md` with any new findings
