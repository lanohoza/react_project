import { Row, Col, Button, Tree } from 'antd';
import styled from 'styled-components';


export const StyledRow = styled(Row)`
cursor: pointer;

  .ant-btn {
    visibility: hidden;
  }

  &:hover {
    background: #f5f5f5;
    .ant-btn {
      visibility: visible;
    }
  }
`;