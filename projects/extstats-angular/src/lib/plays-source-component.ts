import { PlaysQuery } from "extstats-core";
import  {AfterViewInit, OnInit} from '@angular/core';
import { Observable, Subject} from "rxjs";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { flatMap, tap, share } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { UserDataService} from "./user-data.service";

export abstract class PlaysSourceComponent<T> implements AfterViewInit, OnInit {
  protected geek: string;
  private queries = new Subject<any>();
  public data$: Observable<T>;
  public loading = false;

  protected constructor(private http: HttpClient, private userDataService: UserDataService) {
    this.data$ = this.queries.asObservable()
      .pipe(
        tap(junk => this.loading = true),
        flatMap(junk => this.doQuery()),
        tap(data => console.log(data)),
        tap(junk => this.loading = false),
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

  private doQuery(): Observable<T> {
    const options = {
      headers: new HttpHeaders().set("x-api-key", this.getApiKey())
    };
    const body = this.buildQuery(this.geek);
    if (body) return this.http.post("https://api.drfriendless.com/v1/plays", body, options) as Observable<T>;
    return EMPTY;
  }

  protected buildQuery(geek: string): PlaysQuery {
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
