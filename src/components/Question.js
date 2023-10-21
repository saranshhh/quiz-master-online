import React from "react";

export default function Question({ question, dispatch, answer }) {
  question.seen = true;
  console.log(question.seen);
  // if (question.attempted === true) {
  //   return (
  //     <div>
  //       <h4>{question.question}</h4>
  //       {question.code !== null && (
  //         <div class="quiz-question">
  //           <p>Here is a code snippet:</p>
  //           <pre class="code-theme-1">
  //             <code>{question.code}</code>
  //           </pre>
  //         </div>
  //       )}

  //       <div>
  //         {question.options.map((option, index) => {
  //           return (
  //             <button
  //               className={`btn btn-option ${
  //                 answer === index
  //                   ? "selected"
  //                   : question.attemptedOption === index
  //                   ? "selected"
  //                   : ""
  //               } `}
  //               key={option}
  //             >
  //               {option}
  //             </button>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <h4>{question.question}</h4>
      {question.code !== null && (
        <div class="quiz-question">
          <p>Here is a code snippet:</p>
          <pre class="code-theme-1">
            <code>{question.code}</code>
          </pre>
        </div>
      )}

      <div>
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option  ${
              question.attempted === true && question.attemptedOption === index
                ? "selected"
                : ""
            }`}
            key={option}
            //disabled={hasAnswered}
            onClick={() => {
              dispatch({ type: "newanswer", payload: index });
            }}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="btn btn-n-p"
        onClick={() => {
          dispatch({ type: "resetOption" });
        }}
      >
        Reset
      </button>
    </div>
  );
}
