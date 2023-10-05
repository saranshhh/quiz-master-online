import React from "react";

export default function PrevButton({ dispatch, answer }) {
  //if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "prevQuestion" })}
    >
      Previous
    </button>
  );
}
