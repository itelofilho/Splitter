import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Splitter from "./Splitter";

const c = 67;
const h = 72;
const j = 74;
const k = 75;
const l = 76;
const shift = 16;

describe("<Splitter />", () => {
  it("should render", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );
    const gutterElement = getByTestId("gutter");
    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");

    expect(pane1Element).toHaveStyle("width: 200px");
    expect(pane2Element).toHaveStyle("width: 200px");
    expect(gutterElement).toBeInTheDocument();
  });

  it("resize: 100:300 by mouse", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );
    const gutterElement = getByTestId("gutter");
    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.mouseDown(gutterElement);
    fireEvent.mouseMove(gutterElement, {
      clientX: 100
    });
    fireEvent.mouseUp(gutterElement);
    expect(pane1Element).toHaveStyle("width: 100px");
    expect(pane2Element).toHaveStyle("width: 300px");
    expect(gutterElement).toBeInTheDocument();
  });

  it("resize: 199:201 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: j });
    expect(pane1Element).toHaveStyle("width: 199px");
    expect(pane2Element).toHaveStyle("width: 201px");
  });

  it("resize: 190:210 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: shift });
    fireEvent.keyDown(window, { keyCode: j });
    expect(pane1Element).toHaveStyle("width: 190px");
    expect(pane2Element).toHaveStyle("width: 210px");
  });

  it("resize: 195:205 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: h });
    expect(pane1Element).toHaveStyle("width: 195px");
    expect(pane2Element).toHaveStyle("width: 205px");
  });

  it("resize: 150:250 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: shift });
    fireEvent.keyDown(window, { keyCode: h });
    expect(pane1Element).toHaveStyle("width: 150px");
    expect(pane2Element).toHaveStyle("width: 250px");
  });

  it("resize: 201:199 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: k });
    expect(pane1Element).toHaveStyle("width: 201px");
    expect(pane2Element).toHaveStyle("width: 199px");
  });

  it("resize: 210:190 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: shift });
    fireEvent.keyDown(window, { keyCode: k });
    expect(pane1Element).toHaveStyle("width: 210px");
    expect(pane2Element).toHaveStyle("width: 190px");
  });

  it("resize: 205:195 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: l });
    expect(pane1Element).toHaveStyle("width: 205px");
    expect(pane2Element).toHaveStyle("width: 195px");
  });

  it("resize: 250:150 by keyboard", () => {
    const { getByTestId } = render(
      <Splitter initialSizes={[200, 200]}>
        <div>1</div>
        <div>2</div>
      </Splitter>
    );

    const pane1Element = getByTestId("pane-container-1");
    const pane2Element = getByTestId("pane-container-2");
    fireEvent.keyDown(window, { keyCode: c });
    fireEvent.keyDown(window, { keyCode: shift });
    fireEvent.keyDown(window, { keyCode: l });
    expect(pane1Element).toHaveStyle("width: 250px");
    expect(pane2Element).toHaveStyle("width: 150px");
  });
});
