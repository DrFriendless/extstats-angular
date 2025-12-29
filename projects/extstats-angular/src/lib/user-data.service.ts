import { Injectable } from '@angular/core';
import {ExtstatsApi} from "extstats-api";
import {HttpParams} from "@angular/common/http";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private data: any;

  constructor(private api: ExtstatsApi, private cookieService: CookieService) { }

  private getParamValueQueryString(paramName: string) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.getCookie("extstatsid");
  }

  getLoggedInGeek(): string | undefined {
    return this.cookieService.getCookie("extstatsid");
  }

  getAGeek(): string | undefined {
    let geek = this.getParamValueQueryString("geek");
    if (geek) console.log(`From URL ${geek}`);
    if (!geek) geek = this.getLoggedInGeek();
    if (geek === null) geek = undefined;
    return geek;
  }

  public async set<T>(path: string, value: T): Promise<void> {
    if (!this.isLoggedIn()) return;
    if (!this.data) {
      this.data = await this.api.getPersonalData();
    }
    let {curr, parent, f} = this.locatePath(path);
     parent[f!] = value;
  }

  public async setAndSave<T>(path: string, value: T): Promise<void> {
    if (!this.isLoggedIn()) return;
    if (!this.data) {
      this.data = await this.api.getPersonalData();
    }
    let {curr, parent, f} = this.locatePath(path);
    if (curr && value && value === curr) return;
    parent[f!] = value;
    await this.api.updatePersonalData(this.data);
  }

  public async save<T>(): Promise<void> {
    if (!this.isLoggedIn()) return;
    if (this.data) await this.api.updatePersonalData(this.data);
  }

  private locatePath(path: string) {
    const fields = path.split(".", 100);
    let curr = this.data;
    let parent = undefined;
    let f: string | undefined = undefined;
    for (const field of fields) {
      if (curr === undefined) {
        curr = {};
        parent[f!] = curr;
      }
      f = field;
      if (field in curr) {
        parent = curr;
        curr = curr[field];
      } else {
        parent = curr;
        curr = undefined;
      }
    }
    return {curr, parent, f};
  }

  public async get<T>(path: string, defolt: T): Promise<T | undefined> {
    if (!this.isLoggedIn()) return undefined;
    if (!this.data) {
      this.data = await this.api.getPersonalData();
    }
    let {curr, parent, f} = this.locatePath(path);
    if (curr === undefined) {
      return defolt;
    } else {
      return curr;
    }
  }
}
