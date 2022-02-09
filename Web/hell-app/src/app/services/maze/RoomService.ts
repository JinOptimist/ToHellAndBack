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
import { HeroService } from "./HeroService";

@Injectable({
    providedIn: 'root'
})

export class RoomService {
    public CountOfRoomToChoose:number = 3;

    constructor(
        private gameEventsService: GameEventsService,
        private heroService: HeroService
    ) { }

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
                //!!!!!!!!!! Save progress after leave the level
                this.CheckStairsDown(room as StairsDown, hero);
                this.heroService.SaveCurrentHero();
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

    public UpdateAvailableRooms(hero: IHero): BaseRooms[] {
        const maze = hero.maze;
        const currentLevel = maze.levels[maze.heroCurrentLevelNumber];
        this.ShuffleRooms(currentLevel.rooms);
        return currentLevel.rooms.slice(0, this.CountOfRoomToChoose);
    }

    private ShuffleRooms(rooms: BaseRooms[]) {
        //It's important that we don't want shuffle last room (exit room)
        //So we add -1 to rooms length
        //https://bost.ocks.org/mike/shuffle/
        let currentIndex = rooms.length - 1;
        let randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [rooms[currentIndex], rooms[randomIndex]] = [
                rooms[randomIndex], rooms[currentIndex]];
        }
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