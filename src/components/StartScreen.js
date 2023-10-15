import React from "react";

export default function StartScreen({
  name,
  numQuestions,
  dispatch,
  secondsRemaining,
  cUser,
  negative,
}) {
  const mins = Math.floor(secondsRemaining / 60);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        Welcome {cUser}, to the quiz on {name}
      </h1>
      <br></br>
      <h5>
        {numQuestions} questions to solve in {mins} minutes
      </h5>

      <br></br>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button
          className="btn buttonh"
          buttonh
          onClick={() => dispatch({ type: "start" })}
        >
          Start
        </button>
        <p>Select the number of questions:</p>
        <select
          className="btn buttonh"
          onChange={(e) =>
            dispatch({ type: "changeNumber", payload: e.target.value })
          }
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="35">35</option>
          <option value="50">50</option>
        </select>

        <div>
          <label>
            <input
              type="checkbox"
              checked={negative}
              onChange={() =>
                dispatch({
                  type: "toggleNegativeMarking",
                  payload: !negative,
                })
              }
            />
            Keep negative marking
          </label>
        </div>
      </div>
    </div>
  );
}
