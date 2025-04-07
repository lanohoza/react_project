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
import { CurrentYearProgramDto } from '@core/types/models/documents/YearProgramDocumentTypes';
import { environment } from '../../../envirenement/environnement';

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
    fontFamily: 'ARIAL',
  },
  headerSubTitle: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    fontWeight: 700,
    fontFamily: 'ARIAL',
  },
  text: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    fontWeight: 700,
    fontFamily: 'ARIAL',
    textAlign: 'right',
    width: 200,
  },
  textRight: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
    fontWeight: 700,
    fontFamily: 'ARIAL',
    textAlign: 'right',
    width: '100%',
  },
  documentTitle: {
    fontSize: 22,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'ARIAL',
  },
  footer: {
    marginTop: 10,
  },
  footerText: {
    textAlign: 'left',
    fontFamily: 'ARIAL',
  },
});

const tableStyles = StyleSheet.create({
  table: {
    display: 'table',
    width: '100%',
    marginTop: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(0, 0, 0)',
    fontFamily: 'ARIAL',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    fontFamily: 'ARIAL',
    textAlign: 'center',

  },
});

interface Prop {
  datasource: CurrentYearProgramDto;
}

const YearProgramDocument = ({ datasource }: Prop) => {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.headerTitle}>
            الجمهورية الجزائرية الديمقراطية الشعبية
          </Text>
          <Text style={styles.headerTitle}>وزارة التربية الوطنية</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.headerSubTitle}>
              {datasource.establishmentName}

            </Text>
            <Text style={styles.headerSubTitle}>
              مديرية التربية لولاية {datasource.wilayaName}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.documentTitle, { fontSize: 18 }]}>
            البرنامج السنوي التقديري للنشاطات مستشار التوجيه والإرشاد المدرسي
            والمهني
          </Text>
          <Text style={[styles.documentTitle, { fontSize: 16 }]}>
            : الموسم الدراسي {datasource.yearTitle}
          </Text>
        </View>

        <View style={tableStyles.table}>
          <View style={[tableStyles.tableRow, { backgroundColor: '#bfbfbf' }]}>
            <View style={[tableStyles.tableCol, { flexBasis: '40%' }]}>
              <Text style={tableStyles.tableCellHeader}> الأهداف العامة </Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '40%' }]}>
              <Text style={tableStyles.tableCellHeader}> النشاط </Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
              <Text style={tableStyles.tableCellHeader}> الأسبوع </Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
              <Text style={tableStyles.tableCellHeader}> الشهر </Text>
            </View>
          </View>

          {datasource?.tasks?.map((task, index) => (
            <View key={index} style={tableStyles.tableRow}>
              <View style={[tableStyles.tableCol, { flexBasis: '40%' }]}>
                {task.generalObjectsTitles?.map((generalObject, subIndex) =>
                  generalObject?.value ? (
                    <Text  
                      key={`${generalObject.value}-${subIndex}`}
                      style={tableStyles.tableCell}
                    >
                      {generalObject.value.normalize()}
                    </Text>
                  ) : null
                )}
              </View>

              <View style={[tableStyles.tableCol, { flexBasis: '40%' }]}>
                <Text style={tableStyles.tableCell}>{task.taskTitle}</Text>
              </View>

              <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
                <Text style={tableStyles.tableCell}>{task.week}</Text>
              </View>

              <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
                <Text style={tableStyles.tableCell}>{task.month}</Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={[
            styles.footer,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 50,
              paddingLeft: 50,
            },
          ]}
        >
          <Text style={[styles.footerText, { fontSize: 14 }]}> مدير المؤسسة</Text>
          <Text style={[styles.footerText, { fontSize: 14 }]}>
            مدير مركز التوجيه
          </Text>
          <Text style={[styles.footerText, { fontSize: 14 }]}> مستشار التوجيه </Text>
        </View>
      </Page>
    </Document>
  );
};

export default YearProgramDocument;
