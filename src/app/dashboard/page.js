"use client";

import { increment } from "@/lib/features/counter/counterSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const [user, setuser] = useState(0);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      Hii {count}
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Click Me
      </button>
    </div>
  );
}
