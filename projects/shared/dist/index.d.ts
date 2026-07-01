import * as lit from 'lit';
import { LitElement } from 'lit';
import * as _angular_core from '@angular/core';
import { OnInit, OnChanges, SimpleChanges } from '@angular/core';

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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-stats-card": AppStatsCard;
    }
}

interface TableColumn {
    name: string;
    key: string;
}
declare class AppTableView extends LitElement {
    columns: string;
    data: string;
    constructor();
    connectedCallback(): void;
    private _getColumns;
    private _getData;
    static styles: lit.CSSResult;
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-table-view": AppTableView;
    }
}

interface DataTableColumn {
    name: string;
    key: string;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-json-view": AppJsonView;
    }
}

interface PaletteCategory {
    name: string;
    components: string[];
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-canvas": AppCanvas;
    }
}

interface ElementProperty {
    key: string;
    label: string;
    value: unknown;
    type: "string" | "number" | "boolean" | "select";
    options?: string[];
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-properties-panel": AppPropertiesPanel;
    }
}

interface BottomPanelTab {
    id: string;
    label: string;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-header": AppHeader;
    }
}

interface SidebarItem {
    label: string;
    icon?: string;
    id?: string;
    children?: SidebarItem[];
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-page-container": AppPageContainer;
    }
}

interface ToolbarAction {
    label: string;
    icon?: string;
    variant?: "primary" | "secondary" | "danger" | "ghost";
    id?: string;
}
declare class AppPageToolbar extends LitElement {
    title: string;
    actions: string;
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _getActions;
    private _handleActionClick;
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-icon": AppIcon;
    }
}

interface LanguageOption {
    code: string;
    name: string;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-theme-toggle": AppThemeToggle;
    }
}

interface ShortcutEntry {
    key: string;
    description: string;
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
    render(): lit.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "app-shortcuts-overlay": AppShortcutsOverlay;
    }
}

declare class TextComponent {
    tag: string;
    text: string;
    classes: string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<TextComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<TextComponent, "app-text", never, { "tag": { "alias": "tag"; "required": false; }; "text": { "alias": "text"; "required": false; }; "classes": { "alias": "classes"; "required": false; }; }, {}, never, never, true, never>;
}

type ColorMode = "light" | "dark" | "system";
interface Theme {
    mode: ColorMode;
    accentColor?: string;
    cssVariables?: Record<string, string>;
}
interface GridPosition {
    column?: number | null;
    row?: number | null;
    colSpan?: number | null;
    rowSpan?: number | null;
    colStart?: number | null;
    rowStart?: number | null;
}
interface DataBinding {
    entity: string;
    field: string | null;
    transform?: string;
    format?: string;
}
interface ComponentDef {
    id: string;
    selector: string;
    module?: string;
    behaviors?: ComponentBehavior;
}
interface CanvasElement {
    id: string;
    componentId: string;
    gridPosition?: GridPosition;
    classes?: string;
    children?: string[];
    props?: Record<string, unknown>;
    dataBinding?: DataBinding | null;
    events?: ElementEvents;
    slots?: Record<string, CanvasElement[]>;
}
interface Page {
    id: string;
    route: string;
    title?: string;
    layout?: string;
    canvasElements: CanvasElement[];
    meta?: {
        title?: string;
        class?: string;
    };
    guards?: Array<{
        type: string;
        params?: Record<string, unknown>;
    }>;
}
interface Layout {
    id: string;
    name: string;
    slots?: Array<{
        name: string;
        elements?: CanvasElement[];
    }>;
}
interface UiSchema {
    version: string;
    pages: Page[];
    layouts: Layout[];
    theme?: Theme;
}
interface ElementConfig {
    id: string;
    componentId: string;
    componentDef: ComponentDef | null;
    gridPosition: GridPosition;
    classes: string;
    children: string[];
    dataBinding: DataBinding | null;
    props: Record<string, unknown>;
    events: ElementEvents;
    slots: Record<string, CanvasElement[]>;
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
    services: Map<string, unknown>;
    theme: Theme;
    colorMode: ColorMode;
    resolvedElements: Map<string, HTMLElement>;
    eventHandlers: Map<string, Function>;
}
interface ComponentBehavior {
    selfMethods?: Record<string, string>;
    classSetters?: Record<string, unknown>;
    eventHandlers?: ElementEvents;
}
type AppColorMode = "light" | "dark" | "system";
interface ToastNotification {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration: number;
    icon?: string;
}
interface ThemeConfig {
    mode: AppColorMode;
    accentColor?: string;
    cssVariables?: Record<string, string>;
}
interface SharedComponentDef {
    id: string;
    name: string;
    selector: string;
    packageType: string;
    category: string;
    props: Array<{
        name: string;
        type: string;
        default?: unknown;
        options?: string[];
    }>;
    template?: string;
    css?: string;
}

