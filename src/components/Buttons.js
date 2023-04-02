import React from "react"

export default function Buttons(props){
    
    function startOver(){
        window.location.reload(false);
    }
    
    var score = 0
    
    const items = JSON.parse(localStorage.getItem('answers'));
    for (var i=0; i<items.length; i++){
        for (var k=0; k<items[i].length; k++){
            if (items[i][k].is_correct){
                score++
            }
        }
    }
    
    return (
        <div className='buttons'>
            {props.gameOver && <p className='correct-answers'>You scored {score}/{props.numOfQuestions} correct answers</p>}
            {props.dataLen > 0 && !props.gameOver ?
                <button className='start-quiz-btn' onClick={props.checkAnswers}>Check Answers</button> :
                <button className='start-quiz-btn' onClick={startOver}>Try Again</button>
            }
        </div>
    )
}