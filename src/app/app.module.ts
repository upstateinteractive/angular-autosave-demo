import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AutosaveFormComponent } from './autosave-form/autosave-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [AppComponent, AutosaveFormComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    ReactiveComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
