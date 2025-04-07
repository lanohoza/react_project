import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { Button, Dropdown, Rate, Space } from 'antd';
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

type Props = {
  interview: Interview;
};

const Target = ({ interview }: Props) => {
  const studntColumns: ColumnsType<RecentTCItemType> = [
    {
      title: 'الرقم التعريفي المدرسي',
      dataIndex: 'nbrRakmana',
      key: 'nbrRakmana',
    },
    {
      title: 'الاسم',
      dataIndex: 'firstName',
      key: 'studentCount',
    },
    {
      title: 'اللقب',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    ,
    {
      title: 'تاريخ الميلاد',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'القسم',
      dataIndex: 'classeTitle',
      key: 'classeTitle',
    },
    {
      title: 'العمليات',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space size='small' align='end'>
          <Button
            style={{ background: '#faad14', color: "white" }}
            ghost
          >
            لإطلاع على بطاقة التلميذ
          </Button>
          <Button
          type='primary'
          
          >
            معاينة الإستبيان
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div>
        <StyledListTable
          hoverColor
          data={interview.studentDtos}
          columns={studntColumns}
          scroll={{ x: 'auto' }}
        />
      </div>
    </div>
  );
};

export default Target;
