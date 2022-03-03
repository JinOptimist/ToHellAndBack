import { Component, Input, OnInit } from '@angular/core';
import { IEnemy } from 'src/app/models/enemies/IEnemy';
import { IHero } from 'src/app/models/IHero';
import { BaseRooms } from 'src/app/models/Rooms/BaseRooms';
import { GoblinNestRoom } from 'src/app/models/Rooms/GoblinNestRoom';
import { FightHelper } from 'src/app/services/maze/FightHelper';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {
  @Input() hero: IHero;

  enemies: IEnemy[] = [];

  activeRoom: BaseRooms;

  constructor(private fightHelper: FightHelper) { }

  ngOnInit(): void {
    const level = this.hero.maze.levels[this.hero.maze.heroCurrentLevelNumber];
    if (level.activeRoom){
      this.activeRoom = level.activeRoom;
    }
    this.enemies = this.activeRoom.enemies;
  }

  atack() {
    this.fightHelper.fightRoundWithAllEnemies(this.hero, this.enemies);
  }

}
