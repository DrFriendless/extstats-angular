import {Component, Input} from "@angular/core";
import {MinitagTaglistComponent} from "../minitag-taglist/minitag-taglist.component";

@Component({
  selector: 'boardgame',
  templateUrl: './board-game-link.component.html',
  imports: [
    MinitagTaglistComponent
  ],
  styleUrl: './board-game-link.component.css'
})
export class BoardGameLinkComponent {
  @Input({ required: true }) game: { name: string, bggid: number } | undefined;
  @Input() allTags: string[] = [];
  @Input() tagsForGame: string[] = [];
  tagsShowing = false;

  async showTags() {
    this.tagsShowing = true;
  }

  hideTags() {
    this.tagsShowing = false;
  }
}
