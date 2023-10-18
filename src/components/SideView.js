import React, { useState } from "react";

export default function SideView({
  numQuestions,
  dispatch,
  index,
  question,
  questions,
}) {
  //const buttons = Array.from({ length: numQuestions }, (_, i) => i);
  //console.log(questions);
  let newQuestions = [];
  for (let i = 0; i < numQuestions; i++) {
    console.log(questions[i].attempted);
    newQuestions.push({
      value: i,
      attempted: questions[i].attempted,
      attemptedOption: question.attemptedOption,
    });
  }
  //console.log(newQuestions);

  const [hideButtons, setHideButtons] = useState(false);
  //const [qq, setQq] = useState(newQuestions);

  const toggleHideButtons = () => {
    setHideButtons(!hideButtons);
  };

  // function addCorrectClass(id) {
  //   newQuestions.forEach((question) => {
  //     //console.log(question, question["attempted"], question["value"], id);
  //     if (id === question["value"] && question["attempted"] === true) {
  //       const button = document.querySelector(`#button-${id}`);
  //       button.classList.add("correct-q");
  //       console.log(button, id, question["value"]);
  //     }
  //   });
  // }
  // function removeCorrectClass(id) {
  //   const button = document.querySelector(`#button-${id}`);
  //   if (button) {
  //     button.classList.remove("correct-q");
  //   }
  // }
  // buttons.forEach((i) => {
  //   addCorrectClass(i);
  // });

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {!hideButtons &&
        newQuestions.map((i) => (
          <div style={{ margin: "0.5rem", flexBasis: "20%" }}>
            <p>
              {i["value"]},{i["attempted"] === false ? "false" : "true"}
            </p>

            <button
              className={`btn ${i["value"] === index ? "current-q" : ""}${
                i["attempted"] === true ? "correct-q" : "incorrect-q"
              } `}
              // i["value"] === index &&
              // questions[index].attemptedOption !== null
              //   ? "correct-q"
              //   : ""

              id={`button-${i["value"]}`}
              onClick={() => {
                dispatch({ type: "gotoQuestion", payload: i["value"] });
                // console.log(i["value"]);
                // //newQuestions[i["value"]]["attempted"] = true;
                // console.log(newQuestions[i["value"] - 1]?.attempted);
                // addCorrectClass(i["value"]);
                // if (i["attempted"] === false) {
                //   removeCorrectClass(i["value"]);
                // }
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
