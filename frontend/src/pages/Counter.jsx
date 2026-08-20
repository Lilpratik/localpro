import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    function handleIncrement() {
        setCount(prevCount => prevCount + 1);
    }
    function handleDecrement() {
        setCount(prevCount => Math.max(prevCount - 1, 0));
    }
    function handleReset() {
        setCount(0);
    }
    return (
        <>
            <p>{count}</p>
            <button onClick={handleIncrement}>
                Increment
            </button>
            <button onClick={handleDecrement}>
                Decrement
            </button>
            <button onClick={handleReset}>
                Reset
            </button>
        </>
    )
};

export default Counter;