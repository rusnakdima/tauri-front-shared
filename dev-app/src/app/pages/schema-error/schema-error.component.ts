import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Displayed when the declarative schemas.json fails to load or parse.
 * Plain HTML + library ui-system classes (loaded globally by angular.json).
 * No Tailwind, no component class lookups needed.
 */
@Component({
  selector: "app-schema-error",
  standalone: true,
  template: `
    <div class="ui-flex ui-flex-col ui-gap-4 schema-error-shell">
      <div
        class="ui-m3-surface-container-high ui-rounded-xl ui-p-6 schema-error-card"
      >
        <h2 class="ui-text-2xl ui-font-bold schema-error-title">
          Schema load failed
        </h2>
        <p class="ui-text-base schema-error-subtitle">
          The declarative layout could not be loaded.
        </p>
        <div class="ui-bg-warning-10 ui-rounded-md ui-p-4 schema-error-alert">
          <strong class="ui-text-warning">Cannot boot playground</strong>
          <p class="ui-text-base-content">{{ errorMessage }}</p>
        </div>
        <p class="ui-text-sm schema-error-path">
          Path: <code>{{ path }}</code>
        </p>
        <div class="ui-flex ui-justify-end schema-error-actions">
          <button
            type="button"
            class="ui-bg-primary ui-text-on-primary ui-rounded-md ui-px-4 ui-py-2 schema-error-btn"
            (click)="reload()"
          >
            Reload
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
      .schema-error-shell {
        max-width: 640px;
        margin: 4rem auto;
        padding: 0 1.5rem;
      }
      .schema-error-title {
        margin: 0 0 0.5rem;
      }
      .schema-error-subtitle {
        margin: 0 0 1rem;
        opacity: 0.75;
      }
      .schema-error-alert {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .schema-error-path {
        margin: 1rem 0 0;
        opacity: 0.7;
      }
      .schema-error-actions {
        margin-top: 1.5rem;
      }
      .schema-error-btn {
        border: none;
        cursor: pointer;
      }
      code {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        background: var(--ui-surface-container-high, rgba(0, 0, 0, 0.06));
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
      }
    `,
  ],
})
export class SchemaErrorComponent {
  @Input() errorMessage = "Unknown error.";
  @Input() path = "/assets/schemas.json";

  reload() {
    window.location.reload();
  }
}
