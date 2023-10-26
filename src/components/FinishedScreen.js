import React, { useState } from "react";
//!import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection } from "firebase/firestore";
//!import { getDocs, collection } from "firebase/firestore";
//import { async } from "regenerator-runtime";addDoc

export default function FinishedScreen({
  points,
  wrong,
  negative,
  maxPossiblePoints,
  dispatch,
  quizStatus,
  cUser,
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  //!const value = "board-" + quizStatus;
  const [list, setList] = useState([]);
  //!const quizRef = collection(db, value);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await getDocs(quizRef);
  //       const filteredData = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setList(filteredData);
  //       console.log(filteredData);
  //     } catch (err) {
  //       alert(err);
  //     }
  //   };
  //   getData();
  // }, [quizRef]);

  // console.log(list);
  // console.log({ email: cUser, percentage: percentage, score: points });

  // const addData = async () => {
  //   try {
  //     const docRef = await addDoc(quizRef, {
  //       email: cUser,
  //       percentage: percentage,
  //       score: points,
  //     });
  //     getData();
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: "3rem",
        padding: "2rem",
        marginTop: "2rem",
      }}
    >
      <h1>Quiz Finished!</h1>
      <h4 className="result">
        {emoji}You scored{" "}
        <strong>
          {points} out of {maxPossiblePoints} ({Math.round(percentage)}%)
          <br></br>
          {negative ? <span> with {wrong} wrong answers</span> : null}
          <br></br>
          <br></br>
          <h2>Score Overview:</h2>
        </strong>
        Wrong Answers: {wrong} <br></br>
        Score: {points} <br></br>
        Max Score: {maxPossiblePoints}
      </h4>
      <div className="d-flex flex-wrap justify-content-center">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "questionDisplay" })}
        >
          Show Attempted Questions.
        </button>{" "}
      </div>

      {/* <div>Leaderboard</div>
      {/* <button className="btn btn-ui">Show Leaderboard</button> */}
      {/* <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Percentage</th>
            <th>Score</th>
            <th>Max Score</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
              <td>{item.email}</td>
              <td>{item.percentage}</td>
              <td>{item.score}</td>
              <td>{item.maxScore}</td>
            </tr>
          ))}
          <tr>
            <td>{cUser} (you)</td>
            <td>{Math.round(percentage)}</td>
            <td>{points}</td>
            <td>{maxPossiblePoints}</td>
          </tr>
        </tbody>
      </table>  */}
    </div>
  );
}
