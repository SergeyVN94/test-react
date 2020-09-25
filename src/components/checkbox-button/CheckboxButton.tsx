import React from 'react';

import './checkbox-button.sass';

const CheckboxButton = (props: ICheckboxProps): JSX.Element => {
  const {
    text,
    value,
    checked = false,
    onToggle = null,
  } = props;

  const [isChecked, setChecked] = React.useState(checked);

  const handleChange = (): void => {
    (onToggle && value) && onToggle(value, !isChecked);
    setChecked(!isChecked);
  };

  return (
    <label className='checkbox-button' >
      <input className='checkbox-button__input'
        type='checkbox' value={ value } checked={ isChecked } onChange={ handleChange } />
      <div className='checkbox-button__new-input'></div>
      <p className='checkbox-button__text'>{ text }</p>
    </label>
  );
};

export default CheckboxButton;
