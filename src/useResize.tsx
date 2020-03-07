import React from "react";

/**
 * Types
 */
type useResizeProps = {
  onMouseMove: (e: MouseEvent) => void;
};

/**
 * Hook
 */
const useResize = (props: useResizeProps) => {
  const { onMouseMove } = props;
  const [isResizing, setIsResizing] = React.useState(false);

  const handleMove = React.useCallback(
    (e: MouseEvent) => {
      onMouseMove(e);
    },
    [onMouseMove]
  );

  const handleUp = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMove, true);
      window.addEventListener("mouseup", handleUp, true);
    } else {
      window.removeEventListener("mousemove", handleMove, true);
      window.removeEventListener("mouseup", handleUp, true);
    }
  }, [isResizing, handleMove, handleUp]);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsResizing(true);
  };

  return {
    gutterProps: { onMouseDown }
  };
};

export default useResize;
