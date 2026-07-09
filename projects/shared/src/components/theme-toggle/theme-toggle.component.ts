import { Component, inject, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { StyleThemeService } from "../../styles/theme.service";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-theme-toggle",
  standalone: true,
  template: `
    <button class="theme-toggle" (click)="toggle()" aria-label="Toggle theme">
      @if (isDark) {
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      } @else {
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
      .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid var(--border-color);
        background: transparent;
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.15s;
        padding: 0;
      }
      .theme-toggle:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
    `,
  ],
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  private themeService = inject(StyleThemeService);
  private subscription?: Subscription;

  isDark = false;

  ngOnInit() {
    this.isDark = this.themeService.isDarkMode();
    this.subscription = this.themeService.themeChanged$.subscribe((state) => {
      this.isDark = state.isDark;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggle() {
    this.themeService.toggleDarkMode();
  }
}

registerSchemaComponent("app-theme-toggle", ThemeToggleComponent);
