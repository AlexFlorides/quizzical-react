import React from "react"
import Quiz from "./components/Quiz"

export default function App(){
    
    const [waitingStart, setWaitingStart] = React.useState(true);
    const [formValues, setFormValues] = React.useState([]);
    
    function startQuiz(){
        setWaitingStart( prevWaitingStart => !waitingStart)
    }
    
    function handleSubmit(event){
        event.preventDefault()
        
        const formItem = event.target
        const trivia_amount = formItem.trivia_amount.value
        const trivia_category = formItem.trivia_category.value
        const trivia_difficulty = formItem.trivia_difficulty.value
        const trivia_type = formItem.trivia_type.value
        
        setFormValues({
            trivia_amount: trivia_amount,
            trivia_category: trivia_category,
            trivia_difficulty: trivia_difficulty,
            trivia_type: trivia_type
        })
        
        startQuiz()
    }
    
    return (
        waitingStart ? 
            <div className="main-screen">
                <div className="blob1"></div>
                <div className="blob2"></div>
                <h1 className="main-screen-title">Quizzical</h1>
                <p className="main-screen-description">Let's test your knowledge</p>
                
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="trivia_amount">Number of Questions: </label>
                    <input type="number" name="trivia_amount" id="trivia_amount" min="1" max="50" defaultValue="5"/>
                    
                    <label htmlFor="trivia_category">Select Category: </label>
                    <select name="trivia_category">
                        <option value="any">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>		
                    </select>
                    
                    <label htmlFor="trivia_difficulty">Select Difficulty: </label>
                    <select name="trivia_difficulty">
                        <option value="any">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    
                    <label htmlFor="trivia_type">Select Type: </label>
                    <select name="trivia_type">&gt;
                        <option value="any">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                    
                    <div className="api-form">
                        <button type="submit" className="start-quiz-btn" >Start Quiz</button>
                    </div>
                </form>

                
            </div> :
            <Quiz 
            formValues={formValues}
            />
    )
}