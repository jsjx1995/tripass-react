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
  const [currentFacilityInfo, setCurrentFacilityInfo] = React.useState<Facility | void>()

  const [currentX, setCurrentX] = React.useState<number>()
  const [currentY, setCurrentY] = React.useState<number>()

  const openPopup = (facility: Facility) => (e: any) => {
    setPosition({
      lng: facility.geolocation.longitude,
      lat: facility.geolocation.latitude
    })
    setCurrentFacilityInfo(facility)
    if (150 <= e.pixel.x) {
      setCurrentX(-150)
    } else if (e.pixel.x <= -150) {
      setCurrentX(150)
    } else {
      setCurrentX(0)
    }
    if (e.pixel.y <= -300) {
      setCurrentY(70)
    } else {
      setCurrentY(0)
    }
  }

  const closePopup = () => {
    setPosition(initialPosition)
    setCurrentFacilityInfo()
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
      onClick={(e: any) => {
        // console.log(e.domEvent.layerX)
        // console.log(e.domEvent.layerY)
        console.log(google.maps.Size.toString())
        // console.log(e.pixel)
        // setCurrentX(e.pixel.x)
        // setCurrentY(e.pixel.y)
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
          markerPixelOffset={{ x: currentX || 0, y: currentY || -100 }}
          facility={currentFacilityInfo}
        />
      }
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(Map));
