import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp } from "firebase/app"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionPanelComponent } from './components/action-panel/action-panel.component';
import { LogPanelComponent } from './components/log-panel/log-panel.component';
import { StatusComponent } from './components/status/status.component';
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';
import { FormsModule } from '@angular/forms';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioButton } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ActionPanelComponent,
    LogPanelComponent,
    LoginComponent,
    GameComponent,
    CreateHeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    //MatRadioButton//mat-radio-button
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

  constructor(){
    const app = initializeApp(this.firebaseConfig);
  }
}
