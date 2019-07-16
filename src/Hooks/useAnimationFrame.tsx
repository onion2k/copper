import { useRef, useLayoutEffect, useCallback } from "react";

const useAnimationFrame = (callback: () => any) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = useCallback(() => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  }, []);

  const frameRef = useRef(0);
  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [loop]);
};

export default useAnimationFrame;
