import React, { useEffect, useReducer } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StartScreen from "../components/StartScreen";
import Question from "../components/Question";
import NextButton from "../components/NextButton";
import PrevButton from "../components/PrevButton";

const initialState = {
  questions: [],
  status: "loading", //LOADING, ERROR, READY, ACTIVE, FINISHED
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newanswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "prevQuestion":
      return { ...state, index: state.index - 1, answer: null };
    default:
      throw new Error("Unrecognized action");
  }
}

export default function Cquiz() {
  const [{ index, questions, status, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numberOfQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []); // useEffect( function, [array of variables to watch for changes] )
  return (
    <div>
      cquiz
      <main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            name="cquiz"
            numQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
            <PrevButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </main>
    </div>
  );
}
