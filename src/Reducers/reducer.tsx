import panel from "./panel";
import node from "./node";

export function reducer(state: any, action: any) {
  const newState = { ...state };
  switch (action.type) {
    case "recalculate":
      newState.outputs[action.id] = action.value;
      if (newState.connectome[action.id]) {
        newState.connectome[action.id].forEach((c: any, i: number) => {
          if (c !== null) {
            const id = c.to;
            const index = c.to_index;
            const outputIndex = i;
            // console.log(
            //   id,
            //   index,
            //   outputIndex,
            //   action.value[outputIndex],
            //   newState.inputs[id]
            // );
            // console.log(newState.inputs[id]);
            newState.inputs[id][index] = action.value[outputIndex];
          }
        });
      }
      return newState;
    case "node/connect":
      return node.connect(newState, action);
    case "node/quickConnect":
      return node.quickConnect(newState, action);
    case "node/disconnect":
      return node.disconnect(newState, action);
    case "node/register":
      return node.register(newState, action);
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
