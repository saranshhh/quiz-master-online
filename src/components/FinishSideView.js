import React, { useState } from "react";

export default function SideView({
  numQuestions,
  dispatch,
  index,
  question,
  questions,
}) {
  let newQuestions = [];
  for (let i = 0; i < numQuestions; i++) {
    newQuestions.push({
      value: i,
      correct: questions[i].correctOption === questions[i].attemptedOption,
      attempted: questions[i].attempted,
    });
  }

  const [hideButtons, setHideButtons] = useState(false);

  const toggleHideButtons = () => {
    setHideButtons(!hideButtons);
  };

  function addCorrectClass(id) {
    newQuestions.forEach((question) => {
      console.log(question, question["correct"], question["value"], id);
      if (id === question["value"] && question["correct"] === true) {
        let button = document.querySelector(`#button-${id}`);
        console.log(button);
        if (button) button.classList.add("correct-q");

        console.log(id, question["value"]);
      } else {
        // const button = document.querySelector(`#button`);
        // button.classList.add("incorrect-q");
      }
    });
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center ",
        flexWrap: "wrap",
        maxWidth: "20rem",
        maxHeight: "10rem",
        textAlign: "center",
      }}
    >
      {!hideButtons &&
        newQuestions.map((i) => (
          <div style={{ margin: "0.3rem", flexBasis: "20%" }}>
            <button
              className={`btn ${
                i["value"] === index ? "final-current-q" : ""
              } ${
                i["correct"] === true
                  ? "correct-q"
                  : i["attempted"] === true
                  ? "incorrect-q"
                  : "not-attempt-q"
              }`}
              id={`button-${i["value"]}`}
              onClick={() => {
                dispatch({ type: "gotoQuestion", payload: i["value"] });
                console.log(i["attempted"]);
                addCorrectClass(i["value"]);
              }}
              style={{
                padding: "5px 10px", // Reduce padding to make the button more compact
                fontSize: "18px", // Reduce font size
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
