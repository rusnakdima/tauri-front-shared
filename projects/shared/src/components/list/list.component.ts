import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { IconComponent } from "../icons/icons.component";

export interface ListItem {
  icon?: string;
  title: string;
  subtitle?: string;
  timestamp?: string;
  value?: any;
}

@Component({
  selector: "app-list",
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./list.component.html",
})
export class ListComponent {
  @Input() items: ListItem[] = [];
  @Input() selectable = false;
  @Input() divided = true;

  @Output() itemSelected = new EventEmitter<any>();

  onItemClick(item: ListItem) {
    if (!this.selectable) return;
    this.itemSelected.emit(item.value);
  }
}

registerSchemaComponent("app-list", ListComponent);
