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
import SideView from "../components/SideView";

const initialState = {
  questions: [],
  status: "loading", //LOADING, ERROR, READY, ACTIVE, FINISHED
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: 300,
  numbersQs: 10,
};

const SECS_PER_QUESTION = 30;

// Using the Fisher-Yates shuffle algorithm to randomly arrange the array of questions
// This algorithm works by iterating over the array from the end to the beginning,
// and swapping each element with a randomly selected element before it.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      const questions = action.payload.map((question) => ({
        ...question,
        attempted: false,
        attemptedOption: null,
      }));
      shuffleArray(questions);
      return { ...state, questions: questions, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: Number(state.numbersQs) * SECS_PER_QUESTION,
      };
    case "newanswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        questions: state.questions.map((q, i) => {
          return i === state.index
            ? { ...q, attempted: true, attemptedOption: action.payload }
            : q;
        }),
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "prevQuestion":
      return { ...state, index: state.index - 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        questions: state.questions.map((q) => ({
          ...q,
          attempted: false,
          attemptedOption: null,
        })),
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "changeNumber":
      return {
        ...state,
        numbersQs: action.payload,
        secondsRemaining: Number(action.payload) * SECS_PER_QUESTION,
      };
    case "gotoQuestion":
      return { ...state, index: action.payload, answer: null };
    default:
      throw new Error("Unrecognized action");
  }
}

export default function Cquiz() {
  const [
    { index, questions, status, answer, points, secondsRemaining, numbersQs },
    dispatch,
  ] = useReducer(reducer, initialState);

  //const numberOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(function () {
    //
    //https://json.extendsclass.com/bin/ddc666608287
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataRecieved", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []); // useEffect( function, [array of variables to watch for changes] )
  return (
    <div>
      C QUIZ
      <main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <StartScreen
              name="cquiz"
              numQuestions={numbersQs}
              dispatch={dispatch}
              secondsRemaining={secondsRemaining}
            />
          </>
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numbersQs}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <SideView
              numQuestions={numbersQs}
              dispatch={dispatch}
              index={index}
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
                numQuestions={numbersQs}
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
