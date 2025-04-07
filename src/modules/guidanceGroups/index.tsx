'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppInfoView from '@crema/components/AppInfoView';
import AppPageMeta from '@crema/components/AppPageMeta';
import GuidanceGroupContextProvider from './GuidanceGroupsContextProvider';
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
import AddEditGuidanceGroup from './AddEditGuidanceGroup';
import GuidanceGroupTableList from './Listing';

//import { StyledLinkBtn } from '../Confirmation/index.styled';

const GuidanceGroupsList = ({}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <GuidanceGroupContextProvider>
        <AppsContainer title='قائمة مجموعات الارشادية' fullView>
          <AppPageMeta title='تسير مجموعات الارشادية' />
   
          <GuidanceGroupTableList></GuidanceGroupTableList>
          <Models></Models>
        </AppsContainer>
      </GuidanceGroupContextProvider>
    </>
  );
};

export default GuidanceGroupsList;
