export default class {
  static register = (state: any, action: any) => {
    console.log(action);
    return state;
  };

  static move = (state: any, action: any) => {
    console.log("Update ", action.id, " inputs");

    console.log("Update ", action.id, " outputs");

    console.log(state.connections);

    return state;
  };
}
