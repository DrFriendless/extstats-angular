import { fromExtStatsStorage, PlaysQuery } from "extstats-core";
import { AfterViewInit } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Subscription} from "rxjs/internal/Subscription";
import {Subject} from "rxjs/internal/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {flatMap, tap, map, share} from "rxjs/internal/operators";

export abstract class PlaysSourceComponent<T> implements AfterViewInit {
  protected geek: string;
  private selectors = new Subject<any>();
  public data$: Observable<T>;

  protected constructor(private http: HttpClient) {
    this.geek = fromExtStatsStorage(storage => storage.geek);
    this.data$ = this.selectors.asObservable()
      .pipe(
        flatMap(junk => this.doQuery()),
        tap(data => console.log(data)),
        share()
      );
  }

  public ngAfterViewInit() {
    this.selectors.next(null);
  }

// export interface PlaysQuery {
//   geek: string;
//   geeks?: string[];
//   year?: number;
//   month?: number;
//   date?: number;
//   filter?: string;
// }
  private doQuery(): Observable<T> {
    const options = {
      headers: new HttpHeaders().set("x-api-key", this.getApiKey())
    };
    const body: PlaysQuery = {
      geek: this.geek,
    };
    Object.assign(body, this.getExtra());
    return this.http.post("https://api.drfriendless.com/v1/plays", body, options) as Observable<T>;
  }

  public refresh() {
    this.selectors.next(null);
  }

  public abstract getId(): string;

  protected abstract getQueryResultFormat(): string;

  protected abstract getQueryVariables(): { [key: string]: string };

  protected abstract getApiKey(): string;

  protected getExtra(): { [key: string]: any } {
    return {};
  }
}
