// import dependencies
import { useReducer } from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";
import { reducer } from "../reducer";

const initialState = { panels: [] };

afterEach(cleanup);

test("loads state", async () => {
  const { result } = renderHook(() => useReducer(reducer, initialState));
  const [state] = result.current;

  expect(state.panels).toHaveLength(0);
});
