interface IFiltersState {
  [index: string]: boolean | string;
}
type ChangeEventCallback = (state: IFiltersState) => void;

interface IEmployeeInfo {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}

interface IStoreState {
  employees: IEmployeeInfo[];
  filteredEmployee: IEmployeeInfo[];
  filterState: IFiltersState;
}

interface IStoreAction {
  type: 'change-filters';
  filtersState: IFiltersState;
}

type ActionCreatorChangeFilters = (filtersState: IFiltersState) => { type: 'change-filters'; filtersState: IFiltersState; };