declare class SchemaRendererService {
    private router;
    private componentRegistry;
    private bindingResolver;
    private styleResolver;
    private themeService;
    private eventBus;
    private renderContexts;
    renderPage(pageId: string, container: HTMLElement): Promise<void>;
    render(page: Page, container: HTMLElement): Promise<void>;
    renderLayout(layoutId: string, container: HTMLElement): Promise<void>;
    private createRenderContext;
    private createRenderContextForLayout;
    renderElement(element: CanvasElement, context: RenderContext): Promise<HTMLElement | null>;
    private resolveElementProps;
    private applyProps;
    private applyStyles;
    private applyDataBinding;
    private applyEventHandlers;
    destroyPage(pageId: string): void;
    getRenderContext(pageId: string): RenderContext | undefined;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SchemaRendererService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<SchemaRendererService>;
}

interface ComponentDefinition {
    selector: string;
    module?: string;
    behaviors?: ComponentBehavior;
}
declare class ComponentRegistryService {
    private registry;
    private componentManifest;
    constructor();
    private registerBuiltInComponents;
    private loadComponentManifest;
    register(componentId: string, definition: ComponentDefinition): void;
    unregister(componentId: string): void;
    get(componentId: string): ComponentDefinition | undefined;
    getSelector(componentId: string): string;
    has(componentId: string): boolean;
    resolveBehavior(componentId: string): ComponentBehavior | undefined;
    mergeBehavior(componentId: string, schemaBehavior?: ComponentBehavior): ComponentBehavior;
    private mergeEventHandlers;
    getAllComponentIds(): string[];
    getComponentsByCategory(category: string): string[];
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ComponentRegistryService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<ComponentRegistryService>;
}

declare class DataBindingResolver {
    private functionRegistry;
    private dataStore;
    registerFunction(name: string, fn: Function): void;
    unregisterFunction(name: string): void;
    setData(entity: string, data: Record<string, unknown>): void;
    getData(entity: string): Record<string, unknown> | undefined;
    clearData(entity?: string): void;
    resolveBinding(binding: DataBinding | null): unknown;
    resolveDataBinding(binding: DataBinding | null): unknown;
    resolve(entity: string, field: string | null): unknown;
    resolveExpression(expression: string): unknown;
    private resolvePath;
    evaluateCondition(condition: string): boolean;
    callFunction(fnName: string, args?: unknown[]): unknown;
    getRegisteredFunctions(): string[];
    hasFunction(fnName: string): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DataBindingResolver, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<DataBindingResolver>;
}

interface StyleResolution {
    classes: string;
    inlineStyles: Record<string, string>;
}
declare class StyleResolver {
    private readonly DARK_MODE_PREFIX;
    private readonly RESPONSIVE_PREFIXES;
    private readonly IMPORTANT_PREFIX;
    resolveClasses(classes: string, options?: {
        colorMode?: "light" | "dark" | "system";
        extraClasses?: string;
    }): StyleResolution;
    private processClasses;
    private processClass;
    resolveGridPosition(position: {
        column?: number | null;
        row?: number | null;
        colSpan?: number | null;
        rowSpan?: number | null;
        colStart?: number | null;
        rowStart?: number | null;
    }): string;
    composeClasses(...classGroups: (string | undefined | null)[]): string;
    getVariantClasses(baseClass: string, variant: string): string;
    resolveResponsiveClasses(classes: string, breakpoint: "sm" | "md" | "lg" | "xl" | "2xl"): string;
    resolveDarkModeClasses(classes: string): string;
    private isColorClass;
    buildCssVariables(vars: Record<string, string>): string;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<StyleResolver, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<StyleResolver>;
}

