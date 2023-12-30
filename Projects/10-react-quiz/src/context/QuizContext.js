import {useReducer, useEffect, createContext, useContext} from "react";

const SECS_PER_QUESTION = 30;

const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
}

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            }
        case "dataFailed":
            return {
                ...state,
                status: "error",
            }
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            }
        case "newAnswer":
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            }
        case "newQuestion":
            return {
                ...state,
                index: state.index++,
                answer: null,
            }
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore: state.points > state.highscore ? state.points : state.highscore,
            }
        case "restart":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
                highscore: state.highscore,
            }
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status,
            }
        default:
            throw new Error("Action is unknown");
    }
}

const QuizContext = createContext(null);

function QuizProvider({children}) {
    const [{status, questions, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((accum, question) => accum + Number(question.points), 0);

    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type: "dataReceived", payload: data}))
            .catch((error) => dispatch({type: "dataFailed"}))
    }, [])

    return (
        <QuizContext.Provider value={{
            status,
            questions,
            index,
            answer,
            points,
            highscore,
            secondsRemaining,
            dispatch,
            numQuestions,
            maxPossiblePoints
        }}>
            {children}
        </QuizContext.Provider>
    )
}

function useQuizContext() {
    const context = useContext(QuizContext);
    if (context === undefined) throw new Error("QuizContext was used outside the app");

    return context;
}

export {QuizProvider, useQuizContext};