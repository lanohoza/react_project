import React from 'react';
import ItemActions from './ItemActions';
import { StyledListTable } from '@core/styles/list/index.styled';

import type { ColumnsType } from 'antd/es/table';
import { RecentTCItemType } from '@core/types/models/technicalCards/technicalCardsTypes';
import {
  useFollowupActionsContext,
  useFollowupContext,
} from '../../FollowupsContextProvider';
import { Card, Col, Row } from 'antd';
import { FollowupCreateType, FollowupType } from '@core/types/models/followUp/FollowupTypes';
import dayjs from 'dayjs';

const FollowpsTable = () => {
  const { followpsPage, loading, detailOpen, selectedRow } = useFollowupContext();
  const { onView, closeDetailOpen } = useFollowupActionsContext();
  const statusMapping = {
    done: 'منجز',
    todo: 'للتنفيذ',
    in_progress: 'قيد التنفيذ',
    en_pause: 'متوقف',
    canceled: 'ملغي',
    not_completed: 'غير مكتمل',
    pending: 'معلق',
  };




  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': {
        return '#E2A72E';
      }
      case 'done': {
        return '#43C888';
      }
      case 'in_progress': {
        return '#4E9AE2';
      }
      case 'en_pause': {
        return '#E2D84E';
      }
      case 'canceled': {
        return '#F84E4E';
      }
      case 'not_completed': {
        return '#D8A8E2';
      }
      case 'pending': {
        return '#E2A72E';
      }
      default: {
        return '#F84E4E';
      }
    }
  };
  const onRowClick = (record) => {
    if (selectedRow && selectedRow.id === record.id) {
      closeDetailOpen();
    } else {
      onView(record);
    }
  };
  const columns: ColumnsType<RecentTCItemType> = [
    {
      title: 'الرقم',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: ' التلميذ/المجموعة',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: 'مصدر الإحالة',
      dataIndex: 'createType',
      key: 'createType',
      render: (createType) => (
        <span
          className='badge'
          style={{
            padding: 5,
            margin: "0 5px",
            fontWeight: 700,
            color: createType == FollowupCreateType.manual ? "#4E9AE2" : "#D8A8E2",
            backgroundColor: createType == FollowupCreateType.manual ? "#4E9AE2" + '44' : "#D8A8E2" + '44',
          }}
        >
          {createType == FollowupCreateType.manual ? "يدوي" : "آلي"}
        </span>
      ),
    },
    {
      title: 'تاريخ الانشاء',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (createdDate) => (
        <span>
          {dayjs(createdDate).format("YYYY-MM-DD HH:mm:ss")}
        </span>
      )
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          className='badge'
          style={{
            color: getStatusColor(status),
            backgroundColor: getStatusColor(status) + '44',
          }}
        >
          {statusMapping[status]}
        </span>
      ),
    },
    {
      title: 'العمليات',
      dataIndex: 'id',
      key: 'id',
      className: 'List-table-action',
      fixed: 'right',
      render: (_, record) => <ItemActions item={record} />,
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

      <Col span={detailOpen ? 14 : 24}>
        <StyledListTable
          hoverColor
          data={followpsPage.content}
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
        />
      </Col>
      {detailOpen && (
        <Col span={10}>
          <Card title='المتابعة بالتفاصيل' style={{ marginBottom: 16 }}>
            <p>
              <b>الرقم:</b> {selectedRow.number}
            </p>
            <p>
              <b> التلميذ/المجموعة:</b> {selectedRow.target}
            </p>

            <p>
              <b>مصدر الإحالة:</b>

              <span
                className='badge'
                style={{
                  padding: 5,
                  margin: "0 5px",
                  fontWeight: 700,
                  color: selectedRow.createType == FollowupCreateType.manual ? "#4E9AE2" : "#D8A8E2",
                  backgroundColor: selectedRow.createType == FollowupCreateType.manual ? "#4E9AE2" + '44' : "#D8A8E2" + '44',
                }}
              >
                {selectedRow.createType == FollowupCreateType.manual ? "يدوي" : "آلي"}
              </span>
            </p>
            <p>
              <b> تاريخ الانشاء:</b> {selectedRow.createDate}
            </p>
            <p>
              <b>التشخيص:</b>  {selectedRow.shedCategory}
            </p>
            <p>
              <b> التشخيص المستهدف:</b>{' '}
              {selectedRow?.shedSettings?.map((shedSetting) => (
                <div>- {shedSetting}</div>
              ))}
            </p>
            <p>
              <b> الوصف :</b> {selectedRow.description}
            </p>
            <p>
              <b> سند الإرشاد:</b> {selectedRow.resourceUrl}
            </p>
            {selectedRow.type == FollowupType.group &&

              (
                <div>  <p><b> التلاميذ:</b></p>
                  <StyledListTable
                    hoverColor
                    data={selectedRow.studentDtos}
                    columns={studntColumns}
                    scroll={{ x: 'auto' }}
                  /></div>)
            }

          </Card>
        </Col>
      )}
    </Row>
  );
};

export default FollowpsTable;
