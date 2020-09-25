import React from 'react';

import store from '../../store/store';
import Dropdown from '../dropdown/Dropdown';
import CheckboxButton from '../checkbox-button/CheckboxButton';
import RadioGroup from '../radio-group/RadioGroup';
import './filters.sass';

const Filters = (props: IFiltersProps): JSX.Element => {
  const {
    sortedBy = [],
    statuses = [],
    dropdowns = [],
    onUpdate,
  } = props;

  const { filtersState } = store.getState();

  const index = sortedBy.findIndex((item) => item.value === filtersState['sort-by']);
  if (index >= 0) sortedBy.forEach((_, i) => { sortedBy[i].checked = (i === index); });

  if (!sortedBy.some((item) => item.checked)) sortedBy.length && (sortedBy[0].checked = true);

  const handleDropdownSelect = (name: string, value: string): void => {
    if (name && value) filtersState[name] = value;
    onUpdate({ ...filtersState });
  };

  const handleCheckboxToggle = (value: string, checked: boolean): void => {
    filtersState[value] = checked;
    onUpdate({ ...filtersState });
  };

  const handleRadioGroupToggle = (name: string, value: string): void => {
    if (name && value) filtersState[name] = value;
    onUpdate({ ...filtersState });
  };

  return (<div className='filters'>
    {
      sortedBy
      && <div className='filters__sort-options'>
          <RadioGroup radioProps={ sortedBy } onToggle={ handleRadioGroupToggle } />
        </div>
    }
    {
      statuses
      && <div className='filters__statuses'>
        { statuses.map((item) => <CheckboxButton
          { ...item }
          onToggle={ handleCheckboxToggle }
          key={ item.value }
          checked={ (typeof filtersState[item.value] === 'boolean') && Boolean(filtersState[item.value]) }
        />) }
      </div>
    }
    {
      dropdowns
      && <div className='filters__dropdowns'>
        { dropdowns.map((item) => <Dropdown
          { ...item }
          onSelect={ handleDropdownSelect }
          key={ item.name }
          role={ filtersState.role && filtersState.role.toString() }
        />) }
      </div>
    }
  </div>);
};

export default Filters;
