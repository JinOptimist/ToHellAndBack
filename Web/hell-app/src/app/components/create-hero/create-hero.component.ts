import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/maze/HeroService';
import { Router } from '@angular/router';
import { MazeBuilder } from 'src/app/services/maze/MazeBuilder';
import { ICharacteristics } from 'src/app/models/ICharacteristics';
import { LevelOfFaith } from 'src/app/enum/LevelOfFaith';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit {
  heroName: string;

  startCoinOptions: number[] = [270, 250, 150, 100, 50, 0];
  heroStartCoins: number = this.startCoinOptions[0];

  levelOfFaithOptions: LevelOfFaith[] = [LevelOfFaith.High, LevelOfFaith.Normal, LevelOfFaith.Low];
  levelOfFaith: LevelOfFaith = this.levelOfFaithOptions[0];

  strength: number;
  dexterity: number;
  luck: number;

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
      strength: this.strength,
      dexterity: this.dexterity,
      luck: this.luck,
      stamina: 300 - this.heroStartCoins,
      maxStamina: 300 - this.heroStartCoins,
      levelOfFaith: this.levelOfFaith
    };
    hero.maze = this.mazeBuilder.BuildMaze(hero);
    this.heroService
      .CreateHero(hero)
      .then(() => {
        this.router.navigateByUrl("/game");
      });
  }
}
