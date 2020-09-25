import React, { FormEvent } from 'react';

import './radio-group.sass';

const RadioGroup = (props: IRadioGroupProps): JSX.Element => {
  const {
    radioProps = [],
    onToggle = null,
  } = props;

  const defaultSelected = radioProps.find((radio) => radio.checked);

  const [selectedRadio, setSelectedRadio] = React.useState(
    defaultSelected ? defaultSelected.value : radioProps[0].value,
  );

  const handleChange = (ev: FormEvent<HTMLInputElement>): void => {
    setSelectedRadio(ev.currentTarget.value);
    onToggle && onToggle(ev.currentTarget.name, ev.currentTarget.value);
  };

  const radioElements = radioProps.map((radioProp) => {
    const { name, value, text } = radioProp;

    return (<label className='radio-group__radio' key={ value }>
      <input className='radio-group__input'
        type='radio' name={ name } value={ value } checked={ selectedRadio === value } onChange={ handleChange } />
      <div className='radio-group__new-input'></div>
      <p className='radio-group__text'>{ text }</p>
    </label>);
  });

  return (
    <div className='radio-group'>
      { radioElements }
    </div>
  );
};

export default RadioGroup;
