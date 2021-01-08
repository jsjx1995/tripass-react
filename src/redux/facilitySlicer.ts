import {Facility} from "../interfaces/facility.dto"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
// import getFacilities from './getFacilities';

export interface FacilityState {
  facilities: Facility[]
  loading: boolean
  error: string | null
}

interface FetchFacilitiesState {
  genres: string[]
  lat: number
  lng: number
}

const initialState: FacilityState = {
  facilities: [
    // {
    //   id: 1,
    //   title: 'hoge',
    //   genre: 'fuga',
    //   facilityDesc: 'fuga',
    //   postalcode: 'fuga',
    //   address: 'fuga',
    //   phone: 'fuga',
    //   url: 'fuga',
    //   accessibilities: 'fuga',
    //   price: 'fuga',
    //   geolocation: {
    //     latitude: 35.6537998,
    //     longitude: 139.7105141,
    //     distance: 0.004539059031182368,
    //   },
    //   businesshours: {
    //     monOpen: '19:00',
    //     tueOpen: '19:00',
    //     wedOpen: '19:00',
    //     thuOpen: '19:00',
    //     friOpen: '19:00',
    //     satOpen: '19:00',
    //     sunOpen: '19:00',
    //     monClose: '19:00',
    //     tueClose: '19:00',
    //     wedClose: '19:00',
    //     thuClose: '19:00',
    //     friClose: '19:00',
    //     satClose: '19:00',
    //     sunClose: '19:00',
    //     businesshoursDesc: '土日祝はお休みです。',
    //   },
    //   photo: ['./fuga', './fuga', './fuga', './fuga'],
    //   createdAt: new Date('2020-11-10T04:55:32.200Z'),
    //   updatedAt: new Date('2020-11-10T04:55:32.200Z'),
    // },
    // {
    //   id: 2,
    //   title: 'hoge',
    //   genre: 'fuga',
    //   facilityDesc: 'fuga',
    //   postalcode: 'fuga',
    //   address: 'fuga',
    //   phone: 'fuga',
    //   url: 'fuga',
    //   accessibilities: 'fuga',
    //   price: 'fuga',
    //   geolocation: {
    //     latitude: 35.6537998,
    //     longitude: 139.7105141,
    //     distance: 0.004539059031182368,
    //   },
    //   businesshours: {
    //     monOpen: '19:00',
    //     tueOpen: '19:00',
    //     wedOpen: '19:00',
    //     thuOpen: '19:00',
    //     friOpen: '19:00',
    //     satOpen: '19:00',
    //     sunOpen: '19:00',
    //     monClose: '19:00',
    //     tueClose: '19:00',
    //     wedClose: '19:00',
    //     thuClose: '19:00',
    //     friClose: '19:00',
    //     satClose: '19:00',
    //     sunClose: '19:00',
    //     businesshoursDesc: '土日祝はお休みです。',
    //   },
    //   photo: ['./fuga', './fuga', './fuga', './fuga'],
    //   createdAt: new Date('2020-11-10T04:55:32.200Z'),
    //   updatedAt: new Date('2020-11-10T04:55:32.200Z'),
    // },
  ],
  loading: false,
  error: null,
}

const BASE_URL = process.env.REACT_APP_API_URL

export const fetchFacilities = createAsyncThunk(
  "facility/fatchFacilities",
  async (arg: FetchFacilitiesState, thunkAPI) => {
    const {genres, lat, lng} = arg

    const genres_params = genres.reduce((prev: string, current: string) => {
      prev += `genres[]=${current}&`
      return prev
    }, "queries?")
    const geo_params = `lat=${lat}&lng=${lng}`
    // const facilitiesData = await fetch(
    //   'http://localhost:3333/facility/queries?genres[]=fuga&genres[]=foo&genres[]=nophoto&lat=34.6911812&lng=135.4914561',
    //   {
    const facilitiesData = await fetch(BASE_URL + "facility/" + genres_params + geo_params, {
      method: "GET",
    })
    if (facilitiesData.ok) {
      return await facilitiesData.json()
    }
    throw new Error("fetch count error")
  }
)

export const facilitySlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFacilities.pending.type]: (state, action) => {
      return {
        ...state,
      }
    },
    [fetchFacilities.fulfilled.type]: (state, action): FacilityState => {
      // console.log(state);
      // console.log(action.payload);
      return {
        ...state,
        error: "",
        loading: false,
        facilities: action.payload,
      }
    },
    [fetchFacilities.rejected.type]: (state, action) => {
      console.log(state)
      console.log(action)
    },
  },
})
