import { Injectable } from '@angular/core';
import {ExtstatsApi} from "extstats-api";
import {HttpParams} from "@angular/common/http";
import {CookieService} from "./cookie.service";
import {UserConfig} from "extstats-core";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  private data: UserConfig | undefined;

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

  private async checkDataIsLoaded(): Promise<void> {
    if (!this.data) {
      this.data = new UserConfig(await this.api.getPersonalData());
    }
  }

  public async set<T>(path: string, value: T): Promise<void> {
    if (!this.isLoggedIn()) return;
    await this.checkDataIsLoaded();
    this.data!.set(path, value);
  }

  public async setAndSave<T>(path: string, value: T): Promise<void> {
    if (!this.isLoggedIn()) return;
    await this.checkDataIsLoaded();
    if (this.data!.maybeSet(path, value)) {
      await this.api.updatePersonalData(this.data!.getAll());
    }
  }

  public async save<T>(): Promise<void> {
    if (!this.isLoggedIn()) return;
    if (this.data) await this.api.updatePersonalData(this.data.getAll());
  }

  public async get<T>(path: string, defolt: T): Promise<T | undefined> {
    if (!this.isLoggedIn()) return undefined;
    await this.checkDataIsLoaded();
    return this.data!.get(path, defolt);
  }
}
