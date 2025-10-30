import { Component, AfterViewInit, Input } from '@angular/core';
import {DocumentationContent} from "./documentation-interfaces";
import {HttpClient} from "@angular/common/http";
import {TabDirective, TabsetComponent} from "ngx-bootstrap/tabs";

@Component({
  selector: 'extstats-documentation',
  templateUrl: './documentation.component.html',
  imports: [
    TabsetComponent,
    TabDirective
  ],
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements AfterViewInit {
  @Input() collapsed: boolean = false;
  @Input() src!: string;
  content: DocumentationContent[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    this.http.get(this.src).subscribe(c => {
      this.content = c as DocumentationContent[];
    });
  }
}
