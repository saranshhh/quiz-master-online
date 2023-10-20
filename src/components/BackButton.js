export default function BackButton({ dispatch, status, dispatch1 }) {
  const handleGoBack = () => {
    if (status === "active") {
      const quit = window.confirm(
        "Are you sure you want to quit? You'll lose your progress"
      );
      if (quit) {
        dispatch({ type: "goBack" });
      }
    }
    if (status === "result") {
      dispatch1({ type: "gotoFinished" });
    } else {
      const confirmed = window.confirm("Are you sure you want to go back?");
      if (confirmed) {
        dispatch({ type: "goBack" });
      }
    }
  };

  return (
    <div>
      <button className="btn home-bh-logout" onClick={handleGoBack}>
        {status === "active" ? "Quit" : "Go Back"}
      </button>
    </div>
  );
}
