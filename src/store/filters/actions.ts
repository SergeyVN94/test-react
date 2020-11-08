import {
  FiltersActionTypes,
  Role,
  SET_FLAG_ARCHIVE,
  SET_ROLE,
  SET_SORTING_OPTION,
  SortingOptions,
} from './types';

export const setRole = (role: Role): FiltersActionTypes => ({
  type: SET_ROLE,
  payload: role,
});

export const setSortingOption = (option: SortingOptions): FiltersActionTypes => ({
  type: SET_SORTING_OPTION,
  payload: option,
});

export const setFlagArchive = (flag: boolean): FiltersActionTypes => ({
  type: SET_FLAG_ARCHIVE,
  payload: flag,
});
