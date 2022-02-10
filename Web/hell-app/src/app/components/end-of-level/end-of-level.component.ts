import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/maze/HeroService';

@Component({
  selector: 'app-end-of-level',
  templateUrl: './end-of-level.component.html',
  styleUrls: ['./end-of-level.component.scss']
})

export class EndOfLevelComponent implements OnInit {
  hero: IHero;

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  ngOnInit(): void {
    this.hero = this.heroService.GetCurrentHero();
  }

  GoNext(){
    this.router.navigateByUrl('/game');
  }

  GoHome(){
    this.router.navigateByUrl('/leave-from-dungeon');
  }
}
