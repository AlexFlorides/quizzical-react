import React from "react"
import QuestionAnswers from "./QuestionAnswers"
import Data from "./Data"
import { nanoid } from "nanoid"

export default function Quiz(props){

    const [apiData, setApiData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [hasResults, setHasResults] = React.useState(true);
           
    React.useEffect(() => {
        async function getData() {
            
            const formValues = props.formValues
            
            var apiUrl = `https://opentdb.com/api.php?amount=${formValues.trivia_amount}`
            
            if (formValues.trivia_category !== "any"){
                apiUrl += `&category=${formValues.trivia_category}`
            }
            if (formValues.trivia_difficulty !== "any"){
                apiUrl += `&difficulty=${formValues.trivia_difficulty}`
            }
            if (formValues.trivia_type !== "any"){
                apiUrl += `&type=${formValues.trivia_type}`
            }
            
            const res = await fetch(apiUrl)
            const data = await res.json()
            
            if (data.results.length === 0){
                setHasResults(false)
            }
            
            setApiData(data.results)
            setIsLoading(false)
        }
        getData()
    }, [props.formValues])
    
    var answersArr = []
    var allHook = []
    
    const questionsAnswers = apiData.map( x => {
        
        // push incorrect and correct answers together and shuffle the array
        var answers = []
        x.incorrect_answers.forEach( a => {
            answers.push({id: nanoid(), value: a, is_selected: false, is_correct: false, correct_answer:x.correct_answer})
        })
        
        answers.push({id: nanoid(), value: x.correct_answer, is_selected: false, is_correct: false, correct_answer:x.correct_answer})
        
        var shuffledAnswers = answers.sort(() => {
            return Math.random() - 0.5;
        });
        
        answersArr.push(shuffledAnswers)
        
        const pk = nanoid()
        
        allHook.push({question: x.question, all_answers: shuffledAnswers})
        
        return (
            <QuestionAnswers
                key={pk}
                id={pk}
                all_answers={shuffledAnswers}
                {...x}
            />
        )
    })
    
    localStorage.setItem('answers', JSON.stringify(answersArr));
    
    return (
        <div>
            <Data 
                isLoading={isLoading}
                questionsAnswers={questionsAnswers}
                apiData={apiData}
                allHook={allHook}
                numOfQuestions={props.formValues.trivia_amount}
                hasResults={hasResults}
            />
        </div>
        
    )
}