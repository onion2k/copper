import React from "react";

const http = React.lazy(() => import("./http"));
const mouse = React.lazy(() => import("./mouse"));
const keyboard = React.lazy(() => import("./keyboard"));

const EVENTS: { [s: string]: any } = {
  HTTP: { el: http },
  KEYBOARD: { el: keyboard },
  MOUSE: { el: mouse }
};

export const EVENTS_KEYS = Object.keys(EVENTS);

export default EVENTS;
