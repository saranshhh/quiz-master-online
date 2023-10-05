import React from "react";

export default function FinishedScreen({
  points,
  maxPossiblePoints,
  dispatch,
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emoji}You scored{" "}
        <strong>
          {points} out of {maxPossiblePoints} ({Math.round(percentage)}%)
        </strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
      <div>To Do: Leaderboard</div>
    </>
  );
}
