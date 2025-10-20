import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'geek-chips',
  templateUrl: './geek-chips.component.html',
  styleUrls: ['./geek-chips.component.css']
})
export class GeekChipsComponent {
  @Input('editable') editable = true;
  @Input('geeks') geeks: string[] = [];

  @Output() changes =  new EventEmitter<string[]>();

  public addGeek(geek: string) {
    if (this.geeks.indexOf(geek) < 0) {
      this.geeks.push(geek);
      this.changes.next([...this.geeks]);
    }
  }

  public remove(geek: string): void {
    const index = this.geeks.indexOf(geek);
    if (index >= 0) {
      this.geeks.splice(index, 1);
      this.changes.next([...this.geeks]);
    }
  }
}
