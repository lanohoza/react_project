import React, { useEffect, useState } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { Button, Dropdown, MenuProps, Rate, Space, theme } from 'antd';
import {
  StyledTaskDetailHeader,
  StyledTaskDetailHeaderContent,
  StyledTaskDetailHeaderInfo,
  StyledProfileMbText,
  StyledProfileReviewText,
  StyledTaskDetailSocial,
  StyledStatus,
} from './index.styled';
import type { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import { getTcTupeName, monthsInArabic, weeks } from '@crema/hooks/dateHooks';
import {
  Interview,
  InterviewType,
} from '@core/types/models/interview/InterviewTypes';
import { StyledListTable } from '@core/styles/list/index.styled';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { ColumnsType } from 'antd/es/table';
import { getAllShedSettingsByInterview } from '@core/services/ShedSettingService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

type Props = {
  interview: Interview;
};

const ShedSettings = ({ interview }: Props) => {

  const infoViewActionsContext = useInfoViewActionsContext();
  const [shedSettings, setShedSettings] = useState<any[]>([]);


  useEffect(() => {
    if (interview)
      getAllShedSettingsByInterview(interview.id, infoViewActionsContext).then((shedSettingDtos) => {
        setShedSettings(shedSettingDtos);
      });
  }, [])

  const shedSettingColumns: ColumnsType<any> = [
    {
      title: 'الرمز',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'العرض',
      dataIndex: 'syndromeDiagnostic',
      key: 'syndromeDiagnostic',
      width: "30%"
    },
    {
      title: 'العمليات',
      dataIndex: 'actions',
      key: 'actions',
      width: "30%",
      render: (_, shedSetting) => {

        const supportCounselorItems: MenuProps['items'] = (
          shedSetting.supportCounselors || []
        ).map((supportCounselor: any) => ({
          label: supportCounselor.name,
          key: supportCounselor.id,
          onClick: () => window.open(supportCounselor.url ?? "#", '_blank'), // Open URL in new tab

        }));

        const supportStudentItems: MenuProps['items'] = (
          shedSetting.supportStudents || []
        ).map((supportStudent: any) => ({
          label: supportStudent.name,
          key: supportStudent.id,
          onClick: () => window.open(supportStudent.url ?? "#", '_blank'), // Open URL in new tab
        }));

        return (
          <Space size='small' align='center'>
            <Dropdown.Button placement="bottomRight" menu={{ items: supportStudentItems }} type='primary'>طباعة سند للتلميذ</Dropdown.Button>
            <Dropdown.Button placement="bottomRight" menu={{ items: supportCounselorItems }} type='primary'>  طباعة سند للتلميذ</Dropdown.Button>
          </Space>
        )
      },
    },
    {
      title: 'المعالجة',
      dataIndex: 'actions2',
      key: 'actions2',
      width: "30%",
      render: (_, shedSetting) => {


        const requiredProceduresItems: MenuProps['items'] = (
          shedSetting.requiredProcedures || []
        ).map((requiredProcedure: any) => ({
          label: requiredProcedure.name,
          key: requiredProcedure.id,
        }));
        const directionShedsItems: MenuProps['items'] = (
          shedSetting.directionSheds || []
        ).map((directionShed: any) => ({
          label: directionShed.name,
          key: directionShed.id,
        }));
        return (
          <Space size='small' align='center'>
            <Dropdown.Button placement="bottomRight" menu={{ items: requiredProceduresItems }} type='primary'>الإجراءات المطلوبة  </Dropdown.Button>
            <Dropdown.Button placement="bottomRight" menu={{ items: directionShedsItems }} type='primary'>  التوجيهات الارشادية  </Dropdown.Button>
          </Space>
        )
      },
    },
  ];
  return (
    <div>
      <div>
        <StyledListTable
          hoverColor
          data={shedSettings}
          columns={shedSettingColumns}
          scroll={{ x: 'auto' }}
        />
      </div>
    </div>
  );
};

export default ShedSettings;
