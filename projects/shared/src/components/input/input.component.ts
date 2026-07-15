import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [IconComponent],
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent {
  @Input() type = "text";
  @Input() placeholder = "";
  @Input() label = "";
  @Input() icon = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() error = "";
  @Output() input = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();
  focused = false;

  handleInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-input", InputComponent);
