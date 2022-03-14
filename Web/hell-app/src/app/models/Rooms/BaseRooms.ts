import { RoomType } from "../../enum/RoomType";
import { IEnemy } from "../enemies/IEnemy";

export abstract class BaseRooms {
     abstract roomName: string;
     abstract roomType: RoomType;
     abstract roomDesc: string;
     public enemies: IEnemy[] = [];
}