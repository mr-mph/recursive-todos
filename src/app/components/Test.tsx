"use client";
import { useState, useEffect } from "react";

export default function Test() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(Number(localStorage.getItem("count")));
  }, []);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
    // setCount((c) => c + 1);
  }, [count]);

  return (
    <>
      <h1>Count: {count}</h1>
      <button
        className="border-2 rounded m-1 p-1 hover:bg-blue-950 active:bg-blue-400 active:scale-90 transition-all"
        onClick={() => {
          setCount((count) => {
            return count + 1;
          });
        }}
      >
        click me
      </button>
      <button
        className="border-2 rounded m-1 p-1 hover:bg-blue-950 active:bg-blue-400 active:scale-90 transition-all"
        onClick={() => {
          setCount((count) => {
            return count - 1;
          });
        }}
      >
        -click me
      </button>
      <div className="">
        <div className="flex flex-col md:flex-row justify-around items-center h-100 border-1 text-3xl">
          <div className="rounded border-1 w-30 h-30 flex justify-center items-center">
            things
          </div>
          <div className="rounded border-1 w-30 h-30"></div>
          <div className="rounded border-1 w-30 h-30"></div>
        </div>
      </div>
    </>
  );
}
