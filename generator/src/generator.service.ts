import { renderAngularPages, renderAngularRoutes, renderAngularApp } from './angular-generator.js';
import { renderRustLib, renderRustCommands, renderTauriConfig } from './rust-generator.js';
import type { GeneratorOptions, UiSchema, PageContext, EntityContext } from './types.js';

export class GeneratorService {
  async generate(options: GeneratorOptions, schema: UiSchema): Promise<void> {
    const pages = this.buildPageContexts(schema.pages || []);
    const entities = this.buildEntityContexts(schema);

    const context = {
      appName: options.appName,
      kebabName: this.toKebab(options.appName),
      pascalName: this.toPascal(options.appName),
      snakeName: this.toSnake(options.appName),
      identifier: options.identifier,
      version: options.version,
      schema,
      pages,
      entities,
    };

    await Promise.all([
      renderAngularPages(context, options.outputPath, options.dryRun),
      renderAngularRoutes(context, options.outputPath, options.dryRun),
      renderAngularApp(context, options.outputPath, options.dryRun),
      renderRustLib(context, options.outputPath, options.dryRun),
      renderRustCommands(context, options.outputPath, options.dryRun),
      renderTauriConfig(context, options.outputPath, options.dryRun),
    ]);

    if (!options.dryRun) {
      console.log('Generation complete!');
    } else {
      console.log('Dry run complete - no files written.');
    }
  }

  private buildPageContexts(pages: UiSchema['pages']): PageContext[] {
    return pages.map((page) => ({
      id: page.id,
      name: page.name,
      route: page.route || page.id,
      kebabName: this.toKebab(page.name),
      pascalName: this.toPascal(page.name),
      elements: page.elements || [],
      gridColumns: 'repeat(12, 1fr)',
      gridRows: 'auto',
      gridGap: '1rem',
    }));
  }

  private buildEntityContexts(schema: UiSchema): EntityContext[] {
    const entities: EntityContext[] = [];
    const seenEntities = new Set<string>();

    for (const page of schema.pages || []) {
      for (const element of page.elements || []) {
        if (element.dataBinding?.entity && !seenEntities.has(element.dataBinding.entity)) {
          seenEntities.add(element.dataBinding.entity);
          entities.push({
            name: element.dataBinding.entity,
            kebabName: this.toKebab(element.dataBinding.entity),
            pascalName: this.toPascal(element.dataBinding.entity),
            snakeName: this.toSnake(element.dataBinding.entity),
            fields: [],
          });
        }
      }
    }

    return entities;
  }

  private toKebab(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private toPascal(name: string): string {
    return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^./, s => s.toUpperCase());
  }

  private toSnake(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
}

export const generatorService = new GeneratorService();
