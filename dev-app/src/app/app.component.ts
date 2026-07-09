import { Component, OnInit, signal, ViewChild, ElementRef } from "@angular/core";
import { ShowcaseComponent } from "./showcase/showcase.component";
import { AlgorithmsDemoComponent } from "./algorithms-demo/algorithms-demo.component";
import { loadStyleVariant, setCurrentStyle, getAllStyleVariants, StyleThemeService, type StyleVariant } from "@tauri-front/shared";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ShowcaseComponent, AlgorithmsDemoComponent],
  template: `
    <div class="shell">
      <header class="header">
        <span class="header-title">&#64;tauri-front/shared Showcase</span>
        <div class="header-group">
          <span class="group-label">Theme</span>
          <div class="btn-group">
            <button
              class="theme-btn"
              [class.active]="currentMode() === 'light'"
              (click)="setColorMode('light')"
            >Light</button>
            <button
              class="theme-btn"
              [class.active]="currentMode() === 'dark'"
              (click)="setColorMode('dark')"
            >Dark</button>
            <button
              class="theme-btn"
              [class.active]="currentMode() === 'system'"
              (click)="setColorMode('system')"
            >System</button>
          </div>
          <span class="divider"></span>
          <span class="group-label">View</span>
          <div class="btn-group">
            <button
              class="theme-btn"
              [class.active]="currentView() === 'showcase'"
              (click)="setView('showcase')"
            >Components</button>
            <button
              class="theme-btn"
              [class.active]="currentView() === 'algorithms'"
              (click)="setView('algorithms')"
            >Algorithms</button>
          </div>
          <span class="divider"></span>
          <span class="group-label">Style</span>
          <div class="btn-group">
            @for (variant of styleVariants; track variant.id) {
              <button
                class="style-btn"
                [class.active]="currentVariant() === variant.id"
                (click)="setStyleVariant(variant.id)"
              >{{ variant.name }}</button>
            }
          </div>
        </div>
      </header>
      <main class="main">
        @if (currentView() === 'showcase') {
          <app-showcase (componentSelected)="openModal($event)"></app-showcase>
        } @else {
          <app-algorithms-demo></app-algorithms-demo>
        }
      </main>
    </div>

    @if (selectedComponent()) {
      <div class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <span class="modal-title">{{ selectedComponent() }}</span>
            <button class="modal-close" (click)="closeModal()">×</button>
          </div>
          <div class="modal-body" #modalBody></div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .shell { display: flex; flex-direction: column; width: 100%; min-height: 100vh; background: var(--bg-primary, #f8f9fa); color: var(--text-primary, #1a1a1a); }
    .header {
      position: sticky; top: 0; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0.625rem 1.5rem;
      background: var(--bg-elevated, #ffffff);
      border-bottom: 1px solid var(--border-color, #e5e7eb);
      min-height: 52px; flex-shrink: 0; gap: 1rem;
      flex-wrap: wrap;
    }
    .header-title { font-size: 0.9375rem; font-weight: 700; color: var(--text-primary, #1a1a1a); letter-spacing: -0.01em; }
    .header-group { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
    .group-label { font-size: 0.6875rem; font-weight: 600; color: var(--text-muted, #9ca3af); text-transform: uppercase; letter-spacing: 0.05em; margin-right: 0.25rem; }
    .divider { width: 1px; height: 20px; background: var(--border-color, #e5e7eb); margin: 0 0.25rem; }
    .btn-group { display: flex; align-items: center; gap: 0.125rem; }
    .theme-btn, .style-btn {
      padding: 0.3125rem 0.625rem; border-radius: 0.3125rem;
      border: 1px solid var(--border-color, #e5e7eb);
      background: transparent;
      color: var(--text-secondary, #6b7280);
      font-size: 0.75rem; font-weight: 500; cursor: pointer; transition: all 0.15s;
    }
    .theme-btn:hover, .style-btn:hover { background: var(--bg-hover, #f3f4f6); color: var(--text-primary, #1a1a1a); }
    .theme-btn.active { background: #7c3aed; border-color: #7c3aed; color: #ffffff; }
    .style-btn.active { background: var(--accent, #3b82f6); border-color: var(--accent, #3b82f6); color: #ffffff; }
    .main { flex: 1; overflow: visible; }
    /* Modal overlay */
    .modal-overlay {
      position: fixed; inset: 0; z-index: 100;
      background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
      backdrop-filter: blur(4px);
    }
    .modal-content {
      background: var(--bg-elevated, #ffffff);
      border-radius: 1rem;
      padding: 2rem;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow: auto;
      position: relative;
      box-shadow: 0 25px 50px rgba(0,0,0,0.25);
    }
    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 1.5rem;
    }
    .modal-title { font-size: 1.125rem; font-weight: 700; color: var(--text-primary); }
    .modal-close {
      width: 2rem; height: 2rem; border-radius: 50%;
      border: 1px solid var(--border-color, #e5e7eb);
      background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.25rem; color: var(--text-secondary);
    }
    .modal-close:hover { background: var(--bg-hover, #f3f4f6); }
    .modal-body { display: flex; align-items: center; justify-content: center; min-height: 120px; }
  `],
})
export class AppComponent implements OnInit {
  readonly currentMode = signal<string>("light");
  readonly currentVariant = signal<StyleVariant>("material-design-v3");
  readonly currentView = signal<"showcase" | "algorithms">("showcase");
  readonly styleVariants = getAllStyleVariants();
  readonly selectedComponent = signal<string | null>(null);

