import {useQuizContext} from "../context/QuizContext";

export default function Options() {
    const {questions, dispatch, answer, index} = useQuizContext();
    const hasAnswered = answer !== null;
    const question = questions[index];

    return <div className="options">
        {question.options.map((option, index) => <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? index === question.correctOption ? "correct" : "wrong" : ""}`}
            onClick={() => dispatch({type: "newAnswer", payload: index})}
            disabled={hasAnswered}
            key={option}>{option}</button>)}
    </div>
}