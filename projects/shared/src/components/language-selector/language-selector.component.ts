import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { parseJsonOrDefault } from "../../utils/json";
import { IconComponent } from "../icons/icons.component";

export interface LanguageOption {
  value: string;
  label: string;
}

@Component({
  selector: "app-language-selector",
  standalone: true,
  imports: [IconComponent, ApplyThemeDirective],
  templateUrl: "./language-selector.component.html",
  styleUrls: ["./language-selector.component.css"],
})
export class LanguageSelectorComponent {
  @Input() label = "";
  @Input() labelId = "";
  @Input() value = "";
  @Input() languages: LanguageOption[] | string = [];
  @Input() placeholder = "";
  @Input() width = "";
  @Output() changed = new EventEmitter<string>();

  get parsedLanguages(): LanguageOption[] {
    return parseJsonOrDefault<LanguageOption>(this.languages).map(
      (lang: any) => ({
        value: lang.value ?? lang.code ?? "",
        label: lang.label ?? lang.name ?? lang.code ?? "",
      }),
    );
  }

  handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-language-selector", LanguageSelectorComponent);
