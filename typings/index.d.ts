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
  filtersState: IFiltersState;
}

type IStoreAction = {
  type: 'CHANGE_FILTERS';
  filtersState: IFiltersState;
} | {
  type: 'EMPLOYEES_UPDATE';
  employees: IEmployeeInfo[];
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
  role?: string;
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

interface IFormEditProps {
  employeeInfo?: IEmployeeInfo;
  onSubmit?: (employee: IEmployeeInfo) => void;
}

interface ITextFieldProps {
  mask?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  theme?: string;
  onInput?: (value: string) => void;
}
