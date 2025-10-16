import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import {GeekChipsComponent} from '../geek-chips/geek-chips.component';

@Component({
  selector: 'geek-list-editor',
  templateUrl: './geek-list-editor.component.html'
})
export class GeekListEditorComponent implements AfterViewInit {
    @ViewChild(GeekChipsComponent, {static: true}) chips;
    @Input('editable') editable = true;
    @Input('initial') initial = "";

    ngAfterViewInit() {
      this.chips.geeks = this.initial.split(",").map(s => s.trim());
    }

    public getGeeks(): string[] {
      return this.chips.geeks;
    }
}
