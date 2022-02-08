import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";
import { RoomType } from "./RoomType";

export class GoblinNestRoom extends BaseRooms {
    roomType: RoomType = RoomType.GoblinNestRoom;
    roomName: string;

    constructor(public goblinCount: number) {
        super();
        this.roomName = `Гнездо гоблинов (+${goblinCount})`;
    }
}