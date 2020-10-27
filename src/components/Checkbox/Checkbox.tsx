import React from 'react';
import { block } from 'bem-cn';

import './checkbox-button.sass';

interface ICheckboxProps {
  label: string;
  name: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}

const b = block('checkbox');

const CheckboxButton: React.FC<ICheckboxProps> = (props) => {
  const {
    label,
    name,
    checked = false,
    onChange,
  } = props;

  const [isChecked, setChecked] = React.useState(checked);

  const handleChange = (): void => {
    onChange(!isChecked);
    setChecked(!isChecked);
  };

  return (
    <label className={b()} >
      <input
        className={b('input')}
        type='checkbox'
        name={name}
        checked={isChecked}
        onChange={handleChange}
      />
      <span className={b('new-input')}>check</span>
      <span className={b('label-text')}>{label}</span>
    </label>
  );
};

export default CheckboxButton;
