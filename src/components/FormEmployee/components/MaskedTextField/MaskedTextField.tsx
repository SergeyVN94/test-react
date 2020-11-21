import React from 'react';
import InputMask from 'react-input-mask';
import { TextField } from '@material-ui/core';

interface IMaskedTextFieldProps {
  type?: 'text' | 'tel';
  name: string;
  label: string;
  placeholder: string;
  errorMessage?: string;
  mask: string;
  value?: string;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaskedTextField: React.FC<IMaskedTextFieldProps> = (props) => {
  const {
    type = 'text',
    label,
    name,
    placeholder,
    errorMessage = '',
    onChange,
    mask,
    value,
  } = props;

  return (
    <InputMask
      mask={mask}
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    >
      <TextField
        error={Boolean(errorMessage)}
        helperText={errorMessage}
        label={label}
        fullWidth
      />
    </InputMask>
  );
};

export default MaskedTextField;
