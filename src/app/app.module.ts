import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {ExtstatsAngularModule} from '../../projects/extstats-angular/src/lib/extstats-angular.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MatChipsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, FormsModule, MatAutocompleteModule,
    MatSelectModule, HttpClientModule, BrowserAnimationsModule, MatInputModule, ExtstatsAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
