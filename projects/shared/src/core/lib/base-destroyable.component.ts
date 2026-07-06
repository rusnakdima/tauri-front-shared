import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

/**
 * Abstract base component that provides a destroy$ Subject for subscription cleanup.
 * Extend this class instead of OnDestroy directly when you need to manage RxJS subscriptions.
 */
@Component({
  selector: "lib-base-destroyable",
  standalone: true,
  template: "",
})
export abstract class BaseDestroyableComponent implements OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
