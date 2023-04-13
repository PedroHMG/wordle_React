import React from "react";


export default function Keyboard(props) {

  const keyboardKeys = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Delete']
  ]

  const keyboardButtons = keyboardKeys.map(keysRow => {
    return keysRow.map((key, index) => {
      return <button key={index} onClick={() => props.clickHandle(key)} className={`keyboard-key ${props.keyState[key] ? props.keyState[key] : ""}`}>{key}</button>
    })
  })


  return (
    <div className="keyboard-Wrapper">
      <div className="first-row">
        {keyboardButtons[0]}
      </div>
      <div className="second-row">
        {keyboardButtons[1]}
      </div>
      <div className="third-row">
        {keyboardButtons[2]}
      </div>
    </div>
  )
}

