class Character {
  constructor(letter = "", state = "none") {
    this.letter = letter;
    this.state = state;
  }
  updateChar(newChar) {
    this.letter = newChar
  }
  removeChar() {
    this.letter = ""
  }
}


class Row {
  constructor(columns) {
    this.word = ""
    this.rowArray = [];
    for (let j = 0; j < columns; j++) {
      this.rowArray.push(new Character)
    }
  }
  changeWord(word) {
    this.word = word
  }
  updateWord(word) {
    if (word.length <= this.rowArray.length) {
      this.word = word;
      [...word].map((char, index) => this.rowArray[index].updateChar(char))
    }


  }
}


class Grid {
  constructor(row, columns) {
    this.grid = [];
    for (let i = 0; i < row; i++) {
      this.grid.push(new Row(columns))

    }
  }

  addLetter(letter, row) {
    const arrayRow = this.grid[row].rowArray

    const numberOfLetters = arrayRow.filter(item => item.char.length !== 0).length;
    if (numberOfLetters < arrayRow.length) {
      arrayRow[numberOfLetters].updateChar(letter)
      this.grid[row].changeWord(this.grid[row].word + letter)
    }

  }
  removeLetter(row) {
    const arrayRow = this.grid[row].rowArray

    const numberOfLetters = arrayRow.filter(item => item.char.length !== 0).length;
    arrayRow[numberOfLetters - 1].removeChar()
    this.grid[row].changeWord(this.grid[row].word.slice(0, 1))

  }
}

const test = new Grid(5, 5)

test.grid[0].updateWord("test")
console.log(test.grid)


  /*  
  const handleKey = (event) => {
    const {key} = event
  
    if (wordArray[rowEdit].length < 5) {
      const re = /^[A-Za-z]+$/;
      if ((key === "" || re.test(key)) && key.length === 1) {
        setWordArray(prevWordArray => {
          return prevWordArray.map((item, index) => {
            return index === rowEdit ? item + key : item
          })
        })
      }
    } else if (key === "Enter") {
      setRowEdit(prevRowEdit => prevRowEdit + 1)

    }

    if (key === "Backspace") {
      setWordArray(prevWordArray => {
        return prevWordArray.map((item, index) => {
          return index === rowEdit ? item.slice(0, -1) : item
        })
      })
    }
    

    console.log(key)
    console.log(wordArray)
    console.log(rowEdit)
  }
*/
  

/*
  const handleKey = (event) => {

    if (gridWord.length < 5) {
      const re = /^[A-Za-z]+$/;
      if ((event.key === "" || re.test(event.key)) && event.key.length === 1) {
        setgridWord(prevgridWord => [...prevgridWord, event.key.toUpperCase()])
      }
    }
    
    if (event.key === "Backspace") {
      setgridWord(prevgridWord => {
        return prevgridWord.filter((_, i) => i !== prevgridWord.length - 1)
      })
    }

    // if (event.key.length === 1) {
    //   console.log(event.key.lenght)
    // }

    // if (event.key == 'Backspace') {
    //   setgridWord(prevgridWord => {
    //     return prevgridWord.filter((_, i) => i !== prevgridWord.length - 1)
    //   })
    // } else {
    //   setgridWord(prevgridWord => [...prevgridWord, event.key])
    // }
    // console.log(event)

    onKeyDown={handleKey}
  }
*/