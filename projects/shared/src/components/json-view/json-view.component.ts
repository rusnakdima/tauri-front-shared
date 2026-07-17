import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
@Component({
  selector: "app-json-view",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./json-view.component.html",
})
export class JsonViewComponent {
  @Input() data: unknown = {};
  private sanitizer = inject<DomSanitizer>(DomSanitizer);

  get safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.formattedHtml);
  }

  private get formattedHtml(): string {
    const formatted = JSON.stringify(this.data, null, 2);
    return this.syntaxHighlight(formatted);
  }

  private syntaxHighlight(json: string): string {
    return json
      .replace(/("(?:[^"\\]|\\.)*")\s*:/g, '<span class="json-key">$1</span>:')
      .replace(/"((?:[^"\\]|\\.)*)"/g, '<span class="json-string">"$1"</span>')
      .replace(
        /\b(-?\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g,
        '<span class="json-number">$1</span>',
      )
      .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
      .replace(/\bnull\b/g, '<span class="json-null">null</span>');
  }
}

registerSchemaComponent("app-json-view", JsonViewComponent);
