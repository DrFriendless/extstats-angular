import {Component, EventEmitter, input, Input, output, Output} from '@angular/core';

@Component({
  selector: 'selector-chip',
  templateUrl: './selector-chip.component.html',
  styleUrls: ['./selector-chip.component.css'],
  host: {
    style: "display: contents"
  }
})
export class SelectorChipComponent {
  editable = input(false);
  selector = input("");
  remove = output<string>();

  onRemove(): void {
    const s = this.selector();
    this.remove.emit(s);
  }
}
