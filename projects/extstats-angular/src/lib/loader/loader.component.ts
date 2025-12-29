import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'extstats-loader',
  templateUrl: './loader.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  @Input('mini') mini: boolean = false;
}
