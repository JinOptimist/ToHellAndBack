import { Component, Input, OnInit } from '@angular/core';
import { MazeStatus } from 'src/app/enum/MazeStatus';
import { IHero } from 'src/app/models/IHero';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  @Input() hero: IHero;
  staminPercent: number;
  InProgressValue: MazeStatus = MazeStatus.InProgress;

  constructor() { }

  ngOnInit(): void {
    this.staminPercent = this.hero.stamina / this.hero.maxStamina * 100;
  }
}
