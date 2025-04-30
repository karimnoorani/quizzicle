import React from 'react';
import Header from './components/header'
import Question from './components/question'
import Choice from './components/choice'
import { renderToString } from 'react-dom/server';

export function App(props) {
  
  // React states
  const [choices, setChoices] = React.useState([])
  const [correctChoice, setCorrectChoice] = React.useState("")
  const [question, setQuestion] = React.useState("")
  const [userAnswer, setUserAnswer] = React.useState("")
  const [questionCount, setQuestionCount] = React.useState(1)
  const [questionList, setQuestionList] = React.useState([])
  const [correctCount, setCorrectCount] = React.useState(0)
  const [wrongCount, setWrongCount] = React.useState(0)
  
  // Functions
  function handleChoice(choice){
    setUserAnswer(choice)
    if (renderToString(choice) === renderToString(correctChoice)){
      setCorrectCount(prevState => prevState + 1)
    }
    else{
      setWrongCount(prevState => prevState + 1)
    }
  }

  function incrementQuestion(){
    setQuestionCount(prevState => prevState + 1)
  }
  
  function shuffle(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {

      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

  const decodeHTMLEntities = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

  // Creating choice elements
  const choiceElements = choices.map((choice, index) => {
    return <Choice 
              key={index} 
              text={choice}
              userAnswer={userAnswer}
              correctChoice={correctChoice}
              handleChoice={handleChoice}
            />
    })


  // Making API request for questions
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://opentdb.com/api.php?amount=50&type=multiple`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const json = await response.json()
      setQuestionList(json.results)
      setQuestion(decodeHTMLEntities(json.results[questionCount-1].question))
      const choiceList = [json.results[questionCount-1].correct_answer, ...json.results[questionCount-1].incorrect_answers].map(choice => {
        return decodeHTMLEntities(choice)
      })
      shuffle(choiceList)
      setChoices(choiceList)
      setCorrectChoice(decodeHTMLEntities(json.results[questionCount-1].correct_answer))
      setUserAnswer("")
    };
    if (questionCount === 1){
      fetchData();
    }
    else{
      setQuestion(decodeHTMLEntities(questionList[questionCount-1].question))
      const choiceList = [questionList[questionCount-1].correct_answer, ...questionList[questionCount-1].incorrect_answers].map(choice => {
        return decodeHTMLEntities(choice)
      })
      shuffle(choiceList)
      setChoices(choiceList)
      setCorrectChoice(decodeHTMLEntities(questionList[questionCount-1].correct_answer))
      setUserAnswer("")
    }
  }, [questionCount])

  return (
    <div className='App'>
      <body>
        <Header correctCount={correctCount} wrongCount={wrongCount}/>
        <main>
          <Question text={question}/>
          <section className="choices">
            {choiceElements}
          </section>
          <button id="nextQuestionButton" onClick={incrementQuestion}>Next Question</button>
        </main>
      </body>
    </div>
  );
}

// Log to console
console.log('Hello console')