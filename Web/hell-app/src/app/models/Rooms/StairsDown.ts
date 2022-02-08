import { BaseRooms } from "./BaseRooms";
import { RoomType } from "./RoomType";

export class StairsDown extends BaseRooms {
    roomType: RoomType = RoomType.StairsDown;
    roomName: string = 'Спуск на следующий уровень';
}