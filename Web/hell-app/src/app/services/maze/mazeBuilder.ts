import { Injectable } from "@angular/core";
import { IMazeLevel } from "src/app/models/IMazeLevel"
import { BaseRooms } from "src/app/models/Rooms/BaseRooms"
import { EmptyRoom } from "src/app/models/Rooms/EmptyRoom";
import { TreasuryRoom } from "src/app/models/Rooms/TreasuryRoom";

@Injectable({
    providedIn: 'root'
})

export class MazeBuilder {
    BuildLevel(level: number): IMazeLevel {
        const mazeLevel = <IMazeLevel>{
            level: level,
            defense: 0,
            rooms: []
        };

        const roomCount = level * 3;
        for (let i = 0; i < roomCount; i++) {
            let room: BaseRooms;
            if (i % 3 == 1) {
                room = new EmptyRoom();
            } else {
                room = new TreasuryRoom(3);
            }
            mazeLevel.rooms.push(room);
        }

        return mazeLevel
    }
}