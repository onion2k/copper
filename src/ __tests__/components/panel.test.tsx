import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import "../../icons";
import Const from "../../Panels/primitives/const";

afterEach(cleanup);

test("loads and displays greeting", async () => {
  const props = {
    id: "panel",
    title: "test const",
    x: 0,
    y: 0
  };
  const { getByText } = render(<Const {...props} />);

  expect(getByText("test const")).toBeVisible();
});
