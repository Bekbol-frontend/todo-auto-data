// Implement a Counter component with two buttons:
// “Increase” and “Decrease”, which displays the current counter value.
import React from "react";

function Counter() {
  // Your code goes here
  const [count, setCount] = React.useState(0);

  const onIncrement = React.useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const onDecrement = React.useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <br />
      <button onClick={onIncrement}>increment</button>
      <button onClick={onDecrement}>decrement</button>
    </div>
  );
}

export default React.memo(Counter);
