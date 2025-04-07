import { GetStudentDto, Student } from "../student/StudentTypes";

export type GuidanceGroup = {
    id: number;
    title: string;
    idStudents: number[];
    studentCount: number;
    studentDtos: GetStudentDto[];
}
export type GetGuidanceGroupDto = {
    id: number;
    title: string;
    idStudents: number[];
    studentCount: number;
    studentDtos: GetStudentDto[];
}