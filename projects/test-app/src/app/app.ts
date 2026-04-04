import { Component } from '@angular/core';
import {GeekComboComponent, DesignerComboComponent, PublisherComboComponent, LoaderComponent, DocumentationComponent,
  ConfigComponent, GeekListEditorComponent} from "../../../extstats-angular";
import {SelectorComboComponent} from "../../../extstats-angular";
import {Designer, Publisher} from "extstats-api";

@Component({
  selector: 'app-root',
  imports: [GeekComboComponent, DesignerComboComponent, PublisherComboComponent, DocumentationComponent, GeekListEditorComponent,
    LoaderComponent, ConfigComponent, SelectorComboComponent],
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

  publisherSelected(event: Publisher) {
    console.log(`PublisherCombo returns ${JSON.stringify(event)}`);
  }

  choose(event: string) {
    console.log(`Extstats Config returns ${event}`);
  }
}
