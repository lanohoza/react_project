import React from 'react';
import { Flex, Progress } from 'antd';


const ProgressBar = (data) => {
  return (
    <Flex gap="small" vertical>
      <Progress size="small" showInfo={false} percent={20}  status="active" />
    </Flex>
  );
};
export default ProgressBar;
