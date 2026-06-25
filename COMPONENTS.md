# @tauri-front/shared Component Inventory

All reusable UI components for Tauri + Angular applications.

## Packages

| Package | Description | Components |
|---------|-------------|------------|
| `@tauri-front/ui` | Form & display primitives | 16 |
| `@tauri-front/layout` | Layout & Designer components | 14 |
| `@tauri-front/data` | Data display components | 6 |
| `@tauri-front/feedback` | Dialog, Toast, Modal | 6 |
| `@tauri-front/grid` | CSS Grid components | 3 |
| `@tauri-front/core` | Services (SchemaRenderer, Theme, Logger) | 4 |
| `@tauri-front/storage` | IndexedDB, LocalStorage services | 2 |
| `@tauri-front/generator` | App generation CLI | 1 |

---

## @tauri-front/ui (16 components)

**Forms:**
| Component | Selector | Props |
|-----------|----------|-------|
| Button | `app-button` | variant (primary/secondary/danger), size (sm/md/lg), disabled |
| Input | `app-input` | type (text/email/password/number), placeholder, disabled |
| Select | `app-select` | options, placeholder |
| Checkbox | `app-checkbox` | checked, label |
| Radio | `app-radio` | name, value |
| Switch | `app-switch` | checked |
| Slider | `app-slider` | min, max, value |

**Display:**
| Component | Selector | Props |
|-----------|----------|-------|
| Badge | `app-badge` | variant (default/primary/success/warning/danger), size |
| Avatar | `app-avatar` | src, alt, size |
| Chip | `app-chip` | label, removable |
| Empty State | `app-empty-state` | title, message |

**Feedback:**
| Component | Selector | Props |
|-----------|----------|-------|
| Loading | `app-loading` | size (sm/md/lg) |
| Progress Bar | `app-progress-bar` | value, max |
| Tooltip | `app-tooltip` | text, position (top/bottom/left/right) |
| Pagination | `app-pagination` | page, total |
| Tabs | `app-tabs` | tabs (JSON array string) |

---

## @tauri-front/layout (14 components)

**Layout:**
| Component | Selector | Props |
|-----------|----------|-------|
| Header | `app-header` | title, breadcrumbs |
| Sidebar | `app-sidebar` | collapsed, items |
| Footer | `app-footer` | text |
| Split View | `app-split-view` | direction (horizontal/vertical), split (%) |
| Page Container | `app-page-container` | title |
| Page Toolbar | `app-page-toolbar` | title |
| Main Editor | `app-main-editor` | - |

**Designer:**
| Component | Selector | Props |
|-----------|----------|-------|
| Designer Sidebar | `app-designer-sidebar` | position (left/right), collapsed, header |
| Component Palette | `app-component-palette` | selectedCategory, searchable |
| Canvas | `app-canvas` | gridColumns, showGrid, selectedId |
| Canvas Toolbar | `app-canvas-toolbar` | - |
| Properties Panel | `app-properties-panel` | element |
| Bottom Panel | `app-bottom-panel` | tabs, activeTab |

---

## @tauri-front/data (6 components)

| Component | Selector | Props |
|-----------|----------|-------|
| Card | `app-card` | title, content, elevated |
| Stats Card | `app-stats-card` | label, value, icon |
| Table View | `app-table-view` | columns, data |
| Data Table | `app-data-table` | columns, data, selectable |
| JSON View | `app-json-view` | data |
| Segment Selector | `app-segment-selector` | options, selected |

---

## @tauri-front/feedback (6 components)

| Component | Selector | Props |
|-----------|----------|-------|
| Dialog | `app-dialog` | open, title, size |
| Confirm Dialog | `app-confirm-dialog` | open, title, message |
| Toast | `app-toast` | message, type, duration |
| Snackbar | `app-snackbar` | message, action |
| Modal | `app-modal` | open, title |
| Command Palette | `app-command-palette` | open, commands |

---

## @tauri-front/grid (3 components)

| Component | Selector | Props |
|-----------|----------|-------|
| Grid Container | `app-grid-container` | columns, gap |
| Grid Item | `app-grid-item` | colStart, colEnd, rowStart, rowEnd |
| Grid Area | `app-grid-area` | name |

---

## @tauri-front/core (Services)

| Service | Description |
|---------|-------------|
| SchemaRendererService | Signal-based page/layout rendering from UISchema |
| ThemeService | Light/dark theme management with CSS variable generation |
| LoggerService | Signal-based logging via Tauri backend |
| StorageService | Unified storage interface (IndexedDB + LocalStorage) |

---

## @tauri-front/generator

CLI tool to generate Tauri + Angular app from schema:

```bash
npx @tauri-front/generator --schema ./schema.json --output ./my-app --app-name MyApp
```

---

## Usage

Import components from packages:

```typescript
// In Angular component
import { AppButton } from '@tauri-front/ui';
// Or use CUSTOM_ELEMENTS_SCHEMA to use in templates
```

---

## CSS Variables

Define these in your app's `styles.css`:

```css
:root {
  --bg-primary: #f8fafc;
  --bg-secondary: #f1f5f9;
  --bg-elevated: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --accent: #e94560;
  --accent-hover: #d63850;
  --text-on-accent: #ffffff;
}
.dark {
  --bg-primary: #0d1117;
  --bg-secondary: #161b22;
  --bg-elevated: #21262d;
  --text-primary: #e6edf3;
  --text-secondary: #8b949e;
  --accent: #58a6ff;
  --accent-hover: #79b8ff;
}
```
