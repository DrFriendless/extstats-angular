import {AfterViewInit, Directive, Injectable} from '@angular/core';
import { mergeMap, tap, share } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {ExtstatsApi} from "extstats-api";

@Injectable()
@Directive({})
export abstract class GraphQuerySourceComponent<T> implements AfterViewInit {
  protected geek: string | undefined;
  private queries = new Subject<any>();
  public data$: Observable<T>;
  public loading = false;

  protected constructor(protected api: ExtstatsApi) {
    this.data$ = this.queries.asObservable()
      .pipe(
        tap(() => this.loading = true),
        mergeMap(() => this
          .doQuery()
          .catch(err => {
            console.log(err);
            this.loading = false;
            return err;
          })),
        tap(() => this.loading = false),
        share()
      );
  }

  private async doQuery(): Promise<T | undefined> {
    const q = this.buildQuery();
    if (q) {
      return await this.api.retrieve(q) as T;
    } else {
      return undefined;
    }
  }

  public ngAfterViewInit() {
    this.refresh();
  }

  public refresh() {
    this.queries.next(null);
  }

  protected abstract buildQuery(): string;
}
