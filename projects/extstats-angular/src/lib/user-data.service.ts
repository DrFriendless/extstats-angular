import { Injectable } from '@angular/core';
import {UserData, BuddySet, UserConfig} from 'extstats-core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { tap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userNames: string[] = [];
  private buddyLists: BuddySet[] = [];

  constructor(private http: HttpClient) { }

  public init() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      console.log(jwt);
      const options = {
        headers: new HttpHeaders().set("Authorization", "Bearer " + jwt)
      };
      this.http.get<UserData>("https://api.drfriendless.com/v1/authenticate", options).pipe(
        tap(obj => console.log(obj)),
        map((userData: UserData) => userData.config),
        tap((config: UserConfig | undefined) => {
          console.log(config);
          if (config) {
            this.userNames = config.usernames;
            this.buddyLists = config.buddies;
          }
        })
      );
    }
  }

  private getParamValueQueryString(paramName: string) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  public getAGeek(): string | undefined {
    let geek = this.getParamValueQueryString("geek");
    // if (!geek) fromExtStatsStorage(storage => storage.geek);
    if (geek === null) geek = undefined;
    return geek;
  }

  public getUserNames(): string[] {
    return this.userNames;
  }

  public getBuddies(): BuddySet[] {
    return this.buddyLists;
  }
}
