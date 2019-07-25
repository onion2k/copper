// import dependencies
import { useReducer } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";
import { reducer } from "../../reducer";

const initialState = { canvas: [] };

afterEach(cleanup);

test("loads state", async () => {
  const { result } = renderHook(() => useReducer(reducer, initialState));
  const [state] = result.current;

  expect(state.canvas).toHaveLength(0);
});

test("add a panel", async () => {
  const { result } = renderHook(() => useReducer(reducer, initialState));
  const [, dispatch] = result.current;

  act(() => {
    dispatch({
      type: "panel/add",
      id: "panel",
      panelType: "TIME",
      title: "Panel Title",
      x: 0,
      y: 0,
      value: null
    });
  });

  const [state] = result.current;

  expect(state.canvas).toHaveLength(1);
});
