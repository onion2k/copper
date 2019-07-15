import panel from "./reducers/panel";
import node from "./reducers/node";

export function reducer(state: any, action: any) {
  const newState = { ...state };
  switch (action.type) {
    case "recalculate":
      newState.outputs[action.id] = action.value;
      if (newState.connections[action.id]) {
        newState.connections[action.id].forEach((c: any, i: number) => {
          if (c !== null) {
            const id = c[0];
            const index = c[1];
            const outputIndex = c[2];
            newState.inputs[id][index] = action.value[outputIndex];
          }
        });
      }
      return newState;
    case "node/connect":
      return node.connect(newState, action);
    case "node/disconnect":
      return node.disconnect(newState, action);
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
