export default function BackButton({ dispatch }) {
  const handleGoBack = () => {
    const confirmed = window.confirm("Are you sure you want to go back?");
    if (confirmed) {
      dispatch({ type: "goBack" });
    }
  };

  return (
    <div>
      <button className="btn btn-ui" onClick={handleGoBack}>
        Go Back!
      </button>
    </div>
  );
}
