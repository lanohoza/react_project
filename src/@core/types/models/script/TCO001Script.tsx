export interface TCO0001ClasseCardDto {
    guidanceSpecialityAverage: TCO0001ClasseGuidanceSpecialityAverage[];
    diagnostics: string[];
  }
  
  export interface TCO0001ClasseGuidanceSpecialityAverage {
    specialityTitle: string;
    average: number;
    subjectAverage1: number;
    subjectAverage2: number;
    countLess10: number;
    percentageLess10: number;
    countGreater10: number;
    percentageGreater10: number;
    countGreater14: number;
    percentageGreater14: number;
    count10_14: number;
    percentage10_14: number;
  }
  // Define the outer DTO interface
export interface TCO0001EstablishmentCardDto {
    guidanceSpecialityAverage: TCO0001EstablishmentGuidanceSpecialityAverage[];
    diagnostics: string[];
  }
  
  // Define the nested class as a separate interface
  export interface TCO0001EstablishmentGuidanceSpecialityAverage {
    specialityTitle: string;
    average: number;
    subjectAverage1: number;
    subjectAverage2: number;
    countLess10: number;
    percentageLess10: number;
    countGreater10: number;
    percentageGreater10: number;
    countGreater14: number;
    percentageGreater14: number;
    count10_14: number;
    percentage10_14: number;
  }

  // Define the outer DTO interface
export interface TCO0001LevelCardDto {
    guidanceSpecialityAverage: TCO0001LevelGuidanceSpecialityAverage[];
    diagnostics: string[];
  }
  
  // Define the nested class as a separate interface
  export interface TCO0001LevelGuidanceSpecialityAverage {
    specialityTitle: string;
    average: number;
    subjectAverage1: number;
    subjectAverage2: number;
    countLess10: number;
    percentageLess10: number;
    countGreater10: number;
    percentageGreater10: number;
    countGreater14: number;
    percentageGreater14: number;
    count10_14: number;
    percentage10_14: number;
  }

  // Define the outer DTO interface
export interface TCO0001SpecialityCardDto {
    guidanceSpecialityAverage: TCO0001SpecialityGuidanceSpecialityAverage[];
    diagnostics: string[];
  }
  
  // Define the nested static class as a separate interface
  export interface TCO0001SpecialityGuidanceSpecialityAverage {
    specialityTitle: string;
    average: number;
    subjectAverage1: number;
    subjectAverage2: number;
    countLess10: number;
    percentageLess10: number;
    countGreater10: number;
    percentageGreater10: number;
    countGreater14: number;
    percentageGreater14: number;
    count10_14: number;
    percentage10_14: number;
  }
  // Define the outer DTO interface
export interface TCO0001SubjectCardDto {
    guidanceSpecialityAverage: TCO0001SubjectGuidanceSpecialityAverage[];
    diagnostics: string[];
  }
  
  // Define the nested static class as a separate interface
  export interface TCO0001SubjectGuidanceSpecialityAverage {
    specialityTitle: string;
    average: number;
    subjectAverage: number;
  
    countLess10: number;
    percentageLess10: number;
    countGreater10: number;
    percentageGreater10: number;
    countGreater14: number;
    percentageGreater14: number;
  
    count10_14: number;
    percentage10_14: number;
  }
  export interface TCO0001StudentCardDto {
    previousLevelName: string;
    guidanceSpecialityAverage: TCO001StudentGuidanceSpecialityAverage[];
    diagnostics: string[];
  }
  // Define the nested class as a separate interface
export interface TCO001StudentGuidanceSpecialityAverage {
    average: number | null; // Using `number | null` to allow for potential null values
    rank: number | null;    // Using `number | null` to allow for potential null values
    order: number | null;   // Using `number | null` to allow for potential null values
    title: string;
  }