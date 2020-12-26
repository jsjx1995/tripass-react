import Geocode from "react-geocode"

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY as string

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(GOOGLE_API_KEY)

// set response language. Defaults to english.
Geocode.setLanguage("ja")

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion("jp")

// Enable or disable logs. Its optional.
Geocode.enableDebug()

// Get latitude & longitude from address.

interface geocodeReturnType {
  lat: number
  lng: number
}
export const geocode = (address: string): Promise<geocodeReturnType | void> => {
  return Geocode.fromAddress(address).then(
    (response) => {
      const {lat, lng} = response.results[0].geometry.location
      return {
        lat: lat as number,
        lng: lng as number,
      }
    },
    (error) => {
      console.error(error)
    }
  )
}
