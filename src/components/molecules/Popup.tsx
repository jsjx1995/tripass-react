import { Facility } from "interfaces/facility.dto";
import React from "react";
import { OverlayView } from "react-google-maps";
import InfoWindow from "./InfoWindow";

const getPixelPositionOffset = (pixelOffset: { x: number, y: number }) => (width: number, height: number) => ({
  x: -(width / 2) + pixelOffset.x,
  y: -(height / 2) + pixelOffset.y
});

type PopupProps = {
  anchorPosition: { lat: number, lng: number }
  markerPixelOffset: { x: number, y: number }
  facility: Facility
}

const Popup: React.FC<PopupProps> = (props) => {
  return (
    <OverlayView
      position={props.anchorPosition}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset(props.markerPixelOffset)}
    >
      <InfoWindow facility={props.facility} />
    </OverlayView>
  );
};

export default Popup;
