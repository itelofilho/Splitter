import React from "react";
import styled from "styled-components";
import useResize from "./useResize";

type SplitterProps = {
  initialSizes: [number, number];
  children: [React.ReactNode, React.ReactNode];
};

const getTotalSize = (initialSizes: SplitterProps["initialSizes"]) =>
  initialSizes.reduce((acc, cv) => acc + cv, 0);

const createWidths = (width: number, total: number): [number, number] => {
  if (width < 0) return [0, total];
  if (width > total) return [total, 0];
  return [width, total - width];
};

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

  return (
    <SplitterContainer>
      <PaneContainer style={{ width: width[0] }}>
        {props.children[0]}
      </PaneContainer>
      <Gutter {...gutterProps} />
      <PaneContainer style={{ width: width[1] }}>
        {props.children[1]}
      </PaneContainer>
    </SplitterContainer>
  );
};

export default Splitter;

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

// const Pane2 = styled.div`
//   overflow-x: hidden;
//   background: purple;
// `;

// const c = 67;
// const h = 72;
// const j = 74;
// const k = 75;
// const l = 76;
// const shift = 16;



// const include = (arr: number[], valuesToBeSearchable: number[]) => {
//   return valuesToBeSearchable.every(value => arr.includes(value));
// };

// function App() {
//   const [width, setWidth] = React.useState(createWidths(400, 400));

//   const handleMouseMove = React.useCallback(
//     e => setWidth(createWidths(e.clientX, 400)),
//     [setWidth]
//   );

//   const { gutterProps } = useResize({
//     onMouseMove: handleMouseMove
//   });

//   const [downKeys, setDowndownKeys] = React.useState([] as number[]);

//   const keyup = React.useCallback(
//     (ev: KeyboardEvent) => {
//       setDowndownKeys(downKeys.filter(keyCode => keyCode !== ev.keyCode));
//     },
//     [downKeys]
//   );

//   const decreasePane = React.useCallback(
//     (value: number) => setWidth(createWidths(width[0] - value, 400)),
//     [width]
//   );
//   const increasePane = React.useCallback(
//     (value: number) => setWidth(createWidths(width[0] + value, 400)),
//     [width]
//   );

//   const handleKeyPress = React.useCallback(() => {
//     switch (true) {
//       /**
//        * decrease pane
//        */
//       case include(downKeys, [c, j, shift]):
//         return decreasePane(10);
//       case include(downKeys, [c, j]):
//         return decreasePane(1);
//       case include(downKeys, [c, h, shift]):
//         return decreasePane(50);
//       case include(downKeys, [c, h]):
//         return decreasePane(5);
//       /**
//        * increase pane
//        */
//       case include(downKeys, [c, k, shift]):
//         return increasePane(10);
//       case include(downKeys, [c, k]):
//         return increasePane(1);
//       case include(downKeys, [c, l, shift]):
//         return increasePane(50);
//       case include(downKeys, [c, l]):
//         return increasePane(5);
//     }
//   }, [decreasePane, downKeys, increasePane]);

//   const keydown = React.useCallback(
//     (ev: KeyboardEvent) => {
//       if (downKeys.includes(ev.keyCode)) {
//         handleKeyPress();
//       } else {
//         downKeys.push(ev.keyCode);
//         setDowndownKeys(downKeys);
//         handleKeyPress();
//       }
//     },
//     [downKeys, handleKeyPress]
//   );

//   React.useEffect(() => {
//     window.addEventListener("keydown", keydown, true);
//     window.addEventListener("keyup", keyup, true);

//     return () => {
//       window.removeEventListener("keydown", keydown, true);
//       window.removeEventListener("keyup", keyup, true);
//     };
//   }, [keydown, keyup]);

//   return (
//     <Splitter2>
//       <Pane1 style={{ width: width[0] }}>dasdasdasdasdasdsadsaa</Pane1>
//       <Gutter {...gutterProps} />
//       <Pane2 style={{ width: width[1] }}>b</Pane2>
//     </Splitter2>
//   );
// }
