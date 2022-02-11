import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/maze/HeroService';
import { Router } from '@angular/router';
import { MazeBuilder } from 'src/app/services/maze/MazeBuilder';
import { ICharacteristics } from 'src/app/models/ICharacteristics';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit {
  heroName: string;
  startCoinOptions: number[] = [270, 250, 150, 100, 50, 0];
  heroStartCoins: number = this.startCoinOptions[0];
  error: string;

  constructor(
    private heroService: HeroService,
    private mazeBuilder: MazeBuilder,
    private router: Router) { }

  ngOnInit(): void {
  }

  public createHero() {
    const hero = <IHero>{
      name: this.heroName,
      coins: this.heroStartCoins - 0,
      staminCostToAvoidRoom: 5,
      characteristics: {
        strength : 10,
        dexterity: 10,
        luck: 10,
        stamina:300 - this.heroStartCoins,
        maxStamina:300 - this.heroStartCoins,
      } as ICharacteristics
    };
    hero.maze = this.mazeBuilder.BuildMaze(hero);
    this.heroService
      .CreateHero(hero)
      .then(() => {
        this.router.navigateByUrl("/game");
      });
  }

}
