import { Injectable } from "@angular/core";
import { MazeStatus } from "src/app/enum/MazeStatus";
import { IHero } from "src/app/models/IHero";
import { IMaze } from "src/app/models/IMaze";
import { IMazeLevel } from "src/app/models/IMazeLevel"
import { BaseRooms } from "src/app/models/Rooms/BaseRooms"
import { EmptyRoom } from "src/app/models/Rooms/EmptyRoom";
import { GoblinNestRoom } from "src/app/models/Rooms/GoblinNestRoom";
import { StairsDown } from "src/app/models/Rooms/StairsDown";
import { TreasuryRoom } from "src/app/models/Rooms/TreasuryRoom";

@Injectable({
    providedIn: 'root'
})

export class MazeBuilder {
    BuildMaze(hero: IHero): IMaze {
        const maze = <IMaze>{
            levels: [],
            mazePowerBalance: 100,
            heroCurrentLevelNumber: 1,
            status: MazeStatus.InProgress
        };

        const mazeLevelsCount = hero.characteristics.maxStamina / 10;
        for (let index = 0; index < mazeLevelsCount; index++) {
            const mazeLevel = this.BuildLevel(index, index == mazeLevelsCount -1);
            maze.levels.push(mazeLevel);
        }

        return maze;
    }

    private BuildLevel(level: number, isLastLevel: boolean = false): IMazeLevel {
        const mazeLevel = <IMazeLevel>{
            level: level,
            defense: 0,
            rooms: []
        };

        const roomCount = level * 3;
        for (let i = 0; i < roomCount; i++) {
            let room: BaseRooms;
            if (i % 3 == 0) {
                room = new EmptyRoom();
            } else if (i % 2 == 0) {
                room = new GoblinNestRoom(Math.round(i / 2));
            }
            else {
                room = new TreasuryRoom(Math.round(i * 3 / 2));
            }
            mazeLevel.rooms.push(room);
        }

        if (!isLastLevel){
            mazeLevel.rooms.push(new StairsDown());
        }

        return mazeLevel
    }
}