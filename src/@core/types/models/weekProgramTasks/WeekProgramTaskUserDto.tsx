import {AddEditWeekProgramTaskDtoToDocument } from '../weekProgramTasks/WeekProgramTasksTypes';

export type WeekProgramTaskUserDto = {
    username: string;
    establishmentName: string;
    wilayaName: string;
    startWeek: string;
    endWeek: string;
    weekProgramTaskDtos: AddEditWeekProgramTaskDtoToDocument[];
}