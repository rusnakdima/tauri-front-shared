import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-switch",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label class="inline-flex items-center gap-3 cursor-pointer" [class.opacity-50]="disabled" [class.cursor-not-allowed]="disabled">
      <button
        type="button"
        role="switch"
        [attr.aria-checked]="checked"
        [disabled]="disabled"
        (click)="toggle()"
        [class]="getSwitchClasses()"
      >
        <span
          class="inline-block w-5 h-5 rounded-full bg-on-primary shadow-1 transition-transform duration-200"
          [class.translate-x-5]="checked"
          [class.translate-x-0]="!checked"
        ></span>
      </button>
      @if (label) {
        <span class="text-on-surface">{{ label }}</span>
      }
    </label>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `],
})
export class SwitchComponent {
  @Input() checked = false;
  @Input() label = "";
  @Input() disabled = false;
  @Output() changed = new EventEmitter<boolean>();

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.changed.emit(this.checked);
    }
  }

  getSwitchClasses(): string {
    const base = 'w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
    const bg = this.checked ? 'bg-primary' : 'bg-outline';
    return `${base} ${bg}`;
  }
}

registerSchemaComponent("app-switch", SwitchComponent);
