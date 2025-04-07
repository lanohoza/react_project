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

Font.register({
    family: 'ARIAL',
    src: '/fonts/ARIAL.ttf', // Adjust this path to the actual location of the font file
});
// Styles
// Create styles for your document
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
        borderColor: '#ffffff',
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        borderBottomStyle: 'solid',
    },
    tableCell: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#ffffff',
        borderRightStyle: 'solid',
        fontSize: "12px",
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
    },
})

export interface TableProps {
    items: any[];
    headers: any[];
}
const Table = ({ items, headers }: TableProps) => {


    return (
        <>
        
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.header]}>
                    {headers.map((header) => (
                        <Text key={header.key} style={[styles.tableCell, header.key === headers[headers.length - 1].key && styles.lastCell, { fontWeight: 'bold' }]}>
                            {header.title}
                        </Text>
                    ))}
                </View>
                {/* Render table rows */}
                {items.map((item, index) => (
                    <View style={[
                        styles.tableRow,
                        index === items.length - 1 && styles.lastRow
                    ]} key={index}>
                        {headers.map((header) => (
                            <Text key={header.key} style={[styles.tableCell, header.key === headers[headers.length - 1].key && styles.lastCell]}>
                                {item[header.key]}
                            </Text>
                        ))}
                    </View>
                ))}
            </View >

        </>
    );
};
export default Table;
