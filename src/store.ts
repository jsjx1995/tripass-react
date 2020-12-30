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

import { configureStore } from '@reduxjs/toolkit';
import { facilitySlice } from './ducks/facilitySlicer';
const store = configureStore({
  reducer: facilitySlice.reducer,
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
