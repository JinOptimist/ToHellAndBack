import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { FirebaseHelper } from 'src/app/services/FirebaseHelper';
import { HeroService } from 'src/app/services/HeroService';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  hero!: IHero;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.hero = this.heroService.GetCurrentHero();
  }
}
