import { BaseRooms } from "./Rooms/BaseRooms";

export interface IMazeLevel{
    level: number;
    rooms: BaseRooms[];
}