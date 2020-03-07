import React from 'react';
import styled from 'styled-components';
import useResize from './useResize';

const Splitter = styled.div`
  display: flex;
  flex-direction: row;
`;

const Pane1 = styled.div`
  overflow-x: hidden;
  background: indigo;
`;

const Gutter = styled.div`
  height: 100px;
  width: 20px;
  background: red;
  cursor: ew-resize;
`

const Pane2 = styled.div`
  overflow-x: hidden;
  background: purple;
`;

const c = 67;
const h = 72
const j = 74;
const k = 75;
const l = 76;
const shift = 16;

const createWidths = (width: number, total: number) => {
  // console.log({width, total});
  if (width < 0) return [0, total];
  if (width > total) return [total, 0];
  return [width, total - width];
}

const include = (arr: number[], valuesToBeSearchable: number[]) => {
  return valuesToBeSearchable.every(value => arr.includes(value))
}

function App() {
  const [width, setWidth] = React.useState(createWidths(400, 400))

  const handleMouseMove = React.useCallback((e) => setWidth(createWidths(e.clientX, 400)), [setWidth]);

  const { gutterProps }= useResize({
    onMouseMove: handleMouseMove
  })
  

  const [downKeys, setDowndownKeys] = React.useState([] as number[]);

  

  const keyup = React.useCallback((ev: KeyboardEvent) => {
    setDowndownKeys(downKeys.filter(keyCode => keyCode !== ev.keyCode));
  }, [downKeys])

  const decreasePane = (value: number) => setWidth(createWidths(width[0] - value, 400));
  const increasePane = (value: number) => setWidth(createWidths(width[0] + value, 400))

  const fira = () => {
    switch (true) {
      /**
       * decrease pane
       */
      case include(downKeys,[c, j, shift]): return decreasePane(10);
      case include(downKeys,[c, j]): return decreasePane(1);
      case include(downKeys, [c, h, shift]): return decreasePane(50);
      case include(downKeys, [c, h]): return decreasePane(5);
      /**
       * increase pane
       */
      case include(downKeys,[c, k, shift]): return increasePane(10);
      case include(downKeys,[c, k]): return increasePane(1);
      case include(downKeys, [c, l, shift]): return increasePane(50);
      case include(downKeys, [c, l]): return increasePane(5);
    }
  }

  const keydown = React.useCallback( (ev: KeyboardEvent) => {
    if (downKeys.includes(ev.keyCode)) {
      fira();
    } else {
      downKeys.push(ev.keyCode);
      setDowndownKeys(downKeys);
      fira();
    }
  }, [downKeys, fira])

  React.useEffect(() => {
    window.addEventListener("keydown", keydown, true);
    window.addEventListener("keyup", keyup, true)

    return () => {
      window.removeEventListener("keydown", keydown, true);
      window.removeEventListener("keyup", keyup, true);
    }
  }, [keydown, keyup]);


  return (
    <Splitter>
      <Pane1 style={{width: width[0] }}>dasdasdasdasdasdsadsaa</Pane1>
      <Gutter {...gutterProps} />
      <Pane2 style={{width: width[1] }}>b</Pane2>
    </Splitter>
  );
}

export default App;
