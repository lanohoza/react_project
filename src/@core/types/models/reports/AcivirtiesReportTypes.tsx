import { GetActivityDto } from "../activitity/ActivitityTypes";

export type ActivitiesReportDto = {
    wilayaName: string;
    userName: string;
    establishmentName: string;
    yearTitle: string;
    activities: GetActivityDto[];


}
export type TaskReportDto = {
    title: string;
    date: String;
}
