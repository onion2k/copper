// action - payload - from:id, index, x, y (output), to: id, index, index, x, y (input)

import { flow, get, set, omit } from "lodash/fp";

export default class {
  static register = (state: any, action: any) => {
    return state;
  };

  static connect = (state: any, action: any) => {
    if (!state.connector) {
      /* Remove any node connected to the connector */
      // if (!state.connections[action.payload.id])
      //   state.connections[action.payload.id] = [];

      // state.connections[action.payload.id][action.payload.index] = null;

      /* Remove the from line */
      // state.connectionLines = state.connectionLines.filter((cl: any) => {
      //   return !(
      //     cl.from === action.payload.id && cl.index === action.payload.index
      //   );
      // });

      state.connector = {
        id: action.payload.id,
        index: action.payload.index,
        x: action.payload.x,
        y: action.payload.y,
        type: action.payload.type
      };
    } else {
      /* Remove the to line */
      if (
        state.connector.type !== action.payload.type &&
        action.payload.type !== "any"
      ) {
        state.connector = null;
        return state;
      }

      const c = {
        from: state.connector.id,
        from_index: state.connector.index,
        to: action.payload.id,
        to_index: action.payload.index,
        x1: state.connector.x,
        y1: state.connector.y,
        x2: action.payload.x,
        y2: action.payload.y
      };

      state = set(["connectome", c.from, c.from_index], c, state);
      state.inputs[c.from][c.from_index] = get(
        ["outputs", c.from, c.from_index],
        state
      );

      // Unset the active connector
      state.connector = null;
    }

    return state;
  };

  static quickConnect = (state: any, action: any) => {
    const output = get(["outputs", action.from, action.from_index], state);

    state = flow(
      set(
        ["connectome", action.from, action.from_index],
        omit(["type"], action)
      ),
      set(["inputs", action.to, action.to_index], output)
    )(state);

    return state;
  };

  static disconnect = (state: any, action: any) => {
    state.connector = null;
    return state;
  };
}
