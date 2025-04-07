'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Typography, Image } from 'antd';

const { Title, Text } = Typography;

type PopUp = {
  id: number;
  title: string;
  description: string;
  sourceUrl: string;
  targetUrl: string;
  image:string;
};

const PopUpDialog = ({ item, onClose = () => { } }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [popUp, setPopUp] = useState<PopUp | null>(null);

  useEffect(() => {
    setPopUp(item);
    setIsModalVisible(true);
  }, [item]);

  const handleCancel = () => {
    setIsModalVisible(false);
    onClose();
  };

  return (
    <div>
      <Modal
        title={null}
        visible={isModalVisible}
        width={600}
        bodyStyle={{ textAlign: 'center' }}
        footer={null}
        centered
        onCancel={handleCancel}
      >
        {popUp && (
          <div>
            <img
              src={`data:image/jpeg;base64,${popUp.image}`}
              alt={popUp.title}
              style={{ maxWidth: '100%', marginBottom: 16, cursor: 'pointer', }}
              onClick={() => {
                if (popUp.targetUrl) {
                  window.open(popUp.targetUrl, '_blank');
                }
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PopUpDialog;

