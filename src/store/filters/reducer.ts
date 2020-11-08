import { Reducer } from 'redux';
import {
  FiltersActionTypes,
  IFiltersState,
  SET_FLAG_ARCHIVE,
  SET_ROLE,
  SET_SORTING_OPTION,
} from './types';

const initialState: IFiltersState = {
  role: 'cook',
  sortBy: 'name',
  inArchive: false,
};

const filtersReducer: Reducer<IFiltersState, FiltersActionTypes> = (
  state = initialState,
  action,
): IFiltersState => {
  switch (action.type) {
    case SET_ROLE:
      return { ...state, role: action.payload };

    case SET_SORTING_OPTION:
      return { ...state, sortBy: action.payload };

    case SET_FLAG_ARCHIVE:
      return { ...state, inArchive: action.payload };

    default:
      return state;
  }
};

export default filtersReducer;
