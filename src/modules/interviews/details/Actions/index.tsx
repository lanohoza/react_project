import React, { useState } from 'react';
import AppList from '@crema/components/AppList';
import ReviewCell from './ActionCell';
import { Interview } from '@core/types/models/interview/InterviewTypes';
import { StyledTaskDetailItemTitle } from '../../../taskDetail/TaskView/index.styled';
import { List } from 'antd';
import ActionCell from './ActionCell';
type Props = {
  interview: Interview;

};
const Actions = ({ interview }: Props) => {
  const [actions, setActions] = useState([
    { title: "  الإطلاع على سند المستشار"  },
    { title: "طباعة سند للتلميذ" },
    { title: "لإطلاع على بطاقة التلميذ"},
    { title: "معاينة الإستبيان" },
    { title: "اظهارالمعلومات الشخصية للتلميذ" }


  ]);
  return (
    <div>
      <div>
        {actions?.length > 0 ?
          <AppList
            data={actions}
            renderItem={(action, index) => <ActionCell action={action} interview={interview} key={index} />}
          /> :

          <h4 style={{
            color: "#a09393",
            border: "1px solid",
            textAlign: "center",
            padding: "15px"
          }}>لا توجد عمليات في هذا الاجراء </h4>
        }
      </div>
    </div>
  );
};

export default Actions;
