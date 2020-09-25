const actionFiltersUpdate = (filtersState: IFiltersState): IStoreAction => ({
  type: 'CHANGE_FILTERS',
  filtersState,
});

const actionEmployeesUpdate = (employees: IEmployeeInfo[]): IStoreAction => ({
  type: 'EMPLOYEES_UPDATE',
  employees,
});

export {
  actionFiltersUpdate,
  actionEmployeesUpdate,
};
