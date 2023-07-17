import React from 'react';
import './tateti.css'

  interface SquareProps{
    value: string | null;
    onClick: () => void;
  }

  function Square(props: SquareProps): JSX.Element{
    return(
        <button className='square'
        onClick={props.onClick}>
            {props.value}
        </button>
    )
  }

  interface BoardProps{
    squares: Array<string | null>;
    onClick: (i: number) => void;
  }
  
  class Board extends React.Component<BoardProps> {



    renderSquare(i: number): JSX.Element {
      return <Square value={this.props.squares[i]}
      onClick={()=> this.props.onClick(i)}
      key={i}
       />;
    }
  
    render() {
      const maxRows = 3;
      const maxColumns = 3;
      const squares: JSX.Element[] = [];
      for(let i=0; i < maxRows; i++){
        const row: JSX.Element[] = [];
        for(let j=0; j < maxRows; j++){
            const squareIndex = i * maxColumns + j;
            row.push(this.renderSquare(squareIndex));
        }
        squares.push(<div key={i} className="board-row">{row}</div>);
      }
      return (
        <div>
            {squares}
        </div>
      );
    }
  }
  
  interface GameState{
    history: Array<{squares: Array<string | null>}>;
    isAscending: boolean;
    stepNumber: number;
    xIsNext: boolean;
  }

  class Game extends React.Component<{}, GameState> {
    constructor(props:{}){
        super(props)
        this.state = {
            history:[{
                squares: Array(9).fill(null)
            }],
            isAscending: true,
            stepNumber: 0,
            xIsNext:true,
        }
    }

    handleClick(i: number): void{
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares:squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }
    jumpTo(step: number): void{
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    toggleSortOrder(): void{
        this.setState((prevState)=>({
            isAscending: !prevState.isAscending
        }));
    }
    render() {
      const history= this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to move #'+move :
        'Go to game start';
        if(this.state.stepNumber===move){
            return(
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)} style={{fontWeight:'bold'}}>{desc}</button>
                </li>
            );
        }
        else{
            return(
                <li key={move}>
                    <button onClick={()=> this.jumpTo(move)}>{desc}</button>
                </li>
            );
        }
      });
      if(!this.state.isAscending){
        moves.reverse();
      }
      let status;
      if(winner){
        status = 'Winner: '+ winner;
      }
      else{
        status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className='tateti'>
          <h1> Ta-Te-Ti </h1>
          <div className="game">
            <div className="game-board">
              <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <div>
                  <button onClick={()=> this.toggleSortOrder()}> Toggle sort order</button>
              </div>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      );
    }
  }
  
  // ========================================

  function calculateWinner(squares: Array<string | null>): string | null{
    const lines =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    for(let i = 0; i< lines.length; i++){
        const [a, b, c]= lines[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]
        }
    }
    return(null)
  }
  
  export default Game;