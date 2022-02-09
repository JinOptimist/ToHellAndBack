import { Component, Input, OnInit } from '@angular/core';
import { IHero } from 'src/app/models/IHero';
import { IMazeLevel } from 'src/app/models/IMazeLevel';
import { BaseRooms } from 'src/app/models/Rooms/BaseRooms';
import { GameEventsService } from 'src/app/services/GameEventsService';
import { RoomService } from 'src/app/services/maze/RoomService';

@Component({
  selector: 'app-level-research-action-panel',
  templateUrl: './level-research-action-panel.component.html',
  styleUrls: ['./level-research-action-panel.component.scss']
})
export class LevelResearchActionPanelComponent implements OnInit {
  @Input() hero: IHero;
  rooms: BaseRooms[];
  currentLevel: IMazeLevel;

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.UpdateAvailableRooms();
  }

  CheckRoom(room: BaseRooms): void {
    this.roomService.CheckRoom(room, this.hero, this.currentLevel);
    this.UpdateAvailableRooms();
  }

  UpdateAvailableRooms() {
    const maze = this.hero.maze;
    this.currentLevel = maze.levels[maze.heroCurrentLevelNumber];
    this.rooms = this.roomService.UpdateAvailableRooms(this.hero);
  }
}
