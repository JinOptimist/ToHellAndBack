import { IHero } from "../IHero";
import { BaseRooms } from "./BaseRooms";
import { RoomType } from "./RoomType";

export class TreasuryRoom extends BaseRooms {
    roomType: RoomType = RoomType.TreasuryRoom;
    roomName: string;
    roomDesc: string;

    constructor(public coinsCount: number) { 
        super(); 
        this.roomName = `Сокровищница (+${coinsCount})`

        this.roomDesc = "Вас тянет в эту комнату";
    }
}