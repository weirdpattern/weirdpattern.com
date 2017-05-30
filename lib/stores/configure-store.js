import { createStore } from 'redux';
import reducers from '../reducers';

/**
 * Creates the store to be used.
 * @param {*} initialState the initial state of the application.
 */
export default (initialState) => {
  return createStore(reducers, initialState);
}
