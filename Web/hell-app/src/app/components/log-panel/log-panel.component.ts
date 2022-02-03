import { Component, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { firebaseHelper } from 'src/app/services/dbHelper';

@Component({
  selector: 'app-log-panel',
  templateUrl: './log-panel.component.html',
  styleUrls: ['./log-panel.component.scss']
})
export class LogPanelComponent implements OnInit {
  public hero: IHero;

  constructor(private helper:firebaseHelper) {
    this.hero = helper.GetHero();
  }

  ngOnInit(): void {
  }
}
