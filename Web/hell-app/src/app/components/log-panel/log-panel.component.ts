import { Component, Input, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { GameEventsService } from 'src/app/services/GameEventsService';

@Component({
  selector: 'app-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnInit {
  @Input() hero: IHero;
  messages: string[];

  constructor(
    private gameEventsService: GameEventsService) {
    this.messages = gameEventsService.GetAllEventsMessage();
  }

  ngOnInit(): void { }
}
