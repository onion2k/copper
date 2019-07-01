import { uniqueID } from "../uniqueID";

export default class {
  static add = (state: any, action: any) => {
    const tempPanels = state.canvas;
    tempPanels.push({
      id: uniqueID(),
      type: action.panelType,
      title:
        action.panelType.charAt(0).toUpperCase() + action.panelType.slice(1),
      x: 1,
      y: 1
    });
    state.canvas = tempPanels;
    return state;
  };

  static register = (state: any, action: any) => {
    state.panels.push(action);
    state.inputs[action.id] = action.inputs;
    if (action.output) {
      state.outputs[action.id] = action.output;
    }
    return state;
  };

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
          connection[key] = state.outputs[key];
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

  static move = (state: any, action: any) => {
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
