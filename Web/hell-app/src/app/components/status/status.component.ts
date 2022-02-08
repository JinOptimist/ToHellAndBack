import { Component, Input, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { IMazeLevel } from 'src/app/models/IMazeLevel';
import { HeroService } from 'src/app/services/maze/HeroService';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  @Input() hero: IHero;
  staminPercent: number;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.staminPercent = this.hero.stamina / this.hero.maxStamina * 100;
  }
}
