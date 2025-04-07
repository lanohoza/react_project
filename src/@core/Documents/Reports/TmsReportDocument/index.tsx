import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { ActivitiesReportDto } from '@core/types/models/reports/AcivirtiesReportTypes';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';
import { TmsReportDto } from '@core/types/models/reports/TmsReportTypes';
import { environment } from '../../../../envirenement/environnement';

// Register the ARIAL font
Font.register({
  family: 'ARIAL',
  src: `${environment?.BASE_PATH ?? ''}/fonts/Almarai-Regular.ttf`, // Adjust this path to the actual location of the font file
});

// Styles for the document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: 'ARIAL',
  },
  headerSubTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 700,
    fontFamily: 'ARIAL',
  },
  NormalText: {
    display: 'flex',
    fontSize: 16,

    fontWeight: 700,
    fontFamily: 'ARIAL',
    textAlign: 'right',
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 700,
    fontFamily: 'ARIAL',
    textAlign: 'right',
  },
  sectionTitle: {
    margin: '80px 0',
  },
  documentTitle: {
    fontSize: 32,
    margin: '10px 0',
    textAlign: 'center',
    fontFamily: 'ARIAL',
  },
  footer: {
    marginTop: 220,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'ARIAL',
  },
});

// Styles for the table
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

// Function to chunk data into pages
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};
const ROWS_PER_PAGE = 30; // Define how many rows fit per page (Adjust based on your layout)
interface Prop {
  datasource: TmsReportDto;
}
const ActivityReportDocument = ({ datasource }: Prop) => {
  /*const [dataChunks, setDataChunks] = useState([]);
  useEffect(() => {
    console.log(datasource);

    setDataChunks(chunkArray(datasource?.tasks ?? [], ROWS_PER_PAGE));
  }, [datasource?.tasks]);*/

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
        </View>

        <View style={[styles.section, styles.sectionTitle]}>
          <Text style={styles.documentTitle}>التقرير الفصلي لنشاطات</Text>
          <Text style={styles.documentTitle}>الفصل : الاول</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            مستشار التوجيه : {datasource.userName}
          </Text>
          <Text style={styles.text}>
            الوظعية المهنية : مرسم
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            للسنة الدراسية {datasource.yearTitle}
          </Text>
        </View>
      </Page>

      <Page size='A4' style={tableStyles.page}>
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
              <Text style={styles.NormalText}>التعريف بقطاع التدخل</Text>
              <Text style={styles.NormalText}>-1 </Text>
            </View>
          </View>
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
              <Text style={[styles.NormalText, { fontSize: 14 }]}>
                تقديم قطاع التدخل{' '}
              </Text>
              <Text style={[styles.NormalText, { fontSize: 14 }]}>-1-1 </Text>
            </View>
          </View>
          {datasource.type == TypeEstablishment.SECONDARY && (
            <View style={tableStyles.table}>
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '33.33%' }]}>
                  <Text style={tableStyles.tableCellHeader}> ثالثة ثانوي</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '33.33%' }]}>
                  <Text style={tableStyles.tableCellHeader}>ثانية ثانوي</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '33.33%' }]}>
                  <Text style={tableStyles.tableCellHeader}> أولى ثانوي</Text>
                </View>
              </View>
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد الافواج</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد الافواج</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد الافواج</Text>
                </View>
              </View>
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.thirdNumberOfStudent}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.thirdNumberOfClass}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.secondNumberOfStudent}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.secondNumberOfClass}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.firstNumberOfStudent}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '16.66%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.firstNumberOfClass}
                  </Text>
                </View>
              </View>
            </View>
          )}
          {datasource.type == TypeEstablishment.MIDDLE && (
            <View style={tableStyles.table}>
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>رابعة متوسط</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>ثالثة متوسط</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>ثانية متوسط</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>أولى متوسط</Text>
                </View>
              </View>
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '12.255%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد الافواج</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد الافواج</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد الافواج</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد التلاميذ</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>عدد الافواج</Text>
                </View>
              </View>
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.fourthNumberOfStudent}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.fourthNumberOfClass}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.thirdNumberOfStudent}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.thirdNumberOfClass}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.secondNumberOfStudent}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.secondNumberOfClass}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.firstNumberOfStudent}
                  </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '12.25%' }]}>
                  <Text style={tableStyles.tableCellHeader}>
                    {datasource.globalData.firstNumberOfClass}
                  </Text>
                </View>
              </View>
            </View>
          )}
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
              <Text style={[styles.NormalText, { fontSize: 14 }]}>
                تنظيم أدوات العمل{' '}
              </Text>
              <Text style={[styles.NormalText, { fontSize: 14 }]}>-2-1 </Text>
            </View>
          </View>
          <View style={tableStyles.table}>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '50%' }]}>
                <Text style={tableStyles.tableCellHeader}>الملاحظات</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '50%' }]}>
                <Text style={tableStyles.tableCellHeader}>النشاط المنجز</Text>
              </View>
            </View>
            {datasource?.tasks?.map(task => (

              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '50%' }]}>
                  <Text style={tableStyles.tableCell}></Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '50%' }]}>
                  <Text style={tableStyles.tableCell}>{task.title}</Text>
                </View>
              </View>
            ))}

          </View>

          <View style={{ marginTop: '10px' }}>
            <Text
              style={[styles.NormalText, { fontSize: 16, textAlign: 'center' }]}
            >
              {' '}
              مؤسسات التكوين المعنية بالاستقصاء :{' '}
              {'مركز التكوين المهني الوادي 1 '}{' '}
            </Text>
          </View>
        </View>
      </Page>
      {/***dataChunks?.map((chunk, pageIndex) => (
        <Page key={pageIndex + 1} size='A4' style={tableStyles.page}>
          <View style={tableStyles.table}>
            <View style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '15%' }]}>
                <Text style={tableStyles.tableCellHeader}>الملاحظات</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '60%' }]}>
                <Text style={tableStyles.tableCellHeader}>عنوان النشاط</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '15%' }]}>
                <Text style={tableStyles.tableCellHeader}>التاريخ</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
                <Text style={tableStyles.tableCellHeader}>الرقم</Text>
              </View>
            </View>

            {chunk.map((row, index) => (
              <View style={tableStyles.tableRow} key={index}>
                <View style={[tableStyles.tableCol, { flexBasis: '15%' }]}>
                  <Text style={tableStyles.tableCell}>{row.note}</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '60%' }]}>
                  <Text style={tableStyles.tableCell}>{row.title}</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '15%' }]}>
                  <Text style={tableStyles.tableCell}>{row.date}</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
                  <Text style={tableStyles.tableCell}>
                    {index + 1 + pageIndex * ROWS_PER_PAGE}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      ))**/}
    </Document>
  );
};
export default ActivityReportDocument;
