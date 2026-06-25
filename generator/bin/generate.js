#!/usr/bin/env node
import { GeneratorService } from '../dist/generator.service.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as chokidar from 'chokidar';

const args = process.argv.slice(2);
const options = {
  dryRun: false,
  watch: false,
  templateDir: undefined,
};

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--schema' || args[i] === '-s') {
    options.schema = args[++i];
  } else if (args[i] === '--output' || args[i] === '-o') {
    options.output = args[++i];
  } else if (args[i] === '--app-name' || args[i] === '-n') {
    options.appName = args[++i];
  } else if (args[i] === '--identifier' || args[i] === '-i') {
    options.identifier = args[++i];
  } else if (args[i] === '--version' || args[i] === '-v') {
    options.version = args[++i];
  } else if (args[i] === '--template' || args[i] === '-t') {
    options.templateDir = args[++i];
  } else if (args[i] === '--watch' || args[i] === '-w') {
    options.watch = true;
  } else if (args[i] === '--dry-run' || args[i] === '-d') {
    options.dryRun = true;
  } else if (args[i] === '--help' || args[i] === '-h') {
    printHelp();
    process.exit(0);
  }
}

if (!options.schema || !options.output || !options.appName) {
  console.error('Error: --schema, --output, and --app-name are required');
  printHelp();
  process.exit(1);
}

async function loadSchema(schemaPath) {
  try {
    const resolvedPath = path.resolve(schemaPath);
    const content = await fs.readFile(resolvedPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Error reading schema file: ${error}`);
  }
}

async function generate(schemaContent, generator) {
  try {
    await generator.generate({
      appName: options.appName,
      identifier: options.identifier || `com.example.${options.appName.toLowerCase()}`,
      version: options.version || '0.1.0',
      outputPath: path.resolve(options.output),
      templateDir: options.templateDir,
      dryRun: options.dryRun,
      watch: options.watch,
    }, schemaContent);
  } catch (error) {
    console.error(`Error generating: ${error}`);
    throw error;
  }
}

async function main() {
  let schemaContent;
  try {
    schemaContent = await loadSchema(options.schema);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  const generator = new GeneratorService();

  if (options.watch) {
    console.log(`Watching schema file for changes: ${options.schema}`);
    const watcher = chokidar.watch(options.schema, {
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on('change', async (path) => {
      console.log(`Schema changed: ${path}`);
      try {
        schemaContent = await loadSchema(options.schema);
        await generate(schemaContent, generator);
      } catch (error) {
        console.error(`Error regenerating: ${error}`);
      }
    });

    await generate(schemaContent, generator);
  } else {
    await generate(schemaContent, generator);
  }
}

function printHelp() {
  console.log(`
@tauri-front/generator - Generate Tauri + Angular app from schema

Usage:
  generate [options]

Options:
  -s, --schema <path>       Path to schema JSON file (required)
  -o, --output <path>        Output directory (required)
  -n, --app-name <name>      App name (required)
  -i, --identifier <id>      App identifier (default: com.example.<app-name>)
  -v, --version <ver>        App version (default: 0.1.0)
  -t, --template <dir>       Custom template directory (optional)
  -w, --watch                Watch schema file and regenerate on changes
  -d, --dry-run              Preview output without writing files
  -h, --help                 Show this help message

Example:
  npx @tauri-front/generator --schema ./schema.json --output ./my-app --app-name MyApp

Watch mode:
  npx @tauri-front/generator --schema ./schema.json --output ./my-app --app-name MyApp --watch

Dry run:
  npx @tauri-front/generator --schema ./schema.json --output ./my-app --app-name MyApp --dry-run
`);
}

main();
