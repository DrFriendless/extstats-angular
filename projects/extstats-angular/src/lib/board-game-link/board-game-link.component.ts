import {Component, Input} from "@angular/core";
import {MinitagTaglistComponent} from "../minitag-taglist/minitag-taglist.component";

export interface TaggedGame {
  name: string;
  bggid: number;
  tags: string[] | undefined;
}

@Component({
  selector: 'boardgame',
  templateUrl: './board-game-link.component.html',
  imports: [
    MinitagTaglistComponent
  ],
  styleUrl: './board-game-link.component.css'
})
export class BoardGameLinkComponent {
  @Input({ required: true }) game: TaggedGame | undefined;
  @Input() allTags: string[] = [];
  tagsShowing = false;

  async showTags() {
    this.tagsShowing = true;
  }

  hideTags() {
    this.tagsShowing = false;
  }
}
