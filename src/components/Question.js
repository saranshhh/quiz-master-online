import React from "react";

export default function Question({ question }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div>
        {question.options.map((option) => (
          <button key={option}>{option}</button>
        ))}
        ;
      </div>
    </div>
  );
}
