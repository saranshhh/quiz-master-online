import React from "react";

export default function Question({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div>
      <h4>{question.question}</h4>
      <div>
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswered
                ? question.correctOption === index
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswered}
            onClick={() => {
              dispatch({ type: "newanswer", payload: index });
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
