import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { parseJsonOrDefault } from "../../utils/json";
import { IconComponent } from "../icons/icons.component";

export interface LanguageOption {
  value: string;
  label: string;
}

@Component({
  selector: "app-language-selector",
  standalone: true,
  imports: [IconComponent],
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
  @Input() classes = "";
  @Input() sourceLang = ""; // for source selector
  @Input() targetLang = ""; // for target selector
  @Output() changed = new EventEmitter<string>();

  get parsedLanguages(): LanguageOption[] {
    const arr = parseJsonOrDefault<LanguageOption>(this.languages);
    // Handle string arrays (e.g., ["en", "es", "fr"])
    if (arr.length > 0 && typeof arr[0] === "string") {
      return (arr as unknown as string[]).map((code) => ({
        value: code,
        label: code.toUpperCase(),
      }));
    }
    return arr.map((lang: any) => ({
      value: lang.value ?? lang.code ?? "",
      label: lang.label ?? lang.name ?? lang.code ?? "",
    }));
  }

  handleChange(e: Event) {
    this.value = (e.target as HTMLSelectElement).value;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-language-selector", LanguageSelectorComponent);
