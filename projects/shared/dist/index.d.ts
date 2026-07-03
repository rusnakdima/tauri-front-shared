import * as lit_html from 'lit-html';
import * as lit from 'lit';
import { LitElement } from 'lit';
import * as i0 from '@angular/core';
import { OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';

type ColorMode = "light" | "dark" | "system";
interface Theme {
    mode: ColorMode;
    accentColor?: string;
    cssVariables?: Record<string, string>;
}
interface UiSchema {
    version: string;
    pages: Page[];
    layouts: Layout[];
    theme?: Theme;
}
interface ComponentBehavior {
    selfMethods?: Record<string, string>;
    classSetters?: Record<string, unknown>;
    eventHandlers?: ElementEvents;
}
interface ElementEvents {
    [eventName: string]: Array<{
        handler: string;
        params?: Record<string, unknown>;
    }>;
}
interface RenderContext {
    schema: UiSchema;
    page: Page | null;
    layout: Layout | null;
    data: Record<string, Record<string, unknown>>;
    params: Record<string, string>;
}
interface ElementConfig {
    id: string;
    componentId: string;
    componentDef: ComponentDef | null;
    gridPosition: GridPosition;
    classes: string;
}
interface ToastNotification$1 {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration: number;
    icon?: string;
}
interface ThemeConfig {
    mode: ColorMode;
    accentColor?: string;
    cssVariables?: Record<string, string>;
}
interface SharedPropDef {
    name: string;
    type: "string" | "number" | "boolean" | "select";
    default?: unknown;
    options?: string[];
}
interface SharedComponentDef {
    id: string;
    name: string;
    selector: string;
    packageType: "ui" | "feedback" | "data" | "layout";
    category: string;
    icon?: string;
    defaultClasses?: string;
    props: SharedPropDef[];
    template: string;
    css: string;
}
interface GridPosition {
    column: number;
    row: number;
    colSpan?: number;
    rowSpan?: number;
    colStart?: number;
    rowStart?: number;
}
interface ComponentDef {
    id: string;
    name: string;
    selector: string;
    packageType: string;
    category: string;
    props: Record<string, unknown>;
    template?: string;
    css?: string;
    defaultClasses?: string;
}
interface Layout {
    id: string;
    type: "grid" | "flex" | "stack";
    direction?: "row" | "column";
    gap?: number;
    class?: string;
    style?: Record<string, string>;
    positions?: GridPosition[];
    children?: string[];
}
interface Page {
    id: string;
    name: string;
    layouts: Layout[];
    components?: ComponentDef[];
    canvasElements?: ComponentDef[];
}

declare const uiComponents: SharedComponentDef[];
declare const layoutComponents: SharedComponentDef[];
declare const feedbackComponents: SharedComponentDef[];
declare const dataComponents: SharedComponentDef[];
declare const components: SharedComponentDef[];

type ButtonStyle = "solid" | "outline" | "soft" | "ghost";
type ButtonVariant = "primary" | "danger" | "warning" | "success" | "info";
type ButtonSize = "sm" | "md" | "lg";
declare class AppButton extends LitElement {
    variant: ButtonVariant;
    buttonStyle: ButtonStyle;
    size: ButtonSize;
    disabled: boolean;
    loading: boolean;
    icon: string | null;
    iconPosition: "left" | "right";
    fullWidth: boolean;
    type: "button" | "submit" | "reset";
    label: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleClick;
    private getButtonClass;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-button": AppButton;
    }
}

type InputType = "text" | "email" | "password" | "number" | "search" | "tel" | "url";
declare class AppInput extends LitElement {
    type: InputType;
    placeholder: string;
    label: string | null;
    disabled: boolean;
    error: string | null;
    icon: string | null;
    constructor();
    connectedCallback(): void;
    private _value;
    private _focused;
    static styles: lit.CSSResult;
    private _handleInput;
    private _handleFocus;
    private _handleBlur;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-input": AppInput;
    }
}

declare class AppEmptyState extends LitElement {
    icon: string | null;
    title: string;
    message: string;
    actionLabel: string | null;
    variant: "default" | "danger" | "success";
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleAction;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-empty-state": AppEmptyState;
    }
}

