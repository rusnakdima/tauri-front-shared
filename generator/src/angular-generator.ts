import nunjucks from 'nunjucks';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { TemplateContext, PageContext } from './types.js';

function createEnv(templateDir?: string): nunjucks.Environment {
  const dirs = templateDir
    ? [templateDir, path.join(templateDir, 'angular'), './templates/angular', './templates/angular/angular']
    : ['./templates/angular', './templates/angular/angular'];
  return nunjucks.configure(dirs, { autoescape: false });
}

async function writeFile(filePath: string, content: string, dryRun?: boolean): Promise<void> {
  if (dryRun) {
    console.log(`[DRY RUN] Would write: ${filePath}`);
    console.log(content.substring(0, 500) + (content.length > 500 ? '...' : ''));
    return;
  }
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function renderAngularPages(
  context: TemplateContext,
  outputPath: string,
  dryRun?: boolean
): Promise<void> {
  const env = createEnv(context.schema['modules'] as any);
  const srcPath = path.join(outputPath, 'src', 'app', 'pages');

  for (const page of context.pages) {
    const pagePath = path.join(srcPath, page.kebabName);
    await fs.mkdir(pagePath, { recursive: true });

    const pageContext = {
      ...context,
      page,
      canvas_elements_json: JSON.stringify(page.elements),
      layout_columns: page.gridColumns,
      layout_rows: page.gridRows,
      layout_gap: page.gridGap,
      layout_padding: '1rem',
    };

    const componentTs = env.render('angular/page.component.ts.nj', pageContext);
    const componentHtml = env.render('angular/page.component.html.nj', pageContext);
    const componentCss = env.render('angular/page.component.css.nj', pageContext);

    await writeFile(path.join(pagePath, `${page.kebabName}.component.ts`), componentTs, dryRun);
    await writeFile(path.join(pagePath, `${page.kebabName}.component.html`), componentHtml, dryRun);
    await writeFile(path.join(pagePath, `${page.kebabName}.component.css`), componentCss, dryRun);
  }

  if (!dryRun) {
    console.log('Angular page components written to:', srcPath);
  }
}

export async function renderAngularRoutes(
  context: TemplateContext,
  outputPath: string,
  dryRun?: boolean
): Promise<void> {
  const env = createEnv(context.schema['modules'] as any);
  const routesPath = path.join(outputPath, 'src', 'app');

  const defaultRoute = context.pages.length > 0 ? context.pages[0].route : '';

  const routesContent = env.render('angular/routes.ts.nj', {
    ...context,
    default_route: defaultRoute,
  });

  await writeFile(path.join(routesPath, 'app.routes.ts'), routesContent, dryRun);

  if (!dryRun) {
    console.log('Angular routes written to:', routesPath);
  }
}

export async function renderAngularApp(
  context: TemplateContext,
  outputPath: string,
  dryRun?: boolean
): Promise<void> {
  const env = createEnv(context.schema['modules'] as any);
  const srcPath = path.join(outputPath, 'src', 'app');

  const appComponent = env.render('angular/app.component.ts.nj', context);
  const appConfig = env.render('angular/app.config.ts.nj', context);

  await writeFile(path.join(srcPath, 'app.component.ts'), appComponent, dryRun);
  await writeFile(path.join(srcPath, 'app.config.ts'), appConfig, dryRun);

  if (!dryRun) {
    console.log('Angular app files written to:', srcPath);
  }
}
