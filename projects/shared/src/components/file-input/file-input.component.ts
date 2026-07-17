import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

@Component({
  selector: "app-file-input",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      @if (label) {
        <label
          class="block mb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
          >{{ label }}</label
        >
      }
      <label
        class="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
      >
        <span
          class="material-symbols-rounded text-neutral-500 dark:text-neutral-400 mb-1"
          >cloud_upload</span
        >
        <p
          class="text-[11px] text-neutral-500 dark:text-neutral-400 font-semibold"
        >
          {{ placeholder }}
        </p>
        <input
          type="file"
          class="hidden"
          (change)="onFileChange($event)"
          [accept]="accept"
          [multiple]="multiple"
        />
      </label>
    </div>
  `,
})
export class FileInputComponent {
  @Input() label?: string;
  @Input() accept?: string;
  @Input() placeholder = "Upload file";
  @Input() multiple = false;

  @Output() filesSelected = new EventEmitter<FileList | null>();
  @Output() fileName = new EventEmitter<string>();

  isDragOver = false;
  private fileEl = inject(ElementRef<HTMLInputElement>);

  openPicker() {
    const input = this.fileEl.nativeElement.querySelector(
      "input[type='file']",
    ) as HTMLInputElement | null;
    input?.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.emitFiles(input.files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    this.emitFiles(event.dataTransfer?.files ?? null);
  }

  private emitFiles(files: FileList | null) {
    this.filesSelected.emit(files);
    if (files && files.length > 0) {
      const names: string[] = [];
      for (let i = 0; i < files.length; i++) {
        names.push(files[i].name);
      }
      this.fileName.emit(names.join(", "));
    } else {
      this.fileName.emit("");
    }
  }
}

registerSchemaComponent("app-file-input", FileInputComponent);
