/**
 * migrate-schema-classes.ts
 * 
 * Bulk-transforms Tailwind class names to ui-* equivalents in schema JSON files.
 * Run from repo root: npx tsx scripts/migrate-schema-classes.ts [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMAS_DIR = join(__dirname, "../../schemas");

// Map of Tailwind class → ui-* class. Only entries where ui-* exists in ui-system.scss.
// Classes not in this map are left unchanged (they may need theme CSS or component SCSS).
const TAILWIND_TO_UI: Record<string, string> = {
  // Layout
  "flex": "ui-flex",
  "grid": "ui-grid",
  "flex-col": "ui-flex-col",
  "flex-row": "ui-flex-row",
  "flex-wrap": "ui-flex-wrap",
  "flex-1": "ui-flex-1",
  "flex-shrink-0": "ui-flex-shrink-0",
  // Flex alignment
  "items-center": "ui-items-center",
  "items-start": "ui-items-start",
  "items-end": "ui-items-end",
  "items-stretch": "ui-items-stretch",
  "justify-center": "ui-justify-center",
  "justify-start": "ui-justify-start",
  "justify-end": "ui-justify-end",
  "justify-between": "ui-justify-between",
  // Gap
  "gap-1": "ui-gap-1",
  "gap-2": "ui-gap-2",
  "gap-3": "ui-gap-3",
  "gap-4": "ui-gap-4",
  "gap-6": "ui-gap-6",
  "gap-8": "ui-gap-8",
  // Padding
  "p-1": "ui-p-1",
  "p-2": "ui-p-2",
  "p-4": "ui-p-4",
  "p-6": "ui-p-6",
  "p-8": "ui-p-8",
  "px-1": "ui-px-1",
  "px-2": "ui-px-2",
  "px-3": "ui-px-3",
  "px-4": "ui-px-4",
  "px-6": "ui-px-6",
  "px-8": "ui-px-8",
  "py-1": "ui-py-1",
  "py-2": "ui-py-2",
  "py-3": "ui-py-3",
  "py-4": "ui-py-4",
  "py-6": "ui-py-6",
  "py-8": "ui-py-8",
  "pt-2": "ui-pt-2",
  "pt-4": "ui-pt-4",
  "pt-6": "ui-pt-6",
  "pb-2": "ui-pb-2",
  "pb-4": "ui-pb-4",
  "pb-6": "ui-pb-6",
  "pr-2": "ui-pr-2",
  "pr-4": "ui-pr-4",
  "pl-2": "ui-pl-2",
  "pl-4": "ui-pl-4",
  // Margin
  "m-1": "ui-m-1",
  "m-2": "ui-m-2",
  "m-4": "ui-m-4",
  "m-auto": "ui-m-auto",
  "mx-auto": "ui-mx-auto",
  "my-auto": "ui-my-auto",
  "mt-1": "ui-mt-1",
  "mt-2": "ui-mt-2",
  "mt-4": "ui-mt-4",
  "mt-6": "ui-mt-6",
  "mt-8": "ui-mt-8",
  "mb-1": "ui-mb-1",
  "mb-2": "ui-mb-2",
  "mb-4": "ui-mb-4",
  "mb-6": "ui-mb-6",
  "ml-1": "ui-ml-1",
  "ml-2": "ui-ml-2",
  "ml-4": "ui-ml-4",
  "mr-1": "ui-mr-1",
  "mr-2": "ui-mr-2",
  "mr-4": "ui-mr-4",
  // Width/Height
  "w-full": "ui-w-full",
  "w-1/2": "ui-w-1/2",
  "w-64": "ui-w-64",
  "w-32": "ui-w-32",
  "w-16": "ui-w-16",
  "h-full": "ui-h-full",
  "h-screen": "ui-h-screen",
  "min-h-screen": "ui-min-h-screen",
  "max-h-full": "ui-max-h-full",
  "max-w-full": "ui-max-w-full",
  // Border
  "border": "ui-border",
  "border-0": "ui-border-0",
  "border-2": "ui-border-2",
  "border-r": "ui-border-r",
  "border-b": "ui-border-b",
  "border-l": "ui-border-l",
  "border-t": "ui-border-t",
  "border-none": "ui-border-none",
  // Border radius
  "rounded": "ui-rounded",
  "rounded-sm": "ui-rounded-sm",
  "rounded-md": "ui-rounded-md",
  "rounded-lg": "ui-rounded-lg",
  "rounded-xl": "ui-rounded-xl",
  "rounded-full": "ui-rounded-full",
  // Typography
  "text-xs": "ui-text-xs",
  "text-sm": "ui-text-sm",
  "text-base": "ui-text-base",
  "text-lg": "ui-text-lg",
  "text-xl": "ui-text-xl",
  "text-2xl": "ui-text-2xl",
  "text-3xl": "ui-text-3xl",
  "text-4xl": "ui-text-4xl",
  "font-thin": "ui-font-thin",
  "font-light": "ui-font-light",
  "font-normal": "ui-font-normal",
  "font-medium": "ui-font-medium",
  "font-semibold": "ui-font-semibold",
  "font-bold": "ui-font-bold",
  "leading-none": "ui-leading-none",
  "leading-tight": "ui-leading-tight",
  "leading-normal": "ui-leading-normal",
  "leading-loose": "ui-leading-loose",
  "tracking-tight": "ui-tracking-tight",
  "tracking-normal": "ui-tracking-normal",
  "tracking-wide": "ui-tracking-wide",
  "uppercase": "ui-uppercase",
  "lowercase": "ui-lowercase",
  "capitalize": "ui-capitalize",
  "text-center": "ui-text-center",
  "text-left": "ui-text-left",
  "text-right": "ui-text-right",
  "line-clamp-1": "ui-line-clamp-1",
  "line-clamp-2": "ui-line-clamp-2",
  "line-clamp-3": "ui-line-clamp-3",
  "truncate": "ui-truncate",
  // Position
  "relative": "ui-relative",
  "absolute": "ui-absolute",
  "fixed": "ui-fixed",
  "sticky": "ui-sticky",
  "inset-0": "ui-inset-0",
  "top-0": "ui-top-0",
  "top-2": "ui-top-2",
  "top-4": "ui-top-4",
  "top-6": "ui-top-6",
  "bottom-0": "ui-bottom-0",
  "bottom-2": "ui-bottom-2",
  "bottom-4": "ui-bottom-4",
  "bottom-6": "ui-bottom-6",
  "left-0": "ui-left-0",
  "left-2": "ui-left-2",
  "left-4": "ui-left-4",
  "right-0": "ui-right-0",
  "right-2": "ui-right-2",
  "right-4": "ui-right-4",
  "z-0": "ui-z-0",
  "z-10": "ui-z-10",
  "z-20": "ui-z-20",
  "z-30": "ui-z-30",
  "z-40": "ui-z-40",
  "z-50": "ui-z-50",
  // Display
  "block": "ui-block",
  "inline-block": "ui-inline-block",
  "inline": "ui-inline",
  "hidden": "ui-hidden",
  "overflow-hidden": "ui-overflow-hidden",
  "overflow-auto": "ui-overflow-auto",
  "overflow-y-auto": "ui-overflow-y-auto",
  "overflow-x-hidden": "ui-overflow-x-hidden",
  // Effects
  "opacity-0": "ui-opacity-0",
  "opacity-50": "ui-opacity-50",
  "opacity-75": "ui-opacity-75",
  "opacity-100": "ui-opacity-100",
  "shadow-sm": "ui-shadow-sm",
  "shadow": "ui-shadow",
  "shadow-lg": "ui-shadow-lg",
  "shadow-xl": "ui-shadow-xl",
  // Flex utility
  "flex-shrink-0": "ui-flex-shrink-0",
  "flex-grow": "ui-flex-grow",
  // Cursor
  "cursor-pointer": "ui-cursor-pointer",
  "cursor-default": "ui-cursor-default",
  "cursor-not-allowed": "ui-cursor-not-allowed",
  "select-none": "ui-select-none",
  "pointer-events-none": "ui-pointer-events-none",
  // Transition
  "transition": "ui-transition",
  "transition-all": "ui-transition-all",
  "transition-colors": "ui-transition-colors",
  "duration-150": "ui-duration-150",
  "duration-200": "ui-duration-200",
  "duration-300": "ui-duration-300",
  "ease-in-out": "ui-ease-in-out",
  "ease-out": "ui-ease-out",
  "ease-in": "ui-ease-in",
  // Transform
  "rotate-45": "ui-rotate-45",
  "rotate-90": "ui-rotate-90",
  "scale-95": "ui-scale-95",
  "scale-100": "ui-scale-100",
  "scale-105": "ui-scale-105",
  // Misc
  "fill-current": "ui-fill-current",
  "stroke-current": "ui-stroke-current",
  "object-contain": "ui-object-contain",
  "object-cover": "ui-object-cover",
  "object-fill": "ui-object-fill",
  "whitespace-nowrap": "ui-whitespace-nowrap",
  "whitespace-normal": "ui-whitespace-normal",
  "break-words": "ui-break-words",
  "antialiased": "ui-antialiased",
  "subpixel-antialiased": "ui-subpixel-antialiased",
};

// Responsive breakpoints in class names
const RESPONSIVE_MAP: Record<string, string> = {
  "sm:flex": "ui-sm-flex",
  "sm:grid": "ui-sm-grid",
  "sm:flex-col": "ui-sm-flex-col",
  "sm:flex-row": "ui-sm-flex-row",
  "sm:items-center": "ui-sm-items-center",
  "sm:items-start": "ui-sm-items-start",
  "sm:items-end": "ui-sm-items-end",
  "sm:justify-center": "ui-sm-justify-center",
  "sm:justify-start": "ui-sm-justify-start",
  "sm:justify-end": "ui-sm-justify-end",
  "sm:justify-between": "ui-sm-justify-between",
  "sm:gap-1": "ui-sm-gap-1",
  "sm:gap-2": "ui-sm-gap-2",
  "sm:gap-3": "ui-sm-gap-3",
  "sm:gap-4": "ui-sm-gap-4",
  "sm:gap-6": "ui-sm-gap-6",
  "sm:p-1": "ui-sm-p-1",
  "sm:p-2": "ui-sm-p-2",
  "sm:p-4": "ui-sm-p-4",
  "sm:p-6": "ui-sm-p-6",
  "sm:px-1": "ui-sm-px-1",
  "sm:px-2": "ui-sm-px-2",
  "sm:px-4": "ui-sm-px-4",
  "sm:px-6": "ui-sm-px-6",
  "sm:py-1": "ui-sm-py-1",
  "sm:py-2": "ui-sm-py-2",
  "sm:py-4": "ui-sm-py-4",
  "sm:w-full": "ui-sm-w-full",
  "sm:h-full": "ui-sm-h-full",
  "sm:hidden": "ui-sm-hidden",
  "md:flex": "ui-md-flex",
  "md:grid": "ui-md-grid",
  "md:flex-col": "ui-md-flex-col",
  "md:flex-row": "ui-md-flex-row",
  "md:items-center": "ui-md-items-center",
  "md:items-start": "ui-md-items-start",
  "md:items-end": "ui-md-items-end",
  "md:justify-center": "ui-md-justify-center",
  "md:justify-start": "ui-md-justify-start",
  "md:justify-end": "ui-md-justify-end",
  "md:justify-between": "ui-md-justify-between",
  "md:gap-1": "ui-md-gap-1",
  "md:gap-2": "ui-md-gap-2",
  "md:gap-3": "ui-md-gap-3",
  "md:gap-4": "ui-md-gap-4",
  "md:gap-6": "ui-md-gap-6",
  "md:p-1": "ui-md-p-1",
  "md:p-2": "ui-md-p-2",
  "md:p-4": "ui-md-p-4",
  "md:p-6": "ui-md-p-6",
  "md:px-1": "ui-md-px-1",
  "md:px-2": "ui-md-px-2",
  "md:px-4": "ui-md-px-4",
  "md:px-6": "ui-md-px-6",
  "md:py-1": "ui-md-py-1",
  "md:py-2": "ui-md-py-2",
  "md:py-4": "ui-md-py-4",
  "md:w-full": "ui-md-w-full",
  "md:h-full": "ui-md-h-full",
  "md:hidden": "ui-md-hidden",
  "lg:flex": "ui-lg-flex",
  "lg:grid": "ui-lg-grid",
  "lg:flex-col": "ui-lg-flex-col",
  "lg:flex-row": "ui-lg-flex-row",
  "lg:items-center": "ui-lg-items-center",
  "lg:justify-center": "ui-lg-justify-center",
  "lg:justify-between": "ui-lg-justify-between",
  "lg:gap-1": "ui-lg-gap-1",
  "lg:gap-2": "ui-lg-gap-2",
  "lg:gap-3": "ui-lg-gap-3",
  "lg:gap-4": "ui-lg-gap-4",
  "lg:gap-6": "ui-lg-gap-6",
  "lg:p-1": "ui-lg-p-1",
  "lg:p-2": "ui-lg-p-2",
  "lg:p-4": "ui-lg-p-4",
  "lg:p-6": "ui-lg-p-6",
  "lg:px-1": "ui-lg-px-1",
  "lg:px-2": "ui-lg-px-2",
  "lg:px-4": "ui-lg-px-4",
  "lg:px-6": "ui-lg-px-6",
  "lg:py-1": "ui-lg-py-1",
  "lg:py-2": "ui-lg-py-2",
  "lg:py-4": "ui-lg-py-4",
  "lg:w-full": "ui-lg-w-full",
  "lg:h-full": "ui-lg-h-full",
  "lg:hidden": "ui-lg-hidden",
};

function transformClassString(classes: string): string {
  const transformed: string[] = [];
  const seen = new Set<string>();
  
  for (const cls of classes.trim().split(/\s+/)) {
    if (!cls) continue;
    
    // Try responsive first (sm:, md:, lg:)
    if (cls.includes(":")) {
      const mapped = RESPONSIVE_MAP[cls];
      if (mapped) {
        if (!seen.has(mapped)) { seen.add(mapped); transformed.push(mapped); }
        continue;
      }
      // Unknown responsive class — keep as-is
      if (!seen.has(cls)) { seen.add(cls); transformed.push(cls); }
      continue;
    }
    
    // Try direct mapping
    const mapped = TAILWIND_TO_UI[cls];
    if (mapped) {
      if (!seen.has(mapped)) { seen.add(mapped); transformed.push(mapped); }
      continue;
    }
    
    // Keep as-is (includes col-span-*, row-span-*, bg-base-*, border-base-*, etc.)
    if (!seen.has(cls)) { seen.add(cls); transformed.push(cls); }
  }
  
  return transformed.join(" ");
}

function migrateFile(filePath: string, dryRun = false): { changed: number; untouched: number } {
  const content = readFileSync(filePath, "utf-8");
  let changed = 0;
  let untouched = 0;
  
  // Match "classes": "..." patterns in JSON
  const result = content.replace(/"classes":\s*"([^"]*)"/g, (_, classes) => {
    const transformed = transformClassString(classes);
    if (transformed !== classes) {
      changed++;
      return `"classes": "${transformed}"`;
    } else {
      untouched++;
      return `"classes": "${classes}"`;
    }
  });
  
  if (!dryRun && changed > 0) {
    writeFileSync(filePath, result, "utf-8");
  }
  
  return { changed, untouched };
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  
  const files = readdirSync(SCHEMAS_DIR)
    .filter(f => f.endsWith(".json"))
    .sort();
  
  console.log(`\nSchema Migration${dryRun ? " (DRY RUN)" : ""}`);
  console.log(`Source: ${SCHEMAS_DIR}`);
  console.log("--".repeat(40));
  
  let totalChanged = 0;
  let totalUntouched = 0;
  
  for (const file of files) {
    const filePath = join(SCHEMAS_DIR, file);
    const { changed, untouched } = migrateFile(filePath, dryRun);
    const marker = changed > 0 ? "✓" : "·";
    console.log(`${marker} ${file}: ${changed} changed, ${untouched} unchanged`);
    totalChanged += changed;
    totalUntouched += untouched;
  }
  
  console.log("--".repeat(40));
  console.log(`Total: ${totalChanged} fields changed, ${totalUntouched} unchanged`);
  
  if (dryRun) {
    console.log("\nRun without --dry-run to apply changes.");
  } else {
    console.log("\nMigration complete. Review changes with `git diff schemas/`.");
  }
}

main();