type ModalSize = "sm" | "md" | "lg";
declare class AppModal extends LitElement {
    open: boolean;
    title: string;
    size: ModalSize;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleOverlayClick;
    private _close;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-modal": AppModal;
    }
}

type DialogSize = "sm" | "md" | "lg";
declare class AppDialog extends LitElement {
    open: boolean;
    title: string;
    size: DialogSize;
    showHeader: boolean;
    showFooter: boolean;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleOverlayClick;
    private _close;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-dialog": AppDialog;
    }
}

declare class AppConfirmDialog extends LitElement {
    open: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleCancel;
    private _handleConfirm;
    private _handleOverlayClick;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-confirm-dialog": AppConfirmDialog;
    }
}

type LoadingSize = "sm" | "md" | "lg";
declare class AppLoading extends LitElement {
    size: LoadingSize;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-loading": AppLoading;
    }
}

declare class AppRadio extends LitElement {
    name: string;
    value: string;
    checked: boolean;
    disabled: boolean;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleChange;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-radio": AppRadio;
    }
}

declare class AppSlider extends LitElement {
    min: number;
    max: number;
    value: number;
    step: number;
    disabled: boolean;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleInput;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-slider": AppSlider;
    }
}

declare class AppSwitch extends LitElement {
    checked: boolean;
    disabled: boolean;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleChange;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-switch": AppSwitch;
    }
}

declare class AppTextarea extends LitElement {
    value: string;
    placeholder: string;
    rows: number;
    disabled: boolean;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleInput;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-textarea": AppTextarea;
    }
}

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger";
type BadgeSize = "sm" | "md" | "lg";
declare class AppBadge extends LitElement {
    variant: BadgeVariant;
    size: BadgeSize;
    label: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-badge": AppBadge;
    }
}

declare class AppSelect extends LitElement {
    options: string;
    value: string;
    placeholder: string;
    disabled: boolean;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleChange;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-select": AppSelect;
    }
}

declare class AppCard extends LitElement {
    title: string;
    content: string;
    elevated: boolean;
    borderRadius: number;
    padding: number;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-card": AppCard;
    }
}

declare class AppStatsCard extends LitElement {
    label: string;
    value: string;
    icon: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-stats-card": AppStatsCard;
    }
}

declare class AppTableView extends LitElement {
    columns: string;
    data: string;
    constructor();
    connectedCallback(): void;
    private _getColumns;
    private _getData;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-table-view": AppTableView;
    }
}

declare class AppDataTable extends LitElement {
    columns: string;
    data: string;
    selectable: boolean;
    constructor();
    connectedCallback(): void;
    private _selectedIndex;
    private _getColumns;
    private _getData;
    private _handleRowClick;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-data-table": AppDataTable;
    }
}

declare class AppJsonView extends LitElement {
    data: string | object;
    constructor();
    connectedCallback(): void;
    private _getFormattedJson;
    static styles: lit.CSSResult;
    private _syntaxHighlight;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-json-view": AppJsonView;
    }
}

declare class AppComponentPalette extends LitElement {
    categories: string;
    searchable: boolean;
    constructor();
    connectedCallback(): void;
    private _searchQuery;
    private _collapsedCategories;
    private _getCategories;
    private _toggleCategory;
    private _filterComponents;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-component-palette": AppComponentPalette;
    }
}

declare class AppCanvas extends LitElement {
    elements: unknown[];
    gridColumns: number;
    showGrid: boolean;
    selectedId: string | null;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-canvas": AppCanvas;
    }
}

declare class AppPropertiesPanel extends LitElement {
    element: string;
    constructor();
    connectedCallback(): void;
    private _properties;
    private _elementId;
    private _parseElement;
    updated(changedProperties: Map<string, unknown>): void;
    private _handlePropertyChange;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-properties-panel": AppPropertiesPanel;
    }
}

declare class AppBottomPanel extends LitElement {
    tabs: string;
    activeTab: string;
    position: string;
    fullWidth: boolean;
    floating: boolean;
    borderRadius: number;
    constructor();
    connectedCallback(): void;
    private _getTabs;
    private _handleTabClick;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-bottom-panel": AppBottomPanel;
    }
}

