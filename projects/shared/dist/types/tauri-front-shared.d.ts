import * as i0 from '@angular/core';
import { ChangeDetectorRef, EventEmitter, OnDestroy, OnInit, OnChanges, SimpleChanges, AfterViewInit, Type, Signal as Signal$1, Provider, EnvironmentProviders, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as _angular_router from '@angular/router';
import { Routes, Router, CanActivateFn } from '@angular/router';
import * as _tauri_front_shared from '@tauri-front/shared';

type ColorMode = "light" | "dark" | "system";
interface Theme {
    mode: ColorMode;
    name?: string;
    colors?: ThemeColors;
    accentColor?: string;
    cssVariables?: Record<string, string>;
}
interface ThemeColors {
    primary?: string;
    secondary?: string;
    background?: string;
    foreground?: string;
    bgPrimary?: string;
    bgSecondary?: string;
    bgTertiary?: string;
    bgElevated?: string;
    bgHover?: string;
    textPrimary?: string;
    textSecondary?: string;
    textMuted?: string;
    border?: string;
    borderLight?: string;
    accent?: string;
    accentHover?: string;
    success?: string;
    warning?: string;
    error?: string;
}
interface UiSchema {
    version: string;
    schemaVersion?: string;
    pages: Page[];
    layouts: Layout[];
    theme?: Theme;
    /** @deprecated Use layouts or canvasElements in Page instead */
    components?: unknown[];
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
interface ToastNotification {
    id: string;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration: number;
    icon?: string;
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
    packageType: "ui" | "feedback" | "data" | "layout" | "shared";
    category: string;
    icon?: string;
    defaultClasses?: string;
    props?: SharedPropDef[];
    template?: string;
    css?: string;
}
interface GridPosition {
    column: number;
    row: number;
    colSpan?: number;
    rowSpan?: number;
    colStart?: number;
    rowStart?: number;
    /** Responsive override for screens < 640px */
    sm?: Partial<GridPosition>;
    /** Responsive override for screens 640–1023px */
    md?: Partial<GridPosition>;
    /** Responsive override for screens >= 1024px */
    lg?: Partial<GridPosition>;
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
    flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
    flexGrow?: boolean;
    flexShrink?: boolean;
    flexBasis?: "auto" | "full" | "half" | "third" | "quarter";
    alignItems?: "start" | "center" | "end" | "stretch" | "baseline";
    alignContent?: "start" | "center" | "end" | "between" | "around" | "evenly";
    justifyItems?: "start" | "center" | "end" | "stretch";
    justifySelf?: "start" | "center" | "end" | "stretch" | "auto";
    alignSelf?: "start" | "center" | "end" | "stretch" | "auto";
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    rowGap?: number;
    colGap?: number;
    width?: "full" | "auto" | "screen" | "fit";
    height?: "full" | "auto" | "screen" | "fit";
    marginX?: "auto" | number;
    marginY?: number;
    paddingX?: number;
    paddingY?: number;
    responsive?: Record<string, Partial<Layout>>;
}
interface Page {
    id: string;
    name: string;
    route?: string;
    meta?: {
        title?: string;
        icon?: string;
    };
    layout?: string;
    layouts: Layout[];
    components?: ComponentDef[];
    canvasElements?: CanvasElement[];
}
interface CanvasElement {
    id: string;
    componentId: string;
    gridPosition?: GridPosition;
    classes?: string;
    children?: CanvasElement[];
    props?: Record<string, unknown>;
    routes?: {
        include?: string[];
        exclude?: string[];
    };
    defaults?: Record<string, unknown>;
    visible?: boolean | {
        when?: string;
        equals?: unknown;
    };
    bind?: {
        store?: string;
        field?: string;
    };
    events?: Record<string, string>;
    position?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    zIndex?: number;
    dataBinding?: {
        entity: string;
        field: string;
    };
    theme?: string;
    styles?: {
        custom?: Record<string, string>;
        states?: {
            hover?: Record<string, string>;
            focus?: Record<string, string>;
            disabled?: Record<string, string>;
        };
    };
}
type RegionType = "header" | "sidebar" | "sidebar-left" | "sidebar-right" | "footer" | "bottom-nav" | "nav" | "overlay" | "other";
interface LayoutElement {
    id: string;
    componentId: string;
    /** Explicit region type — tells the shell where to place this region in the layout grid */
    region?: RegionType;
    classes?: string;
    props?: Record<string, unknown>;
    children?: LayoutElement[];
    routes?: {
        include?: string[];
        exclude?: string[];
    };
    defaults?: Record<string, unknown>;
    visible?: boolean | {
        when?: string;
        equals?: unknown;
    };
    bind?: {
        store?: string;
        field?: string;
    };
    events?: Record<string, string>;
    styles?: {
        custom?: Record<string, string>;
        states?: {
            hover?: Record<string, string>;
            focus?: Record<string, string>;
            disabled?: Record<string, string>;
        };
    };
}
interface AppSchema {
    id: string;
    theme?: string;
    schemaVersion?: string;
    app?: {
        id?: string;
        name?: string;
        style?: string;
    };
    layout?: LayoutElement;
    layoutRegions?: LayoutElement[];
    pages: Page[];
    handlers?: Record<string, unknown>;
    stores?: Record<string, unknown>;
}

declare class PaginationComponent {
    private cdr;
    constructor(cdr: ChangeDetectorRef);
    totalItems: number;
    currentPage: number;
    pageSize: number;
    pageChange: EventEmitter<number>;
    pageSizeChange: EventEmitter<number>;
    get totalPages(): number;
    get hasNextPage(): boolean;
    get hasPrevPage(): boolean;
    get startIndex(): number;
    get endIndex(): number;
    nextPage(): void;
    prevPage(): void;
    firstPage(): void;
    lastPage(): void;
    onPageSizeChange(size: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "app-pagination", never, { "totalItems": { "alias": "totalItems"; "required": false; }; "currentPage": { "alias": "currentPage"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; }, { "pageChange": "pageChange"; "pageSizeChange": "pageSizeChange"; }, never, never, true, never>;
}

type ToastType = "success" | "error" | "warning" | "info";
interface ToastAction {
    label: string;
    callback: () => void;
}
interface ToastConfig {
    id: string;
    type: ToastType;
    message: string;
    title?: string;
    duration?: number;
    persistent?: boolean;
    action?: ToastAction;
    position?: ToastPosition;
}
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
declare class ToastService {
    private toastsSignal;
    private counter;
    private autoDismissTimers;
    readonly toasts: i0.Signal<ToastConfig[]>;
    private generateId;
    show(options: Omit<ToastConfig, "id"> & {
        id?: string;
    }): string;
    success(message: string, options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>): string;
    error(message: string, options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>): string;
    warning(message: string, options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>): string;
    info(message: string, options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>): string;
    dismiss(id: string): void;
    dismissAll(): void;
    update(id: string, changes: Partial<Pick<ToastConfig, "message" | "title" | "type" | "duration" | "persistent" | "action">>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToastService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ToastService>;
}

type Locale = "en" | "ru";
declare class I18nService {
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

declare const uiComponents: SharedComponentDef[];
declare const layoutComponents: SharedComponentDef[];
declare const feedbackComponents: SharedComponentDef[];

/**
 * Abstract base component that provides a destroy$ Subject for subscription cleanup.
 * Extend this class instead of OnDestroy directly when you need to manage RxJS subscriptions.
 */
declare abstract class BaseDestroyableComponent implements OnDestroy {
    protected readonly destroy$: Subject<void>;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseDestroyableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BaseDestroyableComponent, "lib-base-destroyable", never, {}, {}, never, never, true, never>;
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

declare class EventBusService {
    private handlers;
    emit(event: string, data?: unknown): void;
    on(event: string, handler: (data: unknown) => void, context?: unknown): () => void;
    once(event: string, handler: (data: unknown) => void, context?: unknown): () => void;
    off(event: string, handler?: Function): void;
    offAll(event?: string): void;
    hasListeners(event: string): boolean;
    getListenerCount(event: string): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventBusService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventBusService>;
}

interface ComponentDefinition {
    selector: string;
    module?: string;
    behaviors?: ComponentBehavior;
}
declare class ComponentRegistryService {
    private registry;
    private componentManifest;
    private _schemaComponents;
    private _componentModules;
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
    registerComponent(def: ComponentDef): void;
    registerComponents(defs: ComponentDef[]): void;
    getComponent(selector: string): ComponentDef | undefined;
    registerComponentModule(selector: string, module: Record<string, unknown>): void;
    loadComponentModule(selector: string): Promise<CustomElementConstructor>;
    getComponentModules(): Map<string, Record<string, unknown>>;
    loadComponentsFromSchema(pages: {
        components?: ComponentDef[];
    }[]): void;
    hasComponent(selector: string): boolean;
    getRegisteredSelectors(): string[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ComponentRegistryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ComponentRegistryService>;
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
interface CrudQuery {
    filters?: CrudFilter$1[];
    sortBy?: string;
    sortAsc?: boolean;
    limit?: number;
    offset?: number;
}
declare class CrudService {
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
    query<T>(collection: string, q: CrudQuery): T[];
    private applyFilter;
    private applySort;
    private addPending;
    batchCreate<T extends {
        id: string;
    }>(collection: string, items: T[]): void;
    batchDelete(collection: string, ids: string[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CrudService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CrudService>;
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
    private _params;
    private _functions;
    constructor(signalStore: SignalStoreService, crudService: CrudService);
    setParams(params: Record<string, string>): void;
    registerFunction(name: string, fn: Function): void;
    registerFunctions(fns: Record<string, Function>): void;
    resolveDataBinding(binding: unknown): unknown;
    private resolveFunctionCall;
    private parseCallArgs;
    private resolveParamsPath;
    resolveProps(props: Record<string, unknown>, _componentId: string): Record<string, unknown>;
    private executeCrudOperation;
    private resolveParams;
    private buildCrudQuery;
    private buildFilters;
    private getDataBindingValue;
    private parseBindingPath;
    private getNestedValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataBindingResolverService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<DataBindingResolverService>;
}

interface GridTemplate {
    columns: string[];
    rows: string[];
    gap: string;
}
declare class LayoutEngineService {
    private injector;
    resolveClass(layout: Layout): string;
    /**
     * Applies theme CSS custom properties to a layout container element.
     * Uses ThemeService to get the current accent color and computed shades,
     * then sets them as inline CSS variables on the container.
     */
    applyThemeVariables(container: HTMLElement): void;
    renderGridLayout(container: HTMLElement, layout: Layout): void;
    renderFlexLayout(container: HTMLElement, layout: Layout): void;
    resolveGridPosition(layout: Layout | undefined, componentId: string): GridPosition | null;
    resolveGridPositionFromPositions(positions: GridPosition[] | undefined, componentId: string): GridPosition | null;
    calculateGridSpan(colSpan: number | undefined, rowSpan: number | undefined): {
        gridColumn: string;
        gridRow: string;
    };
    applyLayoutStyles(container: HTMLElement, layout: Layout, _children: string[], getComponentById: (id: string) => {
        selector: string;
    } | undefined, resolvePosition: (layout: Layout, childId: string) => GridPosition | null): Promise<void>;
    createGridTemplateString(columns: string[], rows: string[]): string;
    parseGridTemplate(template: GridTemplate): {
        gridTemplateColumns: string;
        gridTemplateRows: string;
        gap: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<LayoutEngineService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LayoutEngineService>;
}

/**
 * Style Registry - TailwindCSS v4 Theme System
 *
 * Themes are loaded dynamically at runtime via CSS <link> injection.
 * Each theme has a theme.css file with @theme directive.
 */
type StyleVariant = "claymorphism" | "glassmorphism" | "neumorphism" | "material-design-v3" | "brutalism" | "skeuomorphism";
interface GlobalStyleContext {
    variant?: string;
    size?: string;
}
interface StyleVariantConfig {
    id: StyleVariant;
    name: string;
    classPrefix: string;
    description: string;
}
/**
 * @deprecated - Component style mapping is no longer used in TailwindCSS v4 approach
 */
interface ComponentStyleMap {
    [key: string]: string;
}
declare function loadStyleVariant(variant: StyleVariant): Promise<void>;
/**
 * SCSS-only fallback — sets body[data-style] without injecting runtime CSS.
 * Kept for compatibility with apps using static SCSS themes.
 */
declare function loadStyleVariantNoop(variant?: StyleVariant): Promise<void>;
declare function setTheme(variant: StyleVariant): void;
declare function getCurrentStyle(): StyleVariant;
declare function setCurrentStyle(variant: StyleVariant): void;
declare function getStyleClassPrefix(variant: StyleVariant): string;
declare function getAllStyleVariants(): StyleVariantConfig[];
/**
 * @deprecated - Use direct TailwindCSS utility classes in schema instead
 * Component style mapping - returns empty string in TailwindCSS v4-only approach
 */
declare function getComponentStyleClasses(theme: StyleVariant, componentId: string, explicitVariant?: string, explicitSize?: string, globalContext?: GlobalStyleContext): string;

interface PageSchema {
    id: string;
    name: string;
    elements: CanvasElement[];
    gridTemplate?: GridTemplate;
}
declare class SchemaRendererService {
    private dataStore;
    private eventBus;
    private componentRegistry;
    private dataBindingResolver;
    private layoutEngine;
    private i18n;
    private _pages;
    private _currentPageId;
    private _navigationStack;
    private _appConfig;
    constructor(dataStore: SignalStoreService, eventBus: EventBusService, componentRegistry: ComponentRegistryService, dataBindingResolver: DataBindingResolverService, layoutEngine: LayoutEngineService, i18n: I18nService);
    private componentResolver;
    private routeResolver;
    private _layoutRegions;
    private _currentRoute;
    pages: i0.Signal<Page[]>;
    currentPageId: i0.Signal<string | null>;
    layoutRegions: i0.Signal<LayoutElement[]>;
    registerComponent(def: ComponentDef): void;
    registerComponents(defs: ComponentDef[]): void;
    getComponent(selector: string): ComponentDef | undefined;
    loadSchema(schema: AppSchema | {
        pages: Page[];
        app?: {
            variant?: string;
            size?: string;
        };
    }): void;
    setCurrentRoute(route: string): void;
    setParams(params: Record<string, string>): void;
    registerFunction(name: string, fn: Function): void;
    registerFunctions(fns: Record<string, Function>): void;
    getLayoutRegions(): LayoutElement[];
    isElementVisible(element: {
        routes?: {
            include?: string[];
            exclude?: string[];
        };
        visible?: boolean | {
            when?: string;
            equals?: unknown;
        };
    }): boolean;
    getCurrentPage(): Page | null;
    setCurrentPage(pageId: string): void;
    navigateToPage(route: string): void;
    getNavigationStack(): string[];
    setRouteResolver(resolver: (route: string) => string | null): void;
    renderGridLayout(container: HTMLElement, layout: Layout): Promise<void>;
    renderFlexLayout(container: HTMLElement, layout: Layout): Promise<void>;
    loadComponentModule(selector: string): Promise<CustomElementConstructor>;
    registerComponentModule(selector: string, module: Record<string, unknown>): void;
    resolveGridPosition(layoutId: string, componentId: string): GridPosition | null;
    resolveClass(layout: Layout): string;
    /**
     * Resolves responsive grid position based on current window width.
     * Merges breakpoint overrides (sm, md, lg) into base position.
     */
    private resolveResponsiveGridPosition;
    getComponentProps(componentId: string): Record<string, unknown>;
    generatePage(pageId: string): {
        layouts: Layout[];
        components: ComponentDef[];
    };
    setComponentResolver(resolver: (selector: string) => ComponentDef | undefined): void;
    createElement(data: CanvasElement): Promise<HTMLElement | null>;
    render(container: HTMLElement, pageSchema: PageSchema, currentRoute?: string): Promise<void>;
    private renderNestedChildren;
    renderLayoutRegion(container: HTMLElement, regionId: string, currentRoute?: string): Promise<void>;
    bindEvents(el: HTMLElement, events: Record<string, string | Function>, _elementId: string): void;
    mapPropsToClasses(componentId: string, props: Record<string, unknown>, theme: StyleVariant, explicitVariant?: string, explicitSize?: string, globalContext?: GlobalStyleContext): string[];
    resolveClasses(elementClasses: string, defaultClasses: string): string;
    private getDataBindingValue;
    private parseBindingPath;
    private getNestedValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRendererService>;
}

/**
 * Permission represents a resource-action pair with optional field-level restrictions.
 * Based on ZenithDB pattern.
 */
interface Permission {
    resource: string;
    action: string;
    fields?: string[];
}
/**
 * Role contains a set of permissions and metadata.
 * Based on ZenithDB pattern.
 */
interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
}
/**
 * User representation with roles.
 * Based on ZenithDB pattern.
 */
interface User {
    id: string;
    username: string;
    email: string;
    roles: string[];
}
/**
 * Context-based permission levels from TaskFlow pattern.
 */
declare enum TodoPermission {
    VIEWER = "viewer",
    EDITOR = "editor",
    MODERATOR = "moderator",
    OWNER = "owner"
}
/**
 * Result of a permission check with all available actions.
 * Based on TaskFlow pattern.
 */
interface PermissionCheckResult {
    canView: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canArchive: boolean;
    canManageAssignees: boolean;
    permissionLevel: string;
}
/**
 * Context for todo-level permission evaluation.
 */
interface TodoPermissionContext {
    todoId: string;
    userId: string;
    assigneeRoles: Record<string, string>;
    visibility: "public" | "shared" | "private";
    ownerId: string;
    effectivePermission: TodoPermission;
}
declare class PermissionService {
    private _currentUser;
    private _roles;
    private _isAdmin;
    readonly currentUser: i0.Signal<User | null>;
    readonly roles: i0.Signal<Role[]>;
    readonly isAdmin: i0.Signal<boolean>;
    setUser(user: User | null): void;
    setRoles(roles: Role[]): void;
    setIsAdmin(isAdmin: boolean): void;
    /**
     * Load roles from backend. Subclasses or consumers should override
     * with actual TauriBridge invocation.
     */
    loadRoles(): Promise<Role[]>;
    /**
     * Create a new role.
     */
    createRole(name: string, description: string, permissions: Permission[]): Promise<Role>;
    /**
     * Update an existing role.
     */
    updateRole(roleId: string, name: string, description: string, permissions: Permission[]): Promise<Role>;
    /**
     * Delete a role by ID.
     */
    deleteRole(roleId: string): Promise<void>;
    /**
     * Check if current user has permission for a resource-action pair.
     * Supports wildcard "*" permission that grants all access.
     */
    hasPermission(resource: string, action: string): boolean;
    /**
     * Check if current user can access a resource with optional field restrictions.
     */
    canAccess(resource: string, action: string, fields?: string[]): boolean;
    /**
     * Check if current user has a specific role.
     */
    hasRole(roleId: string): boolean;
    /**
     * Check if user is authenticated.
     */
    isAuthenticated(): boolean;
    /**
     * Get the effective permission level for a user on a todo.
     * Based on TaskFlow's getTodoPermission logic.
     */
    getTodoPermission(context: TodoPermissionContext): TodoPermission;
    /**
     * Create a todo permission context object.
     */
    createTodoPermissionContext(params: {
        todoId: string;
        userId: string;
        assigneeRoles: Record<string, string>;
        visibility: "public" | "shared" | "private";
        ownerId: string;
    }): TodoPermissionContext;
    /**
     * Convert role string to TodoPermission enum.
     */
    fromStr(role: string): TodoPermission;
    /**
     * Check if user can edit todo fields (moderator or owner only).
     */
    canEditTodoFields(permission: TodoPermission): boolean;
    /**
     * Check if user can delete a todo (owner only).
     */
    canDeleteTodo(permission: TodoPermission): boolean;
    /**
     * Check if user can archive a todo (owner only).
     */
    canArchiveTodo(permission: TodoPermission): boolean;
    /**
     * Check if user can manage assignees (moderator or owner).
     */
    canManageAssignees(permission: TodoPermission): boolean;
    /**
     * Check if user can create tasks/subtasks/comments (editor+ or admin).
     */
    canCreateTask(permission: TodoPermission): boolean;
    /**
     * Full permission check result for a todo context.
     */
    checkTodoPermissions(context: TodoPermissionContext): PermissionCheckResult;
    /**
     * Check if user can edit a specific entity based on ownership or permission level.
     */
    canEditEntity(entityOwnerId: string, permission: TodoPermission, userId: string): boolean;
    /**
     * Check if user can delete a specific entity based on ownership or permission level.
     */
    canDeleteEntity(entityOwnerId: string, permission: TodoPermission, userId: string): boolean;
    /**
     * Get available resources for permission configuration.
     */
    availableResources(): string[];
    /**
     * Get available actions for permission configuration.
     */
    availableActions(): string[];
    /**
     * Clear all state (useful for logout).
     */
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PermissionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PermissionService>;
}

interface GuardConfig {
    type: "auth" | "role" | "permission" | "admin";
    role?: string;
    resource?: string;
    action?: string;
}
declare class GuardService {
    private permissionService;
    constructor(permissionService: PermissionService);
    canActivate(): Promise<boolean>;
    canActivateWithConfig(config: GuardConfig): Promise<boolean>;
    private checkAuth;
    private checkRole;
    private checkPermission;
    static ɵfac: i0.ɵɵFactoryDeclaration<GuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GuardService>;
}

interface NavigationOptions {
    replaceUrl?: boolean;
    queryParams?: Record<string, string>;
}
declare class SchemaRouterService {
    private guardService;
    constructor(guardService: GuardService | null);
    private readonly _schema;
    private readonly _currentPage;
    private readonly _currentLayout;
    private readonly _currentRoute;
    private readonly _params;
    private readonly _queryParams;
    private readonly _isLoading;
    private readonly _error;
    readonly schema: i0.Signal<UiSchema | null>;
    readonly currentPage: i0.Signal<Page | null>;
    readonly currentLayout: i0.Signal<Layout | null>;
    readonly currentRoute: i0.Signal<string>;
    readonly params: i0.Signal<Record<string, string>>;
    readonly queryParams: i0.Signal<Record<string, string>>;
    readonly isLoading: i0.Signal<boolean>;
    readonly error: i0.Signal<string | null>;
    readonly hasSchema: i0.Signal<boolean>;
    readonly currentPageId: i0.Signal<string | null>;
    readonly currentPageTitle: i0.Signal<string>;
    setSchema(schema: UiSchema): void;
    clearSchema(): void;
    navigate(route: string, options?: NavigationOptions): Promise<boolean>;
    resolveRoute(route: string): {
        page: Page | null;
        layout: Layout | null;
        params: Record<string, string>;
    } | null;
    private matchRoute;
    private findReservedRoute;
    getPage(pageId: string): Page | null;
    getLayout(layoutId: string): Layout | null;
    getAllPages(): Page[];
    getAllLayouts(): Layout[];
    updateQueryParams(params: Record<string, string>): void;
    reset(): void;
    /**
     * Convert all schema pages to Angular Routes.
     * Each route points to SchemaRouteViewerComponent with page data in route data.
     */
    toAngularRoutes(): Routes;
    /**
     * Register all schema pages with Angular Router by calling router.resetConfig().
     * Must be called AFTER setSchema().
     */
    registerAngularRoutes(router: _angular_router.Router): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRouterService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRouterService>;
}

interface RetryOptions {
    maxAttempts: number;
    initialDelayMs: number;
    maxDelayMs: number;
}
interface InvokeOptions {
    suppressError?: boolean;
    signal?: AbortSignal;
}
declare class InvokeWrapperService {
    invoke<T>(cmd: string, args?: Record<string, unknown>, options?: InvokeOptions): Promise<T>;
    invokeWithRetry<T>(cmd: string, args?: Record<string, unknown>, retryOptions?: RetryOptions): Promise<T>;
    timeout<T>(ms: number, cmd: string, args?: Record<string, unknown>, options?: InvokeOptions): Promise<T>;
    private invokeWithTimeout;
    static ɵfac: i0.ɵɵFactoryDeclaration<InvokeWrapperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<InvokeWrapperService>;
}

declare class StyleThemeService {
    private readonly _themeChanged$;
    readonly themeChanged$: Observable<{
        variant: StyleVariant;
        isDark: boolean;
    }>;
    readonly theme: i0.WritableSignal<StyleVariant>;
    constructor();
    /** No-op for API compatibility; initialization runs in the constructor. */
    init(): void;
    loadTheme(variant: StyleVariant): Promise<void>;
    private persistDarkModePreference;
    /** Convenience alias for apps that use simple theme names (e.g. "light", "dark"). */
    setTheme(theme: string): Promise<void>;
    private resolveThemeVariant;
    /** Alias for toggleDarkMode() — used by ZenithDB. */
    toggle(): void;
    /** Returns 'dark' or 'light' based on current dark mode state — used by ZenithDB. */
    effectiveColorMode(): string;
    toggleDarkMode(): void;
    isDarkMode(): boolean;
    setDarkMode(enabled: boolean): void;
    private static readonly THEMES;
    cycle(): void;
    getCurrentTheme(): StyleVariant;
    private injectDarkModeVariables;
    private removeDarkModeVariables;
    private getDarkModeVariablesCSS;
    private getDarkModeCSSForVariant;
    private brutalismDarkCSS;
    private skeuomorphismDarkCSS;
    private materialDesignV3DarkCSS;
    private neumorphismDarkCSS;
    private claymorphismDarkCSS;
    private glassmorphismDarkCSS;
    private initializeDarkMode;
    private loadDarkModePreference;
    private saveDarkModePreference;
    static ɵfac: i0.ɵɵFactoryDeclaration<StyleThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StyleThemeService>;
}

declare class ThemeToggleService {
    private themeService;
    private mediaQuery;
    init(): void;
    private _onSystemThemeChange;
    isDark(): boolean;
    enable(): void;
    disable(): void;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeToggleService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeToggleService>;
}

interface FallbackResult<T> {
    schema: T;
    isFallback: boolean;
    error?: string;
}
declare class FallbackService {
    parseSchemaWithFallback<T>(jsonString: string): FallbackResult<T>;
    getFallbackSchema(_errorMessage?: string): UiSchema;
    static ɵfac: i0.ɵɵFactoryDeclaration<FallbackService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FallbackService>;
}

interface HandlerDefinition {
    invoke?: string;
    args?: unknown[];
    awaitEvent?: string;
    resultTo?: string;
    set?: {
        store?: string;
        field?: string;
        from?: string;
    };
    setMany?: Record<string, string>;
    swap?: string[];
    navigate?: string;
    call?: string;
    guard?: string;
    then?: string;
    openOverlay?: string;
}
declare class HandlerExecutorService {
    private invokeWrapper;
    private signalStore;
    private eventBus;
    private dataBindingResolver;
    private router;
    private handlers;
    private registeredFunctions;
    private pendingListeners;
    setRouter(router: SchemaRouterService): void;
    setHandlers(handlers: Record<string, HandlerDefinition>): void;
    registerFunction(name: string, fn: () => void): void;
    execute(handlerName: string, eventData?: unknown): Promise<void>;
    private executeHandler;
    private resolveValue;
    private getStorePath;
    private setStorePath;
    private getNestedValue;
    private handleInvoke;
    private handleSet;
    private handleSetMany;
    private handleSwap;
    private handleNavigate;
    private handleCall;
    private handleGuard;
    private handleOpenOverlay;
    destroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HandlerExecutorService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HandlerExecutorService>;
}

declare class SchemaShellComponent implements OnInit, OnDestroy {
    private invokeWrapper;
    private schemaRouter;
    private renderer;
    private themeService;
    private themeToggle;
    private fallbackService;
    private handlerExecutor;
    private signalStore;
    appId: string;
    commandName: string;
    defaultTheme: StyleVariant;
    initialRoute: string;
    errorFallbackCommandName: string;
    /** When true, auto-renders app-toast-container and a full-screen loading overlay */
    includeOverlays: boolean;
    readonly loading: i0.WritableSignal<boolean>;
    readonly error: i0.WritableSignal<string | null>;
    private themeSubscription?;
    /** All raw layout regions from the renderer (unfiltered) */
    private readonly rawRegions;
    /** Infer region type from explicit `region` property or fall back to ID pattern matching */
    private getRegionType;
    private isRegionVisible;
    private regionByType;
    private regionsByType;
    readonly headerRegion: i0.Signal<LayoutElement | null>;
    readonly sidebarLeftRegion: i0.Signal<LayoutElement | null>;
    readonly sidebarRightRegion: i0.Signal<LayoutElement | null>;
    readonly footerRegion: i0.Signal<LayoutElement | null>;
    readonly bottomNavRegion: i0.Signal<LayoutElement | null>;
    readonly overlayRegions: i0.Signal<LayoutElement[]>;
    /** Unrecognized regions rendered in an extra row below the main layout */
    readonly otherRegions: i0.Signal<LayoutElement[]>;
    constructor(invokeWrapper: InvokeWrapperService, schemaRouter: SchemaRouterService, renderer: SchemaRendererService, themeService: StyleThemeService, themeToggle: ThemeToggleService, fallbackService: FallbackService, handlerExecutor: HandlerExecutorService, signalStore: SignalStoreService);
    ngOnInit(): Promise<void>;
    private setupThemeStoreSync;
    ngOnDestroy(): void;
    onWindowToggleDark(event: Event): void;
    private loadSchema;
    retry(): void;
    /**
     * Returns CSS classes for a region container by mapping its props to sf-prefixed classes.
     * Uses the same mapPropsToClasses() logic as schema elements for consistent styling.
     */
    getRegionClasses(region: LayoutElement | null): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaShellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SchemaShellComponent, "lib-schema-shell", never, { "appId": { "alias": "appId"; "required": false; }; "commandName": { "alias": "commandName"; "required": false; }; "defaultTheme": { "alias": "defaultTheme"; "required": false; }; "initialRoute": { "alias": "initialRoute"; "required": false; }; "errorFallbackCommandName": { "alias": "errorFallbackCommandName"; "required": false; }; "includeOverlays": { "alias": "includeOverlays"; "required": false; }; }, {}, never, never, true, never>;
}

declare class SchemaRouteViewerComponent implements OnInit, OnChanges {
    router: SchemaRouterService;
    private renderer;
    route: string;
    /** When true, renders schema layoutRegions (header, footer, bottom-nav, overlay) */
    showLayoutRegions: boolean;
    readonly page: i0.Signal<_tauri_front_shared.Page | null>;
    /** CSS grid properties to apply via ngStyle */
    readonly gridStyles: i0.Signal<Record<string, string>>;
    /** CSS classes: schema-page + layout class */
    readonly containerClass: i0.Signal<string>;
    /** All layout regions from the renderer, re-computed when route changes */
    private readonly rawRegions;
    private getRegionType;
    private isRegionVisible;
    private regionByType;
    readonly headerRegion: i0.Signal<LayoutElement | null>;
    readonly footerRegion: i0.Signal<LayoutElement | null>;
    readonly bottomNavRegion: i0.Signal<LayoutElement | null>;
    readonly overlayRegions: i0.Signal<LayoutElement[]>;
    constructor(router: SchemaRouterService, renderer: SchemaRendererService);
    /** Returns a comma-separated list of available page routes for the error message */
    getAvailableRoutes(): string;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRouteViewerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SchemaRouteViewerComponent, "lib-schema-route-viewer", never, { "route": { "alias": "route"; "required": false; }; "showLayoutRegions": { "alias": "showLayoutRegions"; "required": false; }; }, {}, never, never, true, never>;
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
declare function parseError(error: unknown): AppError;
declare function formatError(error: AppError): string;

interface ErrorLogEntry {
    id: string;
    timestamp: Date;
    message: string;
    context?: string;
    error: AppError;
    dismissed: boolean;
}
interface RetryConfig {
    maxAttempts: number;
    initialDelayMs: number;
    maxDelayMs: number;
}
declare class ErrorHandlerService {
    private toastService;
    private errorLogSignal;
    private onlineSignal;
    private retryCounter;
    readonly errorLog: i0.Signal<ErrorLogEntry[]>;
    readonly isOnline: i0.Signal<boolean>;
    readonly errorCount: i0.Signal<number>;
    constructor(toastService: ToastService);
    private setupOnlineOfflineListeners;
    handleError(error: unknown, context?: string): AppError;
    normalizeError(error: unknown): AppError;
    private isHttpError;
    private convertHttpError;
    showToast(message: string, type?: ToastType): void;
    private addToErrorLog;
    dismissError(id: string): void;
    clearErrorLog(): void;
    getActiveErrors(): ErrorLogEntry[];
    retryWithBackoff<T>(fn: () => Promise<T>, config?: Partial<RetryConfig>): Promise<T>;
    handleAndRetry<T>(fn: () => Promise<T>, context?: string, retryConfig?: Partial<RetryConfig>): Promise<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ErrorHandlerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ErrorHandlerService>;
}

declare class ApiException extends Error {
    code?: string | undefined;
    details?: unknown | undefined;
    constructor(message: string, code?: string | undefined, details?: unknown | undefined);
}

type LogLevel = "debug" | "info" | "warn" | "error";
interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    source?: string;
    metadata?: unknown;
}
declare class SignalLoggerService {
    private _entries;
    private _minLevel;
    private _maxEntries;
    entries: i0.Signal<LogEntry[]>;
    filteredEntries: i0.Signal<LogEntry[]>;
    setMinLevel(level: LogLevel): void;
    getMinLevel(): LogLevel;
    setMaxEntries(max: number): void;
    addEntry(entry: LogEntry): void;
    debug(message: string, source?: string, metadata?: unknown): void;
    info(message: string, source?: string, metadata?: unknown): void;
    warn(message: string, source?: string, metadata?: unknown): void;
    error(message: string, source?: string, metadata?: unknown): void;
    clear(): void;
    getEntriesByLevel(level: LogLevel): LogEntry[];
    exportToJson(): string;
    importFromJson(json: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalLoggerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalLoggerService>;
}

type SyncStatus = "idle" | "syncing" | "error" | "offline";
declare class SignalSyncService {
    private http;
    private _syncStatus;
    private _lastSyncTime;
    private _pendingChanges;
    private _syncEndpoint;
    syncStatus: i0.Signal<SyncStatus>;
    lastSyncTime: i0.Signal<Date | null>;
    pendingChanges: i0.Signal<number>;
    syncEndpoint: i0.Signal<string>;
    setEndpoint(endpoint: string): void;
    setStatus(status: SyncStatus): void;
    incrementPending(): void;
    decrementPending(): void;
    markSynced(): void;
    markError(): void;
    markOffline(): void;
    syncToCloud(): Promise<void>;
    private performSync;
    static ɵfac: i0.ɵɵFactoryDeclaration<SignalSyncService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SignalSyncService>;
}

declare class SchemaElementComponent implements AfterViewInit, OnChanges, OnInit {
    private rendererService;
    private appRef;
    private injector;
    private styleThemeService;
    element: CanvasElement;
    elements: CanvasElement[];
    private dynamicHost;
    private componentRef;
    get componentType(): Type<any> | null;
    get tag(): string;
    get classes(): string;
    /**
     * Normalizes schema element classes: trims, deduplicates, and warns on
     * legacy sf-* patterns. Acts as a safety net for schemas that haven't yet
     * been migrated to ui-* tokens.
     */
    private normalizeClasses;
    ngOnInit(): void;
    get childElements(): CanvasElement[];
    get props(): Record<string, unknown>;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private createDynamicComponent;
    get gridStyle(): Partial<CSSStyleDeclaration>;
    get elementStyles(): Record<string, string>;
    get isNativeHtml(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaElementComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SchemaElementComponent, "app-schema-element", never, { "element": { "alias": "element"; "required": true; }; "elements": { "alias": "elements"; "required": true; }; }, {}, never, never, true, never>;
}

declare const SCHEMA_COMPONENT_MAP: Map<string, Type<any>>;
declare function registerSchemaComponent(selector: string, component: Type<any>): void;

declare abstract class StorageService {
    abstract get<T>(key: string): T | null;
    abstract set<T>(key: string, value: T): void;
    abstract remove(key: string): void;
    abstract clear(): void;
    abstract keys(): string[];
    /**
     * Checks if a key exists in storage.
     * Optional for backward compatibility with implementations that don't need it.
     */
    has?(key: string): boolean;
}

type StorageValidator<T> = (value: unknown) => value is T;
declare class LocalStorageService implements StorageService {
    private prefix;
    /**
     * Configure a prefix for namespacing keys.
     * Call before using get/set/remove/has with prefixed keys.
     */
    setPrefix(prefix: string): void;
    private makeKey;
    get<T>(key: string, defaultValue?: T, validator?: StorageValidator<T>): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    keys(): string[];
    has(key: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<LocalStorageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LocalStorageService>;
}

declare class IndexedDbService implements StorageService {
    private readonly dbName;
    private readonly storeName;
    private db;
    constructor();
    private initDb;
    private getStore;
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    keys(): string[];
    keysAsync(): Promise<string[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IndexedDbService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IndexedDbService>;
}

type FilterOperator = "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
interface QueryFilter {
    field: string;
    operator: FilterOperator;
    value: unknown;
}
declare class StorageQueryService {
    query<T>(items: T[], filter: QueryFilter[]): T[];
    sortBy<T>(items: T[], field: string, direction?: "asc" | "desc"): T[];
    paginate<T>(items: T[], page: number, pageSize: number): T[];
}

declare class UnifiedStorageService {
    private signalStore;
    private cache;
    private query;
    constructor();
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<void>;
    find<T>(filter: QueryFilter[]): Promise<T[]>;
    remove(key: string): Promise<void>;
}

interface CacheEntry<T> {
    value: T;
    timestamp: number;
    ttl?: number;
}
declare class StorageCacheService {
    private shared;
    private namespace;
    private defaultTtl;
    readonly cacheInvalidated: i0.WritableSignal<boolean>;
    constructor();
    private ns;
    get<T>(key: string): T | null;
    set<T>(key: string, value: T, ttl?: number): void;
    setDefaultTtl(ttl: number): void;
    invalidate(key: string): void;
    invalidateAll(): void;
    has(key: string): boolean;
    delete(key: string): void;
    clear(): void;
    clearPattern(pattern: string): void;
    hasCachedData(key: string): boolean;
    getReactiveCache<T>(key: string): Signal$1<T> | undefined;
    setReactiveCache<T>(key: string, value: Signal$1<T>): void;
    getCacheTimestamp(key: string): number | undefined;
    setCacheTimestamp(key: string, timestamp: number): void;
    isCacheValid(key: string, ttlMs?: number): boolean;
    isCacheFull(): boolean;
    evictOldestCache(): void;
    invalidateCache(): void;
    clearAll(): void;
    getOrFetch<T>(key: string, fetchFn: () => Promise<T>): Promise<T>;
    hasInFlightRequest(key: string): boolean;
    getInFlightRequest<T>(key: string): Promise<T> | undefined;
    /**
     * Returns a sub-cache that shares the same underlying storage as this cache
     * but isolates keys under the given namespace.
     *
     * Usage:
     *   const tasksCache = cache.getSubCache('tasks');
     *   const chatsCache = cache.getSubCache('chats');
     *   tasksCache.set('todo:1', data);   // stored as 'tasks:todo:1'
     *   chatsCache.set('msg:1', data);    // stored as 'chats:msg:1'
     */
    getSubCache(name: string): StorageCacheService;
    static ɵfac: i0.ɵɵFactoryDeclaration<StorageCacheService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StorageCacheService>;
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
    Forbidden = "forbidden",
    Info = "info",
    Warning = "warning",
    Duplicate = "duplicate"
}
interface Response<T = unknown> {
    status: ResponseStatus;
    message: string;
    data: T | null;
}
declare function isSuccess<T>(response: Response<T>): boolean;
declare function isError<T>(response: Response<T>): boolean;
declare function getErrorMessage$1<T>(response: Response<T>): string | null;
declare function unwrapResponse<T>(response: Response<T>): T;
declare function mapResponse<U, T>(response: Response<T>, mapper: (data: T) => U): Response<U>;

/** Standard filter for CRUD operations matching Rust CrudFilter */
interface CrudFilter {
    field: string;
    op: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
    value: unknown;
}
/**
 * Unified CRUD service that maps to Rust define_crud_routes! commands.
 *
 * Naming convention: entity "connection" → Rust command `connection_get`, `connection_get_all`, etc.
 * Custom commands: call `.custom('my_command', { arg: value })` for app-specific Tauri commands.
 */
declare class ApiCrudService {
    private invoke;
    /** Get a single entity by ID — calls `{entity}_get` */
    get<T>(entity: string, id: string, options?: InvokeOptions): Promise<Response<T>>;
    /** Get all entities with optional filtering/pagination — calls `{entity}_get_all` */
    getAll<T>(entity: string, filter?: CrudFilter[], skip?: number, limit?: number, sortBy?: string, sortAsc?: boolean): Promise<Response<T[]>>;
    /** Create a new entity — calls `{entity}_create` */
    create<T>(entity: string, data: unknown): Promise<Response<T>>;
    /** Full update of an entity — calls `{entity}_update` */
    update<T>(entity: string, id: string, data: unknown): Promise<Response<T>>;
    /** Partial update of an entity — calls `{entity}_patch` */
    patch<T>(entity: string, id: string, patch: unknown): Promise<Response<T>>;
    /** Delete an entity — calls `{entity}_delete` */
    delete(entity: string, id: string): Promise<Response<null>>;
    /**
     * Call any custom Tauri command not covered by standard CRUD.
     * Use for app-specific commands that don't follow the `{entity}_{operation}` pattern.
     */
    custom<T>(command: string, args?: Record<string, unknown>): Promise<T>;
    /** Get with automatic retry on failure */
    getWithRetry<T>(entity: string, id: string, retryOptions?: RetryOptions): Promise<Response<T>>;
    /** Custom command with automatic retry on failure */
    customWithRetry<T>(command: string, args?: Record<string, unknown>, retryOptions?: RetryOptions): Promise<T>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApiCrudService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ApiCrudService>;
}

interface SchemaSetupOptions {
    /** Initial route to navigate to after schema loads */
    initialRoute?: string;
    /** Tauri command name to load schema (default: 'get_ui_schema') */
    commandName?: string;
    /** Fallback command if primary fails */
    errorFallbackCommandName?: string;
    /** Theme variant to apply (default: 'material-design-v3') */
    themeVariant?: StyleVariant;
    /** Schema handler definitions */
    handlers?: Record<string, HandlerDefinition>;
    /** Whether to auto-register schema pages as Angular routes (default: false) */
    autoRegisterRoutes?: boolean;
    /** Called after schema loads successfully */
    onSchemaLoaded?: (schema: UiSchema) => void;
    /** Called if schema loading fails */
    onError?: (error: Error) => void;
}
declare class SchemaSetupService {
    private invokeWrapper;
    private schemaRouter;
    private renderer;
    private themeService;
    private fallbackService;
    private handlerExecutor;
    private router;
    readonly schemaLoaded: i0.WritableSignal<boolean>;
    readonly setupError: i0.WritableSignal<string | null>;
    /**
     * Complete schema setup: load, validate, register, navigate.
     * This replaces per-app schema loading boilerplate.
     */
    setup(appId: string, options?: SchemaSetupOptions): Promise<UiSchema | null>;
    /**
     * Set the Angular Router instance for route registration.
     * Called automatically if Router is available via DI.
     */
    setRouter(router: Router): void;
    /**
     * Register all schema pages as Angular Routes pointing to SchemaRouteViewerComponent.
     * Must be called AFTER schema is loaded.
     */
    registerRouter(): void;
    /**
     * Convert all schema pages to Angular Routes.
     * Each route points to SchemaRouteViewerComponent with page data in route data.
     */
    toAngularRoutes(): Routes;
    private loadSchema;
    private tryFallback;
    private registerFunctions;
    private applyTheme;
    static ɵfac: i0.ɵɵFactoryDeclaration<SchemaSetupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SchemaSetupService>;
}

interface UnifiedAppConfig {
    appId?: string;
    enableAnimations?: boolean;
    enableHttpClient?: boolean;
    enableBrowserErrorListeners?: boolean;
    enableZoneChangeDetection?: boolean;
    extraProviders?: (Provider | EnvironmentProviders)[];
}
type AppProvider = Provider | EnvironmentProviders;
/**
 * Standardized Angular providers for all Tauri apps.
 *
 * Usage:
 * ```typescript
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     ...provideUnifiedApp({ appId: 'my-app' }),
 *     // App-specific providers only
 *   ],
 * };
 * ```
 */
declare function provideUnifiedApp(config?: UnifiedAppConfig): AppProvider[];

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

/**
 * Sort array of objects by property and order
 * @param arr - Array to sort
 * @param key - Property name to sort by
 * @param order - "asc" or "desc"
 */
declare function sortBy<T>(arr: T[], key: keyof T | number, order?: "asc" | "desc"): T[];

declare function clamp(value: number, min: number, max: number): number;
declare function lerp(start: number, end: number, t: number): number;
declare function isClose(pos1: {
    x: number;
    z: number;
}, pos2: {
    x: number;
    z: number;
}, threshold: number): boolean;
declare function calculateDistance3D(pos1: {
    x: number;
    y: number;
    z: number;
}, pos2: {
    x: number;
    y: number;
    z: number;
}): number;
declare function randomInt(min: number, max: number): number;
declare function randomChoice<T>(array: T[]): T;

declare function randomRange(min: number, max: number): number;
declare function easeOutQuad(t: number): number;
declare function easeInOutQuad(t: number): number;
declare function formatTime$1(seconds: number): string;
declare function randomInterval(min: number, max: number): number;
declare function weightedRandom<T>(items: {
    item: T;
    weight: number;
}[]): T;
declare function randomPitchVariation(variation: number): number;
declare function generatePeerId(): number;
declare function lerpVector3D(a: [number, number, number], b: [number, number, number], t: number): [number, number, number];
declare function lerpAngle(a: number, b: number, t: number): number;

declare function truncate(str: string, maxLength: number, suffix?: string): string;
declare function capitalize(str: string): string;
declare function slugify(str: string): string;

declare function formatDateRelative(date: Date): string;
declare function formatTime(date: Date | string): string;
declare function formatLocaleDate(date: Date | string): string;
declare function generateCalendarDays(year: number, month: number): Date[];
declare function isSameDay(date1: Date, date2: Date): boolean;
/**
 * Compare two entities by their created_at timestamp (descending - newest first)
 */
declare function compareByTimestamp(a: {
    created_at?: string;
    updated_at?: string;
}, b: {
    created_at?: string;
    updated_at?: string;
}): number;
/**
 * Get the latest timestamp from created_at/updated_at
 */
declare function getLatestTimestamp(entity: {
    created_at?: string;
    updated_at?: string;
}): number;

/**
 * Safe JSON parser with fallback for array types.
 * Replaces 22+ duplicate patterns across the codebase.
 */
declare function parseJsonOrDefault<T>(json: string | T[], defaultValue?: T[]): T[];

declare function findById<T extends {
    id: string;
}>(items: T[], id: string): T | undefined;
declare function findByIdOrThrow<T extends {
    id: string;
}>(items: T[], id: string): T;
declare function upsertEntity<T extends {
    id: string;
}>(items: T[], entity: T): T[];
declare function deduplicateById<T extends {
    id: string;
}>(items: T[], options?: {
    filterDeleted?: boolean;
}): T[];
declare function groupByField<T>(items: T[], field: keyof T): Record<string, T[]>;

declare function trackByRow(index: number, row: Record<string, unknown>): string;
declare function trackByIndex(index: number): number;
/**
 * Group entities by a key function, returning Map
 */
declare function groupByKey<T, K>(entities: T[], keyFn: (entity: T) => K): Map<K, T[]>;

interface LRUEntry {
    lastAccessed: number;
}
declare function evictLRU<T extends LRUEntry>(cache: Map<string, T>, maxSize: number): Map<string, T>;
declare function evictLRUInPlace<T extends LRUEntry>(map: Map<string, T>, maxSize: number): void;
declare function isStale(timestamp: number, ttlMs: number): boolean;

declare function generateId(prefix?: string): string;
declare const generateTransactionId: () => string;
declare const generateBatchId: () => string;
declare const generateLogId: () => string;
declare const generateQueryId: () => string;
declare const generateTabId: () => string;

declare function formatBytes(bytes: number): string;
declare function formatCompactNumber(num: number): string;

declare function isNullOrUndefined(value: unknown): value is null | undefined;
declare function isPresent<T>(value: T): value is NonNullable<T>;
declare function isValidEmail(email: string): boolean;
declare function isValidBase64Image(data: string): boolean;

declare function escapeSqlValue(value: unknown): string;
declare function escapeCsvValue(value: unknown): string;

declare function deepClone<T>(obj: T): T;
declare function getNestedValue(obj: unknown, path: string): unknown;
declare function applyUpdate<T extends object>(target: T, update: Partial<T>): T;

declare function debounce<T extends (...args: unknown[]) => unknown>(fn: T, delayMs: number): (...args: Parameters<T>) => void;
declare function throttle<T extends (...args: unknown[]) => unknown>(fn: T, delayMs: number): (...args: Parameters<T>) => void;
type LoadingState = {
    loading: boolean;
};
declare function withLoading<T extends (...args: unknown[]) => Promise<unknown>>(fn: T, setLoading: (loading: boolean) => void): (...args: Parameters<T>) => Promise<unknown>;

type Signal<T> = {
    (): T;
    set(value: T): void;
    update(fn: (prev: T) => T): void;
};
declare function createState<T>(initialValue: T): Signal<T>;
declare function createStateSubject<T>(initialValue: T): {
    state$: Observable<T>;
    set: (value: T) => void;
    update: (fn: (prev: T) => T) => void;
};
declare function createDerivedState<T, R>(state$: Observable<T>, derive: (state: T) => R): Observable<R>;

declare class EventListenerManager {
    private listeners;
    add(element: EventTarget, event: string, handler: EventListener): void;
    remove(element: EventTarget, event: string, handler: EventListener): void;
    removeAll(): void;
}
interface ResizeObserverEntry {
    target: Element;
    contentRect: DOMRectReadOnly;
}
type ResizeObserverCallback = (entries: ResizeObserverEntry[], observer: ResizeObserver) => void;
declare function createResizeObserver(callback: ResizeObserverCallback): ResizeObserver | null;
declare function observeElement(observer: ResizeObserver, element: Element): void;
declare function unobserveElement(observer: ResizeObserver, element: Element): void;

/**
 * Filter array items by search query across multiple fields
 */
declare function filterBySearch<T>(items: T[], query: string, fields: (keyof T | string)[]): T[];

declare function getErrorMessage(error: unknown): string;
declare function withErrorHandling<T>(fn: () => Promise<T>, onError?: (error: unknown) => void): Promise<T | undefined>;

/**
 * Route guard that checks resource-action permissions.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacGuard],
 *   data: {
 *     permissions: ['users.read', 'settings.write'],
 *     requireAll: false  // OR logic (default), true = AND logic
 *   }
 * }
 */
declare const rbacGuard: CanActivateFn;
/**
 * Guard that checks for specific roles.
 *
 * Usage in route config:
 * {
 *   path: 'admin',
 *   canActivate: [rbacRoleGuard],
 *   data: {
 *     roles: ['admin', 'moderator']
 *   }
 * }
 */
declare const rbacRoleGuard: CanActivateFn;

/**
 * Structural directive that shows/hides content based on permission.
 *
 * Usage:
 * <button *rbacHasPermission="'users.write'">Edit Users</button>
 * <div *rbacHasPermission="'users.delete'; else noPerm">Delete</div>
 * <ng-template #noPerm>No permission</ng-template>
 *
 * Supports AND logic with multiple permissions:
 * <button *rbacHasPermission="['users.write', 'users.admin']">Admin Action</button>
 */
declare class RbacHasPermissionDirective implements OnInit {
    private permissionService;
    private templateRef;
    private viewContainer;
    permission: string | string[];
    constructor(permissionService: PermissionService, templateRef: TemplateRef<unknown>, viewContainer: ViewContainerRef);
    ngOnInit(): void;
    private updateView;
    private checkPermission;
    static ɵfac: i0.ɵɵFactoryDeclaration<RbacHasPermissionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RbacHasPermissionDirective, "[rbacHasPermission]", never, { "permission": { "alias": "rbacHasPermission"; "required": false; }; }, {}, never, never, true, never>;
}
/**
 * Structural directive that shows/hides content based on role membership.
 *
 * Usage:
 * <button *rbacHasRole="'admin'">Admin Panel</button>
 * <div *rbacHasRole="['editor', 'moderator']">Can Edit</div>
 */
declare class RbacHasRoleDirective implements OnInit {
    private permissionService;
    private templateRef;
    private viewContainer;
    role: string | string[];
    constructor(permissionService: PermissionService, templateRef: TemplateRef<unknown>, viewContainer: ViewContainerRef);
    ngOnInit(): void;
    private updateView;
    private checkRole;
    static ɵfac: i0.ɵɵFactoryDeclaration<RbacHasRoleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RbacHasRoleDirective, "[rbacHasRole]", never, { "role": { "alias": "rbacHasRole"; "required": false; }; }, {}, never, never, true, never>;
}

interface UpdateInfo {
    current_version: string;
    latest_version: string;
    download_url: string;
    asset_name: string;
    asset_size: number;
    release_notes?: string;
}
interface DownloadProgress {
    bytes_downloaded: number;
    total_bytes: number;
    progress_pct: number;
}
/**
 * Update service for checking, downloading, and installing app updates via Tauri backend.
 */
declare class UpdateService {
    /**
     * Check for available updates.
     * Returns UpdateInfo if an update is available, null otherwise.
     */
    checkForUpdates(): Promise<UpdateInfo | null>;
    /**
     * Download an update with optional progress callback.
     * Returns the path to the downloaded installer.
     */
    downloadUpdate(info: UpdateInfo, onProgress?: (p: DownloadProgress) => void): Promise<string>;
    /**
     * Install the update from the given installer path.
     */
    installUpdate(path: string): Promise<void>;
    /**
     * Get the current app version.
     */
    getCurrentVersion(): Promise<string>;
}

/**
 * Reusable about/check-update pattern for apps that distribute via GitHub Releases.
 * Fetches release info from GitHub API and uses UpdateService for download/install.
 */
declare class AboutService {
    appName: string;
    owner: string;
    repo: string;
    private updateService;
    constructor(appName: string, owner: string, repo: string);
    /**
     * Check for updates by fetching the latest GitHub release.
     * Returns UpdateInfo if a newer version is available, null otherwise.
     */
    checkUpdate(): Promise<UpdateInfo | null>;
    /**
     * Download and install the latest update.
     * Requires checkUpdate() to have been called first to populate cached info.
     */
    downloadAndInstall(onProgress?: (p: DownloadProgress) => void): Promise<void>;
    private isNewerVersion;
}

export { AboutService, ApiCrudService, ApiException, BaseDestroyableComponent, ComponentRegistryService, DataBindingResolverService, ErrorHandlerService, ErrorType, EventBusService, EventListenerManager, GuardService, HandlerExecutorService, I18nService, IndexedDbService, InvokeWrapperService, LayoutEngineService, LocalStorageService, PaginationComponent, PermissionService, RbacHasPermissionDirective, RbacHasRoleDirective, ResponseStatus, SCHEMA_COMPONENT_MAP, SchemaElementComponent, SchemaRendererService, SchemaRouteViewerComponent, SchemaRouterService, SchemaSetupService, SchemaShellComponent, SignalLoggerService, SignalStoreService, SignalSyncService, StorageCacheService, StorageQueryService, StorageService, StyleThemeService, StyleThemeService as ThemeService, ThemeToggleService, ToastService, TodoPermission, UnifiedStorageService, UpdateService, applyUpdate, calculateDistance3D, capitalize, clamp, compareByTimestamp, createDerivedState, createResizeObserver, createState, createStateSubject, debounce, deduplicateById, deepClone, easeInOutQuad, easeOutQuad, escapeCsvValue, escapeSqlValue, evictLRU, evictLRUInPlace, feedbackComponents, filterBySearch, findById, findByIdOrThrow, formatBytes, formatCompactNumber, formatDateRelative, formatError, formatLocaleDate, formatTime$1 as formatTime, formatTime as formatTimeFromDate, generateBatchId, generateCalendarDays, generateId, generateLogId, generatePeerId, generateQueryId, generateTabId, generateTransactionId, getAllStyleVariants, getComponentStyleClasses, getCurrentStyle, getErrorMessage$1 as getErrorMessage, getErrorMessage as getErrorMessageFromUnknown, getLatestTimestamp, getNestedValue, getStyleClassPrefix, groupByField, groupByKey, invokeCommand, invokeCommandWithResponse, invokeVoid, invokeWithError, isClose, isError, isNullOrUndefined, isPresent, isSameDay, isStale, isSuccess, isValidBase64Image, isValidEmail, layoutComponents, lerp, lerpAngle, lerpVector3D, loadStyleVariant, loadStyleVariantNoop, mapResponse, observeElement, parseError, parseJsonOrDefault, provideUnifiedApp, randomChoice, randomChoice as randomElement, randomInt, randomInterval, randomPitchVariation, randomRange, rbacGuard, rbacRoleGuard, registerSchemaComponent, setCurrentStyle, setTheme, slugify, sortBy, throttle, trackByIndex, trackByRow, truncate, uiComponents, unobserveElement, unwrapResponse, upsertEntity, weightedRandom, withErrorHandling, withLoading };
export type { AppError, AppProvider, AppSchema, CacheEntry, CanvasElement, ColorMode, ComponentBehavior, ComponentDef, ComponentStyleMap, DataBinding, DownloadProgress, ElementConfig, ElementEvents, GridPosition, GridTemplate, HandlerDefinition, Layout, LayoutElement, LoadingState, Page, Permission, PermissionCheckResult, QueryFilter, RenderContext, ResizeObserverCallback, ResizeObserverEntry, Response, Role, SchemaSetupOptions, Signal, StorageValidator, StyleVariant, Theme, ToastNotification, TodoPermissionContext, UiSchema, UnifiedAppConfig, UpdateInfo, User };
