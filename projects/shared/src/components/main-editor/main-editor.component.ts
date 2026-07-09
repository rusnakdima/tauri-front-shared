import { Component } from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-main-editor",
  standalone: true,
  template: `
    <div class="main-editor">
      <div class="placeholder">
        <div class="placeholder-icon">⊞</div>
        <div class="placeholder-text">Canvas Area</div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
      .main-editor {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-primary);
        color: var(--text-secondary);
        font-family: system-ui, sans-serif;
      }
      .placeholder {
        text-align: center;
        padding: 2rem;
      }
      .placeholder-icon {
        font-size: 3rem;
        margin-bottom: 0.5rem;
        opacity: 0.3;
      }
      .placeholder-text {
        font-size: 0.875rem;
      }
    `,
  ],
})
export class MainEditorComponent {}

registerSchemaComponent("app-main-editor", MainEditorComponent);
