import React from "react";
import Actions from "./Actions";
import ExecutionDate from "./ExecutionDate";
import { Divider } from "antd";
import {
  StyledTaskView,
  StyledTaskViewTitle,
  StyledStrokeSubtitle,
} from "./index.styled";
import type { ProductDataType } from "@crema/types/models/ecommerce/EcommerceApp";
import { TaskWithActionsDto } from "@core/types/models/task/TaskTypes";

type Props = {
  task: TaskWithActionsDto;
  reloud: () => void
};
const TaskView = ({ task, reloud }: Props) => {
  return (
    <StyledTaskView>
      <Actions task={task} reloud={reloud} />
    </StyledTaskView>
  );
};

export default TaskView;
