import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/maze/HeroService';
import { MazeBuilder } from 'src/app/services/maze/MazeBuilder';

@Component({
  selector: 'app-leave-from-dungeon',
  templateUrl: './leave-from-dungeon.component.html',
  styleUrls: ['./leave-from-dungeon.component.scss']
})
export class LeaveFromDungeonComponent implements OnInit {
  hero: IHero;
  spendMoney: number;
  staminaIncrease: number;

  constructor(
    private heroService: HeroService,
    private mazeBuilder: MazeBuilder) { }

  ngOnInit(): void {
    this.hero = this.heroService.GetCurrentHero();
    this.spendMoney = Math.round(this.hero.coins / 2);
    this.staminaIncrease = Math.round(this.spendMoney / 2);

    if (this.spendMoney > 30){
      const statGrowing =  Math.round(this.spendMoney / 30);
      this.hero.strength += statGrowing;
      this.hero.luck += statGrowing;
      this.hero.dexterity += statGrowing;
    }else{
      this.hero.maxStamina += this.staminaIncrease;
    }
    
    this.hero.coins -= this.spendMoney;
    this.hero.stamina = this.hero.maxStamina;
    this.hero.maze = this.mazeBuilder.BuildMaze(this.hero);
    this.heroService.SaveCurrentHero();
  }
}
