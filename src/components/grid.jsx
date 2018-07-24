import React from 'react';
import ReactDOM from 'react-dom';

const NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B',];
function styleSquares(cell){
  let s = 'square ';
  switch(cell){
    case "left":
      return s+'clicked left'

    case "right":
      return s+'clicked right'

    case "clicked":
      return s+'clicked'

    case '':
      return s

    case 'single':
      return s+'clicked left right'

    default:
      return s;
  }
}

function Square(props){
  return (
    //what is inside the state of the grid goes here
      <button className={styleSquares(props.cellStatus)}
        onMouseDown={props.onMouseDown}
        onMouseLeave={props.onMouseLeave}
        onMouseEnter={props.onMouseEnter}
        onMouseUp={props.onMouseUp}
        style={{height: props.height, width: props.width}}
        >{props.value}
      </button>
    );
  }

  function Label(props){
    return(
      <div className = {props.className}
        key={props.key}
        style={{height:props.height, width:props.width}}
        >
        {props.noteName}
      </div>
    )
  }

//Proto of each row
function Row(props){
      return (
        <div className="grid-row" onClick={props.onClick} key={props.number} style={{height: props.height, width: '100%'}}>
          {props.value}
        </div>
      )
    }

//Creates the Grid
class Grid extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    let empty = [];
    for (var i = 0; i < props.rows;i++){ empty.push([])
      for (var j = 0; j < props.columns; j++) {
        empty[i].push([]);
      }
    }
    this.state = {
      squares: empty,
      rows: props.rows,
      columns: props.columns,
      height: 400/props.rows,
      width: 900/props.columns+1,
      currentRow: '',
      currentColumn:'',
      lastCellLeft: '',
      twoCellsBack: '',
      mouseIsDown: false,
      startingColumn: '',
      columnChanged: '',
      reversing: false,
      endingColumn: '',
      notes: [],
    }

  }


  handleClick(i,j,clickType) {
    const squares = this.state.squares.slice();
    const notes = this.state.notes.slice();
    switch(clickType){
      case 'down':
        squares[i][j] = squares[i][j] === 'clicked'? '' : 'clicked';
        this.setState({
          currentRow:i,
          squares:squares,
          mouseIsDown:true,
          currentColumn: j,
          startingColumn: j,

        })
        break;

      case 'leave':
        if(this.state.mouseIsDown){
          if(this.state.lastCellLeft !== '' && this.state.columnChanged){
            this.setState({
              twoCellsBack: this.state.lastCellLeft
            })
          }

          this.setState({
            lastCellLeft: j,
          })

        }
        break;
      case 'enter':
        if(this.state.mouseIsDown){
          let columnChanged = this.state.currentColumn === j ? false : true;
          this.setState({
            columnChanged: columnChanged,
            currentColumn: j,
          })
          console.log(columnChanged);
          if(columnChanged){
          squares[this.state.currentRow][j] = squares[this.state.currentRow][j] === 'clicked'? '' : 'clicked';
            if(this.state.twoCellsBack === this.state.currentColumn){
              this.setState({
                reversing: true,
              })
              squares[this.state.currentRow][this.state.lastCellLeft] = '';

            }
          }
        }
        break;
      case 'up':
        if(this.state.currentRow !== ''){
          if(j > this.state.startingColumn){
            squares[this.state.currentRow][this.state.startingColumn]='left';
            squares[this.state.currentRow][j]='right';
            notes.push({
              row: this.state.currentRow,
              start: this.state.startingColumn,
              end: j,
            })

            console.log(j-this.state.startingColumn)
          } else if (this.state.startingColumn === j){

            squares[this.state.currentRow][j]='single';
            notes.push({
              row: this.state.currentRow,
              start: j,
              end: j,
            })

          } else  {
            squares[this.state.currentRow][this.state.startingColumn]='right';
            squares[this.state.currentRow][j]='left';

            notes.push({
              row: this.state.currentRow,
              start: j,
              end: this.state.startingColumn,
            })
          }
          this.setState({
            lastCellLeft: '',
            currentRow: '',
            twoCellsBack: '',
            mouseIsDown: false,
            squares: squares,
            columnChanged: false,
            reversing: false,
            endingColumn: j,
            notes: notes,
          })

        }
        break;
        default:
          console.log('fuck')
    }
  }



  renderSquare(i,j) {
    return (
      <Square
        key={i*10+j}
        cellStatus={this.state.squares[i][j]}
        onMouseDown={() => this.handleClick(i,j,'down')}
        onMouseLeave={() => this.handleClick(i,j,'leave')}
        onMouseEnter={() => this.handleClick(i,j,'enter')}
        onMouseUp={() => this.handleClick(i,j,'up')}
        height={this.state.height}
        width={this.state.width}
      />
    );
  }



  createGrid = () => {
    let grid = [];
    //For the rows
    for(let i = 0;i < this.state.rows; i++){
      let row = []
      let labelClass = NOTES[i%NOTES.length].includes('#') ?'gridLabel sharp':'gridLabel';
      row.push(<Label
                          noteName={NOTES[i%NOTES.length]}
                          number={i}
                          className={labelClass}
                          height={this.state.height}
                          width={this.state.width}
                    />)
      //For each cell
      for (let j = 0; j < this.state.columns; j++){
        row.push(this.renderSquare(i,j));
      }
      grid.push(Row({value: row, key: i , height: this.state.height}));
    }
    return grid;
  }

  render() {
    return (
      <div className="gridContainer">
        {this.createGrid()}
      </div>
    );
  }
}

export default Grid
