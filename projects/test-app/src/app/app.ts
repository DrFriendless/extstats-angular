import { Component } from '@angular/core';
import {GeekComboComponent, LoaderComponent, DocumentationComponent, ConfigComponent, GeekListEditorComponent} from "../../../extstats-angular";

@Component({
  selector: 'app-root',
  imports: [GeekComboComponent, DocumentationComponent, GeekListEditorComponent, LoaderComponent, ConfigComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  foundGeek: string = "";

  geekSelected(event: string) {
    console.log(`GeekCombo returns ${event}`);
  }

  choose(event: string) {
    console.log(`Extstats Config returns ${event}`);
  }
}
