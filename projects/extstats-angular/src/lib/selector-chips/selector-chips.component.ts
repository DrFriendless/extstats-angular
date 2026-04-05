import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'selector-chips',
  templateUrl: './selector-chips.component.html',
  styleUrls: ['./selector-chips.component.css']
})
export class SelectorChipsComponent {
  @Input('editable') editable = true;
  @Input('selectors') selectors: string[] = [];

  @Output() changes =  new EventEmitter<string[]>();

  public addSelector(selector: string) {
      this.selectors.push(selector);
      this.changes.next([...this.selectors]);
  }

  public remove(selector: string): void {
    const index = this.selectors.indexOf(selector);
    if (index >= 0) {
      this.selectors.splice(index, 1);
      this.changes.next([...this.selectors]);
    }
  }
}
