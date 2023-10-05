import React from "react";

export default function PrevButton({ dispatch, answer, index }) {
  //if (answer === null) return;
  if (index === 0) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Previous
    </button>
  );
}