declare class AppHeader extends LitElement {
    title: string;
    showBack: boolean;
    breadcrumbs: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleBack;
    private _getBreadcrumbs;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-header": AppHeader;
    }
}

declare class AppSidebar extends LitElement {
    collapsed: boolean;
    items: string;
    width: number;
    collapsedWidth: number;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _toggleCollapse;
    private _getItems;
    private _handleItemClick;
    private _renderItem;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-sidebar": AppSidebar;
    }
}

declare class AppFooter extends LitElement {
    text: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-footer": AppFooter;
    }
}

declare class AppPageContainer extends LitElement {
    title: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-page-container": AppPageContainer;
    }
}

declare class AppPageToolbar extends LitElement {
    title: string;
    actions: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _getActions;
    private _handleActionClick;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-page-toolbar": AppPageToolbar;
    }
}

declare class AppSplitView extends LitElement {
    direction: "horizontal" | "vertical";
    split: number;
    minFirst: number;
    minSecond: number;
    constructor();
    connectedCallback(): void;
    private _isDragging;
    static styles: lit.CSSResult;
    private _onDividerMouseDown;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-split-view": AppSplitView;
    }
}

type AvatarSize = "sm" | "md" | "lg";
declare class AppAvatar extends LitElement {
    src: string;
    alt: string;
    size: AvatarSize;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _getInitials;
    private _handleImageError;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-avatar": AppAvatar;
    }
}

declare class AppChip extends LitElement {
    label: string;
    removable: boolean;
    icon: string | null;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleRemove;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-chip": AppChip;
    }
}

declare class AppPagination extends LitElement {
    page: number;
    total: number;
    pageSize: number;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private get _totalPages();
    private _goTo;
    private _getPageNumbers;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-pagination": AppPagination;
    }
}

declare class AppTabs extends LitElement {
    tabs: string;
    activeTab: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private get _parsedTabs();
    private _selectTab;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-tabs": AppTabs;
    }
}

declare class AppProgressBar extends LitElement {
    value: number;
    max: number;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private get _percentage();
    private _getFillClass;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-progress-bar": AppProgressBar;
    }
}

declare class AppSegmentSelector extends LitElement {
    options: string;
    selected: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private get _parsedOptions();
    private _select;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-segment-selector": AppSegmentSelector;
    }
}

type IconName = "clear" | "copy" | "swap" | "chevron-down" | "translate" | "spinner" | "keyboard";
declare class AppIcon extends LitElement {
    name: IconName;
    svgClass: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-icon": AppIcon;
    }
}

declare class AppLanguageSelector extends LitElement {
    languages: string;
    value: string;
    label: string;
    labelId: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleChange;
    private _getParsedLanguages;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-language-selector": AppLanguageSelector;
    }
}

declare class AppSwapButton extends LitElement {
    constructor();
    static styles: lit.CSSResult;
    private _handleClick;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-swap-button": AppSwapButton;
    }
}

declare class AppTextInput extends LitElement {
    value: string;
    placeholder: string;
    charCount: string;
    maxChars: number;
    id: string;
    clearable: boolean;
    private _textarea;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleInput;
    private _autoResize;
    private _handleClear;
    updated(changed: Map<string, unknown>): void;
    render(): lit_html.TemplateResult<1>;
    firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-text-input": AppTextInput;
    }
}

declare class AppTranslationOutput extends LitElement {
    value: string;
    placeholder: string;
    id: string;
    private _textarea;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _autoResize;
    private _handleCopy;
    updated(changed: Map<string, unknown>): void;
    render(): lit_html.TemplateResult<1>;
    firstUpdated(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-translation-output": AppTranslationOutput;
    }
}

type ToastType = "success" | "error" | "info" | "warning";
declare class AppToast extends LitElement {
    message: string;
    visible: boolean;
    type: ToastType;
    private _timeout;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    static styles: lit.CSSResult;
    updated(changed: Map<string, unknown>): void;
    private _handleClose;
    private _getIcon;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-toast": AppToast;
    }
}

