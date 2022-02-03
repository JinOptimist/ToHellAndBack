import { IHero } from "../IHero";

export abstract class BaseRooms {
     abstract roomName: string;
     abstract exploreRoom(hero: IHero): void;
}