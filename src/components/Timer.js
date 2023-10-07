import React, { useEffect } from "react";

export default function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const isLastTenSeconds = secondsRemaining <= 10;

  const secondsCases = {
    isTenSeconds: secondsRemaining === 60,
    isThirtySeconds: secondsRemaining === 120,
    isSixtySeconds: secondsRemaining === 300,
  };

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [dispatch]);

  return (
    <div
      className={`timer ${
        (secondsCases.isTenSeconds ||
          secondsCases.isThirtySeconds ||
          secondsCases.isSixtySeconds) &&
        "pulse"
      } ${isLastTenSeconds && "warning"}`}
    >
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
