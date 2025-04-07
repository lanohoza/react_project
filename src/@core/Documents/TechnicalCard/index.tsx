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
import { CurrentYearProgramDto, TechnicalCardDocumentDto } from '@core/types/models/documents/YearProgramDocumentTypes';
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
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  headerSubTitle: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    fontWeight: 700,
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  text: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
    marginTop: 5,
    fontFamily: 'ARIAL', // Use Tajawal font for header
    textAlign: 'right',
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
    fontSize: 22,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  documentSubTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'ARIAL', // Use Tajawal font for header
  },
  footer: {
    marginTop: 10,
  },
  footerText: {
    textAlign: 'left',
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
  tableColNoBorderBottom: {
    borderBottomWidth: 0,
  },
  tableColNoBorderTop: {
    borderTopWidth: 0,
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
    textAlign: 'center',
  },
});
interface Prop {
  datasource: TechnicalCardDocumentDto;
}

const TechnicalCardDocument = ({ datasource }: Prop) => {

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
        <View style={[styles.section, { flexDirection: "row", justifyContent: "center" }]}>

          <Text style={[styles.documentTitle, { fontSize: 18, border: "1px solid black", borderRadius: "10%", padding: 5, width: 150, }]}>
            بــطــاقة تــقــنية        </Text>
        </View>

        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.code}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: رمز البطاقة -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.title}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: عنوان النشاط -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.type}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: نوع النشاط -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.category}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: باب النشاط -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          {datasource?.audiences?.map((audience, index) => (
            (index === datasource?.audiences.length - 1 ? <Text style={[styles.text]}>{audience}</Text> : <Text style={[styles.text]}>{audience},</Text>)
          ))}
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: الجمهور المستهف -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>:  الاهداف العامة -</Text>
        </View>
        {datasource?.generalObjectsTitles?.map((generalObjectsTitle, index) => (
          <Text style={[styles.text, { fontSize: 12, marginRight: 100 }]}>{generalObjectsTitle}-</Text>
        ))}
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>:  الاهداف التنفيذية -</Text>
        </View>
        {datasource?.operateObjectsTitles?.map((operateObjectsTitle, index) => (
          <View style={[styles.section, { flexDirection: "row", justifyContent: "flex-end" }]}>
            <Text style={[styles.text, { fontSize: 12, marginRight: 90 }]}>{operateObjectsTitle}-</Text>
          </View>))}
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.materielToots}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>:   الوسائل المادية -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          {datasource?.humanTools?.map((humanTool, index) => (
            (index === datasource?.humanTools.length - 1 ? <Text style={[styles.text]}>{humanTool}</Text> : <Text style={[styles.text]}>{humanTool},</Text>)
          ))}          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>:  الوسائل البشرية  -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>:  الصعوبات المستهدفة بالنشاط  -</Text>
        </View>
        {datasource?.difficulties?.map((difficulty, index) => (
          <View style={[styles.section, { flexDirection: "row", justifyContent: "flex-end" }]}>
            <Text style={[styles.text, { fontSize: 12, marginRight: 90 }]}>{difficulty}-</Text>
          </View>))}
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.monthTitle}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>:  شهر الانجاز -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.weekTitle}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: أسبوع الانجاز -</Text>
        </View>
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: النصوص الرسمية -</Text>
        </View>
        {datasource?.officialTxts?.map((officialTxt) => (
          <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
            <Text style={[styles.text, { fontSize: 12, marginRight: 90 }]}>{officialTxt.title}-</Text>

          </View>))}
        <View style={[styles.section, , { flexDirection: "row", justifyContent: "flex-end" }]}>
          <Text style={[styles.text]}>{datasource.feedback}</Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>: مؤشر التحقق -</Text>
        </View>
        <View style={[styles.footer, { flexDirection: 'row', justifyContent: "space-between", paddingRight: 50, paddingLeft: 50 }]}>
          <Text style={[styles.footerText, { fontSize: 14 }]}> مدير المؤسسة</Text>
          <Text style={[styles.footerText, { fontSize: 14 }]}>  مدير مركز التوجيه</Text>
          <Text style={[styles.footerText, { fontSize: 14 }]}> مستشار التوجيه </Text>

        </View>
      </Page>
    </Document>
  );
};

export default TechnicalCardDocument;
