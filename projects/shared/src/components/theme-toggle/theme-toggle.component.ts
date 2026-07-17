import {
  Component,
  inject,
  Input,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StyleThemeService } from "../../styles/theme.service";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-theme-toggle",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="p-2.5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
      title="Toggle Theme"
    >
      <span class="material-symbols-rounded">{{
        isDark ? "light_mode" : "dark_mode"
      }}</span>
    </button>
  `,
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  private themeService = inject(StyleThemeService);
  private subscription?: Subscription;

  @Input() classes = "";
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

  getButtonClasses(): string {
    const base =
      "w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200";
    const hover = "hover:bg-[--state-hover] active:bg-[--state-pressed]";
    return `${base} ${hover} ${this.classes}`.trim();
  }
}

registerSchemaComponent("app-theme-toggle", ThemeToggleComponent);
