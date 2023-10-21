import React from "react";

export default function PrevButton({ dispatch, answer, index }) {
  //if (answer === null) return;

  return (
    <button
      className="btn btn-ui"
      {...(index === 0 && { disabled: true })}
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Previous
    </button>
  );
}
