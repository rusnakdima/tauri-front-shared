import { Component, inject, Input } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { I18nService } from "../../core/lib/i18n/i18n.service";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-locale-switcher",
  standalone: true,
  imports: [IconComponent],
  templateUrl: "./locale-switcher.component.html",
})
export class LocaleSwitcherComponent {
  private i18n = inject(I18nService);

  @Input() size: "sm" | "md" | "lg" = "sm";
  @Input() variant: "ghost" | "solid" | "outline" = "ghost";
  @Input() classes = "";

  get currentLocale(): string {
    return this.i18n.locale();
  }

  get availableLocales() {
    return this.i18n.getAvailableLocales();
  }

  setLocale(locale: string) {
    this.i18n.setLocale(locale as any);
  }
}

registerSchemaComponent("app-locale-switcher", LocaleSwitcherComponent);
