import * as fs from "fs";
import * as path from "path";

interface SharedComponentProp {
  name: string;
  type: string;
  default: unknown;
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

const COMPONENT_dirs: { dir: string; packageType: string }[] = [
  { dir: "projects/shared/src/components", packageType: "ui" },
  { dir: "projects/shared/src/ui", packageType: "ui", flatTs: true },
  { dir: "projects/shared/src/layout", packageType: "layout" },
  { dir: "projects/shared/src/feedback", packageType: "feedback" },
  { dir: "projects/shared/src/data", packageType: "data" },
  { dir: "projects/shared/src/grid", packageType: "grid" },
];

const PROJECT_ROOT = path.resolve(__dirname, "..");

function findComponentFiles(dir: string, flatTs = false): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const componentFile = path.join(fullPath, `${entry.name}.component.ts`);
      if (fs.existsSync(componentFile)) {
        files.push(componentFile);
      } else {
        files.push(...findComponentFiles(fullPath));
      }
    } else if (
      flatTs &&
      entry.isFile() &&
      entry.name.endsWith(".ts") &&
      !entry.name.includes(".component.")
    ) {
      files.push(fullPath);
    }
  }
  return files;
}

function isLitComponent(content: string): boolean {
  return content.includes("@customElement") && content.includes("@property");
}

function extractSelector(content: string): string | null {
  const match = content.match(/@customElement\s*\(\s*["']([^"']+)["']\s*\)/);
  return match ? match[1] : null;
}

function extractClassName(content: string): string | null {
  const match = content.match(/export\s+class\s+(\w+)\s+extends\s+LitElement/);
  return match ? match[1] : null;
}

function extractProperties(content: string): SharedComponentProp[] {
  const props: SharedComponentProp[] = [];
  const seen = new Set<string>();

  const lines = content.split("\n");
  for (const line of lines) {
    const propMatch = line.match(
      /^\s*@property\(\s*(.*?)\s*\)\s+(\w+)(?:\s*:\s*([^\s=][^\s=]*))?\s*=\s*([^;]+);/,
    );
    if (!propMatch) continue;

    const [, optionsStr, propName, inlineType, defaultStr] = propMatch;
    if (seen.has(propName)) continue;
    seen.add(propName);

    let propType = "string";

    // Check options for type annotation
    const typeInOptions = optionsStr.match(/type\s*:\s*(\w+)/);
    if (typeInOptions) {
      const t = typeInOptions[1];
      if (t === "Boolean" || t === "boolean") propType = "boolean";
      else if (t === "Number" || t === "number") propType = "number";
      else if (t === "Array" || t === "Object") propType = "string";
      else if (optionsStr.includes("options")) propType = "select";
    } else if (inlineType) {
      const t = inlineType.trim();
      if (t.includes("Boolean") || t === "boolean") propType = "boolean";
      else if (t.includes("Number") || t === "number") propType = "number";
      else if (t.includes("|")) propType = "select";
    }

    // Parse default value
    const def = defaultStr.trim();
    let defaultValue: unknown = def.replace(/^["']|["']$/g, "");
    if (def === "true") defaultValue = true;
    else if (def === "false") defaultValue = false;
    else if (!isNaN(Number(def)) && def !== "null" && def !== "undefined") {
      defaultValue = Number(def);
    }

    // Check for options array
    const optionsMatch = optionsStr.match(/options\s*:\s*\[([^\]]+)\]/);
    const options = optionsMatch
      ? optionsMatch[1]
          .split(",")
          .map((o) => o.trim().replace(/^["']|["']$/g, ""))
      : undefined;
    if (options) {
      propType =
        options.length > 0 && options[0].match(/^#[0-9A-Fa-f]{6}$/)
          ? "color"
          : "select";
    }

    props.push({
      name: propName,
      type: propType,
      default: defaultValue,
      options,
    });
  }

  return props;
}

function extractCss(content: string): string {
  const stylesMatch = content.match(
    /static\s+override\s+styles\s*=\s*css`([\s\S]*?)`/,
  );
  if (stylesMatch) {
    return stylesMatch[1].trim();
  }
  const stylesMatch2 = content.match(/static\s+styles\s*=\s*css`([\s\S]*?)`/);
  if (stylesMatch2) {
    return stylesMatch2[1].trim();
  }
  return "";
}

function extractTemplate(content: string): string {
  const htmlMatch = content.match(/return\s+html`([\s\S]*?)`\s*;?\s*$/m);
  if (htmlMatch) {
    return htmlMatch[1].trim();
  }
  return "";
}

function deriveCategory(props: SharedComponentProp[]): string {
  const hasFormProp = props.some(
    (p) =>
      p.type === "string" ||
      p.type === "number" ||
      p.type === "boolean" ||
      p.type === "select",
  );
  if (hasFormProp) return "forms";
  return "layout";
}

function parseComponent(
  filePath: string,
  packageType: string,
): SharedComponentDef | null {
  const content = fs.readFileSync(filePath, "utf-8");

  if (!isLitComponent(content)) {
    return null;
  }

  const selector = extractSelector(content);
  if (!selector) return null;

  const className = extractClassName(content);
  const name = className || selector.replace("app-", "").replace(/-/g, " ");
  const props = extractProperties(content);
  const css = extractCss(content);
  const template = extractTemplate(content);
  const id = selector.replace("app-", "");
  const category = deriveCategory(props);

  return {
    id,
    name,
    selector,
    packageType,
    category,
    props,
    template,
    css,
  };
}

function main() {
  const components: SharedComponentDef[] = [];
  const seen = new Set<string>();

  for (const { dir, packageType, flatTs } of COMPONENT_dirs) {
    const fullDir = path.resolve(PROJECT_ROOT, dir);
    const files = findComponentFiles(fullDir, flatTs);

    for (const file of files) {
      const component = parseComponent(file, packageType);
      if (component && !seen.has(component.id)) {
        seen.add(component.id);
        components.push(component);
      }
    }
  }

  const outputPath = path.resolve(PROJECT_ROOT, "component-manifest.json");
  fs.writeFileSync(outputPath, JSON.stringify(components, null, 2));

  console.log(
    `Generated ${components.length} components to component-manifest.json`,
  );
}

main();
