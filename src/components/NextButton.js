import React from "react";

export default function NextButton({ dispatch, answer, index, numQuestions }) {
  //if (answer === null) return;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn-n-p"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn-n-p"
        onClick={() => {
          dispatch({ type: "finish" });
          dispatch({ type: "result" });
        }}
      >
        Finish
      </button>
    );
  }
}
