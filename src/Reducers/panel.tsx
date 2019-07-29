import {
  flow,
  update,
  filter,
  map,
  mapValues,
  concat,
  values
} from "lodash/fp";

export default class {
  /**
   * Fires when a panel is added to the diagram
   */
  static add = (state: any, action: any) => {
    state = update(
      "canvas",
      concat({
        id: action.id,
        type: action.panelType,
        title:
          action.panelType.charAt(0).toUpperCase() + action.panelType.slice(1),
        x: action.x,
        y: action.y,
        value: action.value
      }),
      state
    );
    return state;
  };

  /**
   * Fires when a panel mounts
   */
  static register = (state: any, action: any) => {
    state.inputs[action.id] = action.inputs;
    state.outputs[action.id] = action.output;
    return state;
  };

  /**
   * Fires when a panel is closed
   */
  static unregister = (state: any, action: any) => {
    state.canvas = state.canvas.filter((panel: any) => {
      return panel.id !== action.id;
    });

    state.outputs = Object.keys(state.outputs).reduce(
      (output: any, key: string) => {
        if (key !== action.id) {
          output[key] = state.outputs[key];
        }
        return output;
      },
      {}
    );

    state = update(
      "connectome",
      flow(
        values,
        mapValues(
          filter((connector: any) => {
            return connector.from !== action.id && connector.to !== action.id;
          })
        )
      ),
      state
    );

    return state;
  };

  /**
   * Fires when a panel is moved
   */
  static move = (state: any, action: any) => {
    state.canvas
      .filter((panel: any) => {
        return action.id === panel.id;
      })
      .forEach((panel: any) => {
        panel.x += action.value.x;
        panel.y += action.value.y;
      });

    state = update(
      "connectome",
      flow(
        mapValues(
          map((connector: any) => {
            if (action.id === connector.from) {
              connector.x1 += action.value.x;
              connector.y1 += action.value.y;
            } else if (action.id === connector.to) {
              connector.x2 += action.value.x;
              connector.y2 += action.value.y;
            }
            return connector;
          })
        )
      ),
      state
    );

    return state;
  };
}
