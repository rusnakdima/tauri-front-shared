import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-slider",
  standalone: true,
  imports: [],
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class SliderComponent {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 0;
  @Input() step = 1;
  @Input() disabled = false;
  @Output() input = new EventEmitter<number>();

  handleInput(e: Event) {
    this.value = Number((e.target as HTMLInputElement).value);
    this.input.emit(this.value);
  }
}

registerSchemaComponent("app-slider", SliderComponent);
