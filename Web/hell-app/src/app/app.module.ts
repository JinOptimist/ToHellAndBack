import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp } from "firebase/app"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { LogPanelComponent } from './components/log-panel/log-panel.component';
import { StatusComponent } from './components/status/status.component';
import { GetHeroComponent } from './components/get-hero/get-hero.component';
import { GameComponent } from './components/game/game.component';
import { FormsModule } from '@angular/forms';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { DeadComponent } from './components/dead/dead.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ActionPanelComponent,
    LogPanelComponent,
    GetHeroComponent,
    GameComponent,
    CreateHeroComponent,
    DeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    // Material
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  firebaseConfig = {
    apiKey: "AIzaSyAfofIX36nawbTwCZdIGOBGq4jqlOvj5M4",
    authDomain: "tohellandback-9df27.firebaseapp.com",
    projectId: "tohellandback-9df27",
    storageBucket: "tohellandback-9df27.appspot.com",
    messagingSenderId: "683538521009",
    appId: "1:683538521009:web:b0ee2ee365fb416d38bb90"
  };

  constructor() {
    const app = initializeApp(this.firebaseConfig);
  }
}
