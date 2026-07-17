import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-form",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: "./form.component.html",
})
export class FormComponent {
  @Input() heading = "";
  @Input() showActions = true;
  @Input() submitText = "Submit";
  @Input() cancelText = "Cancel";
  @Output() submitted = new EventEmitter<Event>();
  @Output() cancelled = new EventEmitter<void>();

  handleSubmit(e: Event) {
    e.preventDefault();
    this.submitted.emit(e);
  }

  handleCancel() {
    this.cancelled.emit();
  }
}

registerSchemaComponent("app-form", FormComponent);
