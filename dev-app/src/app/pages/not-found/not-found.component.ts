import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-not-found",
  standalone: true,
  template: `
    <div class="ui-flex ui-flex-col ui-gap-4 not-found-shell">
      <div
        class="ui-m3-surface-container-high ui-rounded-xl ui-p-6 not-found-card"
      >
        <h2 class="ui-text-3xl ui-font-bold not-found-title">404</h2>
        <p class="ui-text-base not-found-subtitle">
          The page you requested does not exist.
        </p>
        <div class="ui-flex ui-justify-end not-found-actions">
          <button
            type="button"
            class="ui-bg-primary ui-text-on-primary ui-rounded-md ui-px-4 ui-py-2 not-found-btn"
            (click)="goHome()"
          >
            Back home
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .not-found-shell {
        max-width: 480px;
        margin: 4rem auto;
        padding: 0 1.5rem;
      }
      .not-found-title {
        margin: 0 0 0.5rem;
      }
      .not-found-subtitle {
        margin: 0;
        opacity: 0.75;
      }
      .not-found-actions {
        margin-top: 1.5rem;
      }
      .not-found-btn {
        border: none;
        cursor: pointer;
      }
    `,
  ],
})
export class NotFoundComponent {
  private router = inject(Router);

  goHome() {
    this.router.navigate(["/"]);
  }
}
