'use client';
import React from 'react';
import {
  useRapidAccesActionsContext,
  useRapidAccesContext,
} from '../RapidAccesContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import AppInfoView from '@crema/components/AppInfoView';
import AddIterviewAction from '../AddInterviewAction';
import ViewStudentAction from '../ViewStudentAction';


const Models = ({ }) => {
  const { openAddInterviewAction, openViewStuentAction } =
    useRapidAccesContext();

  return (
    <>
      {openAddInterviewAction && (
        <AddIterviewAction ></AddIterviewAction>
      )}
      {openViewStuentAction && <ViewStudentAction></ViewStudentAction>}
    </>
  );
};

export default Models;
