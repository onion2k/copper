import { flow, get, set, update, pick, omit, concat, getOr } from "lodash/fp";

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
    // state.inputs[action.id] = action.inputs;
    // if (action.output) {
    //   state.outputs[action.id] = action.output;
    // }
    state = flow(
      set(["inputs", action.id], action.inputs),
      set(["outputs", action.id], getOr([], "output", action))
    )(state);
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

    state.connections = Object.keys(state.connections).reduce(
      (connection: any, key: string) => {
        if (key !== action.id) {
          connection[key] = state.connections[key];
        }
        return connection;
      },
      {}
    );

    state.connectionLines = state.connectionLines.filter(
      (connectionLine: any) => {
        return (
          connectionLine.from !== action.id && connectionLine.to !== action.id
        );
      }
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

    state.nodes
      .filter((node: any) => {
        return action.id === node.id;
      })
      .forEach((node: any) => {
        node.x += action.value.x;
        node.y += action.value.y;
      });

    state.connectionLines
      .filter((line: any) => {
        return action.id === line.from || action.id === line.to;
      })
      .forEach((line: any) => {
        if (action.id === line.from) {
          line.x1 += action.value.x;
          line.y1 += action.value.y;
        } else {
          line.x2 += action.value.x;
          line.y2 += action.value.y;
        }
      });

    return state;
  };
}
