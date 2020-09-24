import React from 'react';
import ReactDOM from 'react-dom';

import './dropdown.sass';

const Dropdown = (props: IDropdownProps): JSX.Element => {
  const {
    items = [],
    name = '',
    title = '',
    onSelect = null,
  } = props;

  const titleElement = title ? <h3 className='dropdown__title'>{ title }</h3> : '';

  const [state, setSate] = React.useState({
    isExpanded: false,
    currentValue: (items && items[0].value) || '',
    headText: (items && items[0].text) || '',
  });

  const toggleExpanded = (): void => {
    setSate({ ...state, isExpanded: !state.isExpanded });
  };

  const handleItemClick = (value: string, text: string): void => {
    setSate({ isExpanded: false, currentValue: value, headText: text });
    onSelect && onSelect(name, value);
  };

  return (
    <div className={ `dropdown ${state.isExpanded ? 'dropdown_expanded' : ''}` }>
      { titleElement }
      <div className='dropdown__head' onClick={ toggleExpanded }>
        <p className='dropdown__head-text'>{ state.headText }</p>
        <button className='dropdown__expand-button'>expand_more</button>
      </div>
      <div className='dropdown__container'>
        <ul className='dropdown__items'>
          {
            items.map((item) => (
              <li className='dropdown__item' key={ item.value }>
                <p className='dropdown__item-text' data-value={ item.value } onClick={
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  handleItemClick.bind(this, item.value, item.text)
                }>
                  { item.text }
                </p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
