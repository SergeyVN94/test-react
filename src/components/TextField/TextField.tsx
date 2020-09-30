import React, { FormEvent } from 'react';

import './text-field.sass';

const TextField = (props: ITextFieldProps): JSX.Element => {
  const {
    mask = '',
    name = '',
    placeholder = '',
    value: initialValue = '',
    onInput = null,
    theme = '',
  } = props;

  const [value, setValue] = React.useState(initialValue);

  const themes = theme === 'incorrect-value' ? 'text-field_theme_incorrect-value' : '';

  const parseWithMask = (currentValue: string): string => {
    let numbers = currentValue.match(/\d/g) || [];
    const maskNumbers = mask.match(/[0]/g) || [];

    numbers = numbers.slice(0, maskNumbers.length);

    const chunks: string[] = [];

    for (let i = 0, j = 0; j < numbers.length; i += 1) {
      const isCharNumber = mask[i] === '0';
      chunks.push(isCharNumber ? numbers[j] : mask[i]);
      isCharNumber && (j += 1);
    }

    return chunks.join('');
  };

  const handleInput = (ev: FormEvent<HTMLInputElement>): void => {
    const currentValue = mask
      ? parseWithMask(ev.currentTarget.value)
      : ev.currentTarget.value;
    setValue(currentValue);
    onInput && onInput(currentValue);
  };

  return (<input
    className={ `text-field ${themes}` }
    type='text'
    name={ name }
    placeholder={ placeholder }
    value={ value }
    onInput={ handleInput }
  />);
};

export default TextField;
