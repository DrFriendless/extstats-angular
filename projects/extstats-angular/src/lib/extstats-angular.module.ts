import { NgModule } from '@angular/core';
import {DocumentationComponent} from "./extstats-documentation/documentation.component";
import {TableConfigComponent} from "./table-config/table-config.component";
import {ButtonGroupComponent} from "./button-group/button-group.component";
import {ButtonGroupButtonDirective} from "./button-group-button.directive";
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { BrowserModule } from '@angular/platform-browser';
import {GeekChipsComponent} from "./geek-chips/geek-chips.component";
import {GeekComboComponent} from "./geek-combo/geek-combo.component";
import {GeekListEditorComponent} from "./geek-list-editor/geek-list-editor.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    NguiAutoCompleteModule, FormsModule, BrowserModule,
    ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, HttpClientModule, MatInputModule,
    BrowserAnimationsModule, MatChipsModule, MatIconModule, TabsModule.forRoot(), CollapseModule.forRoot()
  ],
  declarations: [
    DocumentationComponent,
    TableConfigComponent,
    ButtonGroupComponent,
    ButtonGroupButtonDirective,
    GeekChipsComponent,
    GeekComboComponent,
    GeekListEditorComponent
  ],
  exports: [
    DocumentationComponent,
    TableConfigComponent,
    ButtonGroupComponent,
    ButtonGroupButtonDirective,
    GeekChipsComponent,
    GeekComboComponent,
    GeekListEditorComponent
  ]
})
export class ExtstatsAngularModule { }
