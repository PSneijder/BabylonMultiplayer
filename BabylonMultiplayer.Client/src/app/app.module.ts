import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SignalRModule } from 'ngx-signalr';
import { SignalRConfiguration } from 'ngx-signalr';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SignalRModule.forRoot(createConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createConfig(): SignalRConfiguration {
  const c = new SignalRConfiguration();
  c.hubName = 'gamehub';
  c.qs = { user: 'donald' };
  c.url = 'http://localhost:9000';
  c.logging = false;
  return c;
}