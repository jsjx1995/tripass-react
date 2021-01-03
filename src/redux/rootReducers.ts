import {combineReducers} from "@reduxjs/toolkit"
import facilityReducer from "redux/facilitySlice"

const rootReducer = combineReducers({
  facilities: facilityReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
