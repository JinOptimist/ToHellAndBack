import { Component, Input, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { IMaze } from 'src/app/models/IMaze';
import { FirebaseHelper } from 'src/app/services/FirebaseHelper';
import { GameEventsService } from 'src/app/services/GameEventsService';
import { HeroService } from 'src/app/services/maze/HeroService';
import { MazeBuilder } from 'src/app/services/maze/MazeBuilder';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent implements OnInit {
  @Input() hero: IHero;

  constructor(
    private mazeBuilder: MazeBuilder,
    private gameEventsService: GameEventsService,
    private heroService: HeroService) { }

  ngOnInit(): void {}

  public GoDeep(): void {
    // if (!this.hero.maze) {
    //   this.hero.maze = this.mazeBuilder.BuildMaze(this.hero);
    // }

    // this.hero.maze.heroCurrentLevelNumber++;
    // const mazeLevel = this.hero.maze.levels[this.hero.maze.heroCurrentLevelNumber] //this.mazeBuilder.BuildLevel(this.currentLevel);


    // mazeLevel.rooms.forEach((room, index) => {
    //   setTimeout(() => {
    //     room.exploreRoom(this.hero);
    //     this.gameEventsService.StoreAllEventsMessage(
    //       `Герой обследовал комнату ${room.roomName}`
    //     );
    //   }, 1000 / 2 * index);
    // });
  }

  public GoBack(): void {
    console.log('go back');
    this.hero.stamina--;
    //this.hero.maze.heroCurrentLevelNumber--;
  }

  public SaveHero() {
    this.heroService.SaveCurrentHero();
  }
}
