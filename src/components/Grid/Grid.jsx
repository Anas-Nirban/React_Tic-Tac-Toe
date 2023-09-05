import { useState } from "react";
import Card from '../Card/Card'
import './Grid.css'
import isWinner from "../../helpers/checkWinner";
function Grid({numberOfCards}){
    const [board, setBoard] = useState(Array(numberOfCards).fill(""));
    const [turn, setTurn] = useState(true); // true => 0, false => x
    const [winner, setWinner] = useState(null);

    function play(index){
        if(turn == true){
            board[index] = "O";
        }
        else{
            board[index] = "X";
        }
        const win = isWinner(board, turn ? "O" : "X");
        if(win){
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }
    function reset (){
        setTurn(true)
        setWinner(null)
        setBoard(Array(numberOfCards).fill(""))
    }
    return(
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h1 className="turn-highlight">Winner is {winner} </h1>
                        <button className="reset" onClick={reset}>Reset The Game</button>
                    </>
                )
            }
            <h1 className="turn-highlight">Current Turn: {(turn)? 'O' : 'X' }</h1>
            <div className="grid">
            {board.map((elem, ind) =>  <Card gameEnd={winner ? true : false} key = {ind} onPlay={play} player={elem} index={ind}/>)}
            </div>
        </div>
        
    );
}

export default Grid;