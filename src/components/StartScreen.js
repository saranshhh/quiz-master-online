import React from "react";

export default function StartScreen({ name, numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to the {name}</h2>
      <p>{numQuestions} questions to solve in Y minutes</p>
      <button onClick={() => dispatch({ type: "start" })}>Start</button>
    </div>
  );
}
