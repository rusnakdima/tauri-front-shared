import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { ErrorPageComponent } from "../../shared/error-page.component";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [ErrorPageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-error-page
      code="404"
      title="Page not found"
      message="The page you requested does not exist."
      buttonLabel="Back home"
      (buttonAction)="goHome()"
    />
  `,
})
export class NotFoundComponent {
  private router = inject(Router);

  goHome() {
    this.router.navigate(["/"]);
  }
}
