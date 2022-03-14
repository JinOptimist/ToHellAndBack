import { Component, OnInit } from '@angular/core';
import { MazeStatus } from 'src/app/enum/MazeStatus';
import { IHero } from 'src/app/models/IHero';
import { IMaze } from 'src/app/models/IMaze';
import { IMazeLevel } from 'src/app/models/IMazeLevel';
import { HeroService } from 'src/app/services/maze/HeroService';
import { HeroRepository } from 'src/app/services/repositories/HeroRepository';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  hero: IHero;
  currentLevel: IMazeLevel;
  roomsLeft: number;
  CompleteValue: MazeStatus = MazeStatus.Complete;
  InProgressValue: MazeStatus = MazeStatus.InProgress;
  InFight: MazeStatus = MazeStatus.InFight;

  constructor(private heroRepository: HeroRepository) { }

  ngOnInit(): void {
    //TODO get hero from auth user
    const heroName = localStorage.getItem('currentHero');
    this.hero = this.heroRepository.Get(heroName);
    if (this.hero.maze) {
      this.currentLevel = this.hero.maze.levels[this.hero.maze.heroCurrentLevelNumber];
      this.roomsLeft = 0;
      if (!!this.currentLevel.rooms) {
        this.roomsLeft = this.currentLevel.rooms.length;
      }
    }
  }
}
