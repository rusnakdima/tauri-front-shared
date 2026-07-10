import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-translation-output",
  standalone: true,
  imports: [IconComponent, ApplyThemeDirective],
  templateUrl: "./translation-output.component.html",
  styleUrls: ["./translation-output.component.css"],
})
export class TranslationOutputComponent {
  @Input() value = "";
  @Input() placeholder = "";
  @Input() loading = false;
  @Input() showConfidence = false;
  @Input() showCopyButton = true;
  @Input() confidence = 0;
  @Input() height = "";
  @Input() width = "";
  @Output() copied = new EventEmitter<void>();
  isCopied = false;
  hovered = false;

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.value);
      this.isCopied = true;
      this.copied.emit();
      setTimeout(() => (this.isCopied = false), 2000);
    } catch {
      /* clipboard not available */
    }
  }
}

registerSchemaComponent("app-translation-output", TranslationOutputComponent);
