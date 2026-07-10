import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { ApplyThemeDirective } from "../../styles/theme-integration/apply-theme.directive";

@Component({
  selector: "app-slider",
  standalone: true,
  imports: [ApplyThemeDirective],
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.css"],
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
