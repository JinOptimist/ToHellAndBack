import { IMaze } from "./IMaze";

export interface IHero {
    name: string;
    coins: number;
    stamina: number;
    maxStamina: number;
    staminCostToAvoidRoom: number;
    maze: IMaze;
}