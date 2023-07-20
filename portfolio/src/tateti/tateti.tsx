import React from 'react';
import './tateti.css'
import TaTeTiService from '../services/tatetiService';

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
    uploaded: boolean;
    playerXStats: any;
    playerOStats: any;
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
            uploaded: false,
            playerXStats: null,
            playerOStats: null,
        }
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<GameState>, snapshot?: any): void {
      const {history, stepNumber, uploaded} = this.state;
      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);
      if(winner && !uploaded){
        this.uploadToDB(winner);
      }
    }
    componentDidMount(): void {
      this.fetchAllWinsFromPlayer('X');
      this.fetchAllWinsFromPlayer('O');
    }

    uploadToDB(winner:string): void{
          const cantMovements = this.state.stepNumber;
          const data = {
              winner: winner!,
              cantMovements: cantMovements
          };
          console.log(data);
          try{
              TaTeTiService.post(data);
              console.log("Data uploaded to DB");
              this.setState({
                uploaded: true
              });
          }
          catch(error){
              console.log(error);
          }
    }

    fetchAllWinsFromPlayer(player: string): number{
        let wins = 0;
        try{
            const res=TaTeTiService.getWinsPlayer(player);
            res.then((response)=>{
              if(player==='X'){
                this.setState({
                  playerXStats: response.data
                });
              }
              else{
                this.setState({
                  playerOStats: response.data
                });
              }
            }
            );
        }
        catch(error){
            console.log('Error fetching player stats from DB: '+error);
        }
        return wins;
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
            uploaded: false
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
      const playerXStats = this.state.playerXStats;
      const playerOStats = this.state.playerOStats;
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
          <div className='container'>
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
            <div className='container' style={{marginTop:'20px'}}>
              <table className='table table-striped table-dark'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Player X</th>
                    <th>Player O</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'> Wins </th>
                    <td>{playerXStats ? playerXStats.totalWins : 'Loading stats...'}</td>
                    <td>{playerOStats ? playerOStats.totalWins : 'Loading stats...'}</td>
                  </tr>
                  <tr>
                    <th scope='row'> Total Moves in Wins </th>
                    <td>{playerXStats ? playerXStats.totalMovesMade : 'Loading stats...'}</td>
                    <td>{playerOStats ? playerOStats.totalMovesMade : 'Loading stats...'}</td>
                  </tr>
                  </tbody>
                </table>       
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