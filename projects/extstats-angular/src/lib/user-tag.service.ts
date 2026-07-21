import {Injectable} from "@angular/core";
import {UserConfigService} from "./user-data.service";
import {ExtstatsApi} from "extstats-api";

export interface TagGroup {
  name: string;
  tags: string[];
}

/**
 * Support for tags on the boardgamelink widget, to minimise the impact of using it in lots of components.
 */
@Injectable({
  providedIn: 'root'
})
export class UserTagService {
  allTags: string[] = [];

  constructor(private userService: UserConfigService, private api: ExtstatsApi) {
    this.refresh();
  }

  public refresh() {
    this.userService.checkDataIsLoaded().then(() => {
      const tgs = this.getTagGroups();
      const tags: string[] = [];
      for (const tg of tgs) {
        for (const t of tg.tags) {
          if (tags.indexOf(t) < 0) tags.push(t);
        }
      }
      tags.sort();
      this.allTags = tags;
    });
  }

  public async addTagAndSave(bggid: number | string, tag: string): Promise<string[]> {
    const bi = typeof bggid === typeof 1 ? (bggid as number) : parseInt(bggid.toString());
    return await this.api.addTag(bi, tag);
  }

  public async removeTagAndSave(bggid: number | string, tag: string): Promise<string[]> {
    const bi = typeof bggid === typeof 1 ? (bggid as number) : parseInt(bggid.toString());
    return await this.api.removeTag(bi, tag);
  }

  public getTagGroups(): TagGroup[] {
    return this.userService.getSync("tagalogue.taggroups", []) || [];
  }
}
