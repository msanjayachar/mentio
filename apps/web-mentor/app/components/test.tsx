"use client";

import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    console.log("MOUNT");
    return () => console.log("UNMOUNT");
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default Test;
