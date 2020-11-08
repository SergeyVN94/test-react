import React from 'react';
import { block } from 'bem-cn';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, FormControlLabel } from '@material-ui/core';

import { IFiltersState } from '../../store/filters/types';
import { setFlagArchive } from '../../store/filters/actions';
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
};

const connector = connect(mapStoreToProps, mapDispatch);

const b = block('filters');

type FiltersProps = ConnectedProps<typeof connector>;

const Filters: React.FC<FiltersProps> = (props) => {
  const { role, sortBy, inArchive } = props.state;

  return (
    <form className={b()}>
      <FormControlLabel
        label="в архиве"
        control={<Switch
          value="in-archive"
          checked={inArchive}
          onChange={(_, checked) => props.setFlagArchive(checked)}
        />}
      />
    </form>
  );
};

export default connector(Filters);
