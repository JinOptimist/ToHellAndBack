import { LevelOfFaith } from "../enum/LevelOfFaith";
import { ICharacteristics } from "./ICharacteristics";

export interface IHero extends ICharacteristics {
    name: string;
    coins: number;
    staminCostToAvoidRoom: number;

    levelOfFaith: LevelOfFaith;
}