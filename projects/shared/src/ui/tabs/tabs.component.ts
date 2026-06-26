import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

export type TabOrientation = "horizontal" | "vertical";

@Component({
  selector: "app-tabs",
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./tabs.component.html",
  styleUrl: "./tabs.component.css",
})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTab: string | null = null;
  @Input() orientation: TabOrientation = "horizontal";

  @Output() tabChange = new EventEmitter<string>();

  selectTab(tabId: string, disabled?: boolean): void {
    if (disabled) return;
    this.activeTab = tabId;
    this.tabChange.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
