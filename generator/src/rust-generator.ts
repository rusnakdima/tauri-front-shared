import nunjucks from "nunjucks";
import * as fs from "fs/promises";
import * as path from "path";
import type { TemplateContext } from "./types.js";

function createEnv(templateDir?: string): nunjucks.Environment {
  const dirs = templateDir
    ? [
        templateDir,
        path.join(templateDir, "rust"),
        path.join(templateDir, "tauri"),
        "./templates/rust",
        "./templates/rust/rust",
        "./templates/tauri",
        "./templates/tauri/tauri",
      ]
    : [
        "./templates/rust",
        "./templates/rust/rust",
        "./templates/tauri",
        "./templates/tauri/tauri",
      ];
  return nunjucks.configure(dirs, { autoescape: false });
}

async function writeFile(
  filePath: string,
  content: string,
  dryRun?: boolean,
): Promise<void> {
  if (dryRun) {
    console.log(`[DRY RUN] Would write: ${filePath}`);
    console.log(
      content.substring(0, 500) + (content.length > 500 ? "..." : ""),
    );
    return;
  }
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}

export async function renderRustLib(
  context: TemplateContext,
  outputPath: string,
  dryRun?: boolean,
): Promise<void> {
  const env = createEnv(context.schema["modules"] as any);
  const srcPath = path.join(outputPath, "src-tauri", "src");

  const libRs = env.render("rust/lib.rs.nj", context);

  await writeFile(path.join(srcPath, "lib.rs"), libRs, dryRun);

  if (!dryRun) {
    console.log("Rust lib.rs written to:", srcPath);
  }
}

export async function renderRustCommands(
  context: TemplateContext,
  outputPath: string,
  dryRun?: boolean,
): Promise<void> {
  const env = createEnv(context.schema["modules"] as any);
  const commandsPath = path.join(outputPath, "src-tauri", "src", "commands");

  if (context.entities.length > 0) {
    const entityRs = env.render("rust/commands/entity.rs.nj", context);
    const modRs = env.render("rust/commands/mod.rs.nj", context);

    await writeFile(path.join(commandsPath, "entity.rs"), entityRs, dryRun);
    await writeFile(path.join(commandsPath, "mod.rs"), modRs, dryRun);
  } else {
    await writeFile(
      path.join(commandsPath, "mod.rs"),
      "// No entities defined\n",
      dryRun,
    );
  }

  if (!dryRun) {
    console.log("Rust commands written to:", commandsPath);
  }
}

export async function renderTauriConfig(
  context: TemplateContext,
  outputPath: string,
  dryRun?: boolean,
): Promise<void> {
  const env = createEnv(context.schema["modules"] as any);
  const configPath = path.join(outputPath, "src-tauri");

  const tauriConf = env.render("tauri/tauri.conf.json.nj", {
    project_name: context.appName,
    version: context.version,
    identifier: context.identifier,
    app_title: context.appName,
    dev_command: "bun run start",
    dev_url: "http://localhost:1420",
    build_command: "bun run build",
    width: 1200,
    height: 800,
    min_width: 800,
    min_height: 600,
    resizable: true,
    fullscreen: false,
    center: true,
    devtools: true,
  });

  await writeFile(path.join(configPath, "tauri.conf.json"), tauriConf, dryRun);

  if (!dryRun) {
    console.log("Tauri config written to:", configPath);
  }
}
