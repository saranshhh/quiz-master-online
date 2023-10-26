import React from "react";

export default function StartScreen({
  name,
  numQuestions,
  dispatch,
  secondsRemaining,
  cUser,
  negative,
}) {
  let nav = document.getElementById("nav");
  if (nav) nav.classList.add("hide-nav");
  const mins = Math.floor(secondsRemaining / 60);
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: "3rem",
        padding: "4rem",
        marginTop: "2rem",
      }}
    >
      <h1>
        Welcome {cUser}, to the quiz on {name}
      </h1>
      <br></br>
      <h3>
        {numQuestions} questions to solve in {mins} minutes
      </h3>

      <br></br>
      <div className="form-check fs-4 ">
        <label>
          Keep negative marking
          <input
            type="checkbox"
            checked={negative}
            style={{ backgroundColor: "#152938" }}
            className="form-check-input"
            onChange={() =>
              dispatch({
                type: "toggleNegativeMarking",
                payload: !negative,
              })
            }
          />
        </label>
      </div>
      <br></br>
      {/* style={{ display: "flex", justifyContent: "space-evenly" }} */}
      <div>
        <p className="fs-4">Select the number of questions:</p>
        <div className="text-center">
          <select
            className="btn home-bh mx-auto mb-3"
            onChange={(e) =>
              dispatch({ type: "changeNumber", payload: e.target.value })
            }
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>
      </div>
      <div>
        <p className="fs-4">Select difficulty:</p>
        <div className="text-center">
          <select
            className="btn home-bh mx-auto mb-3"
            onChange={(e) =>
              dispatch({ type: "changesDifficulty", payload: e.target.value })
            }
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
      </div>

      <div className="text-center">
        <button
          className="btn home-bh  mx-auto"
          buttonh
          onClick={() => dispatch({ type: "start" })}
        >
          Start
        </button>
      </div>
    </div>
  );
}
