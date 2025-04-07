import styled from 'styled-components';
import { Form, Select, DatePicker, Button } from 'antd';

export const StyledForm = styled(Form)`
  margin: 0 auto; /* Center align the form */
  width: 50%; /* Adjust width as needed */
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 20px; /* Adjust spacing between form items */
  label {
    font-weight: bold;
  }
`;

export const StyledSelect = styled(Select)`
  width: 100%; /* Make selects take full width */
`;

export const StyledDatePicker = styled(DatePicker)`
  width: 100%; /* Make date pickers take full width */
`;

export const StyledButton = styled(Button)`
  margin-top: 10px; /* Add margin above the button */
`;

export const TaskContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #d9d9d9;
  padding: 16px;
  border-radius: 4px;
`;

export const SelectedTasksContainer = styled.div`
max-height: 200px; /* Adjust max height as needed */
overflow-y: auto;
border: 1px solid #d9d9d9;
padding: 16px;
margin-top: 20px;
border-radius: 4px;
`;

export const SelectedTaskItem = styled.div`
  margin-bottom: 8px;
`;

export const TaskDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;