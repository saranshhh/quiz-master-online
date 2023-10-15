import React, { useState } from "react";

export default function SideView({
  numQuestions,
  dispatch,
  index,
  question,
  questions,
}) {
  //const buttons = Array.from({ length: numQuestions }, (_, i) => i);
  const newQuestions = [];
  for (let i = 0; i < numQuestions; i++) {
    newQuestions.push({
      value: i,
      attempted: false,
      attemptedOption: null,
    });
  }
  console.log(newQuestions);

  const [hideButtons, setHideButtons] = useState(false);

  const toggleHideButtons = () => {
    setHideButtons(!hideButtons);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {!hideButtons &&
        newQuestions.map((i) => (
          <div key={i} style={{ margin: "0.5rem", flexBasis: "20%" }}>
            <button
              className={`btn ${i["value"] === index ? "current-q" : ""} ${
                i["value"] === index &&
                questions[index].attemptedOption !== null
                  ? "correct-q"
                  : ""
              }`}
              key={`${question.id}-${index}`}
              onClick={() => {
                dispatch({ type: "gotoQuestion", payload: i["value"] });
                newQuestions[i["value"] - 1].attempted = true;
              }}
            >
              {i["value"] + 1}
            </button>
          </div>
        ))}
      <button className="btn btn-ui" onClick={toggleHideButtons}>
        {hideButtons ? "Show Buttons" : "Hide Buttons"}
      </button>
    </div>
  );
}
