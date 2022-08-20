import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Remult } from 'remult';
import '../shared/extensions/array-extensions'
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    // Add the authorization token header to all API requests.
    JwtModule.forRoot({
      config: {
        tokenGetter: () => AuthService.fromStorage()
      }
    })
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