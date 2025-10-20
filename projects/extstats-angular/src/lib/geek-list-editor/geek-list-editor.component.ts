import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import {GeekChipsComponent} from '../geek-chips/geek-chips.component';
import {GeekComboComponent} from "../geek-combo/geek-combo.component";

@Component({
  selector: 'geek-list-editor',
  imports: [
    GeekComboComponent,
    GeekChipsComponent
  ],
  templateUrl: './geek-list-editor.component.html'
})
export class GeekListEditorComponent implements AfterViewInit {
    @ViewChild(GeekChipsComponent, {static: true}) chips: GeekChipsComponent | undefined;
    @Input('editable') editable = true;
    @Input('initial') initial = "";

    ngAfterViewInit() {
      if (this.chips) {
        this.chips.geeks = this.initial.split(",").map(s => s.trim());
      }
    }

    public getGeeks(): string[] {
      if (this.chips) {
        return this.chips.geeks;
      } else {
        return [];
      }
    }
}
