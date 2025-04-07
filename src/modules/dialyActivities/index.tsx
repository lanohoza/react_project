'use client';
import React, { useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import DialyActivityContextProvider from './dialyActivityContextProvider';
import { Calendar, theme } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { environment } from '../../envirenement/environnement';
import ConfirmationModal from '@crema/components/AppConfirmationModal';

const DateCell = ({ value, onDateCellClick }) => {
  const { token } = theme.useToken();
  const [isHovered, setIsHovered] = useState(false);
  
  const divStyle: React.CSSProperties = {
    padding: '20px',
    textAlign: "center",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
    backgroundColor: isHovered ? token.colorPrimaryBgHover : "transparent",
    cursor: 'pointer', // Indicate that this element is clickable
  };

  return (
    <div
      style={divStyle}
      onClick={() => onDateCellClick(value)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value.date()}
    </div>
  );
};

const DialyActivityList = ({}) => {
  const { token } = theme.useToken();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectDay, setSelectDay] = useState<Dayjs>(undefined);

  const onSelect = () => {
    if (selectDay && dayjs.isDayjs(selectDay)) {
      setOpenConfirmModal(false);
      const queryParams = new URLSearchParams({ d: selectDay.valueOf().toString() }).toString();
      const url = `${environment?.BASE_PATH ?? ''}/pdf/notebooks/activities?${queryParams}`;
      window.open(url, '_blank');
    }
  };

  const onDateCellClick = (value: Dayjs) => {
    setSelectDay(value);
    setOpenConfirmModal(true);
  };

  const dateCellRender = (value: Dayjs) => {
    return <DateCell value={value} onDateCellClick={onDateCellClick} />;
  };

  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
    margin: '20px',
    height: '100%', // Full height of its container
  };

  const appsContainerStyle: React.CSSProperties = {
    height: '100vh', // Set the full viewport height
    display: 'flex',
    flexDirection: 'column',
  };

 
  return (
    <>
      {openConfirmModal && (
        <ConfirmationModal
          open={openConfirmModal}
          onDeny={() => setOpenConfirmModal(false)}
          onConfirm={() => onSelect()}
          modalTitle={'طباعة النقرير اليومي'}
          paragraph={`هل أنت متأكد من طباعة التقرير البومي  ليوم :  ${selectDay.format("DD-MM-YYYY")}`}
        />
      )}
      <DialyActivityContextProvider>
        <AppsContainer
          cardStyle={{ padding: '10px', ...appsContainerStyle }}
          title='تقارير الانشطة اليومية'
          fullView
        >
          <div style={{ ...wrapperStyle, flex: 1 }}>
            <Calendar
              mode={"month"}
              dateFullCellRender={dateCellRender}
            />
          </div>
        </AppsContainer>
      </DialyActivityContextProvider>
    </>
  );
};

export default DialyActivityList;
