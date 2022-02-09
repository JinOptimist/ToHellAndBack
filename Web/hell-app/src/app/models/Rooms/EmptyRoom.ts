import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";
import { RoomType } from "../../enum/RoomType";

export class EmptyRoom extends BaseRooms {
    roomType: RoomType = RoomType.Empty;
    roomName: string = "Пустая комната";
    roomDesc: string = "По ту сторону двери тишина";
}