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

  constructor(
    private heroService: HeroService,
    private mazeBuilder: MazeBuilder) { }

  ngOnInit(): void {
    this.hero = this.heroService.GetCurrentHero();
    this.hero.stamina = this.hero.maxStamina;
    this.hero.coins /= 2;
    this.hero.maze = this.mazeBuilder.BuildMaze(this.hero);
    this.heroService.SaveCurrentHero();
  }
}
