import { Component } from '@angular/core';
import {GeekComboComponent, DesignerComboComponent, LoaderComponent, DocumentationComponent, ConfigComponent, GeekListEditorComponent} from "../../../extstats-angular";
import {SelectorComboComponent} from "../../../extstats-angular";
import {Designer} from "extstats-api";

@Component({
  selector: 'app-root',
  imports: [GeekComboComponent, DesignerComboComponent, DocumentationComponent, GeekListEditorComponent, LoaderComponent, ConfigComponent, SelectorComboComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  foundGeek: string = "";

  geekSelected(event: string) {
    console.log(`GeekCombo returns ${event}`);
  }

  designerSelected(event: Designer) {
    console.log(`DesignerCombo returns ${JSON.stringify(event)}`);
  }

  choose(event: string) {
    console.log(`Extstats Config returns ${event}`);
  }
}
