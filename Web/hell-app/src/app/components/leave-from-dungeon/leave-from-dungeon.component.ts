import { Component, Input, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { MazeBuilder } from 'src/app/services/maze/MazeBuilder';
import { HeroRepository } from 'src/app/services/repositories/HeroRepository';

@Component({
  selector: 'app-leave-from-dungeon',
  templateUrl: './leave-from-dungeon.component.html',
  styleUrls: ['./leave-from-dungeon.component.scss']
})
export class LeaveFromDungeonComponent implements OnInit {
  @Input() hero: IHero;
  spendMoney: number;
  staminaIncrease: number;

  constructor(
    private heroRepository: HeroRepository,
    private mazeBuilder: MazeBuilder) { }

  ngOnInit(): void {
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
    this.heroRepository.Update(this.hero);
  }
}
