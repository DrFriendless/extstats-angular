import { GeekGameQuery } from "extstats-core";
import {AfterViewInit, OnInit} from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {flatMap, tap, share} from "rxjs/internal/operators";
import {ExtstatsTable} from "./table-config/extstats-table";
import {UserDataService} from "./user-data.service";

export abstract class DataSourceComponent<T> implements ExtstatsTable, AfterViewInit, OnInit {
  protected geek: string;
  private selectors = new Subject<string>();
  public data$: Observable<T>;
  protected selector: string;

  protected constructor(private http: HttpClient, private userDataService: UserDataService, defaultSelector: string) {
    this.selector = defaultSelector;
  }

  public ngAfterViewInit() {
    this.selectors.next(this.selector);
  }

  public ngOnInit(): void {
    this.geek = this.userDataService.getAGeek();
    this.data$ = this.selectors.asObservable()
      .pipe(
        flatMap(s => this.doQuery(s)),
        tap(data => console.log(data)),
        share()
      );
  }

  private doQuery(selector: string): Observable<T> {
    const options = {
      headers: new HttpHeaders().set("x-api-key", this.getApiKey())
    };
    const body: GeekGameQuery = {
      query: selector,
      geek: this.geek,
      format: this.getQueryResultFormat(),
      vars: this.getQueryVariables()
    };
    Object.assign(body, this.getExtra());
    return this.http.post("https://api.drfriendless.com/v1/query", body, options) as Observable<T>;
  }

  public getSelector(): string {
    return this.selector;
  }

  public setSelector(s: string) {
    this.selector = s;
    this.selectors.next(s);
  }

  public abstract getId(): string;

  protected abstract getQueryResultFormat(): string;

  protected abstract getQueryVariables(): { [key: string]: string };

  protected abstract getApiKey(): string;

  protected getExtra(): { [key: string]: any } {
    return {};
  }
}
