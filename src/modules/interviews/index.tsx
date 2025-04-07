'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import FlowUpContextProvider from './InterviewsContextProvider';
import Models from './Models';
import AppRowContainer from '@crema/components/AppRowContainer';
import {
  StyledListHeader,
  StyledListHeaderInputView,
  StyledListHeaderLeft,
  StyledListHeaderPagination,
  StyledListHeaderRight,
} from '@core/styles/list/index.styled';
import AppsHeader from '@crema/components/AppsContainer/AppsHeader';
import { Button, Col, Input } from 'antd';
import page from '../../app/page';
import { padding } from 'polished';
import { PlusOutlined } from '@ant-design/icons';
import InterviewTableList from './Listing';

//import { StyledLinkBtn } from '../Confirmation/index.styled';

const FollowpsList = ({}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <FlowUpContextProvider>
        <AppsContainer title='قائمة المقابلات' fullView>
          <AppPageMeta title='تسير المقابلات' />
          <InterviewTableList></InterviewTableList>
          <Models></Models>
        </AppsContainer>
      </FlowUpContextProvider>
    </>
  );
};

export default FollowpsList;
