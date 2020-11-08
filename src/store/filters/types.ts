export const SET_ROLE = '@FILTERS/SET_ROLE';
export const SET_SORTING_OPTION = '@FILTERS/SET_SORTING_OPTION';
export const SET_FLAG_ARCHIVE = '@FILTERS/SET_FLAG_ARCHIVE';

export type Role = 'cook' | 'driver' | 'waiter';
export type SortingOptions = 'name' | 'date-of-birth';

export interface IFiltersState {
  role: Role;
  sortBy: SortingOptions;
  inArchive: boolean;
}

interface ISetRoleAction {
  type: typeof SET_ROLE;
  payload: Role;
}

interface ISortingOptionAction {
  type: typeof SET_SORTING_OPTION;
  payload: SortingOptions;
}

interface ISetFlagArchiveAction {
  type: typeof SET_FLAG_ARCHIVE;
  payload: boolean;
}

export type FiltersActionTypes = ISetRoleAction | ISortingOptionAction | ISetFlagArchiveAction;
