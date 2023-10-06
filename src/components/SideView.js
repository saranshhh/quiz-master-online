import React from "react";

export default function SideView({ numQuestions, dispatch, index }) {
  const buttons = Array.from({ length: numQuestions }, (_, i) => i);
  return (
    <div>
      {buttons.map((i) => (
        <button
          className={`btn ${i === index ? "current-q" : ""}`}
          key={i}
          onClick={() => {
            dispatch({ type: "gotoQuestion", payload: i });
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
