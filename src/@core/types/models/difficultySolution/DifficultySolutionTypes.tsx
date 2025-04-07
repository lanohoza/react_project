import { Difficulty } from "../difficulty/DifficultyTypes";
import { Solution } from "../solution/SolutionTypes";
import { User } from "../user/UserTypes";

export type DifficultySolution = {
    id?: number;
    difficultyId:Difficulty;
    solutionId:Solution;
    createdBy?: number;
}