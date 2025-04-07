
export type TaskReportDto = {
    wilayaName: string;
    userName: string;
    establishmentName: string;
    yearTitle: string;
    taskTitle: string;
    materielToots: string;
    actionTitles: string[];
    humanTools: string[];
    generalObjectsTitles: string[];
    difficulties: string[];
    officialTxts: OfficialTxtDto[];
	 trimestreTitle: string;
	 monthTitle: string;
	 weekTitle: string;
}
export type OfficialTxtDto = {
    id: number;
    number: string;
    title: string;
    date: string;
}