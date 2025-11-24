import {MultiGeekPlays, PlaysQuery} from "extstats-core";
import {AfterViewInit, Directive, Injectable, OnInit} from '@angular/core';
import {from, Observable, Subject} from "rxjs";
import { mergeMap, tap, share } from "rxjs/operators";
import { UserDataService} from "./user-data.service";
import {ExtstatsApi} from "extstats-api";

@Injectable()
@Directive({})
export abstract class PlaysSourceComponent implements AfterViewInit, OnInit {
  protected geek: string | undefined;
  private queries = new Subject<any>();
  public data$: Observable<MultiGeekPlays>;
  public loading = false;

  protected constructor(private api: ExtstatsApi, private userDataService: UserDataService) {
    this.data$ = this.queries.asObservable()
      .pipe(
        tap(() => this.loading = true),
        mergeMap(q => this.doQuery(q)),
        tap(data => console.log(data)),
        tap(() => this.loading = false),
        share()
      );
  }

  public ngOnInit(): void {
    this.userDataService.init();
    this.geek = this.userDataService.getAGeek();
  }

  public ngAfterViewInit() {
    this.refresh();
  }

  private doQuery(q: any): Observable<MultiGeekPlays> {
    if (!this.geek) throw new Error('no geek');
    const body = this.buildQuery(this.geek, q);
    return from(this.api.plays(body));
  }

  protected buildQuery(geek: string, q: any): PlaysQuery {
    return { geek };
  }

  public refresh() {
    this.queries.next(null);
  }

  public abstract getId(): string;

  protected abstract getQueryResultFormat(): string;

  protected abstract getQueryVariables(): { [key: string]: string };

  protected abstract getApiKey(): string;
}
