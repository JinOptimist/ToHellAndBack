import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public GoForward(): void {
    console.log('go forward');
  }

  public GoBack(): void {
    console.log('go back');
  }
}
