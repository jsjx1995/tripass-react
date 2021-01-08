import {Facility} from "interfaces/facility.dto"
import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import axios from "axios"
import {AppThunk} from "store"

const BASE_URL = process.env.REACT_APP_API_URL

export interface FacilityState {
  facilities: Facility[]
  loading: boolean
  error: string | null
}

const startLoading = (state: FacilityState) => {
  state.loading = true
}
const loadingFailed = (state: FacilityState, action: PayloadAction<string>) => {
  state.loading = false
  state.error = action.payload
}

const initialState: FacilityState = {
  facilities: [],
  loading: false,
  error: null,
}

export const facilitySlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    getFacilityStart: startLoading,
    getFacilitiesStart: startLoading,
    getFacilitySuccess(state, {payload}: PayloadAction<Facility>) {
      const facility = payload
      state.facilities = [facility]
      state.loading = false
      state.error = null
    },
    getFacilitiesSuccess(state, {payload}: PayloadAction<Facility[]>) {
      const facilities = payload
      state.facilities = facilities
      state.loading = false
      state.error = null
    },
    getFacilityFailure: loadingFailed,
    getFacilitiesFailure: loadingFailed,
  },
})

export const {
  getFacilityStart,
  getFacilitiesStart,
  getFacilitySuccess,
  getFacilitiesSuccess,
  getFacilityFailure,
  getFacilitiesFailure,
} = facilitySlice.actions

export default facilitySlice.reducer

export const fetchFacility = (id: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getFacilityStart())
    const facility = await getFacility(id)
    if (facility) dispatch(getFacilitySuccess(facility))
  } catch (error) {
    dispatch(getFacilityFailure)
    console.log("🚀 ~ file: facilitySlice.ts ~ line 105 ~ error", error)
  }
}

const getFacility = async (id: number): Promise<Facility | undefined> => {
  const url = BASE_URL + `facility/oneFacility?id=${id}`
  try {
    const {data} = await axios.get<Facility>(url)
    if (data) {
      return data
    }
  } catch (error) {
    console.log("🚀 ~ file: facilitySlice.ts ~ line 78 ~ getFacility ~ error", error)
  }
}

export const fetchFacilities = (genres: string[], lat: number, lng: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getFacilitiesStart())
    const facilities = await getFacilities(genres, lat, lng)
    if (facilities) dispatch(getFacilitiesSuccess(facilities))
  } catch (error) {
    dispatch(getFacilitiesFailure)
    console.log("🚀 ~ file: facilitySlice.ts ~ line 105 ~ error", error)
  }
}

const getFacilities = async (genres: string[], lat: number, lng: number): Promise<Facility[] | undefined> => {
  try {
    const genres_params = genres.reduce((prev: string, current: string) => {
      prev += `genres[]=${current}&`
      return prev
    }, "")
    const geo_params = `lat=${lat}&lng=${lng}`

    const url = BASE_URL + "facility/queries?" + genres_params + geo_params
    const {data} = await axios.get<Facility[]>(url)
    if (data) {
      return data
    }
  } catch (error) {
    console.log("🚀 ~ file: facilitySlice.ts ~ line 78 ~ getFacility ~ error", error)
    throw error
  }
}
