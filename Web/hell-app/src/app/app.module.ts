import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp } from "firebase/app"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LevelResearchActionPanelComponent } from './components/level-research-action-panel/level-research-action-panel.component';
import { LeaveFromDungeonComponent } from './components/leave-from-dungeon/leave-from-dungeon.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    LogPanelComponent,
    GetHeroComponent,
    GameComponent,
    CreateHeroComponent,
    DeadComponent,
    LevelResearchActionPanelComponent,
    LeaveFromDungeonComponent
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
    MatCardModule,
    MatIconModule
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
