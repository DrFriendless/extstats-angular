import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import {GeekChipsComponent} from '../geek-chips/geek-chips.component';

@Component({
  selector: 'geek-list-editor',
  templateUrl: './geek-list-editor.component.html',
  styleUrls: ['./geek-list-editor.component.css']
})
export class GeekListEditorComponent implements AfterViewInit {
    @ViewChild(GeekChipsComponent) chips;
    @Input('editable') editable = true;
    @Input('initial') initial: string = "";

    ngAfterViewInit() {
      this.chips.geeks = this.initial.split(",").map(s => s.trim());
    }

    public getGeeks(): string[] {
      return this.chips.geeks;
    }
}
