import { Component, Input, Output, EventEmitter } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-slider",
  standalone: true,
  template: `
    <div class="slider-wrapper">
      <input
        type="range"
        [value]="value"
        [min]="min"
        [max]="max"
        [step]="step"
        [disabled]="disabled"
        (input)="handleInput($event)"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .slider-wrapper {
        width: 100%;
      }
      input[type="range"] {
        width: 100%;
        accent-color: var(--accent);
        cursor: pointer;
      }
      input[type="range"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ],
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
