import { LevelOfFaith } from "../enum/LevelOfFaith";
import { ICharacteristics } from "./ICharacteristics";
import { IMaze } from "./IMaze";

export interface IHero extends ICharacteristics {
    name: string;
    coins: number;
    staminCostToAvoidRoom: number;

    levelOfFaith: LevelOfFaith;

    maze: IMaze;
}