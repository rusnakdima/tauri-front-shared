import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-radio",
  standalone: true,
  imports: [],
  templateUrl: "./radio.component.html",
  styleUrls: ["./radio.component.css"],
})
export class RadioComponent {
  @Input() name = "";
  @Input() value = "";
  @Input() checked = false;
  @Input() disabled = false;
  @Output() changed = new EventEmitter<string>();
  @Input() label = "";

  handleChange(_e: Event) {
    this.checked = true;
    this.changed.emit(this.value);
  }
}

registerSchemaComponent("app-radio", RadioComponent);
