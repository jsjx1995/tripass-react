import { Flex, View } from '@adobe/react-spectrum';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShowFacility from 'components/molecules/ShowFacility';
import HeaderComponent from 'components/templates/Header';
import { fetchFacilities, FacilityState } from 'ducks/facilitySlicer';
import Map from 'modules/Map';
import SearchBoxWrap from 'components/molecules/SearchBoxWrap';
import { geocode } from 'modules/Geocode';

const SearchResultPage: React.FC = () => {
  const { genre, target }: { genre: string, target: string; } = useParams();
  const [currentLat, setCurrentLat] = React.useState<number>();
  const [currentLng, setCurrentLng] = React.useState<number>();

  const dispatch = useDispatch();
  const facilitySelector = (state: FacilityState) => state.facilities;
  const facilities = useSelector<FacilityState, FacilityState['facilities']>(facilitySelector);

  const getFacilitiesGeolocation = () => {
    const genres = genre.split(',');
    geocode(target).then(geocdeResult => {
      if (geocdeResult) {
        setCurrentLng(geocdeResult.lng)
        setCurrentLat(geocdeResult.lat)
        dispatch(fetchFacilities({ genres: genres, lat: geocdeResult.lat, lng: geocdeResult.lng }));
      }
    })
  };
  // 最初のマウント時と与えられた値に変化があった場合に第１引数の関数を実行
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(getFacilitiesGeolocation, []);

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
    );
  };

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
            height: '10vh'
          }}>
            <SearchBoxWrap genres={genre.split(',')} searchedPlaceName={target} />
          </div>
          <div style={{
            overflow: 'scroll',
            height: '85vh'
          }}>
            <ShowFacility facilities={facilities} />
          </div>
        </View>
        <GetMap />
      </Flex >
    </React.Fragment>
  );
};

export default SearchResultPage;
