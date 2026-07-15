import { Component, inject, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { StyleThemeService } from "../../styles/theme.service";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-theme-toggle",
  standalone: true,
  imports: [IconComponent],
  templateUrl: "./theme-toggle.component.html",
  styleUrls: ["./theme-toggle.component.css"],
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  private themeService = inject(StyleThemeService);
  private subscription?: Subscription;

  @Input() classes = "";
  isDark = false;
  hovered = false;

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
