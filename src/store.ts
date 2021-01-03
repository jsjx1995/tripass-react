// import { facilitySlice } from './ducks/facilitySlicer';
// import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// // import logger from 'redux-logger';

// // rootReducer の準備
// const rootReducer = combineReducers({
//   counter: facilitySlice.reducer,
// });

// // setup 関数を用意してエクスポートする。
// export const setupStore = () => {
//   const middlewares = [...getDefaultMiddleware()];
//   // const middlewares = [...getDefaultMiddleware(), logger];

//   const store = configureStore({
//     reducer: rootReducer,
//     middleware: middlewares,
//   });
//   return store;
// };

import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit"
import rootReducer, {RootState} from "redux/rootReducers"

const store = configureStore({
  reducer: rootReducer,
})
export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
