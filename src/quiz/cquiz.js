import React, { useEffect, useReducer } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import StartScreen from "../components/StartScreen";
import Question from "../components/Question";
import NextButton from "../components/NextButton";
import PrevButton from "../components/PrevButton";
import Progress from "../components/Progress";
import Timer from "../components/Timer";
import FinishedScreen from "../components/FinishedScreen";

const initialState = {
  questions: [],
  status: "loading", //LOADING, ERROR, READY, ACTIVE, FINISHED
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      const questions = action.payload.map((question) => ({
        ...question,
        attempted: false,
      }));
      return { ...state, questions: questions, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newanswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        questions: state.questions.map((q, i) =>
          i === state.index ? { ...q, attempted: true } : q
        ),
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "prevQuestion":
      return { ...state, index: state.index - 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unrecognized action");
  }
}

export default function Cquiz() {
  const [
    { index, questions, status, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(function () {
    //http://localhost:8000/questions
    fetch("https://json.extendsclass.com/bin/e0d169b31fca")
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
            <Progress
              index={index}
              numQuestions={numberOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer
                dispatch={dispatch}
                secondsRemaining={secondsRemaining}
              ></Timer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numberOfQuestions}
              />
              <PrevButton dispatch={dispatch} answer={answer} index={index} />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </main>
    </div>
  );
}
