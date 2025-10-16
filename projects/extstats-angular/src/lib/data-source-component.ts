import { GeekGameQuery } from "extstats-core";
import {AfterViewInit, Injectable, OnInit} from '@angular/core';
import {Subject, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {tap, share, mergeMap} from "rxjs/operators";
import {UserDataService} from "./user-data.service";

@Injectable()
export abstract class DataSourceComponent<T> implements AfterViewInit, OnInit {
  public geek: string | undefined;
  private selectors = new Subject<string>();
  public data$: Observable<T> | undefined;
  protected selector: string;
  public loading = false;

  protected constructor(private http: HttpClient, private userDataService: UserDataService, defaultSelector: string) {
    this.selector = defaultSelector;
  }

  protected next(selector: string) {
    this.selectors.next(selector);
  }

  public ngAfterViewInit() {
    this.next(this.selector);
  }

  public ngOnInit(): void {
    this.geek = this.userDataService.getAGeek();
    this.data$ = this.selectors.asObservable()
      .pipe(
        tap(junk => this.loading = true),
        mergeMap(s => this.doQuery(s)),
        tap(data => console.log(data)),
        tap(junk => this.loading = false),
        share()
      );
  }

  private doQuery(selector: string): Observable<T> {
    if (!this.geek) return throwError(() => new Error('no geek'));
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

  protected abstract getQueryResultFormat(): string;

  protected abstract getQueryVariables(): { [key: string]: string };

  protected abstract getApiKey(): string;

  protected getExtra(): { [key: string]: any } {
    return {};
  }
}
