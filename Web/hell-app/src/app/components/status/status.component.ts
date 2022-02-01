import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/Hero';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  hero: Hero;

  constructor() {
    this.hero = new Hero('Conan');
  }

  ngOnInit(): void {
  }

  public doIt(): void {
    this.hero.coins++;
  }
}