  @ViewChild("modalBody") modalBodyRef!: ElementRef<HTMLElement>;

  private themeService: StyleThemeService;

  constructor() {
    this.themeService = new StyleThemeService();
  }

  async ngOnInit() {
    await loadStyleVariant("material-design-v3");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.themeService.setDarkMode(prefersDark);
    this.currentMode.set(prefersDark ? "dark" : "light");
    this.currentVariant.set("material-design-v3" as StyleVariant);
  }

  openModal(selector: string) {
    this.selectedComponent.set(selector);
    // Render after the @if block is rendered (next macrotask)
    setTimeout(() => this.renderModalComponent(selector), 0);
  }

  closeModal() {
    this.selectedComponent.set(null);
  }

  private async renderModalComponent(selector: string) {
    const container = this.modalBodyRef?.nativeElement;
    if (!container) return;
    container.innerHTML = "";
    try {
      await customElements.whenDefined(selector);
      const el = document.createElement(selector) as HTMLElement;
      this.setModalProps(el, selector);
      container.appendChild(el);
      // Set textContent AFTER append for slot-based components (button, chip, etc.)
      this.setModalContent(el, selector);
    } catch { /* ignore */ }
  }

  private setModalProps(el: HTMLElement, selector: string) {
    switch (selector) {
      case "app-avatar": (el as any).alt = "User Avatar"; (el as any).size = "lg"; break;
      case "app-badge": (el as any).variant = "primary"; (el as any).text = "Badge"; break;
      case "app-button": (el as any).variant = "filled"; break;
      case "app-card": (el as any).title = "Card Title"; (el as any).description = "Card description text"; break;
      case "app-checkbox": (el as any).label = "Checkbox label"; break;
      case "app-chip": (el as any).text = "Chip Text"; break;
      case "app-input": (el as any).placeholder = "Enter text..."; (el as any).value = "Sample text"; break;
      case "app-textarea": (el as any).placeholder = "Enter text..."; (el as any).value = "Sample textarea content"; break;
      case "app-select": (el as any).placeholder = "Select an option"; break;
      case "app-slider": (el as any).value = 50; break;
      case "app-switch": (el as any).checked = false; break;
      case "app-radio": (el as any).label = "Radio option"; break;
      case "app-tabs": (el as any).tabs = JSON.stringify([{"label":"Tab 1"},{"label":"Tab 2"},{"label":"Tab 3"}]); break;
      case "app-progress-bar": (el as any).value = 60; break;
      case "app-pagination": (el as any).page = 1; (el as any).total = 10; break;
      case "app-dialog": case "app-modal": case "app-confirm-dialog": (el as any).open = true; break;
      case "app-toast": (el as any).type = "info"; (el as any).message = "Toast notification"; break;
      case "app-json-view": (el as any).data = JSON.stringify({"name":"John","age":30,"active":true}); break;
      case "app-stats-card": (el as any).title = "Total Users"; (el as any).value = "1,234"; break;
      case "app-empty-state": (el as any).title = "No Data"; (el as any).description = "Nothing to show here yet."; break;
      case "app-segment-selector": (el as any).options = JSON.stringify(["Option 1","Option 2","Option 3"]); break;
      case "app-data-table": (el as any).columns = JSON.stringify(["Name","Status","Age"]); (el as any).data = JSON.stringify([["John","Active",25],["Jane","Inactive",30]]); break;
      case "app-loading": case "app-spinner": (el as any).size = "lg"; break;
      case "app-tooltip": (el as any).text = "Tooltip content"; break;
      case "app-snackbar": (el as any).message = "Snackbar message"; (el as any).open = true; (el as any).duration = 6000; break;
      case "app-divider": (el as any).orientation = "horizontal"; break;
      case "app-tree": (el as any).nodes = JSON.stringify([{"id":"root","label":"Root","children":[{"id":"a","label":"Child A"},{"id":"b","label":"Child B"}]}]); break;
      case "app-form": (el as any).heading = "Form"; break;
    }
  }

  /** Set light-DOM textContent for slot-based components (after appendChild) */
  private setModalContent(el: HTMLElement, selector: string) {
    switch (selector) {
      case "app-button": el.textContent = "Click Me"; break;
      case "app-chip": el.textContent = "Chip Text"; break;
      case "app-tree": {
        // Tree doesn't need textContent
        break;
      }
    }
  }

  setColorMode(mode: string) {
    if (mode === "dark") {
      this.themeService.setDarkMode(true);
    } else if (mode === "light") {
      this.themeService.setDarkMode(false);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      this.themeService.setDarkMode(prefersDark);
    }
    this.currentMode.set(mode);
  }

  async setStyleVariant(variant: StyleVariant) {
    await loadStyleVariant(variant);
    setCurrentStyle(variant);
    this.currentVariant.set(variant);
  }

  setView(view: "showcase" | "algorithms") {
    this.currentView.set(view);
  }

}
