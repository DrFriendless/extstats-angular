import { Component } from '@angular/core';
import {GeekComboComponent, LoaderComponent, DocumentationComponent, ConfigComponent, GeekListEditorComponent} from "../../../extstats-angular";
import {SelectorComboComponent} from "../../../extstats-angular/src/lib/selector-combo/selector-combo.component";

@Component({
  selector: 'app-root',
  imports: [GeekComboComponent, DocumentationComponent, GeekListEditorComponent, LoaderComponent, ConfigComponent, SelectorComboComponent],
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
