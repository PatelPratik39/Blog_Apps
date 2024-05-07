import React, { useContext } from "react";
import { MyContext } from "./Context";

const MyComponent = () => {
  const { text, setText } = useContext(MyContext);
  return (
    <div>
      <h1>{text}</h1>
      <button onClick={() => setText("Hello World!!")}>Click Me Bosss</button>
    </div>
  );
};

export default MyComponent;
