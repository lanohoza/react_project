import React, { useState } from 'react';
import { Dropdown, Modal, message, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton/index';
import { deleteScolarYearTask } from '@core/services/TaskService';
import { useRouter } from 'next/navigation';
import { ScolarYearTask } from '@core/types/models/task/TaskTypes';

type TaskActionsProps = {
  task: ScolarYearTask;
  onDelete: (id: number) => void;
};

const TaskActions: React.FC<TaskActionsProps> = ({ task, onDelete }) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const idTaskId = task.idTask?.id;

  const handleMenuClick = (e: any) => {
    if (e.key === '3') {
      showModal();
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleDelete = async () => {
    try {
      // await deleteScolarYearTask(task.id);
      message.success('تم حذف المهمة بنجاح');
      onDelete(task.id);
    } catch (error) {
      message.error('فشل في حذف المهمة');
      console.error('Error deleting task', error);
    } finally {
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleEdit = () => {
    router.push(`/technical-cards/edit/${idTaskId}`);
  };

  const handleView = () => {
    router.push(`/technical-cards/view/${idTaskId}`);
  };

  const items = [
    {
      key: 1,
      label: (
        <span style={{ fontSize: 14 }} onClick={handleView}>
          عرض
        </span>
      ),
    },
    {
      key: 2,
      label: (
        <span style={{ fontSize: 14 }} onClick={handleEdit}>
          تعديل
        </span>
      ),
    },
    { key: '3', label: <span style={{ fontSize: 14 }}>حذف</span> },
  ];

  return (
    <>
      <Dropdown overlay={<Menu onClick={handleMenuClick} items={items} />} trigger={['click', 'hover']}>
        <AppIconButton icon={<MoreOutlined />} />
      </Dropdown>

      <Modal
        title="تأكيد الحذف"
        visible={visible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="حذف"
        cancelText="إلغاء"
      >
        <p>هل أنت متأكد أنك تريد حذف هذه البطاقة التقنية؟</p>
      </Modal>
    </>
  );
};

export default TaskActions;