declare class AppThemeToggle extends LitElement {
    isDark: boolean;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleToggle;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-theme-toggle": AppThemeToggle;
    }
}

declare class AppShortcutsOverlay extends LitElement {
    open: boolean;
    shortcuts: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _getParsedShortcuts;
    private _handleBackdropClick;
    private _close;
    private _parseKeys;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-shortcuts-overlay": AppShortcutsOverlay;
    }
}

interface GridTemplate {
    columns: string[];
    rows: string[];
    gap: string;
}
declare class LayoutEngineService {
    resolveClass(layout: Layout): string;
    renderGridLayout(container: HTMLElement, layout: Layout): void;
    renderFlexLayout(container: HTMLElement, layout: Layout): void;
    resolveGridPosition(layout: Layout | undefined, componentId: string): GridPosition | null;
    resolveGridPositionFromPositions(positions: GridPosition[] | undefined, componentId: string): GridPosition | null;
    calculateGridSpan(colSpan: number | undefined, rowSpan: number | undefined): {
        gridColumn: string;
        gridRow: string;
    };
    applyLayoutStyles(container: HTMLElement, layout: Layout, children: string[], getComponentById: (id: string) => {
        selector: string;
    } | undefined, resolvePosition: (layout: Layout, childId: string) => GridPosition | null): void;
    createGridTemplateString(columns: string[], rows: string[]): string;
    parseGridTemplate(template: GridTemplate): {
        gridTemplateColumns: string;
        gridTemplateRows: string;
        gap: string;
    };
}

type StyleVariant = "claymorphism" | "glassmorphism" | "neumorphism" | "material-design-v3";
interface ComponentStyleMap {
    [componentId: string]: {
        variants: {
            [variant: string]: string;
        };
        sizes?: {
            [size: string]: string;
        };
        default?: string;
    };
}
interface GlobalStyleContext {
    variant?: string;
    size?: string;
}
interface StyleVariantConfig {
    id: StyleVariant;
    name: string;
    cssString: string;
    classPrefix: string;
    description: string;
    componentStyles: ComponentStyleMap;
}
declare function loadStyleVariant(variant: StyleVariant): Promise<void>;
declare function setCurrentStyle(variant: StyleVariant): void;
declare function getCurrentStyle(): StyleVariant;
declare function getStyleClassPrefix(variant: StyleVariant): string;
/**
 * Get CSS classes for a component's variant and size.
 * Uses the global style registry — variant and size are resolved separately.
 * Returns CSS class string combining variant and size classes, or empty string if not found.
 */
declare function getComponentStyleClasses(theme: StyleVariant, componentId: string, explicitVariant?: string, explicitSize?: string, globalContext?: GlobalStyleContext): string;
declare function getAllStyleVariants(): StyleVariantConfig[];

interface CanvasElement {
    id: string;
    componentId: string;
    name: string;
    icon: string;
    position?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    gridPosition?: {
        column: number;
        row: number;
        colSpan?: number;
        rowSpan?: number;
    };
    props: Record<string, unknown>;
    classes: string;
    children: string[];
    zIndex: number;
    dataBinding?: {
        entity: string;
        field: string;
    };
    events?: Record<string, string>;
}
interface PageSchema {
    id: string;
    name: string;
    elements: CanvasElement[];
    gridTemplate?: GridTemplate;
}
declare class SchemaRendererService {
    private _pages;
    private _currentPageId;
    private _navigationStack;
    private _appConfig;
    private componentRegistry;
    private dataBindingResolver;
    private layoutEngine;
    private dataStore;
    private crudService;
    private eventBus;
    private componentResolver;
    private routeResolver;
    pages: i0.Signal<Page[]>;
    currentPageId: i0.Signal<string>;
    constructor();
    registerComponent(def: ComponentDef): void;
    registerComponents(defs: ComponentDef[]): void;
    getComponent(selector: string): ComponentDef | undefined;
    loadSchema(schema: {
        pages: Page[];
        app?: {
            variant?: string;
            size?: string;
        };
    }): void;
    getCurrentPage(): Page | null;
    setCurrentPage(pageId: string): void;
    navigateToPage(route: string): void;
    getNavigationStack(): string[];
    setRouteResolver(resolver: (route: string) => string | null): void;
    renderGridLayout(container: HTMLElement, layout: Layout): void;
    renderFlexLayout(container: HTMLElement, layout: Layout): void;
    loadComponentModule(selector: string): Promise<CustomElementConstructor>;
    registerComponentModule(selector: string, module: Record<string, unknown>): void;
    resolveGridPosition(layoutId: string, componentId: string): GridPosition | null;
    resolveClass(layout: Layout): string;
    getComponentProps(componentId: string): Record<string, unknown>;
    generatePage(pageId: string): {
        layouts: Layout[];
        components: ComponentDef[];
    };
    setComponentResolver(resolver: (selector: string) => ComponentDef | undefined): void;
    createElement(data: CanvasElement): Promise<HTMLElement | null>;
    render(container: HTMLElement, pageSchema: PageSchema): Promise<void>;
    bindEvents(el: HTMLElement, events: Record<string, string | Function>, elementId: string): void;
    mapPropsToClasses(componentId: string, props: Record<string, unknown>, theme: StyleVariant, explicitVariant?: string, explicitSize?: string, globalContext?: GlobalStyleContext): string[];
    resolveClasses(elementClasses: string, defaultClasses: string): string;
    resolveDataBinding(binding: unknown): unknown;
    private getDataBindingValue;
    private parseBindingPath;
    private getNestedValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRendererService>;
}

