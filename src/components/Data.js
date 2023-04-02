import React from "react"
import Loading from "./Loading"
import Buttons from "./Buttons"
import QuestionAnswers from "./QuestionAnswers"
import { nanoid } from "nanoid"

export default function Data(props){
    
    const [gameOver, setGameOver] = React.useState(false);
    
    function checkAnswers(){
        const items = JSON.parse(localStorage.getItem('answers'));

        for (var i=0; i<items.length; i++){
            for (var k=0; k<items[i].length; k++){
                if (items[i][k].is_selected){
                    if (items[i][k].value === items[i][k].correct_answer){
                        items[i][k].is_correct = true
                    }
                }               
            }
        }
        
        localStorage.setItem('answers', JSON.stringify(items));
        setGameOver(true)
    }
        
    const answersData = props.allHook.map( x => {
        
        const pk = nanoid()
        
        const items = JSON.parse(localStorage.getItem('answers'));
        
        for (var i=0; i<items.length; i++){
            for (var k=0; k<items[i].length; k++){
                for (var p=0; p<x.all_answers.length; p++){
                    if (items[i][k].id === x.all_answers[p].id){
                        x.all_answers[p].is_selected = items[i][k].is_selected
                        x.all_answers[p].is_correct = items[i][k].is_correct
                        break
                    }
                }
            }
        }
            
        return (
            <QuestionAnswers
                key={pk}
                id={pk}
                question={x.question}
                all_answers={x.all_answers}
                gameOver={gameOver}
            />
        ) 
    })
    
    return (
        <div>
            {props.isLoading ? 
                <div className='loading'>
                    <Loading />
                </div> :
                <div className='quiz-screen'>
                    {!props.hasResults ? <h1 className='no-results'>No available results found for the selected options!</h1> : answersData}
                    <Buttons
                        dataLen={props.apiData.length}
                        gameOver={gameOver}
                        checkAnswers={checkAnswers}
                        numOfQuestions={props.numOfQuestions}
                     />
                </div>
            }
        </div>
    )
}