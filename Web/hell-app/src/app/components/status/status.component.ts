import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { IMazeLevel } from 'src/app/models/IMazeLevel';
import { HeroService } from 'src/app/services/HeroService';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  hero: IHero;
  staminPercent: number;
  maze: IMazeLevel;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.hero = this.heroService.GetCurrentHero();
    this.staminPercent = this.hero.stamina / this.hero.maxStamina * 100;
  }
}
