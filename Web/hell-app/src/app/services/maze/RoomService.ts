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
    public CountOfRoomToChoose: number = 3;

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
                this.CheckGoblinNestRoom(room as GoblinNestRoom, hero, currentLevel);
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

        this.gameEventsService.StoreAllEventsMessage(
            `Герой обследовал комнату ${room.roomName}`
        );

        this.RemoveRoomInvestigatedRoomAndSaveProgress(room, hero, currentLevel);
    }

    public GetAroundRoom(room: BaseRooms, hero: IHero, currentLevel: IMazeLevel) {
        this.gameEventsService.StoreAllEventsMessage(
            `Герой обследовал комнату ${room.roomName}`
        );

        hero.stamina -= hero.staminCostToAvoidRoom;

        this.RemoveRoomInvestigatedRoomAndSaveProgress(room, hero, currentLevel);
    }

    public UpdateAvailableRooms(hero: IHero): BaseRooms[] {
        const maze = hero.maze;
        const currentLevel = maze.levels[maze.heroCurrentLevelNumber];
        this.ShuffleRooms(currentLevel.rooms);
        return currentLevel.rooms.slice(0, this.CountOfRoomToChoose);
    }

    private RemoveRoomInvestigatedRoomAndSaveProgress(room: BaseRooms, hero: IHero, currentLevel: IMazeLevel) {
        const index = currentLevel.rooms.indexOf(room, 0);
        if (index > -1) {
            currentLevel.rooms.splice(index, 1);
        }

        this.heroService.HeroWasUpdated(hero);

        //!!!!!!!!!! Save progress
        this.heroService.SaveCurrentHero();
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

    private CheckGoblinNestRoom(room: GoblinNestRoom, hero: IHero, currentLevel: IMazeLevel) {
        hero.stamina -= room.goblinCount;
        hero.coins += room.goblinCount * 2;
        currentLevel.defense += room.goblinCount;
    }

    private CheckTreasuryRoom(room: TreasuryRoom, hero: IHero) {
        hero.coins += room.coinsCount;
        hero.stamina--;
    }

    private CheckStairsDown(room: StairsDown, hero: IHero) {
        hero.maze.heroCurrentLevelNumber++;
    }
}