import * as lit from 'lit';
import { LitElement } from 'lit';
import * as i0 from '@angular/core';
import { AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import * as _angular_router from '@angular/router';

type ButtonVariant = "primary" | "secondary" | "danger" | "warning" | "success" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
declare class AppButton extends LitElement {
    variant: ButtonVariant;
    size: ButtonSize;
    disabled: boolean;
    loading: boolean;
    icon: string | null;
    iconPosition: "left" | "right";
    fullWidth: boolean;
    type: "button" | "submit" | "reset";
    constructor();
    connectedCallback(): void;
    static styles: lit.CSSResult;
    private _handleClick;
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

interface GridPosition {
    column: number;
    row: number;
    colSpan: number;
    rowSpan: number;
    colStart: number | null;
    rowStart: number | null;
}
interface DataBinding {
    entity: string;
    field: string | null;
}
interface CanvasElement {
    id: string;
    componentId: string;
    gridPosition: GridPosition;
    classes: string;
    children: string[];
    dataBinding: DataBinding | null;
}
interface ComponentProp {
    propType: string;
    defaultValue: string | null;
    options: string[];
    required: boolean;
}
interface GridDefaults {
    defaultColSpan: number;
    defaultRowSpan: number;
    minWidth: string | null;
    maxWidth: string | null;
}
interface ComponentDef {
    id: string;
    name: string;
    category: string;
    componentType: string;
    template: string | null;
    props: Record<string, ComponentProp>;
    defaultClasses: string;
    gridDefaults: GridDefaults | null;
    slots: string[];
    allowedChildren: string;
    events: string[];
    i18N: Record<string, Record<string, string>>;
}
interface LayoutSlot {
    componentId: string | null;
    height: string | null;
    width: string | null;
    dynamic: boolean;
    gridColumn: string | null;
    gridRow: string | null;
    gridArea: string | null;
    responsiveClasses: Record<string, string>;
}
interface GridTrack {
    size: string;
    min: string | null;
    max: string | null;
}
interface GridArea {
    name: string;
    columnStart: string;
    columnEnd: string;
    rowStart: string;
    rowEnd: string;
}
interface GridTemplate {
    id: string;
    columns: GridTrack[];
    rows: GridTrack[];
    gap: string;
    areas: GridArea[];
    breakpoints: Record<string, string>;
}
interface Layout {
    id: string;
    name: string;
    slots: Record<string, LayoutSlot>;
    gridTemplate: GridTemplate | null;
}
interface PageMeta {
    title: string | null;
    icon: string | null;
    breadcrumb: string[];
}
interface PageSection {
    componentId: string | null;
    visible: boolean;
    dynamic: boolean;
}
interface Page {
    id: string;
    name: string;
    route: string;
    layout: string | null;
    meta: PageMeta;
    sections: Record<string, PageSection>;
    canvasElements: CanvasElement[];
}
interface ServiceCrud {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
    query: boolean;
}
interface ServiceField {
    name: string;
    fieldType: string;
    required: boolean;
    options: string[];
}
interface ServiceDef {
    id: string;
    name: string;
    entity: string;
    provider: string;
    crud: ServiceCrud;
    fields: ServiceField[];
}
interface CommandDef {
    name: string;
    params: string[];
    returnType: string;
}
interface MiddlewareDef {
    name: string;
    description: string;
}
interface ModuleDef {
    id: string;
    name: string;
    commands: CommandDef[];
    middleware: MiddlewareDef[];
}
interface ThemeColors {
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    bgElevated: string;
    bgHover: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderLight: string;
    primary: string;
    secondary: string;
    accent: string;
    accentHover: string;
    success: string;
    warning: string;
    error: string;
}
interface Theme {
    name: string;
    label: string;
    colors: ThemeColors;
}
type ColorMode = "light" | "dark" | "system";
interface AppSettings {
    defaultLocale: string;
    supportedLocales: string[];
    tailwindPreset: string;
    theme: string;
    themes: string[];
    colorMode: ColorMode;
}
interface AppConfig {
    id: string;
    name: string;
    version: string;
    description: string;
    identifier: string;
    settings: AppSettings;
}
interface I18nConfig {
    locales: Record<string, LocaleMap>;
}
interface LocaleMap {
    nav: Record<string, string>;
    actions: Record<string, string>;
    messages: Record<string, string>;
}
interface UiSchema {
    schemaVersion: string;
    app: AppConfig;
    pages: Page[];
    layouts: Layout[];
    components: ComponentDef[];
    sharedComponents: ComponentDef[];
    services: ServiceDef[];
    modules: ModuleDef[];
    i18N: I18nConfig;
}
interface ElementConfig {
    id: string;
    componentId: string;
    componentDef: ComponentDef;
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
interface SharedComponentProp {
    name: string;
    type: string;
    default?: unknown;
    options?: string[];
}
interface SharedComponentDef {
    id: string;
    name: string;
    selector: string;
    packageType: string;
    category: string;
    props: SharedComponentProp[];
    template: string;
    css: string;
}

declare class SchemaRendererService {
    private componentRegistry;
    private dataBindingResolver;
    private styleResolver;
    private _schema;
    private _currentPage;
    private _currentLayout;
    private _schemaError;
    private _isLoading;
    private _renderContext;
    readonly currentPage: i0.Signal<Page>;
    readonly schemaError: i0.Signal<string>;
    readonly isLoading: i0.Signal<boolean>;
    readonly schema: i0.Signal<UiSchema>;
    readonly currentLayout: i0.Signal<Layout>;
    private elementInstances;
    private eventHandlers;
    setSchema(schema: UiSchema): void;
    getSchema(): UiSchema | null;
    render(pageId: string, container: HTMLElement, context?: Partial<RenderContext>): Promise<void>;
    renderPage(pageId: string, container: HTMLElement, context?: Partial<RenderContext>): Promise<void>;
    renderSection(section: PageSection, container: HTMLElement): Promise<void>;
    createElement(canvasElement: CanvasElement, parent: HTMLElement, options?: {
        insertIndex?: number;
        slotName?: string;
    }): Promise<HTMLElement>;
    resolveDataBinding(binding: DataBinding): unknown;
    resolveProps(componentId: string, props: Record<string, unknown>): Record<string, unknown>;
    resolveClasses(baseClasses: string, overrideClasses?: string): string;
    extractStylesFromClasses(classString: string): Record<string, string>;
    updateElement(elementId: string, updates: Partial<CanvasElement>): void;
    destroyElement(elementId: string): void;
    clear(): void;
    private updateRenderContext;
    private applyGridPosition;
    private applyClasses;
    private applyProps;
    private applyDataBinding;
    private applyEvents;
    private getCanvasElement;
    private createFallbackElement;
    private getDataBindingTarget;
    private getDefaultTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRendererService>;
}

interface RegisteredComponent {
    def: ComponentDef;
    selector: string;
    inputs: string[];
    outputs: string[];
}
declare class ComponentRegistryService {
    private registry;
    private selectorToId;
    registerComponents(components: ComponentDef[]): void;
    registerComponent(def: ComponentDef): RegisteredComponent;
    getComponent(componentId: string): RegisteredComponent | undefined;
    getComponentBySelector(selector: string): RegisteredComponent | undefined;
    hasComponent(componentId: string): boolean;
    getAllComponents(): RegisteredComponent[];
    getComponentIds(): string[];
    clear(): void;
    private generateSelector;
    private getCategoryPrefix;
    private kebabCase;
    private extractInputs;
    private extractOutputs;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentRegistryService>;
}

interface BindingContext {
    data: Record<string, Record<string, unknown>>;
    params: Record<string, string>;
    services: Map<string, unknown>;
    functions: Map<string, Function>;
}
declare class DataBindingResolver {
    private context;
    private bindingPattern;
    private contextPattern;
    setContext(context: Partial<BindingContext>): void;
    resolve(template: string, context?: Partial<BindingContext>): string;
    resolveValue(value: unknown, context?: Partial<BindingContext>): unknown;
    resolveDataBinding(binding: DataBinding, context?: Partial<BindingContext>): unknown;
    bindFunction(name: string, fn: Function): void;
    getBoundFunction(name: string): Function | undefined;
    hasBinding(template: string): boolean;
    extractBindingPaths(template: string): string[];
    private getNestedValue;
    private resolveBindingPath;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataBindingResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataBindingResolver>;
}

interface ResolvedStyles {
    classes: string[];
    inlineStyles: Record<string, string>;
    cssVariables: Record<string, string>;
}
interface StyleResolutionOptions {
    applyThemeVariables: boolean;
    extractTailwind: boolean;
    prefix?: string;
}
declare class StyleResolver {
    private theme;
    private colorMode;
    private tailwindClassPattern;
    setTheme(theme: Theme): void;
    setColorMode(mode: "light" | "dark" | "system"): void;
    extractStyles(classString: string): ResolvedStyles;
    resolveClasses(baseClasses: string, overrideClasses?: string, options?: StyleResolutionOptions): ResolvedStyles;
    resolveCssVariables(css: Record<string, string>, theme?: Theme): Record<string, string>;
    applyStylesToElement(element: HTMLElement, resolved: ResolvedStyles): void;
    extractTailwindClasses(classString: string): string[];
    buildClassString(classes: string[], prefix?: string): string;
    private parseClasses;
    private parseCssVariable;
    private isTailwindClass;
    private mergeClassLists;
    private applyThemeColors;
    static ɵfac: i0.ɵɵFactoryDeclaration<StyleResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StyleResolver>;
}

interface GuardDefinition {
    name: string;
    condition: string;
    redirectTo?: string;
}
interface GuardEvaluationResult {
    guardName: string;
    passed: boolean;
    redirectTo?: string;
    error?: string;
}
declare class GuardService {
    private ngRouter;
    private guardRegistry;
    private guardFunctions;
    registerGuard(name: string, definition: GuardDefinition): void;
    registerGuardFunction(name: string, fn: () => boolean): void;
    evaluateGuard(guardName: string): Promise<GuardEvaluationResult>;
    evaluateGuards(match: RouteMatch): Promise<GuardEvaluationResult[]>;
    canActivateGuard(match: RouteMatch): boolean | string;
    createGuardFunction(guardName: string): () => Promise<boolean | _angular_router.UrlTree>;
    private evaluateCondition;
    hasGuard(guardName: string): boolean;
    clearGuards(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GuardService>;
}

interface RouteMatch {
    page: Page;
    params: Record<string, string>;
    guards: GuardEvaluationResult[];
}

declare class SchemaRouterService {
    private renderer;
    private ngRouter;
    private _currentPage;
    private _currentLayout;
    private _currentRoute;
    private _routeParams;
    readonly currentPage: i0.Signal<Page>;
    readonly currentLayout: i0.Signal<Layout>;
    readonly currentRoute: i0.Signal<string>;
    readonly routeParams: i0.Signal<Record<string, string>>;
    private schema;
    private routeRegistry;
    readonly currentPageSignal: i0.Signal<Page>;
    readonly currentLayoutSignal: i0.Signal<Layout>;
    setSchema(schema: UiSchema): void;
    loadSchema(mode: "embedded" | "file" | "cloud", source?: string): Promise<void>;
    navigate(route: string, params?: Record<string, string>): Promise<boolean>;
    setCurrentPage(page: Page): void;
    setCurrentRoute(route: string): void;
    getPage(pageId: string): Page | undefined;
    getPageByRoute(route: string): Page | undefined;
    resolveRoute(route: string, params?: Record<string, string>): RouteMatch | null;
    getAllRoutes(): Array<{
        route: string;
        page: Page;
    }>;
    buildRouteRegistry(): void;
    updateRouteParam(key: string, value: string): void;
    clearRouteParams(): void;
    generateRoute(pageId: string, params?: Record<string, string>): string | null;
    matchRoute(path: string): RouteMatch | null;
    private routeToRegex;
    private extractParamNames;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRouterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRouterService>;
}

declare class SchemaRouteViewerComponent implements AfterViewInit, OnDestroy {
    route: string;
    containerRef: ElementRef<HTMLElement>;
    private router;
    private renderer;
    readonly isLoading: i0.WritableSignal<boolean>;
    readonly error: i0.WritableSignal<string>;
    private isInitialized;
    constructor();
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    loadRoute(route: string): Promise<void>;
    private renderCurrentRoute;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRouteViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SchemaRouteViewerComponent, "lib-schema-route-viewer", never, { "route": { "alias": "route"; "required": false; }; }, {}, never, never, true, never>;
}

type SchemaLoadMode = "embedded" | "file" | "cloud";
interface SchemaLoadOptions {
    mode: SchemaLoadMode;
    source?: string;
    watchForChanges?: boolean;
    reloadDebounceMs?: number;
}
interface SchemaChangeEvent {
    schema: UiSchema;
    timestamp: number;
}
declare class SchemaFetcherService {
    private currentSchema;
    private currentOptions;
    private watchCallback;
    loadSchema(options: SchemaLoadOptions): Promise<UiSchema>;
    reloadSchema(): Promise<UiSchema | null>;
    watchSchemaChanges(callback: (event: SchemaChangeEvent) => void): () => void;
    getCurrentSchema(): UiSchema | null;
    private loadEmbeddedSchema;
    private loadFileSchema;
    private loadCloudSchema;
    private validateSchema;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaFetcherService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaFetcherService>;
}

declare class ThemeService {
    private _currentTheme;
    private _colorMode;
    private _systemPrefersDark;
    private _overrides;
    readonly currentTheme: i0.Signal<Theme>;
    readonly colorMode: i0.Signal<ColorMode>;
    readonly effectiveColorMode: i0.Signal<"light" | "dark">;
    readonly effectiveTheme: i0.Signal<Theme>;
    constructor();
    getTheme(): Theme | null;
    setTheme(theme: Theme): void;
    applyTheme(theme: Theme): void;
    setColorMode(mode: ColorMode): void;
    toggleColorMode(): void;
    overrideColors(colors: Partial<ThemeColors>): void;
    setCssVariables(variables: Record<string, string>): void;
    clearOverrides(): void;
    private initSystemPrefersDarkListener;
    private getSystemPrefersDark;
    private applyThemeColors;
    private applyCssVariables;
    private applyColorMode;
    private getDefaultTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeService>;
}

type EventHandler<T = unknown> = (payload: T) => void;
interface EventSubscription {
    unsubscribe(): void;
}
interface EventMetadata {
    timestamp: number;
    source?: string;
}
interface EventMessage<T = unknown> {
    type: string;
    payload: T;
    metadata: EventMetadata;
}
declare class EventBusService {
    private handlers;
    private eventHistory;
    private maxHistorySize;
    emit<T>(event: string, payload?: T, source?: string): void;
    on<T>(event: string, handler: EventHandler<T>): EventSubscription;
    once<T>(event: string, handler: EventHandler<T>): EventSubscription;
    off<T>(event: string, handler: EventHandler<T>): void;
    clear(event?: string): void;
    hasListeners(event: string): boolean;
    getListenerCount(event: string): number;
    getEventHistory(event?: string): EventMessage[];
    clearHistory(): void;
    createEventNamespace(namespace: string): NamespacedEventBus;
    private addToHistory;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventBusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventBusService>;
}
declare class NamespacedEventBus {
    private parent;
    private namespace;
    constructor(parent: EventBusService, namespace: string);
    emit<T>(event: string, payload?: T): void;
    on<T>(event: string, handler: EventHandler<T>): EventSubscription;
    once<T>(event: string, handler: EventHandler<T>): EventSubscription;
    off<T>(event: string, handler: EventHandler<T>): void;
}

interface Role {
    id: string;
    name: string;
    permissions: string[];
}
interface User {
    id: string;
    username: string;
    roles: string[];
}
declare class RbacService {
    private _currentUser;
    private _roles;
    readonly currentUser: i0.Signal<User>;
    readonly roles: i0.Signal<Role[]>;
    setUser(user: User | null): void;
    setRoles(roles: Role[]): void;
    hasPermission(permission: string): boolean;
    hasRole(roleId: string): boolean;
    isAuthenticated(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<RbacService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RbacService>;
}

interface PermissionRule {
    resource: string;
    action: string;
    effect: "allow" | "deny";
    conditions?: Record<string, unknown>;
}
declare class PermissionEvaluator {
    private rules;
    addRule(rule: PermissionRule): void;
    evaluate(resource: string, action: string, context?: Record<string, unknown>): boolean;
    clear(): void;
    private evaluateConditions;
}

interface FallbackResult<T> {
    schema: T;
    isFallback: boolean;
    error?: string;
}
declare class FallbackService {
    parseSchemaWithFallback<T>(jsonString: string): FallbackResult<T>;
    getFallbackSchema(errorMessage?: string): UiSchema;
    static ɵfac: i0.ɵɵFactoryDeclaration<FallbackService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FallbackService>;
}

declare class SignalStoreService {
    private store;
    set(key: string, value: unknown): void;
    get(key: string): unknown;
    update(key: string, fn: (value: unknown) => unknown): void;
    delete(key: string): void;
    keys(): string[];
    toJSON(): Record<string, unknown>;
    fromJSON(json: Record<string, unknown>): void;
    subscribe(callback: (key: string, value: unknown) => void): () => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalStoreService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalStoreService>;
}

type LogLevel = "debug" | "info" | "warn" | "error";
interface LogEntry {
    timestamp: Date;
    level: LogLevel;
    message: string;
    context?: string;
}

declare class SignalLoggerService {
    private logger;
    debug(message: string, context?: string): void;
    info(message: string, context?: string): void;
    warn(message: string, context?: string): void;
    error(message: string, context?: string): void;
    getLogs(): LogEntry[];
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalLoggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalLoggerService>;
}

interface SyncState {
    lastSyncAt: number | null;
    isSyncing: boolean;
    error: string | null;
}
declare class SignalSyncService {
    private _state;
    readonly state: i0.Signal<SyncState>;
    sync<T>(fn: () => Promise<T>): Promise<T>;
    clearError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalSyncService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalSyncService>;
}

interface DiscoveredComponent {
    def: ComponentDef;
    selector: string;
    registered: boolean;
}
declare class ComponentDiscoveryService {
    private discovered;
    discover(components: ComponentDef[]): DiscoveredComponent[];
    getDiscovered(componentId: string): DiscoveredComponent | undefined;
    getAllDiscovered(): DiscoveredComponent[];
    getRegisteredComponents(): DiscoveredComponent[];
    getUnregisteredComponents(): DiscoveredComponent[];
    private generateSelector;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentDiscoveryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentDiscoveryService>;
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

export { AppAvatar, AppBadge, AppBottomPanel, AppButton, AppCanvas, AppCard, AppChip, AppComponentPalette, AppConfirmDialog, AppDataTable, AppDialog, AppEmptyState, AppFooter, AppHeader, AppInput, AppJsonView, AppLoading, AppModal, AppPageContainer, AppPageToolbar, AppPagination, AppProgressBar, AppPropertiesPanel, AppRadio, AppSegmentSelector, AppSelect, AppSidebar, AppSlider, AppSplitView, AppStatsCard, AppSwitch, AppTableView, AppTabs, AppTextarea, ComponentDiscoveryService, ComponentRegistryService, CrudService, DataBindingResolver, EventBusService, FallbackService, GuardService, InvokeWrapperService, PermissionEvaluator, RbacService, SchemaFetcherService, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, SignalLoggerService, SignalStoreService, SignalSyncService, StyleResolver, ThemeService, UiShowcaseComponent, components, dataComponents, feedbackComponents, getAllStyleVariants, getCurrentStyle, getStyleClassPrefix, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, layoutComponents, loadStyleVariant, setCurrentStyle, uiComponents };
export type { AvatarSize, BadgeSize, BadgeVariant, BottomPanelTab, ButtonSize, ButtonVariant, CanvasElement, ColorMode, ComponentDef, DataBinding, DataTableColumn, DialogSize, ElementConfig, ElementEvents, ElementProperty, GridPosition, InputType, Layout, LoadingSize, ModalSize, ModuleDef, Page, PageMeta, PageSection, PaletteCategory, RenderContext, RouteMatch, ServiceDef, SharedComponentDef, SharedComponentProp, SidebarItem, StyleVariant, TableColumn, Theme, ThemeColors, ToolbarAction, UiSchema };
