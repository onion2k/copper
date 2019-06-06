import panel from "./reducers/panel";

export function reducer(state: any, action: any) {
  const newState = { ...state };
  let connection;
  switch (action.type) {
    case "update":
      newState.outputs[action.id] = action.value;
      connection = newState.connections[action.id];
      if (connection) {
        newState.inputs[connection.id][connection.index] = action.value;
      }
      return newState;
    case "connect":
      newState.connections[action.from] = {
        id: action.to,
        index: action.index
      };
      connection = newState.connections[action.from];
      newState.inputs[connection.id][connection.index] =
        newState.outputs[action.from];
      return newState;
    case "register":
      newState.inputs[action.id] = [];
      return newState;
      break;
    case "registerNode":
      newState.nodes.push(action.node);
      return newState;
      break;
    case "panelMove":
      return panel.move(newState, action);
    case "panelRegister":
      return panel.register(newState, action);
    default:
      throw new Error();
  }
}
