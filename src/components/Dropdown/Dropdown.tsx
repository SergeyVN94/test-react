import React, { useState } from 'react';
import { block } from 'bem-cn';

import './Dropdown.sass';

interface IDropdownItem {
  label: string;
  value: string;
  selected?: boolean;
}

interface IDropdownProps {
  title?: string;
  name: string;
  items: IDropdownItem[];
  onChange: (value: string) => void;
}

const b = block('dropdown');

const Dropdown: React.FC<IDropdownProps> = (props) => {
  const {
    items = [],
    name = '',
    title = '',
    onChange,
  } = props;

  const [isOpened, setOpened] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(() => {
    const index = items.findIndex((item) => item.selected);
    return index < 0 ? 0 : index;
  });

  const handleItemClick = (index: number): void => {
    const { value } = items[index];
    setCurrentIndex(index);
    onChange(value);
  };

  const bodyItems = items.map(({ label, value, selected }, index) => (
    <li className={b('item-wrapper', { selected })} key={value}>
      <button className={b('item')} onClick={() => handleItemClick(index)} >{label}</button>
    </li>
  ));

  return (
    <div className={b({ opened: isOpened })}>
      { title && <h3 className={b('title')}>{ title }</h3> }
      <div className={b('head')}>
        <input
          className={b('input')}
          value={items[currentIndex].label}
          onClick={(prev) => setOpened(!prev)}
          name={name}
          readOnly
        />
        <button className={b('button')}>expand_more</button>
      </div>
      <div className={b('container')}>
        <ul className={b('items')}>
          { bodyItems }
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;

export type { IDropdownProps, IDropdownItem };
