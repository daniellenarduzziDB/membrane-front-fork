import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './combineReducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
    initialState
  );
}