interface NavigationOptions {
    replaceUrl?: boolean;
    queryParams?: Record<string, string>;
}
declare class SchemaRouterService {
    private guardService;
    private readonly _schema;
    private readonly _currentPage;
    private readonly _currentLayout;
    private readonly _currentRoute;
    private readonly _params;
    private readonly _queryParams;
    private readonly _isLoading;
    private readonly _error;
    readonly schema: _angular_core.Signal<UiSchema>;
    readonly currentPage: _angular_core.Signal<Page>;
    readonly currentLayout: _angular_core.Signal<Layout>;
    readonly currentRoute: _angular_core.Signal<string>;
    readonly params: _angular_core.Signal<Record<string, string>>;
    readonly queryParams: _angular_core.Signal<Record<string, string>>;
    readonly isLoading: _angular_core.Signal<boolean>;
    readonly error: _angular_core.Signal<string>;
    readonly hasSchema: _angular_core.Signal<boolean>;
    readonly currentPageId: _angular_core.Signal<string>;
    readonly currentPageTitle: _angular_core.Signal<string>;
    setSchema(schema: UiSchema): void;
    clearSchema(): void;
    navigate(route: string, options?: NavigationOptions): Promise<boolean>;
    resolveRoute(route: string): {
        page: Page | null;
        layout: Layout | null;
        params: Record<string, string>;
    } | null;
    private matchRoute;
    getPage(pageId: string): Page | null;
    getLayout(layoutId: string): Layout | null;
    getAllPages(): Page[];
    getAllLayouts(): Layout[];
    updateQueryParams(params: Record<string, string>): void;
    reset(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SchemaRouterService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<SchemaRouterService>;
}

interface GuardResult {
    allowed: boolean;
    redirectTo?: string;
    message?: string;
}
declare class GuardService {
    private guardRegistry;
    constructor();
    private registerBuiltInGuards;
    register(name: string, guard: (params?: Record<string, unknown>) => Promise<GuardResult>): void;
    unregister(name: string): void;
    canActivate(guardType: string, params?: Record<string, unknown>): Promise<boolean>;
    evaluate(guardType: string, params?: Record<string, unknown>): Promise<GuardResult>;
    hasGuard(name: string): boolean;
    getRegisteredGuards(): string[];
    private checkAuthentication;
    private checkRole;
    private checkPermission;
    private getCurrentTheme;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GuardService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<GuardService>;
}

declare class SchemaRouteViewerComponent implements OnInit, OnChanges {
    route: string;
    private router;
    readonly page: _angular_core.Signal<Page>;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SchemaRouteViewerComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SchemaRouteViewerComponent, "lib-schema-route-viewer", never, { "route": { "alias": "route"; "required": false; }; }, {}, never, never, true, never>;
}

type SchemaLoadMode = "embedded" | "http" | "tauri";
interface SchemaLoadOptions {
    mode: SchemaLoadMode;
    source: string;
}
declare class SchemaFetcherService {
    private http;
    loadSchema(options: SchemaLoadOptions): Promise<UiSchema>;
    private loadEmbedded;
    private loadHttp;
    private loadTauri;
    loadSchemaFromFile(file: File): Promise<UiSchema>;
    validateSchema(schema: unknown): schema is UiSchema;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SchemaFetcherService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<SchemaFetcherService>;
}

declare class ThemeService {
    private readonly _colorMode;
    private readonly _resolvedMode;
    private readonly _accentColor;
    private readonly _customCssVars;
    private styleElement;
    private mediaQuery;
    readonly colorMode: _angular_core.Signal<ColorMode>;
    readonly resolvedMode: _angular_core.Signal<"light" | "dark">;
    readonly accentColor: _angular_core.Signal<string>;
    readonly isDark: _angular_core.Signal<boolean>;
    readonly isLight: _angular_core.Signal<boolean>;
    constructor();
    private initTheme;
    private setupEffect;
    private updateResolvedMode;
    private injectStyles;
    private applyTheme;
    toggle(): void;
    setMode(mode: ColorMode): void;
    setAccentColor(color: string): void;
    setCustomCssVariables(vars: Record<string, string>): void;
    getThemeIcon(): string;
    getCurrentTheme(): ThemeConfig;
    applyThemeConfig(config: ThemeConfig): void;
    private darkenColor;
    private lightenColor;
    private adjustColor;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<ThemeService>;
}

type EventHandler = (...args: unknown[]) => void;
declare class EventBusService {
    private subscriptions;
    private eventHistory;
    private toastQueue;
    private readonly MAX_HISTORY;
    readonly history: _angular_core.Signal<{
        event: string;
        data: unknown;
        timestamp: number;
    }[]>;
    readonly pendingToasts: _angular_core.Signal<ToastNotification[]>;
    readonly hasToasts: _angular_core.Signal<boolean>;
    emit(event: string, data?: unknown): void;
    on(event: string, handler: EventHandler, context?: unknown): () => void;
    once(event: string, handler: EventHandler, context?: unknown): () => void;
    off(event: string, subscriptionId: string): void;
    offAll(event?: string): void;
    hasListeners(event: string): boolean;
    getListenerCount(event: string): number;
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
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<EventBusService, never>;
    static ɵprov: _angular_core.ɵɵInjectableDeclaration<EventBusService>;
}
declare global {
    interface Window {
        showToast?: (message: string, type?: ToastNotification["type"], duration?: number) => string;
        eventBus?: EventBusService;
    }
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

declare const uiComponents: SharedComponentDef[];
declare const layoutComponents: SharedComponentDef[];
declare const feedbackComponents: SharedComponentDef[];
declare const dataComponents: SharedComponentDef[];
declare const components: SharedComponentDef[];

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

type StyleVariant = "claymorphism" | "glassmorphism" | "neumorphism" | "material-design-v3";
interface StyleVariantConfig {
    id: StyleVariant;
    name: string;
    cssFile: string;
    classPrefix: string;
    description: string;
}
declare function loadStyleVariant(variant: StyleVariant): Promise<void>;
declare function setCurrentStyle(variant: StyleVariant): void;
declare function getCurrentStyle(): StyleVariant;
declare function getStyleClassPrefix(variant: StyleVariant): string;
declare function getAllStyleVariants(): StyleVariantConfig[];

declare class UiShowcaseComponent {
    private themeService;
    readonly colorModes: readonly ["light", "dark", "system"];
    readonly styleVariants: StyleVariantConfig[];
    readonly currentColorMode: _angular_core.WritableSignal<string>;
    readonly currentStyleVariant: _angular_core.WritableSignal<StyleVariant>;
    readonly searchQuery: _angular_core.WritableSignal<string>;
    readonly selectedCategory: _angular_core.WritableSignal<string>;
    readonly allComponents: SharedComponentDef[];
    readonly categories: _angular_core.Signal<string[]>;
    readonly filteredComponents: _angular_core.Signal<SharedComponentDef[]>;
    setColorMode(mode: string): void;
    setStyleVariant(variant: StyleVariant): Promise<void>;
    getComponentDemoContent(comp: SharedComponentDef): string;
    getComponentProps(comp: SharedComponentDef): Record<string, any>;
    setComponentProps(el: HTMLElement, props: Record<string, any>): void;
    renderComponent(card: HTMLElement, comp: SharedComponentDef): Promise<void>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<UiShowcaseComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<UiShowcaseComponent, "app-ui-showcase", never, {}, {}, never, never, true, never>;
}

export { AppAvatar, AppBadge, AppBottomPanel, AppButton, AppCanvas, AppCard, AppChip, AppComponentPalette, AppConfirmDialog, AppDataTable, AppDialog, AppEmptyState, AppFooter, AppHeader, AppIcon, AppInput, AppJsonView, AppLanguageSelector, AppLoading, AppModal, AppPageContainer, AppPageToolbar, AppPagination, AppProgressBar, AppPropertiesPanel, AppRadio, AppSegmentSelector, AppSelect, AppShortcutsOverlay, AppSidebar, AppSlider, AppSplitView, AppStatsCard, AppSwapButton, AppSwitch, AppTableView, AppTabs, AppTextInput, AppTextarea, AppThemeToggle, AppToast, AppTranslationOutput, ComponentRegistryService, CrudService, DataBindingResolver, EventBusService, GuardService, InvokeWrapperService, SchemaFetcherService, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, StyleResolver, TextComponent, ThemeService, UiShowcaseComponent, components, dataComponents, feedbackComponents, getAllStyleVariants, getCurrentStyle, getStyleClassPrefix, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, layoutComponents, loadStyleVariant, setCurrentStyle, uiComponents };
export type { AvatarSize, BadgeSize, BadgeVariant, BottomPanelTab, ButtonSize, ButtonStyle, ButtonVariant, CanvasElement, ColorMode, ComponentBehavior, ComponentDef, DataBinding, DataTableColumn, DialogSize, ElementConfig, ElementEvents, ElementProperty, GridPosition, IconName, InputType, LanguageOption, Layout, LoadingSize, ModalSize, Page, PaletteCategory, RenderContext, ShortcutEntry, SidebarItem, StyleVariant, TableColumn, Theme, ThemeConfig, ToastNotification, ToastType, ToolbarAction, UiSchema };
