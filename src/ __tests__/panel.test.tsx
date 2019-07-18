// import dependencies
import React from "react";
import "../icons";

// import react-testing methods
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

import Const from "../Panels/primitives/const";

afterEach(cleanup);

test("loads and displays greeting", async () => {
  const props = {
    id: "panel",
    title: "test const",
    x: 0,
    y: 0
  };
  const { getByText, getByTestId } = render(<Const {...props} />);

  expect(getByText("test const")).toBeVisible();
});
