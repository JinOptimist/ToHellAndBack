import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";
import { RoomType } from "./RoomType";

export class EmptyRoom extends BaseRooms {
    roomType: RoomType = RoomType.Empty;
    roomName: string = "Пустая комната";
}