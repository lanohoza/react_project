export enum DiagnosticType {
  student = 'student',
  subject = 'subject',
  classe = 'classe',
  level = 'level',
  speciality = 'speciality',
  professor = 'professor',
  parents = 'parents',
  establishment='establishment'
}

// Define the diagnosticTypeMap object with display names
export const diagnosticTypeMap: { [key in DiagnosticType]: string } = {
  [DiagnosticType.student]: 'تلميذ',
  [DiagnosticType.subject]: 'مادة',
  [DiagnosticType.classe]: 'قسم',
  [DiagnosticType.level]: 'مستوى',
  [DiagnosticType.speciality]: 'تخصص',
  [DiagnosticType.professor]: 'أستاذ',
  [DiagnosticType.parents]: 'ولي',
  [DiagnosticType.establishment]: 'مؤسسة',
};