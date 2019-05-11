import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public foundGeek: string;

  public choose(geek: string) {
    this.foundGeek = geek;
  }

  public configChanged(event) {
    console.log("configChanged");
    console.log(event);
  }
}
