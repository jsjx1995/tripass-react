import { Facility } from "interfaces/facility.dto";
import React from "react";
import { OverlayView } from "react-google-maps";
import InfoWindow from "./InfoWindow";

const getPixelPositionOffset = (pixelOffset: any) => (width: number, height: any) => ({
  x: -(width / 2) + pixelOffset.x,
  y: -(height / 2) + pixelOffset.y
});

type PopupProps = {
  anchorPosition: any
  markerPixelOffset: any
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
