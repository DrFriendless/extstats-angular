import {Component, model, OnInit} from '@angular/core';
import {GeekComboComponent, DesignerComboComponent, PublisherComboComponent, LoaderComponent, DocumentationComponent,
  ConfigComponent, GeekListEditorComponent, SwitchComponent} from "../../../extstats-angular";
import {SelectorComboComponent} from "../../../extstats-angular";
import {Designer, Publisher} from "extstats-api";

@Component({
  selector: 'app-root',
  imports: [GeekComboComponent, DesignerComboComponent, PublisherComboComponent, DocumentationComponent, GeekListEditorComponent,
    LoaderComponent, ConfigComponent, SelectorComboComponent, SwitchComponent],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App implements OnInit {
  foundGeek: string = "";
  yellow = model(false);

  ngOnInit(): void {
    setTimeout(() => this.yellow.set(true), 10000);
  }

  geekSelected(event: string) {
    console.log(`GeekCombo returns ${event}`);
  }

  designerSelected(event: Designer) {
    console.log(`DesignerCombo returns ${JSON.stringify(event)}`);
  }

  switch(name: string, value: boolean) {
    console.log(`app switch ${name} ${JSON.stringify(value)}`);
  }

  publisherSelected(event: Publisher) {
    console.log(`PublisherCombo returns ${JSON.stringify(event)}`);
  }

  choose(event: string) {
    console.log(`Extstats Config returns ${event}`);
  }
}
