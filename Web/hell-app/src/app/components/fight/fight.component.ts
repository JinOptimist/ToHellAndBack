import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { LevelOfFaith } from 'src/app/enum/LevelOfFaith';
import { IEnemy } from 'src/app/models/enemies/IEnemy';
import { IHero } from 'src/app/models/IHero';
import { BaseRooms } from 'src/app/models/Rooms/BaseRooms';
import { GoblinNestRoom } from 'src/app/models/Rooms/GoblinNestRoom';
import { FightHelper } from 'src/app/services/maze/FightHelper';
import { RandomService } from 'src/app/services/RandomService';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {
  @ViewChildren(MatRipple) ripples: QueryList<MatRipple>;

  @Input() hero: IHero;

  timeAutoClick = 300;

  enemies: IEnemy[] = [];

  activeRoom: BaseRooms;

  constructor(
    private fightHelper: FightHelper,
    private randomService: RandomService) { }

  ngOnInit(): void {
    const level = this.hero.maze.levels[this.hero.maze.heroCurrentLevelNumber];
    if (level.activeRoom) {
      this.activeRoom = level.activeRoom;
    }
    this.enemies = this.activeRoom.enemies;

    if (this.isAutoHero()) {
      setTimeout(() => {
        this.atack();
      }, this.timeAutoClick);
    }
  }

  atack() {
    this.fightHelper.fightRoundWithAllEnemies(this.hero, this.enemies);

    if (this.isAutoHero() && this.enemies.length > 0) {
      const randomIndex = this.randomService.getRandomInt(0,this.ripples.length - 1);
      let oneRipple = this.ripples.filter((item, index) => index == randomIndex)[0];
      oneRipple.launch({ centered: true });
      setTimeout(() => {
        this.atack();
      }, this.timeAutoClick);
    }
  }

  private isAutoHero() {
    return this.hero.levelOfFaith == LevelOfFaith.Low
      || this.hero.levelOfFaith == LevelOfFaith.Normal;
  }

}
