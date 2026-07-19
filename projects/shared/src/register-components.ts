// Side-effect import: Import ALL Angular components to trigger registerSchemaComponent()
// Each component file calls registerSchemaComponent() on module load,
// which registers the component in SCHEMA_COMPONENT_MAP for dynamic resolution.
// This file MUST be imported before any schema rendering.

// UI Components
import "./components/button/button.component";
import "./components/input/input.component";
import "./components/empty-state/empty-state.component";
import "./components/dialog/dialog.component";
import "./components/loading/loading.component";
import "./components/radio/radio.component";
import "./components/slider/slider.component";
import "./components/switch/switch.component";
import "./components/textarea/textarea.component";
import "./components/badge/badge.component";
import "./components/select/select.component";
import "./components/card/card.component";
import "./components/stats-card/stats-card.component";
import "./components/table-view/table-view.component";
import "./components/data-table/data-table.component";
import "./components/json-view/json-view.component";
import "./components/component-palette/component-palette.component";
import "./components/canvas/canvas.component";
import "./components/properties-panel/properties-panel.component";
import "./components/bottom-panel/bottom-panel.component";
import "./components/header/header.component";
import "./components/sidebar/sidebar.component";
import "./components/footer/footer.component";
import "./components/page-container/page-container.component";
import "./components/page-toolbar/page-toolbar.component";
import "./components/split-view/split-view.component";
import "./components/avatar/avatar.component";
import "./components/chip/chip.component";
import "./core/lib/modal/modal.component";
import "./core/lib/confirm-dialog/confirm-dialog.component";
import "./core/lib/pagination/pagination.component";
import "./components/tabs/tabs.component";
import "./components/progress-bar/progress-bar.component";
import "./components/segment-selector/segment-selector.component";
import "./components/icons/icons.component";
import "./components/tooltip/tooltip.component";
import "./components/snackbar/snackbar.component";
import "./components/spinner/spinner.component";
import "./components/divider/divider.component";
import "./components/tree/tree.component";
import "./components/form/form.component";
import "./components/checkbox/checkbox.component";
import "./core/lib/toast/toast.component";

// Nav Components
import "./ui/nav/nav-item";
import "./ui/nav/nav-group";

// Designer Components
import "./components/canvas-toolbar/canvas-toolbar.component";
import "./components/designer-sidebar/designer-sidebar.component";
import "./components/main-editor/main-editor.component";
import "./components/command-palette/command-palette.component";
import "./components/designer-tree/designer-tree.component";

// Textarea Base Component

// Translator-specific Components
import "./components/language-selector/language-selector.component";
import "./components/swap-button/swap-button.component";
import "./components/menu/menu-button.component";

// Layout/Text Components
import "./components/block/block.component";
import "./components/text/text.component";
import "./components/theme-toggle/theme-toggle.component";
import "./components/shortcuts-overlay/shortcuts-overlay.component";
import "./components/locale-switcher/locale-switcher.component";

// Flutter-like Layout Components
import "./components/layout/row/row.component";
import "./components/layout/column/column.component";
import "./components/layout/stack/stack.component";

// Newly added components (2026-07 batch)
import "./components/alert/alert.component";
import "./components/fab/fab.component";
import "./components/translation-output/translation-output.component";

import "./components/rating/rating.component";
import "./components/stepper/stepper.component";
import "./components/breadcrumb/breadcrumb.component";
import "./components/progress-ring/progress-ring";
import "./components/skeleton/skeleton.component";
import "./components/list/list.component";
import "./components/button-group/button-group.component";
import "./components/file-input/file-input.component";
