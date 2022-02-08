import { Injectable } from "@angular/core";
import { IHero } from "src/app/models/IHero";
import { IMazeLevel } from "src/app/models/IMazeLevel";
import { BaseRooms } from "src/app/models/Rooms/BaseRooms";
import { EmptyRoom } from "src/app/models/Rooms/EmptyRoom";
import { GoblinNestRoom } from "src/app/models/Rooms/GoblinNestRoom";
import { RoomType } from "src/app/models/Rooms/RoomType";
import { StairsDown } from "src/app/models/Rooms/StairsDown";
import { TreasuryRoom } from "src/app/models/Rooms/TreasuryRoom";
import { GameEventsService } from "../GameEventsService";

@Injectable({
    providedIn: 'root'
})

export class RoomService {
    constructor(private gameEventsService: GameEventsService) { }

    public CheckRoom(room: BaseRooms, hero: IHero, currentLevel: IMazeLevel) {
        switch (room.roomType) {
            case RoomType.Empty:
                this.CheckEmpty(room as EmptyRoom, hero);
                break;
            case RoomType.GoblinNestRoom:
                this.CheckGoblinNestRoom(room as GoblinNestRoom, hero);
                break;
            case RoomType.TreasuryRoom:
                this.CheckTreasuryRoom(room as TreasuryRoom, hero);
                break;
            case RoomType.StairsDown:
                this.CheckStairsDown(room as StairsDown, hero);
                break;
            default:
                throw new Error("Unexpected room type: " + room.roomType);
        }

        const index = currentLevel.rooms.indexOf(room, 0);
        if (index > -1) {
            currentLevel.rooms.splice(index, 1);
        }

        this.gameEventsService.StoreAllEventsMessage(
            `Герой обследовал комнату ${room.roomName}`
        );
    }

    private CheckEmpty(room: EmptyRoom, hero: IHero) {
        hero.stamina--;
    }

    private CheckGoblinNestRoom(room: GoblinNestRoom, hero: IHero) {
        hero.stamina -= room.goblinCount;
        hero.coins += room.goblinCount * 2;
    }

    private CheckTreasuryRoom(room: TreasuryRoom, hero: IHero) {
        hero.coins += room.coinsCount;
        hero.stamina--;
    }

    private CheckStairsDown(room: StairsDown, hero: IHero) {
        hero.maze.heroCurrentLevelNumber++;
    }
}