import React from "react";

const EVENT_http = React.lazy(() => import("./http"));
const EVENT_MousePosition = React.lazy(() => import("./Event_MousePosition"));

const EVENTS: { [s: string]: any } = {
  EVENT_Http: { el: EVENT_http },
  EVENT_MousePosition: { el: EVENT_MousePosition }
};

export default EVENTS;
