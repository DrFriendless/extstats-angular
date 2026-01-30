// stolen from Joel Balmer https://medium.com/@joel.balmer/creating-a-combobox-component-in-angular-4ea8dfcf5112
// and then massacred.

import { Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FavComboComponent, FCItem} from "fav-combo";

export interface SelectorItem extends FCItem {

}

@Component({
  selector: 'selector-combo',
  templateUrl: './selector-combo.component.html',
  styleUrls: ['./selector-combo.component.scss'],
  imports: [
    FavComboComponent
  ],
  standalone: true
})
export class SelectorComboComponent {
  @ViewChild(FavComboComponent) combo: FavComboComponent | undefined;

  public readonly DATA: SelectorItem[] = [
    {
      text: "Owned by me",
      id: "owned(ME)"
    },
    {
      text: "Owned by me, no expansions or books",
      id: "minus(owned(ME),expansions(),books())"
    },
    {
      text: "Owned by me but not rated",
      id: "minus(owned(ME),rated(ME))"
    },
    {
      text: "Owned by me but not played",
      id: "minus(owned(ME),played(ME))"
    },
    {
      text: "Rated by me",
      id: "rated(ME)"
    },
    {
      text: "Rated by me, no expansions or books",
      id: "minus(rated(ME),expansions(),books())"
    },
    {
      text: "Played and rated by me",
      id: "all(played(ME),rated(ME))"
    },
    {
      text: "Played and owned by me",
      id: "all(played(ME),owned(ME))"
    },
    {
      text: "Played by me",
      id: "played(ME)"
    },
    {
      text: "Expansions owned by me",
      id: "all(owned(ME),expansions())"
    },
    {
      text: "Books owned by me",
      id: "all(owned(ME),books())"
    },
  ];

  @Output() selectorChosen = new EventEmitter<string>();
  @Output() favouritesChanged = new EventEmitter<SelectorItem[]>();

  onCurrentItemChange(event: FCItem) {
    this.selectorChosen.emit(event.id);
  }

  onFavouritesChange(event: SelectorItem[]) {
    this.favouritesChanged.emit(event);
  }

  getChosenItem(): SelectorItem {
    return this.combo?.chosenItem as SelectorItem;
  }

  setDefault(selector: string) {
    for (const item of this.DATA) {
      if (item.id === selector) {
        console.log(JSON.stringify(item));
        item.style = "default";
      } else {
        item.style = undefined;
      }
    }
  }

  setSelected(selector: string) {
    if (this.combo) {
      this.combo.setChosen(selector);
    } else {
      console.log("no combo");
    }
  }
}


