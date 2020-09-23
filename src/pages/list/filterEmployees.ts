const filterEmployees = (
  filtersState: IFiltersState,
  employees: IEmployeeInfo[],
): IEmployeeInfo[] => {
  let filteredEmployee = [...employees];

  Object.keys(filtersState).forEach((key) => {
    if (key === 'in-archive') {
      filteredEmployee = filteredEmployee.filter((employee) => (
        filtersState[key]
          ? employee.isArchive
          : !employee.isArchive
      ));
    }

    if (key === 'post') {
      filteredEmployee = filteredEmployee.filter(
        (employee) => (employee.role === filtersState[key]),
      );
    }

    if (key === 'sort-by') {
      if (filtersState[key] === 'name') {
        filteredEmployee = filteredEmployee.sort((a, b) => {
          if (a.name < b.name) return -1;
          return (a.name > b.name) ? 1 : 0;
        });
      }

      if (filtersState[key] === 'date-of-birth') {
        filteredEmployee = filteredEmployee.sort((a, b) => {
          let [day, month, fullYear] = a.birthday.split('.').map((num) => parseInt(num, 10));
          const dateA = new Date(fullYear, month, day);

          [day, month, fullYear] = b.birthday.split('.').map((num) => parseInt(num, 10));
          const dateB = new Date(fullYear, month, day);

          if (dateA.getTime() < dateB.getTime()) return -1;
          return (dateA.getTime() > dateB.getTime()) ? 1 : 0;
        });
      }
    }
  });

  return filteredEmployee;
};

export default filterEmployees;
