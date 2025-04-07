'use client';
import React, { useEffect, useState } from 'react';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Badge, Button, Col, Dropdown, Row, Space, Tabs } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { StyledProfileReviewText, StyledRibbon, StyledTaskDetails } from './index.styled';
import Header from './Header';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Interview, InterviewStatus, InterviewType } from '@core/types/models/interview/InterviewTypes';
import Actions from './Actions';
import Target from './Target';
import Difficulties from './ShedSettings';
import Solutions from './Solutions';
import { getInterviewDetailsById } from '@core/services/InterviewService';
import ShedSettings from './ShedSettings';

const InterviewDetail = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [interview, setInterview] = useState<Interview>({} as Interview)
  const searchParams = useSearchParams();

  const getInitData = () => {
    const id = parseInt(searchParams.get('id'));
    getInterviewDetailsById(id, infoViewActionsContext).then((interview) => {
      setInterview(interview);
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
  }
  useEffect(() => {
    getInitData();
  }, []);



  const getTypeName = (type) => {
    switch (type) {
      case InterviewType.group: return "جماعية";
      case InterviewType.single: return "فردية";
    }
  }
  const getTypeColor = (status) => {
    switch (status) {
      case InterviewStatus.in_progress: return "volcano";
      case InterviewStatus.todo: return "red";
      case InterviewStatus.done: return "green";
    }
  }

  return (
    <StyledTaskDetails>
      <AppPageMeta title='إجراءات المقابلة الارشادية' />
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <StyledRibbon text={getTypeName(interview.type)} color={getTypeColor(interview.status)}>
          <AppCard key='product_detail'>
            <Header interview={interview} />

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: "10px" }}>
              <Col span={3}><StyledProfileReviewText >تاريخ المقابلة: </StyledProfileReviewText></Col>
              <Col>{interview.interviewDate ?? "لم يحدد بعد"}</Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: "10px" }}>
              <Col span={3}><StyledProfileReviewText>التشخيص : </StyledProfileReviewText></Col>
              <Col>{interview.shedCategory}</Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Col span={3}><StyledProfileReviewText>الوصف  : </StyledProfileReviewText></Col>
              <Col>{interview.description}</Col>
            </Row>
            <Space direction='vertical' style={{ width: '100%' }}>
              <Tabs
                defaultActiveKey='1'
                items={[
                  {
                    label: `التلميذ / المجموعة`,
                    key: '1',
                    children: <Target interview={interview} ></Target>,
                  },
                  {
                    label: `أعراض التشخيص`,
                    key: '2',
                    children: <ShedSettings interview={interview} ></ShedSettings>,
                  }
                ]}
              />
            </Space>
          </AppCard>
        </StyledRibbon>
      </AppAnimate>
      <AppInfoView />
    </StyledTaskDetails>
  );
};

export default InterviewDetail;
