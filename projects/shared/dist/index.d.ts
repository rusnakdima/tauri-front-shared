import * as i0 from "@angular/core";
import {
  EventEmitter,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  Type,
} from "@angular/core";
import { Subject, Observable } from "rxjs";

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
  visible?:
    | boolean
    | {
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
  styles?: {
    custom?: Record<string, string>;
    states?: {
      hover?: Record<string, string>;
      focus?: Record<string, string>;
      disabled?: Record<string, string>;
    };
  };
}
type RegionType =
  | "header"
  | "sidebar"
  | "sidebar-left"
  | "sidebar-right"
  | "footer"
  | "bottom-nav"
  | "nav"
  | "overlay"
  | "other";
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
  visible?:
    | boolean
    | {
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
  static ɵcmp: i0.ɵɵComponentDeclaration<
    PaginationComponent,
    "app-pagination",
    never,
    {
      totalItems: { alias: "totalItems"; required: false };
      currentPage: { alias: "currentPage"; required: false };
      pageSize: { alias: "pageSize"; required: false };
    },
    { pageChange: "pageChange"; pageSizeChange: "pageSizeChange" },
    never,
    never,
    true,
    never
  >;
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
  static ɵcmp: i0.ɵɵComponentDeclaration<
    BaseDestroyableComponent,
    "lib-base-destroyable",
    never,
    {},
    {},
    never,
    never,
    true,
    never
  >;
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
  on(
    event: string,
    handler: (data: unknown) => void,
    context?: unknown,
  ): () => void;
  once(
    event: string,
    handler: (data: unknown) => void,
    context?: unknown,
  ): () => void;
  off(event: string, handler?: Function): void;
  offAll(event?: string): void;
  hasListeners(event: string): boolean;
  getListenerCount(event: string): number;
  private generateId;
  showToast(
    message: string,
    type?: ToastNotification["type"],
    duration?: number,
  ): string;
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

interface StorageServiceInterface {
  get<T>(key: string): T | null;
  set(key: string, value: unknown): void;
}
interface CrudFilter {
  field: string;
  operator:
    | "eq"
    | "ne"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "contains"
    | "startsWith"
    | "endsWith";
  value: unknown;
}
interface CrudQuery {
  filters?: CrudFilter[];
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
  create<
    T extends {
      id: string;
    },
  >(collection: string, item: T): void;
  read<T>(collection: string, id: string): T | null;
  update<
    T extends {
      id: string;
    },
  >(collection: string, id: string, changes: Partial<T>): void;
  delete(collection: string, id: string): void;
  query<T>(collection: string, q: CrudQuery): T[];
  private applyFilter;
  private applySort;
  private addPending;
  batchCreate<
    T extends {
      id: string;
    },
  >(collection: string, items: T[]): void;
  batchDelete(collection: string, ids: string[]): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<CrudService$1, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<CrudService$1>;
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
  mergeBehavior(
    componentId: string,
    schemaBehavior?: ComponentBehavior,
  ): ComponentBehavior;
  private mergeEventHandlers;
  getAllComponentIds(): string[];
  getComponentsByCategory(category: string): string[];
  registerComponent(def: ComponentDef): void;
  registerComponents(defs: ComponentDef[]): void;
  getComponent(selector: string): ComponentDef | undefined;
  registerComponentModule(
    selector: string,
    module: Record<string, unknown>,
  ): void;
  loadComponentModule(selector: string): Promise<CustomElementConstructor>;
  getComponentModules(): Map<string, Record<string, unknown>>;
  loadComponentsFromSchema(
    pages: {
      components?: ComponentDef[];
    }[],
  ): void;
  hasComponent(selector: string): boolean;
  getRegisteredSelectors(): string[];
  static ɵfac: i0.ɵɵFactoryDeclaration<ComponentRegistryService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<ComponentRegistryService>;
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
  constructor(signalStore: SignalStoreService, crudService: CrudService$1);
  setParams(params: Record<string, string>): void;
  registerFunction(name: string, fn: Function): void;
  registerFunctions(fns: Record<string, Function>): void;
  resolveDataBinding(binding: unknown): unknown;
  private resolveFunctionCall;
  private parseCallArgs;
  private resolveParamsPath;
  resolveProps(
    props: Record<string, unknown>,
    _componentId: string,
  ): Record<string, unknown>;
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
  resolveGridPosition(
    layout: Layout | undefined,
    componentId: string,
  ): GridPosition | null;
  resolveGridPositionFromPositions(
    positions: GridPosition[] | undefined,
    componentId: string,
  ): GridPosition | null;
  calculateGridSpan(
    colSpan: number | undefined,
    rowSpan: number | undefined,
  ): {
    gridColumn: string;
    gridRow: string;
  };
  applyLayoutStyles(
    container: HTMLElement,
    layout: Layout,
    children: string[],
    getComponentById: (id: string) =>
      | {
          selector: string;
        }
      | undefined,
    resolvePosition: (layout: Layout, childId: string) => GridPosition | null,
  ): Promise<void>;
  createGridTemplateString(columns: string[], rows: string[]): string;
  parseGridTemplate(template: GridTemplate): {
    gridTemplateColumns: string;
    gridTemplateRows: string;
    gap: string;
  };
  static ɵfac: i0.ɵɵFactoryDeclaration<LayoutEngineService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<LayoutEngineService>;
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

type StyleVariant =
  | "claymorphism"
  | "glassmorphism"
  | "neumorphism"
  | "material-design-v3"
  | "brutalism"
  | "skeuomorphism";
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
declare function getComponentStyleClasses(
  theme: StyleVariant,
  componentId: string,
  explicitVariant?: string,
  explicitSize?: string,
  globalContext?: GlobalStyleContext,
): string;
declare function getAllStyleVariants(): StyleVariantConfig[];

interface PageSchema {
  id: string;
  name: string;
  elements: CanvasElement[];
  gridTemplate?: GridTemplate;
}
declare class SchemaRendererService {
  private dataStore;
  private crudService;
  private eventBus;
  private componentRegistry;
  private dataBindingResolver;
  private layoutEngine;
  private i18n;
  private _pages;
  private _currentPageId;
  private _navigationStack;
  private _appConfig;
  constructor(
    dataStore: SignalStoreService,
    crudService: CrudService$1,
    eventBus: EventBusService,
    componentRegistry: ComponentRegistryService,
    dataBindingResolver: DataBindingResolverService,
    layoutEngine: LayoutEngineService,
    i18n: I18nService,
  );
  private componentResolver;
  private routeResolver;
  private _handlers;
  private _stores;
  private _layoutRegions;
  private _currentRoute;
  pages: i0.Signal<Page[]>;
  currentPageId: i0.Signal<string>;
  layoutRegions: i0.Signal<LayoutElement[]>;
  registerComponent(def: ComponentDef): void;
  registerComponents(defs: ComponentDef[]): void;
  getComponent(selector: string): ComponentDef | undefined;
  loadSchema(
    schema:
      | AppSchema
      | {
          pages: Page[];
          app?: {
            variant?: string;
            size?: string;
          };
        },
  ): void;
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
    visible?:
      | boolean
      | {
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
  registerComponentModule(
    selector: string,
    module: Record<string, unknown>,
  ): void;
  resolveGridPosition(
    layoutId: string,
    componentId: string,
  ): GridPosition | null;
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
  setComponentResolver(
    resolver: (selector: string) => ComponentDef | undefined,
  ): void;
  createElement(data: CanvasElement): Promise<HTMLElement | null>;
  render(
    container: HTMLElement,
    pageSchema: PageSchema,
    currentRoute?: string,
  ): Promise<void>;
  private renderNestedChildren;
  renderLayoutRegion(
    container: HTMLElement,
    regionId: string,
    currentRoute?: string,
  ): Promise<void>;
  bindEvents(
    el: HTMLElement,
    events: Record<string, string | Function>,
    elementId: string,
  ): void;
  mapPropsToClasses(
    componentId: string,
    props: Record<string, unknown>,
    theme: StyleVariant,
    explicitVariant?: string,
    explicitSize?: string,
    globalContext?: GlobalStyleContext,
  ): string[];
  resolveClasses(elementClasses: string, defaultClasses: string): string;
  resolveDataBinding(binding: unknown): unknown;
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
  OWNER = "owner",
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
  readonly currentUser: i0.Signal<User>;
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
  createRole(
    name: string,
    description: string,
    permissions: Permission[],
  ): Promise<Role>;
  /**
   * Update an existing role.
   */
  updateRole(
    roleId: string,
    name: string,
    description: string,
    permissions: Permission[],
  ): Promise<Role>;
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
  canEditEntity(
    entityOwnerId: string,
    permission: TodoPermission,
    userId: string,
  ): boolean;
  /**
   * Check if user can delete a specific entity based on ownership or permission level.
   */
  canDeleteEntity(
    entityOwnerId: string,
    permission: TodoPermission,
    userId: string,
  ): boolean;
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
  readonly schema: i0.Signal<UiSchema>;
  readonly currentPage: i0.Signal<Page>;
  readonly currentLayout: i0.Signal<Layout>;
  readonly currentRoute: i0.Signal<string>;
  readonly params: i0.Signal<Record<string, string>>;
  readonly queryParams: i0.Signal<Record<string, string>>;
  readonly isLoading: i0.Signal<boolean>;
  readonly error: i0.Signal<string>;
  readonly hasSchema: i0.Signal<boolean>;
  readonly currentPageId: i0.Signal<string>;
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
  static ɵfac: i0.ɵɵFactoryDeclaration<
    SchemaRouterService,
    [{ optional: true }]
  >;
  static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRouterService>;
}

declare class SchemaRouteViewerComponent implements OnInit, OnChanges {
  private router;
  private renderer;
  route: string;
  readonly page: i0.Signal<Page>;
  /** CSS grid properties to apply via ngStyle */
  readonly gridStyles: i0.Signal<Record<string, string>>;
  /** CSS classes: schema-page + layout class */
  readonly containerClass: i0.Signal<string>;
  constructor(router: SchemaRouterService, renderer: SchemaRendererService);
  ngOnInit(): void;
  ngOnChanges(changes: SimpleChanges): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRouteViewerComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SchemaRouteViewerComponent,
    "lib-schema-route-viewer",
    never,
    { route: { alias: "route"; required: false } },
    {},
    never,
    never,
    true,
    never
  >;
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
  invoke<T>(
    cmd: string,
    args?: Record<string, unknown>,
    options?: InvokeOptions,
  ): Promise<T>;
  invokeWithRetry<T>(
    cmd: string,
    args?: Record<string, unknown>,
    retryOptions?: RetryOptions,
  ): Promise<T>;
  timeout<T>(
    ms: number,
    cmd: string,
    args?: Record<string, unknown>,
    options?: InvokeOptions,
  ): Promise<T>;
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
  constructor();
  /** No-op for API compatibility; initialization runs in the constructor. */
  init(): void;
  loadTheme(variant: StyleVariant): Promise<void>;
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
  getCurrentTheme(): StyleVariant;
  private injectDarkModeVariables;
  private removeDarkModeVariables;
  private getDarkModeVariablesCSS;
  private getDarkModeCSS;
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
  getFallbackSchema(errorMessage?: string): UiSchema;
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
  readonly loading: i0.WritableSignal<boolean>;
  readonly error: i0.WritableSignal<string>;
  private themeSubscription?;
  /** All raw layout regions from the renderer (unfiltered) */
  private readonly rawRegions;
  /** Infer region type from explicit `region` property or fall back to ID pattern matching */
  private getRegionType;
  private isRegionVisible;
  private regionByType;
  private regionsByType;
  readonly headerRegion: i0.Signal<LayoutElement>;
  readonly sidebarLeftRegion: i0.Signal<LayoutElement>;
  readonly sidebarRightRegion: i0.Signal<LayoutElement>;
  readonly footerRegion: i0.Signal<LayoutElement>;
  readonly bottomNavRegion: i0.Signal<LayoutElement>;
  readonly overlayRegions: i0.Signal<LayoutElement[]>;
  /** Unrecognized regions rendered in an extra row below the main layout */
  readonly otherRegions: i0.Signal<LayoutElement[]>;
  /** CSS grid-template-columns — always 3 columns, hidden sidebars get 0px */
  readonly gridColumns: i0.Signal<string>;
  /** CSS grid-template-rows — hidden regions get 0px */
  readonly gridRows: i0.Signal<string>;
  /** CSS grid-template-areas — always 5 rows with 3 columns */
  readonly gridAreas: i0.Signal<string>;
  constructor(
    invokeWrapper: InvokeWrapperService,
    schemaRouter: SchemaRouterService,
    renderer: SchemaRendererService,
    themeService: StyleThemeService,
    themeToggle: ThemeToggleService,
    fallbackService: FallbackService,
    handlerExecutor: HandlerExecutorService,
    signalStore: SignalStoreService,
  );
  ngOnInit(): Promise<void>;
  private setupThemeStoreSync;
  ngOnDestroy(): void;
  onWindowToggleDark(event: Event): void;
  private loadSchema;
  retry(): void;
  /**
   * Returns CSS classes for a region container by mapping its props to Tailwind-style classes.
   * Uses the same mapPropsToClasses() logic as schema elements for consistent styling.
   */
  getRegionClasses(region: LayoutElement | null): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<SchemaShellComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SchemaShellComponent,
    "lib-schema-shell",
    never,
    {
      appId: { alias: "appId"; required: false };
      commandName: { alias: "commandName"; required: false };
      defaultTheme: { alias: "defaultTheme"; required: false };
      initialRoute: { alias: "initialRoute"; required: false };
      errorFallbackCommandName: {
        alias: "errorFallbackCommandName";
        required: false;
      };
    },
    {},
    never,
    never,
    true,
    never
  >;
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
type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";
declare class ToastService {
  private toastsSignal;
  private counter;
  private autoDismissTimers;
  readonly toasts: i0.Signal<ToastConfig[]>;
  private generateId;
  show(
    options: Omit<ToastConfig, "id"> & {
      id?: string;
    },
  ): string;
  success(
    message: string,
    options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>,
  ): string;
  error(
    message: string,
    options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>,
  ): string;
  warning(
    message: string,
    options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>,
  ): string;
  info(
    message: string,
    options?: Partial<Omit<ToastConfig, "id" | "type" | "message">>,
  ): string;
  dismiss(id: string): void;
  dismissAll(): void;
  update(
    id: string,
    changes: Partial<
      Pick<
        ToastConfig,
        "message" | "title" | "type" | "duration" | "persistent" | "action"
      >
    >,
  ): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<ToastService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<ToastService>;
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
  Network = "network",
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
  retryWithBackoff<T>(
    fn: () => Promise<T>,
    config?: Partial<RetryConfig>,
  ): Promise<T>;
  handleAndRetry<T>(
    fn: () => Promise<T>,
    context?: string,
    retryConfig?: Partial<RetryConfig>,
  ): Promise<T>;
  static ɵfac: i0.ɵɵFactoryDeclaration<ErrorHandlerService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<ErrorHandlerService>;
}

declare class ApiException extends Error {
  code?: string;
  details?: unknown;
  constructor(message: string, code?: string, details?: unknown);
}

declare class SchemaElementComponent implements AfterViewInit, OnDestroy {
  private renderer;
  private renderer2;
  private ngZone;
  private eventBus;
  private handlerExecutor;
  private injector;
  private componentRef;
  private styleEl;
  private dynamicHost;
  element: CanvasElement;
  elements: CanvasElement[];
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  private injectStateStyles;
  private removeStateStyles;
  private destroyDynamicComponent;
  private createDynamicComponent;
  get componentType(): i0.Type<any>;
  get tag(): string;
  get classes(): string;
  get childElements(): CanvasElement[];
  get props(): Record<string, unknown>;
  get elementStyles(): Record<string, string>;
  get elementStatesStyles(): string;
  get gridStyle(): Partial<CSSStyleDeclaration>;
  get isNativeHtml(): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<SchemaElementComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    SchemaElementComponent,
    "app-schema-element",
    never,
    {
      element: { alias: "element"; required: true };
      elements: { alias: "elements"; required: true };
    },
    {},
    never,
    never,
    true,
    never
  >;
}

declare const SCHEMA_COMPONENT_MAP: Map<string, Type<any>>;
declare function registerSchemaComponent(
  selector: string,
  component: Type<any>,
): void;

declare abstract class StorageService {
  abstract get<T>(key: string): T | null;
  abstract set<T>(key: string, value: T): void;
  abstract remove(key: string): void;
  abstract clear(): void;
  abstract keys(): string[];
}

type FilterOperator =
  "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";

interface QueryFilter {
  field: string;
  operator: FilterOperator;
  value: unknown;
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

declare abstract class CrudService {
  abstract execute<T>(
    operation: string,
    entity: string,
    params?: Record<string, unknown>,
  ): Promise<T>;
  find<T>(entity: string, id: string): Promise<T | null>;
  findAll<T>(entity: string, filter?: unknown): Promise<T[]>;
  create<T>(entity: string, data: unknown): Promise<T>;
  update<T>(entity: string, id: string, data: unknown): Promise<T>;
  patch<T>(entity: string, id: string, data: unknown): Promise<T>;
  delete(entity: string, id: string): Promise<void>;
  count(entity: string): Promise<number>;
  exists(entity: string, id: string): Promise<boolean>;
  static ɵfac: i0.ɵɵFactoryDeclaration<CrudService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<CrudService>;
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
  Duplicate = "duplicate",
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
declare function mapResponse<U, T>(
  response: Response<T>,
  mapper: (data: T) => U,
): Response<U>;

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
declare function invokeCommand<T>(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<CommandResult<T>>;
declare function invokeCommandWithResponse<T>(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<Response<T>>;
declare function invokeVoid(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<void>;
declare function invokeWithError<T>(
  command: string,
  args?: Record<string, unknown>,
  options?: InvokeOptionsWithRetry,
): Promise<T>;

/**
 * Sort array of objects by property and order
 * @param arr - Array to sort
 * @param key - Property name to sort by
 * @param order - "asc" or "desc"
 */
declare function sortBy<T>(
  arr: T[],
  key: keyof T | number,
  order?: "asc" | "desc",
): T[];

declare function clamp(value: number, min: number, max: number): number;
declare function lerp(start: number, end: number, t: number): number;
declare function isClose(
  pos1: {
    x: number;
    z: number;
  },
  pos2: {
    x: number;
    z: number;
  },
  threshold: number,
): boolean;
declare function calculateDistance3D(
  pos1: {
    x: number;
    y: number;
    z: number;
  },
  pos2: {
    x: number;
    y: number;
    z: number;
  },
): number;
declare function randomInt(min: number, max: number): number;
declare function randomChoice<T>(array: T[]): T;

declare function randomRange(min: number, max: number): number;
declare function easeOutQuad(t: number): number;
declare function easeInOutQuad(t: number): number;
declare function formatTime(seconds: number): string;
declare function randomInterval(min: number, max: number): number;
declare function weightedRandom<T>(
  items: {
    item: T;
    weight: number;
  }[],
): T;
declare function randomPitchVariation(variation: number): number;
declare function generatePeerId(): number;

export {
  ApiException,
  BaseDestroyableComponent,
  ComponentRegistryService,
  DataBindingResolverService,
  ErrorHandlerService,
  ErrorType,
  EventBusService,
  GuardService,
  HandlerExecutorService,
  I18nService,
  InvokeWrapperService,
  LayoutEngineService,
  PaginationComponent,
  PermissionService,
  CrudService as RemoteCrudService,
  SCHEMA_COMPONENT_MAP,
  SchemaElementComponent,
  SchemaRendererService,
  SchemaRouteViewerComponent,
  SchemaRouterService,
  SchemaShellComponent,
  SignalStoreService,
  StorageService,
  StyleThemeService,
  StyleThemeService as ThemeService,
  ThemeToggleService,
  ToastService,
  UnifiedStorageService,
  calculateDistance3D,
  clamp,
  easeInOutQuad,
  easeOutQuad,
  feedbackComponents,
  formatError,
  formatTime,
  generatePeerId,
  getAllStyleVariants,
  getComponentStyleClasses,
  getCurrentStyle,
  getErrorMessage,
  getStyleClassPrefix,
  invokeCommand,
  invokeCommandWithResponse,
  invokeVoid,
  invokeWithError,
  isClose,
  isError,
  isSuccess,
  layoutComponents,
  lerp,
  loadStyleVariant,
  mapResponse,
  parseError,
  randomChoice,
  randomChoice as randomElement,
  randomInt,
  randomInterval,
  randomPitchVariation,
  randomRange,
  registerSchemaComponent,
  setCurrentStyle,
  sortBy,
  uiComponents,
  unwrapResponse,
  weightedRandom,
};
export type {
  AppError,
  AppSchema,
  CanvasElement,
  ColorMode,
  ComponentBehavior,
  ComponentDef,
  ComponentStyleMap,
  DataBinding,
  ElementConfig,
  ElementEvents,
  GridPosition,
  GridTemplate,
  HandlerDefinition,
  Layout,
  LayoutElement,
  Page,
  RenderContext,
  Response,
  StyleVariant,
  Theme,
  ToastNotification$1 as ToastNotification,
  UiSchema,
};
