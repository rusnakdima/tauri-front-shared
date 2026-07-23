import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  signal,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-textarea",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./textarea.component.html",
})
export class TextareaComponent {
  @Input() label = "";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() value = "";
  @Input() rows = 4;
  @Input() error = "";
  @Input() flexGrow = false;
  @Input() classes = "";
  @Input() autoResize = false;
  @Input() showCharCount = false;
  @Input() maxLength = 5000;
  @Input() showClear = false;
  @Input() readonly = false;
  @Output() input = new EventEmitter<string>();
  @Output() textChange = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<void>();

  @ViewChild("textareaEl") textareaEl!: ElementRef<HTMLTextAreaElement>;
  focused = signal(false);

  handleInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
    this.textChange.emit(this.value);
    if (this.autoResize) {
      this.resizeTextarea();
    }
  }

  handleClear() {
    this.value = "";
    this.input.emit("");
    this.textChange.emit("");
    this.cleared.emit();
  }

  private resizeTextarea() {
    if (this.textareaEl?.nativeElement) {
      const el = this.textareaEl.nativeElement;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }
}

registerSchemaComponent("app-textarea", TextareaComponent);
registerSchemaComponent("app-text-input", TextareaComponent);
