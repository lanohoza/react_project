import React from 'react';
import {
  StyledExecutionDateItemIcon,
  StyledExecutionDateItemInner,
  StyledExecutionDatePara,
  StyledTaskDetailExecutionDate,
  StyledTaskDetailExecutionDateItem,
  StyledTaskDetailItemTitle,
} from './index.styled';
import { Col, Row } from 'antd';
import { TaskWithActionsDto } from '@core/types/models/task/TaskTypes';
import { monthsInArabic, weeks } from '@crema/hooks/dateHooks';
type Props = {
  task: TaskWithActionsDto;
};
const ExecutionDate = ({task}:Props) => {
  return (
    <StyledTaskDetailExecutionDate>
      <StyledTaskDetailItemTitle>
        الموسم الدراسي
      </StyledTaskDetailItemTitle>

      <StyledTaskDetailExecutionDateItem>

        <StyledExecutionDateItemInner>
          <StyledExecutionDatePara>
            {task.yearTitle}
          </StyledExecutionDatePara>
        </StyledExecutionDateItemInner>
      </StyledTaskDetailExecutionDateItem>
      <Row>


        <Col xs={24} sm={12}>
          <StyledTaskDetailItemTitle>الشهر </StyledTaskDetailItemTitle>
          <StyledExecutionDatePara>
            {monthsInArabic[task.runMonth]}
          </StyledExecutionDatePara>
        </Col>

        <Col xs={24} sm={12}>
          <StyledTaskDetailItemTitle>الاسبوع</StyledTaskDetailItemTitle>

          <StyledExecutionDateItemInner>

            <StyledExecutionDatePara>
            {weeks[task.runWeek]}

            </StyledExecutionDatePara>
          </StyledExecutionDateItemInner>

        </Col>

      </Row>
    </StyledTaskDetailExecutionDate>
  );
};

export default ExecutionDate;
