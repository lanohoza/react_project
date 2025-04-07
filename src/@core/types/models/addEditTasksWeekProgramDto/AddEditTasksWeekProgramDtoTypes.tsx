import { AddEditWeekProgramDto } from '../weekProgram/WeekProgramTypes';
import { AddEditWeekProgramTaskDto } from '../weekProgramTasks/WeekProgramTasksTypes';

export type AddEditTasksWeekProgramDto = {
    addEditWeekProgramDto: AddEditWeekProgramDto;
    weekProgramTaskDtos: AddEditWeekProgramTaskDto[];
}