import { MazeStatus } from "../enum/MazeStatus";
import { IMazeLevel } from "./IMazeLevel";

export interface IMaze {
    levels: IMazeLevel[];
    heroCurrentLevelNumber: number;
    status: MazeStatus;
    
    //will decrease after each maze level generation
    mazePowerBalance: number;
}