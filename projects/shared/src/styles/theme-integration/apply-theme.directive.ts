import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  inject,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StyleThemeService } from "../../styles/theme.service";
import { getComponentStyleClasses, getCurrentStyle } from "../../styles/style-registry";

@Directive({
  selector: "[appApplyTheme]",
  standalone: true,
})
export class ApplyThemeDirective implements OnInit, OnDestroy {
  @Input("appApplyTheme") componentId!: string;
  @Input() themedVariant?: string;
  @Input() themedSize?: string;

  private readonly styleThemeService = inject(StyleThemeService);
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  private subscription?: Subscription;
  private currentClasses: string[] = [];

  ngOnInit(): void {
    this.applyThemeClasses();

    this.subscription = this.styleThemeService.themeChanged$.subscribe(() => {
      this.applyThemeClasses();
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private applyThemeClasses(): void {
    const theme = getCurrentStyle();
    const newClasses = getComponentStyleClasses(
      theme,
      this.componentId,
      this.themedVariant,
      this.themedSize,
    );

    const classList = newClasses.split(" ").filter((c) => c);

    this.currentClasses.forEach((cls) => {
      this.renderer.removeClass(this.elementRef.nativeElement, cls);
    });

    classList.forEach((cls) => {
      this.renderer.addClass(this.elementRef.nativeElement, cls);
    });

    this.currentClasses = classList;
  }
}
