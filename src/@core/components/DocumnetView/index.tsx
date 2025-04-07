"use client";
import React, { ReactNode } from 'react';
import { DocumentProps, PDFViewer } from '@react-pdf/renderer';
import ActivityReportDocument from '@core/components/Documents/ActivityReportDocument';
type DocumnetViewProps = {
  children: React.ReactElement<DocumentProps>;
};
const documnetView: React.FC<DocumnetViewProps> = ({
  children
}) => (

  <PDFViewer style={{
    width: "100%",
    height: "100%"
  }}>{children}
  </PDFViewer>

);

export default documnetView;