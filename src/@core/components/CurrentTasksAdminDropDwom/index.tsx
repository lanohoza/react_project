import React, { useEffect, useState } from 'react';
import { Badge, Dropdown, Tooltip } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { DropDownWrapper, StyledHeaderCurruntTasksIcon, StyledHeaderCurruntTasksLink, StyledHeaderCurruntTasksLinkText } from './index.styled';
import { getAllByUserAndYear, getAllPermanentByUserAndYear, getCurrentWeekTasks } from '@core/services/YearPragramService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { useRouter } from 'next/navigation';

const AppCurrentTasksAdminTable = () => {
  const [tasksThisWeek, setTasksThisWeek] = useState([]);
  const [tasksYearProgram, setTaskYeartasksProgram] = useState([]);
  const [loading, setLoading] = useState(true);
  const infoViewActions = useInfoViewActionsContext();
  const router = useRouter();

  const [page, setPage] = useState<number>(0);
  const [search, setSearchQuery] = useState('');
  const [idTcCategory, setIdTcCategory] = useState(null);
  const [month, setMonth] = useState(null);

  // const toCreateWeekProgramPage = () => {
  //   router.push('/week-programs');
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const weekTasks = await getCurrentWeekTasks(infoViewActions);
  //       setTasksThisWeek(weekTasks);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchData();
  //   setLoading(false);
  // }, []);

  // const items = [
  //   {
  //     key: 2,
  //     label: <CurrentTasksTable tasksThisWeek={tasksThisWeek} loading={loading} />,
  //     style: { padding: '0' },
  //   },
  // ];

  return (
    <>
      <Tooltip placement='rightTop' title='الإعلانات'>
        <StyledHeaderCurruntTasksLink>
          <StyledHeaderCurruntTasksIcon>
            <FileImageOutlined />
          </StyledHeaderCurruntTasksIcon>
          <StyledHeaderCurruntTasksLinkText>
            <FileImageOutlined />
          </StyledHeaderCurruntTasksLinkText>
        </StyledHeaderCurruntTasksLink>
      </Tooltip>
    </>
  );
};

export default AppCurrentTasksAdminTable;
