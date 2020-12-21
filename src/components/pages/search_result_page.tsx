import { Flex, View } from '@adobe/react-spectrum';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShowFacility from 'components/molecules/ShowFacility';
import HeaderComponent from 'components/templates/Header';
import { fetchFacilities, FacilityState } from 'ducks/facilitySlicer';
import { loadMapApi } from 'modules/GoogleMapsUtils';
import Map from 'modules/Map';
import SearchBoxWrap from 'components/molecules/SearchBoxWrap';


const SearchResultPage: React.FC = () => {
  const { genre, target }: { genre: string, target: string; } = useParams();
  // const [targetName, setTargetName] = React.useState<string>(target);
  const [currentLat, setCurrentLat] = React.useState<number>();
  const [currentLng, setCurrentLng] = React.useState<number>();
  const [scriptLoaded, setScriptLoaded] = React.useState(false);

  const dispatch = useDispatch();
  const facilitySelector = (state: FacilityState) => state.facilities;
  const facilities = useSelector<FacilityState, FacilityState['facilities']>(facilitySelector);

  const getFacilitiesGeolocation = () => {
    const genres = genre.split(',');
    if (scriptLoaded) {
      const geocoder = new google.maps.Geocoder();
      // Geocodingの呼び出し
      geocoder.geocode(
        {
          address: target,
          region: "jp",
        }, function (results: any, status: any) {
          if (status === "OK") {
            const geometryLoc = results[0].geometry.location;
            setCurrentLat(geometryLoc.lat());
            setCurrentLng(geometryLoc.lng());
            dispatch(fetchFacilities({ genres: genres, lat: geometryLoc.lat(), lng: geometryLoc.lng() }));
          }
        });
    }
  };
  // 最初のマウント時と与えられた値に変化があった場合に第１引数の関数を実行
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(getFacilitiesGeolocation, [scriptLoaded]);


  React.useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

  const GetMap = () => {
    return (
      <React.Fragment>
        {scriptLoaded && currentLat && currentLng && (
          <View width="50%" height="100%" position="fixed" right={0}>
            <Map
              currentLat={currentLat}
              currentLng={currentLng}
            />
          </View>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <HeaderComponent />
      <Flex direction="row" justifyContent="space-between">
        <View width="50%">
          <SearchBoxWrap genres={genre.split(',')} searchedPlaceName={target} />
          <ShowFacility facilities={facilities} />
        </View>
        <GetMap />
      </Flex >
    </React.Fragment>
  );
};

export default SearchResultPage;
