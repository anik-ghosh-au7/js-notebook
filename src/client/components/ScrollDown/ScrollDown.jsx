import React, { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const ScrollDown = ({ components }) => {
  const elementRef = useRef();
  const prevComponents = usePrevious(components);
  useEffect(() => {
    if (prevComponents && prevComponents.length < components.length)
      elementRef.current.scrollIntoView();
  }, [components, prevComponents]);
  return <div ref={elementRef} />;
};

export default ScrollDown;
