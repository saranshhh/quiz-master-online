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
    //console.log(questions[i].correctOption, questions[i].attemptedOption);
    newQuestions.push({
      value: i,
      correct: questions[i].correctOption === questions[i].attemptedOption,
    });
  }
  //console.log(newQuestions);

  const [hideButtons, setHideButtons] = useState(false);
  //const [qq, setQq] = useState(newQuestions);

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

        // console.log(button, id, question["value"]);

        console.log(id, question["value"]);
      } else {
        // const button = document.querySelector(`#button`);
        // button.classList.add("incorrect-q");
      }
    });
  }

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
            <button
              className={`btn ${
                i["value"] === index ? "final-current-q" : ""
              } ${i["correct"] === true ? "correct-q" : "incorrect-q"}`}
              // i["value"] === index &&
              // questions[index].attemptedOption !== null
              //   ? "correct-q"
              //   : ""

              // ${
              //   i["value"] === index && i["correct"]
              //     ? "correct-q"
              //     : "incorrect-q"
              // }`

              id={`button-${i["value"]}`}
              onClick={() => {
                dispatch({ type: "gotoQuestion", payload: i["value"] });
                // console.log(i["value"]);
                // //newQuestions[i["value"]]["attempted"] = true;
                // console.log(newQuestions[i["value"] - 1]?.attempted);
                addCorrectClass(i["value"]);
                // buttons.forEach((i) => {
                //   addCorrectClass(i);
                // });
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

// import React, { useState } from "react";

// export default function FinishSideView({
//   numQuestions,
//   dispatch,
//   index,
//   question,
// }) {
//   const buttons = Array.from({ length: numQuestions }, (_, i) => i);
//   const [hideButtons, setHideButtons] = useState(false);

//   const toggleHideButtons = () => {
//     setHideButtons(!hideButtons);
//   };

//   return (
//     <div
//       style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
//     >
//       {!hideButtons &&
//         buttons.map((i) => (
//           <div key={i} style={{ margin: "0.5rem", flexBasis: "20%" }}>
//             <button
//               className={`btn ${i === index ? "current-q" : ""} ${
//                 i === index &&
//                 question.attemptedOption === question.correctOption
//                   ? "correct-q"
//                   : question.attemptedOption !== question.correctOption
//                   ? "incorrect-q"
//                   : ""
//               }`}
//               onClick={() => {
//                 dispatch({ type: "gotoQuestion", payload: i });
//               }}
//             >
//               {i + 1}
//             </button>
//           </div>
//         ))}
//       <button className="btn btn-ui" onClick={toggleHideButtons}>
//         {hideButtons ? "Show Buttons" : "Hide Buttons"}
//       </button>
//     </div>
//   );
// }
