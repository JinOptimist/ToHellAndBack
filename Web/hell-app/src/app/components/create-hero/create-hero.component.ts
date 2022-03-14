import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/maze/HeroService';
import { Router } from '@angular/router';
import { LevelOfFaith } from 'src/app/enum/LevelOfFaith';
import { MatSliderChange } from '@angular/material/slider';
import { MazeBuilder } from 'src/app/services/maze/MazeBuilder';

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

  freeStat: number = 15;
  initialFreeStat: number = 15;

  strength: number = 1;
  maxStrength: number;

  dexterity: number = 1;
  maxDexterity: number;

  luck: number = 1;
  maxLuck: number;

  error: string;

  constructor(
    private heroService: HeroService,
    private mazeBuilder: MazeBuilder,
    private router: Router) {
    this.updateMaxStat();
  }

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

    this.heroService
      .CreateHero(hero);

    const maze = this.mazeBuilder.BuildMaze(hero);
    this.router.navigateByUrl("/game")
  }

  addStat(statName: string) {
    switch (statName) {
      case 'strength':
        this.strength++;
        break;
      case 'dexterity':
        this.dexterity++;
        break;
      case 'luck':
        this.luck++;
        break;
      default:
        console.error('unknow stat: ' + statName);
        break;
    }

    this.updateMaxStat();
  }

  minusStat(statName: string) {
    switch (statName) {
      case 'strength':
        this.strength--;
        break;
      case 'dexterity':
        this.dexterity--;
        break;
      case 'luck':
        this.luck--;
        break;
      default:
        console.error('unknow stat: ' + statName);
        break;
    }

    this.updateMaxStat();
  }

  updateMaxStat() {
    this.freeStat = this.initialFreeStat - this.strength - this.dexterity - this.luck;
    this.maxStrength = this.getMaxStat(this.strength);
    this.maxDexterity = this.getMaxStat(this.dexterity);
    this.maxLuck = this.getMaxStat(this.luck);
  }

  private getMaxStat(stat: number) {
    const maxStat = 10;
    const diffStr = maxStat - stat;
    return diffStr < this.freeStat
      ? maxStat
      : stat + this.freeStat;
  }
}
