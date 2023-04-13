import React from "react";
import LetterRow from "./LetterRow";
import Keyboard from "./Keyboard";


export default function Main() {

  const correctWord = "patos"
  const [keyState, setKeyState] = React.useState({})
  const [winState, setWinState] = React.useState(false)
  const [lostState, setLostState] = React.useState(false)
  const [correctState, setCorrectState] = React.useState(new Array(6).fill().map(() => {
    return new Array(5).fill('')
  }))
  const [wordArray, setWordArray] = React.useState(new Array(6).fill().map(() => {
    return new Array(5).fill('')
  }))
  const [rowEdit, setRowEdit] = React.useState(0)


  function clickHandle(key) {
    const e = { "key": key }
    handleKey(e)
  }

  function checkCorrect() {
    let correctCharArray = correctWord.split('')

    const isCorrectArray = wordArray[rowEdit].map((item, index) => {
      // console.log(correctCharArray)
      if (item === correctCharArray[index]) {
        correctCharArray[index] = ''
        return 2
      } else {
        return 0
      }
    })

    const resultArray = wordArray[rowEdit].map((item, index) => {
      if (correctCharArray.includes(item)) {
        correctCharArray[correctCharArray.indexOf(item)] = ''
        if (isCorrectArray[index] !== 2) {
          return isCorrectArray[index] + 1
        }
      }
      return isCorrectArray[index]
    })


    if (isCorrectArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0) === 10) {
      setWinState(true);
    }

    const replacementMap = {
      0: "miss",
      1: "close",
      2: "correct",
      '': ''
    };


    const stateArray = resultArray.map((element) => replacementMap[element]);

    setCorrectState(prevCorrectState => prevCorrectState.map((item, index) => {
      if (index == rowEdit) {
        return item.map((_, pos) => stateArray[pos])
      } else {
        return item
      }
    }))




    setKeyState(prevKeyState => {
      const reversedWordArray = wordArray[rowEdit].slice().reverse()
      const reversedStateArray = stateArray.slice().reverse()

      const objKeys = Object.fromEntries(reversedWordArray.map((item, index) => {
        if (item in prevKeyState && prevKeyState[item] !== "close") {
          return [item, prevKeyState[item]]
        }
        return [item, reversedStateArray[index]]
      }));
      return { ...prevKeyState, ...objKeys }
    })



  }


  const handleKey = (event) => {
    const { key } = event

    const rowLenght = wordArray[rowEdit].filter(el => el.length > 0).length

    if (rowLenght < 5 && !winState) {
      const re = /^[A-Za-z]+$/;
      if ((key === "" || re.test(key)) && key.length === 1) {
        setWordArray(prevWordArray => {
          return prevWordArray.map((item, index) => {
            if (index == rowEdit) {
              return item.map((single, index2) => index2 === rowLenght ? key.toLowerCase() : single)
            } else {
              return item
            }
          })
        })
      }
    } else if (key === "Enter") {
      checkCorrect()
      setRowEdit(prevRowEdit => prevRowEdit + 1)
    }

    if (key === "Backspace") {
      setWordArray(prevWordArray => {
        return prevWordArray.map((item, index) => {
          if (index == rowEdit) {
            return item.map((single, index2) => index2 === rowLenght - 1 ? '' : single)
          } else {
            return item
          }
          // transformar essa repetição em uma função separada
        })
      })
    }

  }


  const wordleGrid = wordArray.map((item, index) => {
    return <LetterRow key={index} status={correctState[index]} charArray={item} />
  })

  return (
    <main>
      <div tabIndex={0} onKeyDown={handleKey} className="wordle-wrapper">
        <div className="grid-wrapper">
          <div className="letter-grid">
            {wordleGrid}
          </div>
        </div>
        <Keyboard keyState={keyState} clickHandle={clickHandle} />
        {winState && <div className="win-box">
          <h1>Well done!</h1>
          <h3>Number of tries: {rowEdit}</h3>
        </div>}
      </div>
    </main>
  )
}