import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SignalRModule } from 'ngx-signalr';
import { SignalRConfiguration } from 'ngx-signalr';

import { AppGame } from './app.game';

import { MapService } from './services/map.service';

@NgModule({
  declarations: [
    AppGame
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SignalRModule.forRoot(createConfig)
  ],
  providers: [MapService],
  bootstrap: [AppGame]
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