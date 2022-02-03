import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './components/status/status.component';
import { LogPanelComponent } from './components/log-panel/log-panel.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    LogPanelComponent,
    ActionPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
