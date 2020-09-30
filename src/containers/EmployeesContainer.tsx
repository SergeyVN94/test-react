import { connect } from 'react-redux';

import Employees from '../components/Employees/Employees';

const mapStateToProps = (state: IStoreState): IEmployeesProps => (
  { employees: state.filteredEmployee }
);

const EmployeesContainer = connect(mapStateToProps)(Employees);

export default EmployeesContainer;
