'use client';
import React, { useEffect, useState } from 'react';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Badge, Col } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { StyledRibbon, StyledTaskDetails } from './index.styled';
import Header from './Header';
import TaskView from './TaskView';
import { getTaskWithActions } from '@core/services/TaskService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { TaskStatus, TaskWithActionsDto } from '@core/types/models/task/TaskTypes';

const TaskDetail = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [task, setTask] = useState<TaskWithActionsDto>({} as TaskWithActionsDto)
  const searchParams = useSearchParams();

  const getInitData = () => {
    const id = searchParams.get('id');
    getTaskWithActions(id, infoViewActionsContext).then((task) => {
      setTask(task);
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    });
  }
  useEffect(() => {
    getInitData();
  }, []);
  const reloud = () => {
    getInitData();

  }



  const getStausName = (status) => {
    switch (status) {
      case TaskStatus.in_progress: return "قيد التنفيذ";
      case TaskStatus.todo: return "للتنفيذ";
      case TaskStatus.finish: return "تم التنفيذ";
    }
  }
  const getStausColor = (status) => {
    switch (status) {
      case TaskStatus.in_progress: return "volcano";
      case TaskStatus.todo: return "red";
      case TaskStatus.finish: return "green";
    }
  }
  return (
    <StyledTaskDetails>
      <AppPageMeta title='Task Details' />
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <StyledRibbon text={getStausName(task.status)} color={getStausColor(task.status)}>
          <AppCard key='product_detail'>
            <Header task={task} />
            <AppRowContainer>
              <Col sm={24} lg={24}>
                <TaskView reloud={reloud} task={task} />
              </Col>
            </AppRowContainer>
          </AppCard>
        </StyledRibbon>
      </AppAnimate>
      <AppInfoView />
    </StyledTaskDetails>
  );
};

export default TaskDetail;
