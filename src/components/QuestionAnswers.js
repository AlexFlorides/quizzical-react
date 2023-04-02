import React from "react"

export default function QuestionAnswers(props) {

    const [allAnswers, setAllAnswers] = React.useState(props.all_answers)
    
    var cursor = props.gameOver ? "default" : "pointer"
    var className = props.gameOver ? "quiz-answers-gameOver" : "quiz-answers"
    
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    
    function deselectOtherAnswers(answerId){
        
        if (props.gameOver){
            return
        }
        
        const updatedAnswers = allAnswers.map( x => {
            if (x.id === answerId && !x.is_selected){
                return {...x, is_selected: true}
            }
            else if (x.id === answerId && x.is_selected){
                return {...x, is_selected: true}
            }
            else {
                return {...x, is_selected: false}
            }
        })
        
        setAllAnswers(updatedAnswers)
        
        const items = JSON.parse(localStorage.getItem('answers'));
        var coord1
        var coord2
        
        outer:
        for (var i=0; i<items.length; i++){
            for (var k=0; k<items[i].length; k++){
                if (items[i][k].id === answerId){
                    coord1 = i
                    coord2 = k
                    break outer
                }
            }
        }
        
        for (var i=0; i<items[coord1].length; i++){
            items[coord1][i].is_selected = false
        }
        
        items[coord1][coord2].is_selected = true

        localStorage.setItem('answers', JSON.stringify(items));
    }
    
    const answersEl = allAnswers.map( x => {
        
        var backgroundColor = x.is_selected ? "#D6DBF5" : "#F5F7FB"
        var border = "1px solid #4D5B9E"
        
        if (props.gameOver){
            if (x.is_correct){
                backgroundColor = "#94D7A2"
                border = "none"
            }
            if (x.is_selected && !x.is_correct){
                backgroundColor = "#F8BCBC"
                border = "none"
            }
            if (x.value === x.correct_answer){
                backgroundColor = "#94D7A2"
                border = "none"
            }
        }
        
        if (x.is_selected){
            border = "none"
        }
        
        return (
            <p key={x.id} className={className} onClick={() => deselectOtherAnswers(x.id)} style={{backgroundColor: backgroundColor, cursor: cursor, border: border}}>{decodeHtml(x.value)}
            </p>
        )
    })

    return (
        <div className='quiz'>
            <p className='quiz-question'>{decodeHtml(props.question)}</p>
            <div className='answers'>
                {answersEl}
            </div>
        </div>
    )
}