import React from 'react';
import { Button, Col, notification, Row } from 'antd';
import {
  StyledActionStatusBadgeGreen,
  StyledActionStatusBadgeRed,
  StyledTaskDetailCellAction,
  StyledTaskDetailReviewCell,
  StyledTaskDetailReviewCellContent,
  StyledTaskDetailReviewCellInfo,
} from '../../../taskDetail/TaskView/index.styled';
import { ActionResultType, ActionTaskDto } from '@core/types/models/task/TaskTypes';
import { ActionStatus } from '../../../../@core/types/models/task/TaskTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { actionDownloadFile, executeAction } from '@core/services/ActionTask';
import Urls from '@core/constants/ActionConst';
import { downloadFile } from '@core/hooks/UrlHooks';
import { useRouter } from 'next/navigation';
import { Interview } from '@core/types/models/interview/InterviewTypes';
type Props = {
  interview: Interview;
  action: any
};
const ActionCell = ({ interview, action }: Props) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const router = useRouter();

  const onExecuteAction = () => {

  }

  return (
    <StyledTaskDetailReviewCell className='item-hover'>
      <Row>
        <Col span={18} style={{ marginBottom: '15px' }}>
          <StyledTaskDetailReviewCellInfo>
            <StyledTaskDetailReviewCellContent>
              {action.title}
              {action.description && <p>
                {action.description}
              </p>}
            </StyledTaskDetailReviewCellContent>
          </StyledTaskDetailReviewCellInfo>
        </Col>
        <Col span={6} style={{ marginBottom: '15px' }}>
          <StyledTaskDetailCellAction>
            <Button style={{ background: 'green', color: "white" }} onClick={() => { }}>
              تنفيذ   </Button>
          </StyledTaskDetailCellAction>
        </Col>
      </Row>
    </StyledTaskDetailReviewCell>
  );
};
export default ActionCell;
