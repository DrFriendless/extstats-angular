import {Injectable} from "@angular/core";
import {UserConfigService} from "./user-data.service";

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

  constructor(private userService: UserConfigService) {
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
      let groupsChanged = false;
      const ts4gs: Record<string, string[]> = this.userService.getSync("tagalogue.tagsbygame", {}) || {};
      for (const ts of Object.values(ts4gs)) {
        for (const t of ts) {
          if (tags.indexOf(t) < 0) {
            tags.push(t);
            if (tgs.length === 0) {
              tgs.push({ name: "orphaned", tags: [] });
            }
            tgs[0].tags.push(t);
            groupsChanged = true;
          }
        }
      }
      tags.sort();
      this.allTags = tags;
      if (groupsChanged) {
        this.userService.setAndSave("tagalogue.taggroups", tgs)
          .then(() => console.log("updated tag groups to collect orphans"));
      }
    });
  }

  public getTagsForGame(bggid: number | string): string[] {
    return this.userService.getTagsForGame(bggid);
  }

  public getTagGroups(): TagGroup[] {
    return this.userService.getSync("tagalogue.taggroups", []) || [];
  }
}
