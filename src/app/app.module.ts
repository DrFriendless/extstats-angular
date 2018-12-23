import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { GeekListEditorComponent } from 'projects/extstats-angular/src/lib/geek-list-editor/geek-list-editor.component';
import { GeekChipsComponent } from 'projects/extstats-angular/src/lib/geek-chips/geek-chips.component';
import { GeekComboComponent } from 'projects/extstats-angular/src/lib/geek-combo/geek-combo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatFormFieldModule
} from '@angular/material';
@NgModule({
  declarations: [
    AppComponent, GeekListEditorComponent, GeekChipsComponent, GeekComboComponent
  ],
  imports: [
    BrowserModule, MatChipsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, FormsModule, MatAutocompleteModule,
    MatSelectModule, HttpClientModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
