import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";

@Component({
  selector: "app-text-input",
  standalone: true,
  imports: [],
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.css"],
})
export class TextInputComponent implements AfterViewInit {
  @ViewChild("textareaEl") textareaEl!: ElementRef<HTMLTextAreaElement>;
  @Input() value = "";
  @Input() placeholder = "";
  @Input() clearable = false;
  @Input() maxChars = 0;
  @Input() autofocus = false;
  @Input() height = "";
  @Input() label = "";
  @Input() multiline = true;
  @Input() rows = 3;
  @Input() width = "";
  @Input() classes = "";
  @Output() input = new EventEmitter<string>();
  focused = false;
  hovered = false;

  ngAfterViewInit() {
    if (this.autofocus) {
      setTimeout(() => this.textareaEl.nativeElement.focus());
    }
  }

  handleInput(e: Event) {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.input.emit(this.value);
    this.autoResize();
  }

  private autoResize() {
    if (this.textareaEl) {
      const el = this.textareaEl.nativeElement;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }

  clear() {
    this.value = "";
    this.input.emit("");
    if (this.textareaEl) {
      this.textareaEl.nativeElement.style.height = "auto";
    }
  }
}

registerSchemaComponent("app-text-input", TextInputComponent);
