import {Collection, GeekGameQuery} from "extstats-core";
import {AfterViewInit, Directive, Injectable, OnInit} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {tap, share, mergeMap} from "rxjs/operators";
import {UserConfigService} from "./user-data.service";
import {ExtstatsApi} from "extstats-api";

@Injectable()
@Directive({})
export abstract class DataSourceComponent<T> implements AfterViewInit, OnInit {
  public geek: string | undefined;
  private selectors = new Subject<string>();
  public data$: Observable<Collection> | undefined;
  protected selector: string;
  public loading = false;

  protected constructor(protected userConfigService: UserConfigService, protected api: ExtstatsApi, defaultSelector: string) {
    this.selector = defaultSelector;
  }

  protected next(selector: string) {
    this.selectors.next(selector);
  }

  public ngAfterViewInit() {
    this.next(this.selector);
  }

  public ngOnInit(): void {
    this.geek = this.userConfigService.getAGeek();
    this.data$ = this.selectors.asObservable()
      .pipe(
        tap(() => this.loading = true),
        mergeMap(async s => await this.doQuery(s)),
        tap(data => console.log(data)),
        tap(() => this.loading = false),
        share()
      );
  }

  private async doQuery(selector: string): Promise<Collection> {
    if (!this.geek) throw new Error('no geek');
    const body: GeekGameQuery = {
      query: selector,
      geek: this.geek,
      format: this.getQueryResultFormat(),
      vars: this.getQueryVariables()
    };
    Object.assign(body, this.getExtra());
    return await this.api.query(body);
  }

  protected abstract getQueryResultFormat(): string;

  protected abstract getQueryVariables(): { [key: string]: string };

  protected getExtra(): { [key: string]: any } {
    return {};
  }
}
