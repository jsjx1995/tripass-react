export interface Facility {
  id: number
  title: string
  genre: string
  facilityDesc: string
  postalcode: string
  address: string
  phone: string
  url: string
  accessibilities: string
  price: string
  discountedPrice: string
  geolocation: Geolocation
  isFree: boolean
  businessStatus: string
  businesshours: Businesshours
  photo: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Geolocation {
  latitude: number
  longitude: number
  distance: number
}

export interface Businesshours {
  open: {
    mon: string
    tue: string
    wed: string
    thu: string
    fri: string
    sat: string
    sun: string
  }
  close: {
    mon: string
    tue: string
    wed: string
    thu: string
    fri: string
    sat: string
    sun: string
  }
  // monOpen: string;
  // tueOpen: string;
  // wedOpen: string;
  // thuOpen: string;
  // friOpen: string;
  // satOpen: string;
  // sunOpen: string;
  // monClose: string;
  // tueClose: string;
  // wedClose: string;
  // thuClose: string;
  // friClose: string;
  // satClose: string;
  // sunClose: string;
}
