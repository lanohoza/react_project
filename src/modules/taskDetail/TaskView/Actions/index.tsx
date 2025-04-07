import React from 'react';
import AppList from '@crema/components/AppList';
import ReviewCell from './ActionCell';
import { StyledTaskDetailItemTitle } from '../index.styled';
import { TaskWithActionsDto } from '@core/types/models/task/TaskTypes';
type Props = {
  task: TaskWithActionsDto;
  reloud: () => void;

};
const Review = ({ task, reloud }: Props) => {
  return (
    <div>
      <StyledTaskDetailItemTitle>العمليات</StyledTaskDetailItemTitle>
      {task.actions?.length > 0 ?
        <AppList
          data={task.actions}
          renderItem={(data, index) => <ReviewCell actionTask={data} reloud={reloud} key={index} />}
        /> :

        <h4 style={{
          color: "#a09393",
          border: "1px solid",
          textAlign: "center",
          padding: "15px"
        }}>لا توجد عمليات في هذا الاجراء </h4>
      }
    </div>
  );
};

export default Review;
