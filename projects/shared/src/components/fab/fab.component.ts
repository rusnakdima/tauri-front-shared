import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export interface FabItem {
  icon: string;
  label: string;
  value: any;
}

@Component({
  selector: "app-fab",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./fab.component.html",
})
export class FabComponent {
  @Input() icon = "add";
  @Input() label = "";
  @Input() position: "bottom-right" | "bottom-left" = "bottom-right";
  @Input() items?: FabItem[];

  @Output() mainClick = new EventEmitter<void>();
  @Output() actionSelected = new EventEmitter<any>();

  open = false;

  onMainClick() {
    if (this.items && this.items.length) {
      this.open = !this.open;
    }
    this.mainClick.emit();
  }

  selectItem(item: FabItem) {
    this.actionSelected.emit(item.value);
    this.open = false;
  }
}

registerSchemaComponent("app-fab", FabComponent);
