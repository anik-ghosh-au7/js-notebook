import React, { useEffect, useRef } from "react";

const ScrollDown = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default ScrollDown;
