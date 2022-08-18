import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Remult } from 'remult';
import '../shared/extensions/array-extensions'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: Remult, useClass: Remult, deps: [HttpClient] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

declare global {
  interface Array<T> {
      remove(o: T): Array<T>;
  }
}