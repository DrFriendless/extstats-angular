import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";
import {NgClass} from "@angular/common";
import {UserConfigService} from "../user-data.service";

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
  @Input({ required: true}) tagsForGame!: string[];
  @Input({ required: true}) bggid!: number;
  @Output() close = new EventEmitter<undefined>;

  constructor(private el: ElementRef, private userService: UserConfigService){
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.focus();
  }

  hasTag(tag: string) {
    return (this.tagsForGame && this.tagsForGame.indexOf(tag) >= 0) || false;
  }

  async clickTag(tag: string, alreadyHasTag: boolean) {
    if (alreadyHasTag) {
      this.userService.removeTagAndSave(this.bggid, tag).then();
    } else {
      this.userService.addTagAndSave(this.bggid, tag).then();
    }
    this.close.next(undefined);
  }
}
