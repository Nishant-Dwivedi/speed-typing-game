import { useEffect, useState, useRef} from 'react'
import './App.css'

function App() {

  const textAreaRef = useRef(null); 
  const STARTING_TIME = 5;
  const [textContent, setTextContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [remainingTime, setRemainingTime] = useState(STARTING_TIME);
  const [isGameOn, setIsGameOn] = useState(false)

  function handleTextContentChange (e) {
    setTextContent(e.target.value)
  }

  function calculateWordCount () {
    const stringArray = textContent.split(" ");
    const stringArrayWithoutEmptySpaces = stringArray.filter((word) => word !== "")
    const count = stringArrayWithoutEmptySpaces.length;
    setWordCount(count);
  }

  function handleButtonClick () {
   if(!isGameOn){
    setTextContent("")
    setWordCount(0)
    setRemainingTime(STARTING_TIME)
    setIsGameOn(true);
    textAreaRef.current.disabled = false
    textAreaRef.current.focus()
   }
  }

  useEffect(() => {
    let timeoutID;
     if (remainingTime > 0 && isGameOn) {
      timeoutID =  setTimeout(()=>{
        setRemainingTime(remainingTime => {
          return remainingTime-1
        })
      }, 1000)
     }
     else if (remainingTime == 0) {
      setIsGameOn(false)
      calculateWordCount()
     }
    //  clear timeout
     return (() => {
      if(timeoutID) {
        clearTimeout(timeoutID);
      }
     })
   }, [remainingTime, isGameOn])

  return (
    <div className="App">
      <h1>How fast can you type?</h1>
      <textarea ref={textAreaRef} disabled={!isGameOn} value={textContent} onChange={handleTextContentChange}></textarea>
      <h2>Time Remaining: {remainingTime} </h2>
      <button disabled ={isGameOn} onClick={handleButtonClick}>Start</button>
      <h1>Word Count: {wordCount} </h1>
    </div>
  )
}

export default App
