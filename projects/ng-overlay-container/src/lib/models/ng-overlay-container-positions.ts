import { ConnectionPositionPair } from "@angular/cdk/overlay";

/**
 * NgOverlayContainer Bottom Position
 */
export const BOTTOM_POSITION: ConnectionPositionPair = {
  originX: "center",
  originY: "bottom",
  overlayX: "center",
  overlayY: "top",
};

/**
 * NgOverlayContainer Right Position
 */
export const RIGHT_POSITION: ConnectionPositionPair = {
  originX: "end",
  originY: "center",
  overlayX: "start",
  overlayY: "center",
};

/**
 * NgOverlayContainer Left Position
 */
export const LEFT_POSITION: ConnectionPositionPair = {
  originX: "start",
  originY: "center",
  overlayX: "end",
  overlayY: "center",
};

/**
 * NgOverlayContainer Top Position
 */
export const TOP_POSITION: ConnectionPositionPair = {
  originX: "center",
  originY: "top",
  overlayX: "center",
  overlayY: "bottom",
};
