import styled from 'styled-components';
import { Button, Form, Input, Select, DatePicker, InputNumber } from 'antd';

const { Option } = Select;

// Styled components for custom styling
export const StyledForm = styled(Form)`
  margin: 0 auto; /* Center align the form */
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px; /* Adjust spacing between form items */
`;

export const StyledInput = styled(Input)`
  width: 100%; /* Make inputs take full width */
`;

export const StyledSelect = styled(Select)`
  width: 100%; /* Make selects take full width */
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%; /* Make date pickers take full width */
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%; /* Make input numbers take full width */
`;

export const StyledButton = styled(Button)`
  margin-top: 10px; /* Add margin above the button */
`;
