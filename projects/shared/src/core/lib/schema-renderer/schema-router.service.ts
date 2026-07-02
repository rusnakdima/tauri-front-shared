import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SchemaRouterService {
  private _currentRoute = signal<string>('/dashboard');
  private _schema = signal<{ pages: { id: string; route?: string }[] } | null>(null);

  currentRoute = this._currentRoute.asReadonly();

  currentPageId = computed(() => {
    const schema = this._schema();
    const route = this._currentRoute();
    if (!schema) return null;
    return schema.pages.find(p => p.route === route)?.id || null;
  });

  setSchema(schema: { pages: { id: string; route?: string }[] }): void {
    this._schema.set(schema);
  }

  navigate(route: string): void {
    this._currentRoute.set(route);
  }

  navigateToPage(pageId: string): void {
    const schema = this._schema();
    if (!schema) return;
    const page = schema.pages.find(p => p.id === pageId);
    if (page?.route) {
      this._currentRoute.set(page.route);
    }
  }
}
