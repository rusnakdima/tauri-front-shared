import * as lit_html from "lit-html";
import * as lit from "lit";
import { LitElement } from "lit";
import * as i0 from "@angular/core";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "ghost";
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
  static styles: lit.CSSResult;
  private _handleClick;
  render(): lit_html.TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "app-button": AppButton;
  }
}

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "search"
  | "tel"
  | "url";
declare class AppInput extends LitElement {
  type: InputType;
  placeholder: string;
  label: string | null;
  disabled: boolean;
  error: string | null;
  icon: string | null;
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
  static styles: lit.CSSResult;
  private _handleAction;
  render(): lit_html.TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "app-empty-state": AppEmptyState;
  }
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
  components: ComponentDef[];
}

interface GridTemplate {
  columns: string[];
  rows: string[];
  gap: string;
}

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
  loadSchema(schema: { pages: Page[] }): void;
  getCurrentPage(): Page | null;
  setCurrentPage(pageId: string): void;
  navigateToPage(route: string): void;
  getNavigationStack(): string[];
  setRouteResolver(resolver: (route: string) => string | null): void;
  renderGridLayout(container: HTMLElement, layout: Layout): void;
  renderFlexLayout(container: HTMLElement, layout: Layout): void;
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
  getComponentProps(componentId: string): Record<string, unknown>;
  generatePage(pageId: string): {
    layouts: Layout[];
    components: ComponentDef[];
  };
  setComponentResolver(
    resolver: (selector: string) => ComponentDef | undefined,
  ): void;
  createElement(data: CanvasElement): Promise<HTMLElement | null>;
  render(container: HTMLElement, pageSchema: PageSchema): Promise<void>;
  bindEvents(
    el: HTMLElement,
    events: Record<string, string | Function>,
    elementId: string,
  ): void;
  resolveClasses(elementClasses: string, defaultClasses: string): string;
  resolveDataBinding(binding: unknown): unknown;
  private getDataBindingValue;
  private parseBindingPath;
  private getNestedValue;
  static ɵfac: i0.ɵɵFactoryDeclaration<SchemaRendererService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<SchemaRendererService>;
}

interface RetryOptions {
  retries?: number;
  delayMs?: number;
  timeoutMs?: number;
}
declare class InvokeWrapperService {
  invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T>;
  invokeWithRetry<T>(
    cmd: string,
    args?: Record<string, unknown>,
    options?: RetryOptions,
  ): Promise<T>;
  private invokeWithTimeout;
  private delay;
}

interface CrudFilter {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
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
  execute<T>(
    operation: "find" | "create" | "update" | "delete",
    params?: Record<string, unknown>,
  ): Promise<{
    data?: T;
    results?: CrudResult<T>;
  }>;
  find<T>(query?: CrudQuery): Promise<CrudResult<T>>;
  create<T>(data: Partial<T>): Promise<T>;
  update<T>(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
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
declare class ThemeService {
  private _mode;
  private _accentColor;
  private _accentShades;
  private _registeredThemes;
  mode: i0.Signal<ThemeMode>;
  accentColor: i0.Signal<string>;
  accentShades: i0.Signal<AccentShades>;
  constructor();
  setMode(mode: ThemeMode): void;
  setTheme(theme: ThemeMode): void;
  setAccentColor(color: string): void;
  registerTheme(name: string, colors: ThemeColors): void;
  init(): void;
  toggle(): void;
  private applyTheme;
  private applyAccentShades;
  calculateShades(hex: string): AccentShades;
  private hexToRgb;
  private rgbToHex;
  hexToRgba(hex: string, alpha: number): string;
  static ɵfac: i0.ɵɵFactoryDeclaration<ThemeService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<ThemeService>;
}

declare class EventBusService {
  private handlers;
  emit(event: string, data: unknown): void;
  on(event: string, handler: (data: unknown) => void): () => void;
  off(event: string, handler: Function): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<EventBusService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<EventBusService>;
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

interface LogEntry {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  timestamp: string;
  source?: string;
  metadata?: Record<string, unknown>;
}
declare class SignalLoggerService {
  private _entries;
  private _minLevel;
  private _maxEntries;
  entries: i0.Signal<LogEntry[]>;
  filteredEntries: i0.Signal<LogEntry[]>;
  setMinLevel(level: "debug" | "info" | "warn" | "error"): void;
  getMinLevel(): string;
  setMaxEntries(max: number): void;
  private addEntry;
  debug(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void;
  info(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void;
  warn(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void;
  error(
    message: string,
    source?: string,
    metadata?: Record<string, unknown>,
  ): void;
  clear(): void;
  getEntriesByLevel(level: LogEntry["level"]): LogEntry[];
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
  lastSyncTime: i0.Signal<Date>;
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

declare const uiComponents: SharedComponentDef[];
declare const layoutComponents: SharedComponentDef[];
declare const feedbackComponents: SharedComponentDef[];
declare const dataComponents: SharedComponentDef[];
declare const components: SharedComponentDef[];

interface DataBinding {
  entity: string;
  field?: string;
  path?: string;
  operation?: "find" | "create" | "update" | "delete";
  params?: Record<string, unknown>;
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
  Network = "network",
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

type StyleVariant =
  | "claymorphism"
  | "glassmorphism"
  | "neumorphism"
  | "material-design-v3";
declare function loadStyleVariant(variant: StyleVariant): Promise<void>;
declare function getCurrentStyle(): StyleVariant;
declare function getStyleClassPrefix(variant: StyleVariant): string;

export {
  AppButton,
  AppEmptyState,
  AppInput,
  CrudService,
  EventBusService,
  InvokeWrapperService,
  SchemaRendererService,
  SignalLoggerService,
  SignalStoreService,
  SignalSyncService,
  ThemeService,
  components,
  dataComponents,
  feedbackComponents,
  getCurrentStyle,
  getStyleClassPrefix,
  invokeCommand,
  invokeCommandWithResponse,
  invokeVoid,
  invokeWithError,
  layoutComponents,
  loadStyleVariant,
  uiComponents,
};
export type {
  ButtonSize,
  ButtonVariant,
  CanvasElement,
  ComponentDef,
  DataBinding,
  GridPosition,
  InputType,
  Layout,
  Page,
  StyleVariant,
};
