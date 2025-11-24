import {Observable, Subscription} from "rxjs";
import {Input, OnDestroy, AfterViewInit, Injectable, Directive} from '@angular/core';

@Injectable()
@Directive({})
export abstract class PlaysViewComponent<D> implements OnDestroy, AfterViewInit {
  @Input('data') data$!: Observable<D>;
  private dataSubscription: Subscription | undefined;

  public ngOnDestroy() {
    if (this.dataSubscription) this.dataSubscription.unsubscribe();
  }

  public ngAfterViewInit() {
    if (this.data$) {
      this.dataSubscription = this.data$.subscribe(collection => this.processData(collection));
    }
  }

  protected abstract processData(data: D): void;
}
