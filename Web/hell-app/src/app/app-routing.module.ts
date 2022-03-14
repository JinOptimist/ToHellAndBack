import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { DeadComponent } from './components/dead/dead.component';
import { EndOfLevelComponent } from './components/end-of-level/end-of-level.component';
import { GameComponent } from './components/game/game.component';
import { GetHeroComponent } from './components/get-hero/get-hero.component';
import { LeaveFromDungeonComponent } from './components/leave-from-dungeon/leave-from-dungeon.component';
import { LoginComponent } from './components/login/login.component';
import { GameGuard } from './services/GameGuard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'getHero', component: GetHeroComponent },
  { path: 'createHero', component: CreateHeroComponent },
  { path: 'game', component: GameComponent, canActivate: [GameGuard] },
  { path: 'dead', component: DeadComponent },
  { path: 'leave-from-dungeon', component: LeaveFromDungeonComponent },
  { path: 'end-of-level', component: EndOfLevelComponent, canActivate: [GameGuard] },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
