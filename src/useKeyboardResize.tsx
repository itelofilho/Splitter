import React from "react";

/**
 * Helpers
 */
const include = (arr: number[], valuesToBeSearchable: number[]) => {
  return valuesToBeSearchable.every(value => arr.includes(value));
};

const createWidths = (width: number, total: number): [number, number] => {
  if (width < 0) return [0, total];
  if (width > total) return [total, 0];
  return [width, total - width];
};

const c = 67;
const h = 72;
const j = 74;
const k = 75;
const l = 76;
const shift = 16;

/**
 * Types
 */
type useKeyboardResizeProps = {
  totalSize: number;
  setWidth: React.Dispatch<React.SetStateAction<[number, number]>>;
};

/**
 * Hook
 */
const useKeyboardResize = (props: useKeyboardResizeProps) => {
  const { totalSize, setWidth } = props;
  const [downKeys, setDowndownKeys] = React.useState([] as number[]);

  const keyup = React.useCallback(
    (ev: KeyboardEvent) => {
      setDowndownKeys(downKeys.filter(keyCode => keyCode !== ev.keyCode));
    },
    [downKeys]
  );

  const decreasePane = React.useCallback(
    (value: number) =>
      setWidth(width => createWidths(width[0] - value, totalSize)),
    [setWidth, totalSize]
  );
  const increasePane = React.useCallback(
    (value: number) =>
      setWidth(width => createWidths(width[0] + value, totalSize)),
    [setWidth, totalSize]
  );

  const handleKeyPress = React.useCallback(() => {
    switch (true) {
      /**
       * decrease pane
       */
      case include(downKeys, [c, j, shift]):
        return decreasePane(10);
      case include(downKeys, [c, j]):
        return decreasePane(1);
      case include(downKeys, [c, h, shift]):
        return decreasePane(50);
      case include(downKeys, [c, h]):
        return decreasePane(5);
      /**
       * increase pane
       */
      case include(downKeys, [c, k, shift]):
        return increasePane(10);
      case include(downKeys, [c, k]):
        return increasePane(1);
      case include(downKeys, [c, l, shift]):
        return increasePane(50);
      case include(downKeys, [c, l]):
        return increasePane(5);
    }
  }, [decreasePane, downKeys, increasePane]);

  const keydown = React.useCallback(
    (ev: KeyboardEvent) => {
      if (downKeys.includes(ev.keyCode)) {
        handleKeyPress();
      } else {
        downKeys.push(ev.keyCode);
        setDowndownKeys(downKeys);
        handleKeyPress();
      }
    },
    [downKeys, handleKeyPress]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", keydown, true);
    window.addEventListener("keyup", keyup, true);

    return () => {
      window.removeEventListener("keydown", keydown, true);
      window.removeEventListener("keyup", keyup, true);
    };
  }, [keydown, keyup]);

  return;
};

export default useKeyboardResize;
