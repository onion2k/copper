export default class {
  static register = (state: any, action: any) => {
    state.panels.push(action);
    state.inputs[action.id] = action.inputs;
    if (action.output) {
      state.outputs[action.id] = action.output;
    }
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
