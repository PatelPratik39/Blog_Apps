import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./CounterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();


  const handleIncrement = useCallback(() => {
    dispatch(increment());
  },[dispatch])


    const handleDecrement = useCallback(() => {
      dispatch(decrement());
    }, [dispatch]);
  return (
    <div>
      <p>Count : {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
};

export default Counter;
