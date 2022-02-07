import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { FirebaseHelper } from 'src/app/services/FirebaseHelper';
import { GameEventsService } from 'src/app/services/GameEventsService';
import { HeroService } from 'src/app/services/HeroService';

@Component({
  selector: 'app-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnInit {
  public hero!: IHero;
  messages: string[];

  constructor(
    private heroService: HeroService,
    private gameEventsService: GameEventsService) {
    this.messages = gameEventsService.GetAllEventsMessage();
  }

  ngOnInit(): void {
    this.hero = this.heroService.GetCurrentHero();
  }
}
