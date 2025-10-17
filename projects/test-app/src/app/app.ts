import { Component } from '@angular/core';
import { GeekComboComponent } from "../../../extstats-angular";

@Component({
  selector: 'app-root',
  imports: [ GeekComboComponent ],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  geekSelected(event: string) {
    console.log(`GeekCombo returns ${event}`);
  }
}
