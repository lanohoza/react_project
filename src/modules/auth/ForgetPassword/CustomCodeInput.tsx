import React from 'react';
import ReactCodeInput from 'react-code-input';

interface CustomCodeInputProps {
  value: string;
  onChange: (code: string) => void;
  [key: string]: any; // Allow additional props
}

const CustomCodeInput = React.forwardRef<HTMLInputElement, CustomCodeInputProps>(
  ({ value, onChange, ...rest }, ref) => {
    const handleChange = (code: string) => {
      if (onChange) {
        onChange(code);
      }
    };

    return (
      <ReactCodeInput
        {...rest}
        value={value}
        onChange={handleChange}
        inputMode="numeric"
      />
    );
  }
);

CustomCodeInput.displayName = 'CustomCodeInput';

export default CustomCodeInput;
