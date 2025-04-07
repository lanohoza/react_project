'use client';
import React from 'react';
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
import { StudentsDiseasesDto, StudentsNeedsDto } from '@core/types/models/statistics/StatisticsType';
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
  datasource: StudentsNeedsDto;
}

const StudentsNeedsDocument = ({ datasource }: Prop) => {
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
          قائمة التلاميذ المعوزين للموسم الدراسي {datasource.yearTitle}
          </Text>
        </View>

        <View style={tableStyles.table}>
          <View style={tableStyles.tableRow}>
            <View style={[tableStyles.tableCol, { flexBasis: '43.33%' }]}>
              <Text style={tableStyles.tableCellHeader}> القسم </Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '43.33%' }]}>
              <Text style={tableStyles.tableCellHeader}> الاسم واللقب </Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '13.33%' }]}>
              <Text style={tableStyles.tableCellHeader}> الرقم </Text>
            </View>
          </View>
          {datasource.students &&
            datasource.students?.map((row, index) => (
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.tableCol, { flexBasis: '43.33%' }]}>
                  <Text style={tableStyles.tableCellHeader}>{row.classTitle}</Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '43.33%' }]}>
                  <Text style={tableStyles.tableCellHeader}>{row.fullName} </Text>
                </View>
                <View style={[tableStyles.tableCol, { flexBasis: '13.33%' }]}>
                  <Text style={tableStyles.tableCellHeader}> {index + 1}</Text>
                </View>
              </View>))}
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

export default StudentsNeedsDocument;
