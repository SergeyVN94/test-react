import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Employees from '../components/employees/Employees';

const mapStateToProps = (state: IStoreState): IEmployeesProps => (
  { employees: state.filteredEmployee }
);

const EmployeesContainer = connect(mapStateToProps)(Employees);

export default EmployeesContainer;
