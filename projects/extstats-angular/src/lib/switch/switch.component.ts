import { Component, model } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'extstats-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  imports: [
    FormsModule
  ],
  host: {
    style: "display: contents"
  }
})
export class SwitchComponent {
  value = model<boolean>(false);
}
