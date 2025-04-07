import { OfficielTextCategory } from "../officielTextCategory/OfficielTextCategoryTypes";

export type OfficialTxt = {
    id?: number;
    number: string;
    title: string;
    date: string;
    idOfficielTextCategory: number;
}
