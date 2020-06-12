import { NgModule } from '@angular/core';
import { DocumentationComponent } from "./extstats-documentation/documentation.component";
import { ButtonGroupComponent } from "./button-group/button-group.component";
import { ButtonGroupButtonDirective } from "./button-group-button.directive";
import { BrowserModule } from '@angular/platform-browser';
import { GeekChipsComponent } from "./geek-chips/geek-chips.component";
import { GeekComboComponent } from "./geek-combo/geek-combo.component";
import { GeekListEditorComponent } from "./geek-list-editor/geek-list-editor.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { LoaderComponent } from './loader/loader.component';
import { ConfigComponent } from "./config/config.component";
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
export { GeekChipsComponent, GeekComboComponent, GeekListEditorComponent };
export { DocumentationComponent, ConfigComponent, ButtonGroupComponent, ButtonGroupButtonDirective };

@NgModule({
  imports: [
    FormsModule, BrowserModule,
    ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, HttpClientModule, MatInputModule,
    BrowserAnimationsModule, MatChipsModule, MatIconModule, MatTabsModule
  ],
  declarations: [
    DocumentationComponent,
    ConfigComponent,
    ButtonGroupComponent,
    ButtonGroupButtonDirective,
    GeekChipsComponent,
    GeekComboComponent,
    GeekListEditorComponent,
    LoaderComponent
  ],
  exports: [
    DocumentationComponent,
    ConfigComponent,
    ButtonGroupComponent,
    ButtonGroupButtonDirective,
    GeekChipsComponent,
    GeekComboComponent,
    GeekListEditorComponent,
    LoaderComponent
  ]
})
export class ExtstatsAngularModule { }
