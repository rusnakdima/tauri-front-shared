import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export type DialogSize = "sm" | "md" | "lg";

@Component({
  selector: "app-dialog",
  standalone: true,
  template: `
    @if (open) {
      <div class="overlay" (click)="handleOverlayClick($event)">
        <div [class]="'dialog dialog-' + size">
          <header>
            <h2>{{ title }}</h2>
            <button class="close-btn" (click)="close()" aria-label="Close">
              &times;
            </button>
          </header>
          <div class="content">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .dialog {
        background: var(--bg-elevated);
        border: 1px solid var(--border-color);
        border-radius: 1rem;
        min-width: 360px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
      }
      .dialog-sm {
        width: 360px;
      }
      .dialog-md {
        width: 520px;
      }
      .dialog-lg {
        width: 720px;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        border-bottom: 2px solid var(--border-color);
        background: var(--bg-elevated);
        border-radius: 1rem 1rem 0 0;
      }
      header h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-primary);
      }
      .close-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 0.375rem;
        color: var(--text-secondary);
        font-size: 1.5rem;
        line-height: 1;
        font-weight: 300;
      }
      .close-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .content {
        padding: 1.5rem;
        overflow-y: auto;
        color: var(--text-primary);
      }
    `,
  ],
})
export class DialogComponent {
  @Input() open = false;
  @Input() title = "";
  @Input() size: DialogSize = "md";
  @Input() showHeader = true;
  @Input() showFooter = false;
  @Output() closed = new EventEmitter<void>();

  handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains("overlay")) {
      this.close();
    }
  }

  close() {
    this.open = false;
    this.closed.emit();
  }

  @HostListener("window:keydown.escape")
  onEscape() {
    if (this.open) this.close();
  }
}

registerSchemaComponent("app-dialog", DialogComponent);
