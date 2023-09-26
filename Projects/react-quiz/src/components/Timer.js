import {useEffect} from "react";
import {useQuizContext} from "../context/QuizContext";

export default function Timer() {
    const {secondsRemaining, dispatch} = useQuizContext();
    const minutes = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(function () {
        const id = setInterval(function () {
            dispatch({type: "tick"})
        }, 1000)

        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div
            className="timer">{`${minutes < 10 ? "0" + minutes : minutes}`}:{`${seconds < 10 ? "0" + seconds : seconds}`}</div>
    );
}