declare class ComponentRegistryService {
    private _componentRegistry;
    private _componentModules;
    registerComponent(def: ComponentDef): void;
    registerComponents(defs: ComponentDef[]): void;
    getComponent(selector: string): ComponentDef | undefined;
    registerComponentModule(selector: string, module: Record<string, unknown>): void;
    loadComponentModule(selector: string): Promise<CustomElementConstructor>;
    getComponentModules(): Map<string, Record<string, unknown>>;
    loadComponentsFromSchema(pages: {
        components?: ComponentDef[];
        canvasElements?: ComponentDef[];
    }[]): void;
    hasComponent(selector: string): boolean;
    getRegisteredSelectors(): string[];
}

interface StorageServiceInterface {
    get<T>(key: string): T | null;
    set(key: string, value: unknown): void;
}
interface CrudFilter$1 {
    field: string;
    operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "startsWith" | "endsWith";
    value: unknown;
}
interface CrudQuery$1 {
    filters?: CrudFilter$1[];
    sortBy?: string;
    sortAsc?: boolean;
    limit?: number;
    offset?: number;
}
declare class CrudService$1 {
    private storage;
    init(storage: StorageServiceInterface): void;
    private getStorage;
    private getCollection;
    private saveCollection;
    create<T extends {
        id: string;
    }>(collection: string, item: T): void;
    read<T>(collection: string, id: string): T | null;
    update<T extends {
        id: string;
    }>(collection: string, id: string, changes: Partial<T>): void;
    delete(collection: string, id: string): void;
    query<T>(collection: string, q: CrudQuery$1): T[];
    private applyFilter;
    private applySort;
    private addPending;
    batchCreate<T extends {
        id: string;
    }>(collection: string, items: T[]): void;
    batchDelete(collection: string, ids: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CrudService$1, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CrudService$1>;
}

declare class SignalStoreService {
    private _state;
    state: i0.Signal<Record<string, unknown>>;
    set(key: string, value: unknown): void;
    get(key: string): unknown;
    update(key: string, fn: (value: unknown) => unknown): void;
    delete(key: string): void;
    keys(): string[];
    has(key: string): boolean;
    clear(): void;
    toJSON(): Record<string, unknown>;
    fromJSON(json: Record<string, unknown>): void;
    patch(patch: Record<string, unknown>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalStoreService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalStoreService>;
}

interface DataBinding {
    entity: string;
    field?: string;
    path?: string;
    operation?: "find" | "create" | "update" | "delete";
    params?: Record<string, unknown>;
}
declare class DataBindingResolverService {
    private signalStore;
    private crudService;
    constructor(signalStore: SignalStoreService, crudService: CrudService$1);
    resolveDataBinding(binding: unknown): unknown;
    resolveProps(props: Record<string, unknown>, _componentId: string): Record<string, unknown>;
    private executeCrudOperation;
    private resolveParams;
    private buildCrudQuery;
    private buildFilters;
    private getDataBindingValue;
    private parseBindingPath;
    private getNestedValue;
}

declare class SchemaRouterService {
    private _currentRoute;
    private _schema;
    currentRoute: i0.Signal<string>;
    currentPageId: i0.Signal<string>;
    setSchema(schema: {
        pages: {
            id: string;
            route?: string;
        }[];
    }): void;
    navigate(route: string): void;
    navigateToPage(pageId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRouterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRouterService>;
}

declare class SchemaRouteViewerComponent implements OnInit, AfterViewInit, OnDestroy {
    contentContainer: ElementRef<HTMLElement>;
    headerProps: Record<string, unknown>;
    sidebarProps: Record<string, unknown>;
    private schemaRenderer;
    private schemaRouter;
    private injector;
    private routeEffect;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private renderCurrentPage;
    private createElementNode;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRouteViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SchemaRouteViewerComponent, "lib-schema-route-viewer", never, {}, {}, never, never, true, never>;
}

declare class GuardService {
    canActivate(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<GuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GuardService>;
}

type ThemeMode = "light" | "dark" | "system";
interface AccentShades {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
}
interface ThemeColors {
    [variable: string]: string;
}
declare class ThemeService$1 {
    private _mode;
    private _accentColor;
    private _accentShades;
    private _registeredThemes;
    mode: i0.Signal<ThemeMode>;
    accentColor: i0.Signal<string>;
    accentShades: i0.Signal<AccentShades>;
    effectiveColorMode: i0.Signal<"light" | "dark">;
    constructor();
    setMode(mode: ThemeMode): void;
    setTheme(theme: ThemeMode): void;
    setAccentColor(color: string): void;
    registerTheme(name: string, colors: ThemeColors): void;
    init(): void;
    toggle(): void;
    private applyTheme;
    private applyThemeVariables;
    private darkenColor;
    private applyAccentShades;
    calculateShades(hex: string): AccentShades;
    private hexToRgb;
    private rgbToHex;
    hexToRgba(hex: string, alpha: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeService$1, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeService$1>;
}

interface ToastNotification {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration: number;
    icon?: string;
}
declare class EventBusService {
    private handlers;
    private toasts;
    readonly pendingToasts: i0.Signal<ToastNotification[]>;
    readonly hasToasts: () => boolean;
    emit(event: string, data?: unknown): void;
    on(event: string, handler: (data: unknown) => void, context?: unknown): () => void;
    once(event: string, handler: (data: unknown) => void, context?: unknown): () => void;
    off(event: string, handler?: Function): void;
    offAll(event?: string): void;
    hasListeners(event: string): boolean;
    getListenerCount(event: string): number;
    private generateId;
    showToast(message: string, type?: ToastNotification["type"], duration?: number): string;
    success(message: string, duration?: number): string;
    error(message: string, duration?: number): string;
    warning(message: string, duration?: number): string;
    info(message: string, duration?: number): string;
    dismissToast(id: string): void;
    dismissAllToasts(): void;
    notify(notification: ToastNotification): string;
    getToast(id: string): ToastNotification | undefined;
    clearHistory(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventBusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventBusService>;
}

interface Shortcut {
    id: string;
    key: string;
    modifiers?: string[];
    label: string;
    category?: string;
    handler: string;
    enabled?: boolean;
}
declare class ShortcutService {
    private _shortcuts;
    private eventBus;
    readonly shortcuts: i0.Signal<Shortcut[]>;
    constructor();
    register(shortcut: Shortcut): () => void;
    unregister(id: string): void;
    loadFromSchema(shortcuts: Shortcut[]): void;
    private _handleKeyDown;
    private _checkModifiers;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShortcutService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ShortcutService>;
}

type Locale = 'en' | 'ru';
/**
 * Singleton i18n service for schema-driven UI.
 * Use I18nService.instance.t('key') to translate.
 */
declare class I18nService {
    private static _instance;
    static get instance(): I18nService;
    private readonly _locale;
    get locale(): i0.Signal<Locale>;
    get translations(): Record<string, string>;
    setLocale(locale: Locale): void;
    /**
     * Translate a key. Falls back to English, then to the key itself.
     */
    t(key: string): string;
    /**
     * Get all available locales.
     */
    getAvailableLocales(): Locale[];
    static ɵfac: i0.ɵɵFactoryDeclaration<I18nService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<I18nService>;
}

/**
 * Window-level global state for Translator app.
 * Exposes source/target language codes as signals so any service
 * (including TranslationService) can read them without prop-drilling.
 */
declare class GlobalStateService {
    private static _instance;
    static get instance(): GlobalStateService;
    private readonly _sourceLang;
    private readonly _targetLang;
    private readonly _appLocale;
    get sourceLang(): i0.Signal<string>;
    get targetLang(): i0.Signal<string>;
    get appLocale(): i0.Signal<"en" | "ru">;
    setSourceLang(code: string): void;
    setTargetLang(code: string): void;
    setAppLocale(locale: 'en' | 'ru'): void;
    swapLanguages(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalStateService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalStateService>;
}

interface RetryOptions {
    maxAttempts: number;
    initialDelayMs: number;
    maxDelayMs: number;
}

declare class InvokeWrapperService {
    invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
    invokeWithRetry<T>(cmd: string, args?: Record<string, unknown>, options?: RetryOptions): Promise<T>;
    private invokeWithTimeout;
    static ɵfac: i0.ɵɵFactoryDeclaration<InvokeWrapperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InvokeWrapperService>;
}

type FilterOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
interface CrudFilter {
    field: string;
    operator: FilterOperator;
    value: unknown;
}
interface CrudQuery {
    filter?: CrudFilter[];
    sort?: {
        field: string;
        direction: "asc" | "desc";
    };
    limit?: number;
    offset?: number;
}
interface CrudResult<T> {
    data: T[];
    total: number;
}

declare class CrudService {
    private entityName;
    constructor(entityName: string);
    execute<T>(operation: "find" | "create" | "update" | "delete", params?: Record<string, unknown>): Promise<{
        data?: T;
        results?: CrudResult<T>;
    }>;
    find<T>(query?: CrudQuery): Promise<CrudResult<T>>;
    create<T>(data: Partial<T>): Promise<T>;
    update<T>(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}

declare enum ResponseStatus {
    Success = "success",
    Created = "created",
    Updated = "updated",
    Deleted = "deleted",
    Error = "error",
    ValidationError = "validationError",
    NotFound = "notFound",
    Unauthorized = "unauthorized",
    Forbidden = "forbidden"
}
interface Response<T = unknown> {
    status: ResponseStatus;
    message: string;
    data: T | null;
}
declare function isSuccess<T>(response: Response<T>): boolean;
declare function isError<T>(response: Response<T>): boolean;
declare function getErrorMessage<T>(response: Response<T>): string | null;
declare function unwrapResponse<T>(response: Response<T>): T;
declare function mapResponse<U, T>(response: Response<T>, mapper: (data: T) => U): Response<U>;

interface AppError {
    type: ErrorType;
    message: string;
    entity?: string;
    details?: Record<string, unknown>;
}
declare enum ErrorType {
    NotFound = "notFound",
    ValidationError = "validationError",
    Duplicate = "duplicate",
    Unauthorized = "unauthorized",
    Forbidden = "forbidden",
    Internal = "internal",
    Database = "database",
    Network = "network"
}
declare function parseError(error: unknown): AppError;
declare function formatError(error: AppError): string;

interface InvokeOptionsWithRetry {
    timeout?: number;
    retryCount?: number;
    retryDelay?: number;
}
interface CommandResult<T> {
    success: boolean;
    data: T | null;
    error: AppError | null;
}
declare function invokeCommand<T>(command: string, args?: Record<string, unknown>, options?: InvokeOptionsWithRetry): Promise<CommandResult<T>>;
declare function invokeCommandWithResponse<T>(command: string, args?: Record<string, unknown>, options?: InvokeOptionsWithRetry): Promise<Response<T>>;
declare function invokeVoid(command: string, args?: Record<string, unknown>, options?: InvokeOptionsWithRetry): Promise<void>;
declare function invokeWithError<T>(command: string, args?: Record<string, unknown>, options?: InvokeOptionsWithRetry): Promise<T>;

type CompareFn<T> = (a: T, b: T) => number;
declare function quickSort<T>(arr: T[], compareFn?: CompareFn<T>): T[];
declare function mergeSort<T>(arr: T[], compareFn?: CompareFn<T>): T[];
declare function bubbleSort<T>(arr: T[], compareFn?: CompareFn<T>): T[];
declare function insertionSort<T>(arr: T[], compareFn?: CompareFn<T>): T[];

interface GraphEdge {
    node: string;
    weight: number;
}
type Graph = Map<string, GraphEdge[]>;
declare function createGraph(): Graph;
declare function addNode(graph: Graph, label: string): void;
declare function addEdge(graph: Graph, from: string, to: string, weight: number): void;
declare function dijkstra(graph: Graph, start: string): Map<string, number | null>;

declare class ThemeService {
    private readonly _themeChanged$;
    readonly themeChanged$: Observable<{
        variant: StyleVariant;
        isDark: boolean;
    }>;
    constructor();
    loadTheme(variant: StyleVariant): Promise<void>;
    toggleDarkMode(): void;
    isDarkMode(): boolean;
    setDarkMode(enabled: boolean): void;
    getCurrentTheme(): StyleVariant;
    private injectThemeStyles;
    private getDarkModeCSS;
    private getDarkModeCSSForVariant;
    private materialDesignV3DarkCSS;
    private neumorphismDarkCSS;
    private claymorphismDarkCSS;
    private glassmorphismDarkCSS;
    private initializeDarkMode;
    private loadDarkModePreference;
    private saveDarkModePreference;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeService>;
}

declare class UiShowcaseComponent {
    private themeService;
    readonly colorModes: readonly ["light", "dark", "system"];
    readonly styleVariants: StyleVariantConfig[];
    readonly currentColorMode: i0.WritableSignal<string>;
    readonly currentStyleVariant: i0.WritableSignal<StyleVariant>;
    readonly searchQuery: i0.WritableSignal<string>;
    readonly selectedCategory: i0.WritableSignal<string>;
    readonly allComponents: SharedComponentDef[];
    readonly categories: i0.Signal<string[]>;
    readonly filteredComponents: i0.Signal<SharedComponentDef[]>;
    setColorMode(mode: string): void;
    setStyleVariant(variant: StyleVariant): Promise<void>;
    getComponentDemoContent(comp: SharedComponentDef): string;
    getComponentProps(comp: SharedComponentDef): Record<string, any>;
    setComponentProps(el: HTMLElement, props: Record<string, any>): void;
    renderComponent(card: HTMLElement, comp: SharedComponentDef): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UiShowcaseComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<UiShowcaseComponent, "app-ui-showcase", never, {}, {}, never, never, true, never>;
}

export { ComponentRegistryService, CrudService, DataBindingResolverService, ErrorType, EventBusService, GlobalStateService, GuardService, I18nService, InvokeWrapperService, LayoutEngineService, ResponseStatus, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, ShortcutService, ThemeService as StyleThemeService, ThemeService$1 as ThemeService, UiShowcaseComponent, addEdge, addNode, bubbleSort, components, createGraph, dataComponents, dijkstra, feedbackComponents, formatError, getAllStyleVariants, getComponentStyleClasses, getCurrentStyle, getErrorMessage, getStyleClassPrefix, insertionSort, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, isError, isSuccess, layoutComponents, loadStyleVariant, mapResponse, mergeSort, parseError, quickSort, setCurrentStyle, uiComponents, unwrapResponse };
export type { AppError, ColorMode, CompareFn, ComponentBehavior, ComponentDef, ComponentStyleMap, DataBinding, ElementConfig, ElementEvents, Graph, GraphEdge, GridPosition, GridTemplate, Layout, Page, RenderContext, Response, Shortcut, StyleVariant, Theme, ThemeConfig, ToastNotification$1 as ToastNotification, UiSchema };
