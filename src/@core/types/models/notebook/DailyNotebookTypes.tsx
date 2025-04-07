import { GetActivityDto } from "../activitity/ActivitityTypes";

export type DailyNotebookDto = {
    wilayaName: string;
    userName: string;
    establishmentName: string;
    reportNumber: string;
    day: string;
    yearTitle: string;
    activities: GetActivityDto[];
    

}
