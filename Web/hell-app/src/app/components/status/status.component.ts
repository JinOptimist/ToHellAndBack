import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { FirebaseHelper } from 'src/app/services/FirebaseHelper';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  hero: IHero;

  constructor(private helper:FirebaseHelper) {
    this.hero = helper.GetHero();
  }

  ngOnInit(): void {
  }
}
