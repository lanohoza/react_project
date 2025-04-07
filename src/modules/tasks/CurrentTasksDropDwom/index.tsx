'use client';
import React, { useEffect, useState } from 'react';
import { Dropdown, message } from 'antd';
import { CalendarOutlined, FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import { StyledCustomButton, StyledCustomButtonsHeaderContainer } from '@core/styles/header/index.styled';
import { Task } from '@core/types/models/task/TaskTypes';
import { getTasksForCurrentWeekByUser } from '@core/services/TaskService';
import CurrentTasksTable from './ListingTable/index';

const TechnicalCardList = () => { 
  const [scolarYearTasks, setScolarYearTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  

  useEffect(() => {
   /* const fetchTasksForCurrentWeekByUser = async () => {
      try {
        setLoading(true);
        const tasks = await getTasksForCurrentWeekByUser();
        const sortedTasks = tasks.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
        setScolarYearTasks(sortedTasks);
      } catch (error) {
        message.error('Failed to fetch scolar year tasks for current week by user');
        console.error('Error fetching scolar year tasks for current week by user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksForCurrentWeekByUser();*/
  }, []);

  const handleDelete = (id: number) => {
    setScolarYearTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const menu = (
    <CurrentTasksTable listData={scolarYearTasks} loading={loading} onDelete={handleDelete} />
  );

  return (
    <StyledCustomButtonsHeaderContainer>
      <Dropdown overlay={menu} placement="bottomRight" arrow={{ pointAtCenter: true }}>
        <StyledCustomButton iconPosition="end" icon={<CalendarOutlined />}>للإنجاز هذا الاسبوع</StyledCustomButton>
      </Dropdown>
      <StyledCustomButton iconPosition="end" icon={<FileTextOutlined />}> السجلات </StyledCustomButton>
      <StyledCustomButton iconPosition="end" icon={<TeamOutlined />}>إجراء مقابلة</StyledCustomButton>
    </StyledCustomButtonsHeaderContainer>
  );
};

export default TechnicalCardList;
