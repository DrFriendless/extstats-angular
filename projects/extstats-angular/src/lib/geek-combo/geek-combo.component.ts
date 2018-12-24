import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { startWith, flatMap, merge } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'geek-combo',
  templateUrl: './geek-combo.component.html',
  styleUrls: ['./geek-combo.component.css']
})
export class GeekComboComponent implements OnInit {
  @Input('editable') editable = true;
  @Input('placeholder') placeholder = "Geek";
  @Output() geekChosen = new EventEmitter<string>();
  private clears = new Subject<string>();
  control: FormControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(private http: HttpClient) { }

  public ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      merge(this.clears.asObservable()),
      startWith(''),
      flatMap(val => this.filter(val))
    );
  }

  private filter(val: string): Observable<string[]> {
    if (val === '') return of([]);
    return this.http
      .get('http://eb.drfriendless.com/findgeeks/' + val) as Observable<string[]>;
  }

  public emit(event) {
    this.geekChosen.next(this.control.value);
    this.control.setValue('');
    this.clears.next('');
  }
}
