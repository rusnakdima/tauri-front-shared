import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.css",
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() open = false;
  @Input() title = "";
  @Input() size: ModalSize = "md";
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  @Input() showHeader = true;
  @Input() showFooter = true;
  @Input() zIndex = 1050;

  @Output() closed = new EventEmitter<void>();

  @ViewChild("modalContent") modalContent!: ElementRef<HTMLElement>;

  private previousActiveElement: HTMLElement | null = null;

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.restoreBodyOverflow();
  }

  @HostListener("document:keydown.escape")
  onEscape(event: KeyboardEvent): void {
    if (this.open && this.closeOnEscape) {
      event.preventDefault();
      this.close();
    }
  }

  get maxWidth(): string {
    switch (this.size) {
      case "sm":
        return "320px";
      case "md":
        return "480px";
      case "lg":
        return "640px";
      case "xl":
        return "800px";
      case "full":
        return "100vw";
      default:
        return "480px";
    }
  }

  get isFullScreen(): boolean {
    return this.size === "full";
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }

  onClose(): void {
    this.close();
  }

  close(): void {
    this.restoreBodyOverflow();
    this.closed.emit();
  }

  private trapFocus(event: KeyboardEvent): void {
    if (!this.modalContent || !this.open) return;

    const focusableElements =
      this.modalContent.nativeElement.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  private handleBodyOverflow(): void {
    if (this.open) {
      this.previousActiveElement = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", this.trapFocus.bind(this));
    }
  }

  private restoreBodyOverflow(): void {
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this.trapFocus.bind(this));
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }
  }

  ngOnChanges(): void {
    if (this.open) {
      this.handleBodyOverflow();
      setTimeout(() => {
        const firstFocusable =
          this.modalContent?.nativeElement?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        firstFocusable?.focus();
      }, 0);
    } else {
      this.restoreBodyOverflow();
    }
  }
}
