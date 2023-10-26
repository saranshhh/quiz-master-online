import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import BackButton from "./BackButton";

import { getDocs, collection } from "firebase/firestore";
//import { async } from "regenerator-runtime";addDoc

export default function Leadorboard({
  points,
  wrong,
  negative,
  maxPossiblePoints,
  dispatch,
  quizStatus,
  cUser,
  dis,
  status,
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  const [qq, setqq] = useState(["java"]);

  const value = "board-" + qq;
  const [list, setList] = useState([]);
  const quizRef = collection(db, value);

  const getData = async () => {
    try {
      const data = await getDocs(quizRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setList(filteredData);
      console.log(filteredData);
    } catch (err) {
      alert(err);
    }
  };

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
    <>
      <BackButton dispatch={dis} status={status} dispatch1={dispatch} />
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "3rem",
          padding: "2rem",
          marginTop: "2rem",
        }}
      >
        <h1>Leadorboard!</h1>
        <p>Select the quiz:</p>
        <div style={{ fontSize: "2rem" }} className="text-center">
          <select
            className="btn home-bh mx-auto mb-3"
            onChange={(e) => setqq(e.target.value) & getData()}
          >
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="webdev">Web</option>
          </select>
        </div>

        <table>
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
        </table>
      </div>
    </>
  );
}
