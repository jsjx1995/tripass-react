/* global google */
import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";

import Popup from "components/molecules/Popup";
import { Facility } from "interfaces/facility.dto";

type MapProps = {
  facilities: Facility[]
  center: any
  zoom: number
}

type PositionType = {
  lat: number,
  lng: number
}

const Map: React.FC<MapProps> = (props) => {
  const initialPosition: PositionType = {
    lat: 0,
    lng: 0,
  }
  const [position, setPosition] = React.useState<PositionType>(initialPosition)
  const [currentFacilityInfo, setCurrentFacilityInfo] = React.useState<Facility>()

  const openPopup = (facility: Facility) => (e: any) => {
    setPosition({
      lng: facility.geolocation.longitude,
      lat: facility.geolocation.latitude
    })
    setCurrentFacilityInfo(facility)
  }

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
  };

  return (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={props.center}
      options={{
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
        zoomControl: true,
      }}
    >
      {props.facilities.map((facility: Facility) => {
        return (
          <Marker
            key={facility.id}
            position={{ lat: facility.geolocation.latitude, lng: facility.geolocation.longitude }}
            onClick={openPopup(facility)}
            icon={getIconAttributes(facility.genre)}
          />
        );
      })}
      {currentFacilityInfo &&
        <Popup
          anchorPosition={position}
          markerPixelOffset={{ x: 0, y: -32 }}
          facility={currentFacilityInfo}
        />
      }
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
