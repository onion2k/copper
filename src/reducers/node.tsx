export default class {
  static connect = (state: any, action: any) => {
    if (!state.connector) {
      state.connector = {
        id: action.payload.id,
        x: action.payload.x,
        y: action.payload.y
      };
    } else {
      state.connectionLines.push({
        from: state.connector.id,
        to: action.payload.id,
        x1: state.connector.x,
        y1: state.connector.y,
        x2: action.payload.x,
        y2: action.payload.y
      });
      state.connections[state.connector.id] = [
        action.payload.id,
        action.payload.index
      ];
      state.inputs[action.payload.id][action.payload.index] =
        state.outputs[state.connector.id];

      state.connector = null;
    }

    return state;
  };
}
