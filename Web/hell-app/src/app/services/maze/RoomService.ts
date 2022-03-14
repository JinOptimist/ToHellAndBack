import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MazeStatus } from "src/app/enum/MazeStatus";
import { RoomType } from "src/app/enum/RoomType";
import { IHero } from "src/app/models/IHero";
import { IMazeLevel } from "src/app/models/IMazeLevel";
import { BaseRooms } from "src/app/models/Rooms/BaseRooms";
import { EmptyRoom } from "src/app/models/Rooms/EmptyRoom";
import { GoblinNestRoom } from "src/app/models/Rooms/GoblinNestRoom";
import { StairsDown } from "src/app/models/Rooms/StairsDown";
import { TreasuryRoom } from "src/app/models/Rooms/TreasuryRoom";
import { GameEventsService } from "../GameEventsService";
import { HeroRepository } from "../repositories/HeroRepository";
import { FightHelper } from "./FightHelper";

@Injectable({
    providedIn: 'root'
})

export class RoomService {
    public CountOfRoomToChoose: number = 3;

    constructor(
        private gameEventsService: GameEventsService,
        private heroRepository: HeroRepository,
        private fightHelper: FightHelper,
        private router: Router
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

        this.gameEventsService.addSystemMessage(
            `Герой обследовал комнату ${room.roomName}`
        );

        this.RemoveRoomInvestigatedRoomAndSaveProgress(room, hero, currentLevel);
    }

    public GetAroundRoom(room: BaseRooms, hero: IHero, currentLevel: IMazeLevel) {
        this.gameEventsService.addSystemMessage(
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
        this.HeroWasUpdated(hero);

        const index = currentLevel.rooms.indexOf(room, 0);
        if (index > -1) {
            currentLevel.rooms.splice(index, 1);
        }

        //If we complete all rooms and don't move to next level it means that maze if complete
        const currentLevelActual = hero.maze.levels[hero.maze.heroCurrentLevelNumber];
        if (currentLevelActual.rooms.length == 0) {
            hero.maze.status = MazeStatus.Complete;
            this.router.navigateByUrl('/leave-from-dungeon');
            //Nasty hack, but I don't know how also I could fix it
            currentLevelActual.rooms.push(new EmptyRoom());
        }

        //!!!!!!!!!! Save progress
        this.heroRepository.Update(hero);
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
        currentLevel.activeRoom = room;
        hero.maze.status = MazeStatus.InFight;

        // const goblinCount = room.goblins.length;
        
        // this.fightHelper.fightAgainstEnemies(hero, room.goblins);

        // this.gameEventsService.addHeroPhrase(hero, `С каждого гоблина по две монеты. Неплохо`);
        // hero.coins += goblinCount * 2;
        // currentLevel.defense += goblinCount;
    }

    private CheckTreasuryRoom(room: TreasuryRoom, hero: IHero) {
        hero.coins += room.coinsCount;
        hero.stamina--;
    }

    private CheckStairsDown(room: StairsDown, hero: IHero) {
        hero.maze.heroCurrentLevelNumber++;
    }

    public HeroWasUpdated(hero: IHero): void {
        //check for death
        if (hero.stamina <= 0) {
            this.heroRepository.Delete(hero);
            this.router.navigateByUrl('/dead');
        }
    }
}