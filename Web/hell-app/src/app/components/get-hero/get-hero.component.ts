import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IHero } from 'src/app/models/IHero';
import { FirebaseHelper } from 'src/app/services/FirebaseHelper';
import { HeroService } from 'src/app/services/maze/HeroService';

@Component({
  selector: 'app-get-hero',
  templateUrl: './get-hero.component.html',
  styleUrls: ['./get-hero.component.scss']
})

export class GetHeroComponent implements OnInit {
  public heroName: string = "Conan";
  public error: string;
  //public password!: string;

  public savedHeroes: IHero[];

  public savedHeroesNewV2: Observable<IHero[]>;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private firebaseHelper: FirebaseHelper) { }

  ngOnInit(): void {
    this.savedHeroesNewV2 = this.firebaseHelper.getAllHeroes();

    // this.firebaseHelper.getAllHeroes().subscribe(x =>
    //   this.savedHeroes = x
    // );
    //.then(h => this.savedHeroes = h);
  }

  getHero() {
    this.LoadHero(this.heroName);
  }

  chooseHero(heroName: string) {
    this.LoadHero(heroName);
  }

  kill(hero: IHero) {
    this.firebaseHelper.KillHero(hero.name);
    const index = this.savedHeroes.indexOf(hero, 0);
    if (index > -1) {
      this.savedHeroes.splice(index, 1);
    }
  }

  private LoadHero(heroName: string) {
    this
      .heroService.LoadHero(heroName)
      .then(hero => {
        if (!!hero) {
          this.router.navigateByUrl("/game");
        } else {
          this.error = "Hero doesn't found";
        }
      });
  }
}
