import { BaseRooms } from "./Rooms/BaseRooms";

export interface IMazeLevel{
    level: number;
    defense: number;
    rooms: BaseRooms[];
}