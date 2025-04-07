import React from 'react';
import { Dropdown } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { useRapidAccesActionsContext } from '../../RapidAccesContextProvider';
import { useRouter } from 'next/navigation';

const ItemActions = ({ item }) => {
  const { setSelectdStudent, onChangeOpenAddInterviewAction,onViewStudent } = useRapidAccesActionsContext();
  const router = useRouter();

  const doInterview = () => {
    setSelectdStudent(item);
    onChangeOpenAddInterviewAction(true);
  }
  const items = [
    {
      key: 1,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => { onViewStudent(item)}}>
          عرض معلومات الشخصية
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => { doInterview();}}>
          تسجيل مقابلة
        </div>
      ),
    },
    {
      key: 2,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => { }}>
          تسجيل متابعة
        </div>
      ),
    },
    {
      key: 3,
      label: (
        <div style={{ fontSize: 14 }} onClick={() => { router.push("/cards/student") }}>
          البطاقة الارشادية
        </div>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click', 'hover']}>
      <AppIconButton icon={<MoreOutlined />} />
    </Dropdown>
  );
};
export default ItemActions;