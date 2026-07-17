import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export interface StepperStep {
  label: string;
  icon?: string;
}

@Component({
  selector: "app-stepper",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ol class="flex items-center w-full">
      @for (step of steps; track step.label; let i = $index) {
        <li
          class="flex w-full items-center"
          [class.text-indigo-600]="i < current"
          [class.text-neutral-400]="i >= current"
        >
          <span
            class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 text-xs font-bold"
            [class.bg-indigo-100]="i < current"
            [class.bg-neutral-100]="i >= current"
          >
            @if (i < current) {
              <span class="material-symbols-rounded text-sm">done</span>
            } @else {
              {{ i + 1 }}
            }
          </span>
          @if (i < steps.length - 1) {
            <span
              class="w-full h-0.5 bg-neutral-200 dark:bg-neutral-700 mx-2"
            ></span>
          }
        </li>
      }
    </ol>
  `,
})
export class StepperComponent {
  @Input() steps: StepperStep[] = [];
  @Input() current = 0;
  @Input() clickable = false;

  @Output() stepChange = new EventEmitter<number>();

  getStepClass(i: number): string {
    if (i < this.current) return "app-stepper__item--completed";
    if (i === this.current) return "app-stepper__item--active";
    return "";
  }

  getConnectorClass(i: number): string {
    return i < this.current ? "app-stepper__connector--completed" : "";
  }

  onStepClick(i: number) {
    if (!this.clickable) return;
    this.stepChange.emit(i);
  }
}

registerSchemaComponent("app-stepper", StepperComponent);
