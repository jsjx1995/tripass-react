import InfoWindow from 'components/molecules/InfoWindow';
import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { useSelector } from 'react-redux';
import { FacilityState } from '../ducks/facilitySlicer';
import { Facility } from '../interfaces/facility.dto';
import styled from 'styled-components';

interface IMap {
  currentLat: number;
  currentLng: number;
  // genres: string[];
  // targetName: string;
}

interface IMarker {
  address: string;
  latitude: number;
  longitude: number;
  facilityInfo: Facility;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

// const Map: React.FC<IMap> = ({ targetName, genres }) => {
const Map: React.FC<IMap> = ({ currentLat, currentLng }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  // const [marker, setMarker] = useState<IMarker>();
  const [markers, setMarkers] = useState<IMarker[]>([]);

  const facilitySelector = (state: FacilityState) => state.facilities;
  const facilities = useSelector<FacilityState, FacilityState['facilities']>(facilitySelector);

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAddress = new google.maps.LatLng(currentLat, currentLng);
    initMap(14, defaultAddress);
  };

  const initEventListener = (): void => {
    if (map) {
      // TODO マップを移動させた時に再検索がかかるようにする
      // google.maps.event.addListener(map, 'dragend', function (e) {
      //   const geo = map.getCenter();
      //   console.log(geo.lat())
      //   console.log(geo.lng())
      // })
    }
  };
  useEffect(initEventListener, [map]);

  const getMarkers = () => {
    // console.log("getMarkers -> facilities", facilities);
    // console.log("getMarkers -> map", map);
    // if (map) {
    // console.log('mapはあります');
    // facilities.map(f => {
    //   console.log("getMarkers -> f", f);

    //   setMarker({
    //     address: f.address,
    //     latitude: f.geolocation.latitude,
    //     longitude: f.geolocation.longitude
    //   });
    // });
    const markers: IMarker[] = facilities.reduce((prev: IMarker[], current: Facility) => {
      prev.push({
        address: current.address,
        latitude: current.geolocation.latitude,
        longitude: current.geolocation.longitude,
        facilityInfo: current,
      });
      return prev;
    }, []);
    setMarkers(markers);
    // }
  };

  useEffect(getMarkers, [facilities]);

  // const coordinateToAddress = async (coordinate: GoogleLatLng) => {
  //   const geocoder = new google.maps.Geocoder();
  //   await geocoder.geocode({ location: coordinate }, function (results, status) {
  //     if (status === 'OK') {
  //       setMarker({
  //         address: results[0].formatted_address,
  //         latitude: coordinate.lat(),
  //         longitude: coordinate.lng()
  //       });
  //     }
  //   });
  // };


  const addSingleMarker = (): void => {
    if (markers) {
      const infoWindow = new google.maps.InfoWindow()
      markers.map(m => attachInfoWindow(m.facilityInfo, infoWindow));
      // markers.map(m => attachInfoWindow(new google.maps.LatLng(m.latitude, m.longitude), m.facilityInfo, infoWindow));
      // google.maps.event.addListener(map, "click", () => {
      //   infoWindow.close()
      // })
      map?.addListener('click', () => {
        infoWindow.close()
      })
    }
  };
  useEffect(addSingleMarker, [markers]);


  const attachInfoWindow = (facility: Facility, infoWindow: any): void => {
    const marker: GoogleMarker = new google.maps.Marker({
      position: new google.maps.LatLng(facility.geolocation.latitude, facility.geolocation.longitude),
      map: map,
      icon: getIconAttributes(facility.genre),
    });

    google.maps.event.addListener(marker, 'click', e => {
      infoWindow.setContent(`<div id="infoWindow" />`)
      infoWindow.addListener('domready', (e: any) => {
        render(<InfoWindow facility={facility} />, document.getElementById('infoWindow'))
      })
      infoWindow.open(map, marker)
    })
  };

  const getIconAttributes = (genre: string): any => {
    const iconPath = ((genre: string): string | void => {
      switch (genre) {
        case "public": return "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
        case "sport": return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
        case "shrinetemple": return "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
        case "other": return "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
        case "transport": return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|0099cc|";
        case "leisure": return "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=|ffffff|";
        default: return "_assets/genre_icons/leisure.svg"
      }
    })
    return iconPath(genre)
    // return {
    //   // url: '_assets/genre_icons/sport.png',
    //   // url: image,
    //   // url: Sport,
    //   path: image,
    //   fillColor: '#f6f6f6',
    //   fillOpacity: 0.8,
    //   strokeColor: 'pink',
    //   strokeWeight: 2,
    //   scaledSize: new google.maps.Size(0, 0),
    //   // anchor: new google.maps.Point(30, 50)
    // };
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          center: address,
          clickableIcons: false,
          draggableCursor: 'pointer',
          fullscreenControl: false,
          gestureHandling: 'greedy',
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: false,
          panControl: false,
          rotateControl: false,
          scaleControl: true,
          streetViewControl: false,
          zoom: zoomLevel,
          zoomControl: true,
        })
      );
    }
  };

  return (
    <StyleD>
      <div style={{
        display: "flex",
        justifyContent: "center",
        height: "100%"
      }}>
        <div
          ref={ref}
          style={{
            height: "93vh",
            width: "100%",
          }}
        ></div>
      </div >
    </StyleD>
  );
};

export default Map;

const StyleD = styled.div`
.gm-ui-hover-effect {display: none;}
`