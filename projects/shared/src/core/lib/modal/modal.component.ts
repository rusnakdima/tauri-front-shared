import {
  Component,
  Input,
  input,
  output,
  signal,
  ElementRef,
  OnInit,
  OnDestroy,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
} from "@angular/core";
import { CommonModule } from "@angular/common";
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
export type ModalContentPosition = "center" | "top";
@Component({
  selector: "app-modal",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <div
        class="modal-backdrop fixed inset-0 z-50 flex justify-center backdrop-blur-sm transition-opacity duration-200"
        style="background: var(--bg-backdrop)"
        [class.opacity-0]="isAnimating()"
        [class.opacity-100]="!isAnimating()"
        [class]="contentPositionClasses"
        (click)="onBackdropClick($event)"
      >
        <div
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="'modal-title-' + title"
          class="relative w-full rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-200"
          style="border-color: var(--border-visible); background: var(--bg-modal)"
          [class.scale-95]="isAnimating()"
          [class.scale-100]="!isAnimating()"
          [class]="sizeClasses"
        >
          @if (showHeader) {
            <div
              class="flex items-center justify-between border-b"
              style="border-color: var(--border-subtle)"
            >
              <h2 [id]="'modal-title-' + title" style="color: var(--text-main)">
                {{ title }}
              </h2>
              @if (showCloseButton) {
                <button
                  type="button"
                  (click)="onClose()"
                  class="transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white"
                  aria-label="Close modal"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              }
            </div>
          }
          <div style="max-height: calc(100vh - 12rem)" class="overflow-y-auto">
            <ng-content></ng-content>
          </div>
          @if (showFooter) {
            <div
              class="flex items-center justify-end gap-3 border-t"
              style="border-color: var(--border-subtle)"
            >
              <ng-content select="[modal-footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `,
})
export class ModalComponent implements OnInit, OnDestroy, OnChanges {
  // Legacy @Input — required so SchemaRendererService can do `modalElement['open'] = true`
  // (signal-based inputs are not reactive to direct DOM property assignment).
  @Input() open = false;
  @Input() title = "";
  @Input() size: ModalSize = "md";
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  @Input() showCloseButton = true;
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() contentPosition: ModalContentPosition = "center";
  closed = output<void>();
  opened = output<void>();
  isVisible = signal(false);
  isAnimating = signal(false);
  private previousActiveElement: HTMLElement | null = null;
  private openedTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private closedTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private escapeKeyHandler = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.closeOnEscape && this.open) {
      this.onClose();
    }
  };
  ngOnInit(): void {
    if (this.open) {
      this.openModal();
    }
  }
  ngOnDestroy(): void {
    if (this.openedTimeoutId) clearTimeout(this.openedTimeoutId);
    if (this.closedTimeoutId) clearTimeout(this.closedTimeoutId);
    this.cleanup();
  }
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.open) {
      this.openModal();
    } else {
      this.closeModal();
    }
  }
  openModal(): void {
    if (this.openedTimeoutId) {
      clearTimeout(this.openedTimeoutId);
      this.openedTimeoutId = null;
    }
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.isVisible.set(true);
    this.isAnimating.set(true);
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", this.escapeKeyHandler);
    this.openedTimeoutId = setTimeout(() => {
      this.openedTimeoutId = null;
      this.isAnimating.set(false);
      this.cdr.markForCheck();
      this.opened.emit();
      this.trapFocus();
    }, 50);
  }
  closeModal(): void {
    if (this.openedTimeoutId) {
      clearTimeout(this.openedTimeoutId);
      this.openedTimeoutId = null;
    }
    this.isAnimating.set(true);
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.escapeKeyHandler);
    this.closedTimeoutId = setTimeout(() => {
      this.closedTimeoutId = null;
      this.isVisible.set(false);
      this.isAnimating.set(false);
      this.cdr.markForCheck();
      this.closed.emit();
      this.restoreFocus();
    }, 200);
  }
  onBackdropClick(event: MouseEvent): void {
    if (
      this.closeOnBackdrop &&
      (event.target as HTMLElement).classList.contains("modal-backdrop")
    ) {
      this.onClose();
    }
  }
  onClose(): void {
    this.closeModal();
  }
  get sizeClasses(): string {
    const sizes: Record<ModalSize, string> = {
      sm: "max-w-[400px]",
      md: "max-w-[600px]",
      lg: "max-w-[800px]",
      xl: "max-w-[1000px]",
      full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
    };
    return sizes[this.size];
  }
  get contentPositionClasses(): string {
    return this.contentPosition === "top"
      ? "items-start pt-[10vh]"
      : "items-center";
  }
  private trapFocus(): void {
    const focusableElements = this.elementRef.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }
  private restoreFocus(): void {
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }
  private cleanup(): void {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.escapeKeyHandler);
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
  ) {}
}
