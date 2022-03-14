import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { IMazeLevel } from 'src/app/models/IMazeLevel';
import { BaseRooms } from 'src/app/models/Rooms/BaseRooms';
import { RoomType } from 'src/app/enum/RoomType';
import { GameEventsService } from 'src/app/services/GameEventsService';
import { RoomService } from 'src/app/services/maze/RoomService';
import { Router } from '@angular/router';
import { MatRipple } from '@angular/material/core';
import { LevelOfFaith } from 'src/app/enum/LevelOfFaith';
import { RandomService } from 'src/app/services/RandomService';
import { MazeStatus } from "src/app/enum/MazeStatus";

@Component({
  selector: 'app-level-research-action-panel',
  templateUrl: './level-research-action-panel.component.html',
  styleUrls: ['./level-research-action-panel.component.scss']
})
export class LevelResearchActionPanelComponent implements OnInit {
  @Input() hero: IHero;
  rooms: BaseRooms[];
  currentLevel: IMazeLevel;
  private timeAutoClick: number = 100;

  @ViewChildren(MatRipple) ripple: QueryList<MatRipple>;
  color: string = "red";

  constructor(
    private roomService: RoomService,
    private randomService: RandomService,
    private router: Router) { }

  ngOnInit(): void {
    this.UpdateAvailableRooms();

    if (this.hero.levelOfFaith == LevelOfFaith.Low) {
      setTimeout(() => {
        this.HeroChooseRandomRoom();
      }, this.timeAutoClick);
    }
  }

  HeroChooseRandomRoom() {
    if (this.hero.maze.status == MazeStatus.InFight) {
      setTimeout(() => { this.HeroChooseRandomRoom(); }, 100);
      return;
    }

    const randomIndex = this.randomService.getRandomInt(0, this.rooms.length - 1);
    let oneRipple = this.ripple.filter((item, index) => index == randomIndex)[0];
    oneRipple.launch({ centered: true });
    setTimeout(() => {
      const randomRoom = this.rooms[randomIndex];
      if (this.IsNotExit(randomRoom)) {
        this.CheckRoom(randomRoom);

        if (this.rooms.length > 0) {
          setTimeout(() => {
            this.HeroChooseRandomRoom();
          }, this.timeAutoClick);
        }
      } else {
        this.EndOfLevel(randomRoom);
      }
    }, this.timeAutoClick + 100);
  }

  CheckRoom(room: BaseRooms): void {
    this.roomService.CheckRoom(room, this.hero, this.currentLevel);
    this.UpdateAvailableRooms();
  }

  GetAroundRoom(room: BaseRooms): void {
    this.roomService.GetAroundRoom(room, this.hero, this.currentLevel);
    this.UpdateAvailableRooms();
  }

  UpdateAvailableRooms() {
    const maze = this.hero.maze;
    this.currentLevel = maze.levels[maze.heroCurrentLevelNumber];
    this.rooms = this.roomService.UpdateAvailableRooms(this.hero);
  }

  IsNotExit(room: BaseRooms): boolean {
    return room.roomType != RoomType.StairsDown;
  }

  EndOfLevel(room: BaseRooms) {
    this.roomService.CheckRoom(room, this.hero, this.currentLevel);
    this.router.navigateByUrl('/end-of-level');
  }


}
