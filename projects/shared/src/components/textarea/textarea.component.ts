import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-textarea",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./textarea.component.html",
})
export class TextareaComponent {
  @Input() label = "";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() rows = 4;
  @Input() error = "";
  @Input() flexGrow = false;
  @Input() classes = "";
  @Output() input = new EventEmitter<string>();

  focused = signal(false);

  handleInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-textarea", TextareaComponent);
