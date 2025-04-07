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
    marginTop: 40,
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
    fontSize: 10,
    fontFamily: 'ARIAL',
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

const ROWS_PER_PAGE = 30;

interface Prop {
  datasource: ActivitiesReportDto;
}

const ActivityReportDocument = ({ datasource }: Prop) => {
  const [dataChunks, setDataChunks] = useState([]);

  useEffect(() => {
    setDataChunks(chunkArray(datasource?.activities ?? [], ROWS_PER_PAGE));
  }, [datasource?.activities]);

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
            التقرير اليومي لنشاطات مستشار التوجيه
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
              <View style={[tableStyles.tableCol, { flexBasis: '15%' }]}>
                <Text style={tableStyles.tableCellHeader}>الملاحظات</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '75%' }]}>
                <Text style={tableStyles.tableCellHeader}>عنوان النشاط</Text>
              </View>
              <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
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
                      style={[tableStyles.tableCell, { fontWeight: 700, fontSize: 12 }]}
                    >
                      {row.createdDate}
                    </Text>
                  </View>
                </View>

                {/* Activities Under the Same Date */}
                {row.activities.map((activity, activityIndex) => (
                  <View style={tableStyles.tableRow} key={activityIndex}>
                    <View style={[tableStyles.tableCol, { flexBasis: '15%' }]}>
                      <Text style={tableStyles.tableCell}>{activity.note}</Text>
                    </View>
                    <View style={[tableStyles.tableCol, { flexBasis: '75%' }]}>
                      <Text style={[tableStyles.tableCell, { textAlign: "right" }]}>
                        {activity.content}
                      </Text>
                    </View>
                    <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
                      <Text style={tableStyles.tableCell}>
                        {index + 1 + activityIndex + pageIndex * ROWS_PER_PAGE}
                      </Text>
                    </View>
                  </View>
                ))}
              </React.Fragment>
            ))}
          </View>
          <View style={[styles.footer, { flexDirection: 'row', justifyContent: "space-between", paddingRight: 50, paddingLeft: 50 }]}>
          <Text style={[styles.footerText, { fontSize: 14 }]}> مستشار التوجيه </Text>
          <Text style={[styles.footerText, { fontSize: 14 }]}> </Text>
            <Text style={[styles.footerText, { fontSize: 14 }]}> </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default ActivityReportDocument;
