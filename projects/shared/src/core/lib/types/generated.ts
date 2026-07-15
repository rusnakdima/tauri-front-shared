export type { ColorMode } from "./bindings/ColorMode";
export type { AppConfig } from "./bindings/AppConfig";
export type { AppSettings } from "./bindings/AppSettings";
export type { CanvasElement } from "./bindings/CanvasElement";
export type { CommandDef } from "./bindings/CommandDef";
export type { ComponentDef } from "./bindings/ComponentDef";
export type { ComponentProp } from "./bindings/ComponentProp";
export type { DataBinding } from "./bindings/DataBinding";
export type { GridArea } from "./bindings/GridArea";
export type { GridDefaults } from "./bindings/GridDefaults";
export type { GridPosition } from "./bindings/GridPosition";
export type { GridTemplate } from "./bindings/GridTemplate";
export type { GridTrack } from "./bindings/GridTrack";
export type { I18nConfig } from "./bindings/I18nConfig";
export type { LayoutSlot } from "./bindings/LayoutSlot";
export type { Layout } from "./bindings/Layout";
export type { LocaleMap } from "./bindings/LocaleMap";
export type { ModuleDef } from "./bindings/ModuleDef";
export type { PageMeta } from "./bindings/PageMeta";
export type { PageSection } from "./bindings/PageSection";
export type { Page } from "./bindings/Page";
export type { ServiceCrud } from "./bindings/ServiceCrud";
export type { ServiceDef } from "./bindings/ServiceDef";
export type { ServiceField } from "./bindings/ServiceField";
export type { ResponsiveBreakpoints } from "./bindings/ResponsiveBreakpoints";
export type { NamedGridArea } from "./bindings/NamedGridArea";
export type { GridElement } from "./bindings/GridElement";
export type { ResponsiveClasses } from "./bindings/ResponsiveClasses";
export type { ThemeColors } from "./bindings/ThemeColors";
export type { Theme } from "./bindings/Theme";
export type { UiSchema } from "./bindings/UiSchema";

export interface User {
  id: string;
  roles: string[];
}

export interface Permission {
  resource: string;
  action: string;
  fields?: string[];
}
