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
import { environment } from '../../../envirenement/environnement';
import { AddEditTasksWeekProgramDto } from '@core/types/models/addEditTasksWeekProgramDto/AddEditTasksWeekProgramDtoTypes';
import { WeekProgramTaskUserDto } from '@core/types/models/weekProgramTasks/WeekProgramTaskUserDto';
import { arabicDaysMap } from '@core/types/models/weekProgramTasks/WeekProgramTasksTypes';

// Register the ARIAL font
Font.register({
  family: 'ARIAL',
  src: `${environment?.BASE_PATH ?? ''}/fonts/ARIAL.ttf`, // Adjust this path to the actual location of the font file
});

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

// Styles for the document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  section: {
    margin: 1,
    padding: 2,
  },
  headerTitle: {
    marginTop: 2,
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
    fontSize: 13,
    color: 'black',
    marginTop: 3,
    marginBottom: 3,
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
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  signatureBlock: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  datasource: WeekProgramTaskUserDto;
}

const WeekProgramTasksDocument = ({ datasource }: Prop) => {
  const [groupedActivities, setGroupedActivities] = useState({});
  const [dataChunks, setDataChunks] = useState([]);
  useEffect(() => {
    console.log(datasource);

    setDataChunks(chunkArray(datasource?.weekProgramTaskDtos ?? [], ROWS_PER_PAGE));
  }, [datasource?.weekProgramTaskDtos]);

  useEffect(() => {
    const activitiesByDay = DAYS_OF_WEEK.reduce((acc, day) => {
      acc[day] = datasource.weekProgramTaskDtos.filter((task) => task.days === day);
      return acc;
    }, {});
    setGroupedActivities(activitiesByDay);
  }, [datasource.weekProgramTaskDtos]);

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation='landscape'>
        {/* Header and introductory text */}
        <View style={styles.section}>
          <Text style={styles.headerTitle}>الجمهورية الجزائرية الديمقراطية الشعبية</Text>
          <Text style={styles.headerTitle}>وزارة التربية الوطنية</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>مديرية التربية لولاية {datasource.wilayaName}</Text>
          <Text style={styles.text}>المؤسسة : {datasource.establishmentName}</Text>
          <Text style={styles.text}>مستشار التوجيه والإرشاد المدرسي : {datasource.username}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.headerTitle}>
            البرنامج الأسبوعي للنشاطات من : {datasource.startWeek} إلى : {datasource.endWeek}
          </Text>
        </View>

        {/* Table */}
        <View style={tableStyles.table}>
          {/* Table Header */}
          <View style={tableStyles.tableRow}>
            <View style={[tableStyles.tableCol, { flexBasis: '20%' }]}>
              <Text style={tableStyles.tableCellHeader}>ملاحظات</Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '35%' }]}>
              <Text style={tableStyles.tableCellHeader}>الفترة المسائية</Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '35%' }]}>
              <Text style={tableStyles.tableCellHeader}>الفترة الصباحية</Text>
            </View>
            <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
              <Text style={tableStyles.tableCellHeader}>اليوم</Text>
            </View>
          </View>

          {/* Table Rows for Each Day */}
          {DAYS_OF_WEEK.map((day) => {
            const activitiesForDay = groupedActivities[day] || [];

            // Group activities by period (morning and evening)
            const morningActivities = activitiesForDay.filter((activity) => activity.period === 'Morning');
            const eveningActivities = activitiesForDay.filter((activity) => activity.period === 'Evening');

            return (
              <View style={tableStyles.tableRow} key={day}>
                {/* Notes Cell */}
                <View style={[tableStyles.tableCol, { flexBasis: '20%' }]}>
                  <Text style={tableStyles.tableCell}>
                    {activitiesForDay
                      .filter((activity) => activity.descrption)
                      .map((activity) => ` ${activity.descrption} •`)
                      .join('\n')}
                  </Text>
                </View>

                {/* Evening Period Cell */}
                <View style={[tableStyles.tableCol, { flexBasis: '35%' }]}>
                  <Text style={tableStyles.tableCell}>
                    {eveningActivities.map((activity) => ` ${activity.titleTask} •`).join('\n')}
                  </Text>
                </View>

                {/* Morning Period Cell */}
                <View style={[tableStyles.tableCol, { flexBasis: '35%' }]}>
                  <Text style={tableStyles.tableCell}>
                    {morningActivities.map((activity) => ` ${activity.titleTask} •`).join('\n')}
                  </Text>
                </View>

                {/* Day Cell */}
                <View style={[tableStyles.tableCol, { flexBasis: '10%' }]}>
                  <Text style={tableStyles.tableCell}>{arabicDaysMap[day]}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.footer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.text}>إمضاء المستشار</Text>
            {/* <Text style={styles.text}>الإسم واللقب</Text> */}
          </View>
          <Text style={styles.text}>إمضاء مدير مركز التوجيه</Text>
          <Text style={styles.text}>إمضاء مدير المؤسسة</Text>
        </View>
      </Page>
    </Document>

  );
};
export default WeekProgramTasksDocument;
