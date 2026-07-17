import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { ErrorPageComponent } from "../../shared/error-page.component";

@Component({
  selector: "app-schema-error",
  standalone: true,
  imports: [ErrorPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-error-page
      code="Schema Error"
      title="Schema load failed"
      [message]="errorMessage"
      buttonLabel="Reload"
      (buttonAction)="reload()"
    />
  `,
})
export class SchemaErrorComponent {
  @Input() errorMessage = "The declarative layout could not be loaded.";
  @Input() path = "/assets/schemas.json";

  reload() {
    window.location.reload();
  }
}
