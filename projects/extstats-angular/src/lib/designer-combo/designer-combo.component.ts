import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Observable, Subject, switchMap} from "rxjs";
import {Designer, ExtstatsApi} from "extstats-api";

@Component({
  selector: 'designer-combo',
  templateUrl: './designer-combo.component.html',
  styleUrls: ['./designer-combo.component.scss'],
  standalone: true
})
export class DesignerComboComponent {
  private _selectedItem: Designer | undefined;

  get selectedItem(): Designer | undefined {
    return this._selectedItem;
  }

  @Input() placeholder? = 'Enter search term';
  @Output() designerChosen = new EventEmitter<Designer>();

  isListVisible = false;
  focusedItemIndex: number | undefined;
  inputs = new Subject<string>();
  filteredItemStream: Observable<Designer[]> = this.inputs.pipe(
    switchMap(s => this.lookupDesigner(s))
  );
  // this is what shows in the list
  filteredItems: Designer[] = [];

  constructor(private api: ExtstatsApi) {
    this.filteredItemStream.subscribe({
      next: (designers: Designer[]) => {
        this.updateFilteredItems(designers);
      }
    });
  }

  selectionEntered(event: Event): void {
    if (this.focusedItemIndex !== undefined) {
      this._selectedItem = this.filteredItems[this.focusedItemIndex];
      this.isListVisible = false;
      this.designerChosen.emit(this._selectedItem);
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

  select(item: Designer): void {
    this.focusedItemIndex = this.filteredItems.indexOf(item);
    this._selectedItem = item;
    this.isListVisible = false;
    this.designerChosen.emit(this._selectedItem);
  }

  focusOn(index: number) {
    this.focusedItemIndex = index;
  }

  private updateFilteredItems(opts: Designer[]) {
    const focusedItem = (this.focusedItemIndex === undefined) ? undefined : this.filteredItems[this.focusedItemIndex];
    this.filteredItems = opts;
    if (focusedItem && this.filteredItems.includes(focusedItem)) {
      this.focusedItemIndex = this.filteredItems.indexOf(focusedItem);
    } else {
      this.focusedItemIndex = undefined;
    }
    this.isListVisible = true;
  }

  private async lookupDesigner(val: string): Promise<Designer[]> {
    if (val === '') return [];
    return await this.api.findDesigners(val);
  }
}


