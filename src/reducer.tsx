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
    default:
      throw new Error();
  }
}

// const connectConnector = (to: {
//   id: string;
//   direction: string;
//   index: number;
//   key: string;
//   x: number;
//   y: number;
// }) => {
//   if (!connector) {
//     return;
//   }

//   const { id, direction, index } = connector;
//   const start = nodes.find(node => {
//     return (
//       node.id === id && node.direction === direction && node.index === index
//     );
//   });
//   const end = nodes.find(node => {
//     return (
//       node.id === to.id &&
//       node.direction === to.direction &&
//       node.index === to.index
//     );
//   });
//   if (start && end) {
//     const tempConnections = connections;
//     tempConnections.push({
//       x1: start.x,
//       y1: start.y,
//       x2: end.x,
//       y2: end.y
//     });
//     setConnections(tempConnections);

//     dispatch({
//       type: "connect",
//       from: connector.id,
//       to: to.id,
//       index: to.index
//     });
//   }
// };

// const registerNode = (node: any) => {
//   const newNodes = nodes;
//   newNodes.push(node);
//   setNodes(newNodes);
// };
