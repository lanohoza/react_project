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
import Table from "@core/Documents/Table/index copy"
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
    padding: "5px 10px",
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
    textAlign: "center",
    fontWeight: 700,
    fontFamily: 'ARIAL', // Use Tajawal font for header
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
    fontSize: 10,
    color: 'black',
    marginTop: 5,
    fontWeight: 700,
    fontFamily: 'ARIAL', // Use Tajawal font for header
    textAlign: 'right',
    width: "100%",
  },
  documentTitle: {
    fontSize: 16,
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
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  line: {
    flexDirection: 'column',
    marginBottom: 8,
  }
});

const headers = [
  { key: "taskNote", title: "ملاحظات حول إنجاز  النشاط" },
  { key: "content", title: "تعيين النشاطات" },

];
interface DailyNotebookDocumentProp {
  datasource: DailyNotebookDto
}
const DailyNotebookDocument = ({ datasource }: DailyNotebookDocumentProp) => {

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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.headerSubTitle}>{datasource.establishmentName}</Text>
            <Text style={styles.headerSubTitle}> مديرية التربية لولاية {datasource.wilayaName}  </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.headerSubTitle}>
              مستشار التوجيه و الإرشاد المدرسي و المهني{' '}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.documentTitle}>
            التقرير اليومي لنشاطات مستشار التوجيه
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.text}>السنة الدراسية: {datasource.yearTitle}</Text>
            <Text style={styles.text}>التاريخ : {datasource.day}  </Text>
            <Text style={styles.text}> رقم التقرير : {datasource.reportNumber} </Text>
          </View>
          <View style={styles.row} >
            <Text style={styles.textRigth}>: النشاطات التي تم القيام بما يلي</Text>
          </View>
        </View>
        <View style={styles.section}>
          {datasource.activities && <Table items={datasource.activities} headers={headers} ></Table>}
        </View>
        <View style={styles.section}>
          <View >
            <Text style={styles.textRigth}> : ملاحظات عامة أخرى</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.line} >
            <Text style={styles.textRigth}>.....................................................................................................................................</Text>
            <Text style={styles.textRigth}>.....................................................................................................................................</Text>
            <Text style={styles.textRigth}>.....................................................................................................................................</Text>
            <Text style={styles.textRigth}>.....................................................................................................................................</Text>
            <Text style={styles.textRigth}>.....................................................................................................................................</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}> ........................: {datasource.wilayaName} في </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DailyNotebookDocument;
