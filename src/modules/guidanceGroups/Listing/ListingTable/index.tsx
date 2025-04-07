import React, { useState } from 'react';
import ItemActions from './ItemActions';
import { StyledListId, StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import { GuidanceGroup, GetGuidanceGroupDto } from '@core/types/models/guidanceGroup/GuidanceGroupTypes';
import { useGuidanceGroupContext, useGuidanceGroupActionsContext } from '../../GuidanceGroupsContextProvider';
import { Card, Col, Row } from 'antd';




const GuidanceGroupsTable = () => {
  const { guidanceGroupsPage, loading, detailOpen, selectedRow } = useGuidanceGroupContext();
  const { onView, setDetailOpen } = useGuidanceGroupActionsContext();

  // Function to handle row click
  const onRowClick = (record) => {

    if (selectedRow && selectedRow.id === record.id) {
      setDetailOpen(false)
    } else {
      onView(record);
    }
  };
  const columns: ColumnsType<RecentTCItemType> = [
    {
      title: 'العنوان',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'عدد التلاميذ',
      dataIndex: 'studentCount',
      key: 'studentCount',
    },
    {
      title: 'العمليات',
      dataIndex: 'id',
      key: 'id',
      className: 'List-table-action',
      fixed: 'right',
      render: (_, record) => (<ItemActions item={record} />),
    },
  ];
  const studntColumns: ColumnsType<RecentTCItemType> = [
    {
      title: 'الرقم التعريفي المدرسي',
      dataIndex: 'nbrRakmana',
      key: 'nbrRakmana',
    },
    {
      title: 'الاسم',
      dataIndex: 'firstName',
      key: 'studentCount',
    },
    {
      title: 'اللقب',
      dataIndex: 'lastName',
      key: 'lastName',
   },
   ,
    {
      title: 'تاريخ الميلاد',
      dataIndex: 'birthDate',
      key: 'birthDate',
   },  
   {
     title: 'القسم',
     dataIndex: 'classeTitle',
     key: 'classeTitle',
  },
  ];
  return (
    <Row gutter={16}>
      {/* Conditionally render the Card only if a row is selected */}


      <Col span={detailOpen ? 10 : 24}>
        <StyledListTable
          hoverColor
          data={guidanceGroupsPage.content}
          loading={loading}
          columns={columns}
          onRow={(record) => {
            return {
              onClick: () => {
                onRowClick(record); // Handle row click
              },
            };
          }}
          scroll={{ x: 'auto' }}
        /></Col>
      {detailOpen && (
        <Col span={14}>
          <Card title="المجموعة الارشادية بالتفاصيل" style={{ marginBottom: 16 }}>
            <p><b>العنوان:</b> {selectedRow.title} </p>
            <p><b>عدد التلاميذ:</b> {selectedRow.studentCount}</p>
            <p><b> التلاميذ:</b></p>
            <StyledListTable
              hoverColor
              data={selectedRow.studentDtos}
              columns={studntColumns}
              scroll={{ x: 'auto' }}
            />

          </Card>
        </Col>
      )}
    </Row>
  );
};

export default GuidanceGroupsTable;
