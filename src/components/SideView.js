import { set } from "mongoose";
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
    //console.log(questions[i].attempted);
    newQuestions.push({
      value: i,
      attempted: questions[i].attempted,
      attemptedOption: question.attemptedOption,
      seen: questions[i].seen,
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
  const [infoShow, setInfoShow] = useState(false);
  function toggleInfo() {
    setInfoShow(!infoShow);
  }

  const tag = (
    <div>
      <ul>
        <li style={{ color: "#9c67ff" }}>Not Seen</li>
        <li style={{ color: "#a3cf97" }}>Attempted</li>
        <li style={{ color: "#ff6767" }}>Not Attempted</li>
      </ul>{" "}
    </div>
  );

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
          <div style={{ margin: "0.3rem", flexBasis: "10%" }}>
            <button
              className={`btn ${i["seen"] === false ? "not-attempt-q" : ""} ${
                i["value"] === index ? "current-q" : ""
              }  ${i["attempted"] === true ? "correct-q" : "incorrect-q"} }`}
              id={`button-${i["value"]}`}
              onClick={() => {
                dispatch({ type: "gotoQuestion", payload: i["value"] });
              }}
              style={{
                padding: "5px 10px", // Reduce padding to make the button more compact
                fontSize: "18px", // Reduce font size
              }}
            >
              {}
              {i["value"] + 1 < 10 ? "0" + (i["value"] + 1) : i["value"] + 1}
            </button>
          </div>
        ))}

      <button className="btn btn-n-p" onClick={toggleHideButtons}>
        {hideButtons ? "Show Buttons" : "Hide Buttons"}
      </button>
      <button className="btn btn-n-p" onClick={toggleInfo}>
        {infoShow ? tag : "Show Info"}
      </button>
    </div>
  );
}
