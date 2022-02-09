import { BaseRooms } from "./BaseRooms";
import { RoomType } from "../../enum/RoomType";

export class StairsDown extends BaseRooms {
    roomType: RoomType = RoomType.StairsDown;
    roomName: string = 'Лестница вниз';
    roomDesc: string = "Спуск ведущий на следующий уровень";
}