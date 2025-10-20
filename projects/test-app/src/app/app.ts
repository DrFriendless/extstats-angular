import { Component } from '@angular/core';
import {GeekComboComponent, LoaderComponent} from "../../../extstats-angular";
import {DocumentationComponent} from "../../../extstats-angular/src/lib/extstats-documentation/documentation.component";
import {GeekListEditorComponent} from "../../../extstats-angular/src/lib/geek-list-editor/geek-list-editor.component";

@Component({
  selector: 'app-root',
  imports: [GeekComboComponent, DocumentationComponent, GeekListEditorComponent, LoaderComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  foundGeek: string = "";

  geekSelected(event: string) {
    console.log(`GeekCombo returns ${event}`);
  }
}
