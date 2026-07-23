import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-translation-output",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./translation-output.component.html",
})
export class TranslationOutputComponent {
  @Input() value = "";
  @Input() placeholder = "Translation will appear here...";
  @Input() loading = false;
  @Input() label = "";
  @Input() confidence: number | null = null;
  @Input() showConfidence = false;
  @Input() classes = "";
  @Input() showCopy = false;
  @Input() readonly = true;
  @Output() copied = new EventEmitter<string>();

  handleCopy() {
    this.copied.emit(this.value);
  }
}

registerSchemaComponent("app-translation-output", TranslationOutputComponent);
