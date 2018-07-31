import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { services } from './shared/services/index';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {states} from './shared/store/index'
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {WebsocketModule} from './shared/websocket/index';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    NgxsModule.forRoot(states),
    ReactiveFormsModule,
   // NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    WebsocketModule.config({
      url: environment.ws
    })
  ],
  providers: [...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
