import React from "react";

export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header>
      <progress
        value={index + Number(answer !== null)}
        max={numQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        {" "}
        <strong>
          {points} / {maxPossiblePoints}
        </strong>
      </p>
    </header>
  );
}
