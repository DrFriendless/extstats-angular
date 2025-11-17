// stolen from Joel Balmer https://medium.com/@joel.balmer/creating-a-combobox-component-in-angular-4ea8dfcf5112
// and then massacred.

import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Observable, Subject, switchMap} from "rxjs";
import {ExtstatsApi} from "extstats-api";

@Component({
  selector: 'geek-combo',
  templateUrl: './geek-combo.component.html',
  styleUrls: ['./geek-combo.component.scss'],
  standalone: true
})
export class GeekComboComponent {
  private _selectedItem: string | undefined;

  get selectedItem(): string | undefined {
    return this._selectedItem || "";
  }

  @Input() placeholder? = 'Enter search term';
  @Output() geekChosen = new EventEmitter<string>();

  isListVisible = false;
  focusedItemIndex: number | undefined;
  inputs = new Subject<string>();
  filteredItemStream: Observable<string[]> = this.inputs.pipe(
    switchMap(s => this.lookupGeek(s))
  );
  // this is what shows in the list
  filteredItems: string[] = [];

  constructor(private api: ExtstatsApi) {
    this.filteredItemStream.subscribe({
      next: (geeks: string[]) => {
        this.updateFilteredItems(geeks);
      }
    });
  }

  selectionEntered(event: Event): void {
    if (this.focusedItemIndex !== undefined) {
      this._selectedItem = this.filteredItems[this.focusedItemIndex];
      this.isListVisible = false;
      this.geekChosen.emit(this._selectedItem);
    } else {
      const searchTerm = (event.target as HTMLInputElement).value;
      this.inputs.next(searchTerm);
    }
  }

  reset() {
    this._selectedItem = undefined;
  }

  inputChanged(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    if (!searchTerm) {
      this.focusedItemIndex = undefined;
      this._selectedItem = undefined;
      this.isListVisible = false;
    } else {
      this.inputs.next(searchTerm);
    }
  }

  navigateDownToListItem(event: Event): void {
    event.stopPropagation();
    if (!this.isListVisible) {
      this.isListVisible = true;
      if (this.focusedItemIndex === undefined && this.filteredItems.length > 0) {
        this.focusedItemIndex = 0;
      }
      return;
    }
    if (!this.filteredItems.length) {
      this.focusedItemIndex = undefined;
      return;
    }
    if (this.focusedItemIndex === undefined) {
      this.focusedItemIndex = 0;
      return;
    }
    if (this.focusedItemIndex === this.filteredItems.length - 1) {
      return;
    }
    this.focusedItemIndex++;
  }

  navigateUpToListItem(event: Event): void {
    event.stopPropagation();
    if (!this.isListVisible || this.focusedItemIndex === 0) {
      return;
    }
    if (this.filteredItems.length && this.focusedItemIndex === undefined) {
      this.focusedItemIndex = this.filteredItems.length - 1;
      return;
    }
    if (this.focusedItemIndex) this.focusedItemIndex--;
  }

  select(item: string): void {
    this.focusedItemIndex = this.filteredItems.indexOf(item);
    this._selectedItem = item;
    this.isListVisible = false;
    this.geekChosen.emit(this._selectedItem);
  }

  focusOn(index: number) {
    this.focusedItemIndex = index;
  }

  private updateFilteredItems(opts: string[]) {
    const focusedItem = (this.focusedItemIndex === undefined) ? undefined : this.filteredItems[this.focusedItemIndex];
    this.filteredItems = opts;
    if (focusedItem && this.filteredItems.includes(focusedItem)) {
      this.focusedItemIndex = this.filteredItems.indexOf(focusedItem);
    } else {
      this.focusedItemIndex = undefined;
    }
    this.isListVisible = true;
  }

  private async lookupGeek(val: string): Promise<string[]> {
    if (val === '') return [];
    return await this.api.findGeeks(val);
  }
}


