'use client';
import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { DailyNotebookDto } from '@core/types/models/notebook/DailyNotebookTypes';
import Table from '@core/Documents/Table';
import { GeneralStatisticsDto } from '@core/types/models/statistics/StatisticsType';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';
import { environment } from '../../../../envirenement/environnement';

Font.register({
  family: 'ARIAL',
  src: `${environment?.BASE_PATH ?? ''}/fonts/Almarai-Regular.ttf`, // Adjust this path to the actual location of the font file
});
// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    padding: '5px 10px',
  },
  header: {
    flexDirection: 'column',
    padding: 30,
    backgroundColor: '#ffffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  headerSubTitle: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    fontWeight: 700,
    fontFamily: 'ARIAL', // Use Tajawal font for header
    width:"40%"
  },
  text: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
    fontWeight: 700,
    fontFamily: 'ARIAL', // Use Tajawal font for header
    textAlign: 'right',
    width: 200,
  },
  textRigth: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    fontWeight: 700,
    fontFamily: 'ARIAL', // Use Tajawal font for header
    textAlign: 'right',
    width: '100%',
  },
  documentTitle: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  documentSubTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  footer: {
    marginTop: 80,
  },
  footerText: {
    textAlign: 'left',
    fontSize: 12,

    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  line: {
    flexDirection: 'column',
    marginBottom: 8,
  },
});


const tableStyles = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    display: 'table',
    width: '100%', // Ensure the table spans the full width of the page
    marginTop: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    fontFamily: 'ARIAL',
  },
  tableColNoBorderBottom: {
    borderBottomWidth: 0,
  },
  tableColNoBorderTop: {
    borderTopWidth: 0,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: 'center',
  },
});
interface Prop {
  datasource: GeneralStatisticsDto;
}

