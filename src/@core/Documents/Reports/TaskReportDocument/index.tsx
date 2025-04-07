import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { TaskReportDto } from '@core/types/models/reports/TaskReportTypes';
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
    margin: 2.5,
    padding: 2.5,
  },
  headerTitle: {
    fontSize: 16,
    color: "black",
    fontWeight: 700,
    textAlign: "center",
    fontFamily: 'ARIAL',
  },
  headerSubTitle: {
    fontSize: 14,
    color: "black",
    fontWeight: 700,
    fontFamily: 'ARIAL',
  },
  text: {
    fontSize: 10,
    color: "black",
    fontFamily: 'ARIAL',
    textAlign: "right",
  },
  documentTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: "bold",
    fontFamily: 'ARIAL',
  },
  footer: {
    marginTop: 280,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: 'ARIAL',
  }
});

// Styles for the table
const tableStyles = StyleSheet.create({
  page: {
    padding: 20,
  },
  table: {
    display: "table",
    width: "100%", // Ensure the table spans the full width of the page
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#bfbfbf',
    fontFamily: 'ARIAL',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: "center",
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    textAlign: "center",
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
  datasource: TaskReportDto
}
const TaskReportDocument = ({ datasource }: Prop) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.headerTitle}>الجمهورية الجزائرية الديمقراطية الشعبية</Text>
          <Text style={styles.headerTitle}>وزارة التربية الوطنية</Text>
        </View>

        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.headerSubTitle}>{datasource.establishmentName}</Text>
            <Text style={styles.headerSubTitle}> مديرية التربية لولاية {datasource.wilayaName}  </Text>
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={styles.documentTitle}>تقرير إنجاز نشاط   </Text>
        </View>

        <View style={[styles.section, { flexDirection: 'row', justifyContent: "flex-end", marginBottom: 20 }]}>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 14 }]}>  السنة الدراسية :{datasource.yearTitle}-  </Text>
          <Text style={[styles.text, { fontWeight: "bold", fontSize: 14 }]}>  رقم التقرير :2025/2024    </Text>
        </View>
        <View style={[{ marginBottom: 20 }]}>
          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>       عنوان النشاط المنجز:  النشاط الاول   </Text>
          </View>
          <View style={[styles.section, { flexDirection: 'row', justifyContent: "space-between", marginRight: 20 }]}>
            <Text style={styles.text}>  في الاسبوع :{datasource.weekTitle} </Text>
            <Text style={styles.text}> في الشهر : {datasource.monthTitle}  </Text>
            <Text style={styles.text}> خلال الفصل : {datasource.trimestreTitle}   </Text>

          </View>
        </View>
        <View style={[{ marginBottom: 20 }]}>

          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>   : طبقا لما ورد في النصوص الرسمية التالية    </Text>
          </View>
          {datasource?.officialTxts?.map(officialTxt => (
            <View style={[styles.section, { flexDirection: 'row', justifyContent: "flex-end", marginRight: 20 }]}>
              <Text style={styles.text}>   {officialTxt.date}: المؤرخ في  </Text>
              <Text style={styles.text}> الذي ينص على : {officialTxt.title}     </Text>
              <Text style={styles.text}>   {officialTxt.number}: الرقم  </Text>
            </View>))}
        </View>
        <View style={[{ marginBottom: 20 }]}>

          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>    :  فقد قمنا بإنجاز النشاط التالي           </Text>
          </View>
          <View style={[styles.section, { marginRight: 20 }]}>
            <Text style={styles.text}>         {datasource.taskTitle}: عنوان النشاط المنجز -         </Text>
          </View>

          <View style={[styles.section, { marginRight: 30 }]}>
            <Text style={styles.text}>       	  : العمليات </Text>
            {datasource?.actionTitles?.map(actionTitle => (

              <Text style={[styles.text, { marginRight: 30 }]}>
                {actionTitle} - </Text>))}
          </View>
        </View>
        <View style={[{ marginBottom: 20 }]}>

          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>       : بغية تحقيق الأهداف التالية           </Text>
          </View>


          <View style={[styles.section, { marginRight: 30 }]}>
            <Text style={styles.text}>: الاهداف العامة للنشاط      </Text>

            {datasource?.generalObjectsTitles?.map(generalObjectsTitle => (

              <Text style={[styles.text, { marginRight: 30 }]}>  	{generalObjectsTitle} -     </Text>))}
          </View>
        </View>
        <View style={[{ marginBottom: 20 }]}>

          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}>  :	و قد كانت الوسائل المسخرة في إتمام إنجاز هذا النشاط هي التالية -      </Text>
          </View>
          <View style={[styles.section, { marginRight: 15 }]}>
            <Text style={styles.text}>:  الوسائل المستعملة في النشاط       </Text>
          </View>

          <View style={[styles.section, { marginRight: 30 }]}>
            <Text style={styles.text}> :  	البشرية -  </Text>
            {datasource?.humanTools?.map(humanTool => (

              <Text style={[styles.text, { marginRight: 30 }]}> 	{humanTool} <ol className="">
                <li className=""></li>
              </ol> </Text>
            ))}
          </View>



          <View style={[styles.section, { marginRight: 20 }]}>
            <Text style={styles.text}>  : 	المادية -   </Text>
            <Text style={[styles.text, { marginRight: 30 }]}> 	{datasource.materielToots}  -</Text>

          </View>

        </View>
        <View style={[{ marginBottom: 20 }]}>

          <View style={styles.section}>
            <Text style={[styles.text, { fontWeight: "bold", fontSize: 16 }]}> : اما الصعوبات المعترضة التي أعاقت إنجاز النشاط فقد تمثلت في   </Text>
          </View>


        </View>
      </Page>

    </Document >);

};
export default TaskReportDocument;
