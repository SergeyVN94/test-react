interface IEmployeeCardProps {
  'id': number;
  'name': string;
  'isArchive': boolean;
  'role': string;
  'phone': string;
  'birthday': string;
}

interface IEmployeesProps {
  employees: IEmployeeCardProps[];
}

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

type IStoreAction = {
  type: 'CHANGE_FILTERS';
  filtersState: IFiltersState;
};

interface ICheckboxProps {
  text: string;
  value: string;
  checked?: boolean;
  onToggle?: (value: string, checked: boolean) => void;
}

interface IRadioProps extends ICheckboxProps {
  name: string;
}

interface IRadioGroupProps {
  radioProps: IRadioProps[];
  onToggle?: (name: string, value: string) => void;
}

interface IDropdownProps {
  title?: string;
  name: string;
  items: { text: string; value: string; }[];
  onSelect?: (name: string, value: string) => void;
}

interface IFiltersProps {
  sortedBy?: IRadioProps[];
  statuses?: ICheckboxProps[];
  dropdowns?: IDropdownProps[];
  onUpdate: (filtersState: IFiltersState) => void;
}
