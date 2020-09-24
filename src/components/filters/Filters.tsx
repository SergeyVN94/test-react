import React from 'react';
import ReactDOM from 'react-dom';

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

  if (!sortedBy.some((item) => item.checked)) sortedBy.length && (sortedBy[0].checked = true);

  const filtersState: IFiltersState = {};

  sortedBy.forEach((item) => {
    if (item.name && item.value && item.checked) filtersState[item.name] = item.value;
  });

  statuses.forEach((item) => {
    if (item.value) filtersState[item.value] = item.checked;
  });

  dropdowns.forEach((item) => {
    if (item.name && item.items) filtersState[item.name] = item.items[0].value;
  });

  onUpdate({ ...filtersState });

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
          { ...item } onToggle={ handleCheckboxToggle } />) }
      </div>
    }
    {
      dropdowns
      && <div className='filters__dropdowns'>
        { dropdowns.map((item) => <Dropdown
          { ...item } onSelect={ handleDropdownSelect } />) }
      </div>
    }
  </div>);
};

export default Filters;
