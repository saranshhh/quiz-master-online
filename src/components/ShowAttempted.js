import React from "react";

export default function ShowAttempted({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  if (question.attempted === true) {
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
          {question.options.map((option, index) => {
            return (
              <button
                className={`btn btn-option ${
                  answer === index ? "answer" : ""
                } ${
                  question.correctOption === index
                    ? "correct"
                    : question.attemptedOption === index
                    ? "wrong"
                    : ""
                }`}
                key={option}
                disabled
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

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
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswered
                ? question.correctOption === index
                  ? "correct correct-animate"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled
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
