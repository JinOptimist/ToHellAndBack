import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { DeadComponent } from './components/dead/dead.component';
import { GameComponent } from './components/game/game.component';
import { GetHeroComponent } from './components/get-hero/get-hero.component';
import { LeaveFromDungeonComponent } from './components/leave-from-dungeon/leave-from-dungeon.component';
import { GameGuard } from './services/GameGuard';

const routes: Routes = [
  { path: 'getHero', component: GetHeroComponent },
  { path: 'createHero', component: CreateHeroComponent },
  { path: 'game', component: GameComponent, canActivate: [GameGuard] },
  { path: 'dead', component: DeadComponent },
  { path: 'leave-from-dungeon', component: GameComponent },
  { path: '', component: GetHeroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
