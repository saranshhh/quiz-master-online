import React, { useState } from "react";

export default function FinishSideView({
  numQuestions,
  dispatch,
  index,
  question,
}) {
  const buttons = Array.from({ length: numQuestions }, (_, i) => i);
  const [hideButtons, setHideButtons] = useState(false);

  const toggleHideButtons = () => {
    setHideButtons(!hideButtons);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {!hideButtons &&
        buttons.map((i) => (
          <div key={i} style={{ margin: "0.5rem", flexBasis: "20%" }}>
            <button
              className={`btn ${i === index ? "current-q" : ""} ${
                i === index &&
                question.attemptedOption === question.correctOption
                  ? "correct-q"
                  : i === index &&
                    question.attemptedOption !== null &&
                    question.attemptedOption !== question.correctOption
                  ? "incorrect-q"
                  : ""
              }`}
              onClick={() => {
                dispatch({ type: "gotoQuestion", payload: i });
              }}
            >
              {i + 1}
            </button>
          </div>
        ))}
      <button className="btn btn-ui" onClick={toggleHideButtons}>
        {hideButtons ? "Show Buttons" : "Hide Buttons"}
      </button>
    </div>
  );
}
