import { environment } from "../../envirenement/environnement";
const Urls = {
    "student.template.file.download": `${environment._API}api/v1/students/export/template`,
    "student.list": `${environment?.BASE_PATH ?? ''}/students?os=true`,
    "note.template.file.download": `${environment._API}api/v1/notes/export/template`,
    "pdf.technical-cards": `${environment?.BASE_PATH ?? ''}/pdf/technical-cards`,
    "pdf.year-program": `${environment?.BASE_PATH ?? ''}/pdf/year-program`,
    "pdf.statistics.general": `${environment?.BASE_PATH ?? ''}/pdf/statistics/general`,
    "pdf.statistics.professors.breaks": `${environment?.BASE_PATH ?? ''}/pdf/statistics/professors/breaks`,
    "pdf.statistics.professors.coordinators": `${environment?.BASE_PATH ?? ''}/pdf/statistics/professors/coordinators`,
    "pdf.statistics.professors.mains": `${environment?.BASE_PATH ?? ''}/pdf/statistics/professors/mains`,
    "pdf.statistics.students.breaks": `${environment?.BASE_PATH ?? ''}/pdf/statistics/students/breaks`,
    "pdf.statistics.students.diseases": `${environment?.BASE_PATH ?? ''}/pdf/statistics/students/diseases`,
    "pdf.statistics.students.mains": `${environment?.BASE_PATH ?? ''}/pdf/statistics/students/mains`,
    "pdf.statistics.students.needs": `${environment?.BASE_PATH ?? ''}/pdf/statistics/students/needs`,
    "pdf.statistics.students.orphans": `${environment?.BASE_PATH ?? ''}/pdf/statistics/students/orphans`,
    "interview.create": `${environment?.BASE_PATH ?? ''}/interviews?os=true`,
    "interviews": `${environment?.BASE_PATH ?? ''}/interviews`,
    "followups": `${environment?.BASE_PATH ?? ''}/followups`,
    "followup.create": `${environment?.BASE_PATH ?? ''}/followups?os=true`,
    "cards.student": `${environment?.BASE_PATH ?? ''}/cards/student`,
    "cards.classe": `${environment?.BASE_PATH ?? ''}/cards/classe`,
    "cards.establishment": `${environment?.BASE_PATH ?? ''}/cards/establishment`,
    "cards.level": `${environment?.BASE_PATH ?? ''}/cards/level`,
    "cards.subject": `${environment?.BASE_PATH ?? ''}/cards/subject`,
    "cards.speciality": `${environment?.BASE_PATH ?? ''}/cards/speciality`,

};
export default Urls;