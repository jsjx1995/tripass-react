import { Flex, View } from '@adobe/react-spectrum'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ShowFacility from 'components/molecules/ShowFacility'
import HeaderComponent from 'components/templates/Header'
import { fetchFacilities } from 'redux/facilitySlice'
import Map from 'components/molecules/Map'
import SearchBoxWrap from 'components/molecules/SearchBoxWrap'
import { geocode } from 'modules/Geocode'
import { RootState } from 'redux/rootReducers'

const SearchResultPage: React.FC = () => {
  const { search } = useLocation()
  const [genres, setGenres] = React.useState<string>()
  const [searchValue, setSearchValue] = React.useState<string>()
  const [currentLat, setCurrentLat] = React.useState<number>()
  const [currentLng, setCurrentLng] = React.useState<number>()

  const dispatch = useDispatch()
  const facilities = useSelector((state: RootState) => state.facilities.facilities)

  React.useEffect(() => {
    let urlParamStr = decodeURIComponent(search)
    if (urlParamStr) {
      urlParamStr = urlParamStr.substring(1) //?を除去
      const params: { genres: string, searchValue: string } = urlParamStr.split('&').reduce((prev: any, current: string) => {
        const temp = current.split('=')
        prev[temp[0]] = temp[1]
        return prev
      }, {})
      setSearchValue(params.searchValue)
      setGenres(params.genres)
    }
  }, [search])

  const getFacilitiesGeolocation = () => {
    if (genres && searchValue) {
      const selectedGenre = genres.split(',')
      geocode(searchValue).then(geocdeResult => {
        if (geocdeResult) {
          setCurrentLng(geocdeResult.lng)
          setCurrentLat(geocdeResult.lat)
          dispatch(fetchFacilities(selectedGenre, geocdeResult.lat, geocdeResult.lng))
        }
      })
    }
  }
  // 最初のマウント時と与えられた値に変化があった場合に第１引数の関数を実行
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(getFacilitiesGeolocation, [genres])

  const GetMap = () => {
    return (
      <React.Fragment>
        {currentLat && currentLng && (
          <View width="50vw" position="fixed" right={0}>
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
              loadingElement={<div />}
              containerElement={<div />}
              mapElement={<div style={{ height: `96vh` }} />}
              center={{ lat: currentLat, lng: currentLng }}
              zoom={14}
              facilities={facilities}
            />
          </View>
        )}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div style={{
        // position: 'sticky',
        top: '0'
      }}>
        <HeaderComponent />
      </div>
      <Flex direction="row" justifyContent="space-between">
        <View width="50vw">
          <div style={{
            height: '12vh'
          }}>
            {genres && searchValue &&
              <SearchBoxWrap checkedGenres={genres.split(',')} searchedPlaceName={searchValue} />
            }
          </div>
          <div style={{
            overflow: 'scroll',
            height: '85vh'
          }}>
            {facilities &&
              <ShowFacility facilities={facilities} />
            }
          </div>
        </View>
        <GetMap />
      </Flex >
    </React.Fragment>
  )
}

export default SearchResultPage
