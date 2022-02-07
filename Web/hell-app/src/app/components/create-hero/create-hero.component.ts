import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { HeroService } from 'src/app/services/HeroService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit {
  heroStartCoins: number;
  heroName: string;
  startCoinOptions: number[] = [250, 150, 100, 50, 0];
  error: string;

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public createHero() {
    //console.log(this.heroStartCoins);
    let hero = <IHero>{
      name: this.heroName,
      coins: this.heroStartCoins - 0,
      stamina: 300 - this.heroStartCoins,
      maxStamina: 300 - this.heroStartCoins
    };
    this.heroService.CreateHero(hero).then(() => {
      this.router.navigateByUrl("/game");
    });
  }

}
