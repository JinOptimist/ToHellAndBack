import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { firebaseHelper } from 'src/app/services/dbHelper';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  hero: IHero;

  constructor(private helper:firebaseHelper) {
    this.hero = helper.GetHero();
  }

  ngOnInit(): void {
  }
}
