import React from 'react';

import './checkbox-button.sass';

const CheckboxButton: React.FC<ICheckboxProps> = (props) => {
  const {
    text,
    value,
    checked = false,
    onToggle = null,
  } = props;

  const [isChecked, setChecked] = React.useState(checked);

  const handleChange = (): void => {
    onToggle && onToggle(value, !isChecked);
    setChecked((isPrevChecked) => !isPrevChecked);
  };

  return (
    <label className='checkbox-button' >
      <input
        className='checkbox-button__input'
        type='checkbox'
        value={ value }
        checked={ isChecked }
        onChange={ handleChange }
      />
      <div className='checkbox-button__new-input'>check</div>
      <p className='checkbox-button__text'>{ text }</p>
    </label>
  );
};

export default CheckboxButton;
