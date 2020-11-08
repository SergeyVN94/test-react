// import { Store } from 'redux';

// import config from './config';
// import baseEmployees from '../data/employees.json';

//   return filteredEmployee;
// };

// const reducer = (state: IStoreState, action: IStoreAction): IStoreState => {
//   console.info(`A new event has happened: '${action.type}'.`);

//   switch (action.type) {
//     case 'CHANGE_FILTERS':
//       return { ...state, filteredEmployee: filterEmployees(action.filtersState, state.employees) };

//     case 'EMPLOYEES_UPDATE':
//       return {
//         ...state,
//         employees: action.employees,
//         filteredEmployee: filterEmployees(state.filtersState, action.employees),
//       };

//     default:
//       return state;
//   }
// };

// const saveStateToLocalStorage = (store: Store<IStoreState, IStoreAction>): void => {
//   console.info('Trying to save application state.');

//   try {
//     localStorage.setItem('state', JSON.stringify(store.getState()));
//   } catch (error) {
//     console.error(error);
//   }
// };

// const defaultFiltersState = {
//   'sort-by': 'name',
//   'in-archive': false,
//   role: 'cook',
// };

// const defaultState = {
//   employees: [...baseEmployees],
//   filteredEmployee: filterEmployees(defaultFiltersState, baseEmployees),
//   filtersState: defaultFiltersState,
// };

// const checkState = (state: IStoreState): boolean => {
//   if (typeof state !== 'object' || !state) return false;

//   return config.stateKeys.every((key) => (
//     Object.prototype.hasOwnProperty.call(state, key)
//   ));
// };

// const loadState = (): IStoreState => {
//   console.info('An attempt was made to load the state of the application.');

//   try {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const state = JSON.parse(localStorage.getItem('state'));
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//     if (checkState(state)) return state;
//     console.warn('Invalid application state object loaded.');
//     console.warn('The application will be initialized to its default state.');
//   } catch (error) {
//     console.error(error);
//   }

//   return defaultState;
// };

// export {
//   saveStateToLocalStorage,
//   loadState,
//   reducer,
// };
