import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

export type ModalSize = "sm" | "md" | "lg";

@Component({
  selector: "app-modal",
  standalone: true,
  template: `
    @if (open) {
      <div class="overlay" (click)="handleOverlayClick($event)">
        <div [class]="'modal modal-' + size">
          <header>
            <h3>{{ title }}</h3>
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
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }
      .modal {
        background: var(--bg-elevated);
        border: 1px solid var(--border-color);
        border-radius: 0.75rem;
        min-width: 320px;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }
      .modal-sm {
        width: 320px;
      }
      .modal-md {
        width: 480px;
      }
      .modal-lg {
        width: 640px;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.25rem;
        border-bottom: 1px solid var(--border-color);
      }
      header h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
      }
      .close-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        color: var(--text-secondary);
        font-size: 1.25rem;
        line-height: 1;
      }
      .close-btn:hover {
        background: var(--bg-hover);
        color: var(--text-primary);
      }
      .content {
        padding: 1.25rem;
        overflow-y: auto;
        color: var(--text-primary);
      }
    `,
  ],
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = "";
  @Input() size: ModalSize = "md";
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

registerSchemaComponent("app-modal", ModalComponent);
