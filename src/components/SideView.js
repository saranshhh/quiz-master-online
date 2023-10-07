import React from "react";

export default function SideView({ numQuestions, dispatch, index, question }) {
  const buttons = Array.from({ length: numQuestions }, (_, i) => i);
  return (
    <div>
      {buttons.map((i) => (
        <button
          className={`btn ${i === index ? "current-q" : ""} ${
            i === index && question.attemptedOption === question.correctOption
              ? "correct-q"
              : i === index &&
                question.attemptedOption !== null &&
                question.attemptedOption !== question.correctOption
              ? "incorrect-q"
              : ""
          }`}
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
