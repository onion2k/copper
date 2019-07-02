import panel from "./reducers/panel";
import node from "./reducers/node";

export function reducer(state: any, action: any) {
  const newState = { ...state };
  switch (action.type) {
    case "recalculate":
      newState.outputs[action.id] = action.value;
      if (newState.connections[action.id]) {
        const id = newState.connections[action.id][0];
        const index = newState.connections[action.id][1];
        const outputIndex = newState.connections[action.id][2];
        if (outputIndex !== null) {
          newState.inputs[id][index] = action.value[outputIndex];
        } else {
          newState.inputs[id][index] = action.value;
        }
      }
      return newState;
    case "node/connect":
      return node.connect(newState, action);
    case "panel/add":
      return panel.add(newState, action);
    case "panel/move":
      return panel.move(newState, action);
    case "panel/register":
      return panel.register(newState, action);
    case "panel/unregister":
      return panel.unregister(newState, action);
    default:
      throw new Error();
  }
}
