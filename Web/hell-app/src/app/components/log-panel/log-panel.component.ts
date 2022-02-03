import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { firebaseHelper } from 'src/app/services/dbHelper';
import { GameEventsService } from 'src/app/services/GameEventsService';

@Component({
  selector: 'app-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnInit {
  public hero: IHero;
  messages: string[];

  constructor(
    private helper:firebaseHelper,
    private gameEventsService: GameEventsService) {
    this.hero = helper.GetHero();
    this.messages = gameEventsService.GetAllEventsMessage();
  }

  ngOnInit(): void {
  }
  
  public udpate():void{
    this.messages = this.gameEventsService.GetAllEventsMessage();
  }
}
