import {useQuizContext} from "../context/QuizContext";

export default function NextButton() {
    const {dispatch, answer, index, numQuestions} = useQuizContext();

    if (answer === null) return null

    if (index < numQuestions - 1) {
        return <button className="btn btn-ui" onClick={() => dispatch({type: "newQuestion"})}>Next</button>
    } else {
        return <button className="btn btn-ui" onClick={() => dispatch({type: "finish"})}>Finish</button>
    }
}