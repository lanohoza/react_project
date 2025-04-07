import React, { useState } from 'react';
import AppMenu from '@crema/components/AppMenu';
import {
  StyledTcCell,
  StyledTcCellAction,
  StyledTcCellBtn,
  StyledTcCellContent,
  StyledTcCellInfo,
  StyledTcCellThumb,
} from './index.styled';
import Image from 'next/image';

import { RestOutlined, SelectOutlined } from '@ant-design/icons';
import { Student } from '@core/types/models/student/StudentTypes';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { restoreStudent } from '@core/services/StudentService';
import { notification } from 'antd';
import { ShowMessageAction } from '../../../@crema/types/actions/Common.action';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';

type StudentCellProps = {
  student: Student;
  index: number
  realod:()=>void
};

const StudentCell: React.FC<StudentCellProps> = ({ student, index,realod }) => {

  const [openConfirmModel, setOpenConfirmModel] = useState<boolean>(false);
  const InfoViewActions = useInfoViewActionsContext();

  const onRestoreStudent = () => {
    restoreStudent(student.idStudentClasse, InfoViewActions, () => {
      InfoViewActions.showMessage("تم إستعادة التلميذ بنجاح");
      realod();
      setOpenConfirmModel(false);
    });
  };
  return (

    <>
      <StyledTcCell
        key={student.id}
        className="item-hover"

      >
        <StyledTcCellContent>
          <StyledTcCellThumb
            style={{
              backgroundColor: '#FEF1E4',
              color: '#F88333',
            }}
          >
            {index + 1}
          </StyledTcCellThumb>
          <StyledTcCellInfo>
            <h4 className='text-truncate'>{student.firstName + " " + student.lastName}</h4>
            <h5>{student.classeTitle}</h5>
          </StyledTcCellInfo>
        </StyledTcCellContent>

        <StyledTcCellAction>

          <div className='ant-row ant-row-middle'>
            <StyledTcCellBtn type='primary'

              onClick={() => { setOpenConfirmModel(true) }}
              shape='round' icon={<RestOutlined />}>
              إستعادة
            </StyledTcCellBtn>
          </div>

        </StyledTcCellAction>
      </StyledTcCell>

      {openConfirmModel && (
        <ConfirmationModal
          open={openConfirmModel}
          onDeny={() => setOpenConfirmModel(false)}
          onConfirm={() => { onRestoreStudent() }}
          modalTitle={'إستعادة التلميذ  '}
          paragraph={'هل أنت متأكد من إستعادة هذا التلميذ ؟'}
        />
      )}
    </>
  );
};

export default StudentCell;
