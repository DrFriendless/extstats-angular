import {Component, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'extstats-config',
  templateUrl: './config.component.html'
})
export class ConfigComponent implements AfterViewInit {
  @Input() initial: string;
  @Input() alternatives: string[];
  @Output() select = new EventEmitter<string>();

  public selectors: string[] = [];
  public selector: string;

  constructor() { }

  public ngAfterViewInit() {
    this.selector = this.initial;
    this.selectors = this.alternatives.slice();
    if (this.selector && this.selectors.indexOf(this.selector) < 0) this.selectors.unshift(this.selector);
    if (!this.selector && this.selectors.length > 0) this.selector = this.selectors[0];
    if (this.selector) this.select.next(this.selector);
  }

  public submit() {
    this.select.next(this.selector);
    if (this.selectors.indexOf(this.selector) < 0) this.selectors.push(this.selector);
  }
}
