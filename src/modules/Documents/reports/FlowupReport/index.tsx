'use client';
import React, { useEffect, useState } from 'react';
import DocumnetView from '@core/components/DocumnetView';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { geInterviewsReportData, getFollowupsReportData } from '@core/services/ReportkService';
import {  InterviewReportDto } from '@core/types/models/interview/InterviewTypes';
import FlowupReportDocument from '@core/Documents/Reports/FlowupReportDocument';
import { FollowupReportDto } from '@core/types/models/followUp/FollowupTypes';


const FlowupReport = ({ }) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [followupReportDto, setFollowupReportDto] = useState<FollowupReportDto>({} as FollowupReportDto);
  const loadData = () => {
    getFollowupsReportData(infoViewActionsContext).then(datasource => setFollowupReportDto(datasource))
  }

  useEffect(() => {
      loadData();
  },[])


  return (
    <>
      <DocumnetView >
        <FlowupReportDocument datasource={followupReportDto}></FlowupReportDocument>
      </DocumnetView>
    </>
  );
};

export default FlowupReport;
