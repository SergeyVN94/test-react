import React from 'react';

import './dropdown.sass';

const Dropdown: React.FC<IDropdownProps> = (props) => {
  const {
    items = [],
    name = '',
    title = '',
    role = '',
    onSelect = null,
  } = props;

  const titleElement = title ? <h3 className='dropdown__title'>{ title }</h3> : '';

  let currentIndex = items.findIndex(({ text, value }) => (text === role || value === role));
  if (currentIndex < 0 || !role) currentIndex = 0;

  const [state, setState] = React.useState({
    currentIndex,
    isExpanded: false,
    headText: (items && items[currentIndex].text) || '',
  });

  const toggleExpanded = (): void => {
    setState((prevState) => ({ ...prevState, isExpanded: !state.isExpanded }));
  };

  const handleItemClick = (index: number): void => {
    const { text, value } = items[index];
    setState({ isExpanded: false, currentIndex: index, headText: text });
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
            items.map((item, index) => (
              <li className='dropdown__item' key={ item.value }>
                <p
                  className='dropdown__item-text'
                  data-value={ item.value }
                  onClick={ () => handleItemClick(index) }
                >
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
