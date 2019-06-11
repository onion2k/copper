export default class {
  static register = (state: any, action: any) => {
    console.log(action);
    return state;
  };

  static move = (state: any, action: any) => {
    // console.log("Update ", action.id, " inputs");
    // console.log("Update ", action.id, " outputs");

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

    console.log(state.connections);
    console.log(state.nodes);
    console.log(state.inputs[action.id]);
    console.log(state.outputs[action.id]);

    return state;
  };
}
