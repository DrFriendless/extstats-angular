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
    if (!geek) geek = this.getLoggedInGeek();
    if (geek === null) geek = undefined;
    return geek;
  }

  public async checkDataIsLoaded(): Promise<void> {
    if (this.api.isBroken()) {
      throw new Error("Connection to database is broken!");
    }
    if (!this.data) await this.reloadData();
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

  private async reloadData() {
    this.data = new UserConfig(await this.api.getPersonalData());
  }

  public async save<T>(): Promise<void> {
    if (!this.isLoggedIn()) return;
    if (this.data) await this.api.updatePersonalData(this.data.getAll());
  }

  public getSync<T>(path: string, defolt: T): T | undefined {
    if (!this.isLoggedIn()) return undefined;
    if (!this.data) return undefined;
    return this.data.get(path, defolt);
  }

  public async get<T>(path: string, defolt: T): Promise<T | undefined> {
    if (!this.isLoggedIn()) return undefined;
    await this.checkDataIsLoaded();
    return this.data!.get(path, defolt);
  }
}
