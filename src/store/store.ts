import * as Redux from 'redux';

import {
  saveStateToLocalStorage,
  loadState,
  reducer,
} from './lib';

const store = Redux.createStore(reducer, loadState());

saveStateToLocalStorage(store);

store.subscribe(() => {
  saveStateToLocalStorage(store);
});

export default store;
