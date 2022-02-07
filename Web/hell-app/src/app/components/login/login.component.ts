import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroService } from 'src/app/services/HeroService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public heroName!: string;
  public error!: string;
  //public password!: string;

  constructor(
    private heroService: HeroService,
    private router: Router) { }

  ngOnInit(): void {
  }

  getHero() {
    this
      .heroService.LoadHero(this.heroName)
      .then(hero => {
        if (!!hero) {
          this.router.navigateByUrl("/game");
        } else {
          this.error = "Hero doesn't found";
        }
      });
  }
}
