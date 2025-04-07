import React from 'react';
import { Button, Col, notification, Row } from 'antd';
import {
  StyledActionStatusBadgeGreen,
  StyledActionStatusBadgeRed,
  StyledTaskDetailCellAction,
  StyledTaskDetailReviewCell,
  StyledTaskDetailReviewCellContent,
  StyledTaskDetailReviewCellInfo,
} from '../index.styled';
import { ActionResultType, ActionTaskDto } from '@core/types/models/task/TaskTypes';
import { ActionStatus } from '../../../../@core/types/models/task/TaskTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { actionDownloadFile, executeAction } from '@core/services/ActionTask';
import Urls from '@core/constants/ActionConst';
import { downloadFile } from '@core/hooks/UrlHooks';
import { useRouter } from 'next/navigation';
type Props = {
  actionTask: ActionTaskDto;
  reloud: () => void;

};
const ReviewCell = ({ actionTask, reloud }: Props) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const router = useRouter();

  const onExecuteAction = () => {
    executeAction(actionTask.id, infoViewActionsContext).then(() => {
      notification.success({ message: "تم تنفيذ العملية بنجاح" });
      reloud();
    }).catch((error) => {
      infoViewActionsContext.fetchError(error.message);
    })
  }

  const onViewActionHandel = () => {
    if (actionTask.resultType == ActionResultType.file) {
      const fileUrl = Urls[actionTask.resultValue];
      if (fileUrl) {
        actionDownloadFile(fileUrl)
          .then((response) => {
            console.log(`response`, response);
            downloadFile(response);
          })
          .catch((error) => {
            console.error('Error downloading file:', error);
          });
      } else {
        console.error('Invalid URL:', actionTask.resultValue);
      }

    }
    if (actionTask.resultType == ActionResultType.page) {
      const fileUrl = Urls[actionTask.resultValue];
      if (fileUrl) {
        // router.push(fileUrl);
        window.open(fileUrl, '_blank');
      }
    }
  }

  return (
    <StyledTaskDetailReviewCell className='item-hover'>
      <Row>
        <Col span={18} style={{ marginBottom: '15px' }}>
          <StyledTaskDetailReviewCellInfo>
            <StyledTaskDetailReviewCellContent>
              <h3>
                {actionTask.title}
                {actionTask.status === ActionStatus.finish && <StyledActionStatusBadgeGreen >تم التنفيذ</StyledActionStatusBadgeGreen>}
                {actionTask.status === ActionStatus.todo && <StyledActionStatusBadgeRed >لم يتم التنفيذ</StyledActionStatusBadgeRed>}
              </h3>
              <p>
                {actionTask.description}
              </p>
            </StyledTaskDetailReviewCellContent>
          </StyledTaskDetailReviewCellInfo>
        </Col>
        <Col span={6} style={{ marginBottom: '15px' }}>
          <StyledTaskDetailCellAction>
            {actionTask.resultType != ActionResultType.script && actionTask.status !== ActionStatus.todo && <Button type='primary' onClick={() => { onViewActionHandel(); }}>عرض النتائج</Button>}
            {actionTask.status === ActionStatus.todo && <Button style={{ background: 'green', color: "white" }} onClick={() => { onExecuteAction(); }}> تنفيذ   </Button>}
            {actionTask.resultType == ActionResultType.script && actionTask.status !== ActionStatus.todo && <Button style={{ background: 'orange', color: "white" }} onClick={() => { onExecuteAction(); }}> إعادة التنفيذ </Button>}
          </StyledTaskDetailCellAction>
        </Col>
      </Row>
    </StyledTaskDetailReviewCell>
  );
};
export default ReviewCell;
