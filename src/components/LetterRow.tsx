import React from "react";


export default function LetterRow(props) {


    const charLetter = props.charArray.map((item, index) => {
        return <p key={index} className={`letter ${props.status[index]}`} >{item}</p>
    })
    

    return (
        <div className="row">
           {charLetter}
        </div>
    )
}