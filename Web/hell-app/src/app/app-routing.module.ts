import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { GameComponent } from './components/game/game.component';
import { LoginComponent } from './components/login/login.component';
import { GameGuard } from './services/GameGuard';

const routes: Routes = [
  { path: 'getHero', component: LoginComponent },
  { path: 'createHero', component: CreateHeroComponent },
  { path: 'game', component: GameComponent, canActivate: [GameGuard] },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
