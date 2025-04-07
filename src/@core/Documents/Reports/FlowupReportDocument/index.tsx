import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { TaskReportDto } from '@core/types/models/reports/TaskReportTypes';
import { environment } from '../../../../envirenement/environnement';
import { InterviewReportDto } from '@core/types/models/interview/InterviewTypes';
import { FollowupReportDto } from '@core/types/models/followUp/FollowupTypes';
import dayjs from 'dayjs';

// Register the ARIAL font
Font.register({
  family: 'ARIAL',
  src: `${environment?.BASE_PATH ?? ''}/fonts/Almarai-Regular.ttf`, // Adjust this path to the actual location of the font file
});

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
  text: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 700,
    fontFamily: 'ARIAL',
    textAlign: 'right',
  },
  documentTitle: {
    fontSize: 45,
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 50,
    fontFamily: 'ARIAL',
  },
  footer: {
    marginTop: 280,
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
    width: '100%',
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
  tableCellHeader: {
    margin: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    margin: 5,
    fontSize: 8,
    fontFamily: 'ARIAL',
    textAlign: 'right',
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
  datasource: FollowupReportDto
}
const FlowupReportDocument = ({ datasource }: Prop) => {
  const [dataChunks, setDataChunks] = useState([]);

  useEffect(() => {
    setDataChunks(chunkArray(datasource?.flowupByDateDtos ?? [], ROWS_PER_PAGE));
  }, [datasource?.flowupByDateDtos]);

  return (
    <Document>
      {/* First Page */}
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

        <View style={styles.section}>
          <Text style={styles.documentTitle}>
            سجل المتابعات
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.text}>
            مستشار التوجيه : {datasource.userName}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            للسنة الدراسية {datasource.yearTitle}
          </Text>
        </View>
      </Page>

      {/* Subsequent Pages with Activity Data */}
      {dataChunks?.map((chunk, pageIndex) => (
        <Page key={pageIndex + 1} size='A4' style={tableStyles.page}>
          <View style={tableStyles.table}>
            {/* Table Header */}
            <View style={tableStyles.tableRow}>
      
              <View style={[tableStyles.tableCol, { flexBasis: '31%' }]}>
                <Text style={tableStyles.tableCellHeader}>الإرشاد المقترح</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '32%' }]}>
                <Text style={tableStyles.tableCellHeader}>طبيعة الصعوبة</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '30%' }]}>
                <Text style={tableStyles.tableCellHeader}> التلميذ/المجموعة</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '7%' }]}>
                <Text style={tableStyles.tableCellHeader}>الرقم</Text>
              </View>
            </View>

            {/* Table Data */}
            {chunk.map((row, index) => (
              <React.Fragment key={index}>
                {/* Group Header Row for Created Date */}
                <View style={tableStyles.tableRow}>
                  <View style={[tableStyles.tableCol, { flexBasis: '100%' }]}>
                    <Text
                      style={[tableStyles.tableCell, { textAlign:"center",fontWeight: 700, fontSize: 12 }]}
                    >
                      {dayjs(row.createdDate).format("YYYY-MM-DD HH:mm:ss")}
                    </Text>
                  </View>
                </View>

                {/* Activities Under the Same Date */}
                {row?.followUps?.map((followUp, followUpIndex) => (
                  
                  <View style={tableStyles.tableRow} key={followUpIndex}>
                        
                    <View style={[tableStyles.tableCol, { flexBasis: '31%' }]}>
                      {followUp?.solutions?.map(solutionTitle => (
                        <Text style={[tableStyles.tableCell]}> {solutionTitle}  -</Text>))}
                    </View>
                    <View style={[tableStyles.tableCol, { flexBasis: '32%' }]}>
                      {followUp?.difficulties?.map(difficultieTitle => (
                        <Text style={[tableStyles.tableCell]}>  {difficultieTitle}  </Text>))}
                    </View>
                    <View style={[tableStyles.tableCol, { flexBasis: '30%' }]}>
                      <Text style={[tableStyles.tableCell, { textAlign: "right" }]}>
                        {followUp.target}
                      </Text>
                    </View>
                    <View style={[tableStyles.tableCol, { flexBasis: '7%' }]}>
                      <Text style={tableStyles.tableCell}>
                        {followUp.number}

                      </Text>
                    </View>
                  </View>
                ))}
              </React.Fragment>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};
export default FlowupReportDocument;
