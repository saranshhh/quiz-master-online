import React from "react";

export default function StartScreen({ name, numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to the {name}</h2>
      <p>{numQuestions} questions to solve in Y minutes</p>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Start
      </button>
      <select
        className="btn"
        onChange={(e) =>
          dispatch({ type: "changeNumber", payload: e.target.value })
        }
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="35">35</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
