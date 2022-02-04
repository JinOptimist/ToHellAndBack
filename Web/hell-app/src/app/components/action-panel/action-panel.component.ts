import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { FirebaseHelper } from 'src/app/services/FirebaseHelper';
import { GameEventsService } from 'src/app/services/GameEventsService';
import { MazeBuilder } from 'src/app/services/maze/mazeBuilder';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent implements OnInit {
  public hero!: IHero;
  private currentLevel: number;

  constructor(
    private firebaseHelper: FirebaseHelper,
    private mazeBuilder: MazeBuilder,
    private gameEventsService: GameEventsService) {
    //this.hero = firebaseHelper.GetHero();
    this.currentLevel = 0;
  }

  ngOnInit(): void {
    this.firebaseHelper.GetHeroAsync().then(data=>{
      this.hero = data.val();
    })
  }

  public GoDeep(): void {
    this.currentLevel++;
    const mazeLevel = this.mazeBuilder.BuildLevel(this.currentLevel);
    mazeLevel.rooms.forEach((room, index) => {
      setTimeout(() => {
        room.exploreRoom(this.hero);
        this.gameEventsService.StoreAllEventsMessage(
          `Герой обследовал комнату ${room.roomName}`
        );
      }, 1000 / 2 * index);
    });
  }

  public GoBack(): void {
    console.log('go back');
    this.hero.stamina--;
    this.currentLevel--;
  }

  public SaveHero(){
    this.firebaseHelper.CreateHero();
  }
}