const GeneralStatisticsDocument = ({ datasource }: Prop) => {
  const [specialtiesTitletableWidth, setSpecialtiesTitletableWidth] =
    useState('100%');
  useEffect(() => {
    if (datasource.specialties?.length)
      setSpecialtiesTitletableWidth(
        100 / (datasource.specialties?.length) + 1 + '%',
      );
  }, []);
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.headerTitle}>
            الجمهورية الجزائرية الديمقراطية الشعبية
          </Text>
          <Text style={styles.headerTitle}>وزارة التربية الوطنية</Text>
        </View>

        <View style={styles.section}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.headerSubTitle}>
              {datasource.establishmentName}
            </Text>
            <Text style={styles.headerSubTitle}>

              مديرية التربية لولاية {datasource.wilayaName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.headerSubTitle}>
              مستشار التوجيه و الإرشاد المدرسي و المهني
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.documentTitle}>
            الإحصائيات العامة للمؤسسة للموسم الدراسي {datasource.yearTitle}
          </Text>
        </View>

        {datasource.type == TypeEstablishment.SECONDARY && (
          <View style={tableStyles.table}>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '23.33%' }]}>
                <Text style={tableStyles.tableCellHeader}> ثالثة ثانوي</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '23.33%' }]}>
                <Text style={tableStyles.tableCellHeader}>ثانية ثانوي</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '23.33%' }]}>
                <Text style={tableStyles.tableCellHeader}> أولى ثانوي</Text>
              </View>
              <View
                style={[
                  tableStyles.tableCol,
                  tableStyles.tableColNoBorderBottom,
                  { flexBasis: '30%' },
                ]}
              >
                <Text style={tableStyles.tableCellHeader}>المؤسسات</Text>
              </View>
            </View>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>ت</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>ف</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>ت</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>ف</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>ت</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>ف</Text>
              </View>
              <View
                style={[
                  tableStyles.tableCol,
                  tableStyles.tableColNoBorderTop,
                  { flexBasis: '30%' },
                ]}
              ></View>
            </View>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfClass}</Text>
              </View>

              <View style={[tableStyles.tableCol, { flexBasis: '30%' }]}>
                <Text style={tableStyles.tableCellHeader}>
                  {datasource.establishmentName}
                </Text>
              </View>
            </View>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '11.66%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfClass}</Text>
              </View>

              <View style={[tableStyles.tableCol, { flexBasis: '30%' }]}>
                <Text style={tableStyles.tableCellHeader}>المجموع</Text>
              </View>
            </View>
          </View>
        )}
        {datasource.type == TypeEstablishment.MIDDLE && (
          <View style={tableStyles.table}>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '17.5%' }]}>
                <Text style={tableStyles.tableCellHeader}>رابعة متوسط</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '17.5%' }]}>
                <Text style={tableStyles.tableCellHeader}>ثالثة متوسط</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '17.5%' }]}>
                <Text style={tableStyles.tableCellHeader}>ثانية متوسط</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '17.5%' }]}>
                <Text style={tableStyles.tableCellHeader}>أولى متوسط</Text>
              </View>
              <View
                style={[
                  tableStyles.tableCol,
                  tableStyles.tableColNoBorderBottom,
                  { flexBasis: '30%' },
                ]}
              >
                <Text style={tableStyles.tableCellHeader}>المؤسسات</Text>
              </View>
            </View>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ت</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ف</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ت</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ف</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ت</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ف</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ت</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>ف</Text>
              </View>
              <View
                style={[
                  tableStyles.tableCol,
                  tableStyles.tableColNoBorderTop,
                  { flexBasis: '30%' },
                ]}
              ></View>
            </View>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.fourthNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.fourthNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '30%' }]}>
                <Text style={tableStyles.tableCellHeader}>
                  {datasource.establishmentName}
                </Text>
              </View>
            </View>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.fourthNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.fourthNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.thirdNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.secondNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfStudent}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '8.75%' }]}>
                <Text style={tableStyles.tableCellHeader}>{datasource.globalData.firstNumberOfClass}</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '30%' }]}>
                <Text style={tableStyles.tableCellHeader}>المجموع</Text>
              </View>
            </View>
          </View>
        )}
        <View style={styles.section}>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'row',
                margin: '5px 0',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View></View>
            <View
              style={[
                {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                },
              ]}
            >
              <Text
                style={[
                  { fontSize: 16, fontWeight: 'bold', fontFamily: 'ARIAL' },
                ]}
              >
                إحصائيات حسب الأقسام
              </Text>
            </View>
          </View>
          <View style={tableStyles.table}>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '40%' }]}>
                <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '60%' }]}>
                <Text style={tableStyles.tableCellHeader}>الاقسام</Text>
              </View>
            </View>
            {datasource.classesData &&
              datasource.classesData?.map((row, index) => (
                <View style={tableStyles.tableRow}>
                  <View style={[tableStyles.tableCol, { flexBasis: '40%' }]}>
                    <Text style={tableStyles.tableCell}>{row.numberOfStudents} </Text>
                  </View>
                  <View style={[tableStyles.tableCol, { flexBasis: '60%' }]}>
                    <Text style={tableStyles.tableCell}>{row.title}</Text>
                  </View>
                </View>
              ))}
              
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '40%' }]}>
                <Text style={tableStyles.tableCell}>0 </Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '60%' }]}>
                <Text style={tableStyles.tableCellHeader}>المجموع</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'row',
                margin: '5px 0',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View></View>
            <View
              style={[
                {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                },
              ]}
            >
              <Text
                style={[
                  { fontSize: 16, fontWeight: 'bold', fontFamily: 'ARIAL' },
                ]}
              >

                إحصائيات حسب التخصص
              </Text>
            </View>
          </View>
          <View style={tableStyles.table}>
            <View style={tableStyles.tableRow}>
              {datasource.specialties &&
                datasource.specialties?.map((row, index) => (
                  <View
                    key={index}
                    style={[
                      tableStyles.tableCol,
                      { flexBasis: specialtiesTitletableWidth },
                    ]}
                  >
                    <Text style={tableStyles.tableCellHeader}>
                      {row.title}
                    </Text>
                  </View>
                ))}

              <View
                style={[
                  tableStyles.tableCol,
                  { flexBasis: specialtiesTitletableWidth },
                ]}
              >
                <Text style={tableStyles.tableCellHeader}>التخصصات</Text>
              </View>
            </View>
            <View style={tableStyles.tableRow}>
              {datasource.specialties &&
                datasource.specialties.map((row, index) => (
                  <View
                    key={index}
                    style={[
                      tableStyles.tableCol,
                      { flexBasis: specialtiesTitletableWidth },
                    ]}
                  >
                    <Text style={tableStyles.tableCellHeader}>
                      {row.numberOfClass}
                    </Text>
                  </View>
                ))}
              <View
                style={[
                  tableStyles.tableCol,
                  { flexBasis: specialtiesTitletableWidth },
                ]}
              >
                <Text style={tableStyles.tableCell}>الأفواج</Text>
              </View>
            </View>
            <View style={tableStyles.tableRow}>
              {datasource.specialties &&
                datasource.specialties.map((row, index) => (
                  <View
                    key={index}
                    style={[
                      tableStyles.tableCol,
                      { flexBasis: specialtiesTitletableWidth },
                    ]}
                  >
                    <Text style={tableStyles.tableCellHeader}>
                      {row.numberOfStudents}
                    </Text>
                  </View>
                ))}
              <View
                style={[
                  tableStyles.tableCol,
                  { flexBasis: specialtiesTitletableWidth },
                ]}
              >
                <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>

            ........................: {datasource.wilayaName} في
          </Text>
          <Text style={styles.footerText}> مدير المؤسسة</Text>
        </View>
      </Page>
    </Document>
  );
};

export default GeneralStatisticsDocument;
