import React from "react";

const EVENT_MousePosition = React.lazy(() =>
  import("./events/Event_MousePosition")
);

const EVENTS: { [s: string]: any } = {
  EVENT_MousePosition: { el: EVENT_MousePosition }
};

export default EVENTS;
