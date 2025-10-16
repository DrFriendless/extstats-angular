import {Observable, Subscription} from "rxjs";
import {Input, OnDestroy, AfterViewInit, Injectable} from '@angular/core';

@Injectable()
export abstract class DataViewComponent<D> implements OnDestroy, AfterViewInit {
  @Input('data') data$!: Observable<D>;
  private dataSubscription: Subscription | undefined;

  public ngOnDestroy() {
    if (this.dataSubscription) this.dataSubscription.unsubscribe();
  }

  public ngAfterViewInit() {
    this.dataSubscription = this.data$.subscribe(collection => this.processData(collection));
  }

  protected abstract processData(data: D): void;
}
