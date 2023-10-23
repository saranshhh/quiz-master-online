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
import ShowAttempted from "../components/ShowAttempted";
import FinishSideView from "../components/FinishSideView";
import BackButton from "../components/BackButton";

const initialState = {
  questions: [],
  status: "loading", //LOADING, ERROR, READY, ACTIVE, FINISHED
  index: 0,
  answer: null,
  points: 0,
  wrong: 0,
  secondsRemaining: 300,
  numbersQs: 10,
  negative: false,
  difficulty: "easy", //easy, medium, hard
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
    case "toggleNegativeMarking":
      return { ...state, negative: action.payload };
    case "resetOption":
      return {
        ...state,
        answer: null,
        questions: state.questions.map((q, i) => {
          return i === state.index
            ? { ...q, attempted: false, attemptedOption: null }
            : q;
        }),
      };
    case "questionDisplay":
      return { ...state, status: "result", index: 0 };
    case "dataRecieved":
      const questions = action.payload
        .filter((question) => question.difficulty === state.difficulty)
        .map((question) => ({
          ...question,
          attempted: false,
          attemptedOption: null,
          seen: false,
        }));

      shuffleArray(questions);

      return { ...state, questions: questions, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "changesDifficulty":
      console.log(action.payload);
      return { ...state, difficulty: action.payload };
      
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: Number(state.numbersQs) * SECS_PER_QUESTION,
      };
    case "result":
      let correctAnswers = 0;
      let wrongAnswers = 0;
      state.questions.forEach((question) => {
        if (question.correctOption === question.attemptedOption) {
          correctAnswers++;
        } else if (question.attemptedOption !== null) {
          wrongAnswers++;
        }
      });
      if (state.negative === true) {
        correctAnswers *= 3;
        correctAnswers = correctAnswers - wrongAnswers;
      }
      return { ...state, wrong: wrongAnswers, points: correctAnswers };

    case "newanswer":
      //const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,

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
          seen: false,
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
    case "gotoFinished":
      return { ...state, status: "finished" };
    default:
      throw new Error("Unrecognized action");
  }
}

export default function Java({ dis, cUser, quizStatus }) {
  const [
    {
      index,
      questions,
      status,
      answer,
      points,
      secondsRemaining,
      numbersQs,
      wrong,
      negative,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  //const numberOfQuestions = questions.length;
  // const maxPossiblePoints = questions.reduce(
  //   (prev, curr) => prev + curr.points,
  //   0
  // );
  let maxPossiblePoints = numbersQs;
  if (negative === true) {
    maxPossiblePoints *= 3;
  }

  useEffect(function () {
    //
    //https://json.extendsclass.com/bin/ddc666608287
    fetch("http://localhost:8000/questions_java")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataRecieved", payload: data });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []); // useEffect( function, [array of variables to watch for changes] )
  return (
    <div>
      <main>
        <BackButton dispatch={dis} status={status} dispatch1={dispatch} />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <>
            <StartScreen
              name="Java!"
              numQuestions={numbersQs}
              dispatch={dispatch}
              secondsRemaining={secondsRemaining}
              cUser={cUser}
              negative={negative}
            />
          </>
        )}
        {status === "active" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "3rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "1rem",
              }}
            >
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <div className="d-flex">
                <PrevButton dispatch={dispatch} answer={answer} index={index} />

                <NextButton
                  dispatch={dispatch}
                  answer={answer}
                  index={index}
                  numQuestions={numbersQs}
                />
              </div>
            </div>
            <Progress
              index={index}
              numQuestions={numbersQs}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "1rem",
              }}
            >
              <Question
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
              <SideView
                numQuestions={numbersQs}
                dispatch={dispatch}
                index={index}
                question={questions[index]}
                questions={questions}
              />
            </div>
          </div>
        )}
        {status === "finished" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "3rem",
              marginTop: "2rem",
            }}
          >
            <FinishedScreen
              points={points}
              wrong={wrong}
              negative={negative}
              maxPossiblePoints={maxPossiblePoints}
              dispatch={dispatch}
              quizStatus={quizStatus}
              cUser={cUser}
            />
          </div>
        )}
        {status === "result" && (
          <div
            style={{
              backgroundColor: "white",
              padding: "3rem",
              borderRadius: "3rem",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "1rem",
              }}
            >
              <PrevButton dispatch={dispatch} answer={answer} index={index} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numbersQs}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "1rem",
              }}
            >
              <ShowAttempted
                question={questions[index]}
                dispatch={dispatch}
                answer={answer}
                index={index}
              />
              <FinishSideView
                numQuestions={numbersQs}
                dispatch={dispatch}
                index={index}
                question={questions[index]}
                questions={questions}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
