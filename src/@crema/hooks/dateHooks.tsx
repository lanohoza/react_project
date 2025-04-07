export const monthsInArabic = [
    'جانفي',
    'فيفري',
    'مارس',
    'أفريل',
    'ماي',
    'جوان',
    'جويلية',
    'أوت',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
];

export const weeks = [
    'الأسبوع الأول',
    'الأسبوع الثاني',
    'الأسبوع الثالث',
    'الأسبوع الرابع',
    'الأسبوع الخامس',
    'الأسبوع السادس',
];

export const getMonthName = (monthNumber: number) => {
    return monthsInArabic[monthNumber - 1] || '';
};

export const getWeekName = (weekNumber: number) => {
    return weeks[weekNumber - 1] || '';
};

export const getTcTupeName = (tc_type: string) => {
    switch (tc_type) {
        case "permanent": return "permanent";
        case "temporary": return "temporary";
        case "onorder": return "onorder";
    }
};
