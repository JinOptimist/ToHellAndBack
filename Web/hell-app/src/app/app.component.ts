import { Component } from '@angular/core';
import { HeroService } from './services/HeroService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  isLoading: boolean = true;
  isHero: boolean = false;

  constructor(private heroService: HeroService){
    this.isLoading = !!heroService.GetCurrentHero();
  }
}
