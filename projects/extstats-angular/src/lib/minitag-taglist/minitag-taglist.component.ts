import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";
import {NgClass} from "@angular/common";
import {UserTagService} from "../user-tag.service";

export interface TaggedGame {
  name: string;
  bggid: number;
  tags: string[] | undefined;
}

@Component({
  selector: 'minitag-taglist',
  templateUrl: './minitag-taglist.component.html',
  imports: [
    NgClass
  ],
  styleUrl: './minitag-taglist.component.css'
})
export class MinitagTaglistComponent implements AfterViewInit {
  @Input({ required: true}) allTags!: string[];
  @Input({ required: true}) game!: TaggedGame;
  @Output() close = new EventEmitter<undefined>;

  constructor(private el: ElementRef, private tagService: UserTagService){
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }

  hasTag(tag: string): boolean {
    return (this.game.tags && this.game.tags.indexOf(tag) >= 0) || false;
  }

  async clickTag(tag: string, alreadyHasTag: boolean) {
    if (tag) {
      if (alreadyHasTag) {
        this.game.tags = await this.tagService.removeTagAndSave(this.game.bggid, tag).then();
      } else {
        this.game.tags = await this.tagService.addTagAndSave(this.game.bggid, tag).then();
      }
    }
    this.close.next(undefined);
  }
}
