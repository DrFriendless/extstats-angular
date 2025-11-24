import {AfterViewInit, Directive, Injectable, OnInit} from '@angular/core';
import { mergeMap, tap, share } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import {UserDataService} from './user-data.service';
import {ExtstatsApi} from "extstats-api";

@Injectable()
@Directive({})
export abstract class GraphQuerySourceComponent<T> implements AfterViewInit, OnInit {
  protected geek: string | undefined;
  private queries = new Subject<any>();
  public data$: Observable<T>;
  public loading = false;

  protected constructor(private api: ExtstatsApi, private userDataService: UserDataService) {
    this.data$ = this.queries.asObservable()
      .pipe(
        tap(() => this.loading = true),
        mergeMap(() => this.doQuery()),
        tap(() => this.loading = false),
        share()
      );
  }

  public ngOnInit(): void {
    this.userDataService.init();
    this.geek = this.userDataService.getAGeek();
  }

  private async doQuery(): Promise<T> {
    if (!this.geek) throw new Error('no geek');
    return await this.api.retrieve(this.buildQuery(this.geek)) as T;
  }

  public ngAfterViewInit() {
    this.refresh();
  }

  public refresh() {
    this.queries.next(null);
  }

  protected abstract buildQuery(geek: string): string;
}
