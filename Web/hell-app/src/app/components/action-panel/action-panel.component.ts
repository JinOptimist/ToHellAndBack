import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { firebaseHelper } from 'src/app/services/dbHelper';
import { GameEventsService } from 'src/app/services/GameEventsService';
import { MazeBuilder } from 'src/app/services/maze/mazeBuilder';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent implements OnInit {
  public hero: IHero;
  private currentLevel: number;

  constructor(
    private helper:firebaseHelper, 
    private mazeBuilder: MazeBuilder,
    private gameEventsService: GameEventsService) {
    this.hero = helper.GetHero();
    this.currentLevel = 0;
  }

  ngOnInit(): void {
  }

  public GoDeep(): void {
    console.log('go forward');
    this.currentLevel++;
    const mazeLevel = this.mazeBuilder.BuildLevel(this.currentLevel);
    mazeLevel.rooms.forEach(room => {
      room.exploreRoom(this.hero);
      this.gameEventsService.StoreAllEventsMessage(
        `Герой обследовал комнату ${room.roomName}`
        );
    });
  }

  public GoBack(): void {
    console.log('go back');
    this.hero.stamina--;
  }
}
