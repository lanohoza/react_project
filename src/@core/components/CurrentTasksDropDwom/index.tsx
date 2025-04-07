'use client';
import React, { useEffect, useState } from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';

import { Badge, Dropdown, List, Popover, Tooltip } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';

import { messages } from '@crema/fakedb';
import CurrentTasksTable from './ListingTable';
import {
  DropDownWrapper,
  ReportDropdown,
  StyledHeaderCurruntTasksIcon,
  StyledHeaderCurruntTasksLink,
  StyledHeaderCurruntTasksLinkText,
} from './index.styled';
import {
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  CarryOutOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import { padding } from 'polished';
import { getCurrentWeekTasks } from '@core/services/YearPragramService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { environment } from '../../../envirenement/environnement';
import { executeActionTest } from '@core/services/ActionTask';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AppCurrentTasksTable = () => {
  const handleDelete = () => { };
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const toCreateWeekProgramPage = () => {
    router.push('/week-programs');
  };

  const infoViewActions = useInfoViewActionsContext();

  useEffect(() => {
    getCurrentWeekTasks(infoViewActions).then((weekTasks) => {
      setTasks(weekTasks);
      setLoading(false);
    });
  }, []);

  const temporaryTasks = tasks.filter(task => task.type === 'temporary');

  const temporaryTasksCount = temporaryTasks.length;

  const items = [
    {
      key: 2,
      label: <CurrentTasksTable tasks={tasks} loading={loading} />,
      style: { padding: '0' },
    },
  ];

  const reportItems = [
    {
      key: 1,
      label: <Link style={{ padding: " 5px 12px !important;" }} href={`/activities`}>سجل الانشطة اليومية</Link>,
      style: { padding: '0' },
    },
    {
      key: 2,
      label: <Link style={{ padding: " 5px 12px !important;" }}  href={`/interviews`}>سجل المقابلات</Link>,
      style: { padding: '0' },
    },
    {
      key: 3,
      label: <Link style={{ padding: " 5px 12px !important;" }}  href={`/followups`}>سجل المتابعات</Link>,
      style: { padding: '0' },
    },
  ];

  const cardsItems = [
    {
      key: 1,
      label: <Link style={{ padding: " 5px 12px !important;" }} href={`/cards/student`}>بطاقة التلميذ</Link>,
      style: { padding: '0' },
    },
    {
      key: 2,
      label: <Link style={{ padding: " 5px 12px !important;" }}  href={`/cards/classe`}> بطاقة القسم</Link>,
      style: { padding: '0' },
    },
    {
      key: 3,
      label: <Link style={{ padding: " 5px 12px !important;" }}  href={`/cards/level`}>بطاقة المستوى </Link>,
      style: { padding: '0' },
    },
    {
      key: 4,
      label: <Link style={{ padding: " 5px 12px !important;" }}  href={`/cards/speciality`}>بطاقة التخصص </Link>,
      style: { padding: '0' },
    },
    {
      key: 5,
      label: <Link style={{ padding: " 5px 12px !important;" }}   href={`/cards/subject`}>بطاقة المادة </Link>,
      style: { padding: '0' },
    },
    {
      key: 6,
      label: <Link style={{ padding: " 5px 12px !important;" }}  href={`/cards/establishment`}>بطاقة المؤسسة </Link>,
      style: { padding: '0' },
    },
  ];

  return (
    <>
      <Tooltip placement='rightTop' title='البرنامج الأسبوعي'>
        <StyledHeaderCurruntTasksLink onClick={() => toCreateWeekProgramPage()}>
          <StyledHeaderCurruntTasksIcon>
            <CarryOutOutlined />
          </StyledHeaderCurruntTasksIcon>
          <StyledHeaderCurruntTasksLinkText>
            <CarryOutOutlined />
          </StyledHeaderCurruntTasksLinkText>
        </StyledHeaderCurruntTasksLink>
      </Tooltip>

      <Tooltip placement='rightTop' title='للانجاز هذا الاسبوع'>
        <DropDownWrapper>
          <Dropdown
            menu={{ items }}
            overlayClassName='header-messages'
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}
          >
            <StyledHeaderCurruntTasksLink onClick={(e) => e.preventDefault()}>
              <Badge
                count={temporaryTasksCount}
                size='default'
                overflowCount={temporaryTasksCount}
              >
                <StyledHeaderCurruntTasksIcon>
                  <CalendarOutlined />
                </StyledHeaderCurruntTasksIcon>
              </Badge>

              <StyledHeaderCurruntTasksLinkText>
                <CalendarOutlined />
              </StyledHeaderCurruntTasksLinkText>
            </StyledHeaderCurruntTasksLink>
          </Dropdown>
        </DropDownWrapper>
      </Tooltip>

      <Tooltip placement='rightTop' title='السجلات'>
        <DropDownWrapper>
          <ReportDropdown
            menu={{ items: reportItems }}
            overlayClassName='header-messages'
            placement="bottomRight" arrow={{ pointAtCenter: true }}
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}
          >
            <StyledHeaderCurruntTasksLink onClick={(e) => e.preventDefault()}>
              <StyledHeaderCurruntTasksIcon>
                <FileTextOutlined />
              </StyledHeaderCurruntTasksIcon>
              <StyledHeaderCurruntTasksLinkText>
                <FileTextOutlined />
              </StyledHeaderCurruntTasksLinkText>
            </StyledHeaderCurruntTasksLink>
          </ReportDropdown>
        </DropDownWrapper>
      </Tooltip>

      <Tooltip placement='rightTop' title='التواصل الإرشادي '>
        <DropDownWrapper>
          <ReportDropdown
            menu={{ items: cardsItems }}
            overlayClassName='header-messages'
            placement="bottomRight" arrow={{ pointAtCenter: true }}
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}
          >
            <StyledHeaderCurruntTasksLink onClick={(e) => e.preventDefault()}>
              <StyledHeaderCurruntTasksIcon>
                <CreditCardOutlined />
              </StyledHeaderCurruntTasksIcon>
              <StyledHeaderCurruntTasksLinkText>
                <CreditCardOutlined />
              </StyledHeaderCurruntTasksLinkText>
            </StyledHeaderCurruntTasksLink>
          </ReportDropdown>
        </DropDownWrapper>
      </Tooltip>
    </>
  );
};

export default AppCurrentTasksTable;
