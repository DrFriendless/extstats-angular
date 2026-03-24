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
  private tagsForGames: Record<string, string[]> | undefined  = undefined;

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

  public getAllTags(): string[] {
    return this.getSync("tagalogue.alltags", []) || [];
  }

  public getTagsForGame(bggid: number | string): string[] {
    const tbg = this.tagsForGames as Record<string, string[]>;
    return tbg[bggid.toString()] || [];
  }

  public async addTagAndSave(bggid: number | string, tag: string): Promise<void> {
    const ts4gs: Record<string, string[]> = await this.get("tagalogue.tagsbygame", {}) || {};
    const ts4g = ts4gs[bggid.toString()] || [];
    if (ts4g.indexOf(tag) < 0) {
      ts4g.push(tag);
      ts4gs[bggid.toString()] = ts4g;
      await this.setAndSave("tagalogue.tagsbygame", ts4gs);
    }
    this.tagsForGames = ts4gs;
  }

  public async removeTagAndSave(bggid: number | string, tag: string): Promise<void> {
    const ts4gs: Record<string, string[]> = await this.get("tagalogue.tagsbygame", {}) || {};
    const ts4g = ts4gs[bggid.toString()] || [];
    if (ts4g.indexOf(tag) >= 0) {
      ts4gs[bggid.toString()] = ts4g.filter(t => t !== tag);
      await this.setAndSave("tagalogue.tagsbygame", ts4gs);
    }
    this.tagsForGames = ts4gs;
  }

  private async reloadData() {
    this.data = new UserConfig(await this.api.getPersonalData());
    console.log("data loaded");
    this.tagsForGames = this.getSync("tagalogue.tagsbygame", {}) || {};
  }

  public async save<T>(): Promise<void> {
    if (!this.isLoggedIn()) return;
    if (this.data) await this.api.updatePersonalData(this.data.getAll());
  }

  public getSync<T>(path: string, defolt: T): T | undefined {
    console.log(`getSync ${path}`);
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
