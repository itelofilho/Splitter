import React from "react";
import styled from "styled-components";
import useResize from "./useResize";
import useKeyboardResize from "./useKeyboardResize";

/**
 * Styles
 */
const SplitterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PaneContainer = styled.div`
  overflow-x: hidden;
`;

const Gutter = styled.div`
  height: auto;
  width: 4px;
  background: indigo;
  cursor: ew-resize;
`;

/**
 * Helpers
 */
const getTotalSize = (initialSizes: SplitterProps["initialSizes"]) =>
  initialSizes.reduce((acc, cv) => acc + cv, 0);

const createWidths = (width: number, total: number): [number, number] => {
  if (width < 0) return [0, total];
  if (width > total) return [total, 0];
  return [width, total - width];
};

/**
 * Types
 */
type SplitterProps = {
  initialSizes: [number, number];
  children: [React.ReactNode, React.ReactNode];
};

/**
 * Component
 */
const Splitter = (props: SplitterProps) => {
  const totalSize = getTotalSize(props.initialSizes);

  const [width, setWidth] = React.useState(props.initialSizes);

  const handleMouseMove = React.useCallback(
    e => setWidth(createWidths(e.clientX, totalSize)),
    [totalSize]
  );

  const { gutterProps } = useResize({
    onMouseMove: handleMouseMove
  });

  useKeyboardResize({ setWidth, totalSize });

  return (
    <SplitterContainer data-testid="splitter-container">
      <PaneContainer style={{ width: width[0] }} data-testid="pane-container-1">
        {props.children[0]}
      </PaneContainer>
      <Gutter {...gutterProps} data-testid="gutter" />
      <PaneContainer style={{ width: width[1] }} data-testid="pane-container-2">
        {props.children[1]}
      </PaneContainer>
    </SplitterContainer>
  );
};

export default Splitter;
