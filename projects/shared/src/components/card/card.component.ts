import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { registerSchemaComponent } from "../../core/lib/schema-component.registry";
import { SchemaElementComponent } from "../../core/lib/schema-router/schema-element.component";
import type { CanvasElement } from "../../core/lib/types";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, SchemaElementComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="getCardClasses()">
      @if (title) {
        <div class="px-6 py-4 border-b border-outline-variant">
          <h3 class="text-lg font-medium text-on-surface">{{ title }}</h3>
          @if (subtitle) {
            <p class="text-sm text-on-surface-variant">{{ subtitle }}</p>
          }
        </div>
      }
      <div [class]="getContentClasses()">
        @if (content) {
          <p class="text-on-surface">{{ content }}</p>
        }
        @for (child of children; track child.id) {
          <app-schema-element
            [element]="child"
            [elements]="children"
          ></app-schema-element>
        }
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
})
export class CardComponent {
  @Input() title = "";
  @Input() subtitle = "";
  @Input() content = "";
  @Input() elevated: 0 | 1 | 2 | 3 = 1;
  @Input() borderRadius: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';
  @Input() children: CanvasElement[] = [];
  @Input() classes = "";

  getCardClasses(): string {
    const radiusMap = {
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    };

    const shadows = [
      'shadow-none',
      'shadow-1',
      'shadow-2',
      'shadow-3',
    ];

    const base = 'bg-surface-container border border-outline-variant overflow-hidden';
    const radius = radiusMap[this.borderRadius];
    const shadow = shadows[this.elevated];

    return [base, radius, shadow, this.classes].filter(Boolean).join(' ');
  }

  getContentClasses(): string {
    const paddingMap = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };
    return paddingMap[this.padding];
  }
}

registerSchemaComponent("app-card", CardComponent);
