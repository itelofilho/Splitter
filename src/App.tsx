import React from 'react';
import styled from 'styled-components';

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

const createWidths = (width: number, total: number) => {
  // console.log({width, total});
  if (width < 0) return [0, total];
  if (width > total) return [total, 0];
  return [width, total - width];
}
function App() {
  const [width, setWidth] = React.useState(createWidths(400, 400))
  const [isResizing, setIsResizing] = React.useState(false);

  const [downKeys, setDowndownKeys] = React.useState([] as number[]);

  const handleMove = React.useCallback((e: MouseEvent) => {
    setWidth(createWidths(e.clientX, 400));
  }, []);

  const handleUp = React.useCallback(() => setIsResizing(false), [])

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMove, true)
      window.addEventListener('mouseup', handleUp, true)
    } else {
      window.removeEventListener("mousemove", handleMove, true)
      window.removeEventListener('mouseup', handleUp, true)
    }
  }, [isResizing, handleMove, handleUp]);

  const keyup = React.useCallback((ev: KeyboardEvent) => {
    console.log(downKeys.filter(keyCode => keyCode !== ev.keyCode))
    setDowndownKeys(downKeys.filter(keyCode => keyCode !== ev.keyCode));
  }, [downKeys])


  const fira = () => {
    console.log(downKeys)
    if (downKeys.includes(67) && downKeys.includes(74) && downKeys.includes(16)) {
      console.log("downKeys.includes(67) && downKeys.includes(74) && downKeys.includes(16)");
      return setWidth(createWidths(width[0] - 10, 400));
    }
    if (downKeys.includes(67) && downKeys.includes(74)) {
      console.log("downKeys.includes(67) && downKeys.includes(74)");
      return setWidth(createWidths(width[0] - 1, 400));
    }
    if (downKeys.includes(67) && downKeys.includes(72) && downKeys.includes(16)) {
      console.log("downKeys.includes(67) && downKeys.includes(72) && downKeys.includes(16)");
      return setWidth(createWidths(width[0] - 50, 400));
    }
    if (downKeys.includes(67) && downKeys.includes(72)) {
      console.log("downKeys.includes(67) && downKeys.includes(72)");
      return setWidth(createWidths(width[0] - 5, 400));
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
      <Gutter 
        onClick={e => {
          e.preventDefault();
          setIsResizing(true);
        }}
        />
      <Pane2 style={{width: width[1] }}>b</Pane2>
    </Splitter>
  );
}

export default App;
