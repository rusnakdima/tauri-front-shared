import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-textarea",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.css"],
})
export class TextareaComponent {
  @Input() label = "";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() flexGrow = false;
  @Output() input = new EventEmitter<string>();

  handleInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-textarea", TextareaComponent);
