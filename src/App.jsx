import React from 'react'
import { GrClose, GrRadial } from "react-icons/gr";
import './App.css'

function App() {
  const [square, setSquare] = React.useState(
    // () => JSON.parse(localStorage.getItem('square')) || 
    [
    {checked: false, value: ''},
    {checked: false, value: ''},
    {checked: false, value: ''},
    {checked: false, value: ''},
    {checked: false, value: ''},
    {checked: false, value: ''},
    {checked: false, value: ''},
    {checked: false, value: ''},
    {checked: false, value: ''}
  ])

  const [choice, setChoice] = React.useState(1);
  // odd numbers stand for X
  // even numbers stand for O
  const [gamePlay, setGamePlay] = React.useState(false);
  const [winner, setWinner] = React.useState({
    anyWinner: false,
    value: ""
  });

  function handleClick(item){
    if(winner.anyWinner === true){
      return false;
    }
    else {
      setGamePlay(true);
      const newSquare = square.map((unit, index) => {
          if((index + 1) === item){
            return {
              value: choice % 2 === 0 ? "o" : "x",
              checked: !square[index].checked
            }
          }
          else {
            return unit;
          }
        }
        )
      setSquare(newSquare);
      setChoice(choice => choice + 1);
      // check everytime there's a click if the game has been won!
      checkWinner(newSquare);
      }
  }

  // Winner rules 
  // 0, 1, 2 || 3, 4, 5 || 6, 7, 8 || 0, 3, 6 || 1, 4, 7 || 2, 5, 8 || 0, 4, 8 || 2, 4, 6
  let WinnerSamples = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  function checkWinner(square){
    let valuesOfX = [];
    let valuesOfO = [];
    square.forEach((item, index) => {
      if(item.value === "x"){
        valuesOfX.push(index);
      }
      else if(item.value === "o"){
        valuesOfO.push(index);
      }
    })

    let didXWin;
    let didOWin;

    if(valuesOfX.length >= 3){
      didXWin = WinnerSamples.filter(item => (item.every((element) => valuesOfX.includes(element))))

      if(didXWin.length == 1){
        setWinner({
          anyWinner: true,
          value: "X"
        });
      }
    }
    
    if(valuesOfO.length >= 3){
      didOWin = WinnerSamples.filter(item => (item.every((element) => valuesOfO.includes(element))))

      if(didOWin.length == 1){
        setWinner({
          anyWinner: true,
          value: "O"
        });
      }
    }
  }

  return (
    <div className="App">
      <div className="box">
        {gamePlay && winner.anyWinner === false && <p>Player {choice % 2 === 0 ? 1 : 2} just played {choice % 2 === 0 ? "X" : "O"}</p>}
        {winner.anyWinner && <p>THE WINNER IS PLAYER {winner.value}</p>}
        <div className="box-row box-row-1">
         <div className="box-item box-item-1" onClick={() => handleClick(1)}>
          {square[0].checked && (square[0].value === "o" ? <GrRadial />: <GrClose />)}
         </div>
         <div className="box-item box-item-2" onClick={() => handleClick(2)}>
         {square[1].checked && (square[1].value === "o" ? <GrRadial />: <GrClose />)}
         </div>
         <div className="box-item box-item-3" onClick={() => handleClick(3)}>
         {square[2].checked && (square[2].value === "o" ? <GrRadial />: <GrClose />)}
         </div>
        </div>
        <div className="box-row box-row-2">
          <div className="box-item box-item-4" onClick={() => handleClick(4)}>
          {square[3].checked && (square[3].value === "o" ? <GrRadial />: <GrClose />)}
          </div>
          <div className="box-item box-item-5" onClick={() => handleClick(5)}>
          {square[4].checked && (square[4].value === "o" ? <GrRadial />: <GrClose />)}
          </div>
          <div className="box-item box-item-6" onClick={() => handleClick(6)}>
          {square[5].checked && (square[5].value === "o" ? <GrRadial />: <GrClose />)}
          </div>
        </div>
        <div className="box-row box-row-3">
          <div className="box-item box-item-7" onClick={() => handleClick(7)}>
          {square[6].checked && (square[6].value === "o" ? <GrRadial />: <GrClose />)}
          </div>
          <div className="box-item box-item-8" onClick={() => handleClick(8)}>
          {square[7].checked && (square[7].value === "o" ? <GrRadial />: <GrClose />)}
          </div>
          <div className="box-item box-item-9" onClick={() => handleClick(9)}>
          {square[8].checked && (square[8].value === "o" ? <GrRadial />: <GrClose />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
