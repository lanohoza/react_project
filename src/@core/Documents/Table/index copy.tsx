// Table.js
import React from 'react';
import { View, Text, StyleSheet, Font } from '@react-pdf/renderer';
import { environment } from '../../../envirenement/environnement';
Font.register({
    family: 'ARIAL',
    src: `${environment?.BASE_PATH ?? ''}/fonts/Almarai-Regular.ttf`, // Adjust this path to the actual location of the font file
});
// Styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        borderBottomColor: '#000',
        borderBottomStyle: 'solid',
    },
    tableCell: {
        flex: 1,   
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        fontSize: "10px",
        textAlign: "right",
        fontFamily: 'ARIAL', // Use Tajawal font for header
        padding: "5px"
    },
    lastCell: {
        borderRightWidth: 0,
    },
    firstCell: {
        borderRightWidth: 0,
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    header: {
        backgroundColor: '#f0f0f0',
    },
    pageBreak: {
        marginBottom: 46,
    },
})
// Define the Table component
const Table = ({ items, headers }) => {
    // Define the number of rows per page
    const rowsPerPage = 80; // Adjust based on your needs

    // Split the items into chunks for pagination
    const pages = Array.from({ length: Math.ceil(items.length / rowsPerPage) }, (_, i) =>
        items.slice(i * rowsPerPage, i * rowsPerPage + rowsPerPage)
    );

    return (
        <>
            {pages.map((pageItems, pageIndex) => (
                <View key={pageIndex} style={styles.pageBreak}>
                    <View style={styles.table}>
                        {/* Render table header */}
                        <View style={[styles.tableRow, styles.header]}>

                            {headers.map((header) => (
                                <Text key={header.key} style={[styles.tableCell, header.key === headers[headers.length - 1].key && styles.lastCell, { fontWeight: 'bold' }]}>
                                    {header.title}
                                </Text>
                            ))}
                        </View>
                        {/* Render table rows for the current page */}
                        {pageItems.map((item, index) => (
                            <View
                                style={[
                                    styles.tableRow,
                                    index === pageItems.length - 1 && { borderBottomWidth: 0 }
                                ]}
                                key={index}
                            >

                                {headers.map((header) => (
                                    <Text key={header.key} style={[styles.tableCell, header.key === headers[headers.length - 1].key && styles.lastCell]}>
                                        {item[header.key]}
                                    </Text>
                                ))}
                            </View>

                        ))}

                    </View>
                </View>
            ))}
        </>
    );
};

export default Table;
