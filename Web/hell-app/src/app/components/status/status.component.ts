import { Component, Input, OnInit } from '@angular/core';
import { MazeStatus } from 'src/app/enum/MazeStatus';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/maze/HeroService';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  @Input() hero: IHero;
  staminPercent: number;
  InProgressValue: MazeStatus = MazeStatus.InProgress;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.staminPercent = this.hero.stamina / this.hero.maxStamina * 100;
  }
}
