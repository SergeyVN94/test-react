import React from 'react';
import { block } from 'bem-cn';
import { connect, ConnectedProps } from 'react-redux';
import {
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

import { IFiltersState, SortingOptions } from '../../store/filters/types';
import { setFlagArchive, setRole, setSortingOption } from '../../store/filters/actions';
import { RootState } from '../../store/rootReducer';

import './Filters.sass';

interface IFiltersProps {
  state: IFiltersState;
}

const mapStoreToProps = (store: RootState): IFiltersProps => ({
  state: store.filters,
});

const mapDispatch = {
  setFlagArchive,
  setRole,
  setSortingOption,
};

const connector = connect(mapStoreToProps, mapDispatch);

const b = block('filters');

type FiltersProps = ConnectedProps<typeof connector>;

const Filters: React.FC<FiltersProps> = (props) => {
  const { role, sortBy, inArchive } = props.state;

  const handleSelectChange = ({ target }: React.ChangeEvent<{ value: typeof role }>): void => {
    props.setRole(target.value);
  };

  const handleRadioChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    props.setSortingOption(target.value as SortingOptions);
  };

  return (
    <form className={b()}>
      <div className={b('item')}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Сортировать по:</FormLabel>
          <RadioGroup
            aria-label="sort-option"
            name="sort-option"
            value={sortBy}
            onChange={handleRadioChange}
            row
          >
            <FormControlLabel value="name" control={<Radio />} label="Имя" inlist />
            <FormControlLabel value="date-of-birth" control={<Radio />} label="Дата рождения" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={b('item')}>
        <FormControlLabel
          label="в архиве"
          control={<Switch
            value="in-archive"
            checked={inArchive}
            onChange={(_, checked) => props.setFlagArchive(checked)}
          />}
        />
      </div>
      <div className={b('item')}>
        <Select id="select" label="Должность" value={role} onChange={handleSelectChange}>
          <MenuItem value="cook">Повар</MenuItem>
          <MenuItem value="driver">Водитель</MenuItem>
          <MenuItem value="waiter">Официант</MenuItem>
        </Select>
      </div>
    </form>
  );
};

export default connector(Filters);
